from django.urls import path, include
from .views import *
urlpatterns = [
    path('getvowels', getVowels),
    path('scrape', scrape)
]