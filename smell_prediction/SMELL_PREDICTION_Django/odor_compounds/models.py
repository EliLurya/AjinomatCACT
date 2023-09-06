from django.db import models

class Compound(models.Model):
    name = models.CharField(max_length=255)
    common_name = models.CharField(max_length=255)
    smile = models.CharField(max_length=255)
    odor = models.TextField()
    target = models.IntegerField()
    odor_class = models.CharField(max_length=255)
    abc_index = models.FloatField()
    acidic_group_count = models.IntegerField()
    basic_group_count = models.IntegerField()
    adjacency_matrix = models.FloatField()
    aromatic_atom_count = models.IntegerField()
    aromatic_bond_count = models.IntegerField()
    atom_count = models.IntegerField()
    autocorrelation_ats = models.FloatField()
    autocorrelation_atsc = models.FloatField()
    balabanj = models.FloatField()
    barysz_matrix = models.FloatField()
    bcut = models.FloatField()
    bertz_ct = models.FloatField()
    bond_count = models.IntegerField()
    carbon_types = models.IntegerField()
    chi = models.FloatField()
    constitutional_sum = models.FloatField()
    constitutional_mean = models.FloatField()
    distance_matrix = models.FloatField()
    eccentric_connectivity_index = models.FloatField()
    atom_type_estate = models.FloatField()
    eta_core_count = models.FloatField()
    eta_shape_index = models.FloatField()
    eta_vem_count = models.FloatField()
    fragment_complexity = models.FloatField()
    framework = models.FloatField()
    hbond_acceptor = models.IntegerField()
    hbond_donor = models.IntegerField()
    information_content = models.FloatField()
    vmcgowan = models.FloatField()
    labute_asa = models.FloatField()
    mid = models.FloatField()
    path_count = models.IntegerField()
    apol = models.FloatField()
    bpol = models.FloatField()
    ring_count = models.IntegerField()
    n_rot = models.IntegerField()
    slogp = models.FloatField()
    jgt10 = models.FloatField()
    diameter = models.FloatField()
    topo_shape_index = models.FloatField()
    topo_psa = models.FloatField()
    vabc = models.FloatField()
    vadj_mat = models.FloatField()
    mwc01 = models.FloatField()
    mw = models.FloatField()
    wpath = models.IntegerField()
    zagreb1 = models.IntegerField()

    def __str__(self):
        return self.name
