addEventListener('message',(event)=>{
    self.importScripts("calc_pi.js");
    let mypi = calc_pi(event.data['n']);
    postMessage({val: mypi});
});


