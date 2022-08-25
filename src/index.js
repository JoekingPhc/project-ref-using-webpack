// css
import "./css/public.css";
import "./css/index.css";
import "./css/login.css";
// js
import "jquery";
import "./js/public.js";
import "./js/nav.js";

// tree shaking 的触发条件:
// 1. 通过解构方式获取方法, 然后触发tree shaking
// 2. 调用的包必须使用按照es Module 规范 (!important)
//    也就是通过export function a() 单独的一个function
//    但是不能用 export default {}, 因为对象是不支持tree shaking 的
//    因为export出去对象只要存在, 对象内的属性值都会被全部传出去
// 3. 同一个文件下的Tree shaking有触发条件: 那就是mode: 'production'
// 当mode是开发环境是, 不执行Tree shaking
// 4. 对import进来的值如果不进行引用, 则也会被tree shaking