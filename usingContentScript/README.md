# Extension using content scripts
## Project aims
Understand the usage of content scripts in Chrome extensions
## Code aims
The code will...
- Highlight all the headings in red
- Replace
    - 'the' with 'da'
    - 'that' with 'dat'
    - 'this' with 'dis'

This particular code is designed to work for all URLs, as specified by the manifest. However, you can limit the functioning of this code to certain webpages by mentioning the specific URLs in the "matches" attribute within the "content_scripts" attribute.