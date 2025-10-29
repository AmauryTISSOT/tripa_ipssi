from django.urls import path
from . import views

urlpatterns = [
    path("departement/", views.get_departement_list, name="get_departement_list"),
    path(
        "departements/<str:pk>/services-publics/citoyen/",
        views.get_service_public_for_citoyen_by_departement,
        name="get_service_public_for_citoyen_by_departement",
    ),
    path(
        "departements/<str:pk>/services-publics/professionnel/",
        views.get_service_public_for_profesionnel_by_departement,
        name="get_service_public_for_profesionnel_by_departement",
    ),
]
