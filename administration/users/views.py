from django.shortcuts import render, redirect

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
