import simple_variables
import compound_variables
import functions

request = __new__ (XMLHttpRequest ())

outFileName = '__target__/static_typing.out'
request.open ('GET', outFileName)

def showResult ():
    document.getElementById ('out') .innerHTML = (
            request.responseText
        if request.readyState == XMLHttpRequest.DONE and request.status == 200 else
            f'Could not load {outFileName}, readyState: {request.readyState}, status: {request.status}'
    )
request.onreadystatechange = showResult

request.send ()
