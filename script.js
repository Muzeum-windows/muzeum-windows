// Splash screen
const splash = document.getElementById('splash-screen');
const enterBtn = document.getElementById('enter-btn');
const mainMenu = document.getElementById('main-menu');

enterBtn.onclick = () => {
  splash.style.opacity = '0';
  setTimeout(()=>{ splash.classList.add('hidden'); mainMenu.classList.remove('hidden'); startAutoScroll(); }, 800);
};

// Zakładki
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.onclick = () => {
    const target = tab.dataset.target;
    contents.forEach(c => c.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');
  }
});

// Automatyczne przewijanie zakładek
function startAutoScroll(){
  const tabsContainer = document.getElementById('tabs');
  let scrollPos=0; let direction=1;
  setInterval(()=>{
    tabsContainer.scrollLeft += 2*direction;
    if(tabsContainer.scrollLeft + tabsContainer.clientWidth >= tabsContainer.scrollWidth) direction=-1;
    if(tabsContainer.scrollLeft <= 0) direction=1;
  },50);
}

// Funkcja animacji logów
function animateLogs(logEl, lines, speed=400, colorFunc=null, callback=null){
  let i=0;
  const interval = setInterval(()=>{
    if(i<lines.length){
      let line = lines[i++];
      if(colorFunc) line = `<span style="color:${colorFunc()}">${line}</span>`;
      logEl.innerHTML += line+'\n';
      logEl.scrollTop = logEl.scrollHeight;
    } else {
      clearInterval(interval);
      if(callback) callback();
    }
  }, speed);
}

// DLC #2
document.getElementById('start-simulator').onclick = function(){
  const overlay = document.createElement('div');
  overlay.id='fake-virus';
  overlay.style.cssText='position:fixed; inset:0; background:#001; color:#cfe8ff; z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;';
  overlay.innerHTML = `<h1>Optymizer.exe 2137</h1><p>Symulacja DLC #2</p><pre id="logs"></pre><p id="achievements"></p><button id="exit-sim">Zamknij symulację (ESC)</button>`;
  document.body.appendChild(overlay);
  if(overlay.requestFullscreen) overlay.requestFullscreen();

  const logsEl=document.getElementById('logs');
  const achEl=document.getElementById('achievements');
  const logLines=['[INFO] Optymizer core loaded','[WARN] Defender handshake skipped (simulation)','[INFO] Allocating RAM buffers…','[ERROR] ServiceHost.EXE multiplied','[INFO] Preparing BSOD (fake)'];
  animateLogs(logsEl, logLines, 400, ()=>['#0ff','#6f0','#ff6','#f06','#6ff'][Math.floor(Math.random()*5)], ()=>{ achEl.innerHTML='🏆 Wyjście bez szkód • 🏆 Rzadki Event (1%) • 🏆 Przetrwałeś 21:37'; });

  const exitSim = ()=>{ if(document.fullscreenElement) document.exitFullscreen(); overlay.remove(); };
  document.getElementById('exit-sim').onclick = exitSim;
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') exitSim(); });
};

// DLC #3 – ARG
const argLogs=['[INFO] ARG log 1','[INFO] ARG log 2','[SECRET] Kod: M-U-Z-E-U-M','[INFO] ARG log 4','[INFO] ARG log 5','[SECRET] Kod: O-P-T-Y-M-I-Z-E-R'];
document.getElementById('start-arg').onclick=()=>{
  const logEl=document.getElementById('arg-log'); const resultEl=document.getElementById('arg-result');
  logEl.innerHTML=''; resultEl.innerHTML=''; let clickCount=0;
  animateLogs(logEl,argLogs,500,()=>['#ff6','#6ff','#f0f'][Math.floor(Math.random()*3)], ()=>{
    resultEl.innerHTML='✅ Wszystkie sekrety odkryte! Kliknij 3 razy na sekrety, aby odblokować Easter Egg!';
    // Easter Egg
    const secrets=Array.from(logEl.querySelectorAll('span')).filter(s=>s.textContent.includes('Kod:'));
    secrets.forEach(s=>{ s.onclick=()=>{ clickCount++; if(clickCount>=3){ const egg=document.createElement('div'); egg.className='easter-egg'; egg.textContent='🎉 Easter Egg Odblokowany! 🎉'; document.body.appendChild(egg); setTimeout(()=>egg.remove(),5000); } } });
  });
};

// Tryb Hardcore
document.getElementById('start-hardcore').onclick=()=>{
  const overlay=document.createElement('div');
  overlay.id='hc-overlay'; overlay.style.cssText='position:fixed; inset:0; background:#000; color:#ff5555; z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;';
  overlay.innerHTML=`<h1>🔥 Tryb Hardcore</h1><pre id="hc-log" style="width:80%; height:200px; overflow:auto; text-align:left; background:#111; padding:1rem; border-radius:12px;"></pre><p id="hc-ach" style="color:#6bff95; margin-top:1rem;"></p><button id="exit-hc">Zamknij Hardcore</button>`;
  document.body.appendChild(overlay);
  if(overlay.requestFullscreen) overlay.requestFullscreen();

  const hcLog=document.getElementById('hc-log'); const hcAch=document.getElementById('hc-ach');
  const lines=['[HARDCORE] Etap 1','[HARDCORE] Etap 2','[HARDCORE] BSOD!','[HARDCORE] RAM Eater AI','[HARDCORE] Event 21:37'];
  animateLogs(hcLog,lines,300,()=>['#f06','#ff0','#0ff'][Math.floor(Math.random()*3)],()=>{ hcAch.textContent='🏆 Przetrwałeś Tryb Hardcore!'; });

  const exit=()=>{ if(document.fullscreenElement) document.exitFullscreen(); overlay.remove(); };
  document.getElementById('exit-hc').onclick=exit;
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') exit(); });
};
