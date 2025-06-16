print("Expected Output:")

print(10, 11, 12, 13, 14, 150, 10, 11, 12, 13, 14, 151, 10, 11, 12, 13, 14, 152, 10, 11, 12, 13, 14, 153, sep='\n')  #__: skip
# __pragma__ ('ecom')
#?print (0, 1, 2, 3, 4, 50, 0, 1, 2, 3, 4, 52, sep='\n')
# __pragma__ ('noecom')
print('\n\nTest output:')

# __pragma__ ('ecom') # ===================================================================

# --- Executed only by Transcrypt ---
'''?
for i in range (5):
    print (i)
?'''

# --- Executed only by CPython ---
# __pragma__ ('skip')
for i in range (10, 15):
    print (i)
# __pragma__ ('noskip')

# --- Executed only by Transcrypt ---
#?print (50)

# --- Executed only by CPython ---
print (150) #__: skip

def __pragma__ (*args):
    pass
    
#__pragma__ ('noecom') # ===================================================================


# --- Executed by none ---
'''?
for i in range (5):
    print (i)
?'''

# --- Executed only by CPython ---
# __pragma__ ('skip')
for i in range (10, 15):
    print (i)
# __pragma__ ('noskip')

# --- Executed by  none ---
#?print (51)

# --- Executed only by CPython ---
print (151) #__: skip

__pragma__ ('ecom') # ===================================================================

# --- Executed only by Transcrypt ---
'''?
for i in range (5):
    print (i)
?'''

# --- Executed only by CPython ---
# __pragma__ ('skip')
for i in range (10, 15):
    print (i)
# __pragma__ ('noskip')

# --- Executed only by Transcrypt ---
#?print (52)

# --- Executed only by CPython ---
print (152) #__: skip

__pragma__ ('noecom') # ===================================================================

# --- Executed by none ---
'''?
for i in range (5):
    print (i)
?'''

# --- Executed only by CPython ---
# __pragma__ ('skip')
for i in range (10, 15):
    print (i)
# __pragma__ ('noskip')

# --- Executed by none ---
#?print (53)

# --- Executed only by CPython ---
print (153) #__: skip
