import logging

logger = logging.getLogger('root')

def load(player_element, sourcefile):
    try:
        audio_element = document.getElementById(player_element)

        if not len(audio_element):
            raise Exception("unable to load audio from element '{}'".format(player_element))

        if len(sourcefile):
            audio_element.src = sourcefile
        return audio_element

    except Exception as e:
        logging.exception(e)

def clip(filename):
    player = __new__(Audio(filename))
    return player

def loop(filename):

    player = __new__(Audio(filename))
    def reset_player():
        player.currentTime = 0
        player.play()
    player.addEventListener('ended', reset_player, False)

    return player