// Smooth Scroll
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// Animated Counter
function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let obj = document.getElementById(id);

  let timer = setInterval(function() {
    current += increment;
    obj.innerHTML = current.toLocaleString();
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Demo Stats (replace later with real API)
animateValue("holders", 0, 1287, 2000);
animateValue("marketcap", 0, 850000, 2500);
animateValue("supply", 0, 1000000000, 3000);

// Particles Background
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f0ff",
      opacity: 0.4,
      width: 1
    }
  }
});
