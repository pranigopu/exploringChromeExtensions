#================================================
# FOR GET VOWELS
def vowels(string):
    vowels, foundVowels = ['a', 'e', 'i', 'o', 'u'], []
    string = string.lower()
    for c in string:
        if c in vowels: foundVowels.append(c)
    return foundVowels
#================================================
# FOR PYTHON WEB SCRAPER
def getArgs(userinput):
    # Extracting desired tag, ID and class from the input
    """
    NOTE ON USER INPUT INTENDED FORMAT
    By design, user input can be a comma separated value in the format
    id>..., class>..., tag>...
    
    Not all the above options are necessary to add, and by default,
    the input is taken as 'tag'.
    """
    options = ['id', 'class']
    # Keyword arguments (if any) for the coming 'find_all' function
    tag, keywordArgs = '', {}
    userinput = userinput.split(',')
    for u in userinput:
        # Trimming the input (i.e. removing leading and trailing spaces)
        u = u.strip()
        flag = 0
        for o in options:
            try:
                """
                Checking if the start of the input indicates any option, example
                - id> (hence we need to check first 3=2+1 elements)
                - class> (hence we need to check first 6=5+1 elements)

                TO COMPARE
                Hence, to slice the string appropriately, we need to have the range
                0 to length of option + 1
                since length of option must be the last included index
                (as it includes the '>' as well), and
                upper bound index is excluded in Python slicing.

                TO ADD VALUE TO DICTIONARY
                Hence, the value of the ID or class is in the range
                length of option + 1 (excluding the '>') to maximum index
                """
                if o+'>' == u[:len(o)+1]:
                    keywordArgs[o] = u[len(o)+1:]
                    break
            except: pass

            # Flag within the expect block won't update outside the block.
            flag = flag + 1
        
        # If no specifier, then consider as tag (1st non-keyword argument in 'find_all')
        if flag >= len(options):
                tag = u
    return (tag, keywordArgs)

    """
    NOTE ON RETURN VALUE
    The return value must serve as arguments for 'find_all',
    an attribute function of BeautifulSoup objects.

    'find_all' has 1 optional non-keyword argument (for tag), and
    multiple optional keyword arguments (for ID and class).
    We can pack the keyword arguments in a dictionary as
    **keywordArgs
    """