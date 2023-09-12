from django.urls import path

from .views import IndexView, pca_distribution_view, DescriptorVarianceView, ClusterByPCAView, SubmitView
app_name = 'smell_prediction'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('pca-distribution/', pca_distribution_view.as_view(),
         name='pca-distribution'),
    path('descriptor-variance/', DescriptorVarianceView.as_view(),
         name='descriptor-variance'),
    path('cluster-by-pca/', ClusterByPCAView.as_view(), name='cluster-by-pca'),
    path('submit/', SubmitView.as_view(), name='submit'),]

