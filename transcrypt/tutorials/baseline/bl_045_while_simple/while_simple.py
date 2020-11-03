import random

a = random.randint (1, 10)
b = random.randint (1, 10)
answer = 1

print ('Type 0 to quit')
print ()

while answer > 0:
    answer = float (input (f'How much is {a} x {b}? '))
  
    if answer == a * b:
        print ('Right')
        print ()
        
        a = random.randint (1, 10)
        b = random.randint (1, 10)
    
    elif answer > 0:
        print ('Wrong, try again...')

