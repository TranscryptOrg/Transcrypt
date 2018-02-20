function animals_loader (urls, args) {
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
        mainUnitTemplate = await (getUnit (urls [0]));
        subUnits = ''
        for (url of urls.slice (1)) {
            subUnits += await (getUnit (url));
        }
        mainUnit = mainUnitTemplate.replace ('__pragma__ (\'<components>\')', subUnits);
        
        console.log ('======')
        console.log (mainUnit)
        console.log ('======')
        
        var mainScript = document.createElement ('script');
        mainScript.type = 'text/javascript';
        var loaderOrOtherScript = document.getElementsByTagName ('script')[0];
        mainScript.text = mainUnit;
        loaderOrOtherScript.parentNode.insertBefore (mainScript, loaderOrOtherScript);

        // The main line of the runtime unit is run before the main lines of all component units,
        // but the runtime unit can have an __run__ function, that is called after the main lines of all component units
        if ('__run__' in window.animals) {
            window.animals.__run__ (args);
        }
    }

    load (urls);    
}
