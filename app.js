/* SolPrep - Core Engine */
const APP=(()=>{
const S={page:'dashboard',progress:{m1:0,m2:0,m3:0,m4:0,m5:0,m6:0},bookmarks:new Set(),completed:new Set(),flashIdx:0,mockRound:0,mockQ:0,mockScore:0,timerInterval:null,timerSec:0};
function save(){localStorage.setItem('solprep',JSON.stringify({...S,bookmarks:[...S.bookmarks],completed:[...S.completed]}))}
function load(){try{const d=JSON.parse(localStorage.getItem('solprep'));if(d){Object.assign(S,d);S.bookmarks=new Set(d.bookmarks||[]);S.completed=new Set(d.completed||[])}}catch(e){}}
function nav(p){S.page=p;render();window.scrollTo(0,0)}
function totalProg(){const v=Object.values(S.progress);return Math.round(v.reduce((a,b)=>a+b,0)/v.length)}
function render(){
const app=document.getElementById('app');
app.innerHTML=`
${renderNav()}
${S.page==='dashboard'?renderHero():''}
<div class="container">
${S.page==='dashboard'?renderDashboard():''}
${S.page==='course'?renderCourse():''}
${S.page==='practice'?renderPractice():''}
${S.page==='lab'?renderLab():''}
${S.page==='revision'?renderRevision():''}
${S.page==='interview'?renderInterview():''}
${S.page==='projects'?renderProjects():''}
${S.page==='module'?renderModuleDetail():''}
</div>
<footer><div style="margin-bottom:12px">⚡ SolPrep — Built for Senior Solana Developers · 2026</div><div style="display:flex;justify-content:center;gap:20px;margin-top:8px"><a href="https://www.youtube.com/@upendrabuilds" target="_blank" rel="noopener" style="color:var(--text3);text-decoration:none;transition:color 0.2s;display:flex;align-items:center;gap:6px;font-size:0.8rem" onmouseover="this.style.color='#FF0000'" onmouseout="this.style.color='var(--text3)'">▶ Video Tutorials</a><a href="https://github.com/upendra-eth/sol-prep" target="_blank" rel="noopener" style="color:var(--text3);text-decoration:none;transition:color 0.2s;display:flex;align-items:center;gap:6px;font-size:0.8rem" onmouseover="this.style.color='var(--indigo)'" onmouseout="this.style.color='var(--text3)'">⭐ Star on GitHub</a></div></footer>
<div class="mobile-menu" id="mobileMenu">${['dashboard','course','practice','lab','revision','interview','projects'].map(p=>`<button class="nav-link ${S.page===p?'active':''}" onclick="APP.nav('${p}');document.getElementById('mobileMenu').classList.remove('open')">${p[0].toUpperCase()+p.slice(1)}</button>`).join('')}</div>`;
bindEvents();
}
function renderNav(){
const links=['dashboard','course','practice','lab','revision','interview','projects'];
const icons=['📊','📚','✏️','💻','🔄','🎯','🏗️'];
return `<nav class="nav"><a class="nav-brand" onclick="APP.nav('dashboard')">⚡ <span>SolPrep</span></a><div class="nav-links">${links.map((l,i)=>`<button class="nav-link ${S.page===l||S.page==='module'&&l==='course'?'active':''}" onclick="APP.nav('${l}')">${icons[i]} ${l[0].toUpperCase()+l.slice(1)}</button>`).join('')}</div><div style="display:flex;align-items:center;gap:12px"><div class="nav-progress" style="--prog:${totalProg()}%"><span>${totalProg()}%</span></div><button class="hamburger" onclick="document.getElementById('mobileMenu').classList.toggle('open')">☰</button></div></nav>`;
}
function renderHero(){
return `<div class="hero"><div class="hero-badge">🧑‍💻 Complete Preparation Platform · 2026</div><h1>Senior Solana Smart Contract<br><span class="grad">Developer Interview Prep</span></h1><p class="hero-sub">Master Solana development with structured courses, 120+ interview questions, hands-on coding labs, mock interviews, and revision tools.</p><div class="hero-stats"><div class="stat"><span class="stat-num">6</span><span class="stat-label">Modules</span></div><div class="stat"><span class="stat-num">120+</span><span class="stat-label">Questions</span></div><div class="stat"><span class="stat-num">6</span><span class="stat-label">Coding Labs</span></div><div class="stat"><span class="stat-num">3</span><span class="stat-label">Mock Rounds</span></div></div><a href="https://www.youtube.com/@upendrabuilds" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;margin-top:28px;padding:10px 20px;border-radius:10px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);color:var(--text2);font-size:0.88rem;text-decoration:none;transition:all 0.3s" onmouseover="this.style.borderColor='rgba(255,0,0,0.3)';this.style.background='rgba(255,0,0,0.04)'" onmouseout="this.style.borderColor='rgba(99,102,241,0.12)';this.style.background='rgba(99,102,241,0.06)'">📺 Prefer video explanations? Watch visual guides →</a></div>`;
}
/* ── DASHBOARD ── */
function renderDashboard(){
const mods=MODULES;
const orbColors=['#6366F1','#8B5CF6','#EC4899','#F59E0B','#14F195','#06B6D4'];
return `<div class="page active"><div class="section-head"><h2>Your Dashboard</h2><p>Track your mastery across all modules</p></div>
<div class="orb-container">${mods.map((m,i)=>{const pct=S.progress['m'+(i+1)]||0;return `<div style="text-align:center" onclick="APP.viewModule(${i})"><div class="orb" style="--orb-color:${orbColors[i]}"><div class="orb-glow"></div><div class="orb-ring" style="--pct:${pct}"><div class="orb-inner"><div class="orb-pct">${pct}%</div></div></div></div><div class="orb-title">${m.short}</div></div>`}).join('')}</div>
<div class="divider"></div>
<div class="grid-3">
<div class="glass glass-card"><span class="card-icon">✅</span><h3>${S.completed.size} Questions Done</h3><p>Out of ${QUESTIONS.length} total questions</p></div>
<div class="glass glass-card"><span class="card-icon">🔖</span><h3>${S.bookmarks.size} Bookmarked</h3><p>Questions saved for review</p></div>
<div class="glass glass-card"><span class="card-icon">🎯</span><h3>Mock Score: ${S.mockScore}%</h3><p>Latest mock interview result</p></div>
</div>
<div class="divider"></div>
<div class="section-head"><h2>📋 Study Plan</h2><p>Suggested focus areas based on your progress</p></div>
<div class="qa-list">${mods.filter((_,i)=>(S.progress['m'+(i+1)]||0)<50).map((m,i)=>`<div class="glass" style="padding:16px 20px;display:flex;align-items:center;gap:12px;cursor:pointer" onclick="APP.viewModule(${MODULES.indexOf(m)})"><span style="font-size:1.4rem">${m.icon}</span><div style="flex:1"><strong>${m.title}</strong><p style="color:var(--text3);font-size:0.85rem">Progress: ${S.progress['m'+(MODULES.indexOf(m)+1)]||0}% — Needs attention</p></div><span class="badge badge-hard">Focus</span></div>`).join('')||'<div class="glass" style="padding:20px;text-align:center">🎉 Great progress! All modules above 50%</div>'}</div>
</div>`;
}
/* ── COURSE ── */
function renderCourse(){
return `<div class="page active"><div class="section-head"><h2>📚 Structured Course</h2><p>Beginner → Advanced → Senior level progression across 6 modules</p></div>
<div class="grid-2">${MODULES.map((m,i)=>`<div class="glass glass-card" onclick="APP.viewModule(${i})"><span class="card-icon">${m.icon}</span><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><h3>${m.title}</h3></div><span class="badge badge-mod">${m.level}</span><p style="margin-top:8px">${m.desc}</p><div style="margin-top:12px;height:4px;background:var(--bg3);border-radius:2px"><div style="height:100%;width:${S.progress['m'+(i+1)]||0}%;background:var(--indigo);border-radius:2px;transition:width 0.5s"></div></div><span style="font-size:0.75rem;color:var(--text3)">${m.topics.length} topics · ${S.progress['m'+(i+1)]||0}% complete</span></div>`).join('')}</div></div>`;
}
S.currentModule=0;
function viewModule(idx){S.currentModule=idx;S.page='module';render()}
function renderModuleDetail(){
const m=MODULES[S.currentModule];
const mqs=QUESTIONS.filter(q=>q.module===m.id);
return `<div class="page active"><button class="btn btn-ghost" onclick="APP.nav('course')">← Back to Modules</button><div class="section-head" style="margin-top:16px"><h2>${m.icon} ${m.title}</h2><p>${m.desc}</p><span class="badge badge-mod" style="margin-top:8px">${m.level}</span></div>
<h3 style="margin:24px 0 16px;font-family:var(--font-head)">📖 Key Concepts</h3>
<div class="qa-list">${m.topics.map(t=>`<div class="glass qa-card" id="t-${t.id}"><div class="qa-q" onclick="this.parentElement.classList.toggle('open')"><span class="qa-q-text">${t.title}</span><span class="qa-toggle">▾</span></div><div class="qa-a"><p>${t.content}</p>${t.code?`<pre>${esc(t.code)}</pre>`:''}</div></div>`).join('')}</div>
<div class="divider"></div>
<h3 style="margin:24px 0 16px;font-family:var(--font-head)">❓ Interview Questions (${mqs.length})</h3>
<div class="qa-list">${mqs.map(q=>`<div class="glass qa-card"><div class="qa-q" onclick="this.parentElement.classList.toggle('open');APP.markDone('${q.id}')"><span class="qa-q-text">${q.q}</span><span class="badge badge-${q.diff}">${q.diff}</span><button class="btn-ghost btn-sm" style="flex-shrink:0" onclick="event.stopPropagation();APP.toggleBM('${q.id}')">${S.bookmarks.has(q.id)?'🔖':'☆'}</button><span class="qa-toggle">▾</span></div><div class="qa-a"><p>${q.a}</p>${q.code?`<pre>${esc(q.code)}</pre>`:''}${q.mistakes?`<p><strong>⚠️ Common Mistakes:</strong></p><ul>${q.mistakes.map(m=>`<li>${m}</li>`).join('')}</ul>`:''}</div></div>`).join('')}</div>
<div style="margin-top:24px;text-align:center;display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><button class="btn btn-primary" onclick="APP.setModProg(${S.currentModule},100)">✅ Mark Module Complete</button><a href="https://www.youtube.com/@upendrabuilds" target="_blank" rel="noopener" class="btn btn-outline" style="text-decoration:none">📺 Watch Visual Guide</a></div>
</div>`;
}
function setModProg(idx,val){S.progress['m'+(idx+1)]=val;save();render()}
function markDone(id){S.completed.add(id);save()}
function toggleBM(id){S.bookmarks.has(id)?S.bookmarks.delete(id):S.bookmarks.add(id);save();render()}
/* ── PRACTICE ── */
S.practiceFilter='all';S.practiceDiff='all';S.practiceSearch='';
function renderPractice(){
let qs=QUESTIONS;
if(S.practiceFilter!=='all')qs=qs.filter(q=>q.module===S.practiceFilter);
if(S.practiceDiff!=='all')qs=qs.filter(q=>q.diff===S.practiceDiff);
if(S.practiceSearch)qs=qs.filter(q=>q.q.toLowerCase().includes(S.practiceSearch.toLowerCase()));
return `<div class="page active"><div class="section-head"><h2>✏️ Practice Questions</h2><p>${QUESTIONS.length} questions across all modules and difficulty levels</p></div>
<div class="search-bar"><input class="search-input" placeholder="Search questions..." value="${S.practiceSearch}" oninput="APP.setSearch(this.value)"></div>
<div class="tabs"><button class="tab ${S.practiceFilter==='all'?'active':''}" onclick="APP.setFilter('all')">All</button>${MODULES.map(m=>`<button class="tab ${S.practiceFilter===m.id?'active':''}" onclick="APP.setFilter('${m.id}')">${m.short}</button>`).join('')}</div>
<div class="tabs"><button class="tab ${S.practiceDiff==='all'?'active':''}" onclick="APP.setDiff('all')">All Levels</button>${['easy','medium','hard','senior'].map(d=>`<button class="tab ${S.practiceDiff===d?'active':''}" onclick="APP.setDiff('${d}')">${d[0].toUpperCase()+d.slice(1)}</button>`).join('')}</div>
<p style="color:var(--text3);font-size:0.85rem;margin-bottom:16px">Showing ${qs.length} questions</p>
<div class="qa-list">${qs.map(q=>`<div class="glass qa-card"><div class="qa-q" onclick="this.parentElement.classList.toggle('open');APP.markDone('${q.id}')"><span class="qa-q-text">${S.completed.has(q.id)?'✅ ':''}${q.q}</span><span class="badge badge-${q.diff}">${q.diff}</span><span class="qa-toggle">▾</span></div><div class="qa-a"><p>${q.a}</p>${q.code?`<pre>${esc(q.code)}</pre>`:''}</div></div>`).join('')}</div></div>`;
}
function setFilter(f){S.practiceFilter=f;render()}
function setDiff(d){S.practiceDiff=d;render()}
function setSearch(v){S.practiceSearch=v;render()}
/* ── LAB ── */
S.labIdx=0;S.labShowSol=false;S.labShowHint=0;
function renderLab(){
const c=CHALLENGES[S.labIdx];
return `<div class="page active"><div class="section-head"><h2>💻 Coding Lab</h2><p>Hands-on Solana programming challenges</p></div>
<div class="tabs">${CHALLENGES.map((ch,i)=>`<button class="tab ${S.labIdx===i?'active':''}" onclick="APP.setLab(${i})">${ch.title}</button>`).join('')}</div>
<div class="glass" style="padding:24px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span class="badge badge-${c.diff}">${c.diff}</span><h3 style="font-family:var(--font-head)">${c.title}</h3></div>
<p style="color:var(--text2);margin-bottom:16px">${c.desc}</p>
<h4 style="margin-bottom:8px">📝 Your Code</h4>
<textarea class="editor-area" id="codeEditor">${c.starter}</textarea>
<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
${c.hints.map((_,i)=>`<button class="btn btn-outline btn-sm" onclick="APP.showHint(${i+1})">💡 Hint ${i+1}</button>`).join('')}
<button class="btn btn-primary btn-sm" onclick="APP.toggleSol()">📖 ${S.labShowSol?'Hide':'Show'} Solution</button>
</div>
${S.labShowHint>0?`<div class="glass" style="padding:12px 16px;margin-top:12px;background:rgba(252,211,77,0.08);border-color:rgba(252,211,77,0.2)"><strong>💡 Hint ${S.labShowHint}:</strong> ${c.hints[S.labShowHint-1]}</div>`:''}
${S.labShowSol?`<div style="margin-top:16px"><h4>✅ Solution</h4><pre>${esc(c.solution)}</pre><h4 style="margin-top:12px">📖 Walkthrough</h4><p style="color:var(--text2)">${c.walkthrough}</p></div>`:''}
</div></div>`;
}
function setLab(i){S.labIdx=i;S.labShowSol=false;S.labShowHint=0;render()}
function showHint(n){S.labShowHint=n;render()}
function toggleSol(){S.labShowSol=!S.labShowSol;render()}
/* ── REVISION ── */
S.revTab='flash';S.flashIdx=0;S.flashFlipped=false;
function renderRevision(){
return `<div class="page active"><div class="section-head"><h2>🔄 Revision System</h2><p>Quick revision, flashcards, and cheat sheets</p></div>
<div class="tabs"><button class="tab ${S.revTab==='flash'?'active':''}" onclick="APP.setRevTab('flash')">🃏 Flashcards</button><button class="tab ${S.revTab==='cheat'?'active':''}" onclick="APP.setRevTab('cheat')">📋 Cheat Sheets</button><button class="tab ${S.revTab==='lastday'?'active':''}" onclick="APP.setRevTab('lastday')">🚀 Last Day Guide</button></div>
${S.revTab==='flash'?renderFlashcards():''}
${S.revTab==='cheat'?renderCheatSheets():''}
${S.revTab==='lastday'?renderLastDay():''}
</div>`;
}
function setRevTab(t){S.revTab=t;S.flashFlipped=false;render()}
function renderFlashcards(){
const fc=FLASHCARDS[S.flashIdx];
return `<div class="flashcard-container" onclick="APP.flipCard()"><div class="flashcard ${S.flashFlipped?'flipped':''}"><div class="flashcard-face flashcard-front"><span class="badge badge-mod" style="margin-bottom:16px">${fc.cat}</span><p style="font-size:1.1rem;font-weight:600">${fc.q}</p><p style="color:var(--text3);font-size:0.8rem;margin-top:16px">Click to flip</p></div><div class="flashcard-face flashcard-back"><p style="font-size:0.95rem;color:var(--text2)">${fc.a}</p></div></div></div>
<div style="display:flex;justify-content:center;gap:12px;margin-top:24px"><button class="btn btn-outline btn-sm" onclick="event.stopPropagation();APP.prevCard()">← Prev</button><span style="padding:8px;color:var(--text3);font-family:var(--font-mono);font-size:0.85rem">${S.flashIdx+1}/${FLASHCARDS.length}</span><button class="btn btn-primary btn-sm" onclick="event.stopPropagation();APP.nextCard()">Next →</button></div>`;
}
function flipCard(){S.flashFlipped=!S.flashFlipped;render()}
function nextCard(){S.flashIdx=(S.flashIdx+1)%FLASHCARDS.length;S.flashFlipped=false;render()}
function prevCard(){S.flashIdx=(S.flashIdx-1+FLASHCARDS.length)%FLASHCARDS.length;S.flashFlipped=false;render()}
function renderCheatSheets(){
return `<div class="qa-list">${CHEATSHEETS.map(cs=>`<div class="glass qa-card"><div class="qa-q" onclick="this.parentElement.classList.toggle('open')"><span class="qa-q-text">${cs.title}</span><span class="qa-toggle">▾</span></div><div class="qa-a"><pre>${esc(cs.content)}</pre></div></div>`).join('')}</div>`;
}
function renderLastDay(){
return `<div class="glass" style="padding:24px"><h3 style="font-family:var(--font-head);margin-bottom:16px">🚀 Last Day Before Interview — Survival Guide</h3>
${LASTDAY.map(s=>`<div style="margin-bottom:20px"><h4 style="color:var(--indigo);margin-bottom:8px">${s.title}</h4><ul style="color:var(--text2);padding-left:20px">${s.points.map(p=>`<li style="margin-bottom:4px">${p}</li>`).join('')}</ul></div>`).join('')}
</div>`;
}
/* ── MOCK INTERVIEW ── */
S.mockActive=false;S.mockRound=0;S.mockQ=0;S.mockAnswered=[];
function renderInterview(){
if(S.mockActive)return renderMockActive();
return `<div class="page active"><div class="section-head"><h2>🎯 Mock Interview Engine</h2><p>Simulate real senior Solana developer interview rounds</p></div>
<div class="grid-3">${MOCK_ROUNDS.map((r,i)=>`<div class="glass glass-card" onclick="APP.startMock(${i})"><span class="card-icon">${r.icon}</span><h3>${r.title}</h3><p>${r.desc}</p><span class="badge badge-mod" style="margin-top:8px">${r.duration} min · ${r.questions.length} questions</span></div>`).join('')}</div></div>`;
}
function startMock(r){S.mockActive=true;S.mockRound=r;S.mockQ=0;S.mockAnswered=[];S.timerSec=MOCK_ROUNDS[r].duration*60;startTimer();render()}
function renderMockActive(){
const r=MOCK_ROUNDS[S.mockRound];
const q=r.questions[S.mockQ];
const mins=Math.floor(S.timerSec/60);const secs=S.timerSec%60;
if(!q)return renderMockResults();
return `<div class="page active"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px"><button class="btn btn-ghost" onclick="APP.endMock()">✕ End Interview</button><div class="timer ${S.timerSec<60?'warning':''}">${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}</div><span style="color:var(--text3);font-family:var(--font-mono)">Q${S.mockQ+1}/${r.questions.length}</span></div>
<div class="glass" style="padding:32px"><span class="badge badge-mod" style="margin-bottom:16px">${r.title}</span><h3 style="font-family:var(--font-head);font-size:1.2rem;margin-bottom:16px">${q.q}</h3>
${S.mockAnswered.includes(S.mockQ)?`<div class="divider"></div><h4 style="color:var(--sol-green);margin-bottom:8px">✅ Ideal Answer</h4><p style="color:var(--text2)">${q.ideal}</p>${q.followUp?`<div style="margin-top:16px;padding:12px 16px;background:rgba(99,102,241,0.05);border-radius:var(--radius-sm)"><strong>🔄 Follow-up:</strong> ${q.followUp}</div>`:''}`:`<textarea class="editor-area" style="min-height:150px" placeholder="Type your answer..."></textarea><button class="btn btn-primary" style="margin-top:12px" onclick="APP.answerMock()">Submit Answer</button>`}
${S.mockAnswered.includes(S.mockQ)?`<button class="btn btn-primary" style="margin-top:16px" onclick="APP.nextMockQ()">Next Question →</button>`:''}
</div></div>`;
}
function answerMock(){S.mockAnswered.push(S.mockQ);render()}
function nextMockQ(){S.mockQ++;render()}
function renderMockResults(){
stopTimer();
const r=MOCK_ROUNDS[S.mockRound];
const score=Math.round((S.mockAnswered.length/r.questions.length)*100);
S.mockScore=score;save();
return `<div class="page active"><div style="text-align:center;padding:40px"><h2 style="font-family:var(--font-head);margin-bottom:12px">🏁 Interview Complete!</h2><p style="color:var(--text2);margin-bottom:24px">${r.title}</p><div class="orb" style="--orb-color:${score>=70?'var(--sol-green)':'var(--accent-pink)'};margin:0 auto"><div class="orb-glow"></div><div class="orb-ring" style="--pct:${score}"><div class="orb-inner"><div class="orb-pct">${score}%</div></div></div></div><p style="margin-top:16px;color:var(--text2)">You answered ${S.mockAnswered.length}/${r.questions.length} questions</p><button class="btn btn-primary" style="margin-top:24px" onclick="APP.endMock()">Back to Rounds</button></div></div>`;
}
function endMock(){S.mockActive=false;stopTimer();render()}
function startTimer(){stopTimer();S.timerInterval=setInterval(()=>{S.timerSec--;if(S.timerSec<=0){S.mockQ=999;render()}const t=document.querySelector('.timer');if(t){const m=Math.floor(S.timerSec/60),s=S.timerSec%60;t.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;if(S.timerSec<60)t.classList.add('warning')}},1000)}
function stopTimer(){clearInterval(S.timerInterval)}
/* ── PROJECTS ── */
function renderProjects(){
return `<div class="page active"><div class="section-head"><h2>🏗️ Project Builder</h2><p>Senior-level portfolio projects with architecture guides</p></div>
<div class="qa-list">${PROJECTS.map(p=>`<div class="glass qa-card"><div class="qa-q" onclick="this.parentElement.classList.toggle('open')"><span class="qa-q-text">${p.icon} ${p.title}</span><span class="badge badge-senior">Senior</span><span class="qa-toggle">▾</span></div><div class="qa-a"><p><strong>📐 Architecture:</strong></p><p>${p.arch}</p><pre>${esc(p.accounts)}</pre><p><strong>🔧 Key Challenges:</strong></p><ul>${p.challenges.map(c=>`<li>${c}</li>`).join('')}</ul><p><strong>🎤 Interview Talking Points:</strong></p><ul>${p.talkingPoints.map(t=>`<li>${t}</li>`).join('')}</ul></div></div>`).join('')}</div></div>`;
}
/* ── UTILS ── */
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function bindEvents(){
document.querySelectorAll('.glass-card').forEach(c=>{
c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;c.style.transform=`translateY(-2px) perspective(600px) rotateX(${y*-4}deg) rotateY(${x*4}deg)`});
c.addEventListener('mouseleave',()=>{c.style.transform=''});
});
}
load();render();
return {nav,render,viewModule,setModProg,markDone,toggleBM,setFilter,setDiff,setSearch,setLab,showHint,toggleSol,setRevTab,flipCard,nextCard,prevCard,startMock,answerMock,nextMockQ,endMock};
})();
