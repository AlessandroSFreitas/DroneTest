(()=>{
  var balloon = document.querySelector('#balloon'),
    line = document.querySelector('.balloon--top'),
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

    if(Math.abs(lastZ - gamma) > minDiff){
      clearTimeout(tm);

      // telling the body about the direction for the animation
      if (gamma > 0) {
        document.body.setAttribute('data-moving', 'right');
        balloon.style.width = (-gamma * 1.1) + 'px';
        balloon.style.transform = 'translateX(' + (gamma*.1) + 'px)';
      }
      if (gamma < 0) {
        balloon.style.width = (gamma * 0.5) + 'px';
        document.body.setAttribute('data-moving', 'left');
      }

      // adding wipplash effect
      wip = (gamma - lastZ)/wipDivizor;

      // rotating the drone
      balloon.style.transform = "rotateZ("+(-1*(gamma + wip))+"deg)";

      tm = setTimeout(_=>{
        // ending the wipplash effect
        balloon.style.transform = "rotateZ("+(-1*(gamma - wip))+"deg)";
      }, 400);

      // and now we store the gamma
      lastZ = gamma;
    }

    if (Math.abs(lastY - beta) > minDiff) {
      // gatting farther or closer
      balloon.style.width = (-beta + 200) + 'px';
      lastY = beta;
    }
  }

  window.addEventListener("deviceorientation", handleOrientation, true);
})();
