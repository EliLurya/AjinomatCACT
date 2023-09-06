import csv
from django.core.management.base import BaseCommand
from odor_compounds.models import Compound


class Command(BaseCommand):
    help = 'Populate the database with data from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        # Get the path to the CSV file
        csv_file = kwargs['csv_file']
        # Open the CSV file for reading
        with open(csv_file, 'r') as csvfile:
            csvreader = csv.reader(csvfile)
            # Skip the header row in the CSV file
            next(csvreader)
            # Iterate through each row in the CSV file
            for row in csvreader:
                # Create a new Compound object and populate its fields with data from the CSV row
                Compound.objects.create(
                    name=row[0],
                    common_name=row[1],
                    smile=row[2],
                    odor=row[3],
                    target=int(row[4]),
                    odor_class=row[5],
                    abc_index=float(row[6]),
                    acidic_group_count=int(row[7]),
                    basic_group_count=int(row[8]),
                    adjacency_matrix=float(row[9]),
                    aromatic_atom_count=int(row[10]),
                    aromatic_bond_count=int(row[11]),
                    atom_count=int(row[12]),
                    autocorrelation_ats=float(row[13]),
                    autocorrelation_atsc=float(row[14]),
                    balabanj=float(row[15]),
                    barysz_matrix=float(row[16]),
                    bcut=float(row[17]),
                    bertz_ct=float(row[18]),
                    bond_count=int(row[19]),
                    carbon_types=int(row[20]),
                    chi=float(row[21]),
                    constitutional_sum=float(row[22]),
                    constitutional_mean=float(row[23]),
                    distance_matrix=float(row[24]),
                    eccentric_connectivity_index=float(row[25]),
                    atom_type_estate=float(row[26]),
                    eta_core_count=float(row[27]),
                    eta_shape_index=float(row[28]),
                    eta_vem_count=float(row[29]),
                    fragment_complexity=float(row[30]),
                    framework=float(row[31]),
                    hbond_acceptor=int(row[32]),
                    hbond_donor=int(row[33]),
                    information_content=float(row[34]),
                    vmcgowan=float(row[35]),
                    labute_asa=float(row[36]),
                    mid=float(row[37]),
                    path_count=int(row[38]),
                    apol=float(row[39]),
                    bpol=float(row[40]),
                    ring_count=int(row[41]),
                    n_rot=int(row[42]),
                    slogp=float(row[43]),
                    jgt10=float(row[44]),
                    diameter=float(row[45]),
                    topo_shape_index=float(row[46]),
                    topo_psa=float(row[47]),
                    vabc=float(row[48]),
                    vadj_mat=float(row[49]),
                    mwc01=float(row[50]),
                    mw=float(row[51]),
                    wpath=int(row[52]),
                    zagreb1=int(row[53]),
                )
        self.stdout.write(self.style.SUCCESS(
            'Database populated successfully'))
