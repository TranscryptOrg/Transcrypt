import "../index.js";
import {main} from "./main.py";
import {child_func} from './mymod/child.py';
import {mymod_func} from './mymod/__init__.py';
// import {main} from "./__target__/main.js";


main();
child_func(1);
