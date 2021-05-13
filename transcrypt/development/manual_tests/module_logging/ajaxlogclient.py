# File: ajaxlogclient.py
# Author: Carl Allendorph
# Date: 29NOV2016
#
# Description:
#    This file contains the implementation of a logging client
# to test the ajax logging handler

import logging
import logging.handlers as loghdlr


class HTMLHandler(logging.Handler):
    """ This handler is used to provide a view on the screen of the
    logging messages that have been sent over the AJAX handler. This
    is primarily for debugging purposes.
    """
    def __init__(self, elemId):
        """ Configure the HTML Handler
        @param elemId parent element where we will start pushing
        logging messages.
        """
        logging.Handler.__init__(self)
        self._elem = document.getElementById(elemId)

    def emit(self, record):
        msg = self.format(record)
        if self._elem:
            node = document.createElement("LI")
            content = document.createTextNode(msg)
            node.appendChild(content)
            self._elem.appendChild(node)


def setupLogger():
    root = logging.getLogger()
    root.setLevel(10)

    fmt = logging.Formatter("{levelname}[{asctime}]: {message}","%H:%M:%S", style="{")

    headers = [
        ('X-Requested-With', 'XMLHttpRequest'),
        ('Content-type', 'application/x-www-form-urlencoded'),
        ]

    ahdlr = loghdlr.AJAXHandler("http://127.0.0.1:8081/log", "POST")
    #ahdlr = loghdlr.AJAXHandler("/log")
    ahdlr.setLevel(10)
    ahdlr.setFormatter(fmt)

    htmlHdlr = HTMLHandler("log-output")
    htmlHdlr.setLevel(10)
    htmlHdlr.setFormatter(fmt)

    root.addHandler(ahdlr)
    root.addHandler(htmlHdlr)

    logging.info("Started AJAX Logger")


setupLogger()

def logPeriodic():
    logging.info("Message on The Bus goes Round and Round")

setInterval(logPeriodic, 1000)
