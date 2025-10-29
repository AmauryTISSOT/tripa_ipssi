from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='landing'),
    path('recherche/', views.search_page, name='search'),
]
