
/* ==========================================================
   EDITABLE INTERACTION SCRIPT — Daanish & Adeena
   Opening: envelope -> opening.mp4 -> video-01.mp4 -> page
   ========================================================== */
(function(){
  'use strict';
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn,{once:true}); }
  window.t_onReady = window.t_onReady || ready;
  window.t_onFuncLoad = window.t_onFuncLoad || function(name,fn,time){ if(typeof window[name]==='function'){fn();} else {setTimeout(function(){window.t_onFuncLoad(name,fn,time||100);},time||100);} };
  window.t396_initialScale = window.t396_initialScale || function(t){
    var e=document.getElementById('rec'+t); if(!e) return; var i=e.querySelector('.t396__artboard'); if(!i) return;
    window.tn_scale_initial_window_width ||= document.documentElement.clientWidth;
    var a=window.tn_scale_initial_window_width,r=[],n,l=i.getAttribute('data-artboard-screens');
    if(l){l.split(',').forEach(function(v){r.push(parseInt(v,10));});} else r=[320,480,640,960,1200];
    r.forEach(function(v){if(a>=v)n=v;});
    if(!n) n=r[0];
    try{
      var _='edit'===window.allrecords.getAttribute('data-tilda-mode');
      var c='center'===window.t396_getFieldValue(i,'valign',n,r), s='grid'===window.t396_getFieldValue(i,'upscale',n,r), w=window.t396_getFieldValue(i,'height_vh',n,r), g=window.t396_getFieldValue(i,'height',n,r);
      if(!_&&c&&!s&&!w&&g){var h=parseFloat((a/n).toFixed(3));[i,i.querySelector('.t396__carrier'),i.querySelector('.t396__filter')].forEach(function(x){if(x)x.style.setProperty('--initial-scale-height',Math.floor(parseInt(g,10)*h)+'px');});i.querySelectorAll(':scope > .t396__elem, :scope > .t396__group').forEach(function(x){x.style.zoom=h;});}
    }catch(e){}
  };
})();

/* Original Tilda initialization calls, kept editable and limited to sections that remain. */
window.addEventListener('DOMContentLoaded', function(){
  var ids=['2684632103','2684632403','2684632503','2684632603','2684632703','2684632803','2684633203','2684633403','2684633503'];
  ids.forEach(function(id){ t_onFuncLoad('t396_init',function(){ t396_init(id); }); });
  t_onFuncLoad('t702_initPopup',function(){ t702_initPopup('2684633703'); });
  t_onFuncLoad('t_loadJsFile',function(){ t_loadJsFile('assets/timeless/tilda-variant-select-1.0.min.js.download',function(){}); });
});

/* Original Tilda-style record visibility. */
(function(){
  if(typeof sessionStorage==='undefined') return;
  function show(){document.querySelectorAll('.t-records').forEach(function(el){el.classList.add('t-records_animated');setTimeout(function(){el.classList.add('t-records_visible');},400);});sessionStorage.setItem('visited','y');}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',show,{once:true}); else show();
})();

/* ---------------- OPENING SEQUENCE ---------------- */
(function(){
  var overlay=document.getElementById('weiOverlay');
  var wrap=document.getElementById('weiVideoWrap');
  var first=document.getElementById('weiVideo1');
  var second=document.getElementById('weiVideo2');
  var hero=document.getElementById('wlivVideo');
  var heroWrap=document.getElementById('wlivWrap');
  var audio=document.getElementById('weiAudio');
  var audioBtn=document.getElementById('weiAudioBtn');
  var pauseIcon=document.getElementById('weiIconPause');
  var playIcon=document.getElementById('weiIconPlay');
  if(!overlay||!wrap||!first||!second) return;
  document.body.classList.add('wei-locked');
  var started=false,finished=false;

  function startHero(){
    if(!hero) return;
    hero.currentTime=0;
    var p=hero.play();
    if(p&&p.catch) p.catch(function(){
      var once=function(){hero.play().catch(function(){});document.removeEventListener('touchstart',once);};
      document.addEventListener('touchstart',once,{once:true});
    });
  }
  function finish(){
    if(finished) return; finished=true;
    if(audioBtn){audioBtn.style.visibility='visible';audioBtn.style.opacity='1';}
    if(heroWrap) heroWrap.classList.add('intro-done');
    try{window.dispatchEvent(new Event('webgencyIntroDone'));}catch(e){}
    wrap.classList.remove('wei-video-in');wrap.classList.add('wei-video-out');
    overlay.style.opacity='0';overlay.style.pointerEvents='none';
    document.body.classList.remove('wei-locked');document.body.classList.add('wei-opened');
    setTimeout(function(){overlay.style.display='none';wrap.style.display='none';first.pause();second.pause();startHero();},1400);
  }
  function playSecond(){
    if(finished) return;
    second.currentTime=0; second.classList.add('active'); first.classList.remove('active');
    var p=second.play();
    if(p&&p.catch) p.catch(function(){finish();});
  }
  function start(){
    if(started) return; started=true;
    if(audio){audio.volume=1;var ap=audio.play();if(ap&&ap.catch)ap.catch(function(){});}
    overlay.style.opacity='0';overlay.style.pointerEvents='none';
    setTimeout(function(){overlay.style.display='none';},1400);
    wrap.style.display='flex';wrap.classList.add('wei-video-in');wrap.classList.remove('wei-video-out');
    first.currentTime=0;first.classList.add('active');second.classList.remove('active');
    var p=first.play(); if(p&&p.catch)p.catch(function(){finish();});
  }
  overlay.addEventListener('click',start,{passive:true});
  overlay.addEventListener('touchstart',start,{passive:true});
  first.addEventListener('ended',playSecond);
  second.addEventListener('ended',finish);
  first.addEventListener('error',finish);
  second.addEventListener('error',finish);
  if(audioBtn&&audio){audioBtn.addEventListener('click',function(e){e.stopPropagation();if(audio.paused){audio.play().catch(function(){});pauseIcon.style.display='block';playIcon.style.display='none';}else{audio.pause();pauseIcon.style.display='none';playIcon.style.display='block';}});}
  // Preload both so the crossfade is immediate on mobile.
  first.load();second.load();
})();

/* ---------------- RSVP ---------------- */
(function(){
  document.addEventListener('DOMContentLoaded',function(){
    var form=document.querySelector('#form2684633703');
    if(form){form.addEventListener('submit',function(){form.dataset.localRsvp='1';});}
  });
})();


function t_onReady(func) {if(document.readyState!='loading') {func();} else {document.addEventListener('DOMContentLoaded',func);}}
function t_onFuncLoad(funcName,okFunc,time) {if(typeof window[funcName]==='function') {okFunc();} else {setTimeout(function() {t_onFuncLoad(funcName,okFunc,time);},(time||100));}}function t396_initialScale(t){var e=document.getElementById("rec"+t);if(e){var i=e.querySelector(".t396__artboard");if(i){window.tn_scale_initial_window_width||(window.tn_scale_initial_window_width=document.documentElement.clientWidth);var a=window.tn_scale_initial_window_width,r=[],n,l=i.getAttribute("data-artboard-screens");if(l){l=l.split(",");for(var o=0;o<l.length;o++)r[o]=parseInt(l[o],10)}else r=[320,480,640,960,1200];for(var o=0;o<r.length;o++){var d=r[o];a>=d&&(n=d)}var _="edit"===window.allrecords.getAttribute("data-tilda-mode"),c="center"===t396_getFieldValue(i,"valign",n,r),s="grid"===t396_getFieldValue(i,"upscale",n,r),w=t396_getFieldValue(i,"height_vh",n,r),g=t396_getFieldValue(i,"height",n,r),u=!!window.opr&&!!window.opr.addons||!!window.opera||-1!==navigator.userAgent.indexOf(" OPR/");if(!_&&c&&!s&&!w&&g&&!u){var h=parseFloat((a/n).toFixed(3)),f=[i,i.querySelector(".t396__carrier"),i.querySelector(".t396__filter")],v=Math.floor(parseInt(g,10)*h)+"px",p;i.style.setProperty("--initial-scale-height",v);for(var o=0;o<f.length;o++)f[o].style.setProperty("height","var(--initial-scale-height)");t396_scaleInitial__getElementsToScale(i).forEach((function(t){t.style.zoom=h}))}}}}function t396_scaleInitial__getElementsToScale(t){return t?Array.prototype.slice.call(t.children).filter((function(t){return t&&(t.classList.contains("t396__elem")||t.classList.contains("t396__group"))})):[]}function t396_getFieldValue(t,e,i,a){var r,n=a[a.length-1];if(!(r=i===n?t.getAttribute("data-artboard-"+e):t.getAttribute("data-artboard-"+e+"-res-"+i)))for(var l=0;l<a.length;l++){var o=a[l];if(!(o<=i)&&(r=o===n?t.getAttribute("data-artboard-"+e):t.getAttribute("data-artboard-"+e+"-res-"+o)))break}return r}window.TN_SCALE_INITIAL_VER="1.0",window.tn_scale_initial_window_width=null;

window.dataLayer=window.dataLayer||[];

(function() {var ttt='cebo';var tt='oog';var re=new RegExp("bot|g" + tt + "le|yandex|baidu|bing|msn|duckduckbot|teoma|slurp|crawler|spider|robot|crawling|fa" + ttt + "ok","i");if((re.test(navigator.userAgent))===false&&typeof(sessionStorage)!='undefined'&&sessionStorage.getItem('visited')!=='y'&&document.visibilityState){var style=document.createElement('style');style.type='text/css';style.innerHTML='@media screen and (min-width: 980px) {.t-records {opacity: 0;}.t-records_animated {-webkit-transition: opacity ease-in-out .2s;-moz-transition: opacity ease-in-out .2s;-o-transition: opacity ease-in-out .2s;transition: opacity ease-in-out .2s;}.t-records.t-records_visible {opacity: 1;}}';document.getElementsByTagName('head')[0].appendChild(style);function t_setvisRecs(){var alr=document.querySelectorAll('.t-records');Array.prototype.forEach.call(alr,function(el) {el.classList.add("t-records_animated");});setTimeout(function() {Array.prototype.forEach.call(alr,function(el) {el.classList.add("t-records_visible");});sessionStorage.setItem("visited","y");},400);}
document.addEventListener('DOMContentLoaded',t_setvisRecs);}})();

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684632103');});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684632403');});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684632503');});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684632603');});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684632703');});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684632803');});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684633203');});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684633403');});});

t_onReady(function() {var rec=document.getElementById('rec2684633403');if(!rec) return;var buttons=rec.querySelectorAll('[data-animate-btn-effect] .tn-atom');Array.prototype.forEach.call(buttons,function(button) {var buttonEffect=button.querySelector('.t-btn_wrap-effects');if(!buttonEffect) {button.insertAdjacentHTML('beforeend','<div class="t-btn_wrap-effects"><div class="t-btn_effects"></div></div>');buttonEffect=button.querySelector('.t-btn_wrap-effects');};if(button.offsetWidth>230) {buttonEffect.classList.add('t-btn_wrap-effects_md');};if(button.offsetWidth>750) {buttonEffect.classList.remove('t-btn_wrap-effects_md');buttonEffect.classList.add('t-btn_wrap-effects_lg');}});});

t_onReady(function() {t_onFuncLoad('t396_init',function() {t396_init('2684633503');});});

t_onReady(function() {t_onFuncLoad('t_loadJsFile',function() {t_loadJsFile('https://static.tildacdn.net/js/tilda-variant-select-1.0.min.js',function() {t_onFuncLoad('t_input_checkboxes_init',function() {t_input_checkboxes_init('2684633703','4823796998031');})})});});

t_onReady(function() {t_onFuncLoad('t702_initPopup',function() {t702_initPopup('2684633703');});});

if(!window.mainTracker) {window.mainTracker='tilda';}
window.tildastatcookie='no';setTimeout(function(){(function(d,w,k,o,g) {var n=d.getElementsByTagName(o)[0],s=d.createElement(o),f=function(){n.parentNode.insertBefore(s,n);};s.type="text/javascript";s.async=true;s.key=k;s.id="tildastatscript";s.src=g;if(w.opera=="[object Opera]") {d.addEventListener("DOMContentLoaded",f,false);} else {f();}})(document,window,'aed5bb11e83b8f0989507efd8c6904b3','script','https://static.tildacdn.net/js/tilda-stat-1.0.min.js');},2000);