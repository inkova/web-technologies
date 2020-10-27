let newP = document.createElement("p");
newP.innerHTML ="myscript: start";
document.body.appendChild(newP);

function talk(){
	return "myscript return: Myscript is loaded";
} 

let w1 = new Worker('worker.js');

w1.addEventListener('message',(event)=>{
    let newP2 = document.createElement("p");
    newP2.innerHTML ="myscript: worker (w1) calculated pi: " + event.data['val'];
    document.body.appendChild(newP2);
});

w1.postMessage({n: 6}); 

let w2 = new Worker('worker.js');

w2.addEventListener('message',(event)=>{
    let newP3 = document.createElement("p");
    newP3.innerHTML ="myscript: worker (w2) calculated pi: " + event.data['val'];
    document.body.appendChild(newP3);
});

w2.postMessage({n: 2}); 

let sw = new SharedWorker('s_worker.js');

sw.port.addEventListener("message", event => {
      let newP4 = document.createElement("p");
      newP4.innerHTML ="myscript: shared_worker (sw): " + event.data['phrase'];
      document.body.appendChild(newP4);
    });

let pNum = document.getElementById('num');
pNum.onclick = function(event) {
   sw.port.postMessage('hello');
  };

sw.port.start();



let newP1 = document.createElement("p");
newP1.innerHTML ="myscript: end";
document.body.appendChild(newP1);