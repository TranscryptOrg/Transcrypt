> Important Note: I'm waiting for an update to occur in transcrypt's source code. This plugin works fine with or without this change, but autoreload--rebundling automatically when you save--is disabled until that change goes through.

Code in Python 3. Bundle to Javascript.
===============================================
*Adds a `Py3 -> Javascript` transpiler to your [Parcel Bundler](https://parceljs.org/) build tool chain.*

Web scripts are no longer simple Javascript files linked with `<script src=...>`. Using bundlers like [Webpack](https://webpack.js.org/) and [Parcel](https://parceljs.org/), today's web projects sport languages like *TypeScript*, *CoffeeScript*, *SCSS*, *Less*, and *ES6 Javascript*--often mixed together in a single project.

**Bundling** is the art of collecting all this diversity into bundles that browsers can understand and run efficiently. And while the bundler runs the overall process, it needs plugins (like this one) to transpile everything into plain 'ole *Javascript*, *CSS*, and *HTML*.

This package is exactly that glue: it runs [Transcrypt](http://www.transcrypt.org/) (the `.py -> .js` transpiler) whenever [Parcel](https://parceljs.org/) finds a `.py` file, effectively turning *Python* into *Javascript* automagically.

Why?
-------
- **Why Python?** If you haven't cried "abomination!" yet, it's probably safe to assume that you and I share a love for a certain Monty-Python-inspired language. Perhaps you even share my dislike for that other language we're forced to use. :)
- **Why Transcrypt?** It's is the best implementation I've seen to date to get Python into the browser. Of the many approaches taken over the years, transpiling to Javascript seems to be the "right" way. Plus, you get to say cool words like "transpiling". (I'm not the author of transcrypt, if you are wondering.)
- **Why Bundle?** Bundling represents today's best practices approach for Javascript development. Bundlers are the backbone of the toolchain, and they create efficient, minified websites that run on any browser.
- **Why Parcel?** It's a zero-configuration, fairly simple bundler. If you're used to Python's philosophy of [one obvious, clean way](https://www.python.org/dev/peps/pep-0020/), the "wild, wild west" of the Javascript world can be a bit of a shock. Which was it again: `export`, `import`, `modules.exports`, `<script src=>`, `window.myglobal`, `define`, `require`, `jQuery plugins`, `exports.myglobal`? Just kidding, JS fanpeople (well, kinda).  Or was it `Promise`, `Deferred`, `A+`, `Bluebird`, `Q`. That one's easy, though, since Q was a continuum god.
- **Why parcel-plugin-python?** To glue it all together. Just don't inhale too much.

Installation
--------------
1. Install [Transcrypt](http://www.transcrypt.org/). Instructions are at the website. I'd suggest trying out a few examples so you get used to transcrypt before moving on to bundling. Ensure you can create python, compile it, and run within a browser.
1. Install [npm](https://npmjs.org/) and [Parcel](https://parceljs.org/). Instructions are at the websites.
1. Create an empty folder, and initialize npm: `npm init`. (all commands are done in a console within your project directory)
1. Install Parcel: `npm install parcel-bundler --save-dev`
1. Ensure Parcel runs within your project folder: `npx parcel --help`
1. Install this plugin: `npm install parcel-plugin-python --save-dev`
1. Ensure Transcrypt runs within your project folder: `python3 -m transcrypt`

> Parcel automatically discovers the plugin (because of its name prefix in `package.json`), so you don't have to add the plugin to any config files.


Configuration
---------------
Q: Wait, I thought you just said it doesn't need configuration?

A: You only need this section if you want to customize how transcrypt gets called. Just spruce up your `package.json` file with something like this:

```
{
    "name": "My Project",
    "parcel-plugin-python": {
        "command": "python3 -m transcrypt",
        "arguments": [
            /*  note that --build should normally not be used because multiple .py entry points         */
            /*  cause transcrypt to delete the first run's __target__ as it starts the second call.     */

            /*  parcel does minifying, so tell transcrypt to back off.                                  */
            "--nomin",
            /*  parcel expects to read these (if production build, it discards them at bundle time).    */
            "--map",
            /*  make transcrypt chatty so error messages are more useful                                */
            "--verbose"
        ]
    }
}
```


Tutorial
==========
> If you haven't done it yet, install everything (above).

Open a console and change to your project directory (the one with `package.json` in it). All of the following commands and files are done in that root project folder.

Configuration
-------------
Ensure `package.json` contains the following (your package versions will likely be different):

```json
"devDependencies": {
    "parcel-bundler": "^1.10.3",
    "parcel-plugin-python": "^1.0.3"
}
```

Source Files
------------
Create the following two files:

`index.html`
```html
<html>
<body>
    <h1>My First App</h1>
    <div id="app"></div>
    <script src="./main.py"></script>
</body>
</html>
```

`main.py`
```py
# get the "app" div and add an ordered list
app = document.getElementById("app")
ol = app.appendChild(document.createElement('ol'))

# add a few names to the list
for name in [ 'Homer', 'Marge', 'Bart', 'Lisa', 'Maggie' ]:
    li = ol.appendChild(document.createElement('li'))
    li.textContent = f'{name} Simpson'
```

> Your linter might be complaining here because transcrypt python isn't quite regular python. In the above code, we can use ``document`` because our `py -> js` runs in the browser (even if the python linter is upset by it). ```

Bundle 'n Serve
----------------
Run the bundler:
```bash
npx parcel --log-level 4 --no-cache index.html
```

Parcel bundles everything into the `dist/` folder, and then it starts a server daemon. Parcel continues to watch your project for changes, so watch the log messages as you edit and save. Open your browser to [http://localhost:1234](http://localhost:1234).

Boom, baby! Python-style `lists`, `f-strings`, and `for` loops, right in the browser!

> If things don't seem to work when you open the web page, be sure to check the browser console for messages.

> During normal development, you may want to back off on these options. Specifying `--log-level 4` tells Parcel (and this plugin) top be chatty, and `--no-cache` tells it to rebuild fully each time (destroying Parcel's advertised speed).

> You can see the JS generated by Transcrypt in the `__target__` folder. Parcel uses these files when bundling. These files can also be incredibly useful when transpiling doesn't happen as expected. The generated JS is pretty readable, and a few `console.log` statements right in the generated stuff is often the ticket.


Getting Fancy
------------------
Let's continue the example with a few callbacks:

`index.html`
```html
<html>
<body>
    <h1>My Second App</h1>
    <div>
        <button id="addButton">Add Item</button>
        <button id="removeButton">Remove Item</button>
    </div>
    <div id="app"></div>
    <script src="./main.py"></script>
</body>
</html>
```

`main.py`
```py
def ready():
    app = document.querySelector("#app")
    ol = app.appendChild(document.createElement('ol'))
    counter = 1

    def addButtonClicked():
        nonlocal counter
        li = ol.appendChild(document.createElement('li'))
        li.textContent = ', '.join([ 'Item {}'.format(i) for i in range(counter, counter+10) ])
        counter += 10
    document.querySelector('#addButton').addEventListener('click', addButtonClicked)

    def removeButtonClicked():
        if ol.lastChild:
            ol.removeChild(ol.lastChild)
    document.querySelector('#removeButton').addEventListener('click', removeButtonClicked)

document.addEventListener("DOMContentLoaded", ready)
```

* **Event callbacks**: `ready` runs when the page is ready, and the buttons have click events. If you're used to Javascript's nested functions, it can be off-putting to see how callbacks have to be done here. Python just doesn't support anonymous functions, and lambdas are too limited. You'll get used to it, and perhaps you'll even grow to like it. But I do wish Python supported ruby-style, inline functions.
* **nonlocal**: Don't hate on me here. It's just an example to highlight differences between Py and JS. The `nonlocal` statement is not actually needed. While omitting it would break in regular Python, the JS closure it becomes makes it work with or without `nonlocal`. Just like a good Thanksgiving meal, it all ends up together in the end (as JS in the browser, in this case).
* **List comprehension**: Love those things. Waaay better than mapping with embedded functions. SETL ftw! (with comprehensions, anyway)


Imports
------------------
Let's add some imports! We'll do both a Python import and a pure JS import. You'll need four files - careful with the extensions!

`index.html`
```html
<html>
<body>
    <h1>My Third App</h1>
    <div>
        <button id="addButton">Add Item</button>
        <button id="removeButton">Remove Item</button>
    </div>
    <div id="app"></div>
    <script src="./main.py"></script>
</body>
</html>
```

`main.py`
```py
from .counter import Counter
from .remove import removeButtonClicked

def ready():
    app = document.querySelector("#app")
    ol = app.appendChild(document.createElement('ol'))
    counter = Counter()

    def addButtonClicked():
        li = ol.appendChild(document.createElement('li'))
        li.textContent = counter.getNext()
    document.querySelector('#addButton').addEventListener('click', addButtonClicked)

    document.querySelector('#removeButton').addEventListener('click', removeButtonClicked)

document.addEventListener("DOMContentLoaded", ready)
```

`counter.py`
```py
class Counter(object):
    def __init__(self):
        self.counter = 1

    def getNext(self):
        items = [ 'Item {}'.format(i) for i in range(self.counter, self.counter + 10) ]
        self.counter += 10
        return ', '.join(items)
```

`remove.js`
```js
export function removeButtonClicked() {
    let ol = document.querySelector("#app > ol")
    ol.removeChild(ol.lastChild)
}
```

* **Mixing of Python and Javascript Files**: The main python file is able to import other python files AND JS files! It works the other way too.
* **Python Class**: The counter variable has become a proper Python class. It's all grown up! Perhaps someday, it could even become a real iterator.
* **ES6 Javascript**: The JS file is using ES6 syntax. Parcel will make it backwards-compatible during bundling (thanks Babel!).


Deploy
--------------
When you're ready to deploy production code, change the Parcel call to:

```bash
npx parcel --log-level 4 --no-cache build index.html
```

Parcel will produce minified, efficient, production-ready bundles. Deploy everything in the `dist/` folder.

Code in Python, Bundle to Javascript, Deploy, ??, $$$!
