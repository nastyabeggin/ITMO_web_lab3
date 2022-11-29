function checkR(){
    let r = parseFloat(document.getElementById('form:value_r').value) * 30;
    if (!(r === 30 || r === 45 || r === 60 || r === 75 || r === 90 || r === 120 || r === 150)) {
        alert("Неверный R !!!");
    }
}

function isValid(x, y, r){
    return (x >= -5 && x <= 3 && y >= -5 && y <= 3 && r >= 1 && r <= 5 && r % 0.5 === 0.);
}