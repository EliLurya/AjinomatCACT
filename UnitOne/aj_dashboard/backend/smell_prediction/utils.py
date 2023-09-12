import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from .models import Compound


def perform_pca(compounds):
    x = []
    # Retrieve all compounds from the database, except the first 6 (the strings)
    field_names = [field.name for field in Compound._meta.fields if field.get_internal_type(
    ) in ('IntegerField', 'FloatField') and field.name not in ('target', 'zagreb1')]

    # For each compound, we extract the values of the selected numerical fields

    for compound in compounds:
        values = [getattr(compound, field_name) for field_name in field_names]
        x.append(values)

    x = StandardScaler().fit_transform(x)
    pca = PCA(n_components=2)
    PC = pca.fit_transform(x)
    scores_pca = pca.transform(x)
    PCloadings = pca.components_.T * np.sqrt(pca.explained_variance_)
    kmeans_pca = KMeans(n_clusters=6, init='k-means++', random_state=42)
    kmeans_pca.fit(scores_pca)

    return PC, kmeans_pca.labels_, field_names, PCloadings
