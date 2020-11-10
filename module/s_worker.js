import talk from './talk.js';

let count=0;

self.onconnect=function(event){

   let port=event.ports[0];

   port.addEventListener("message", () => {
        let tt=talk.call(self);
        count+=1;
        hello_num = "You are " + count;
        port.postMessage({mes: tt, phrase: hello_num});
    });

    port.start();
}