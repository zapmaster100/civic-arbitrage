import {CONFIG} from './config.js';
const BUILD_ID='CA-0921-58';

const players=['Blue','Red','Yellow','White'].map((name,i)=>({name,cash:CONFIG.startCash,tokens:CONFIG.tokens,owned:[],i,bot:i!==2}));
let turn=0,actions=CONFIG.actions,mode='acquire',selected=null,population=0,jobs=0,setupDraft=true,draftPick=0,pendingBuilding=null,roadSegments=0,actionStart=null,pendingCouncil=null;
const draftOrder=[0,1,2,3,3,2,1,0], rows='ABCDEFG'.split('');
const parcels=[], roads=new Set(), history=[];
const gameLog=[];
const botPlans=[null,null,null,null],botFailedZones=[new Set(),new Set(),new Set(),new Set()],botLastSold=[null,null,null,null];
function logEvent(msg){gameLog.push(msg);if(gameLog.length>50)gameLog.shift();}
for(let r=0;r<CONFIG.height;r++)for(let c=0;c<CONFIG.width;c++)parcels.push({id:rows[r]+(c+1),r,c,owner:null,zone:'greenfield',density:0,building:null,water:r===6,municipal:false});
const plaza={r:1,c:5};
function seed(r,c,zone,building,municipal=false){const p=at(r,c);p.zone=zone;p.density=1;p.building=building;p.buildingUse=zone;p.buildingDensity=1;p.municipal=municipal;}
seed(0,5,'residential','Casa'); seed(2,5,'residential','Casa'); seed(1,4,'commercial','Café'); seed(1,6,'commercial','Café'); seed(1,5,'municipal','Plaza Mayor',true);
seed(6,5,'residential','Surf Shack'); // directly south of Plaza on the coast
['H:1:5','H:2:5','V:1:5','V:1:6'].forEach(k=>roads.add(k));

const defs=[['Casa','residential',1],['Café','commercial',1],['Casa','residential',1],['Apartamentos','residential',2],['Tiendas','commercial',2],['Café','commercial',1],['Casa','residential',1],['Hotel','commercial',3],['Apartamentos','residential',2],['Tiendas','commercial',2]];
let nextCardId=defs.length;
function makeCard(d){return {id:nextCardId++,name:d[0],use:d[1],density:d[2],coins:0}}
let market=defs.map((d,i)=>({id:i,name:d[0],use:d[1],density:d[2],coins:0}));
function refillDef(){return defs[Math.floor(Math.random()*defs.length)]}
function refreshMarket(){for(const start of [0,5]){const row=market.slice(start,start+5),kept=row.filter(Boolean);while(kept.length<5)kept.push(makeCard(refillDef()));for(let j=0;j<5;j++)market[start+j]=kept[j]}}

function at(r,c){return parcels.find(x=>x.r===r&&x.c===c)}
function value(p){let v=p.density;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{const n=at(p.r+dr,p.c+dc);if(n)v+=n.density});if(p.water)v+=p.density;return v}
function state(){return JSON.stringify({players,turn,actions,mode,selected,population,jobs,setupDraft,draftPick,parcels,roads:[...roads],market})}
function restore(raw){const q=JSON.parse(raw);players.splice(0,players.length,...q.players);turn=q.turn;actions=q.actions;mode=q.mode;selected=q.selected;population=q.population;jobs=q.jobs;setupDraft=q.setupDraft;draftPick=q.draftPick;parcels.splice(0,parcels.length,...q.parcels);roads.clear();q.roads.forEach(x=>roads.add(x));market=q.market;pendingBuilding=null;pendingCouncil=null;roadSegments=0}
function snap(){try{history.push(state())}catch(e){console.error('Snapshot failed',e)}}
function undo(){if(actionStart){restore(actionStart);actionStart=null;if(history.length)history.pop();render();return}if(!history.length)return;restore(history.pop());render()}
function spendAction(){actions--}
function setMode(m){if(setupDraft||actions<=0)return;actionStart=null;mode=m;selected=null;pendingBuilding=null;pendingCouncil=null;roadSegments=0;render()}
function edgeKey(r,c,side){if(side==='N')return 'H:'+r+':'+c;if(side==='S')return 'H:'+(r+1)+':'+c;if(side==='W')return 'V:'+r+':'+c;return 'V:'+r+':'+(c+1)}
function edgeConnected(key){if(!roads.size)return true;const [o,a,b]=key.split(':'),r=+a,c=+b;const ends=o==='H'?[[r,c],[r,c+1]]:[[r,c],[r+1,c]];for(const k of roads){const [oo,aa,bb]=k.split(':'),rr=+aa,cc=+bb;const ee=oo==='H'?[[rr,cc],[rr,cc+1]]:[[rr,cc],[rr+1,cc]];if(ends.some(e=>ee.some(q=>q[0]===e[0]&&q[1]===e[1])))return true}return false}
function parcelEdges(x){return ['N','W',...(x.r===CONFIG.height-1?['S']:[]),...(x.c===CONFIG.width-1?['E']:[])].map(side=>{const key=edgeKey(x.r,x.c,side),built=roads.has(key);return `<span class="parcelroad ${side} ${built?'built':mode==='road'?'available':'hiddenedge'}" data-edge="${key}" title="${built?'Road':'Build road'}"></span>`}).join('')}
const PIP_CODES={greenfield:[3],residential:{1:[1,2,3],2:[1,2,4],3:[1,4,5]},commercial:{1:[2,3,6],2:[2,4,6],3:[4,5,6]}};
function pipCode(use,density){if(use==='greenfield'||!density)return PIP_CODES.greenfield;return PIP_CODES[use]?.[density]||[]}
function pipRail(code,side){return `<span class="piprail ${side}">${[1,2,3,4,5,6].map(i=>`<i class="pippos p${i} ${code.includes(i)?'on':''}"></i>`).join('')}</span>`}
function parcelPips(x){
 if(x.municipal)return '';
 const own=pipCode(x.zone,x.density),rails=[];
 // Render each shared boundary only once: north and west sides.
 // Each boundary contains both neighbours' pip codes separated across the seam.
 const boundaries=[['N',at(x.r-1,x.c)],['W',at(x.r,x.c-1)]];
 for(const [side,n] of boundaries){
  const other=n&&!n.municipal?pipCode(n.zone,n.density):PIP_CODES.greenfield;
  rails.push(`<span class="pipboundary ${side}"><span class="piphalf other">${[1,2,3,4,5,6].map(i=>`<i class="${other.includes(i)?'on':''}"></i>`).join('')}</span><span class="piphalf own">${[1,2,3,4,5,6].map(i=>`<i class="${own.includes(i)?'on':''}"></i>`).join('')}</span></span>`);
 }
 return rails.join('')
}
function pipSupport(x,use,density){const code=pipCode(use,density);let total=0;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{const n=at(x.r+dr,x.c+dc);const nc=n&&!n.municipal?pipCode(n.zone,n.density):PIP_CODES.greenfield;total+=code.filter(p=>nc.includes(p)).length});if(x.water)total+=code.length-code.filter(p=>PIP_CODES.greenfield.includes(p)).length;return total}
function rulesContent(){return `
<h2>Civic Arbitrage — Playas de México</h2>
<p>Each player is a private developer shaping one shared growing city, but everyone is pursuing their own profit. Roads, zoning and buildings created by one player can increase the value and development potential of somebody else's land. Read where the city is going, secure the right parcels, and profit from the city your opponents create.</p>
<p>There is no visible victory-point score. Cash is hidden. At the end of the game, hidden cash plus the current value of property you still own is your total wealth. Highest wealth wins.</p>
<h3>Your Turn</h3><p>Take <b>2 actions</b>. Actions may be repeated.</p>
<h3>1. Acquire Parcel</h3>
<p>Acquire any unowned non-Municipal parcel by paying its current land value and placing an ownership token. Existing private buildings do not prevent acquisition.</p>
<p><b>Land value</b> = the parcel's own zoning value + the zoning values of its orthogonal neighbours. Low ● = $1, Medium ●● = $2, High ●●● = $3. Greenfield = $0. A waterfront edge mirrors the parcel's own zoning value. Buildings themselves add no land value.</p>
<h3>2. Sell Parcel</h3>
<p>Sell one of your parcels to the bank for its current land value and recover your ownership token. Zoning, buildings and roads remain, and the parcel becomes available to acquire again.</p>
<h3>3. Build Road</h3>
<p>Build up to <b>2 connected road segments</b> for $1 each. New roads must connect to the existing network. Roads are public and each road edge provides 1 frontage. Water does not count as frontage.</p>
<h3>4. Zone / Rezone</h3>
<p>Choose one of your parcels and propose Residential or Commercial zoning at Low ●, Medium ●● or High ●●● density.</p>
<p><b>Border support:</b> zoning tiles have six possible pip positions around their edges. Compare the proposed tile with its four orthogonal neighbours and count the pips that align. Same use + same density gives 3 matches; different use + same density gives 2; same use one density apart gives 2; different use one apart gives 1; same use two apart gives 1; different use two apart gives 0. Greenfield matches Low once and Medium/High zero times.</p>
<p>A beachfront parcel treats its ocean boundary as <b>all six pip positions</b>, so the ocean fully supports any proposed private zoning pattern on that edge.</p>
<p>Add all four borders. <b>6 or more matching pips permits the rezoning.</b> There is no Council draw or redraw.</p>
<h3>5. Take Building</h3>
<p>Choose a card from the building market. Pay $1 onto each occupied card you pass. When you take a card, you collect the subsidy already on it.</p>
<p><b>Place:</b> construct it on a legal parcel and receive the $5 building payout plus its subsidy. <b>Discard:</b> construct nothing and collect only its subsidy. Cancel before confirming to leave the market unchanged.</p>
<p>The parcel needs the correct use, sufficient zoning density and frontage. Residential frontage is 2 / 2 / 3 and Commercial is 2 / 3 / 4 for Low / Medium / High.</p>
<p>Low buildings have no neighbourhood prerequisite. Medium requires a built Low building of the opposite private use within the surrounding 8 parcels. High requires a built Medium building of the opposite private use within those 8 parcels. Redevelopment must move upward within the same use.</p>
<h3>Growth & Municipal Development</h3>
<p>Residential buildings increase Population and Commercial buildings increase Jobs by density: Low +1, Medium +2, High +3. Growth thresholds are 4 → 9 → 15 and unlock Municipal development as the city grows.</p>
<h3>End Game & Scoring</h3>
<p>The final Municipal building ends the game immediately. Add each player's hidden cash to the current land value of all property they still own. Highest total wealth wins.</p>
<p><i>Prototype note: growth restrictions and Municipal staging are not yet fully implemented in the digital version.</i></p>`}
function render(){
 const draftPlayer=setupDraft?draftOrder[Math.min(draftPick,draftOrder.length-1)]:turn;
 const p=players[draftPlayer];
 document.querySelector('#app').innerHTML=`
 <header><div><h1>Civic Arbitrage</h1><p>Playas de México · v0.1 prototype · <b>Build ${BUILD_ID}</b></p></div><div class="turn"><button id="rulesBtn" type="button">Rules</button> <span class="playerdisc p${p.i}"></span><b>${p.name}</b> · <strong>${setupDraft?`Starting draft — pick ${draftPick+1}/8`:`${actions}/2 actions`}</strong></div></header>
 <div class="actionbar ${setupDraft?'disabled':''}">${[['acquire','Acquire'],['sell','Sell'],['road','Build Road'],['zone','Zone / Rezone'],['building','Take Building']].map(([m,l])=>`<button class="${mode===m?'active':''}" data-mode="${m}">${l}</button>`).join('')}<button id="undo" class="undo" ${history.length?'':'disabled'}>↶ Undo</button></div>
 <main><section><div class="boardwrap"><div class="board">${parcels.map(x=>`<button class="parcel ${x.zone} ${x.water?'water':''} ${x.municipal?'civic':''} ${selected===x.id?'selected':''} ${pendingBuilding!==null&&legalBuild(x,market[pendingBuilding])?'legalbuild':''}" data-id="${x.id}"><span>${x.id}</span>${x.building?`<b class="building">${x.building}</b>`:''}${Number.isInteger(x.owner)?`<i class="ownerdisc p${x.owner}"></i>`:''}${x.density?`<em>${'●'.repeat(x.density)}</em>`:''}<small>${value(x)}</small>${parcelPips(x)}${!setupDraft?parcelEdges(x):''}</button>`).join('')}</div></div>
 <div class="sea">COAST — prototype geography</div>
 <div class="market"><h2>Building Market</h2>${[0,1].map(row=>`<div class="marketrow">${market.slice(row*5,row*5+5).map((c,j)=>c?`<button class="card" data-card="${row*5+j}"><b>${c.name}</b><span>${c.use}</span><strong>${'●'.repeat(c.density)}</strong><small>Subsidy ${c.coins} · Skip ${j}</small></button>`:`<div class="card card-empty" aria-label="Empty market slot"></div>`).join('')}</div>`).join('')}<div class="municipal-staging">Municipal staging — empty</div></div></section>
 <aside><h2><span class="playerdisc p${p.i}"></span>${p.name}</h2><div class="money">Hidden cash: $<b>${p.cash}</b></div><p>Tokens available: ${p.tokens}</p><h3>${setupDraft?'Starting parcel draft':'Action: '+modeLabel()}</h3><p>${setupDraft?'Choose any parcel except Municipal land. Existing private buildings may be acquired; pay $0 during the starting draft.':help()}</p>${mode==='zone'&&selected&&!pendingCouncil?zoneControls():''}${pendingCouncil?councilControls():''}${pendingBuilding!==null?buildingControls():''}${actions<=0&&!setupDraft?'<div class="noactions"><b>No more actions.</b> End your turn.</div>':''}<button id="end" ${setupDraft?'disabled':''}>${actions<=0?'End Turn':'End turn early'}</button><hr><h3>Growth</h3><p>Population ${population} / Jobs ${jobs}</p><p>Thresholds: 4 → 9 → 15</p><hr><h3>Game Log</h3><div class="gamelog">${gameLog.length?gameLog.slice().reverse().map(msg=>'<div>'+msg+'</div>').join(''):'<div>No actions yet.</div>'}</div></aside></main><div id="rulesModal" class="rulesmodal" hidden><div class="rulespanel"><button id="rulesClose" class="rulesclose" type="button">×</button>${rulesContent()}</div></div>`;
 document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));document.querySelectorAll('.parcel').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();parcelClick(el.dataset.id)}));document.querySelectorAll('.card').forEach(e=>e.onclick=()=>takeCard(+e.dataset.card));document.querySelectorAll('[data-edge]').forEach(e=>e.onclick=ev=>{ev.stopPropagation();buildRoad(e.dataset.edge)});document.querySelectorAll('[data-zone]').forEach(e=>e.onclick=()=>applyZone(e.dataset.zone,+e.dataset.density));document.querySelectorAll('[data-buildchoice]').forEach(e=>e.onclick=()=>buildingChoice(e.dataset.buildchoice));document.querySelectorAll('[data-council]').forEach(e=>e.onclick=()=>councilChoice(e.dataset.council));document.querySelector('#end').onclick=endTurn;document.querySelector('#undo').onclick=undo;document.querySelector('#rulesBtn').onclick=()=>{document.querySelector('#rulesModal').hidden=false};document.querySelector('#rulesClose').onclick=()=>{document.querySelector('#rulesModal').hidden=true};document.querySelector('#rulesModal').onclick=e=>{if(e.target.id==='rulesModal')e.currentTarget.hidden=true};
}
function modeLabel(){return {acquire:'Acquire parcel',sell:'Sell parcel',road:'Build Road',zone:'Zone / Rezone',building:'Take Building'}[mode]}
function help(){return {acquire:'Click any parcel not owned by a player. Existing private buildings do not block ownership. Municipal parcels cannot be owned. Pay current zoning/land value.',sell:'Click one of your parcels to sell it at current land value. Buildings and zoning remain.',road:'Place up to 2 connected public road segments for 1 action. Each segment costs $1. New roads must connect to the road network.',zone:'Click one of your parcels, then choose proposed zoning.',building:'Choose a card from either market row. Skip payments are automatic.'}[mode]}
function zoneControls(){const x=parcels.find(q=>q.id===selected);return `<div class="zonecontrols"><p><b>Proposed zoning — border support</b></p>${['residential','commercial'].map(z=>`<div><b>${z}</b> ${[1,2,3].map(d=>{const support=pipSupport(x,z,d);return `<button data-zone="${z}" data-density="${d}" class="${support>=6?'zonepass':'zonefail'}">${'●'.repeat(d)} · ${support}/12 ${support>=6?'✓':'×'}</button>`}).join('')}</div>`).join('')}<p class="zonerule">6+ matching border pips = permitted.</p></div>`}
function frontage(x){return ['N','S','E','W'].reduce((n,side)=>n+(roads.has(edgeKey(x.r,x.c,side))?1:0),0)}
function buildProblem(x,c){if(x.owner!==turn)return 'You do not own this parcel.';if(x.municipal)return 'Municipal land cannot take a private building.';if(x.building){const oldDensity=x.buildingDensity||1;if(c.density<=oldDensity)return `Redevelopment must increase density above the existing ${x.building} (${'●'.repeat(oldDensity)}).`;}if(x.zone!==c.use)return `Wrong zoning: this building requires ${c.use}.`;if(x.density<c.density)return `Zoning is too low: this building requires ${'●'.repeat(c.density)} density.`;if(frontage(x)<CONFIG.frontage[c.use][c.density])return `Not enough frontage: requires ${CONFIG.frontage[c.use][c.density]}, but this parcel has ${frontage(x)}.`;if(c.density>1){const needUse=c.use==='residential'?'commercial':'residential',needDensity=c.density-1;let found=false;for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const n=at(x.r+dr,x.c+dc);if(n&&n.building&&(n.buildingUse||n.zone)===needUse&&(n.buildingDensity||1)>=needDensity)found=true}if(!found)return `Missing nearby prerequisite: needs a built ${needUse} ${'●'.repeat(needDensity)} within the 8 surrounding parcels.`;}return null}
function legalBuild(x,c){return !buildProblem(x,c)}
function buildingControls(){const c=market[pendingBuilding];const legal=parcels.filter(x=>legalBuild(x,c));return `<div class="buildcontrols"><h3>Place ${c.name}</h3><p>${c.use} ${'●'.repeat(c.density)} · choose one of your parcels with matching zoning.</p><p>${legal.length?legal.map(x=>x.id).join(', ')+' highlighted on board.':'No legal parcel is currently available.'}</p><button data-buildchoice="discard">Discard for subsidy</button> <button data-buildchoice="cancel">Cancel</button></div>`}
function parcelClick(id){
 const x=parcels.find(q=>q.id===id);
 console.log('parcelClick',id,'draft',setupDraft,'pick',draftPick);
 if(setupDraft){
  const pi=draftOrder[draftPick],p=players[pi];
  if(!x)return alert('Draft error: parcel not found.');
  if(x.municipal)return alert('Municipal parcels cannot be privately owned.');
  if(Number.isInteger(x.owner))return alert('That parcel is already owned by a player.');
  snap();x.owner=pi;p.tokens=Math.max(0,p.tokens-1);if(!p.owned.includes(id))p.owned.push(id);
  logEvent(p.name+' drafted '+id);
  draftPick+=1;
  if(draftPick>=draftOrder.length){setupDraft=false;turn=0;actions=CONFIG.actions;mode='acquire';selected=null;pendingBuilding=null;}
  render();
  if(setupDraft&&players[draftOrder[draftPick]].bot)setTimeout(botDraft,350);
  else if(!setupDraft&&players[turn].bot)setTimeout(botTurn,500);
  return
 }
 if(mode==='building'&&pendingBuilding!==null){
  if(legalBuild(x,market[pendingBuilding]))return placeBuilding(x);
  return alert(buildProblem(x,market[pendingBuilding])||'That parcel is not a legal location for this building.');
 }
 if(x.municipal)return alert('Municipal parcels cannot be privately owned.');
 if(actions<=0)return;
 const p=players[turn];
 if(mode==='acquire'&&!Number.isInteger(x.owner)){
  const cost=value(x);if(p.tokens<1||p.cash<cost)return alert('Not enough cash or ownership tokens.');
  snap();x.owner=turn;p.tokens--;p.cash-=cost;p.owned.push(id);spendAction();
  logEvent(p.name+' acquired '+id+' for $'+cost);render();return
 }
 if(mode==='sell'&&x.owner===turn){
  const sale=value(x);snap();p.cash+=sale;p.tokens++;p.owned=p.owned.filter(q=>q!==id);x.owner=null;spendAction();
  logEvent(p.name+' sold '+id+' for $'+sale);render();return
 }
 if(mode==='zone'&&x.owner===turn){selected=id;render()}
}
function buildRoad(key){
 if(mode!=='road'||setupDraft||roads.has(key)||roadSegments>=2||(actions<=0&&roadSegments===0))return;
 const p=players[turn];
 if(p.cash<CONFIG.roadCost)return alert('Not enough cash.');
 if(!edgeConnected(key))return alert('New road must connect to the existing road network.');
 if(roadSegments===0){actionStart=state();history.push(actionStart);spendAction()}
 p.cash-=CONFIG.roadCost;roads.add(key);roadSegments++;
 logEvent(p.name+' built road '+key+' for $'+CONFIG.roadCost);
 if(roadSegments>=2)actionStart=null;
 render()
}
function councilOdds(x,use,density){let yes=0;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{const n=at(x.r+dr,x.c+dc),nd=n?n.density:0,nu=n?n.zone:'greenfield',diff=Math.abs(density-nd);yes+=diff===0?2:diff===1?1:0;yes+=nu===use?1:0});return yes}
function applyZone(use,density){const x=parcels.find(q=>q.id===selected);if(!x)return;const support=pipSupport(x,use,density);if(support<6)return alert('Not permitted: '+support+'/12 border support. 6 is required.');snap();x.zone=use;x.density=density;spendAction();logEvent(players[turn].name+' rezoned '+x.id+' to '+use+' '+('●'.repeat(density))+' — '+support+'/12 border support');selected=null;pendingCouncil=null;actionStart=null;render()}
function councilControls(){return ''}
function takeCard(i){if(mode!=='building'||actions<=0||setupDraft||pendingBuilding!==null)return;const p=players[turn],rowStart=i<5?0:5,pos=i-rowStart;if(p.cash<pos)return alert('Not enough cash to pay the market skip cost.');pendingBuilding=i;render()}
function commitMarket(i){const p=players[turn],rowStart=i<5?0:5,pos=i-rowStart,c=market[i];snap();for(let j=rowStart;j<i;j++)if(market[j])market[j].coins++;p.cash-=pos;p.cash+=c.coins;market[i]=null;return c}
function placeBuilding(x){
 const i=pendingBuilding,c=commitMarket(i),p=players[turn],subsidy=c.coins;
 if(x.building)x.building=null;
 x.building=c.name;x.buildingUse=c.use;x.buildingDensity=c.density;p.cash+=CONFIG.buildPayout;
 if(c.use==='residential')population+=c.density;else if(c.use==='commercial')jobs+=c.density;
 logEvent(p.name+' built '+c.name+' on '+x.id+' (+$'+CONFIG.buildPayout+(subsidy?' + $'+subsidy+' subsidy':'')+')');
 c.coins=0;pendingBuilding=null;spendAction();render()
}
function buildingChoice(choice){
 if(pendingBuilding===null)return;
 if(choice==='cancel'){pendingBuilding=null;render();return}
 if(choice==='discard'){
  const i=pendingBuilding,card=market[i],subsidy=card.coins,c=commitMarket(i);
  logEvent(players[turn].name+' discarded '+c.name+' for $'+subsidy+' subsidy');
  c.coins=0;pendingBuilding=null;spendAction();render()
 }
}
function endTurn(){
 if(setupDraft)return;
 botPlans[turn]=null;botFailedZones[turn].clear();botLastSold[turn]=null;
 const ending=players[turn].name;
 if(actionStart)actionStart=null;
 snap();pendingCouncil=null;roadSegments=0;refreshMarket();turn=(turn+1)%players.length;actions=CONFIG.actions;mode='acquire';selected=null;pendingBuilding=null;
 logEvent(ending+' ended turn → '+players[turn].name);
 render();
 if(players[turn].bot)setTimeout(botTurn,500)
}

function botScoreParcel(x,pi){
 let score=value(x)*3+(x.water?4:0);
 for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
  if(!dr&&!dc)continue;
  const n=at(x.r+dr,x.c+dc);if(n&&n.building)score+=2
 }
 if(pi===0)score+=value(x)*2+(x.water?3:0);
 return score+Math.random()
}
function botDraft(){
 if(!setupDraft)return;
 const pi=draftOrder[draftPick];if(!players[pi].bot)return;
 const choices=parcels.filter(x=>!x.municipal&&!Number.isInteger(x.owner)).sort((a,b)=>botScoreParcel(b,pi)-botScoreParcel(a,pi));
 if(!choices.length)return;
 parcelClick(choices[0].id);
 if(setupDraft&&players[draftOrder[draftPick]].bot)setTimeout(botDraft,350);
 else if(!setupDraft&&players[turn].bot)setTimeout(botTurn,500)
}
function botBuild(pi){
 let best=null;
 market.forEach((c,i)=>{
  if(!c)return;
  const cost=i-(i<5?0:5);if(players[pi].cash<cost)return;
  parcels.forEach(x=>{
   if(x.owner!==pi)return;
   const oldTurn=turn;turn=pi;const ok=legalBuild(x,c);turn=oldTurn;
   if(ok){const score=CONFIG.buildPayout+c.coins-cost+c.density*2;if(!best||score>best.score)best={i,x,score}}
  })
 });
 if(!best)return false;
 mode='building';pendingBuilding=best.i;placeBuilding(best.x);return true
}
function botPlanKey(x,use,density){return x.id+'|'+use+'|'+density}
function chooseBotPlan(pi){
 const p=players[pi];let best=null;
 market.forEach((c,i)=>{
  if(!c)return;
  const skip=i-(i<5?0:5);if(p.cash<skip)return;
  parcels.filter(x=>x.owner===pi&&!x.municipal).forEach(x=>{
   if(x.building){
    const oldUse=x.buildingUse||x.zone,oldDensity=x.buildingDensity||1;
    if(c.use!==oldUse||c.density<=oldDensity)return;
   }
   if(botFailedZones[pi].has(botPlanKey(x,c.use,c.density)))return;
   // Higher-density buildings still need their opposite-use neighbour prerequisite.
   if(c.density>1){
    const needUse=c.use==='residential'?'commercial':'residential',needDensity=c.density-1;
    let found=false;
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
     if(!dr&&!dc)continue;const n=at(x.r+dr,x.c+dc);
     if(n&&n.building&&(n.buildingUse||n.zone)===needUse&&(n.buildingDensity||1)>=needDensity)found=true
    }
    if(!found)return;
   }
   const roadNeed=Math.max(0,CONFIG.frontage[c.use][c.density]-frontage(x));
   const zoneNeeded=x.zone!==c.use||x.density<c.density;
   const yes=zoneNeeded?pipSupport(x,c.use,c.density):12;
   if(zoneNeeded&&yes<6)return;
   const score=CONFIG.buildPayout+c.coins-skip+c.density*3-roadNeed*CONFIG.roadCost+(pi===0?value(x):0);
   if(!best||score>best.score)best={parcelId:x.id,cardId:c.id,use:c.use,density:c.density,score}
  })
 });
 botPlans[pi]=best;return best
}
function getBotPlanCard(plan){return market.find((c)=>c&&c.id===plan.cardId)}
function botBuildPlan(pi,plan){
 const x=parcels.find(q=>q.id===plan.parcelId),c=getBotPlanCard(plan);
 if(!x||!c)return false;
 const oldTurn=turn;turn=pi;const ok=legalBuild(x,c);turn=oldTurn;
 if(!ok)return false;
 const i=market.indexOf(c);mode='building';pendingBuilding=i;placeBuilding(x);botPlans[pi]=null;return true
}
function botZonePlan(pi,plan){
 const x=parcels.find(q=>q.id===plan.parcelId),c=getBotPlanCard(plan);
 if(!x||!c)return false;
 if(x.zone===plan.use&&x.density>=plan.density)return false;
 // Only ask Council once the planned building would be legal after the zoning change.
 const oldTurn=turn,oldZone=x.zone,oldDensity=x.density;
 turn=pi;x.zone=plan.use;x.density=plan.density;
 const buildable=legalBuild(x,c);
 x.zone=oldZone;x.density=oldDensity;turn=oldTurn;
 if(!buildable)return false;
 const support=pipSupport(x,plan.use,plan.density);if(support<6)return false;
 snap();x.zone=plan.use;x.density=plan.density;
 logEvent(players[pi].name+' rezoned '+x.id+' to '+plan.use+' '+('●'.repeat(plan.density))+' — '+support+'/12 border support');
 spendAction();render();return true
}
function botRoadPlan(pi,plan){
 const p=players[pi],x=parcels.find(q=>q.id===plan.parcelId);
 if(!x||p.cash<CONFIG.roadCost)return false;
 const target=CONFIG.frontage[plan.use][plan.density];
 if(frontage(x)>=target)return false;
 function edges(){
  return ['N','S','W','E'].map(side=>edgeKey(x.r,x.c,side))
   .filter(key=>!roads.has(key)&&edgeConnected(key))
 }
 let e=edges();if(!e.length)return false;
 mode='road';roadSegments=0;buildRoad(e[0]);
 // Second segment is used only while THIS planned parcel still needs frontage.
 if(roadSegments===1&&p.cash>=CONFIG.roadCost&&frontage(x)<target){
  e=edges();if(e.length)buildRoad(e[0])
 }
 return true
}
function botDiscard(pi){
 let best=-1,bestCoins=0;
 market.forEach((c,i)=>{if(!c)return;const skip=i-(i<5?0:5);if(c.coins-skip>bestCoins&&players[pi].cash>=skip){best=i;bestCoins=c.coins-skip}});
 if(best<0)return false;
 mode='building';pendingBuilding=best;buildingChoice('discard');return true
}
function botRoadTowardOwned(pi){
 const p=players[pi];if(p.cash<CONFIG.roadCost)return false;
 const targets=parcels.filter(x=>x.owner===pi&&!x.municipal&&frontage(x)===0);
 if(!targets.length)return false;
 let best=null;
 for(const x of targets){
  for(let r=0;r<=CONFIG.height;r++)for(let c=0;c<CONFIG.width;c++){
   for(const o of ['H','V']){
    if(o==='H'&&c>=CONFIG.width)continue;
    if(o==='V'&&r>=CONFIG.height)continue;
    const key=o+':'+r+':'+c;if(roads.has(key)||!edgeConnected(key))continue;
    const [_,aa,bb]=key.split(':'),rr=+aa,cc=+bb;
    const ends=o==='H'?[[rr,cc],[rr,cc+1]]:[[rr,cc],[rr+1,cc]];
    const dist=Math.min(...ends.map(e=>Math.abs(e[0]-x.r)+Math.abs(e[1]-x.c)));
    if(!best||dist<best.dist)best={key,dist,target:x}
   }
  }
 }
 if(!best)return false;
 mode='road';roadSegments=0;buildRoad(best.key);
 // Continue the same road action toward the stranded ownership token.
 if(roadSegments===1&&p.cash>=CONFIG.roadCost&&frontage(best.target)===0){
  let next=null;
  for(let r=0;r<=CONFIG.height;r++)for(let c=0;c<=CONFIG.width;c++)for(const o of ['H','V']){
   if(o==='H'&&c>=CONFIG.width)continue;if(o==='V'&&r>=CONFIG.height)continue;
   const key=o+':'+r+':'+c;if(roads.has(key)||!edgeConnected(key))continue;
   const [_,aa,bb]=key.split(':'),rr=+aa,cc=+bb;
   const ends=o==='H'?[[rr,cc],[rr,cc+1]]:[[rr,cc],[rr+1,cc]];
   const dist=Math.min(...ends.map(e=>Math.abs(e[0]-best.target.r)+Math.abs(e[1]-best.target.c)));
   if(!next||dist<next.dist)next={key,dist}
  }
  if(next)buildRoad(next.key)
 }
 return true
}
function botAcquire(pi){
 const p=players[pi];if(p.tokens<1)return false;
 let choices=parcels.filter(x=>!x.municipal&&!Number.isInteger(x.owner)&&value(x)<=p.cash&&x.id!==botLastSold[pi]);
 if(!choices.length)return false;
 // Prefer fresh land first, then zoned parcels that do not already contain a private building.
 // Buying an already-built parcel is only a fallback when there is no better land to develop.
 const tier=x=>x.zone==='greenfield'&&!x.building?2:(!x.building?1:0);
 choices.sort((a,b)=>tier(b)-tier(a)||botScoreParcel(b,pi)-botScoreParcel(a,pi));
 mode='acquire';parcelClick(choices[0].id);return true
}
function botSell(pi){
 const owned=parcels.filter(x=>x.owner===pi);if(!owned.length)return false;
 owned.sort((a,b)=>value(b)-value(a));const sold=owned[0];botLastSold[pi]=sold.id;mode='sell';parcelClick(sold.id);return true
}
function botAct(){
 const pi=turn;
 let plan=botPlans[pi];
 if(plan&&!getBotPlanCard(plan))plan=botPlans[pi]=null;
 if(!plan)plan=chooseBotPlan(pi);
 if(plan){
  if(botBuildPlan(pi,plan))return true;
  if(botRoadPlan(pi,plan))return true;
  if(botZonePlan(pi,plan))return true;
  // Plan became impossible; abandon it rather than wasting the turn.
  botPlans[pi]=null;
 }
 // If normal development is blocked, infrastructure should grow toward
 // ownership tokens that are stranded away from the road network.
 if(botRoadTowardOwned(pi))return true;
 // If a token is still available, claim land rather than ending an empty turn.
 if(botAcquire(pi))return true;
 // A profitable discard is useful if it can raise cash.
 if(botDiscard(pi))return true;
 // If every productive option is blocked, do not silently pass while holding assets.
 // Liquidate a holding to free cash/token capacity, then use the next action/turn
 // to redeploy. This is deliberately the last resort so bots do not churn land.
 if(players[pi].owned.length&&botSell(pi))return true;
 return false
}
function botTurn(){
 if(setupDraft||!players[turn].bot)return;
 let guard=0;
 function step(){
  if(!players[turn].bot)return;
  if(actions<=0||guard++>3){endTurn();return}
  const before=actions;
  if(!botAct()||actions===before){endTurn();return}
  setTimeout(step,450)
 }
 step()
}
render();
if(setupDraft&&players[draftOrder[draftPick]].bot)setTimeout(botDraft,400);
