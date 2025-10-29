from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

from .service_public_parser import ServicePublicParser


BASE_URL = "https://api-lannuaire.service-public.gouv.fr/api/explore/v2.1/catalog/datasets/api-lannuaire-administration/records"


@api_view(["GET"])
def get_departement_list(request):
    url = "https://geo.api.gouv.fr/departements"
    response = requests.get(url)
    if response.status_code == 200:
        return Response(response.json())
    return Response(
        {"error": "Impossible de récupérer les départements"},
        status=response.status_code,
    )


@api_view(["GET"])
def get_service_public_for_citoyen_by_departement(request, pk):
    url = (
        f'{BASE_URL}?where=startswith(code_insee_commune,"{pk}")'
        '%20AND%20(pivot%20LIKE%20"france_travail"%20OR%20pivot%20LIKE%20"mairie"%20OR%20pivot%20LIKE%20"caf")&limit=100'
    )

    response = requests.get(url)
    if response.status_code != 200:
        return Response(
            {"error": "Impossible de récupérer les services publics pour les citoyens"},
            status=response.status_code,
        )

    data = response.json()
    results = [
        ServicePublicParser.parse_record(record) for record in data.get("results", [])
    ]

    return Response(results)


@api_view(["GET"])
def get_service_public_for_profesionnel_by_departement(request, pk):
    url = f'{BASE_URL}?where=startswith(code_insee_commune,"{pk}")%20AND%20(pivot%20LIKE%20"cci"%20OR%20pivot%20LIKE%20"urssaf")&limit=100'

    response = requests.get(url)
    if response.status_code != 200:
        return Response(
            {"error": "Impossible de récupérer les services publics pour les citoyens"},
            status=response.status_code,
        )

    data = response.json()
    results = [
        ServicePublicParser.parse_record(record) for record in data.get("results", [])
    ]

    return Response(results)


@api_view(["GET"])
def get_service_public_for_association_by_departement(request, pk):
    url = f"{BASE_URL}?where=startswith(code_insee_commune,%22{pk}%22)%20AND%20(pivot%20LIKE%20%22prefecture%22%20OR%20pivot%20LIKE%20%22drajes%22)&limit=100"

    response = requests.get(url)
    if response.status_code != 200:
        return Response(
            {"error": "Impossible de récupérer les services publics pour les citoyens"},
            status=response.status_code,
        )

    data = response.json()
    results = [
        ServicePublicParser.parse_record(record) for record in data.get("results", [])
    ]

    return Response(results)
