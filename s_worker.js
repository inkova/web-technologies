let count=0;

onconnect=function(event){

   let port=event.ports[0];

   port.addEventListener("message", () => {
        count+=1;
        hello_num = "You are " + count;
        port.postMessage({phrase: hello_num});
    });

    port.start();
}