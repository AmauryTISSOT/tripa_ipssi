from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import json

BASE_URL = "https://api-lannuaire.service-public.gouv.fr/api/explore/v2.1/catalog/datasets/api-lannuaire-administration/records"


@api_view(["GET"])
def get_departement_list(request):
    url = "https://geo.api.gouv.fr/departements"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return Response(data)
    else:
        return Response(
            {"error": "Impossible de récupérer les départements"},
            status=response.status_code,
        )


@api_view(["GET"])
def get_service_public_for_citoyen_by_departement(request, pk):
    url = f'{BASE_URL}?where=startswith(code_insee_commune,"{pk}")%20AND%20(pivot%20LIKE%20"france_travail"%20OR%20pivot%20LIKE%20"mairie"%20OR%20pivot%20LIKE%20"caf")&limit=100'

    response = requests.get(url)
    if response.status_code != 200:
        return Response(
            {"error": "Impossible de récupérer les services publics pour les citoyens"},
            status=response.status_code,
        )

    data = response.json()
    results = []
    print(len(data.get("results", [])))

    for record in data.get("results", []):
        # Adresse
        adresse = ""
        if record.get("adresse"):
            try:
                addr_list = json.loads(record["adresse"])
                if len(addr_list) > 0:
                    addr_info = addr_list[0]
                    numero_voie = addr_info.get("numero_voie", "")
                    complement1 = addr_info.get("complement1", "")
                    complement2 = addr_info.get("complement2", "")
                    code_postal = addr_info.get("code_postal", "")
                    nom_commune = addr_info.get("nom_commune", "")
                    adresse = f"{numero_voie} {complement1} {complement2} - {code_postal} {nom_commune}".strip(
                        " -"
                    )
            except json.JSONDecodeError:
                adresse = ""

        # Horaires
        horaires = ""
        if record.get("plage_ouverture"):
            try:
                horaires_list = json.loads(record["plage_ouverture"])
                if len(horaires_list) > 0:
                    h = horaires_list[0]
                    debut1 = h.get("valeur_heure_debut_1", "")
                    fin1 = h.get("valeur_heure_fin_1", "")
                    horaires = f"{debut1}-{fin1}" if debut1 and fin1 else ""
            except json.JSONDecodeError:
                horaires = ""

        # Téléphone
        telephone = ""
        if record.get("telephone"):
            try:
                tel_list = json.loads(record["telephone"])
                if len(tel_list) > 0:
                    telephone = tel_list[0].get("valeur", "")
            except json.JSONDecodeError:
                telephone = ""

        # Pivot / type
        type_service = ""
        if record.get("pivot"):
            try:
                pivot_list = json.loads(record["pivot"])
                if len(pivot_list) > 0:
                    type_service = pivot_list[0].get("type_service_local", "")
            except json.JSONDecodeError:
                type_service = ""

        # Email
        email = record.get("adresse_courriel", "")

        # Latitude / Longitude
        latitude = ""
        longitude = ""
        if record.get("adresse"):
            try:
                addr_list = json.loads(record["adresse"])
                if len(addr_list) > 0:
                    coord = addr_list[0]
                    latitude = coord.get("latitude", "")
                    longitude = coord.get("longitude", "")
            except json.JSONDecodeError:
                latitude = ""
                longitude = ""

        results.append(
            {
                "nom": record.get("nom", ""),
                "type": type_service,
                "adresse": adresse,
                "horaires": horaires,
                "telephone": telephone,
                "email": email,
                "longitude": longitude,
                "latitude": latitude,
            }
        )

    return Response(results)
