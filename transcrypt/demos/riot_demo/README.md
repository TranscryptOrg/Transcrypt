# RiotJs Demo

[Riot](https://github.com/riot/riot) is a 'one way binding' component framework, comparable to React but with a far simpler API.

It features a template engine, lifecycle events and tag local namespacing,
all based on HTML5, js and css only.

This demo shows how to write and mount a Riot Tag (sample_tag2.py) in pure Python,
inheriting from a base class which takes care of binding all variables to the tag
instance, so that existing frameworks using riot js based tags can be converted
to Transcrypt, one by one with no(?) effort outside the tag source itself.
The base class is using some direct JS.

Within `color.py` I added a little out of scope lambda function hackery, as a prove
how well Transcrypt transfers Pythons highlevel into Javascript's low level
world.

## Usage

You can add js logic also outside transcrypt js pragmas, see the riot.tag2
function in the html file. See also the approach patching the `tag2` function
of riot (misc folder).
The transcrypt tag is available via `this.py_obj` from the riot tag and vice
versa via `self.riot_tag`.


## Transpiling and Running

Run the demo with no switches on transcrypt and serve `riot_demo.html`

### Multimodule Development & Debugging

1. For multimodule development you want to disable the browser cache if you
    serve via a simple ETAG unaware http server, e.g. `python -m HTTPServer`

1. Use a change detector and transpile *everything* on change (incl. the
   imports).

#### Console ReTranspile On Change

I find [`entr`](http://entrproject.org/) very convenient:

```
find . -name '*.py' | entr sh -c ' rm -rf __javascript/* ; transcrypt sample2_tag.py'
```

## Misc

For reference reasons I added a classic JS based tag, including a compiled
version. The compilation can also be done (fast) in the browser for such
classic tags.


## Disclaimer:

I am for sure no JS expert, there might be a far more elegant way to
have riot's 'this' and Transcrypt's self in sync, e.g. via JS 'inheritance'
mechanics - or maybe using Transcrypt's object extension methods itself.

Also note, that the logic of the sample2 tag itself should show how
well Transcrypt's generated javascript functions mirror Python's import, inheritance,
assignment and object mutation mechanics - and for sure not how to best organize and
design the actual code.

----

<i>Munich, July 2016, Gunther Klessinger</i>
