from org.transcrypt.stubs.browser import __pragma__, __envir__

# Note that CPython will ignore all pragma's



# Provide waitAWhile for Transcrypt

__pragma__ ('js', '{}', '''
    function waitAWhile (aTime, asio) {
      return new Promise (resolve => {
        setTimeout (() => {
          resolve (aTime);
        }, 1000 * aTime);
      });
    }
''')



# Provide waitAWhile for CPython

__pragma__ ('skip') # Compile time, needed because import is done compile time

import asyncio

def waitAWhile (aTime, asio):
    return asio.sleep (aTime)
        
__pragma__ ('noskip')


    
# Actual code to be tested    
    
async def f (waw, asio):
    print ('f0')
    await waw (2, asio)
    print ('f1')
 
class C:
    def __init__ (self):
        self.aTime = 2
        
    async def g (self, waw, asio):
        print ('g0')
        await waw (self.aTime, asio)
        print ('g1')

c = C ()
    

# Just call async functions for Transcrypt, since in the browser JavaScript is event driven by default
    
if __envir__.executor_name == __envir__.transpiler_name:
    f (waitAWhile, None)
    c.g (waitAWhile, None)
    c.g (waitAWhile, None)
    f (waitAWhile, None)
    
    
    
# Create event loop and tasks for CPython, since it isn't event driven by default
    
else:
    eventLoop = asyncio.get_event_loop ()
    tasks = [
        eventLoop.create_task (f (waitAWhile, asyncio)),
        eventLoop.create_task (c.g (waitAWhile, asyncio)),
        eventLoop.create_task (c.g (waitAWhile, asyncio)),
        eventLoop.create_task (f (waitAWhile, asyncio)),
    ]

    waitingTasks = asyncio.wait (tasks)
    eventLoop.run_until_complete (waitingTasks)
    eventLoop.close ()
