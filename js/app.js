(function(){
"use strict";
var M = window.MODULE, KEY = "rc_modulo_puno_v1";
var A = function(p){ return (window.EMBED && window.EMBED[p]) || p; };
var app = document.getElementById("app");
var LET = ["A","B","C","D"];
var S = load();
var quizState = null, examView = 0, animCleanup = null;

function blank(){ return { v:1, name:"", elapsed:0, st:{}, exam:null, view:{screen:"home"} }; }
function load(){ try{ var s = JSON.parse(localStorage.getItem(KEY)); if(s && s.v===1) return s; }catch(e){} return blank(); }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function stInfo(id){ return S.st[id] || (S.st[id] = { best:0, tries:0, passed:false }); }
function isOpen(id){ if(id===1) return true; if(id===6) return stInfo(5).passed; return stInfo(id-1).passed; }
function esc(t){ return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function fmtTime(s){ s=Math.round(s); var h=Math.floor(s/3600), m=Math.floor(s%3600/60), x=s%60; return (h? h+" h ":"") + m+" min " + (h? "" : x+" s"); }
function mmss(s){ s=Math.max(0,Math.round(s)); return (s/60|0)+":"+("0"+s%60).slice(-2); }
function toast(t,ms){ var d=document.createElement("div"); d.className="toast"; d.textContent=t; document.body.appendChild(d); setTimeout(function(){d.remove();}, ms||2600); }
function go(screen, extra){ if(animCleanup){animCleanup();animCleanup=null;} S.view = Object.assign({screen:screen}, extra||{}); save(); render(); window.scrollTo(0,0); }

/* ---------- header ---------- */
function header(){
  var done=0; for(var i=1;i<=5;i++) if(stInfo(i).passed) done++;
  if(S.exam && S.exam.done) done++;
  document.getElementById("pfill").style.width = (done/6*100)+"%";
  document.getElementById("who").textContent = S.name ? "👤 "+S.name : "";
  var cur = S.view.station || (S.view.screen==="exam"||S.view.screen==="result" ? 6 : 0);
  var h=""; for(var k=1;k<=6;k++){
    var cls = isOpen(k) ? "open" : ""; if(k<6 && stInfo(k).passed) cls="done"; if(k===6 && S.exam && S.exam.done) cls="done";
    if(k===cur) cls+=" cur";
    h += '<button class="'+cls+'" data-step="'+k+'">'+(k<6? k : "🏁")+'</button>';
  }
  var st=document.getElementById("steps"); st.innerHTML=h;
  st.querySelectorAll("button").forEach(function(b){ b.onclick=function(){ if(!S.name) return; var k=+b.dataset.step; if(!isOpen(k)) return toast("🔒 Primero aprueba la estación anterior (3/5)"); if(k===6) openExam(); else go("lesson",{station:k,slide:0}); }; });
}

/* ---------- screens ---------- */
function render(){
  header();
  var v=S.view;
  if(!S.name && v.screen!=="credits") return home();
  ({home:home, map:map, lesson:lesson, quiz:quiz, exam:exam, result:result, credits:credits}[v.screen]||map)();
}

function home(){
  var cont = S.name ? '<button class="btn ok" id="bCont">▶ Continuar como '+esc(S.name)+'</button><button class="btn sec" id="bNew">Empezar de nuevo</button>' : "";
  app.innerHTML =
   '<div class="card"><img class="hero" src="'+A(M.intro.img)+'" alt="Huancané"><div class="cap">Huancané, Puno. Foto: Ronald_John91, CC BY-SA 4.0</div>'+
   '<h1>¿Cómo una sola célula llega a formar a un estudiante de Huancané? 🤔</h1>'+
   '<div class="aud"><div>🎧 Escucha la introducción (1 min)</div><audio controls preload="metadata" src="'+A(M.intro.audio)+'"></audio></div>'+
   '<p class="muted">Módulo de autoaprendizaje · 6 estaciones · 1,5 a 2 horas · Desde nivel básico hasta nivel admisión (UNA Puno / CEPREUNA). Funciona sin internet.</p>'+
   (S.name ? cont : '<label for="nm"><b>Escribe tu nombre para empezar:</b></label><input id="nm" class="big-in" maxlength="40" placeholder="Tu nombre y apellido" autocomplete="name"><button class="btn" id="bGo">¡Empezar! 🚀</button>')+
   '</div>';
  var bGo=document.getElementById("bGo");
  if(bGo) bGo.onclick=function(){ var n=document.getElementById("nm").value.trim(); if(n.length<2) return toast("✏️ Escribe tu nombre"); S=blank(); S.name=n; S.startedAt=Date.now(); go("map"); };
  var bc=document.getElementById("bCont"); if(bc) bc.onclick=function(){ go("map"); };
  var bn=document.getElementById("bNew"); if(bn) bn.onclick=function(){ if(confirm("¿Borrar tu avance y empezar de nuevo?")){ S=blank(); save(); render(); } };
}

function map(){
  var h='<h1>¡Hola, '+esc(S.name)+'! 👋</h1><p class="muted">Aprueba cada estación con <b>3 de 5</b> para desbloquear la siguiente. Tiempo de estudio: '+fmtTime(S.elapsed)+'</p>';
  M.stations.forEach(function(s){
    var i=stInfo(s.id), open=isOpen(s.id);
    var tag = i.passed ? "✅ "+i.best+"/5" : (open ? "⏱ "+s.min+" min" : "🔒");
    h+='<button class="st '+(open?"":"locked")+'" data-st="'+s.id+'"><span class="ic" style="background:'+s.color+'">'+s.emoji+'</span><span><b>'+s.id+'. '+esc(s.name)+'</b><small>'+s.level+'</small></span><span class="tag">'+tag+'</span></button>';
  });
  var eo=isOpen(6), ed=S.exam&&S.exam.done;
  h+='<button class="st '+(eo?"":"locked")+'" data-st="6"><span class="ic" style="background:#caffbf">🏁</span><span><b>6. EXAMEN FINAL</b><small>10 preguntas tipo admisión · 15 min</small></span><span class="tag">'+(ed? "✅ "+S.exam.correct+"/10" : eo? "⏱ 15 min":"🔒")+'</span></button>';
  if(ed) h+='<button class="btn ok" id="bRes">📊 Ver mi resultado</button>';
  h+='<button class="btn sec" id="bHome">🏠 Inicio</button>';
  app.innerHTML=h;
  app.querySelectorAll("[data-st]").forEach(function(b){ b.onclick=function(){ var k=+b.dataset.st; if(!isOpen(k)) return toast("🔒 Primero aprueba la estación anterior (3/5)"); if(k===6) openExam(); else go("lesson",{station:k,slide:0}); }; });
  var br=document.getElementById("bRes"); if(br) br.onclick=function(){ go("result"); };
  document.getElementById("bHome").onclick=function(){ go("home"); };
}

function stationById(id){ return M.stations[id-1]; }

function lesson(){
  var s=stationById(S.view.station), n=S.view.slide||0, sl=s.slides[n], last=n===s.slides.length-1;
  var h='<div class="card slide"><div class="muted">Estación '+s.id+' · '+s.level+' · ~'+s.min+' min</div><h2>'+s.emoji+' '+esc(s.name)+'</h2>';
  if(n===0) h+='<div class="aud"><div>🎧 Escucha la explicación (1 min)</div><audio controls preload="metadata" src="'+A(s.audio)+'"></audio></div>';
  else h+='<details class="aud"><summary style="font-weight:700;color:#2a6f97">🎧 Audio de la estación</summary><audio controls preload="none" src="'+A(s.audio)+'"></audio></details>';
  h+='<h2 style="color:var(--pri)">'+sl.t+'</h2>';
  if(sl.big) h+='<div class="bigl">'+sl.big+'</div>';
  if(sl.pmat) h+='<div class="mn"><div><b>P</b><span>Profase</span></div><div><b>M</b><span>Metafase</span></div><div><b>A</b><span>Anafase</span></div><div><b>T</b><span>Telofase</span></div></div>';
  if(sl.lcpdd) h+='<div class="mn"><div><b>L</b><span>Leptoteno</span></div><div><b>C</b><span>Cigoteno</span></div><div><b>P</b><span>Paquiteno</span></div><div><b>D</b><span>Diploteno</span></div><div><b>D</b><span>Diacinesis</span></div></div>';
  (sl.img||[]).forEach(function(p){ h+='<img class="pic" src="'+A(p)+'" alt="'+esc(sl.t)+'">'; var c=credFor(p); if(c && !sl.cap) h+='<div class="cap"><i>'+c+'</i></div>'; });
  if(sl.cap){ var cc=(sl.img||[]).map(credFor).filter(Boolean).join(" · "); h+='<div class="cap">'+sl.cap+(cc?' <i>('+cc+')</i>':'')+'</div>'; }
  if(sl.anim==="mitosis") h+='<div class="anim" id="anim"></div>';
  if(sl.table){ h+='<table class="rep">'; sl.table.forEach(function(r){ h+='<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>'; }); h+='</table>'; }
  h+='<div class="txt">'+sl.txt.map(function(t){return "<p>"+t+"</p>";}).join("")+'</div>';
  if(sl.tip) h+='<div class="tip">💡 '+sl.tip+'</div>';
  h+='</div><div class="dots">'+(n+1)+' / '+s.slides.length+'</div><div class="nav">'+
     '<button class="btn sec" id="bPrev">'+(n===0?"🗺️ Mapa":"⬅ Atrás")+'</button>'+
     (last? '<button class="btn warm" id="bQuiz">✍️ Practicar (5)</button>' : '<button class="btn" id="bNext">Siguiente ➡</button>')+'</div>';
  if(stInfo(s.id).tries && !last) h+='<button class="btn sec" id="bQuiz2">Ir directo a la práctica ✍️</button>';
  app.innerHTML=h;
  if(sl.anim==="mitosis") animCleanup = mountMitosis(document.getElementById("anim"));
  app.querySelectorAll("img.pic").forEach(function(im){ im.onclick=function(){ zoom(im.src); }; });
  document.getElementById("bPrev").onclick=function(){ if(n===0) go("map"); else go("lesson",{station:s.id,slide:n-1}); };
  var bn=document.getElementById("bNext"); if(bn) bn.onclick=function(){ go("lesson",{station:s.id,slide:n+1}); };
  var bq=document.getElementById("bQuiz")||document.getElementById("bQuiz2"); if(bq) bq.onclick=startQuiz;
  var bq2=document.getElementById("bQuiz2"); if(bq2) bq2.onclick=startQuiz;
}
function credFor(p){ var f=p.split("/").pop(); var c=(window.CREDITS||[]).filter(function(x){return x.file===f;})[0]; if(!c || c.file.indexOf("s_")===0) return ""; return c.artist.replace(/ de la traducción.*/,"")+", "+c.license; }
function zoom(src){ var z=document.getElementById("zoom"); if(!z){ z=document.createElement("div"); z.id="zoom"; z.innerHTML="<img>"; z.onclick=function(){z.style.display="none";}; document.body.appendChild(z);} z.querySelector("img").src=src; z.style.display="flex"; }

/* ---------- practice quiz ---------- */
function startQuiz(){ quizState={i:0, ok:0, answered:false, picks:[]}; go("quiz",{station:S.view.station}); }
function quiz(){
  var s=stationById(S.view.station); if(!quizState) quizState={i:0,ok:0,answered:false,picks:[]};
  var q=quizState;
  if(q.i>=s.quiz.length) return quizEnd(s);
  var it=s.quiz[q.i];
  var h='<div class="card"><div class="muted">Práctica · Estación '+s.id+' · Pregunta '+(q.i+1)+' de 5 · Aciertos: '+q.ok+'</div><div class="q">'+esc(it.q)+'</div>';
  it.o.forEach(function(o,k){ var cls=""; if(q.answered){ if(k===it.a) cls="right"; else if(k===q.pick) cls="wrong"; } h+='<button class="opt '+cls+'" data-k="'+k+'" '+(q.answered?"disabled":"")+'><span class="l">'+LET[k]+'</span>'+esc(o)+'</button>'; });
  if(q.answered){ var good=q.pick===it.a; h+='<div class="fb '+(good?"ok":"no")+'"><b>'+(good?"✅ ¡Correcto!":"❌ No es correcto. La respuesta es "+LET[it.a]+") "+esc(it.o[it.a]))+'</b><br>'+esc(it.e)+'</div><button class="btn" id="bNx">'+(q.i<4?"Siguiente pregunta ➡":"Ver mi puntaje 🏆")+'</button>'; }
  h+='</div>';
  app.innerHTML=h;
  if(!q.answered) app.querySelectorAll(".opt").forEach(function(b){ b.onclick=function(){ q.pick=+b.dataset.k; q.answered=true; q.picks.push(q.pick); if(q.pick===it.a) q.ok++; quiz(); }; });
  else document.getElementById("bNx").onclick=function(){ q.i++; q.answered=false; q.pick=null; quiz(); window.scrollTo(0,0); };
}
function quizEnd(s){
  var q=quizState, i=stInfo(s.id), pass=q.ok>=3;
  if(!q.recorded){ i.tries++; i.last=q.ok; if(q.ok>i.best) i.best=q.ok; if(pass) i.passed=true; q.recorded=true; save(); header(); }
  var next = s.id<5 ? "Estación "+(s.id+1) : "EXAMEN FINAL";
  var h='<div class="card" style="text-align:center"><h2>'+(pass?"🎉 ¡Muy bien!":"💪 ¡Casi!")+'</h2><div class="score" style="color:'+(pass?"var(--ok)":"var(--bad)")+'">'+q.ok+' / 5</div>'+
    (pass? '<p>¡Desbloqueaste: <b>'+next+'</b>! 🔓</p><button class="btn ok" id="bNext">Continuar a '+next+' ➡</button>' : '<p>Necesitas <b>3 de 5</b>. Repasa las explicaciones y vuelve a intentarlo.</p>')+
    '<button class="btn warm" id="bRetry">🔁 Reintentar práctica</button><button class="btn sec" id="bRev">📖 Repasar la lección</button><button class="btn sec" id="bMap">🗺️ Mapa</button></div>';
  app.innerHTML=h;
  var bn=document.getElementById("bNext"); if(bn) bn.onclick=function(){ quizState=null; if(s.id<5) go("lesson",{station:s.id+1,slide:0}); else openExam(); };
  document.getElementById("bRetry").onclick=function(){ startQuiz(); };
  document.getElementById("bRev").onclick=function(){ quizState=null; go("lesson",{station:s.id,slide:0}); };
  document.getElementById("bMap").onclick=function(){ quizState=null; go("map"); };
}

/* ---------- exam ---------- */
function openExam(){
  if(S.exam && S.exam.done) return go("result");
  if(!S.exam) { app.innerHTML='<div class="card"><h2>🏁 EXAMEN FINAL</h2><p class="txt">10 preguntas reales tipo admisión (UNA Puno / CEPREUNA).</p><div class="tip">⏱ Tienes <b>15 minutos</b>. Elige una alternativa y pasa a la siguiente. Puedes volver atrás antes de terminar.</div><p class="muted">'+esc(M.exam.source)+'</p><button class="btn ok" id="bStart">Empezar examen ⏱</button><button class="btn sec" id="bMap">🗺️ Mapa</button></div>';
    S.view={screen:"examintro",station:6}; header();
    document.getElementById("bStart").onclick=function(){ S.exam={answers:new Array(10).fill(null), secs:0, done:false}; examView=0; go("exam"); };
    document.getElementById("bMap").onclick=function(){ go("map"); }; return; }
  go("exam");
}
function exam(){
  var E=S.exam, Q=M.exam.questions; if(!E) return openExam(); if(E.done) return go("result");
  var q=Q[examView], left=M.exam.min*60-E.secs;
  var h='<div class="timer'+(left<120?" low":"")+'" id="tmr">⏱ '+mmss(left)+'</div><div class="qnav">';
  Q.forEach(function(_,k){ h+='<span class="'+(E.answers[k]!==null?"a ":"")+(k===examView?"c":"")+'" data-j="'+k+'">'+(k+1)+'</span>'; });
  h+='</div><div class="card"><div class="muted">Pregunta '+(examView+1)+' de 10</div><div class="q">'+esc(q.q)+'</div>';
  q.o.forEach(function(o,k){ h+='<button class="opt '+(E.answers[examView]===k?"sel":"")+'" data-k="'+k+'"><span class="l">'+LET[k]+'</span>'+esc(o)+'</button>'; });
  h+='</div><div class="nav"><button class="btn sec" id="bP" '+(examView===0?"disabled":"")+'>⬅</button>'+(examView<9?'<button class="btn" id="bN">Siguiente ➡</button>':'<button class="btn ok" id="bEnd">✅ Terminar examen</button>')+'</div>';
  app.innerHTML=h;
  app.querySelectorAll(".opt").forEach(function(b){ b.onclick=function(){ E.answers[examView]=+b.dataset.k; save(); exam(); }; });
  app.querySelectorAll("[data-j]").forEach(function(b){ b.onclick=function(){ examView=+b.dataset.j; exam(); }; });
  document.getElementById("bP").onclick=function(){ if(examView>0){examView--; exam();} };
  var bn=document.getElementById("bN"); if(bn) bn.onclick=function(){ examView++; exam(); window.scrollTo(0,0); };
  var be=document.getElementById("bEnd"); if(be) be.onclick=function(){ var miss=E.answers.filter(function(a){return a===null;}).length; if(miss && !confirm("Tienes "+miss+" pregunta(s) sin responder. ¿Terminar de todos modos?")) return; finishExam(); };
}
function finishExam(){
  var E=S.exam, Q=M.exam.questions, c=0; Q.forEach(function(q,k){ if(E.answers[k]===q.a) c++; });
  E.correct=c; E.nota=c*2; E.done=true; E.finishedAt=Date.now(); save(); go("result");
}

/* ---------- results ---------- */
function summary(){
  var E=S.exam, Q=M.exam.questions, wrong=[], topics={};
  Q.forEach(function(q,k){ if(E.answers[k]!==q.a){ wrong.push({n:k+1,q:q,pick:E.answers[k]}); topics[q.topic+" (Est. "+q.st+")"]=1; } });
  M.stations.forEach(function(s){ var i=stInfo(s.id); if(i.best<4) topics[s.name+" (Est. "+s.id+")"]=1; });
  return {wrong:wrong, topics:Object.keys(topics)};
}
function result(){
  var E=S.exam; if(!E||!E.done) return go("map");
  var sm=summary(), msg = E.nota>=17?"¡Excelente! 🌟 Estás listo para el examen de admisión.": E.nota>=14?"¡Muy bien! 👏 Repasa los temas marcados.": E.nota>=11?"Aprobado 👍. Repasa los temas y vuelve a intentarlo.":"¡No te rindas! 💪 Repasa las estaciones y vuelve a dar el examen.";
  var h='<div class="res-h"><div>'+esc(S.name)+'</div><div class="n">'+E.nota+'<span style="font-size:1.6rem">/20</span></div><div><b>'+E.correct+' de 10</b> correctas</div><div style="margin-top:.4rem">'+msg+'</div></div>';
  h+='<div class="card"><h2>📋 Resumen</h2><div class="kv"><span>Tiempo total de estudio</span><b>'+fmtTime(S.elapsed)+'</b></div><div class="kv"><span>Tiempo en el examen</span><b>'+mmss(E.secs)+'</b></div>';
  M.stations.forEach(function(s){ var i=stInfo(s.id); h+='<div class="kv"><span>'+s.emoji+' Est. '+s.id+': '+esc(s.name)+'</span><b>'+i.best+'/5 <small class="muted">('+i.tries+' int.)</small></b></div>'; });
  h+='<div class="kv"><span>🏁 Examen final</span><b>'+E.correct+'/10</b></div></div>';
  h+='<div class="card"><h2>❌ Preguntas para corregir</h2>';
  if(!sm.wrong.length) h+='<p>¡Ninguna! Respondiste todo bien. 🏆</p>';
  sm.wrong.forEach(function(w){ h+='<div class="wrongq"><b>'+w.n+') '+esc(w.q.q)+'</b><br>Tu respuesta: '+(w.pick===null?"(sin responder)":LET[w.pick]+") "+esc(w.q.o[w.pick]))+'<br><span class="c">Correcta: '+LET[w.q.a]+') '+esc(w.q.o[w.q.a])+'</span><br><small>'+esc(w.q.e)+'</small></div>'; });
  h+='</div><div class="card"><h2>📚 Temas para repasar</h2>'+(sm.topics.length? sm.topics.map(function(t){return '<span class="pill">'+esc(t)+'</span>';}).join("") : "<p>¡Dominas todos los temas! 🎉</p>")+'</div>';
  h+='<button class="btn ok" id="bImg">🖼️ Guardar resultado como imagen</button><button class="btn" id="bShare">📤 Compartir</button><div id="imgOut"></div>'+
     '<button class="btn sec" id="bAgain">🔁 Volver a dar el examen</button><button class="btn sec" id="bMap">🗺️ Mapa de estaciones</button><button class="btn sec" id="bReset">🧹 Nuevo estudiante (borrar todo)</button>';
  app.innerHTML=h;
  document.getElementById("bImg").onclick=saveImage;
  document.getElementById("bShare").onclick=share;
  document.getElementById("bAgain").onclick=function(){ if(confirm("¿Volver a dar el examen? Se reemplazará la nota actual.")){ S.exam=null; save(); openExam(); } };
  document.getElementById("bMap").onclick=function(){ go("map"); };
  document.getElementById("bReset").onclick=function(){ if(confirm("¿Borrar todo el avance de "+S.name+"?")){ S=blank(); save(); go("home"); } };
}
function shareText(){
  var E=S.exam, sm=summary();
  var t="*Reproducción celular - Resultado*\nEstudiante: "+S.name+"\nNota: "+E.nota+"/20 ("+E.correct+"/10 correctas)\nTiempo total: "+fmtTime(S.elapsed)+"\n";
  M.stations.forEach(function(s){ t+="- Est. "+s.id+" "+s.name+": "+stInfo(s.id).best+"/5\n"; });
  if(sm.topics.length) t+="Repasar: "+sm.topics.join(", ")+"\n";
  return t+"Academia preuniversitaria - Prof. Miguel Ramos (Huancané, Puno)";
}
function share(){
  var t=shareText();
  if(navigator.share){ navigator.share({title:"Mi resultado – Reproducción celular", text:t}).catch(function(e){ if(e && e.name!=="AbortError") fallback(); }); }
  else fallback();
  function fallback(){
    if(navigator.onLine){ window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank"); }
    else { try{ navigator.clipboard.writeText(t).catch(function(){}); }catch(e){} toast("📴 Sin internet: copié el resumen. Compártelo cuando tengas conexión, o guarda la imagen.",4000); }
  }
}
function wrap(ctx, text, x, y, maxW, lh){ var words=text.split(" "), line=""; for(var i=0;i<words.length;i++){ var test=line+words[i]+" "; if(ctx.measureText(test).width>maxW && line){ ctx.fillText(line,x,y); line=words[i]+" "; y+=lh; } else line=test; } ctx.fillText(line,x,y); return y+lh; }
function drawResult(fixedH){
  var E=S.exam, sm=summary(), W=1080, H=fixedH||3000;
  var c=document.createElement("canvas"); c.width=W; c.height=H; var x=c.getContext("2d");
  var g=x.createLinearGradient(0,0,W,H); g.addColorStop(0,"#f3f0ff"); g.addColorStop(1,"#fff1e6"); x.fillStyle=g; x.fillRect(0,0,W,H);
  var g2=x.createLinearGradient(0,0,W,0); g2.addColorStop(0,"#bdb2ff"); g2.addColorStop(1,"#ffc6ff"); x.fillStyle=g2; x.fillRect(40,40,W-80,460);
  x.fillStyle="#2b2d42"; x.textAlign="center"; x.font="bold 46px Arial"; x.fillText("🧬 Reproducción celular",W/2,115);
  x.font="38px Arial"; x.fillText(S.name,W/2,185);
  x.font="bold 170px Arial"; x.fillText(E.nota+"/20",W/2,360);
  x.font="bold 42px Arial"; x.fillText(E.correct+" de 10 correctas · "+fmtTime(S.elapsed),W/2,445);
  x.textAlign="left"; var y=580; x.font="bold 40px Arial"; x.fillStyle="#7b5cd6"; x.fillText("Puntaje por estación",70,y); y+=60;
  x.font="34px Arial"; x.fillStyle="#2b2d42";
  M.stations.forEach(function(s){ x.fillText(s.id+". "+s.name,90,y); x.textAlign="right"; x.fillText(stInfo(s.id).best+"/5",W-90,y); x.textAlign="left"; y+=52; });
  x.font="bold 34px Arial"; x.fillText("🏁 Examen final",90,y); x.textAlign="right"; x.fillText(E.correct+"/10",W-90,y); x.textAlign="left"; y+=80;
  x.font="bold 40px Arial"; x.fillStyle="#e63946"; x.fillText(sm.wrong.length? "Preguntas a corregir":"¡Todas correctas! 🏆",70,y); y+=55;
  sm.wrong.forEach(function(w){ x.fillStyle="#2b2d42"; x.font="28px Arial"; y=wrap(x, w.n+") "+w.q.q, 90, y, W-180, 36); x.fillStyle="#2a9d8f"; x.font="bold 28px Arial"; x.fillText("✔ "+LET[w.q.a]+") "+w.q.o[w.q.a],110,y); y+=52; });
  y+=20; x.font="bold 40px Arial"; x.fillStyle="#7b5cd6"; x.fillText("Temas para repasar",70,y); y+=52; x.font="30px Arial"; x.fillStyle="#2b2d42";
  if(!sm.topics.length){ x.fillText("¡Ninguno! 🎉",90,y); y+=45; }
  sm.topics.forEach(function(t){ y=wrap(x,"• "+t,90,y,W-180,40); });
  x.font="24px Arial"; x.fillStyle="#5c6178"; x.textAlign="center";
  var d=new Date(); y+=40; x.fillText("Academia preuniversitaria · Prof. Miguel Ramos · Huancané – Puno · "+d.toLocaleDateString("es-PE"),W/2,y);
  if(!fixedH) return drawResult(y+50);
  return c;
}
function saveImage(){
  var c=drawResult(), name="Resultado_"+S.name.replace(/[^A-Za-z0-9áéíóúñÁÉÍÓÚÑ]+/g,"_")+".png";
  var url=c.toDataURL("image/png");
  var out=document.getElementById("imgOut");
  out.innerHTML='<div class="card"><p class="muted">Si no se descargó, mantén presionada la imagen y elige “Descargar imagen”.</p><img src="'+url+'" style="width:100%;border-radius:12px" alt="Resultado"></div>';
  try{ c.toBlob(function(b){ var a=document.createElement("a"); a.download=name; a.href=b? URL.createObjectURL(b) : url; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); },1000); toast("🖼️ Imagen guardada: "+name); },"image/png"); }
  catch(e){ var a=document.createElement("a"); a.download=name; a.href=url; a.click(); }
}

/* ---------- credits ---------- */
function credits(){
  var h='<div class="card"><h2>📜 Créditos y licencias</h2><p class="muted">Imágenes de Wikimedia Commons (licencias libres) redimensionadas y comprimidas. Algunas fueron recortadas o rotuladas en español (se indica). Audio: voz sintética es-PE-CamilaNeural (Microsoft Edge TTS). Preguntas del examen: '+esc(M.exam.source)+'</p><ol class="cred">';
  (window.CREDITS||[]).forEach(function(c){ h+='<li><b>'+esc(c.title)+'</b><br>Autor: '+esc(c.artist)+' · Licencia: '+esc(c.license)+(c.page?'<br><a href="'+esc(c.page)+'" target="_blank" rel="noopener">'+esc(c.page)+'</a>':'')+'</li>'; });
  h+='</ol><button class="btn" id="bBack">⬅ Volver</button></div>';
  app.innerHTML=h; document.getElementById("bBack").onclick=function(){ go(S.name?"map":"home"); };
}
document.getElementById("lnkCred").onclick=function(e){ e.preventDefault(); go("credits"); };

/* ---------- mitosis animation (SVG + JS) ---------- */
function mountMitosis(el){
  var NS="http://www.w3.org/2000/svg", mode="animal", stage=0, timer=null, raf=null;
  var STAGES=[
   {n:"Interfase",d:"El ADN está suelto (cromatina) dentro del núcleo. Ya se copió en la fase S."},
   {n:"Profase",d:"Los cromosomas se condensan y se ven. La membrana nuclear se desarma y se forma el huso."},
   {n:"Metafase",d:"Los cromosomas se alinean en el centro: la PLACA ECUATORIAL."},
   {n:"Anafase",d:"Las cromátidas hermanas se separan y son llevadas a los POLOS opuestos."},
   {n:"Telofase",d:"Llegan a los polos, se forman 2 núcleos nuevos y los cromosomas se descondensan."},
   {n:"Citocinesis",d:""}];
  var CH=[{c:"#1e88e5",L:30},{c:"#e53935",L:30},{c:"#43a0f5",L:18},{c:"#ff7961",L:18}];
  var POS={0:[[140,95,35],[180,100,-40],[150,128,75],[176,126,15]],1:[[138,88,30],[182,92,-35],[146,132,70],[178,130,20]],2:[[160,58,0],[160,94,0],[160,128,0],[160,156,0]]};
  function target(st){
    var t={nuc:0,cond:1,sep:0,spin:0,tel:0,pinch:0,plate:0,gather:0,chr:[]};
    if(st===0){t.nuc=1;t.cond=0;}
    if(st===1){t.nuc=.35;t.spin=.35;}
    if(st>=2){t.spin=1;}
    if(st===3){t.sep=1;}
    if(st>=4){t.sep=1.15;t.spin=st===4?.3:0;t.tel=1;t.cond=.45;t.gather=1;}
    if(st===5){t.pinch=1;t.plate=1;t.cond=.2;}
    var p=POS[Math.min(st,2)];
    for(var i=0;i<4;i++) t.chr.push({x:p[i][0],y:p[i][1],r:p[i][2]});
    return t;
  }
  el.innerHTML='<div class="toggle"><button data-m="animal" class="on">🐑 Célula animal</button><button data-m="vegetal">🥔 Célula vegetal</button></div>'+
   '<svg viewBox="0 0 320 220" id="msvg" role="img" aria-label="Animación de la mitosis"></svg>'+
   '<div class="stg">'+STAGES.map(function(s,i){return '<button data-s="'+i+'">'+(i+1)+'. '+s.n+'</button>';}).join("")+'</div>'+
   '<div class="stdesc" id="mdesc"></div><div class="row"><button class="btn" id="mplay">▶ Reproducir todo</button></div>';
  var svg=el.querySelector("#msvg"), desc=el.querySelector("#mdesc"), cur=target(0);
  function lerp(a,b,k){ return a+(b-a)*k; }
  function mix(a,b,k){ var o={}; for(var key in a){ if(key==="chr") continue; o[key]=lerp(a[key],b[key],k);} o.chr=a.chr.map(function(c,i){ return {x:lerp(c.x,b.chr[i].x,k),y:lerp(c.y,b.chr[i].y,k),r:lerp(c.r,b.chr[i].r,k)}; }); return o; }
  function draw(s){
    var h="", P1=40, P2=280, cy=110;
    if(mode==="animal"){
      var p=s.pinch, ty=15+85*p, by=205-85*p, k=30*p;
      h+='<path d="M20 110 C20 40,'+(100+k)+' 15,160 '+ty+' C'+(220-k)+' 15,300 40,300 110 C300 180,'+(220-k)+' 205,160 '+by+' C'+(100+k)+' 205,20 180,20 110Z" fill="#fde2e4" stroke="#c2185b" stroke-width="3"/>';
    } else {
      h+='<rect x="14" y="12" width="292" height="196" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="8"/>';
      if(s.plate>0){ var ph=180*s.plate; h+='<rect x="157" y="'+(110-ph/2)+'" width="6" height="'+ph+'" fill="#ffb300"/>'; for(var v=0;v<6;v++) h+='<circle cx="'+(v%2?166:154)+'" cy="'+(40+v*28)+'" r="3" fill="#ffb300" opacity="'+s.plate+'"/>'; h+='<text x="168" y="30" font-size="11" font-weight="bold" fill="#e65100" opacity="'+s.plate+'">fragmoplasto</text>'; }
    }
    // spindle
    if(s.spin>0.02){
      var op=s.spin.toFixed(2);
      h+='<g stroke="#9e9e9e" stroke-width="1.3" fill="none" opacity="'+op+'">';
      [-60,-30,0,30,60].forEach(function(dy){ h+='<path d="M'+P1+' '+cy+' Q160 '+(cy+dy*1.4)+' '+P2+' '+cy+'"/>'; });
      h+='</g>';
      if(mode==="animal"){
        h+='<g stroke="#ff9800" stroke-width="2" opacity="'+op+'">';
        [[-1,-1],[-1.4,0],[-1,1],[-.3,-1.4],[-.3,1.4]].forEach(function(d){ h+='<line x1="'+P1+'" y1="'+cy+'" x2="'+(P1+d[0]*22)+'" y2="'+(cy+d[1]*22)+'"/><line x1="'+P2+'" y1="'+cy+'" x2="'+(P2-d[0]*22)+'" y2="'+(cy+d[1]*22)+'"/>'; });
        h+='</g><g fill="#6d4c41" opacity="'+op+'"><rect x="'+(P1-3)+'" y="'+(cy-6)+'" width="5" height="12"/><rect x="'+(P1+2)+'" y="'+(cy-2)+'" width="11" height="5"/><rect x="'+(P2-2)+'" y="'+(cy-6)+'" width="5" height="12"/><rect x="'+(P2-13)+'" y="'+(cy-2)+'" width="11" height="5"/></g>';
        h+='<text x="'+(P1-18)+'" y="'+(cy+38)+'" font-size="10" fill="#6d4c41" opacity="'+op+'">centriolos</text>';
      } else {
        h+='<g fill="#8e24aa" opacity="'+op+'"><path d="M'+(P1-6)+' '+(cy-30)+' Q'+(P1+10)+' '+cy+' '+(P1-6)+' '+(cy+30)+' Q'+(P1+2)+' '+cy+' '+(P1-6)+' '+(cy-30)+'Z"/><path d="M'+(P2+6)+' '+(cy-30)+' Q'+(P2-10)+' '+cy+' '+(P2+6)+' '+(cy+30)+' Q'+(P2-2)+' '+cy+' '+(P2+6)+' '+(cy-30)+'Z"/></g>';
        h+='<text x="22" y="'+(cy+48)+'" font-size="10" fill="#8e24aa" opacity="'+op+'">casquete polar</text>';
      }
    }
    // nuclear membrane
    if(s.nuc>0.02) h+='<circle cx="160" cy="110" r="52" fill="#ede7f6" fill-opacity="'+(s.nuc*.6).toFixed(2)+'" stroke="#7e57c2" stroke-width="2.5" stroke-dasharray="'+(s.nuc>.9?"0":"6 5")+'" opacity="'+s.nuc.toFixed(2)+'"/>';
    if(s.tel>0.02){ h+='<circle cx="72" cy="110" r="34" fill="#ede7f6" fill-opacity=".5" stroke="#7e57c2" stroke-width="2.5" opacity="'+s.tel.toFixed(2)+'"/><circle cx="248" cy="110" r="34" fill="#ede7f6" fill-opacity=".5" stroke="#7e57c2" stroke-width="2.5" opacity="'+s.tel.toFixed(2)+'"/>'; }
    // chromosomes
    s.chr.forEach(function(c,i){
      var L=(CH[i].L)*(0.35+0.65*s.cond), w=2+4.5*s.cond, gap=w*0.5+0.6;
      var yy = c.y + (110-c.y)*0.45*s.gather;
      [-1,1].forEach(function(side){
        var dx = side*gap + side*s.sep*92;
        var cx=c.x+dx, ang=c.r*(1-Math.min(1,s.sep));
        if(s.spin>.5 && s.sep>0 && s.sep<1.1) h+='<line x1="'+(side<0?P1:P2)+'" y1="110" x2="'+cx+'" y2="'+yy+'" stroke="#bdbdbd" stroke-width="1"/>';
        h+='<rect x="'+(cx-w/2)+'" y="'+(yy-L/2)+'" width="'+w+'" height="'+L+'" rx="'+(w/2)+'" fill="'+CH[i].c+'" opacity="'+(0.45+0.55*s.cond).toFixed(2)+'" transform="rotate('+ang+' '+c.x+' '+yy+')"/>';
      });
      if(s.sep<0.05 && s.cond>.5) h+='<circle cx="'+c.x+'" cy="'+yy+'" r="2.4" fill="#333" transform="rotate('+c.r+' '+c.x+' '+yy+')"/>';
    });
    if(stage===2 && s.spin>.9) h+='<line x1="160" y1="32" x2="160" y2="188" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4 4"/><text x="166" y="200" font-size="11" fill="#f57f17" font-weight="bold">placa ecuatorial</text>';
    if(stage===3 && s.sep>.9){ h+='<text x="18" y="30" font-size="12" font-weight="bold" fill="#455a64">◀ polo</text><text x="262" y="30" font-size="12" font-weight="bold" fill="#455a64">polo ▶</text>'; }
    svg.innerHTML=h;
  }
  function setStage(i, instant){
    stage=i; var tgt=target(i), from=cur, t0=null, dur=instant?1:1300;
    el.querySelectorAll("[data-s]").forEach(function(b){ b.classList.toggle("on", +b.dataset.s===i); });
    STAGES[5].d = mode==="animal" ? "Citocinesis animal: un SURCO estrangula la célula y se forman 2 células hijas idénticas." : "Citocinesis vegetal: se forma el FRAGMOPLASTO (placa celular) en el centro. Huso ANASTRAL desde casquetes polares, sin centriolos.";
    desc.innerHTML="<b>"+STAGES[i].n+":</b> "+STAGES[i].d;
    cancelAnimationFrame(raf);
    function step(ts){ if(!t0) t0=ts; var k=Math.min(1,(ts-t0)/dur); k=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; cur=mix(from,tgt,k); draw(cur); if(k<1) raf=requestAnimationFrame(step); }
    raf=requestAnimationFrame(step);
  }
  el.querySelectorAll("[data-s]").forEach(function(b){ b.onclick=function(){ stop(); setStage(+b.dataset.s); }; });
  el.querySelectorAll("[data-m]").forEach(function(b){ b.onclick=function(){ mode=b.dataset.m; el.querySelectorAll("[data-m]").forEach(function(x){x.classList.toggle("on",x===b);}); setStage(stage,true); }; });
  function stop(){ clearInterval(timer); timer=null; el.querySelector("#mplay").textContent="▶ Reproducir todo"; }
  el.querySelector("#mplay").onclick=function(){ if(timer) return stop(); this.textContent="⏸ Pausar"; var i=0; cur=target(0); setStage(0,true); timer=setInterval(function(){ i++; if(i>5){ stop(); return; } setStage(i); }, 2300); };
  draw(cur); setStage(0,true);
  return function(){ clearInterval(timer); cancelAnimationFrame(raf); };
}

/* ---------- clock ---------- */
setInterval(function(){
  if(document.hidden || !S.name) return;
  var exDone = S.exam && S.exam.done;
  if(!exDone) S.elapsed++;
  if(S.view.screen==="exam" && S.exam && !S.exam.done){
    S.exam.secs++; var left=M.exam.min*60-S.exam.secs, t=document.getElementById("tmr");
    if(t){ t.textContent="⏱ "+mmss(left); t.className="timer"+(left<120?" low":""); }
    if(left<=0){ toast("⏰ ¡Se acabó el tiempo!"); finishExam(); }
  }
  if(S.elapsed%5===0) save();
},1000);
document.addEventListener("visibilitychange", save);
window.__RC = { state:function(){return S;}, go:go }; // para pruebas
render();
})();
