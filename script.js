//JavaScript Calculator
//--------------------------------


window.addEventListener("keydown", function(e){
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
});