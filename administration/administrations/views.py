from django.shortcuts import render

def home_page(request):
    profile = request.session.get("profile", "inconnu")
    territory = request.session.get("territory", "non défini")

    return render(request, "administrations/home.html", {
        "profile": profile,
        "territory": territory
    })
