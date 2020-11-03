name = input ('Hi, what is your name? ')
print ('Hello', name, 'I am your computer.')

age = float (input ('How old are you? '))

if age < 12:
    print ('Sorry', age, 'is to young to smoke sigars')
elif age < 16:
    print ('If you are', age, 'you do not have a drivers licence yet')
elif age < 30:
    print ('At', age, 'you may already have children')
else:
    print ('At', age, 'you will probably already have some working experience')
    
print ('Reload web page to run again...')
