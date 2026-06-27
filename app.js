import { samplePlays } from "./app-data.js";
import { BALL_MOVEMENT_TYPES, PLAYER_MOVEMENT_TYPES, PLAY_SCHEMA_VERSION, SCREEN_TYPES } from "./app-config.js";
let plays = [];
let currentPlay = 0;
let currentStep = 0;
let hasSelectedPlayForView = false;
let currentSide = "left";
let animating = false;
let paused = false;
let drawMode = false;
let inkPaths = [];
let currentInkColor = "#111111";
let animationSpeed = 1;
let playerView = false;
let sharedPlayIndexes = null;
let sharedViewKind = "single";
let activeShareUrl = null;

const court = document.getElementById("court");
const playSelect = document.getElementById("playSelect");
const PLAY_VIDEO_QUERIES = {
  "5-Out Motion: Pass and Cut":"5 out motion pass and cut basketball offense youth",
  "Give and Go":"give and go basketball play youth demonstration",
  "Pick and Roll":"pick and roll basketball basics youth demonstration",
  "Horns Entry":"horns offense basketball entry play demonstration",
  "UCLA Cut":"UCLA cut basketball play demonstration",
  "Flex Screen":"flex screen basketball offense demonstration",
  "Backdoor Cut":"backdoor cut basketball play demonstration",
  "Dribble Handoff":"dribble handoff basketball offense demonstration",
  "Box BLOB":"box baseline out of bounds basketball play demonstration",
  "Stack BLOB":"stack baseline out of bounds basketball play demonstration",
  "Sideline Stack SLOB":"sideline stack out of bounds basketball play demonstration",
  "Secondary Break":"secondary break basketball offense demonstration",
  "1-2-1-1 Press Break":"1-2-1-1 press break basketball demonstration",
  "Shell Drill":"shell drill basketball defense demonstration",
  "2-3 Zone Slides":"2-3 zone defense slides basketball demonstration"
};

function clone(value){return JSON.parse(JSON.stringify(value));}
function loadSaved(){try{return JSON.parse(localStorage.getItem("coachFullCourtPlays")||"[]").map(normalizePlay);}catch(e){return [];}}
function writeSaved(saved){localStorage.setItem("coachFullCourtPlays",JSON.stringify(saved));}
function saveCustom(play){const saved=loadSaved();saved.push(play);writeSaved(saved);return saved.length-1;}
function updateCustom(index, play){const saved=loadSaved();if(index>=0 && index<saved.length){saved[index]=play;writeSaved(saved);return true;}return false;}
function deleteCustom(index){const saved=loadSaved();if(index>=0 && index<saved.length){saved.splice(index,1);writeSaved(saved);return true;}return false;}

function normalizeActionType(type){
  if(type==="flare") return "flareScreen";
  if(type==="shoot") return "shot";
  if(type==="drive") return "dribble";
  return type || "cut";
}

function normalizeMovement(action,index=0){
  const type=normalizeActionType(action.type);
  return {
    id:action.id || `movement-${index+1}`,
    type,
    actor:action.actor ?? action.player ?? action.by ?? null,
    from:action.from || null,
    to:action.to || null,
    at:action.at || null,
    receiver:action.receiver ?? action.toPlayer ?? null,
    target:action.target || null,
    screenFor:action.screenFor ?? action.forPlayer ?? null,
    path:action.path || null,
    note:action.note || "",
    endsPossession: type==="shot" || action.endsPossession===true
  };
}

function normalizeStep(step,index=0){
  const movements=(step.movements || step.actions || []).map(normalizeMovement);
  return {
    ...step,
    id:step.id || `step-${index+1}`,
    ball:step.ball ?? null,
    players:step.players || {},
    movements,
    actions:movements
  };
}

function normalizePlay(play){
  const steps=(play.steps || []).map(normalizeStep);
  return {
    ...play,
    schemaVersion:play.schemaVersion || PLAY_SCHEMA_VERSION,
    roster:play.roster || {players:["1","2","3","4","5"]},
    steps
  };
}

samplePlays.forEach((play,index)=>{samplePlays[index]=normalizePlay(play);});
plays = [...samplePlays, ...loadSaved()];

function parseShareIndexes(value){
  if(!value) return [];
  return value.split(/[,.]/).map(item=>{
    const index=Number(String(item).split("-")[0]);
    return Number.isFinite(index) && plays[index] ? index : null;
  }).filter(index=>index!==null);
}

function normalizePublicAppUrl(value){
  const raw=String(value || "").trim();
  if(!raw) return "";
  try{
    const url=new URL(raw);
    if(url.protocol!=="http:" && url.protocol!=="https:") return "";
    url.search="";
    url.hash="";
    if(url.pathname.endsWith("/")){
      url.pathname=`${url.pathname}index.html`;
    }
    return url.toString();
  }catch(e){
    return "";
  }
}

function getPublicAppUrl(){
  if(window.location.protocol==="http:" || window.location.protocol==="https:"){
    const url=new URL(window.location.href);
    url.search="";
    url.hash="";
    return url.toString();
  }
  return normalizePublicAppUrl(localStorage.getItem("coachPublicAppUrl") || "");
}

function makeShareUrl(kind,indexes){
  const base=getPublicAppUrl() || window.location.href;
  const url=new URL(base);
  url.search="";
  url.hash="";
  url.searchParams.set("v","player");
  if(kind==="team"){
    url.searchParams.set("library","team");
  } else if(kind==="playlist"){
    url.searchParams.set("list",indexes.join("."));
  } else {
    const index=indexes[0] ?? currentPlay;
    url.searchParams.set("p",String(index));
  }
  return url.toString();
}

function makeQrMatrix(text){
  const capacities=[
    {version:1,dataCodewords:19,eccCodewords:7},
    {version:2,dataCodewords:34,eccCodewords:10},
    {version:3,dataCodewords:55,eccCodewords:15},
    {version:4,dataCodewords:80,eccCodewords:20},
    {version:5,dataCodewords:108,eccCodewords:26}
  ];
  const bytes=[...new TextEncoder().encode(text)];
  const spec=capacities.find(item=>bytes.length+2<=item.dataCodewords);
  if(!spec) throw new Error("QR link is too long for the built-in generator.");

  const dataBits=[0,1,0,0];
  for(let i=7;i>=0;i--) dataBits.push((bytes.length>>>i)&1);
  bytes.forEach(byte=>{
    for(let i=7;i>=0;i--) dataBits.push((byte>>>i)&1);
  });
  const capacityBits=spec.dataCodewords*8;
  for(let i=0;i<4 && dataBits.length<capacityBits;i++) dataBits.push(0);
  while(dataBits.length%8) dataBits.push(0);
  const data=[];
  for(let i=0;i<dataBits.length;i+=8){
    data.push(dataBits.slice(i,i+8).reduce((value,bit)=>(value<<1)|bit,0));
  }
  for(let pad=0;data.length<spec.dataCodewords;pad^=1){
    data.push(pad ? 0x11 : 0xEC);
  }

  const codewords=[...data,...reedSolomonRemainder(data,spec.eccCodewords)];
  const size=17+4*spec.version;
  const modules=Array.from({length:size},()=>Array(size).fill(false));
  const reserved=Array.from({length:size},()=>Array(size).fill(false));
  const set=(row,col,value=true,lock=true)=>{
    if(row<0||col<0||row>=size||col>=size) return;
    modules[row][col]=value;
    if(lock) reserved[row][col]=true;
  };

  drawFinder(set,0,0);
  drawFinder(set,size-7,0);
  drawFinder(set,0,size-7);
  for(let i=0;i<size;i++){
    if(!reserved[6][i]) set(6,i,i%2===0);
    if(!reserved[i][6]) set(i,6,i%2===0);
  }
  if(spec.version>1){
    const center=4*spec.version+10;
    drawAlignment(set,center,center);
  }
  set(size-8,8,true);
  reserveFormatAreas(set,size);

  const bits=[];
  codewords.forEach(byte=>{
    for(let i=7;i>=0;i--) bits.push((byte>>>i)&1);
  });
  let bitIndex=0;
  let upward=true;
  for(let right=size-1;right>=1;right-=2){
    if(right===6) right--;
    for(let vert=0;vert<size;vert++){
      const row=upward ? size-1-vert : vert;
      for(let offset=0;offset<2;offset++){
        const col=right-offset;
        if(reserved[row][col]) continue;
        const bit=bitIndex<bits.length ? bits[bitIndex++]===1 : false;
        const masked=((row+col)%2===0) ? !bit : bit;
        modules[row][col]=masked;
      }
    }
    upward=!upward;
  }

  drawFormatBits(set,size,0);
  set(size-8,8,true);
  return modules;
}

function reserveFormatAreas(set,size){
  for(let i=0;i<=5;i++) set(i,8,false);
  set(7,8,false);
  set(8,8,false);
  set(8,7,false);
  for(let i=9;i<15;i++) set(8,14-i,false);
  for(let i=0;i<8;i++) set(size-1-i,8,false);
  for(let i=8;i<15;i++) set(8,size-15+i,false);
}

function drawFinder(set,left,top){
  for(let y=-1;y<=7;y++){
    for(let x=-1;x<=7;x++){
      const row=top+y, col=left+x;
      const isBorder=x===0||x===6||y===0||y===6;
      const isCenter=x>=2&&x<=4&&y>=2&&y<=4;
      set(row,col,isBorder||isCenter);
    }
  }
}

function drawAlignment(set,centerRow,centerCol){
  for(let y=-2;y<=2;y++){
    for(let x=-2;x<=2;x++){
      const distance=Math.max(Math.abs(x),Math.abs(y));
      set(centerRow+y,centerCol+x,distance!==1);
    }
  }
}

function drawFormatBits(set,size,mask){
  const data=(1<<3)|mask; // Error correction L, mask pattern 0.
  let bits=data<<10;
  const generator=0x537;
  for(let i=14;i>=10;i--){
    if(((bits>>>i)&1)!==0) bits^=generator<<(i-10);
  }
  const format=((data<<10)|bits)^0x5412;
  const get=i=>((format>>>i)&1)!==0;
  for(let i=0;i<=5;i++) set(i,8,get(i));
  set(7,8,get(6));
  set(8,8,get(7));
  set(8,7,get(8));
  for(let i=9;i<15;i++) set(8,14-i,get(i));
  for(let i=0;i<8;i++) set(size-1-i,8,get(i));
  for(let i=8;i<15;i++) set(8,size-15+i,get(i));
}

function reedSolomonRemainder(data,degree){
  const divisor=reedSolomonDivisor(degree);
  const result=Array(degree).fill(0);
  data.forEach(byte=>{
    const factor=byte^result.shift();
    result.push(0);
    divisor.forEach((coef,index)=>{
      result[index]^=gfMultiply(coef,factor);
    });
  });
  return result;
}

function reedSolomonDivisor(degree){
  const result=Array(degree).fill(0);
  result[degree-1]=1;
  let root=1;
  for(let i=0;i<degree;i++){
    for(let j=0;j<degree;j++){
      result[j]=gfMultiply(result[j],root);
      if(j+1<degree) result[j]^=result[j+1];
    }
    root=gfMultiply(root,2);
  }
  return result;
}

function gfMultiply(x,y){
  let result=0;
  for(let i=7;i>=0;i--){
    result=(result<<1)^((result>>>7)*0x11D);
    if(((y>>>i)&1)!==0) result^=x;
  }
  return result&0xFF;
}

function renderQrCode(container,url){
  const img=document.createElement("img");
  img.className="qrCodeImg";
  img.alt="QR code for player view link";
  img.width=240;
  img.height=240;
  img.src=`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=18&data=${encodeURIComponent(url)}`;
  container.appendChild(img);
}

function applyShareFromUrl(){
  const params=new URLSearchParams(window.location.search);
  playerView=params.get("v")==="player" || params.get("player")==="1";
  if(!playerView) return;

  if(params.get("library")==="team"){
    sharedViewKind="team";
    sharedPlayIndexes=plays.map((_,i)=>i).filter(i=>plays[i].category!=="Blank");
  } else if(params.get("list")){
    sharedViewKind="playlist";
    sharedPlayIndexes=parseShareIndexes(params.get("list"));
  } else {
    sharedViewKind="single";
    sharedPlayIndexes=parseShareIndexes(params.get("p"));
  }

  if(!sharedPlayIndexes || !sharedPlayIndexes.length){
    sharedPlayIndexes=[0];
  }
  currentPlay=sharedPlayIndexes[0];
  currentStep=0;
}

applyShareFromUrl();

function pctToCourt(p){return {x:60+p[0]*10.8,y:50+p[1]*6.2};}
function courtToPct(x,y){return [Math.max(0,Math.min(100,(x-60)/10.8)), Math.max(0,Math.min(100,(y-50)/6.2))];}
function orientPoint(p){
  return currentSide === "left" ? p : [100 - p[0], p[1]];
}
function orientPlayers(players){
  const oriented = {};
  Object.entries(players).forEach(([num,pos])=>{
    oriented[num] = orientPoint(pos);
  });
  return oriented;
}
function orientAction(action){
  const copy = {...action};
  if(copy.from) copy.from = orientPoint(copy.from);
  if(copy.to) copy.to = orientPoint(copy.to);
  if(copy.at) copy.at = orientPoint(copy.at);
  if(copy.target) copy.target = orientPoint(copy.target);
  return copy;
}

function stepMovements(step){
  return step ? (step.movements || step.actions || []) : [];
}

function getPlayerPosition(step, player){
  if(!step || !step.players || player == null) return null;
  return step.players[String(player)] || step.players[player] || null;
}

function movementActorPosition(movement, step){
  return movement.from || getPlayerPosition(step,movement.actor) || movement.at || null;
}

function movementEndPosition(movement, step){
  return movement.to || getPlayerPosition(step,movement.receiver) || getPlayerPosition(step,movement.actor) || movement.target || movement.at || null;
}
function defaultShotTarget(){
  return [12,50];
}

function isShotStep(step){
  return stepMovements(step).some(m=>normalizeActionType(m.type)==="shot" || m.endsPossession);
}

function getPossessionAtStep(play, stepIndex){
  let holder=null;
  for(let i=0;i<=stepIndex;i++){
    const step=play.steps[i];
    if(!step) continue;
    if(step.ball != null) holder=step.ball;
    stepMovements(step).forEach(movement=>{
      const type=normalizeActionType(movement.type);
      if(type==="pass" || type==="handoff"){
        holder = movement.receiver ?? step.ball ?? holder;
      } else if(type==="dribble"){
        holder = movement.actor ?? step.ball ?? holder;
      } else if(type==="shot"){
        holder = movement.actor ?? step.ball ?? holder;
      }
    });
  }
  return holder;
}

function getBallPositionForStep(play, stepIndex){
  const step=play.steps[stepIndex];
  const holder=getPossessionAtStep(play,stepIndex);
  return getPlayerPosition(step,holder);
}

function getTransitionBallMovement(play, fromIndex){
  const fromStep=play.steps[fromIndex];
  const toStep=play.steps[fromIndex+1];
  if(!fromStep || !toStep) return null;
  const fromHolder=getPossessionAtStep(play,fromIndex);
  const toHolder=getPossessionAtStep(play,fromIndex+1);
  const movements=stepMovements(toStep);
  const explicit=movements.find(m=>{
    const type=normalizeActionType(m.type);
    return type==="pass" || type==="handoff" || type==="shot" || (type==="dribble" && (m.actor ?? toHolder)===toHolder);
  });
  if(explicit){
    const type=normalizeActionType(explicit.type);
    const from=movementActorPosition(explicit,fromStep) || getPlayerPosition(fromStep,fromHolder) || getPlayerPosition(toStep,toHolder);
    let to=movementEndPosition(explicit,toStep);
    if(type==="shot"){
      to = explicit.target || getPlayerPosition(toStep,explicit.actor) || getPlayerPosition(toStep,toHolder);
    }
    return {type,from,to};
  }
  const from=getPlayerPosition(fromStep,fromHolder);
  const to=getPlayerPosition(toStep,toHolder);
  return from && to ? {type:"carry",from,to} : null;
}
function autoBezierEase(t){
  // After Effects-style auto-bezier feel: soft launch, smooth acceleration, longer settle.
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function interpolatePoint(a,b,t){
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function cubicBezierPoint(p0,p1,p2,p3,t){
  const mt = 1 - t;
  const x = mt*mt*mt*p0[0] + 3*mt*mt*t*p1[0] + 3*mt*t*t*p2[0] + t*t*t*p3[0];
  const y = mt*mt*mt*p0[1] + 3*mt*mt*t*p1[1] + 3*mt*t*t*p2[1] + t*t*t*p3[1];
  return [x,y];
}

function bezierPathToSvg(path){
  if(!path || path.length !== 4) return "";
  const a=pctToCourt(orientPoint(path[0]));
  const b=pctToCourt(orientPoint(path[1]));
  const c=pctToCourt(orientPoint(path[2]));
  const d=pctToCourt(orientPoint(path[3]));
  return `M ${a.x} ${a.y} C ${b.x} ${b.y}, ${c.x} ${c.y}, ${d.x} ${d.y}`;
}

function simplifyDragPathToBezier(points){
  if(!points || points.length < 3) return null;

  const p0 = points[0];
  const p3 = points[points.length - 1];

  const p1 = points[Math.max(1, Math.floor(points.length * 0.33))];
  const p2 = points[Math.max(1, Math.floor(points.length * 0.66))];

  const distance = Math.hypot(p3[0]-p0[0], p3[1]-p0[1]);
  if(distance < 2) return null;

  return [p0,p1,p2,p3];
}

function pointOnActionPath(action, fallbackStart, fallbackEnd, t){
  if(action && action.path && action.path.length === 4){
    const p = cubicBezierPoint(
      orientPoint(action.path[0]),
      orientPoint(action.path[1]),
      orientPoint(action.path[2]),
      orientPoint(action.path[3]),
      t
    );
    return p;
  }
  return interpolatePoint(fallbackStart, fallbackEnd, t);
}

function el(name, attrs={}, children=[]){const n=document.createElementNS("http://www.w3.org/2000/svg",name);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));children.forEach(c=>n.appendChild(c));return n;}

function ensureCourtBase(svg){
  if(svg.dataset.courtBaseReady === "true") return;
  svg.innerHTML="";

  const filterId = `${svg.id || "court"}Glow`;
  const defs = el("defs",{class:"courtStaticLayer"});

  const courtGlow = el("filter",{id:filterId,x:"-10%",y:"-10%",width:"120%",height:"120%"});
  courtGlow.appendChild(el("feDropShadow",{dx:"0",dy:"10",stdDeviation:"8",floodColor:"#000000",floodOpacity:".35"}));
  defs.appendChild(courtGlow);

  svg.appendChild(defs);

  // Keep the hardwood image mounted between animation frames. Recreating this
  // image every frame causes iOS/Safari to flash the background during playback.
  svg.appendChild(el("image",{
    class:"courtStaticLayer courtBackgroundImage",
    href:"court-background.png",
    "xlink:href":"court-background.png",
    x:0,
    y:0,
    width:1200,
    height:720,
    preserveAspectRatio:"none",
    filter:`url(#${filterId})`
  }));

  svg.dataset.courtBaseReady = "true";
}

function drawCourt(svg){
  ensureCourtBase(svg);
  Array.from(svg.children).forEach(child=>{
    if(!child.classList || !child.classList.contains("courtStaticLayer")){
      child.remove();
    }
  });

  const inkAttrs = svg === court ? {id:"inkLayer",class:"inkLayer"} : {class:"inkLayer"};
  const inkLayer = el("g",inkAttrs);
  inkPaths.forEach(item=>{
    if(typeof item === "string"){
      inkLayer.appendChild(el("path",{d:item, class:"ink", stroke:"#111111"}));
    } else {
      inkLayer.appendChild(el("path",{d:item.path, class:"ink", stroke:item.color || "#111111"}));
    }
  });
  svg.appendChild(inkLayer);
}

function drawHalf(svg,side){
  const left = side==="left";
  const baseX = left ? 60 : 1140;
  const dir = left ? 1 : -1;

  // Court reference points
  const laneDepth = 230;
  const laneTop = 254;
  const laneHeight = 212;
  const laneBottom = laneTop + laneHeight;
  const rimX = baseX + dir * 125;
  const rimY = 360;
  const ftX = baseX + dir * 230;

  // Key / lane
  svg.appendChild(el("rect",{
    x:left ? baseX : baseX - laneDepth,
    y:laneTop,
    width:laneDepth,
    height:laneHeight,
    class:"courtLine"
  }));

  // Backboard and rim
  svg.appendChild(el("line",{
    x1:baseX + dir * 80,
    y1:333,
    x2:baseX + dir * 80,
    y2:387,
    class:"courtLine"
  }));

  svg.appendChild(el("circle",{
    cx:rimX,
    cy:rimY,
    r:9,
    class:"courtLine"
  }));

  // Free throw circle
  svg.appendChild(el("circle",{
    cx:ftX,
    cy:rimY,
    r:58,
    class:"courtLine"
  }));

  // Lane hash marks
  [285,320,400,435].forEach(y=>{
    svg.appendChild(el("line",{
      x1:baseX + dir * 82,
      y1:y,
      x2:baseX + dir * 102,
      y2:y,
      class:"courtLine thin"
    }));

    svg.appendChild(el("line",{
      x1:baseX + dir * 210,
      y1:y,
      x2:baseX + dir * 230,
      y2:y,
      class:"courtLine thin"
    }));
  });

  // Correct three-point line.
  // No "step" or vertical jog. The line goes straight from the baseline/edge,
  // then becomes one smooth arc around the top of the key, then returns straight
  // to the baseline/edge.
  if(left){
    svg.appendChild(el("path",{
      d:"M 60 120 L 175 120 C 430 170 430 550 175 600 L 60 600",
      class:"courtLine"
    }));
  } else {
    svg.appendChild(el("path",{
      d:"M 1140 120 L 1025 120 C 770 170 770 550 1025 600 L 1140 600",
      class:"courtLine"
    }));
  }
}

function arrowHead(from,to){
  const angle=Math.atan2(to.y-from.y,to.x-from.x),len=18,a1=angle-Math.PI/7,a2=angle+Math.PI/7;
  return `M ${to.x} ${to.y} L ${to.x-len*Math.cos(a1)} ${to.y-len*Math.sin(a1)} M ${to.x} ${to.y} L ${to.x-len*Math.cos(a2)} ${to.y-len*Math.sin(a2)}`;
}

function drawAction(svg, action){
  const type=normalizeActionType(action.type);
  if(SCREEN_TYPES.has(type)){
    const p=pctToCourt(action.at || action.to || action.from);
    const size=type==="flareScreen" ? 28 : 22;
    const cls=type==="flareScreen" ? "screen flareScreen" : "screen";
    svg.appendChild(el("path",{d:`M ${p.x-size} ${p.y} L ${p.x+size} ${p.y} M ${p.x} ${p.y-size} L ${p.x} ${p.y+size}`,class:cls}));
    return;
  }
  if(type==="shot"){
    const a=pctToCourt(action.from || action.to || action.target);
    const b=pctToCourt(action.target || action.to || action.from);
    svg.appendChild(el("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:"action shot"}));
    svg.appendChild(el("path",{d:arrowHead(a,b),class:"action shot"}));
    return;
  }
  if(!action.from || !action.to) return;

  const a=pctToCourt(action.from), b=pctToCourt(action.to);
  let cls="action";
  if(type==="cut") cls+=" cut";
  if(type==="dribble" || type==="handoff") cls+=" dribble";
  if(type==="slip") cls+=" slip";
  if(type==="pass") cls+=" pass";

  if(action.path && action.path.length === 4 && (PLAYER_MOVEMENT_TYPES.has(type) || type==="handoff")){
    const d = bezierPathToSvg(action.path);
    svg.appendChild(el("path",{d,class:cls}));
  } else {
    svg.appendChild(el("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:cls}));
  }

  svg.appendChild(el("path",{d:arrowHead(a,b),class:"action"}));
}

function drawPlayer(svg,num,pos,isShotPlayer=false){
  const p=pctToCourt(pos);
  const g=el("g",{class:isShotPlayer ? "player playerShot" : "player",transform:`translate(${p.x},${p.y})`});
  g.appendChild(el("circle",{cx:0,cy:0,r:25}));
  const t=el("text",{x:0,y:2}); t.textContent=num; g.appendChild(t);
  svg.appendChild(g);
}

function drawBall(svg,pos){
  if(!pos) return;
  const p = pctToCourt(pos);
  const g = el("g",{transform:`translate(${p.x+24},${p.y-24})`});
  g.appendChild(el("circle",{cx:0,cy:0,r:12,class:"ball"}));
  g.appendChild(el("path",{d:"M -8 0 H 8 M 0 -8 V 8 M -7 -7 C -1 -2 -1 2 -7 7 M 7 -7 C 1 -2 1 2 7 7",class:"ballLines"}));
  svg.appendChild(g);
}

function render(){
  const play=plays[currentPlay], rawStep=play.steps[currentStep];
  const step = {
    ...rawStep,
    players: orientPlayers(rawStep.players),
    actions: stepMovements(rawStep).map(orientAction)
  };
  const possession=getPossessionAtStep(play,currentStep);
  const shotStep=isShotStep(rawStep);

  drawCourt(court);
  step.actions.forEach(a=>drawAction(court,a));
  Object.entries(step.players).forEach(([num,pos])=>{
    const isShotPlayer = (shotStep || currentStep === play.steps.length - 1) && possession && Number(num) === Number(possession);
    drawPlayer(court,num,pos,isShotPlayer);
  });

  const rawBallPos=getBallPositionForStep(play,currentStep);
  if(rawBallPos){
    drawBall(court, orientPoint(rawBallPos));
  }

  document.getElementById("playTitle").textContent=play.name;
  document.getElementById("purpose").textContent=play.purpose;
  document.getElementById("stepBadge").textContent=`${play.category || "Play"} · Step ${currentStep+1} of ${play.steps.length} · Attacking ${currentSide === "left" ? "Left" : "Right"} Basket`;
  document.getElementById("note").textContent=rawStep.note;
  const coachNotes=document.getElementById("coachNotes");
  if(coachNotes){
    coachNotes.textContent=play.coachNotes ? `Coach notes: ${play.coachNotes}` : "";
    coachNotes.classList.toggle("hidden",!play.coachNotes);
  }
  setupInkHandlers();
  populateStepList();
  updateVideoButtons();
}

function getPlayVideoQuery(play){
  if(!play || play.category==="Blank") return "";
  return PLAY_VIDEO_QUERIES[play.name] || [
    play.name,
    play.category,
    "basketball play demonstration youth"
  ].filter(Boolean).join(" ");
}

function getYouTubeSearchUrl(query){
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function getYouTubeEmbedUrl(query){
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;
}

function updateVideoButtons(){
  const play=plays[currentPlay];
  const hasVideo=Boolean(getPlayVideoQuery(play));
  document.querySelectorAll("#libraryVideoButton").forEach(btn=>{
    btn.classList.toggle("hidden",!hasVideo);
  });
}

function openPlayVideo(index=currentPlay){
  const play=plays[index];
  const query=getPlayVideoQuery(play);
  if(!query) return;
  const overlay=document.getElementById("videoOverlay");
  const frame=document.getElementById("videoFrame");
  const title=document.getElementById("videoTitle");
  const fallback=document.getElementById("videoFallback");
  if(!overlay || !frame || !title || !fallback) return;
  title.textContent=`${play.name} · See on the court`;
  frame.src=getYouTubeEmbedUrl(query);
  fallback.href=getYouTubeSearchUrl(query);
  overlay.classList.remove("hidden");
}

function closePlayVideo(){
  const overlay=document.getElementById("videoOverlay");
  const frame=document.getElementById("videoFrame");
  if(frame) frame.src="";
  if(overlay) overlay.classList.add("hidden");
}

function populateStepList(){
  const stepList = document.getElementById("stepList");
  if(stepList){
    const play = plays[currentPlay];
    stepList.innerHTML = "";
    play.steps.forEach((step,i)=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "stepItem" + (i === currentStep ? " active" : "");
      btn.innerHTML = `<span class="stepNum">${i+1}</span><span class="stepName">${step.note || "Step"}</span>`;
      btn.addEventListener("click",()=>{
        currentStep = i;
        render();
      });
      stepList.appendChild(btn);
    });
  }

  const builderList = document.getElementById("builderStepList");
  if(builderList){
    builderList.innerHTML = "";
    builderSteps.forEach((step,i)=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "stepItem" + (i === selectedBuilderStepIndex ? " active" : "");
      btn.innerHTML = `<span class="stepNum">${i+1}</span><span class="stepName">${step.note || "Builder step"}</span>`;
      btn.addEventListener("click",()=>selectBuilderStep(i));
      builderList.appendChild(btn);
    });
  }

  updateEditingStatus();
}

function playMatchesFilter(play, filter){
  if(!filter || filter === "all") return true;
  if(filter === "Offense") return (play.group || "Offense") === "Offense";
  if(filter === "Defense") return (play.group || "") === "Defense" || (play.category || "").includes("Defense");
  return (play.category || "") === filter;
}

function populateSelect(){
  const filterEl=document.getElementById("playFilter");
  const filter=filterEl ? filterEl.value : "all";
  const searchEl=document.getElementById("playSearch");
  const search=searchEl ? searchEl.value.trim().toLowerCase() : "";
  playSelect.innerHTML="";
  const visibleIndexes=[];
  plays.forEach((p,i)=>{
    if(playerView && sharedPlayIndexes && !sharedPlayIndexes.includes(i)) return;
    const haystack=[
      p.name,
      p.category,
      p.group,
      p.purpose,
      ...(p.tags || [])
    ].filter(Boolean).join(" ").toLowerCase();
    if(playMatchesFilter(p,filter) && (!search || haystack.includes(search))){
      visibleIndexes.push(i);
      const opt=document.createElement("option");
      opt.value=i;
      opt.textContent=`${p.name}${p.category ? " · " + p.category : ""}`;
      playSelect.appendChild(opt);
    }
  });
  if(!visibleIndexes.includes(currentPlay)){
    currentPlay=visibleIndexes.length ? visibleIndexes[0] : 0;
    currentStep=0;
  }
  playSelect.value=currentPlay;

  const editSelect=document.getElementById("editPlaySelect");
  if(editSelect){
    const currentValue=editSelect.value;
    editSelect.innerHTML='<option value="">Select a saved play</option>';
    loadSaved().forEach((p,i)=>{
      const opt=document.createElement("option");
      opt.value=i;
      opt.textContent=`${p.name || `Custom Play ${i+1}`}${p.category ? " · " + p.category : ""}`;
      editSelect.appendChild(opt);
    });
    editSelect.value=currentValue;
  }
}

function animateToNext(){
  return new Promise(resolve=>{
    if(animating || currentStep>=plays[currentPlay].steps.length-1){resolve(false);return;}
    animating=true; paused=false;
    const play=plays[currentPlay], fromStep=play.steps[currentStep], toStep=play.steps[currentStep+1];
    const duration=1350 * animationSpeed; let start=null;
    function tick(now){
      if(paused){requestAnimationFrame(tick);return;}
      if(!start) start=now;
      const t=Math.min(1,(now-start)/duration);
      const ease=autoBezierEase(t);
      drawCourt(court);
      stepMovements(toStep).map(orientAction).forEach(a=>drawAction(court,a));
      Object.keys(toStep.players).forEach(num=>{
        const aRaw=fromStep.players[num]||toStep.players[num], bRaw=toStep.players[num];
        const a=orientPoint(aRaw), b=orientPoint(bRaw);
        const playerAction=stepMovements(toStep).find(action=>{
          const type=normalizeActionType(action.type);
          if(!(type==="cut" || type==="dribble" || type==="slip" || type==="handoff")) return false;
          if(!action.from || !action.to) return false;
          return Math.abs(action.from[0]-aRaw[0])<.05 && Math.abs(action.from[1]-aRaw[1])<.05 &&
                 Math.abs(action.to[0]-bRaw[0])<.05 && Math.abs(action.to[1]-bRaw[1])<.05;
        });
        const pos = pointOnActionPath(playerAction,a,b,ease);
        const possession=getPossessionAtStep(play,currentStep+1);
        const isShotPlayer = (isShotStep(toStep) || currentStep + 1 === play.steps.length - 1) && possession && Number(num) === Number(possession);
        drawPlayer(court,num,pos,isShotPlayer);
      });
      const ballMovement=getTransitionBallMovement(play,currentStep);
      if(ballMovement && ballMovement.to){
        const a=orientPoint(ballMovement.from || ballMovement.to), b=orientPoint(ballMovement.to);
        drawBall(court,[a[0]+(b[0]-a[0])*ease,a[1]+(b[1]-a[1])*ease]);
      }
      setupInkHandlers();
      if(t<1) requestAnimationFrame(tick);
      else{currentStep++;animating=false;render();resolve(true);}
    }
    requestAnimationFrame(tick);
  });
}

async function animateAllSteps(){
  if(animating) return;
  currentStep=0; render();
  while(currentStep < plays[currentPlay].steps.length-1){
    const moved = await animateToNext();
    if(!moved) break;
    await new Promise(r=>setTimeout(r,350));
  }
}

document.getElementById("nextStep").onclick=()=>{const p=plays[currentPlay];currentStep=Math.min(p.steps.length-1,currentStep+1);render();};
document.getElementById("prevStep").onclick=()=>{currentStep=Math.max(0,currentStep-1);render();};
document.getElementById("reset").onclick=()=>{paused=false;document.getElementById("pause").textContent="Pause";currentStep=0;render();};
document.getElementById("animateStep").onclick=()=>animateToNext();
document.getElementById("animateAll").onclick=animateAllSteps;
document.getElementById("pause").onclick=()=>{paused=!paused;document.getElementById("pause").textContent=paused?"Resume":"Pause";};
function openPlayInView(index,{remember=false}={}){
  currentPlay=Number(index);
  currentStep=0;
  inkPaths=[];
  hasSelectedPlayForView=true;
  if(playSelect) playSelect.value=currentPlay;
  if(remember) rememberRecentPlay(currentPlay);
  setCoachMode("view");
}

playSelect.onchange=e=>openPlayInView(e.target.value,{remember:true});
document.getElementById("sideSelect").onchange=e=>{currentSide=e.target.value;inkPaths=[];render();};
const playFilter=document.getElementById("playFilter");
if(playFilter){
  playFilter.onchange=()=>{
    populateSelect();
    populateLibraryList();
    inkPaths=[];
    render();
  };
}

const playSearch=document.getElementById("playSearch");
if(playSearch){
  playSearch.addEventListener("input",()=>{
    populateSelect();
    populateLibraryList();
    render();
  });
}

function setInkColor(color, buttonId){
  currentInkColor = color;
  ["blackPen","redPen","bluePen","greenPen"].forEach(id=>{
    const btn = document.getElementById(id);
    if(btn) btn.classList.toggle("activePen", id === buttonId);
  });
}

function attachTap(id, handler){
  const btn = document.getElementById(id);
  if(!btn) return;

  btn.addEventListener("click", ev=>{
    ev.preventDefault();
    ev.stopPropagation();
    handler(ev);
  }, {passive:false});
}

attachTap("drawToggle", ()=>{
  drawMode=!drawMode;
  document.getElementById("drawToggle").classList.toggle("active",drawMode);
  document.body.classList.toggle("drawingOn",drawMode);
  setupInkHandlers();
});

["blackPen","redPen","bluePen","greenPen"].forEach(id=>{
  attachTap(id, ()=>{
    const btn = document.getElementById(id);
    const color = btn.dataset.color || "#111111";
    setInkColor(color, id);
    const penSelect=document.getElementById("penSelect");
    if(penSelect) penSelect.value=color;
  });
});

const penSelect=document.getElementById("penSelect");
if(penSelect){
  penSelect.addEventListener("change",()=>{
    const color=penSelect.value;
    const match={
      "#111111":"blackPen",
      "#d32f2f":"redPen",
      "#004b93":"bluePen",
      "#2e7d32":"greenPen"
    }[color] || "blackPen";
    setInkColor(color,match);
  });
}

attachTap("undoInk", ()=>{
  inkPaths.pop();
  render();
});

attachTap("clearInk", ()=>{
  inkPaths=[];
  render();
});

function svgPoint(svg,ev){
  const pt=svg.createSVGPoint(); pt.x=ev.clientX; pt.y=ev.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
function setupInkHandlers(){
  let drawing=false, d="";
  court.onpointerdown = ev=>{
    if(!drawMode) return;
    ev.preventDefault();
    court.setPointerCapture(ev.pointerId);
    const p=svgPoint(court,ev);
    d=`M ${p.x} ${p.y}`;
    drawing=true;
  };
  court.onpointermove = ev=>{
    if(!drawMode || !drawing) return;
    ev.preventDefault();
    const p=svgPoint(court,ev);
    d += ` L ${p.x} ${p.y}`;
    const layer=court.querySelector(".inkLayer");
    if(layer){
      let live=court.querySelector(".liveInk");
      if(!live){
        live=el("path",{class:"ink liveInk", stroke:currentInkColor});
        layer.appendChild(live);
      }
      live.setAttribute("d",d);
      live.setAttribute("stroke",currentInkColor);
    }
  };
  court.onpointerup = ev=>{
    if(!drawMode || !drawing) return;
    ev.preventDefault();
    drawing=false;
    inkPaths.push({path:d, color:currentInkColor});
    render();
  };
}

const viewerMode=document.getElementById("viewerMode");
if(viewerMode){
  viewerMode.onclick=()=>{
    setCoachMode(hasSelectedPlayForView || playerView ? "view" : "library");
  };
}
document.getElementById("builderMode").onclick=()=>setCoachMode("edit");
function toggleMode(mode){
  setCoachMode(mode === "builder" ? "edit" : "view");
}
function setCoachMode(mode){
  if(playerView && mode !== "view" && mode !== "library") mode="view";
  const normalized = mode || "view";
  const isEdit = normalized === "edit";
  setBottomToolsCollapsed(false);
  document.body.dataset.coachMode = normalized;
  document.getElementById("viewer").classList.toggle("hidden",isEdit);
  document.getElementById("builder").classList.toggle("hidden",!isEdit);
  document.querySelectorAll("[data-mode]").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.mode===normalized);
  });
  if(normalized === "draw" && !drawMode){
    drawMode = true;
    document.body.classList.add("drawingOn");
    const drawToggle=document.getElementById("drawToggle");
    if(drawToggle) drawToggle.classList.add("active");
    setupInkHandlers();
  }
  if(normalized !== "draw" && drawMode){
    drawMode = false;
    document.body.classList.remove("drawingOn");
    const drawToggle=document.getElementById("drawToggle");
    if(drawToggle) drawToggle.classList.remove("active");
    setupInkHandlers();
  }
  applyMobileModeChrome(normalized);
  updateCollapseTabLabels();
  if(normalized === "library") populateLibraryList();
  if(isEdit) renderBuilder();
  else render();
}

function applyPlayerViewMode(){
  if(!playerView) return;
  document.body.classList.add("playerView");
  document.body.classList.remove("leftPanelCollapsed","rightPanelCollapsed","bottomToolsCollapsed");
  document.body.dataset.coachMode = sharedViewKind==="single" ? "view" : "library";
  document.getElementById("builder").classList.add("hidden");
  document.getElementById("viewer").classList.remove("hidden");
  inkPaths=[];
  drawMode=false;
  populatePlayerPlaylist();
}

function populatePlayerPlaylist(){
  const title=document.getElementById("playerShareTitle");
  const list=document.getElementById("playerPlaylistList");
  if(!title || !list) return;
  if(!playerView){
    list.innerHTML="";
    return;
  }
  title.textContent=sharedViewKind==="team" ? "Team Library" : sharedViewKind==="playlist" ? "Practice Playlist" : "Shared Play";
  list.innerHTML="";
  (sharedPlayIndexes || [currentPlay]).forEach(index=>{
    const play=plays[index];
    if(!play) return;
    const btn=document.createElement("button");
    btn.type="button";
    btn.textContent=`${play.name}${play.category ? " · " + play.category : ""}`;
    btn.addEventListener("click",()=>{
      hasSelectedPlayForView=true;
      currentPlay=index;
      currentStep=0;
      playSelect.value=index;
      setCoachMode("view");
    });
    list.appendChild(btn);
  });
}

let builderPlayers={1:[36,50],2:[23,26],3:[23,74],4:[40,18],5:[40,82]};
let builderSteps=[];
let dragNum=null;
let currentDragPath=[];
let pendingPlayerPaths={};
let editingSavedIndex=null;
let selectedBuilderStepIndex=null;

function updateEditingStatus(){
  const status=document.getElementById("editingStatus");
  if(!status) return;
  if(editingSavedIndex===null){
    status.textContent="Not editing a saved play.";
  } else {
    const saved=loadSaved();
    const play=saved[editingSavedIndex];
    status.textContent=play ? `Editing: ${play.name || "Saved play"}` : "Editing saved play.";
  }
}

function resetBuilderToNew(){
  editingSavedIndex=null;
  selectedBuilderStepIndex=null;
  builderSteps=[];
  builderPlayers={1:[36,50],2:[23,26],3:[23,74],4:[40,18],5:[40,82]};
  pendingPlayerPaths={};
  document.getElementById("builderName").value="My Full Court Play";
  document.getElementById("builderPurpose").value="Simple spacing and movement action.";
  document.getElementById("builderNote").value="Set player locations for this step.";
  document.getElementById("builderBall").value="1";
  [1,2,3,4,5].forEach(num=>{
    const el=document.getElementById(`moveType${num}`);
    if(el) el.value="cut";
  });
  const select=document.getElementById("editPlaySelect");
  if(select) select.value="";
  renderBuilder();
  populateStepList();
}

function buildPlayFromBuilder(){
  return {
    schemaVersion:PLAY_SCHEMA_VERSION,
    roster:{players:Object.keys(builderSteps[0]?.players || builderPlayers || {}).map(String)},
    name:document.getElementById("builderName").value||"Custom Full Court Play",
    purpose:document.getElementById("builderPurpose").value||"Custom coach-created play.",
    steps:builderSteps.map(s=>({
      id:s.id,
      note:s.note,
      ball:s.ball,
      moveTypes:s.moveTypes || {},
      players:s.players,
      movements:stepMovements(s),
      actions:s.actions || []
    }))
  };
}

function recomputeBuilderActions(){
  builderSteps = builderSteps.map((step,i)=>{
    const previous = i>0 ? builderSteps[i-1] : null;
    const actions=generateBuilderActions(previous, step);
    return {...step, movements:clone(actions), actions};
  });
}

function selectBuilderStep(index){
  if(index<0 || index>=builderSteps.length) return;
  selectedBuilderStepIndex=index;
  const step=builderSteps[index];

  builderPlayers=JSON.parse(JSON.stringify(step.players || {}));
  document.getElementById("builderNote").value=step.note || `Step ${index+1}`;
  document.getElementById("builderBall").value=step.ball ? String(step.ball) : "";

  [1,2,3,4,5].forEach(num=>{
    const el=document.getElementById(`moveType${num}`);
    if(el) el.value=(step.moveTypes && step.moveTypes[num]) ? step.moveTypes[num] : "cut";
  });

  pendingPlayerPaths={};
  renderBuilder();
}

function loadSavedPlayForEditing(index){
  const saved=loadSaved();
  const play=saved[index];
  if(!play){alert("Select a saved custom play first.");return;}

  editingSavedIndex=Number(index);
  selectedBuilderStepIndex=null;
  document.getElementById("builderName").value=play.name || "Custom Full Court Play";
  document.getElementById("builderPurpose").value=play.purpose || "Custom coach-created play.";
  builderSteps=(play.steps || []).map(step=>({
    id:step.id,
    note:step.note || "Step",
    ball:step.ball || null,
    moveTypes:step.moveTypes || {},
    players:JSON.parse(JSON.stringify(step.players || {})),
    movements:clone(step.movements || step.actions || []),
    actions:clone(step.actions || step.movements || [])
  }));

  if(builderSteps.length){
    selectBuilderStep(builderSteps.length-1);
  } else {
    builderPlayers={1:[36,50],2:[23,26],3:[23,74],4:[40,18],5:[40,82]};
    renderBuilder();
  }
  updateEditingStatus();
}

function orientedBuilderStep(rawStep){
  return {
    ...rawStep,
    players: orientPlayers(rawStep.players || {}),
    actions: stepMovements(rawStep).map(orientAction)
  };
}

function drawBuilderStep(stepIndex){
  const svg=document.getElementById("builderCourt");
  if(!svg) return;

  const rawStep=builderSteps[stepIndex];
  if(!rawStep){
    renderBuilder();
    return;
  }

  const step=orientedBuilderStep(rawStep);
  const builtPlay={steps:builderSteps};
  const possession=getPossessionAtStep(builtPlay,stepIndex);
  drawCourt(svg);
  (step.actions || []).forEach(a=>drawAction(svg,a));
  Object.entries(step.players).forEach(([num,pos])=>{
    const isShotPlayer = (isShotStep(rawStep) || stepIndex === builderSteps.length - 1) && possession && Number(num) === Number(possession);
    drawPlayer(svg,num,pos,isShotPlayer);
  });
  const rawBallPos=getBallPositionForStep(builtPlay,stepIndex);
  if(rawBallPos){
    drawBall(svg, orientPoint(rawBallPos));
  }
}

function animateBuilderStep(fromIndex){
  return new Promise(resolve=>{
    if(builderSteps.length<2){renderBuilder();resolve(false);return;}

    const startIndex = Math.max(0, Math.min(fromIndex, builderSteps.length-2));
    const fromStep=builderSteps[startIndex];
    const toStep=builderSteps[startIndex+1];
    const svg=document.getElementById("builderCourt");
    const duration=1100;
    let start=null;

    function tick(now){
      if(!start) start=now;
      const t=Math.min(1,(now-start)/duration);
      const ease=autoBezierEase(t);

      drawCourt(svg);
      stepMovements(toStep).map(orientAction).forEach(a=>drawAction(svg,a));

      Object.keys(toStep.players || {}).forEach(num=>{
        const aRaw=(fromStep.players && fromStep.players[num]) || toStep.players[num];
        const bRaw=toStep.players[num];
        const a=orientPoint(aRaw), b=orientPoint(bRaw);
        const playerAction=stepMovements(toStep).find(action=>{
          const type=normalizeActionType(action.type);
          if(!(type==="cut" || type==="dribble" || type==="slip" || type==="handoff")) return false;
          if(!action.from || !action.to) return false;
          return Math.abs(action.from[0]-aRaw[0])<.05 && Math.abs(action.from[1]-aRaw[1])<.05 &&
                 Math.abs(action.to[0]-bRaw[0])<.05 && Math.abs(action.to[1]-bRaw[1])<.05;
        });
        const pos=pointOnActionPath(playerAction,a,b,ease);
        const builtPlay={steps:builderSteps};
        const possession=getPossessionAtStep(builtPlay,startIndex+1);
        const isShotPlayer = (isShotStep(toStep) || startIndex+1 === builderSteps.length-1) && possession && Number(num) === Number(possession);
        drawPlayer(svg,num,pos,isShotPlayer);
      });

      const ballMovement=getTransitionBallMovement({steps:builderSteps},startIndex);
      if(ballMovement && ballMovement.to){
        const a=orientPoint(ballMovement.from || ballMovement.to), b=orientPoint(ballMovement.to);
        drawBall(svg,[a[0]+(b[0]-a[0])*ease,a[1]+(b[1]-a[1])*ease]);
      }

      if(t<1) requestAnimationFrame(tick);
      else{drawBuilderStep(startIndex+1);resolve(true);}
    }

    requestAnimationFrame(tick);
  });
}

async function animateBuilderPlay(){
  if(builderSteps.length<2){alert("Add at least two steps to preview a play.");return;}
  for(let i=0;i<builderSteps.length-1;i++){
    await animateBuilderStep(i);
    await new Promise(r=>setTimeout(r,250));
  }
}

function renderBuilder(){
  const svg=document.getElementById("builderCourt");
  drawCourt(svg);

  // Show the last captured path preview while building.
  Object.entries(pendingPlayerPaths).forEach(([num,path])=>{
    if(path && path.length===4){
      const d = bezierPathToSvg(path);
      svg.appendChild(el("path",{d,class:"action builderCurvePreview"}));
    }
  });

  Object.entries(builderPlayers).forEach(([num,pos])=>{
    const p=pctToCourt(pos);
    const g=el("g",{class:"player",transform:`translate(${p.x},${p.y})`,"data-num":num});
    g.appendChild(el("circle",{cx:0,cy:0,r:25}));
    const t=el("text",{x:0,y:2});t.textContent=num;g.appendChild(t);
    g.addEventListener("pointerdown",ev=>{
      dragNum=num;
      currentDragPath=[JSON.parse(JSON.stringify(builderPlayers[num]))];
      svg.setPointerCapture(ev.pointerId);
    });
    svg.appendChild(g);
  });

  svg.onpointermove=ev=>{
    if(!dragNum)return;
    const p=svgPoint(svg,ev);
    const pct=courtToPct(p.x,p.y);
    builderPlayers[dragNum]=pct;

    const last=currentDragPath[currentDragPath.length-1];
    if(!last || Math.hypot(pct[0]-last[0],pct[1]-last[1])>.6){
      currentDragPath.push(pct);
    }

    renderBuilder();
  };

  svg.onpointerup=()=>{
    if(dragNum){
      const curve = simplifyDragPathToBezier(currentDragPath);
      if(curve){
        pendingPlayerPaths[dragNum]=curve;
      }
    }
    dragNum=null;
    currentDragPath=[];
    populateStepList();
  };

  populateStepList();
}

function getBuilderMovementTypes(){
  const types = {};
  [1,2,3,4,5].forEach(num=>{
    const el = document.getElementById(`moveType${num}`);
    types[num] = el ? el.value : "cut";
  });
  return types;
}

function getBuilderBall(){
  const value = document.getElementById("builderBall").value;
  return value ? Number(value) : null;
}

function generateBuilderActions(prevStep, currentStep){
  const actions = [];
  if(!prevStep) return actions;

  const prevBall = prevStep.ball;
  const currentBall = currentStep.ball;
  const existingMovements=stepMovements(currentStep);
  function existingPathFor(num,type,prev,now){
    const match=existingMovements.find(action=>{
      const actionType=normalizeActionType(action.type);
      if(actionType!==type || !action.from || !action.to || !action.path) return false;
      return Math.abs(action.from[0]-prev[0])<.05 && Math.abs(action.from[1]-prev[1])<.05 &&
             Math.abs(action.to[0]-now[0])<.05 && Math.abs(action.to[1]-now[1])<.05;
    });
    return match ? match.path : null;
  }

  // Explicit pass support:
  // If a player's movement type is set to Pass, the app uses that player as the passer.
  // The pass ends at the selected current ball handler.
  let explicitPasser = null;
  if(currentStep.moveTypes){
    Object.keys(currentStep.moveTypes).forEach(num=>{
      const type=normalizeActionType(currentStep.moveTypes[num]);
      if(type === "pass" || type === "handoff"){
        explicitPasser = Number(num);
      }
    });
  }

  if(currentBall){
    const receiverPos = currentStep.players[String(currentBall)] || currentStep.players[currentBall];

    if(explicitPasser){
      const passerPos = prevStep.players[String(explicitPasser)] || prevStep.players[explicitPasser] || currentStep.players[String(explicitPasser)];
      const passType=normalizeActionType(currentStep.moveTypes[String(explicitPasser)] || currentStep.moveTypes[explicitPasser]);
      if(passerPos && receiverPos && explicitPasser !== currentBall){
        actions.push({type:passType==="handoff" ? "handoff" : "pass", actor:explicitPasser, receiver:currentBall, from:passerPos, to:receiverPos});
      }
    } else if(prevBall && prevBall !== currentBall){
      // Fallback: if the ball changes hands and no explicit passer is marked,
      // draw the pass from the previous ball handler to the new ball handler.
      const fromPos = prevStep.players[String(prevBall)] || prevStep.players[prevBall];
      if(fromPos && receiverPos){
        actions.push({type:"pass", actor:prevBall, receiver:currentBall, from:fromPos, to:receiverPos});
      }
    }
  }

  Object.keys(currentStep.players).forEach(num=>{
    const prev = prevStep.players[num];
    const now = currentStep.players[num];
    if(!prev || !now) return;

    const moved = Math.abs(prev[0]-now[0]) > 1 || Math.abs(prev[1]-now[1]) > 1;
    const moveType = currentStep.moveTypes ? currentStep.moveTypes[num] : "cut";

    if(moveType === "none" || moveType === "pass" || moveType === "handoff") return;

    if(SCREEN_TYPES.has(moveType)){
      actions.push({type:moveType, actor:Number(num), at:now});
      return;
    }

    if(moveType === "shot"){
      actions.push({type:"shot", actor:Number(num), from:now, target:defaultShotTarget(), endsPossession:true});
      return;
    }

    if(moved && PLAYER_MOVEMENT_TYPES.has(moveType)){
      const savedPath = pendingPlayerPaths[num] || existingPathFor(num,moveType,prev,now);
      actions.push({type:moveType, actor:Number(num), from:prev, to:now, path:savedPath});
    }
  });

  return actions;
}

function setupBuilderHelp(){
  const help = document.getElementById("builderHelp");
  if(!help) return;

  if(localStorage.getItem("hideBuilderHelp") === "true"){
    help.classList.add("hidden");
  }

  const close = document.getElementById("closeBuilderHelp");
  const check = document.getElementById("dontShowBuilderHelp");

  if(close){
    close.addEventListener("click", ()=>{
      if(check && check.checked){
        localStorage.setItem("hideBuilderHelp","true");
      }
      help.classList.add("hidden");
    });
  }
}

document.getElementById("addBuilderStep").onclick=()=>{
  const step = {
    id:`step-${builderSteps.length+1}`,
    note:document.getElementById("builderNote").value||`Step ${builderSteps.length+1}`,
    ball:getBuilderBall(),
    moveTypes:getBuilderMovementTypes(),
    players:JSON.parse(JSON.stringify(builderPlayers)),
    movements:[],
    actions:[]
  };

  const prevStep = builderSteps.length ? builderSteps[builderSteps.length-1] : null;
  step.actions = generateBuilderActions(prevStep, step);
  step.movements = clone(step.actions);

  builderSteps.push(step);
  selectedBuilderStepIndex=builderSteps.length-1;
  pendingPlayerPaths={};
  document.getElementById("builderNote").value=`Step ${builderSteps.length+1}: move players, choose action types, then add the next step.`;
  alert(`Step ${builderSteps.length} added.`);
  populateStepList();
};

document.getElementById("saveBuilderPlay").onclick=()=>{
  if(builderSteps.length<1){alert("Add at least one step first.");return;}
  recomputeBuilderActions();
  const built=buildPlayFromBuilder();

  if(editingSavedIndex!==null){
    updateCustom(editingSavedIndex,built);
  } else {
    editingSavedIndex=saveCustom(built);
  }

  plays=[...samplePlays,...loadSaved()];
  populateSelect();
  currentPlay=samplePlays.length+editingSavedIndex;
  currentStep=0;
  hasSelectedPlayForView=true;
  playSelect.value=currentPlay;
  populateStepList();
  updateEditingStatus();
  setCoachMode("view");
  render();
};

const saveAsNewBtn=document.getElementById("saveAsNewPlay");
if(saveAsNewBtn){
  saveAsNewBtn.onclick=()=>{
    if(builderSteps.length<1){alert("Add at least one step first.");return;}
    recomputeBuilderActions();
    const built=buildPlayFromBuilder();
    built.name = `${built.name} Copy`;
    editingSavedIndex=saveCustom(built);
    plays=[...samplePlays,...loadSaved()];
    populateSelect();
    currentPlay=samplePlays.length+editingSavedIndex;
    currentStep=0;
    hasSelectedPlayForView=true;
    playSelect.value=currentPlay;
    updateEditingStatus();
    setCoachMode("view");
    render();
  };
}

const updateStepBtn=document.getElementById("updateBuilderStep");
if(updateStepBtn){
  updateStepBtn.onclick=()=>{
    if(selectedBuilderStepIndex===null || !builderSteps[selectedBuilderStepIndex]){
      alert("Select a build step first.");
      return;
    }
    const step={
      id:builderSteps[selectedBuilderStepIndex].id || `step-${selectedBuilderStepIndex+1}`,
      note:document.getElementById("builderNote").value||`Step ${selectedBuilderStepIndex+1}`,
      ball:getBuilderBall(),
      moveTypes:getBuilderMovementTypes(),
      players:JSON.parse(JSON.stringify(builderPlayers)),
      movements:stepMovements(builderSteps[selectedBuilderStepIndex]),
      actions:[]
    };
    builderSteps[selectedBuilderStepIndex]=step;
    recomputeBuilderActions();
    pendingPlayerPaths={};
    renderBuilder();
  };
}

const deleteStepBtn=document.getElementById("deleteBuilderStep");
if(deleteStepBtn){
  deleteStepBtn.onclick=()=>{
    if(selectedBuilderStepIndex===null || !builderSteps[selectedBuilderStepIndex]){
      alert("Select a build step first.");
      return;
    }
    if(!confirm("Delete this step from the play?")) return;
    builderSteps.splice(selectedBuilderStepIndex,1);
    selectedBuilderStepIndex=builderSteps.length ? Math.min(selectedBuilderStepIndex,builderSteps.length-1) : null;
    recomputeBuilderActions();
    if(selectedBuilderStepIndex!==null) selectBuilderStep(selectedBuilderStepIndex);
    else renderBuilder();
  };
}

const loadSavedBtn=document.getElementById("loadSavedPlay");
if(loadSavedBtn){
  loadSavedBtn.onclick=()=>{
    const val=document.getElementById("editPlaySelect").value;
    if(val===""){alert("Select a saved custom play first.");return;}
    loadSavedPlayForEditing(Number(val));
  };
}

const newBuilderBtn=document.getElementById("newBuilderPlay");
if(newBuilderBtn){
  newBuilderBtn.onclick=()=>resetBuilderToNew();
}

const deleteSavedBtn=document.getElementById("deleteSavedPlay");
if(deleteSavedBtn){
  deleteSavedBtn.onclick=()=>{
    const val=document.getElementById("editPlaySelect").value;
    if(val===""){alert("Select a saved custom play first.");return;}
    const saved=loadSaved();
    const play=saved[Number(val)];
    if(!confirm(`Delete saved play "${play && play.name ? play.name : "Custom Play"}"?`)) return;
    deleteCustom(Number(val));
    editingSavedIndex=null;
    plays=[...samplePlays,...loadSaved()];
    populateSelect();
    resetBuilderToNew();
    currentPlay=0;
    currentStep=0;
    hasSelectedPlayForView=false;
    setCoachMode("draw");
  };
}

document.getElementById("clearSaved").onclick=()=>{
  if(confirm("Clear all saved custom plays on this device?")){
    localStorage.removeItem("coachFullCourtPlays");
    plays=[...samplePlays];
    populateSelect();
    currentPlay=0;
    currentStep=0;
    hasSelectedPlayForView=false;
    setCoachMode("draw");
  }
};

const blankBtn = document.getElementById("blankCourtQuick");
if(blankBtn){
  blankBtn.addEventListener("click",()=>{
    const idx = plays.findIndex(p=>p.name === "Blank Court Template");
    if(idx >= 0){
      currentPlay = idx;
      currentStep = 0;
      playSelect.value = idx;
      inkPaths = [];
      hasSelectedPlayForView=false;
      setCoachMode("draw");
    }
  });
}

const builderBlank = document.getElementById("builderBlankCourt");
if(builderBlank){
  builderBlank.addEventListener("click",()=>{
    builderPlayers = {};
    pendingPlayerPaths={};
    renderBuilder();
  });
}

const builderReset = document.getElementById("builderResetPositions");
if(builderReset){
  builderReset.addEventListener("click",()=>{
    builderPlayers={1:[36,50],2:[23,26],3:[23,74],4:[40,18],5:[40,82]};
    pendingPlayerPaths={};
    renderBuilder();
  });
}

const addRail = document.getElementById("addBuilderStepRail");
if(addRail){
  addRail.addEventListener("click",()=>document.getElementById("addBuilderStep").click());
}

const topSave = document.getElementById("saveBuilderPlayTop");
if(topSave){
  topSave.addEventListener("click",()=>{
    if(!document.getElementById("builder").classList.contains("hidden")){
      document.getElementById("saveBuilderPlay").click();
    } else {
      alert("Open Builder to save a new custom play.");
    }
  });
}

const shareBtn = document.getElementById("sharePlay");
async function shareOrCopyUrl(url){
  if(navigator.share){
    try{ await navigator.share({title:"Coach Taylor's Playbook",url}); return; }catch(e){}
  }
  try{
    await navigator.clipboard.writeText(url);
    alert("Link copied.");
  }catch(e){
    showShareUrl("Share Link",url);
  }
}
if(shareBtn){
  shareBtn.addEventListener("click",async ()=>{
    if(playerView){
      await shareOrCopyUrl(window.location.href);
      return;
    }
    setCoachMode("share");
    if(!requireShareableUrl()) return;
    showShareUrl("Player View Link",makeShareUrl("single",[currentPlay]));
  });
}

const speedSelect=document.getElementById("speedSelect");
if(speedSelect){
  speedSelect.addEventListener("change",()=>{
    animationSpeed=Number(speedSelect.value)||1;
  });
}

const playPause=document.getElementById("playPause");
if(playPause){
  playPause.addEventListener("click",()=>{
    if(animating){
      paused=!paused;
      playPause.textContent=paused ? "Resume" : "Pause";
      document.getElementById("pause").textContent=paused ? "Resume" : "Pause";
      return;
    }
    playPause.textContent="Pause";
    animateAllSteps().finally(()=>{
      playPause.textContent="Play";
      paused=false;
      document.getElementById("pause").textContent="Pause";
    });
  });
}

const drawModeShortcut=document.getElementById("drawModeShortcut");
if(drawModeShortcut) drawModeShortcut.addEventListener("click",()=>setCoachMode("draw"));

const shareModeShortcut=document.getElementById("shareModeShortcut");
if(shareModeShortcut) shareModeShortcut.addEventListener("click",()=>setCoachMode("share"));

["drawModeTab","libraryModeTab","shareModeTab"].forEach(id=>{
  const btn=document.getElementById(id);
  if(btn) btn.addEventListener("click",()=>setCoachMode(btn.dataset.mode));
});

const doneDrawing=document.getElementById("doneDrawing");
if(doneDrawing){
  doneDrawing.addEventListener("click",()=>{
    setCoachMode(hasSelectedPlayForView ? "view" : "library");
  });
}

const eraserInk=document.getElementById("eraserInk");
if(eraserInk) eraserInk.addEventListener("click",()=>{
  inkPaths.pop();
  render();
});

function setTopControlsCollapsed(collapsed){
  document.body.classList.toggle("topControlsCollapsed",Boolean(collapsed));
  updateCollapseTabLabels();
}

function setBottomToolsCollapsed(collapsed){
  document.body.classList.toggle("bottomToolsCollapsed",Boolean(collapsed));
  updateCollapseTabLabels();
}

function setLeftPanelCollapsed(collapsed){
  document.body.classList.toggle("leftPanelCollapsed",Boolean(collapsed));
  updateCollapseTabLabels();
}

function setRightPanelCollapsed(collapsed){
  document.body.classList.toggle("rightPanelCollapsed",Boolean(collapsed));
  updateCollapseTabLabels();
}

function updateCollapseTabLabels(){
  const topTab=document.getElementById("topControlsTab");
  const bottomTab=document.getElementById("bottomToolsTab");
  const leftTab=document.getElementById("leftPanelTab");
  const rightTab=document.getElementById("rightPanelTab");
  const topCollapsed=document.body.classList.contains("topControlsCollapsed");
  const bottomCollapsed=document.body.classList.contains("bottomToolsCollapsed");
  const leftCollapsed=document.body.classList.contains("leftPanelCollapsed");
  const rightCollapsed=document.body.classList.contains("rightPanelCollapsed");
  const mode=document.body.dataset.coachMode || "view";
  const leftLabels={view:"Steps",edit:"Build Steps",library:"Shared Plays"};
  const rightLabels={view:"Info",library:"Library",share:"Share",edit:"Details"};
  const leftName=playerView && mode==="library" ? "Shared Plays" : leftLabels[mode];
  const rightName=rightLabels[mode];
  if(topTab){
    topTab.textContent=topCollapsed ? "Controls" : "Hide Controls";
    topTab.setAttribute("aria-expanded",String(!topCollapsed));
  }
  if(bottomTab){
    bottomTab.textContent=bottomCollapsed ? "Tools" : "Hide Tools";
    bottomTab.setAttribute("aria-expanded",String(!bottomCollapsed));
  }
  if(leftTab){
    leftTab.classList.toggle("hidden",!leftName);
    leftTab.textContent=leftCollapsed ? leftName || "Panel" : `Hide ${leftName || "Panel"}`;
    leftTab.setAttribute("aria-expanded",String(!leftCollapsed));
  }
  if(rightTab){
    rightTab.classList.toggle("hidden",!rightName);
    rightTab.textContent=rightCollapsed ? rightName || "Panel" : `Hide ${rightName || "Panel"}`;
    rightTab.setAttribute("aria-expanded",String(!rightCollapsed));
  }
}

function addSwipeGesture(element, handlers){
  if(!element) return;
  let startX=0;
  let startY=0;

  element.addEventListener("touchstart",event=>{
    const touch=event.changedTouches[0];
    if(!touch) return;
    startX=touch.clientX;
    startY=touch.clientY;
  },{passive:true});

  element.addEventListener("touchend",event=>{
    const touch=event.changedTouches[0];
    if(!touch) return;
    const dx=touch.clientX-startX;
    const dy=touch.clientY-startY;
    const verticalSwipe=Math.abs(dy)>52 && Math.abs(dy)>Math.abs(dx)*1.2;
    const horizontalSwipe=Math.abs(dx)>52 && Math.abs(dx)>Math.abs(dy)*1.2;
    if(verticalSwipe){
      if(dy<0 && handlers.up) handlers.up();
      if(dy>0 && handlers.down) handlers.down();
    }
    if(horizontalSwipe){
      if(dx<0 && handlers.left) handlers.left();
      if(dx>0 && handlers.right) handlers.right();
    }
  },{passive:true});
}

function setupCollapsibleControls(){
  const header=document.querySelector(".appHeader");
  const headerActions=document.querySelector(".headerActions");
  const topTab=document.getElementById("topControlsTab");
  const bottomTab=document.getElementById("bottomToolsTab");
  const leftTab=document.getElementById("leftPanelTab");
  const rightTab=document.getElementById("rightPanelTab");
  const toolbars=document.querySelectorAll(".floatingToolbar");
  const leftPanels=document.querySelectorAll(".stepsPanel,.builderStepsPanel,.playerLibraryPanel");
  const rightPanels=document.querySelectorAll(".playPanel,.libraryPanel,.sharePanel,.editPanel,.movementPanel");

  function addEmbeddedHideButton(container,label,handler){
    if(!container || container.querySelector(":scope > .embeddedHideButton")) return;
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="embeddedHideButton";
    btn.textContent=label;
    btn.addEventListener("click",event=>{
      event.preventDefault();
      event.stopPropagation();
      handler();
    });
    container.appendChild(btn);
    container.classList.add("hasHideButton");
  }

  toolbars.forEach(toolbar=>addEmbeddedHideButton(toolbar,"Hide Tools",()=>setBottomToolsCollapsed(true)));
  leftPanels.forEach(panel=>addEmbeddedHideButton(panel,"Hide",()=>setLeftPanelCollapsed(true)));
  rightPanels.forEach(panel=>addEmbeddedHideButton(panel,"Hide",()=>setRightPanelCollapsed(true)));

  addSwipeGesture(header,{up:()=>setTopControlsCollapsed(true)});
  toolbars.forEach(toolbar=>addSwipeGesture(toolbar,{down:()=>setBottomToolsCollapsed(true)}));
  leftPanels.forEach(panel=>addSwipeGesture(panel,{left:()=>setLeftPanelCollapsed(true)}));
  rightPanels.forEach(panel=>addSwipeGesture(panel,{right:()=>setRightPanelCollapsed(true)}));

  if(topTab){
    topTab.addEventListener("click",()=>setTopControlsCollapsed(!document.body.classList.contains("topControlsCollapsed")));
    addSwipeGesture(topTab,{down:()=>setTopControlsCollapsed(false)});
  }

  if(bottomTab){
    bottomTab.addEventListener("click",()=>setBottomToolsCollapsed(!document.body.classList.contains("bottomToolsCollapsed")));
    addSwipeGesture(bottomTab,{up:()=>setBottomToolsCollapsed(false)});
  }

  if(leftTab){
    leftTab.addEventListener("click",()=>setLeftPanelCollapsed(!document.body.classList.contains("leftPanelCollapsed")));
    addSwipeGesture(leftTab,{right:()=>setLeftPanelCollapsed(false)});
  }

  if(rightTab){
    rightTab.addEventListener("click",()=>setRightPanelCollapsed(!document.body.classList.contains("rightPanelCollapsed")));
    addSwipeGesture(rightTab,{left:()=>setRightPanelCollapsed(false)});
  }

  updateCollapseTabLabels();
}

function isCompactTouchLayout(){
  return window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(max-width: 1120px)").matches;
}

function applyMobileModeChrome(mode=document.body.dataset.coachMode || "view"){
  if(playerView || !isCompactTouchLayout()) return;

  setTopControlsCollapsed(false);
  setBottomToolsCollapsed(false);
  setLeftPanelCollapsed(true);

  const panelMode = mode === "library" || mode === "share" || mode === "edit";
  setRightPanelCollapsed(!panelMode);
}

function setupMobileDefaultChrome(){
  if(!isCompactTouchLayout() || playerView) return;
  applyMobileModeChrome(document.body.dataset.coachMode || "view");
}

function setupDesktopRubberBand(){
  const shell=document.querySelector(".appShell");
  if(!shell || window.matchMedia("(pointer: coarse)").matches) return;

  let currentX=0;
  let currentY=0;
  let targetX=0;
  let targetY=0;
  let baseTargetX=0;
  let baseTargetY=0;
  let dragging=false;
  let recovering=false;
  let startX=0;
  let startY=0;
  let frame=null;
  const maxX=22;
  const maxY=52;
  const enableWheelRubber=false;

  function clamp(value,limit){
    return Math.max(-limit,Math.min(limit,value));
  }

  function setDisplay(nextX,nextY){
    currentX=nextX;
    currentY=nextY;
    document.documentElement.style.setProperty("--rubber-x",`${currentX}px`);
    document.documentElement.style.setProperty("--rubber-y",`${currentY}px`);
  }

  function setTarget(nextX,nextY){
    targetX=clamp(nextX,maxX);
    targetY=clamp(nextY,maxY);
    startLoop();
  }

  function startLoop(){
    if(frame) return;
    document.body.classList.add("rubberDragging");
    document.body.classList.remove("rubberRecovering");

    function tick(){
      const ease=recovering ? .075 : .18;
      currentX += (targetX-currentX)*ease;
      currentY += (targetY-currentY)*ease;
      setDisplay(currentX,currentY);

      const settled=Math.abs(currentX-targetX)<.025 && Math.abs(currentY-targetY)<.025 && Math.abs(targetX)<.025 && Math.abs(targetY)<.025;
      if(settled){
        setDisplay(0,0);
        targetX=0;
        targetY=0;
        recovering=false;
        frame=null;
        document.body.classList.remove("rubberDragging","rubberRecovering");
        return;
      }
      frame=requestAnimationFrame(tick);
    }

    frame=requestAnimationFrame(tick);
  }

  function recoverRubber(){
    recovering=true;
    document.body.classList.remove("rubberDragging");
    document.body.classList.add("rubberRecovering");
    setTarget(0,0);
  }

  function isControlSurface(target){
    return Boolean(target && target.closest("button,input,select,textarea,a,.floatingPanel,.floatingToolbar,.collapseTab"));
  }

  function shouldDrag(target){
    return !isControlSurface(target) && !target.closest("svg");
  }

  shell.addEventListener("pointerdown",event=>{
    if(event.pointerType === "touch" || event.button !== 0 || !shouldDrag(event.target)) return;
    dragging=true;
    recovering=false;
    startX=event.clientX;
    startY=event.clientY;
    baseTargetX=targetX;
    baseTargetY=targetY;
    document.body.classList.add("rubberDragging");
    document.body.classList.remove("rubberRecovering");
    shell.setPointerCapture(event.pointerId);
  });

  shell.addEventListener("pointermove",event=>{
    if(!dragging) return;
    const dx=event.clientX-startX;
    const dy=event.clientY-startY;
    setTarget(baseTargetX + dx*.075,baseTargetY + dy*.18);
  });

  shell.addEventListener("pointerup",()=>{
    if(!dragging) return;
    dragging=false;
    recoverRubber();
  });

  shell.addEventListener("pointercancel",()=>{
    if(!dragging) return;
    dragging=false;
    recoverRubber();
  });

  document.addEventListener("wheel",event=>{
    if(!enableWheelRubber) return;
    if(isControlSurface(event.target)) return;
    event.preventDefault();
    document.body.classList.add("rubberDragging");
    document.body.classList.remove("rubberRecovering");
    recovering=false;
    setTarget(clamp(-event.deltaX*.014,maxX), clamp(-event.deltaY*.04,maxY));
    window.clearTimeout(setupDesktopRubberBand.wheelTimer);
    setupDesktopRubberBand.wheelTimer=window.setTimeout(recoverRubber,130);
  },{passive:false});
}

function getFavoriteIndexes(){
  try{return JSON.parse(localStorage.getItem("coachFavoritePlays")||"[]");}
  catch(e){return [];}
}
function setFavoriteIndexes(indexes){
  localStorage.setItem("coachFavoritePlays",JSON.stringify(indexes));
}
function rememberRecentPlay(index){
  let recent=[];
  try{recent=JSON.parse(localStorage.getItem("coachRecentPlays")||"[]");}catch(e){}
  recent=[index,...recent.filter(i=>i!==index)].slice(0,6);
  localStorage.setItem("coachRecentPlays",JSON.stringify(recent));
}
function getRecentPlayIndexes(){
  try{return JSON.parse(localStorage.getItem("coachRecentPlays")||"[]");}
  catch(e){return [];}
}
function populateLibraryList(mode="visible"){
  const list=document.getElementById("libraryList");
  if(!list) return;
  list.innerHTML="";
  let indexes=[];
  if(mode==="favorites"){
    indexes=getFavoriteIndexes();
  } else if(mode==="recent"){
    indexes=getRecentPlayIndexes();
  } else {
    indexes=[...playSelect.options].map(opt=>Number(opt.value));
  }
  indexes.filter(i=>plays[i]).slice(0,8).forEach(i=>{
    const row=document.createElement("div");
    row.className="libraryPlayRow";
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="libraryOpenPlay";
    btn.textContent=`${plays[i].name}${plays[i].category ? " · " + plays[i].category : ""}`;
    btn.addEventListener("click",()=>{
      openPlayInView(i,{remember:true});
    });
    row.appendChild(btn);
    if(getPlayVideoQuery(plays[i])){
      const videoBtn=document.createElement("button");
      videoBtn.type="button";
      videoBtn.className="videoButton";
      videoBtn.dataset.videoButton="true";
      videoBtn.textContent="See on the court!";
      videoBtn.addEventListener("click",event=>{
        event.preventDefault();
        event.stopPropagation();
        currentPlay=i;
        currentStep=0;
        if(playSelect) playSelect.value=i;
        openPlayVideo(i);
      });
      row.appendChild(videoBtn);
    }
    list.appendChild(row);
  });
  if(!list.children.length){
    const empty=document.createElement("div");
    empty.className="small";
    empty.textContent="No plays to show here yet.";
    list.appendChild(empty);
  }
  populatePlayerPlaylist();
}

const favoritePlay=document.getElementById("favoritePlay");
if(favoritePlay){
  favoritePlay.addEventListener("click",()=>{
    const favorites=getFavoriteIndexes();
    const next=favorites.includes(currentPlay)
      ? favorites.filter(i=>i!==currentPlay)
      : [currentPlay,...favorites];
    setFavoriteIndexes(next);
    populateLibraryList("favorites");
  });
}

const recentPlays=document.getElementById("recentPlays");
if(recentPlays){
  recentPlays.addEventListener("click",()=>populateLibraryList("recent"));
}

const libraryVideoButton=document.getElementById("libraryVideoButton");
if(libraryVideoButton){
  libraryVideoButton.addEventListener("click",()=>openPlayVideo(currentPlay));
}

const closeVideo=document.getElementById("closeVideo");
if(closeVideo){
  closeVideo.addEventListener("click",()=>closePlayVideo());
}

const videoOverlay=document.getElementById("videoOverlay");
if(videoOverlay){
  videoOverlay.addEventListener("click",event=>{
    if(event.target===videoOverlay) closePlayVideo();
  });
}

const shareLink=document.getElementById("shareLink");
if(shareLink){
  shareLink.addEventListener("click",()=>{
    if(!requireShareableUrl()) return;
    shareOrCopyUrl(makeShareUrl("single",[currentPlay]));
  });
}

function setupPublicAppUrlControls(){
  const input=document.getElementById("publicAppUrl");
  const save=document.getElementById("savePublicAppUrl");
  if(!input || !save) return;
  input.value=localStorage.getItem("coachPublicAppUrl") || "";
  if(window.location.protocol==="http:" || window.location.protocol==="https:"){
    input.value=getPublicAppUrl();
    input.disabled=true;
    save.textContent="Using Hosted URL";
    save.disabled=true;
  }
  save.addEventListener("click",()=>{
    const normalized=normalizePublicAppUrl(input.value);
    if(!normalized){
      showShareUrl("Public URL Required","Paste the full hosted app URL, like https://your-site.github.io/playbook/");
      return;
    }
    localStorage.setItem("coachPublicAppUrl",normalized);
    input.value=normalized;
    showShareUrl("Public App URL Saved",normalized);
  });
}

function requireShareableUrl(){
  if(getPublicAppUrl()) return true;
  showShareUrl("Public URL Required","Paste your GitHub Pages or website URL above before generating player QR codes from a local file.");
  return false;
}

function showShareUrl(label,url){
  activeShareUrl=url;
  const preview=document.getElementById("sharePreview");
  if(!preview) return;
  preview.innerHTML="";
  const title=document.createElement("strong");
  title.textContent=label;
  const link=document.createElement("div");
  link.className="shareUrl";
  link.textContent=url;
  const privacy=document.createElement("div");
  privacy.className="small privacyNote";
  privacy.textContent="No account, email address, sign in, or player personal information required.";
  preview.appendChild(title);
  preview.appendChild(link);
  preview.appendChild(privacy);
}

async function copyShareUrl(label,url){
  showShareUrl(label,url);
  try{
    await navigator.clipboard.writeText(url);
  }catch(e){}
}

const sharePlayerLink=document.getElementById("sharePlayerLink");
if(sharePlayerLink){
  sharePlayerLink.addEventListener("click",()=>{
    if(!requireShareableUrl()) return;
    copyShareUrl("Player View Link",makeShareUrl("single",[currentPlay]));
  });
}

const sharePlaylistLink=document.getElementById("sharePlaylistLink");
if(sharePlaylistLink){
  sharePlaylistLink.addEventListener("click",()=>{
    if(!requireShareableUrl()) return;
    const start=currentPlay;
    const indexes=[start,start+1,start+2].filter(i=>plays[i] && plays[i].category!=="Blank");
    copyShareUrl("Practice Playlist Link",makeShareUrl("playlist",indexes));
  });
}

const shareTeamLibraryLink=document.getElementById("shareTeamLibraryLink");
if(shareTeamLibraryLink){
  shareTeamLibraryLink.addEventListener("click",()=>{
    if(!requireShareableUrl()) return;
    copyShareUrl("Team Library Link",makeShareUrl("team",[]));
  });
}

const qrCode=document.getElementById("qrCode");
if(qrCode){
  qrCode.addEventListener("click",()=>{
    const preview=document.getElementById("sharePreview");
    if(preview){
      if(!requireShareableUrl()) return;
      const url=activeShareUrl && activeShareUrl.includes("v=player")
        ? activeShareUrl
        : makeShareUrl("single",[currentPlay]);
      preview.innerHTML="";
      renderQrCode(preview,url);
      const note=document.createElement("div");
      note.className="shareUrl";
      note.textContent=url;
      preview.appendChild(note);
      const privacy=document.createElement("div");
      privacy.className="small privacyNote";
      privacy.textContent="This QR code opens the read-only Player View from your hosted app URL. No sign in or personal information required.";
      preview.appendChild(privacy);
    }
  });
}

const playerPreview=document.getElementById("playerPreview");
if(playerPreview){
  playerPreview.addEventListener("click",()=>{
    const preview=document.getElementById("sharePreview");
    if(preview){
      if(!requireShareableUrl()) return;
      showShareUrl("Player Preview",makeShareUrl("single",[currentPlay]));
    }
  });
}

function setMoveTypeForPlayer(player,type){
  const el=document.getElementById(`moveType${player}`);
  if(el) el.value=type;
}

const markPass=document.getElementById("markPass");
if(markPass){
  markPass.addEventListener("click",()=>{
    const previous=builderSteps.length ? builderSteps[builderSteps.length-1] : null;
    const passer=previous && previous.ball ? previous.ball : getBuilderBall();
    if(passer) setMoveTypeForPlayer(passer,"pass");
  });
}

const markScreen=document.getElementById("markScreen");
if(markScreen){
  markScreen.addEventListener("click",()=>{
    setMoveTypeForPlayer(getBuilderBall() || 5,"screen");
  });
}

const markShot=document.getElementById("markShot");
if(markShot){
  markShot.addEventListener("click",()=>{
    const ball=getBuilderBall();
    if(ball) setMoveTypeForPlayer(ball,"shot");
    const note=document.getElementById("builderNote");
    if(ball && note && !/shot|finish/i.test(note.value)){
      note.value=`${note.value} Finish or shot for ${ball}.`;
    }
  });
}

const previewStepBtn=document.getElementById("previewBuilderStep");
if(previewStepBtn){
  previewStepBtn.addEventListener("click",()=>{
    if(builderSteps.length<2){alert("Add at least two steps to preview movement.");return;}
    const idx=selectedBuilderStepIndex===null ? Math.max(0,builderSteps.length-2) : Math.max(0,selectedBuilderStepIndex-1);
    animateBuilderStep(idx);
  });
}

const previewPlayBtn=document.getElementById("previewBuilderPlay");
if(previewPlayBtn){
  previewPlayBtn.addEventListener("click",()=>animateBuilderPlay());
}

const stopPreviewBtn=document.getElementById("stopBuilderPreview");
if(stopPreviewBtn){
  stopPreviewBtn.addEventListener("click",()=>renderBuilder());
}

function setupPanelToggle(btnId, panelSelector, className){
  const btn=document.getElementById(btnId);
  const panel=document.querySelector(panelSelector);
  if(!btn || !panel) return;
  btn.addEventListener("click",()=>{
    panel.classList.toggle(className);
  });
}

setupPanelToggle("toggleStepsPanel","#viewer .leftRail","panelOpen");
setupPanelToggle("toggleInfoPanel","#viewer .coachCard","panelOpen");
setupPanelToggle("toggleBuilderStepsPanel","#builder .leftRail","panelOpen");
setupPanelToggle("toggleBuilderToolsPanel","#builder .builderPanel","panelOpen");

setupBuilderHelp();
setupPublicAppUrlControls();
setupCollapsibleControls();
setupDesktopRubberBand();
populateSelect();
if(playerView){
  hasSelectedPlayForView=true;
  applyPlayerViewMode();
  setupMobileDefaultChrome();
  populateLibraryList();
  render();
} else {
  setCoachMode("draw");
  setupMobileDefaultChrome();
  populateLibraryList();
}
