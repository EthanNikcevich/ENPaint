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
}

function color(obj) {
    x=obj;

    if (x == "#ffffff") y = 35;
    else y = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
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
    document.getElementById("canvasimg").style.top = "100%";
    document.getElementById("canvasimg").style.left = "0";
}

function widthh() {
    y=document.getElementById("userWidth").value;
    console.log(y)
}

function fontsss(x) {
    l = x;
}

function text() {
    ctx.fillStyle = x;
    ctx.font = "30px" + l;
    console.log(ctx.font = "30px" + l);
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
