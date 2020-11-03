from org.transcrypt.stubs.browser import __pragma__, __envir__

# Note that CPython will ignore all pragma's



# Provide waitAWhile for Transcrypt

__pragma__ ('js', '{}', '''
    function waitAWhile (aTime) {
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

def waitAWhile (aTime):
    return asyncio.sleep (aTime)
    
__pragma__ ('noskip')
    
    
    
# Actual code to be tested    

async def run (autoTester): 
    counter = 0
  
    async def f ():
        autoTester.check ('f0')
        await waitAWhile (2)
        autoTester.check ('f1')

        nonlocal counter
        counter += 1
     
    async def g ():
        autoTester.check ('g0')
        await waitAWhile (2)
        autoTester.check ('g1')

        nonlocal counter
        counter += 1
        
    autoTester.check ('BEGIN async/await test')
    
    if __envir__.executor_name == __envir__.transpiler_name:
        f ()
        g ()
        g ()
        f ()
        
    else:
    
        eventLoop = asyncio.get_event_loop ()
        tasks = [
            eventLoop.create_task (f ()),
            eventLoop.create_task (g ()),
            eventLoop.create_task (g ()),
            eventLoop.create_task (f ()),
        ]

        waitingTasks = asyncio.wait (tasks)
        eventLoop.run_until_complete (waitingTasks)
        eventLoop.close ()
                
    autoTester.check ('END async/await test')
        
    
        