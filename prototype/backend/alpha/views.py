from decimal import ROUND_HALF_DOWN
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from textblob import TextBlob
import spacy
import pandas as pd
import nltk
from nlppreprocess import NLP
import re

# Create your views here.
from .views_helpers import * # Helper functions I created
#================================================
# COMMON NAMES
# Scraped data CSV file
RAW = '_data'
# Tokenized data CSV file
TOKENIZED = '_tokenized'
# Cleaned data CSV file
CLEANED = '_cleaned'
# Normalized data CSV file
NORMALIZED = '_normalized'
#================================================
# PYTHON WEB SCRAPER (endpoint function)
def scrape(request):
    # READING REQUEST
    # Target URL
    targeturl = request.GET.get('targeturl')
    # User input
    userinput = request.GET.get('userinput')

    # Printing request obtained values
    print("TARGET URL:", targeturl)
    print("USER INPUT:", userinput)

    # If user input is empty or NoneType...
    r = notEmptyString(userinput)
    if r == False:
        return confirmation('scrape', False)
    elif r == -1:
        return confirmation('scrape', 'User input not readable for this webpage!')
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
    print("Scraping complete!")

    # Extracting individual texts (with indices, for future purposes)
    indices, rawData = [], []
    for i, x in enumerate(results):
        try:
            rawData.append(x.text)
            indices.append(i)
        except: pass
    #------------------------
    # RETURN VALUE FOR CONFIRMATION
    if len(rawData) == 0: return confirmation('scraping', False)
        # (using 'confirmation' from .views_helpers)
    else:
        # Saving as CSV only if scraping results were non-empty
        # (using 'saveCSV' from .views_helpers)
        saveCSV(RAW, ['index', 'value'], list(zip(indices, rawData)))
    return confirmation('scraping', True)
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
#================================================
# WORD TOKENISATION (intermediate function)
# Requires either a user input or a non-empty raw data file
# If user input is missing, then looks into raw data file
def tokenize(request):
    # Ensuring the required NLTK modules are downloaded and are up-to-date
    nltk.download('punkt')
    #------------------------
    # Checking for user input
    # If user input is not empty...
    if userInputPresent(request) == True: scrape(request)
    # 'userInputPresent' is from .viewsHelpers
    #------------------------
    # Obtaining the scraped dataset
    try: data = pd.read_csv(RAW + ".csv")
    except: return False
    #------------------------
    # Tokenizing every text (with indices, for reference purposes)
    indices, tokenizedData = [], []
    for i, x in enumerate(data['value']):
        try:
            tokenizedData.append(nltk.word_tokenize(x))
            indices.append(i)
        except: pass
    #------------------------
    # Saving the tokenized data in the CSV file (for reference purposes)
    saveCSV(TOKENIZED, ['index', 'value'], list(zip(indices, tokenizedData)))
    #------------------------
    # Returning tokenized data
    return tokenizedData
#================================================
# DATA CLEANING (endpoint function)
# Needs tokenized data
"""
PROCESS FLOW
The following functions were intended to be executed in the same order as they are defined here.
'clean' is the function that calls 'format', 'spellCheck' and 'removeStopwords'.
The intended order of the operations is:
- Formatting
- Spell checking
- Stopword removal

(Spell checking may be omitted)
____________
REASON FOR SEPARATION INTO FUNCTIONS
The preprocessing operations were separated into different functions to make the programming and testing process
easier. This makes
- Individual testing easier
- Modification of 'clean' function easier

For example, if the spell-checking operations are taking too long and are not that essential to include,
I can easily comment the 'spellCheck' function call and modify the 'clean' function accordingly.
"""
def format(data):
    # Removing punctuations + Converting to lowercase
    indices, formattedData = [], []
    for i, x in enumerate(data):
        row = []
        for word in x:
            # Removing all words starting with non-alphanumeric or non-space characters
            try:
                if not re.match(r"[^\w\s]", word):
                    row.append(word.lower()) # Converting to lowercase
            except: pass
        # Adding row to the list only if row is non-empty
        if len(row) > 0:
            formattedData.append(' '.join(row))
            indices.append(i)
    """
    NOTE ON MAKING RESULTS AS PROPER STRINGS
    For the spell-checked data, I am saving the results as proper, whole strings.
    This is to facilitate the following NLP processes, that operate on whole strings.
    """
    print("Formatting complete!")

     # Saving the cleaned data in the CSV file (for reference purposes)
    saveCSV(CLEANED + "-formatted", ['index', 'value'], list(zip(indices, formattedData)))
    return formattedData
def spellCheck(data):
    # Correcting spelling
    indices, spellCheckedData = [], []
    for i, x in enumerate(data):
        x, row = x.split(' '), []
        for word in x:
            row.append(str(TextBlob(word).correct()))
        spellCheckedData.append(' '.join(row))
        indices.append(i)
    """
    NOTE ON MAKING RESULTS AS PROPER STRINGS
    For the spell-checked data, I am saving the results as proper, whole strings.
    This is to facilitate the following NLP processes, that operate on whole strings.
    """
    print("Spellling correction complete!")

    # Saving the spell-checked data in the CSV file (for reference purposes)
    saveCSV(CLEANED + "-spellchecked", ['index', 'value'], list(zip(indices, spellCheckedData)))
    return spellCheckedData
def removeStopwords(data):
    # Removing stopwords
    """
    NOTE ON REMOVING STOPWORDS
    We must be careful not to remove words that are important in giving
    context, such as 'not'. Hence, we will use a custom list of stopwords,
    and also convert abbreviated negatives such as 'don't' to 'not'.
    For this purpose, we will be using the library 'nlppreprocess',
    along with a user-defined function to decontract common abbreviations such 'm or 'd,
    hence making stopword removal more complete.
    """
    # Instantiating necessary object
    nlp = NLP()

    indices, noStopwordsData = [], []
    for i, x in enumerate(data):
        processedText = nlp.process(decontracted(x))
        # ('decontracted' from .views_helper)
        if len(processedText) > 0:
            noStopwordsData.append(processedText)
            indices.append(i)
    print("Stopword removal complete!")
    
    # Saving the spell-checked data in the CSV file (for reference purposes)
    saveCSV(CLEANED, ['index', 'value'], list(zip(indices, noStopwordsData)))
    return noStopwordsData
def clean(request):
    tokenizedData = tokenize(request)
    # If no scraped data available for 'tokenize'
    if tokenizedData == False: return confirmation('clean', False)
    #------------------------
    # Removing punctuations + Converting to lowercase
    cleanedData = format(tokenizedData)
    #------------------------
    # Correcting spelling
    # cleanedData = format(cleanedData)
    #------------------------
    # Removing stopwords
    cleanedData = removeStopwords(cleanedData)
    #------------------------
    # RETURN VALUE FOR CONFIRMATION
    if len(cleanedData) == 0: return confirmation('clean', False)
    return confirmation('clean', True)
#================================================
# TOKENIZATION + LEMMATIZATION USING SPACY (endpoint function)
# Main focus is on lemmatization
# We will use the cleaned data we have obtained for efficiency
"""
NOTE ON USAGE OF SPACY VS. NLTK
I tried NLTK lemmatizer, it was not as effective.
Hence, I decided for spaCy, which gave the best results so far.
"""
def normalize(request):
    # Checking for user input
    # If user input is not empty...
    if userInputPresent(request) == True: clean(request)
    #------------------------
    # Obtaining cleaned data
    try: cleanedData = pd.read_csv(CLEANED + ".csv")['value']
    except: return confirmation('normalize', False)
    #------------------------
    # Instantiating tokenizer + lemmatizer i.e. NLP analysis object
    nlp = spacy.load("en_core_web_sm")
    #------------------------
    # Tokenizing & simultaneously lemmatizing each review
    indices, normalizedData = [], []
    for i, x in enumerate(cleanedData):
        # Obtaining tokens for the text
        x, row = nlp(x), []
        for word in x:
            # Obtaining lemma of each token
            row.append(word.lemma_)
        normalizedData.append(' '.join(row))
        indices.append(i)
    """
    NOTE ON MAKING RESULTS AS PROPER STRINGS
    For the normalized data, I am saving the results as proper, whole strings.
    This is because the normalization of data is the text mining process,
    so I want this data to be easily accessible by other functions.
    Storing the texts as proper strings make them easier to split and covert to a list.
    """
    print("Normalization complete!")

    # Saving the lemmatized data in the CSV file (for reference purposes)
    saveCSV(NORMALIZED, ['index', 'value'], list(zip(indices, normalizedData)))
    #------------------------
    # RETURN VALUE FOR CONFIRMATION
    if len(normalizedData) == 0: return confirmation('normalize', False)
    return confirmation('normalize', True)
#================================================
# WORD FREQUENCIES (intermediate function)
# Needs tokenized texts
# The same request structure as 'scrape'
def wordFreq(request):
    # Checking for user input
    # If user input is not empty...
    if userInputPresent(request) == True: clean(request)
    #------------------------
    try: cleanedData = pd.read_csv(CLEANED + ".csv")['value']
    except: return False
    #------------------------
    freqDist = {}
    for x in cleanedData:
        x = x.split(' ')
        for w in x:
            try: freqDist[w] = freqDist[w] + 1
            except: freqDist[w] = 1
    return freqDist
#================================================
# SORTED WORD FREQUENCIES (endpoint function)
# Needs word frequency dictionary
def sortedWordFreq(request):
    freqDist = wordFreq(request)
    if freqDist == False: return confirmation('summarize', False)
    #------------------------
    values = list(freqDist.values())
    keys = list(freqDist.keys())
    maximum = 0
    # Sorting using selection sort
    for i in range(0, len(values)):
        for j in range(i, len(values)):
            if values[j] > values[maximum]:
                maximum = j
        # Swapping maximum element with ith element
        if maximum != i:
            tmp1, tmp2 = values[i], keys[i]
            values[i], keys[i] = values[maximum], keys[maximum]
            values[maximum], keys[maximum] = tmp1, tmp2
    #------------------------
    return JsonResponse({'words': keys, 'freqs': values})