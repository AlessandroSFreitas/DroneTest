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

    if(Math.abs(lastZ - gamma) > minDiff){
      clearTimeout(tm);

      // telling the body about the direction for the animation
      if (gamma > 0) {
          document.body.setAttribute('data-moving', 'left');
          line.style.width = (-gamma * 1.1) + 'px';
          line.style.transform = 'translateY(' + (gamma*.1) + 'px)';
      }
      if (gamma < 0) {
          line.style.width = (gamma * 0.5) + 'px';
          document.body.setAttribute('data-moving', 'right');
      }

      wip = (gamma - lastZ)/wipDivizor;

      drone.style.transform = "rotateZ("+(-1*(gamma + wip))+"deg)";

      tm = setTimeout(_=>{
        drone.style.transform = "rotateZ("+(-1*(gamma - wip))+"deg)";
      }, 400);

      // and now we store the gamma
      lastZ = gamma;
    }

    // gatting farther or closer (Eixo X)
    if (Math.abs(lastY - beta) > minDiff) {
      drone.style.width = (beta + 200) + 'px';
      lastY = beta;
    }
  }

  window.addEventListener("deviceorientation", handleOrientation, true);
})();

(() => {
  const startBtn = document.querySelector('#start');
  const output = document.querySelector('#output');
  function start() {
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.start();
    // This event happens when you talk in the microphone
    recognition.onresult = function(event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          // Here you can get the string of what you told
          const command = document.querySelector('.command');
          const content = event.results[i][0].transcript.trim();
          if (content == 'stop') {
            console.log(content == 'stop')
            document.body.setAttribute('command', 'stop');
          }

          if (content == 'go') {
            document.body.setAttribute('command', 'go');
          }
          output.textContent = content;
        }
      }
    };
  };

  startBtn.addEventListener('click', () => start())
})();
