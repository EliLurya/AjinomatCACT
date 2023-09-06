from django.contrib import admin
from django.urls import path

from django.contrib import admin
from django.urls import path, include
from index_app import urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(urls)),  
]
