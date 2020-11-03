tableNr = 3
tableText = f'<b>Table of {tableNr}:</b><br>'

for lineNr in range (1, 11):
    tableText += f'{lineNr} x {tableNr} = {lineNr * tableNr}<br>'

document.getElementById ('output') .innerHTML = tableText
