while True:
    name = input('What is your name? ')
    if name == '':
        break

    print(f'Hi {name}, I am your computer.')

    age = input('How old are you? ')
    if age == '':
        break

    if float(age) < 18:
        print(f'Sorry {name}, {age} is too young to drive a car in the Netherlands.')
    else:
        print(f'OK {name}, {age} is old enough to drive a car in the Netherlands.')

    print()
