import json
from django.shortcuts import render
from django.views import View
import mordred
from odor_compounds.models import Compound
from .utils import perform_pca
import pubchempy as pcp
from rdkit import Chem
from mordred import Calculator, descriptors, get_descriptors_from_module, get_descriptors_in_module


class IndexView(View):
    template_name = 'index.html'

    def get(self, request):
        # Retrieve all compounds from the database
        # compounds = Compound.objects.all()

        # # Perform PCA and get labels
        # PC, labels, _, _ = perform_pca(compounds)

        # context = {
        #     'df_new': compounds,
        #     'colors': {0: 'lightgreen', 1: 'red', 2: 'cyan', 3: 'fuchsia', 4: 'black', 5: 'gold'},
        #     'PC': PC,
        #     'labels': labels,
        # }

        return render(request, self.template_name)

# Define a view to display PCA distribution

class Pca_Distribution_View(View):
    template_name = 'pca-distribution.html'

    def get(self, request):
        compounds = Compound.objects.all()  # Retrieve all compounds from the database

        PC, _, _, _ = perform_pca(compounds)

        # Define categories for odor
        odor_categories = {
            'odor_berry': range(10),
            'odor_alliaceaous': range(10, 21),
            'odor_coffee': range(21, 32),
            'odor_citrus': range(32, 43),
            'odor_fishy': range(43, 54),
            'odor_jasmine': range(54, 64),
            'odor_minty': range(64, 74),
            'odor_earthy': range(74, 85),
            'odor_smoky': range(85, 95),
        }

        odor_data = {}
        # Iterate through odor categories and create data for each category
        for category, indices in odor_categories.items():
            # For each category, create a list of data points
            odor_data[category] = [
                {'x': round(PC[i, 0], 2), 'y': round(
                    PC[i, 1], 2), 'name': compounds[i].name}
                for i in indices
            ]
        # Convert data to JSON format
        for category, data_list in odor_data.items():
            odor_data[category] = json.dumps(data_list).replace("'", '"')

        return render(request, self.template_name, {'odor_data': odor_data})


class DescriptorVarianceView(View):
    template_name = 'descriptor-variance.html'

    def get(self, request):
        # Retrieve all compounds from the database
        compounds = Compound.objects.all()

        _, _, field_names, PCloadings = perform_pca(compounds)

        descriptor_variance = []
        # Iterate through the PC loadings and field names
        for i, (loading1, loading2) in enumerate(PCloadings):
            # For each PC loading, create a dictionary with 'x', 'y', and 'name' keys
            descriptor_variance.append({
                'x': round(loading1, 2),
                'y': round(loading2, 2),
                'name': field_names[i]
            })
        # Convert the descriptor variance data to JSON format
        descriptor_variance_json = json.dumps(
            descriptor_variance).replace("'", '"')

        context = {
            'descriptor_variance_json': descriptor_variance_json,
        }

        return render(request, self.template_name, context)


class ClusterByPCAView(View):
    template_name = 'cluster-by-pca.html'

    def get(self, request):
        # Retrieve all compounds from the database
        compounds = Compound.objects.all()

        _, labels, _, _ = perform_pca(compounds)
        # You can use with labels, but it is different from the project of Flask,
        # in labels_numbers its exactly the same numbers
        segments = [[] for _ in range(6)]  # Initialize empty segments

        # Labels corresponding to segments
        labels_numbers = [1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 3, 2, 5, 0, 2, 2, 3, 0, 3, 0, 0, 0, 5, 5, 5, 0, 5, 0, 0, 2, 3, 4, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 3, 3,
                          3, 0, 0, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 5, 2, 1, 2, 4, 5, 2, 2, 2, 2, 2, 5, 2, 2, 2, 5, 5, 1, 2, 2, 2, 2, 1, 2, 2, 2, 4, 5, 0, 5, 3, 5, 5, 5, 0, 0]

        for i, label_number in enumerate(labels_numbers):
            if label_number >= 0 and label_number < 6:
                segments[label_number].append({
                    'x': int(compounds[i].mw),
                    'y': int(compounds[i].wpath),
                    'name': compounds[i].name,
                    'odor': compounds[i].odor_class,
                })

        segments_json = json.dumps(segments)

        return render(request, self.template_name, {
            'segments_json': segments_json,  # Pass the JSON data to the template
        })


class SubmitView(View):
    template_name = 'cluster-by-pca-2.html'

    def post(self, request):
        # Retrieve all compounds from the database
        compounds = Compound.objects.all()

        # Initialize empty segments
        segments = [[] for _ in range(6)]
        segment_7 = []  # Initialize segment_7 for inputs

        # Labels corresponding to segments
        labels_numbers = [1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 3, 2, 5, 0, 2, 2, 3, 0, 3, 0, 0, 0, 5, 5, 5, 0, 5, 0, 0, 2, 3, 4, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 3, 3,
                          3, 0, 0, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 5, 2, 1, 2, 4, 5, 2, 2, 2, 2, 2, 5, 2, 2, 2, 5, 5, 1, 2, 2, 2, 2, 1, 2, 2, 2, 4, 5, 0, 5, 3, 5, 5, 5, 0, 0]

        for i, label_number in enumerate(labels_numbers):
            # Check if the label_number falls within the range [0, 6)
            # This ensures that labels outside this range are not processed
            if label_number >= 0 and label_number < 6:
                # Create a dictionary representing a data point and add it to the appropriate segment
                segments[label_number].append({
                    'x': int(compounds[i].mw),
                    'y': int(compounds[i].wpath),
                    'name': compounds[i].name,
                    'odor': compounds[i].odor_class,
                })

        text = request.POST.get('text')
        mol = Chem.MolFromSmiles(text)
        if mol:
            try:
                iupac_name = pcp.get_compounds(text, 'smiles')[0].iupac_name
                if not iupac_name:
                    raise Exception("Failed to obtain IUPAC name")

                # Add a new point to segment_7 with the name as the SMILES input
                segment_7.append({
                    'x': int(mordred.Weight.Weight(True, False)(mol)),
                    'y': int(mordred.WienerIndex.WienerIndex(False)(mol)),
                    'name': iupac_name,
                    'odor': 'Undefine',
                })

                return render(request, self.template_name, {
                    'message': 'You can add another SMILES input',
                    'segments_json': json.dumps(segments),
                    # Pass segment_7 with the new point
                    'segment_7': json.dumps(segment_7),
                })
            except Exception as e:
                
                return render(request, self.template_name, {
                    'message': f'Error in property calculation: {str(e)}',
                    'segments_json': json.dumps(segments),
                    'segment_7': json.dumps(segment_7),
                })
        else:
            print(segment_7)
            return render(request, self.template_name, {
                'message': 'Invalid SMILES input',
                'segments_json': json.dumps(segments),
                'segment_7': json.dumps(segment_7),
            })
