$(function () {
    let param_x;
    let param_y;
    let param_r;

    document.querySelectorAll('.x-button').forEach(x => x.addEventListener("mousedown", (function () {
                    param_x.classList.remove("x-button-choose");
                    param_x.classList.add("x-button");
                    x.classList.add("x-button-choose");
                    x.classList.remove("x-button");
                    document.getElementById("main-f:inputX").value = x.innerText;
                    param_x = x;
                }
            )
        )
    );

    document.querySelector("input[type=text]").addEventListener('focus', function (e) {
        document.getElementById('main-f:inputY').classList.remove('errorY');
    });

    document.getElementById("main-f:inputR").addEventListener('change', function () {
        let x, y, r;
        checkR();
        deletePoints();
        drawAll();
    });

    function init() {
        param_x = document.getElementById('main-f:x-button-default');
        if (!param_x.classList.contains("x-button-choose")) {
            param_x.classList.add("x-button-choose");
            param_x.classList.remove("x-button");
        }
        document.getElementById("main-f:inputX").value = param_x.innerText;
    }

    function drawAll() {
        $(".result-table tbody tr").each(function () {
            const x = parseFloat($(this).find("td:nth-child(1)").text());
            const y = parseFloat($(this).find("td:nth-child(2)").text());
            const r = parseFloat($(this).find("td:nth-child(3)").text());
            const ans = $(this).find("td:nth-child(4)").text();
            let flagForR;
            let flagForColor;
            if (!isNaN(x) && !isNaN(y)) {
                flagForColor = ans.includes("да");
                if (param_r) {
                    flagForR = (param_r == r);
                    drawPoint(x, y, param_r, flagForColor, flagForR);
                } else {
                    flagForR = (1 == r);
                    drawPoint(x, y, 1, flagForColor, flagForR);
                }
            }
        });
    }

    function deletePoints() {
        document.querySelectorAll(".good-coord").forEach(x => x.remove());
        document.querySelectorAll(".bad-coord").forEach(x => x.remove());
        document.querySelectorAll(".old-coord").forEach(x => x.remove());
    }

    document.getElementById("main-f:reset").addEventListener('click', function (e) {
        deletePoints();
    });

    init();
    drawAll();


    document.getElementById("main-f:submit").addEventListener('click', function (e) {
        e.preventDefault();
        if (validateAll()) {
            drawPoint(param_x, param_y, param_r, checkAnswer(), true);
        }
    });

    function validateAll() {
        return checkY() && checkX() && checkR();
    }

    function getX() {
        return document.getElementById('main-f:inputX').value;
    }

    function getY() {
        return document.getElementById('main-f:inputY').value;
    }

    function checkX() {
        let x = getX();

        if (!isNaN(parseFloat(x)) && isFinite(parseFloat(x))) {
            param_x = parseFloat(x);
            return true;
        } else return false;
    }

    function checkY() {
        let y = getY();

        if (y >= -5 && y <= 3) {
            //document.getElementById("messageY").innerHTML = "";
            //getY().style.border = "1px solid black";

            param_y = y;
            console.log(param_y);
            if (param_y === -0.0) param_y = 0.0;
            return true;
        } else {
            //getY().style.border = "1px solid red";
            //document.getElementById("messageY").innerHTML = "Проверьте ввод значения Y.";
            document.getElementById('main-f:inputY').classList.add('errorY');
            return false;
        }
    }

    function checkR() {
        let arrayR = [1, 2, 3, 4, 5];
        let select = document.getElementById("main-f:inputR");
        let r = select.options[select.selectedIndex].value;
        if (!isNaN(parseInt(r)) && isFinite(parseInt(r)) && arrayR.includes(parseInt(r))) {
            param_r = parseInt(r);
            return true;
        } else return false;
    }

    function checkAnswer() {
        return rectangle() || triangle() || circle();
    }

    function rectangle() {
        return param_x >= 0 && param_x <= param_r / 2 && param_y >= 0 && param_y <= param_r;
    }

    function triangle() {
        return param_x <= 0 && param_x >= -param_r / 2 && param_y <= 0 && param_y >= -param_x * 2 - param_r;
    }

    function circle() {
        return param_x <= 0 && param_x >= -param_r && param_y >= 0 && param_y * param_y <= -param_x * param_x + param_r * param_r;
    }

    document.querySelector("svg").addEventListener('mousedown', function (e) {
        if (checkR()) {
            param_x = ((e.offsetX - 193) * param_r / 140).toFixed(1);
            param_y = ((193 - e.offsetY) * param_r / 140).toFixed(1);
            document.getElementById('main-f:inputY').value = param_y.toString().substr(0, 4);
            document.getElementById("main-f:inputX").value = param_x.toString().substr(0, 4);
            document.getElementById("main-f:submit").click();
        } else {
            alert('Выберите радиус R!');
        }
    });

    function drawPoint(x, y, r, flagForColor, flagForR) {
        let point = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        point.setAttribute('cx', (193 + 140 * x / r).toString());
        point.setAttribute('cy', (193 - 140 * y / r).toString());
        //point.setAttribute('r', 4 .toString());
        point.setAttributeNS(null, 'r', '4');
        point.setAttribute('data-x', x);
        point.setAttribute('data-y', y);


        if (!flagForR) point.classList.add("old-coord");
        else if (flagForColor)
            point.classList.add("good-coord");
        else point.classList.add("bad-coord");
        document.getElementById("svg").appendChild(point);
    }

});