# Misc Stuff

Assorted stuff related to riot and transcrypt, which might prove useful.

## riot_transcrypt_shared_code.html

If you already have a lot of JS code in Riot Tags and want to start writing new
code in Transcrypt you could use the patched `riot.tag` function as shown in
this file.

> Note: Alternatively, you can just add the transcrypt class as a mixin to riot
> when mounting - but that, according to current riot mixin mechanics, will set
> value of immutables only once, at mount time. In other words: If you write
> python functions only and don't need syncronized ints, floats, bools, then
> simply [mixin](http://riotjs.com/api/#mixins) the Transcrypt tag.




