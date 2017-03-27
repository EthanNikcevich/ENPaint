/**
 * Created by h205p3 on 3/13/17.
 */
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
var x = "black",
    y = 2;
    l = "Arial";
p=0;
function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);

    y=document.getElementById("userWidth").value;
    ctx.lineWidth = y;

}

function color(obj) {
    x=obj;

    ctx.strokeStyle=obj;

    //if (x == "#ffffff") y = 35;
    //else y = 2; // I wouldn't do this

}

function draw() {

    drawCircle(currX, currY);
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.closePath();
}

function drawCircle(px, py) {

    ctx.beginPath();
    ctx.arc(px,py,y/2,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

function erase() {
    var m = confirm("Are you sure you want to clear?");
    if (m) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.position = "absolute";
    document.getElementById("canvasimg").style.top = "0";
    document.getElementById("canvasimg").style.left = "100%";
}

function widthh() {
    y=document.getElementById("userWidth").value;
    ctx.lineWidth = y;
    document.getElementById("demoWidth").innerHTML = "Width: " + y;
    if (y==0){
        y=2;
        console.log(y);
    }
}

function fontsss(x) {
    l = x;
}

function text() {
    o = document.getElementById("userSize").value+"px ";
    ctx.fillStyle = x;
    ctx.font = o + l;
    console.log(ctx.font = o + l);
    ctx.beginPath();
    ctx.fillText(document.getElementById("userText").value,currX,currY);
    ctx.closePath();
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }

    if (res == 'up' || res == "out") {
        flag = false;
    }

    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

