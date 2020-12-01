let canv = document.querySelector('canvas');
let width = canv.width;
let height = canv.height;

let r = 50;
let speed = 100;
let x0 = r;
let y0 = height-r;
let a = 500;
let s_x = width-x0;
let t_fall=Math.sqrt(2*y0/a);
let x_fall=t_fall*speed;

function x(progress) {
    return x0 + s_x*progress;
}

function y(x){
    let dir;
    let i_fall = Math.floor((x - x0)/x_fall);

    if(i_fall % 2 === 0){dir=i_fall;} 
    else {dir=i_fall+1;}

    return height - y0 + a/(2*(speed)**2)*(x - (x0 + dir*x_fall))**2;
}

function compression(y){
   let r_y=r;
   let h=height-y; 

   if(h < r/4){coef = 0.25;}
   else if(h < r){coef = h/r;}
   else{coef = 1;}

   return r_y*= coef;
}