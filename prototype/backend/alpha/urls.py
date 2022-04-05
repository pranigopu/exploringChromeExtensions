from django.urls import path
from .views import *
urlpatterns = [
    path('scrape', scrape),
    path('clean', clean),
    path('normalize', normalize),
    path('summarize', sortedWordFreq)
]