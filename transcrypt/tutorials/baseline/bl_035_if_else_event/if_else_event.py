nameElement = document.getElementById ('name')
greetingElement = document.getElementById ('greeting')

ageElement = document.getElementById ('age')
messageElement = document.getElementById ('message')

def greet ():
    greetingElement.innerHTML = f'Hi {nameElement.value}, I am your computer'
    
def tell ():
    age = float (ageElement.value)
    if age < 12:
        messageElement.innerHTML = f'Sorry, {age} is to young to smoke sigars'
    elif age < 16:
        messageElement.innerHTML = f'If you are {age} you do not have a drivers licence yet'
    elif age < 30:
        messageElement.innerHTML = f'At {age} you may already have children'
    else:
        messageElement.innerHTML = f'At {age} you will probably already have some working experience'
