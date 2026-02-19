// Smooth scroll
function scrollToSection(id){ document.getElementById(id).scrollIntoView({behavior:"smooth"}); }

// Animated counters
function animateValue(id,start,end,duration){
  let range=end-start,current=start,increment=end>start?1:-1,stepTime=Math.abs(Math.floor(duration/range)),obj=document.getElementById(id);
  let timer=setInterval(function(){ current+=increment; obj.innerHTML=current.toLocaleString(); if(current==end) clearInterval(timer); }, stepTime);
}

// Demo stats
animateValue("holders",0,1287,2000);
animateValue("marketcap",0,850000,2500);
animateValue("supply",0,1000000000,3000);

// Particles
tsParticles.load("particles-js",{
  particles:{ number:{value:80}, size:{value:3}, move:{speed:1}, links:{enable:true, distance:150, color:"#00f0ff", opacity:0.4, width:1} }
});

// Particle mouse interaction
tsParticles.load("particles-js", {
  fpsLimit:60,
  interactivity:{
    events:{ onHover:{ enable:true, mode:"repulse" } },
    modes:{ repulse:{ distance:100, duration:0.4 } }
  },
  particles:{
    number:{ value:80 },
    size:{ value:3 },
    move:{ speed:1 },
    links:{ enable:true, distance:150, color:"#00f0ff", opacity:0.4, width:1 }
  }
});
