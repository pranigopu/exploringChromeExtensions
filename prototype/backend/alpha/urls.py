from django.urls import path
from .views import *
urlpatterns = [
    path('scrape', scrapeEndpoint),
    path('clean', cleanEndpoint),
    path('normalize', normalizeEndpoint),
    path('summarize', scaledWordFreq)
]