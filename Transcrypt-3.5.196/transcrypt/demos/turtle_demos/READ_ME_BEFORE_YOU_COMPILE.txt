The turtle demos have to be compiled with the switch: -p .user
This is because the modules are initialized after page load by an explicit call: <modulename> ()
