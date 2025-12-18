// Tiny starter game: moving square
(function(){
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');


const state = {
player: {x: 300, y: 160, w: 24, h:24, speed: 160},
keys: {}
};


window.addEventListener('keydown', (e)=>{ state.keys[e.key] = true; });
window.addEventListener('keyup', (e)=>{ state.keys[e.key] = false; });


let last = performance.now();
function loop(now){
const dt = Math.min(0.05, (now - last) / 1000);
update(dt);
render();
last = now;
requestAnimationFrame(loop);
}


function update(dt){
const p = state.player;
let dx = 0, dy = 0;
if (state.keys['ArrowLeft'] || state.keys['a'] || state.keys['A']) dx -= 1;
if (state.keys['ArrowRight'] || state.keys['d'] || state.keys['D']) dx += 1;
if (state.keys['ArrowUp'] || state.keys['w'] || state.keys['W']) dy -= 1;
if (state.keys['ArrowDown'] || state.keys['s'] || state.keys['S']) dy += 1;


// normalize diagonal
if (dx && dy) { dx *= Math.SQRT1_2; dy *= Math.SQRT1_2; }


p.x += dx * p.speed * dt;
p.y += dy * p.speed * dt;


// clamp to canvas
p.x = Math.max(0, Math.min(canvas.width - p.w, p.x));
p.y = Math.max(0, Math.min(canvas.height - p.h, p.y));
}


function render(){
// background
ctx.clearRect(0,0,canvas.width,canvas.height);


// subtle grid
ctx.fillStyle = '#001428';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = 'rgba(0,80,120,0.06)';
ctx.lineWidth = 1;
for (let x=0;x<canvas.width;x+=32){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
for (let y=0;y<canvas.height;y+=32){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }


// player (glowy square)
const p = state.player;
ctx.fillStyle = '#00f0ff';
ctx.fillRect(Math.round(p.x), Math.round(p.y), p.w, p.h);
// glow
ctx.fillStyle = 'rgba(0,240,255,0.12)';
ctx.fillRect(Math.max(0,Math.round(p.x-6)), Math.max(0,Math.round(p.y-6)), p.w+12, p.h+12);


// UI text
ctx.fillStyle = 'rgba(255,255,255,0.85)';
ctx.font = '12px monospace';
ctx.fillText('Defenders Prototype — Position: ' + Math.round(p.x) + ',' + Math.round(p.y), 8, canvas.height - 8);
}


requestAnimationFrame(loop);
})();
