# Inspired by "Georgia's Spirals"

from turtle import *

bgcolor ('black')

for a_color, a_pensize, start_radius, stop_radius, radius_step in (
    ('green', 1, 82, 40, -6),       
    ('red', 1, 84, 40, -6), 
    ('white', 2, 98, 50, -5),
    ('yellow', 2, 70, 50, -5),
    ('blue', 2, 97, 70, -5),
    ('orange', 2, 87, 40, -17),
    ('pink', 3, 102, 60, -17),  
):
    pensize (a_pensize)
    color (a_color)
    for angle_index in range (10):
        for radius in range (start_radius, stop_radius, radius_step):
            circle (radius)
        right (36)
        
done ()
