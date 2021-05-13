while True:
    name = input ('What''s your name? ')
    
    if name == '':
        break;
    
    print ('Hi', name, 'I am your computer.')

    age = float (input ('How old are you? '))
    if age < 18:
        print ('Sorry', name, ',', age, 'is too young to drive a car in the Netherlands.')
    else:
        print ('OK', name, ',', age, 'is old enough to drive a car in the Netherlands.')
        
    print ()
    