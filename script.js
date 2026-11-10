(function(){
var links=[].slice.call(document.querySelectorAll(".menu li a")),map={};
links.forEach(function(a){var el=document.getElementById(a.getAttribute("href").slice(1));if(el)map[el.id]=a;});
if(!("IntersectionObserver" in window))return;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.removeAttribute("aria-current");});var a=map[e.target.id];if(a)a.setAttribute("aria-current","true");}});},{rootMargin:"-30% 0px -60% 0px"});
Object.keys(map).forEach(function(id){io.observe(document.getElementById(id));});
})();

(function(){
if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var els=[].slice.call(document.querySelectorAll("main section, footer"));
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
els.forEach(function(el){el.classList.add("reveal");io.observe(el);});
})();

(function(){
var h=document.getElementById("home");
if(h){
var c=document.createElement("canvas");c.className="net";c.setAttribute("aria-hidden","true");h.insertBefore(c,h.firstChild);
var x=c.getContext("2d"),W=0,H=0,N=[],P=[],L=[],col="#0A7770",vis=true,run=false;
var dpr=Math.min(window.devicePixelRatio||1,2),reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function colors(){var v=getComputedStyle(document.documentElement).getPropertyValue("--teal").trim();if(v)col=v;}
function size(){var r=c.getBoundingClientRect();W=r.width;H=r.height;c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);x.setTransform(dpr,0,0,dpr,0,0);var n=Math.max(14,Math.min(34,Math.round(W*H/26000)));N=[];for(var i=0;i<n;i++)N.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28});}
function draw(){
x.clearRect(0,0,W,H);
var i,j,d=150;L=[];
for(i=0;i<N.length;i++){var a=N[i];if(!reduce){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;}}
for(i=0;i<N.length;i++)for(j=i+1;j<N.length;j++){var dx=N[i].x-N[j].x,dy=N[i].y-N[j].y,q=Math.sqrt(dx*dx+dy*dy);if(q<d)L.push([i,j,1-q/d]);}
x.strokeStyle=col;x.fillStyle=col;x.lineWidth=1;
L.forEach(function(l){x.globalAlpha=l[2]*.3;x.beginPath();x.moveTo(N[l[0]].x,N[l[0]].y);x.lineTo(N[l[1]].x,N[l[1]].y);x.stroke();});
x.globalAlpha=.5;N.forEach(function(n){x.beginPath();x.arc(n.x,n.y,2.2,0,6.2832);x.fill();});
if(!reduce){
if(L.length&&P.length<6&&Math.random()<.05){var l=L[Math.floor(Math.random()*L.length)];P.push({a:l[0],b:l[1],t:0});}
P=P.filter(function(p){return p.t<1;});
P.forEach(function(p){p.t+=.014;var A=N[p.a],B=N[p.b];x.globalAlpha=.95;x.beginPath();x.arc(A.x+(B.x-A.x)*p.t,A.y+(B.y-A.y)*p.t,3,0,6.2832);x.fill();});
}
x.globalAlpha=1;
}
function loop(){if(!vis){run=false;return;}draw();requestAnimationFrame(loop);}
function start(){if(reduce){draw();return;}if(!run){run=true;requestAnimationFrame(loop);}}
colors();size();start();
var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){size();P=[];start();},150);});
window.addEventListener("load",function(){size();start();});
try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(){setTimeout(function(){colors();if(reduce)draw();},50);});}catch(e){}
if("IntersectionObserver" in window){new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)start();}).observe(h);}
}
var m=document.querySelector(".menu"),tk=false;
function pr(){tk=false;if(!m)return;var s=document.documentElement,t=s.scrollHeight-s.clientHeight;m.style.setProperty("--p",t>0?Math.min(1,(window.scrollY||s.scrollTop)/t):0);}
window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(pr);}},{passive:true});pr();
})();

(function(){
var d=document.getElementById("cvd"),o=document.getElementById("cv"),x=document.getElementById("cvx");
if(!d||!o||!d.showModal)return;
o.addEventListener("click",function(){d.showModal();d.scrollTop=0;});
x.addEventListener("click",function(){d.close();});
d.addEventListener("click",function(e){if(e.target===d)d.close();});
})();