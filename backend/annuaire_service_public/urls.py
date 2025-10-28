from django.urls import path
from . import views

urlpatterns = [
    path("departement", views.get_departement_list, name="get_departement_list")
]
