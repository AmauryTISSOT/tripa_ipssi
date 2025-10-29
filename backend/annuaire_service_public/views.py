from django.shortcuts import render
from rest_framework import status
from .models import Service
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import urllib.parse
from .serializers import ServiceSerializer

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
def get_service_public_for_professionnel_by_departement(request, pk):
    url = f'{BASE_URL}?where=startswith(code_insee_commune,"{pk}")%20AND%20(pivot%20LIKE%20"cci"%20OR%20pivot%20LIKE%20"urssaf")&limit=100'

    response = requests.get(url)
    if response.status_code != 200:
        return Response(
            {
                "error": "Impossible de récupérer les services publics pour les professionnels"
            },
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
            {
                "error": "Impossible de récupérer les services publics pour les associations"
            },
            status=response.status_code,
        )

    data = response.json()
    results = [
        ServicePublicParser.parse_record(record) for record in data.get("results", [])
    ]

    return Response(results)


@api_view(["GET"])
def get_service_public_details_by_id(request, pk):
    url = f'{BASE_URL}?where=id%20LIKE%20"{pk}"'

    response = requests.get(url)
    if response.status_code != 200:
        return Response(
            {"error": "Impossible de récupérer les détails de ce service public"},
            status=response.status_code,
        )

    data = response.json()

    results = data.get("results", [])
    if not results:
        return Response(
            {"error": "Aucun service trouvé pour cet identifiant"},
            status=status.HTTP_404_NOT_FOUND,
        )

    record = results[0]
    service_id = record.get("id")

    if not service_id:
        return Response(
            {"error": "Aucun ID trouvé dans la réponse du service public"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    service, created = Service.objects.get_or_create(id=service_id)

    if not created:
        service.number_of_click += 1
        service.save()

    else:
        service.number_of_click = 1
        service.save()

    return Response(record)


@api_view(["GET"])
def get_top_5_services(request):
    top_5_services = Service.objects.order_by("-number_of_click")[:5]

    if not top_5_services:
        return Response([], status=status.HTTP_200_OK)

    ids = [f'"{s.id}"' for s in top_5_services]
    ids_clause = ",".join(ids)
    encoded_where = urllib.parse.quote(f"id IN ({ids_clause})")

    url = f"{BASE_URL}?where={encoded_where}&limit=5"
    response = requests.get(url)

    if response.status_code != 200:
        return Response(
            {"error": "Impossible de récupérer les détails depuis Service Public"},
            status=response.status_code,
        )

    api_data = response.json()

    results = [
        ServicePublicParser.parse_record(record)
        for record in api_data.get("results", [])
    ]

    click_map = {s.id: s.number_of_click for s in top_5_services}

    enriched_results = []
    for record in results:
        record_id = record.get("id")
        record["number_of_click"] = click_map.get(record_id, 0)
        enriched_results.append(record)

    return Response(enriched_results, status=status.HTTP_200_OK)
