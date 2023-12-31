import csv
import io
import math
from functools import reduce
from operator import or_

from django.db import transaction
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import permissions, status

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from common.utilities.Helper import prepare_model_dict
from ingredients.serializers import IngredientsSerilizer
from meta_recipe.__serializers.MetaRecipeSerializer import MetaRecipeSerializer
from meta_recipe.__serializers.MetaRecipeIngredientsSerializer import MetaRecipeIngredientsSerializer
from meta_recipe.models import MetaRecipe, MetaRecipeIngredients
from protocols.__serializers.ProtocolSerializer import ProtocolSerializer
from protocols.__views.ProtocolView import ProtocolView
from protocols.models import ProtocolSensoryPanel
from recipe.models import Recipe, RecipeIngredients
from recipe.__serializers.RecipeSerializer import RecipeSerializer
from recipe.__serializers.RecipeIngredientsSerializer import RecipeIngredientsSerializer
from .serializers import ProjrctSerilizer
from ingredients.models import Ingredients
from equipments.models import Equipment
from equipments.__serializers.Equipment import EquipmentSerializer
from sensory_panels.models import SensoryPanel, AbstractSensoryPanel
from sensory_panels.serializers import SensoryPanelsCreateSerializers, SensoryPanelsSerializers
from .models import Projects
from sensors.models import Sensors
from sensors.serializers import SensorsCreateSerializers, SensorsSerializers
from analytical_chemistry.models import AnalyticalChemistry
from analytical_chemistry.serializers import AnalyticalChemistryCreateSerializers, AnalyticalChemistrySerializers
from common.utilities.Pagination import CustomPagination

# Create your views here.
import json
import pandas as pd


def getOrCreateIngredientByName(iname):
    ingredientExist = {}
    try:
        ingredientExist = Ingredients.objects.get(name=iname)
    except Ingredients.DoesNotExist:
        Ingserializer = IngredientsSerilizer(data={'name': iname})
        if Ingserializer.is_valid():
            Ingserializer.save()
            ingredientExist = Ingserializer.instance
    return ingredientExist


# Get POST FBV_List
@api_view(['GET', 'POST'])
@transaction.atomic
def ProjectList(request):
    # GET
    if request.method == 'GET':
        pagination_class = CustomPagination
        queryset = Projects.objects.all().order_by('-updated_at')
        paginator = pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer_class = ProjrctSerilizer(result_page, many=True)
        return paginator.get_paginated_response(serializer_class.data)

    # POST
    elif request.method == 'POST':
        try:
            with transaction.atomic():
                # check if Ingredients not Exists Create a new
                projectExist = Projects.objects.filter(name=request.data['name']).first()
                if not projectExist:
                    pSerializer = ProjrctSerilizer(data=request.data)
                    if pSerializer.is_valid():
                        pSerializer.save()
                        projectExist = pSerializer.instance

                ## import ingredients data from ingredients files
                if "ingredients[]" in request.FILES:
                    for iF in request.FILES.getlist('ingredients[]'):
                        if iF.content_type == 'text/csv':
                            csv_data = pd.read_csv(
                                io.StringIO(
                                    iF.read().decode("utf-8")
                                )
                            )
                            for record in csv_data.to_dict(orient="records"):
                                try:
                                    idict = prepare_model_dict(record, ['name'])
                                    create_or_get_object(idict, IngredientsSerilizer, ['name'])
                                except Exception as e:
                                    raise e
                        elif iF.content_type == 'application/json':
                            iData = json.loads(iF.read())
                            ingredients_list = iData["ingredients"]
                            # print(ingredients_list)
                            for ing in ingredients_list:
                                try:
                                    idict = prepare_model_dict(ing, ['name'])
                                    create_or_get_object(idict, IngredientsSerilizer, ['name'])
                                except Exception as e:
                                    raise e
                ## import equipments data from equipments files
                if "equipments[]" in request.FILES:
                    fields = ['name', 'type', 'brand', 'model', 'project']
                    for eF in request.FILES.getlist('equipments[]'):
                        if eF.content_type == 'text/csv':
                            csv_data = pd.read_csv(
                                io.StringIO(
                                    eF.read().decode("utf-8")
                                )
                            )
                            for record in csv_data.to_dict(orient="records"):
                                try:
                                    record['project'] = projectExist.id
                                    idict = prepare_model_dict(record, fields)
                                    create_object(idict, EquipmentSerializer)
                                except Exception as e:
                                    raise e
                        elif eF.content_type == 'application/json':
                            eData = json.loads(eF.read())
                            equipments_list = eData["equipment"]
                            for equ in equipments_list:
                                opj = {'name': equ['name'], 'type': equ['equipment_type'], 'brand': equ['brand'],
                                       'model': equ['model'], 'project': projectExist.id}
                                try:
                                    idict = prepare_model_dict(opj, fields)
                                    create_object(idict, EquipmentSerializer)
                                except Exception as e:
                                    raise e
                ## import sensory_panels data from sensory_panels files
                if "sensory_panels[]" in request.FILES:
                    fields = ['judge', 'date', 'panel_type', 'panel_variable', 'panel_value', 'project']
                    for sPF in request.FILES.getlist('sensory_panels[]'):
                        if sPF.content_type == 'text/csv':
                            csv_data = pd.read_csv(
                                io.StringIO(
                                    sPF.read().decode("utf-8")
                                )
                            )
                            for record in csv_data.to_dict(orient="records"):
                                try:
                                    record['project'] = projectExist.id
                                    idict = prepare_model_dict(record, fields)
                                    update_or_create_object(idict, SensoryPanelsCreateSerializers,
                                                            ['panel_variable', 'project'])
                                except Exception as e:
                                    raise e
                        elif sPF.content_type == 'application/json':
                            sPData = json.loads(sPF.read())
                            sensoryPanels_list = sPData["sensory_panels"]

                            for spi in sensoryPanels_list:
                                opj = {'judge': spi['judge_id'], 'date': spi['date'],
                                       'panel_type': spi['panel_type'], 'panel_variable': spi['panel_variable'],
                                       'panel_value': spi['panel_value'], 'project': projectExist.id}
                                try:
                                    idict = prepare_model_dict(opj, fields)
                                    update_or_create_object(idict, SensoryPanelsCreateSerializers,
                                                            ['panel_variable', 'project'])
                                except Exception as e:
                                    raise e
                ## import Sensors data from sensors files
                if "sensors[]" in request.FILES:
                    fields = ['name', 'units', 'project']
                    for sF in request.FILES.getlist('sensors[]'):
                        if sF.content_type == 'text/csv':
                            csv_data = pd.read_csv(
                                io.StringIO(
                                    sF.read().decode("utf-8")
                                )
                            )
                            for record in csv_data.to_dict(orient="records"):
                                try:
                                    record['project'] = projectExist.id
                                    idict = prepare_model_dict(record, fields)
                                    create_object(idict, SensorsCreateSerializers)
                                except Exception as e:
                                    raise e

                        elif sF.content_type == 'application/json':
                            sData = json.loads(sF.read())
                            sensors_list = sData["sensor_data"]

                            for sI in sensors_list:
                                opj = {'name': sI['name'], 'units': sI['units'],
                                       'project': projectExist.id}

                                # check if sensor not Exists Create a new
                                try:
                                    idict = prepare_model_dict(opj, fields)
                                    create_object(idict, SensorsCreateSerializers)
                                except Exception as e:
                                    raise e

                ## import analytical_chemistry data from analytical_chemistry files
                if "analytical_chemistry[]" in request.FILES:
                    fields = ['date', 'method', 'assay_component', 'variable', 'value', 'unit', 'project']
                    for aCF in request.FILES.getlist('analytical_chemistry[]'):
                        if aCF.content_type == 'text/csv':
                            csv_data = pd.read_csv(
                                io.StringIO(
                                    aCF.read().decode("utf-8")
                                )
                            )
                            for record in csv_data.to_dict(orient="records"):
                                try:
                                    record['project'] = projectExist.id
                                    idict = prepare_model_dict(record, fields)
                                    create_object(idict, AnalyticalChemistryCreateSerializers)
                                except Exception as e:
                                    raise e

                        elif aCF.content_type == 'application/json':
                            aCData = json.loads(aCF.read())
                            analytical_chemistry_list = aCData["sensor_data"]

                            for aCI in analytical_chemistry_list:
                                opj = {'date': aCI['date'],
                                       'method': aCI['method'], 'assay_component': aCI['assay_component'],
                                       'variable': aCI['variable'], 'value': aCI['value'], 'unit': aCI['unit'],
                                       'project': projectExist.id}
                                try:
                                    idict = prepare_model_dict(opj, fields)
                                    create_object(idict, AnalyticalChemistryCreateSerializers)
                                except Exception as e:
                                    raise e

                if 'production_protocol[]' in request.FILES:
                    project_sensory_panels = projectExist.sensory_panels.all()
                    abstract_panels = AbstractSensoryPanel.objects.only('name')
                    for ppFile in request.FILES.getlist('production_protocol[]'):
                        ppData = json.loads(ppFile.read())
                        production_protocol_list = ppData['protocols']
                        for pp in production_protocol_list:
                            pp['project'] = projectExist.id
                            serializer = ProtocolSerializer(data=pp)
                            serializer.is_valid(raise_exception=True)
                            obj = serializer.save()
                            if 'flow' in pp:
                                protocol_view = ProtocolView()
                                protocol_view.create_flow(flow=pp['flow'], protocol_id=obj.id)
                            sensory_panel_labels = []
                            if len(list(project_sensory_panels)):
                                for panel in project_sensory_panels:
                                    sensory_panel_labels.append(panel.panel_variable)
                                    obj.custom_sensory_panels.create(
                                        variable=panel.panel_variable,
                                        value=panel.panel_value)
                            for panel in abstract_panels:
                                if panel.name not in sensory_panel_labels:
                                    obj.custom_sensory_panels.create(variable=panel.name)
                return Response(
                    {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success',
                     'payload': ProjrctSerilizer(projectExist).data},
                    status=status.HTTP_200_OK)
        except Exception as e:
            raise e


# GET PUT PATCH
@api_view(['GET', 'DELETE', 'PATCH'])
def ProjectItem(request, pk):
    # GET

    try:
        project = Projects.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET
    if request.method == 'GET':
        serializer_class = ProjrctSerilizer(project)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer_class.data},
            status=status.HTTP_200_OK)

    # PUT
    elif request.method == 'PATCH':
        serializer_class = ProjrctSerilizer(project, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_201_CREATED, 'message': 'success',
                 'payload': serializer_class.data},
                status=status.HTTP_201_CREATED)

        return Response(
            {'status': 'fail', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success',
             'payload': serializer_class.errors},
            status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    elif request.method == 'DELETE':
        project.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': {}},
            status=status.HTTP_204_NO_CONTENT)

    else:
        return Response(
            {'status': 'fail', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success', 'payload': {}},
            status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@transaction.atomic
def clone(request):
    try:
        with transaction.atomic():
            ids = request.data['ids']
            result = Projects.objects.filter(
                reduce(or_, [Q(id=n) for n in ids])
            ).count() == len(ids)

            if not result:
                raise ValidationError("At least one ID is not in DB")

            count = Projects.objects.filter().count()

            for id in request.data['ids']:
                project = Projects.objects.get(id=id)
                ex_serializer = ProjrctSerilizer(project, many=False)
                __project = Projects.objects.create(name=f"{project.name}_clone_{++count}", date=project.date,
                                                    description=project.description)
                for equipment in ex_serializer.data['equipments']:
                    __project.equipments.create(name=equipment['name'],
                                                brand=equipment['brand'],
                                                type=equipment['type'],
                                                model=equipment['model'])

                for panel in ex_serializer.data['sensory_panels']:
                    __project.sensory_panels.create(judge=panel['judge'],
                                                    data=panel['data'],
                                                    sample_id=panel['sample_id'],
                                                    panel_type=panel['panel_type'],
                                                    panel_variable=panel['panel_variable'],
                                                    panel_value=panel['panel_value'],
                                                    )

                for sensor in ex_serializer.data['sensors']:
                    __project.sensors.create(name=sensor['name'],
                                             units=sensor['units'],
                                             )

                for analytical in ex_serializer.data['analytical_chemistry']:
                    __project.analytical_chemistry.create(date=analytical['date'],
                                                          method=analytical['method'],
                                                          assay_component=analytical['assay_component'],
                                                          variable=analytical['variable'],
                                                          value=analytical['value'],
                                                          unit=analytical['unit'],
                                                          )

                for protocol in ex_serializer.data['protocols']:
                    pro = __project.protocols.create(description=protocol['description'],
                                                     reference_author=protocol['reference_author'],
                                                     aliquot_date=protocol['aliquot_date'], reagent=protocol['reagent'],
                                                     processes=protocol['processes'],
                                                     ingredients=protocol['ingredients'], flow=protocol['flow'],
                                                     name=protocol['name'])
                    protocol_view = ProtocolView()
                    protocol_view.create_flow(flow=protocol['flow'], protocol_id=pro.id)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': {}},
                status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        raise Exception(e)


@api_view(['POST'])
def bulk_destroy(request):
    ids = request.data.get('ids', [])
    Projects.objects.filter(id__in=ids).delete()
    return Response(
        {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Projects deleted!', 'payload': {}},
        status=status.HTTP_200_OK
    )


def create_or_get_object(data, serializer, unique_fields=[]):
    ser = serializer(data=data)
    if ser.is_valid():
        instance, _ = ser.get_or_create(unique_fields)
        return instance
    else:
        raise ValidationError(ser.errors)


def create_object(data, serializer):
    ser = serializer(data=data)
    if ser.is_valid():
        instance = ser.save()
        return instance
    else:
        raise ValidationError(ser.errors)


def update_or_create_object(data, serializer, unique_fields=[]):
    ser = serializer(data=data)
    if ser.is_valid():
        instance, _ = ser.update_or_create(unique_fields)
        return instance
    else:
        raise ValidationError(ser.errors)
