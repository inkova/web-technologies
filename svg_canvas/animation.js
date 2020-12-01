let ellipse = document.querySelector('ellipse');
function draw_svg(x_cur, y_cur, r_x, r_y) {
    ellipse.setAttribute('cx', x_cur + 'px');
    ellipse.setAttribute('cy', y_cur + 'px');
    ellipse.setAttribute('rx', r_x + 'px');
    ellipse.setAttribute('ry', r_y + 'px');
}

let ctx = canv.getContext('2d');
function draw_canv(x_cur, y_cur, r_x, r_y) {
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = 'red';
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x_cur, y_cur, r_x, r_y, 0, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    ctx.stroke();
}

function draw(progress) {
    let x_current = x(progress)
    let y_current = y(x_current);
    let inversed_y = 400 - y_current;   
    let coef;
    let r_x = r/compression(y_current);
    let r_y = r*compression(y_current);

    draw_svg(x_current, y_current, r_x, r_y);
    draw_canv(x_current, y_current, r_x, r_y);
}

function animate({duration, draw, timing}){
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

animate({
        duration: 5000,
        timing: function timing(timeFraction) {
                return timeFraction;
                },
        draw: draw
    });