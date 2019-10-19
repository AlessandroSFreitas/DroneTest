(()=>{
  var drone = document.querySelector('#drone'),
    line = document.querySelector('.drone--top'),
    lastZ = 0,
    lastY = 0,
    minDiff = 2,
    tm = null,
    wip = 0,
    wipDivizor = 12;

  function handleOrientation(event) {

    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;

    if(Math.abs(lastZ - alpha) > minDiff){
      clearTimeout(tm);

      // telling the body about the direction for the animation
      if (alpha > 0) {
        document.body.setAttribute('data-moving', 'right');
        line.style.width = (alpha * 1.5) + 'px';
        line.style.transform = 'translateZ(5px)';
      }

      // if (alpha < 0) {
      //   document.body.setAttribute('data-moving', 'left');
      //   line.style.width = (-alpha * 1.1) + 'px';
      //   line.style.transform = 'translateZ(-5px)';
      // }

      // adding wipplash effect
      // wip = (alpha - lastZ)/wipDivizor;

      // rotating the balloon
      // balloon.style.transform = "rotateZ("+(1*(alpha + wip))+"deg)";

      // tm = setTimeout(_=>{
      //   // ending the wipplash effect
      //   balloon.style.transform = "rotateZ("+(-1*(alpha - wip))+"deg)";
      // }, 400);

      // and now we store the gamma
      // lastZ = alpha;
    }

    // gatting farther or closer (Eixo X)
    if (Math.abs(lastY - beta) > minDiff) {
      drone.style.width = (beta + 200) + 'px';
      lastY = beta;
    }
  }

  window.addEventListener("deviceorientation", handleOrientation, true);
})();
