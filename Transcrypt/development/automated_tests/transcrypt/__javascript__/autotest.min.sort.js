var sort=function(iterable,key,reverse){
	if(typeof key=="undefined"||key!=null&&key.__class__==__kwargdict__)
		var key=null;
	if(typeof reverse=="undefined"||reverse!=null&&reverse.__class__==__kwargdict__)
		var reverse=false;
	if(arguments.length){
		var __ilastarg0__=arguments.length-1;
		if(arguments[__ilastarg0__]&&arguments[__ilastarg0__].__class__==__kwargdict__){
			var __allkwargs0__=arguments[__ilastarg0__--];
			for(var __attrib0__ in __allkwargs0__)
				switch(__attrib0__){
					case "iterable":var iterable=__allkwargs0__[__attrib0__];break;
					case "key":var key=__allkwargs0__[__attrib0__];break;
					case "reverse":var reverse=__allkwargs0__[__attrib0__];break
				}
		}
	}
	if(key)
		iterable.sort(function __lambda__(a,b){
			if(arguments.length){
				var __ilastarg0__=arguments.length-1;
				if(arguments[__ilastarg0__]&&arguments[__ilastarg0__].__class__==
__kwargdict__){
					var __allkwargs0__=arguments[__ilastarg0__--];
					for(var __attrib0__ in __allkwargs0__)
						switch(__attrib0__){
							case "a":var a=__allkwargs0__[__attrib0__];break;
							case "b":var b=__allkwargs0__[__attrib0__];break
						}
				}
			}
			return key(a)>key(b)
		});
			
	else iterable.sort();
	if(reverse)
		iterable.reverse()
};

var sorted=function(iterable,key,reverse){
	if(typeof key=="undefined"||key!=null&&key.__class__==__kwargdict__)
		var key=null;
	
	if(typeof reverse=="undefined"||reverse!=null&&reverse.__class__==__kwargdict__)
		var reverse=false;
	
	if(arguments.length){
		var __ilastarg0__=arguments.length-1;
		if(arguments[__ilastarg0__]&&arguments[__ilastarg0__].__class__==__kwargdict__){
			var __allkwargs0__=arguments[__ilastarg0__--];
			for(var __attrib0__ in __allkwargs0__)
				switch(__attrib0__){
					case "iterable":var iterable=__allkwargs0__[__attrib0__];break;
					case "key":var key=__allkwargs0__[__attrib0__];break;
					case "reverse":var reverse=__allkwargs0__[__attrib0__];break
				}
		}
	}
					
	var result=copy(iterable);
	sort(result,key,reverse);
	return result};

__pragma__("<all>");
__all__.Exception=Exception;
__all__.sort=sort;
__all__.sorted=sorted;
__pragma__("</all>")
}
}
}
);

__nest__(__all__,"",__init__(__all__.org.transcrypt.__base__));

var __envir__=__all__.__envir__;
__nest__(__all__,"",__init__(__all__.org.transcrypt.__standard__));

var Exception=__all__.Exception;
var sort=__all__.sort;
var sorted=__all__.sorted;


