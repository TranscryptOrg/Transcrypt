"general_functions",{
	__all__:{
		__inited__:false,__init__:function(__all__){
			var run=function(autoTester){
				var a=list([1,5,3,2,-1]);
				var b=list(["sun","earth","moon"]);
				autoTester.check(sorted(a));
				autoTester.check(sorted(b));
				
				sort(a);
				autoTester.check(a);
				sort(b);
				autoTester.check(b);
				
				autoTester.check(sorted(a,__kwargdict__({reverse:true})));
				autoTester.check(sorted(b,__kwargdict__({reverse:true})));
				
				sort(a,__kwargdict__({reverse:true}));
				autoTester.check(a);
				sort(b,__kwargdict__({reverse:true}));
				autoTester.check(b);
				sort(b,__kwargdict__({key:function __lambda__(x){
					return len(x)}}));
				autoTester.check(b);
				sort(b,__kwargdict__({key:function __lambda__(x){
					return len(x)},reverse:true}));
				autoTester.check(b)
			};
			__pragma__("<all>");
			__all__.run=run;
			__pragma__("</all>")
		}
	}
}

