from django.shortcuts import render, redirect
import requests

def landing_page(request):
    if request.method == "POST":
        profile = request.POST.get("profile")
        territory = request.POST.get("territory")

        # Sauvegarde dans la session
        request.session["profile"] = profile
        request.session["territory"] = territory

        # Redirection vers la page d’accueil
        return redirect("home")

    return render(request, "users/landing.html")


def search_page(request):
    # Récupération du profil depuis la session (choisi sur la landing page)
    profil = request.session.get("profil", "citoyen")
    query = request.GET.get("q", "")
    type_admin = request.GET.get("type", "")
    commune = request.GET.get("commune", "")
    accessibilite = request.GET.get("pmr", "")
    service_en_ligne = request.GET.get("en_ligne", "")

    # URL de l'API officielle (a remplacer!!)
    api_url = "https://api.gouv.fr/annuaire/v1/organismes"

    params = {}
    if commune:
        params["commune"] = commune
    if type_admin:
        params["type"] = type_admin

    try:
        response = requests.get(api_url, params=params)
        services = response.json()
    except Exception:
        services = []

    # Filtrage simple selon le profil (pour débuter)
    if profil == "citoyen":
        suggestions = ["Mairie", "CAF", "Pôle emploi"]
    elif profil == "professionnel":
        suggestions = ["Chambre de commerce", "URSSAF"]
    else:
        suggestions = ["Préfecture", "DRAJES", "Subventions locales"]

    context = {
        "profil": profil,
        "query": query,
        "services": services,
        "suggestions": suggestions,
    }
    return render(request, "users/search.html", context)
