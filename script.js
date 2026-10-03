const opening=document.getElementById("opening");
const openBtn=document.getElementById("openInvite");
const music=document.getElementById("bgMusic");
const musicToggle=document.getElementById("musicToggle");

openBtn.addEventListener("click", async ()=>{
  opening.classList.add("closed");
  document.body.classList.remove("locked");
  try{ await music.play(); }catch(e){}
  playFirstVideo();
});

musicToggle.addEventListener("click", async ()=>{
  if(music.paused){try{await music.play();}catch(e){} musicToggle.textContent="♫";}
  else{music.pause();musicToggle.textContent="♪";}
});

// Sequential videos: when one ends, the next starts.
const slides=[...document.querySelectorAll(".video-slide")];
const videos=[...document.querySelectorAll(".invite-video")];

function playFirstVideo(){
  if(videos[0]) videos[0].play().catch(()=>{});
}
videos.forEach((video,i)=>{
  video.addEventListener("ended",()=>{
    const next=videos[i+1];
    if(next){
      slides[i+1].scrollIntoView({behavior:"smooth"});
      setTimeout(()=>next.play().catch(()=>{}),700);
    }
  });
});

// Countdown — replace this date/time with the actual Nikah date.
const target=new Date("2026-11-24T18:00:00+05:30").getTime();
function countdown(){
  const diff=Math.max(0,target-Date.now());
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60;
  const s=Math.floor(diff/1000)%60;
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
countdown();setInterval(countdown,1000);

// Gentle reveal animation.
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("seen")});
},{threshold:.15});
document.querySelectorAll(".section").forEach(el=>observer.observe(el));
