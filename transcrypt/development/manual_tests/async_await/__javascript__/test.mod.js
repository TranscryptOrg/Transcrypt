	(function () {
		
		    function waitAWhile (aTime, asio) {
		      return new Promise (resolve => {
		        setTimeout (() => {
		          resolve (aTime);
		        }, 1000 * aTime);
		      });
		    }
		
		var f = async function (waw, asio) {
			print ('f0');
			await waw (2, asio);
			print ('f1');
		};
		var C = __class__ ('C', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.aTime = 2;
			});},
			get g () {return __get__ (this, async function (self, waw, asio) {
				print ('g0');
				await waw (self.aTime, asio);
				print ('g1');
			});}
		});
		var c = C ();
		if (__envir__.executor_name == __envir__.transpiler_name) {
			f (waitAWhile, null);
			c.g (waitAWhile, null);
			c.g (waitAWhile, null);
			f (waitAWhile, null);
		}
		else {
			var eventLoop = asyncio.get_event_loop ();
			var tasks = list ([eventLoop.create_task (f (waitAWhile, asyncio)), eventLoop.create_task (c.g (waitAWhile, asyncio)), eventLoop.create_task (c.g (waitAWhile, asyncio)), eventLoop.create_task (f (waitAWhile, asyncio))]);
			var waitingTasks = asyncio.wait (tasks);
			eventLoop.run_until_complete (waitingTasks);
			eventLoop.close ();
		}
		__pragma__ ('<all>')
			__all__.C = C;
			__all__.c = c;
			__all__.eventLoop = eventLoop;
			__all__.f = f;
			__all__.tasks = tasks;
			__all__.waitingTasks = waitingTasks;
		__pragma__ ('</all>')
	}) ();
