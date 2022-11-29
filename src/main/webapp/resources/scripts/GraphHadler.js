// добавление на график меток для X и Y и подписи к ним
document.addEventListener("DOMContentLoaded", function(event) {
    drawLabels();
});

function drawLabels(){
    var svgPlot = document.getElementById("svg-plot");
    var NS = "http://www.w3.org/2000/svg";
    var textZero = document.createElementNS(NS, "text");
    textZero.setAttribute("x", "154")
    textZero.setAttribute("y", "164")
    textZero.setAttribute("font-size", "12px")
    textZero.textContent = String(0)
    svgPlot.appendChild(textZero);

    for (var i = 0; i <= 10; i++) {
        var lineX = document.createElementNS(NS, "line");

        lineX.setAttribute("x1", String(i * 30));
        lineX.setAttribute("x2", String(i * 30));
        lineX.setAttribute("y1", "145");
        lineX.setAttribute("y2", "155");
        lineX.setAttribute("stroke", "#343548");

        if (i % 2 !== 0 && i !== 10 && i !== 5){
            var textX = document.createElementNS(NS, "text");
            var textY = document.createElementNS(NS, "text");

            textX.setAttribute("x", String(i * 30 +4))
            textX.setAttribute("y", "162")
            textX.setAttribute("font-size", "12px")

            textY.setAttribute("y", String(i * 30 +4))
            textY.setAttribute("x", "162")
            textY.setAttribute("font-size", "12px")

            textX.textContent = String(i - 5)
            textY.textContent = String(-(i - 5))
            svgPlot.appendChild(textY);
            svgPlot.appendChild(textX);

        }

        svgPlot.appendChild(lineX);

        var lineY = document.createElementNS(NS, "line");

        console.log(lineY);
        lineY.setAttribute("x1", "145");
        lineY.setAttribute("x2", "155");
        lineY.setAttribute("y1", String(i * 30));
        lineY.setAttribute("y2", String(i * 30));
        lineY.setAttribute("stroke", "#343548");


        svgPlot.appendChild(lineY);
    }
}


function redrawGraph(){
    drawLabels()

    let r = (document.getElementById('form:value_r')).value * 30;

    let triangle = document.getElementById("triangle");
    triangle.setAttribute("points", (150 + r / 2) + ",150 150, " + (150 - r) + " 150,150");
    let rectangle = document.getElementById("rectangle");
    rectangle.setAttribute("points", "150,150 " + (150 + r) + ",150 " + (150 + r) + "," + (150 + r/2) + " 150," + (150 + r/2));
    let circle = document.getElementById("circle");
    circle.setAttribute("d", "M" + (150 - r / 2) + ",150"  + " A" + r / 2 + "," + r / 2 + " 90 0,1 "  + "150," + (150 - r/2) + " L 150,150 Z");
}

function makeDot(x, y, r){
    let svgns = "http://www.w3.org/2000/svg",
        container = document.getElementById( 'svg-plot' );
    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'class', 'shot' );
    circle.setAttributeNS(null, 'cx', 150 + 30 * x);
    circle.setAttributeNS(null, 'cy', 150 - 30 * y);
    circle.setAttributeNS(null, 'r', 2);
    circle.setAttributeNS(null, 'style', 'fill: ' + isHit(x, y, r) + ';stroke-width: 0;' );
    container.appendChild(circle);
}



function isHit(x, y, r){
    if(isCircleZone(x, y, r) || isTriangleZone(x, y, r) || isRectangleZone(x, y, r)){
        return 'green';
    } else return 'red';
}

function isRectangleZone(x, y, r){
    return (x >= 0) && (y <= 0) && (x <= r) && (y >= (-1)*r/2);
}

function isTriangleZone(x, y, r){
    return (x>=0) && (y>=0) && (y <= - 2 * x + r);
}

function isCircleZone(x, y, r){
    return (x * x + y * y <= r / 2 * r / 2) && (x <= 0) && (y >= 0);
}