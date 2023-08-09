from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets,status,filters
from .models import Ingredients, IngredientNode
from .serializers import IngredientsSerilizer,IngredientNodesSerilizer,IngredientNodesCreateSerilizer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
""" 
def Ingredients2(request):
    return JsonResponse({"":""}) """

class Ingredients(viewsets.ModelViewSet):
    queryset= Ingredients.objects.all()
    serializer_class=IngredientsSerilizer
    pagination_class = None  # Disable pagination


class Ingredient_Node(viewsets.ModelViewSet):
    queryset= IngredientNode.objects.all()
    serializer_class=IngredientNodesSerilizer
     
# Get POST FBV_List
@api_view(['GET','POST'])
def IngredientNodeF(request):
    #GET
    if request.method=='GET':
        queryset= IngredientNode.objects.all()
        serializer_class=IngredientNodesSerilizer(queryset, many=True)
        return Response(serializer_class.data)
        
    #POST
    elif request.method=='POST':
         serializer_class=IngredientNodesCreateSerilizer(data=request.data)
         if serializer_class.is_valid():
             serializer_class.save()
             return Response(serializer_class.data,status=status.HTTP_201_CREATED )
         return Response(serializer_class.data,status=status.HTTP_400_BAD_REQUEST )

#GET PUT DELETE 
@api_view(['GET', 'DELETE','PATCH'])
def IngredientNodeItem(request,pk):
    
    try:
        ingredientNode=IngredientNode.objects.get(pk=pk)
    except :
        return Response(status=status.HTTP_404_NOT_FOUND )

    #GET
    if request.method=='GET':
        serializer_class=IngredientNodesSerilizer(ingredientNode)
        return Response(serializer_class.data)
        
    #PUT
    elif request.method=='PATCH':
         serializer_class=IngredientNodesCreateSerilizer(ingredientNode,data=request.data)
         if serializer_class.is_valid():
             serializer_class.save()
             return Response(serializer_class.data,status=status.HTTP_201_CREATED )
         return Response(serializer_class.errors,status=status.HTTP_400_BAD_REQUEST )
    #DELETE
    elif request.method=='DELETE':
        ingredientNode.delete()
        return Response(status=status.HTTP_204_NO_CONTENT )
    
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST )
