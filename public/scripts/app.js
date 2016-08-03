function agarrar(id)
{
    objeto = document.getElementById(id);

        xmouse = event.clientX + window.scrollX;
        ymouse = event.clientY + window.scrollY;

        document.addEventListener("mousemove", mover, true);
        document.addEventListener("mouseup", soltar, true);

    x1 = parseInt(objeto.style.left);
    y1 = parseInt(objeto.style.top);

}

function mover()
{
    var xActual, yActual;

        x2 = event.clientX + window.scrollX;
        y2 = event.clientY + window.scrollY;

    objeto.style.left=(x1 + x2 - xmouse)+"px";
    objeto.style.top=(y1 + y2 - ymouse)+"px";
}

function soltar()
{
        document.removeEventListener("mousemove", mover, true);
        document.removeEventListener("mouseup", soltar, true);
  
 }