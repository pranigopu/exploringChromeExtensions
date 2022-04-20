# Changes made to the original 'wordcloud2.js' file
- Removed all files except
    - wordcloud.js
    - LICENSE
    - API.md
    - CONTRIBUTING.md
    - README.md
- Set shrinkToFit as true ("wordcloud2.js", line 208) <br> __(This was done so that if a word frequency was scaled too far, it would not be omitted from the wordcloud, instead the wordcloud will shrink to include it)__
- Added comment about AMD module ("wordcloud2.js", line 1229)