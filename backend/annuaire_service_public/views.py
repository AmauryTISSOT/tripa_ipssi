from django.db import models
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests


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
