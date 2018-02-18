loaderUrl = 'main/__javascript__/aniplant.js'
sub0Url = 'sub0/__javascript__/anilister.js'

function getParts (url) {
    chunks = url.split ('/');
    path = chunks.slice (0, chunks.length - 1) .join ('/');
    tail = chunks [chunks.length - 1];
    tailChunks = tail.split ('.');
    name = tailChunks [0];
    extension = tailChunks [1];
    return [path, name, extension];
}

loaderUrlParts = getParts (loaderUrl);
mainUrl = loaderUrlParts [0] + '/__' + loaderUrlParts [1] + '__.' + loaderUrlParts [2];
mainUrl = loaderUrl;

function getUnit (url) {
    var promise = new Promise (function (resolve, reject) {
        var xhr = new XMLHttpRequest ();
        xhr.open ('GET', url);
        xhr.send ();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log ('Retrieved: ', url);
                    resolve (xhr.responseText);
                }
                else {
                    reject (xhr.status);
                    console.log ('Could not retrieve: ', url);
                }
            }
            else {
                console.log ('Busy retrieving: ', url);
            }
        }
        console.log ('Requested: ', url);
    });
    return promise;
}

async function load (urls) {
    mainUnit = await (getUnit (mainUrl));
    subUnits = ''
    for (url of urls) {
        subUnits += await (getUnit (url));
    }
    mainUnit.replace ('/*<..modules..>*/', subUnits);
    
    var mainScript = document.createElement ('script');
    mainScript.type = 'text/javascript';
    var loaderOrOtherScript = document.getElementsByTagName ('script')[0];
    mainScript.text = mainUnit;
    loaderOrOtherScript.parentNode.insertBefore (mainScript, loaderOrOtherScript);

    aniplant.run ()
}

load ([sub0Url]);