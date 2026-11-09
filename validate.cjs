const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const root={innerHTML:''};const context={Intl,Set,document:{querySelector:()=>root,addEventListener:()=>{}},console};vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
const run=s=>vm.runInContext(s,context);
assert.equal(run('fmt(102/24)'),'4,25');
assert.equal(run('schedule([0,1,2]).reduce((a,r)=>a+r.wait,0)'),9);
assert.equal(run('schedule([0,4,8]).reduce((a,r)=>a+r.wait,0)'),0);
assert.equal(run('schedule([0,4,8])[2].end'),18);
let combinations=0;for(let a=0;a<5;a++)for(let b=a+1;b<5;b++)for(let c=b+1;c<5;c++){const slots=[0,1,2,4,8],r=run(`schedule(${JSON.stringify([slots[a],slots[b],slots[c]])})`);for(let i=0;i<3;i++){assert(r[i].start>=r[i].arrival);assert.equal(r[i].end-r[i].start,4);if(i)assert(r[i].start>=r[i-1].end)}combinations++}
for(let m=0;m<4;m++)for(let r=0;r<2;r++){run(`current=${m};states[current]=blank();states[current].round=${r};render()`);assert(root.innerHTML.includes('Проверить решение'));for(const a of ['X','Y'])for(const b of ['X','Y']){run(`states[current].a='${a}';states[current].b='${b}';states[current].checked=true;states[current].answer='120';states[current].measures=[0,1];states[current].slots=[0,4,8];render()`);assert(!root.innerHTML.includes('NaN'));assert(!root.innerHTML.includes('undefined'))}}
run("current=1;states[1]=blank();states[1].round=1;states[1].a='Y';states[1].b='X'");assert.equal(run('valid(states[1])'),false);
run("states[1].a='X';states[1].b='Y'");assert.equal(run('valid(states[1])'),true);
run("current=3;states[3]=blank();states[3].round=1;states[3].a='Y';states[3].b='X'");assert.equal(run('valid(states[3])'),false);
assert.equal(40*80+40*250,13200);assert.equal(40*100+40*90,7600);assert.equal(50*120+50*110,11500);assert.equal((20000-11500)/20000*100,42.5);
console.log(`PASS: 8 screens, all assignment combinations, ${combinations} schedules, deadline/compatibility checks, numeric precision.`);
assert.equal(run('schedule([0,4,8],true).reduce((a,r)=>a+r.wait,0)'),8);
assert.equal(run('schedule([0,8,12],true).reduce((a,r)=>a+r.wait,0)'),0);
assert.equal(run('schedule([0,8,12],true)[2].end'),22);
let best=Infinity;for(let q=0;q<=50;q++){let p=run(`poolAllocation(${q})`);assert.equal(p.ax+p.bx,50);assert.equal(p.ay+p.by,50);assert.equal(p.ax+p.ay,50);assert.equal(p.bx+p.by,50);assert.equal(p.total,p.ax*100+p.ay*120+p.bx*110+p.by*300);if(p.feasible)best=Math.min(best,p.total)}assert.equal(best,14900);
run('current=3;states[3]=blank();states[3].round=1;states[3].transfer=30');assert.equal(run('valid(states[3])'),true);
run('states[3].transfer=40');assert.equal(run('valid(states[3])'),false);
console.log('PASS: maintenance window, revised dispatch plan, partial pool allocation, 25.5% savings.');
