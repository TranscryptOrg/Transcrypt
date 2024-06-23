tableText = ''

for tableNr in range (1, 11):
    tableText += f'<b>Table of {tableNr}:</b><br>'
    
    for lineNr in range (1, 11):
        tableText += f'{lineNr} x {tableNr} = {lineNr * tableNr}<br>'
        
    tableText += '<br>'

document.getElementById ('output') .innerHTML = tableText
