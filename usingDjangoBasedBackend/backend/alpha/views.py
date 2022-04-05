from itertools import count
from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from .viewsHelpers import * # Helper functions I created
#================================================
# GET VOWELS
def getVowels(request):
    userinput = request.GET.get('userinput')
    data = {
        'userinput': userinput,
        'vowels': vowels(userinput)
        # 'vowels' is from the module .viewsHelpers
    }
    return JsonResponse(data)
"""
NOTE ON ATTRIBUTES OF A REQUEST
'request' objects may contain additional attributes.
These are specified in the URL using the following formal:
<base url>?attribute=value

Or for multiple attributes:
<base url>?attribute1=value1&attribute2=value2...

For the above 'getVowels' function, we need to provide:
http://127.0.0.1:8000/alpha/getvowels?userinput=xyz
...to get response of the user input 'xyz'.
If the attribute is not found, 'None' is returned.
"""
#================================================
# PYTHON WEB SCRAPER
import requests
from bs4 import BeautifulSoup
import csv

def scrape(request):
    # READING REQUEST
    # Target URL
    targeturl = request.GET.get('targeturl')

    # User input
    userinput = request.GET.get('userinput')

    # Printing request obtained values
    print("TARGET URL:", targeturl)
    print("USER INPUT:", userinput)
    #------------------------
    # GETTING DOM CONTENTS FROM URL
    html = requests.get(targeturl)
    element = BeautifulSoup(html.content, 'html.parser')
    #------------------------
    # OBTAINING RESULTS
    """
    ABOUT 'find_all'
    'find_all' has 1 optional non-keyword argument (for tag), and
    multiple optional keyword arguments (for ID and class).
    We can pack the keyword arguments in a dictionary as
    **keywordArgs
    (keywordArgs is a previously made dictionary)

    NOTE:
    If the non-keyword argument is '', the results will not return anything,
    since no matches would be found. Hence, we have the below if-else condition...
    """
    # Getting the arguments for the 'find_all' function
    (tag, keywordArgs) = getArgs(userinput)
    # 'getArgs' from the .viewsHelpers module

    # Getting the results
    results = []
    if tag == '': results = element.find_all(**keywordArgs)
    else: results = element.find_all(tag, **keywordArgs)
    
    # Extracting individual texts
    texts = []
    for i, r in enumerate(results):
        texts.append([i, r.text])

    print("Review scrapping completed!")

    # Saving as CSV file
    file = open('data.csv', 'w', encoding='UTF8')
    w = csv.writer(file)
    # Giving header row
    w.writerow(['index', 'value'])
    # Giving texts
    w.writerows(texts)
    #------------------------
    # RETURN VALUE FOR CONFIRMATION
    confirmation = {'success': True}
    if len(texts) == 0:
        confirmation['success'] = False
    return JsonResponse(confirmation)
"""
NOTE ON ATTRIBUTES OF A REQUEST
'request' objects may contain additional attributes.
These are specified in the URL using the following formal:
<base url>?attribute=value

Or for multiple attributes:
<base url>?attribute1=value1&attribute2=value2...

For the above 'scrape' function, we need to provide:
http://127.0.0.1:8000/alpha/name?name=xyz
...to get response of the name 'xyz'.
If the attribute is not found, 'None' is returned.
"""