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
        views.get_service_public_for_professionnel_by_departement,
        name="get_service_public_for_professionnel_by_departement",
    ),
    path(
        "departements/<str:pk>/services-publics/association/",
        views.get_service_public_for_association_by_departement,
        name="get_service_public_for_association_by_departement",
    ),
    path(
        "services-publics/<str:pk>/",
        views.get_service_public_details_by_id,
        name="get_service_public_details_by_id",
    ),
    path(
        "services-publics/top",
        views.get_top_5_services,
        name="get_top_5_services",
    ),
]
