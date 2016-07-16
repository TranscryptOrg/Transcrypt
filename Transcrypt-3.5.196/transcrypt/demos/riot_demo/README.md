# RiotJs Demo

[Riot](https://github.com/riot/riot) is a 'one way binding' component framework, comparable to React but with a far simpler API.

If features a template engine, lifecycle events and tag local namespacing,
all based on HTML5, js and css only.

This demo shows how to write and mount a Riot Tag (sample_tag2.py) in pure Python,
inheriting from a base class which takes care of binding all variables to the tag
instance, so that existing frameworks using riot js based tags can be converted
to Transcrypt, one by one with no(?) effort outside the tag source itself.
The base class is using some direct JS.

## Usage

You can add js logic also outside transcrypt js pragmas, see the riot.tag2
function in the html file.
The transcrypt tag is available via `this.py_obj` from the riot tag and vice
versa via `self.riot_tag`.


## Transpiling and Running

Run the demo with no switches on transcrypt and serve `riot_demo.html`

## Misc

For reference reasons I added a classic JS based tag, including a compiled
version. The compilation can also be done (fast) in the browser for such
classic tags.


## Disclaimer:

I'm for sure no JS expert, there might be a far more elegant way to
have riot's 'this' and Transcrypt's self in sync, e.g. via JS 'inheritance'
mechanics - or maybe using Transcrypt's object extension methods itself.

Gunther Klessinger, gk@axiros.com, Germany
