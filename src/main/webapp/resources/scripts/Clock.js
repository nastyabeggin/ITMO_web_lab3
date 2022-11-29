function setTime(){
    let now = new Date();
    let clock = document.getElementById("clock");
    clock.innerHTML = now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

window.onload = function(){
    setTime();
    window.setInterval(function() {setTime()}, 11000);
};