window.onload = function() 
{
    var canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255,255,255,0.";
    ctx.fillRect(30 , 30)
}