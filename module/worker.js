import {calc_pi} from "./calc_pi.js"
import talk from './talk.js';

addEventListener('message',(event)=>{
    let phrase=talk.call(self);
    let mypi = calc_pi(event.data['n']);
    postMessage({mes: phrase, val: mypi});
});


