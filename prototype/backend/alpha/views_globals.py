# DATA FILE NAMES
# Scraped data CSV file
SCRAPED = '_scraped'
# Tokenized data CSV file
TOKENIZED = '_tokenized'
# Cleaned data CSV file
CLEANED = '_cleaned'
# Normalized data CSV file
NORMALIZED = '_normalized'
# Normalized data CSV file where words with unsuitable POS tags for summary are omitted
SUMMARIZABLE = '_summarizable'
#================================================
# TEXT PROCESSING RELATED
# Stopwords (for sentiment analysis purposes)
stopwords = {'those', 'on', 'own', 'yourselves', 'around', 'between', 'four', 'been', 'alone', 'am', 'then', 'other', 'can', 'regarding', 'hereafter', 'front', 'too', 'used', 'wherein', 'doing', 'everything', 'up', 'onto', 'either', 'how', 'before', 'anyway', 'since', 'through', 'amount', 'now', 'he', 'was', 'have', 'into', 'because', 'therefore', 'they', 'even', 'whom', 'it', 'see', 'somewhere', 'thereupon', 'nothing', 'whereas', 'much', 'whenever', 'seem', 'until', 'whereby', 'at', 'also', 'some', 'last', 'than', 'get', 'already', 'our', 'once', 'will', 'noone', 'that', 'what', 'thus', 'myself', 'out', 'next', 'whatever', 'although', 'though', 'which', 'would', 'therein', 'somehow', 'whereupon', 'besides', 'whoever', 'ourselves', 'few', 'did', 'anything', 'against', 'while', 'if', 'however', 'herself', 'when', 'may', 'ours', 'done', 'seems', 'else', 'call', 'perhaps', 'had', 'nevertheless', 'where', 'otherwise', 'still', 'within', 'its', 'for', 'together', 'elsewhere', 'throughout', 'of', 'others', 'show', 'anywhere', 'anyhow', 'as', 'are', 'the', 'hence', 'something', 'hereby', 'nowhere', 'latterly', 'say', 'does', 'his', 'go', 'put', 'their', 'by', 'namely', 'could', 'unless', 'itself', 'is', 'whereafter', 'down', 'bottom', 'thereby', 'such', 'both', 'she', 'become', 'whole', 'who', 'yourself', 'every', 'except', 'very', 'several', 'among', 'being', 'be', 'mine', 'further', 'here', 'during', 'why', 'with', 'just', 'becomes', 'about', 'a', 'using', 'seeming', 'due', 'wherever', 'beforehand', 'becoming', 'might', 'amongst', 'my', 'empty', 'thence', 'thereafter', 'almost', 'least', 'someone', 'often', 'from', 'keep', 'him', 'or', 'top', 'her', 'nobody', 'sometime', 'across', 'hundred', 'only', 'via', 'name', 'eight', 'three', 'back', 'to', 'all', 'became', 'move', 'me', 'we', 'formerly', 'so', 'i', 'whence', 'under', 'always', 'himself', 'in', 'herein', 'more', 'after', 'themselves', 'you', 'above', 'them', 'your', 'made', 'indeed', 'most', 'everywhere', 'but', 'must', 'along', 'beside', 'hers', 'side', 'former', 'anyone', 'full', 'has', 'yours', 'whose', 'behind', 'please', 'seemed', 'sometimes', 'should', 'over', 'take', 'each', 'same', 'rather', 'really', 'latter', 'and', 'hereupon', 'part', 'per', 'eleven', 'ever', 'enough', 'again', 'us', 'yet', 'moreover', 'mostly', 'one', 'meanwhile', 'whither', 'there', 'toward', 'give', 'do', 'an', 'quite', 'these', 'everyone', 'towards', 'this', 'afterwards', 'beyond', 'make', 'were', 'whether', 'well', 'another', 'below', 'first', 'upon', 'any', 'many', 'serious', 'various'}