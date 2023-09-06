from django.urls import path
from .views import IndexView, Pca_Distribution_View, DescriptorVarianceView, ClusterByPCAView, SubmitView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('pca-distribution/', Pca_Distribution_View.as_view(), name='pca-distribution'),
    path('descriptor-variance/', DescriptorVarianceView.as_view(),
         name='descriptor-variance'),
    path('cluster-by-pca/', ClusterByPCAView.as_view(), name='cluster-by-pca'),
    path('submit/', SubmitView.as_view(), name='submit'),]
