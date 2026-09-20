import {CONFIG} from './config.js';

const players=['Blue','Red','Green','Yellow'].map((name,i)=>({name,cash:CONFIG.startCash,tokens:CONFIG.tokens,owned:[],i}));
let turn=0, actions=CONFIG.actions, mode='acquire', selected=null, population=0, jobs=0;
let setupDraft=true, draftPick=0;
const draftOrder=[0,1,2,3,3,2,1,0];
const rows='ABCDEFG'.split('');
const parcels=[];
for(let r=0;r<CONFIG.height;r++)for(let c=0;c<CONFIG.width;c++)parcels.push({id:rows[r]+(c+1),r,c,owner:null,zone:'greenfield',density:0,building:null,water:r===6});
const plaza={r:1,c:5};
function seedNeutral(r,c,zone,building){const p=parcels.find(x=>x.r===r&&x.c===c);p.zone=zone;p.density=1;p.building=building;p.owner='neutral';}
seedNeutral(0,5,'residential','Casa'); seedNeutral(2,5,'residential','Casa'); seedNeutral(1,4,'commercial','Café'); seedNeutral(1,6,'commercial','Café'); seedNeutral(6,10,'residential','Surf Shack');

const defs=[
 ['Casa','residential',1],['Café','commercial',1],['Casa','residential',1],['Apartamentos','residential',2],['Tiendas','commercial',2],
 ['Café','commercial',1],['Casa','residential',1],['Hotel','commercial',3],['Apartamentos','residential',2],['Tiendas','commercial',2]
];
let market=defs.map((d,i)=>({id:i,name:d[0],use:d[1],density:d[2],coins:0}));

function value(p){let v=p.density;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{const n=parcels.find(x=>x.r===p.r+dr&&x.c===p.c+dc);if(n)v+=n.density});if(p.water)v+=p.density;return v}
function spendAction(){actions--;}
function setMode(m){if(setupDraft)return;mode=m;selected=null;render()}
function render(){
 const p=players[setupDraft?draftOrder[draftPick]:turn];
 document.querySelector('#app').innerHTML=`
 <header><div><h1>Civic Arbitrage</h1><p>Playas de México · v0.1 prototype</p></div><div class="turn"><span class="playerdisc p${p.i}"></span><b>${p.name}</b> · <strong>${setupDraft?`Starting draft — pick ${draftPick+1}/8`:`${actions}/2 actions`}</strong></div></header>
 <div class="actionbar">${[['acquire','Acquire'],['sell','Sell'],['road','Build Road'],['zone','Zone / Rezone'],['building','Take Building']].map(([m,l])=>`<button class="${mode===m?'active':''}" data-mode="${m}">${l}</button>`).join('')}</div>
 <main><section>
 <div class="board">${parcels.map(x=>`<button class="parcel ${x.zone} ${x.water?'water':''} ${selected===x.id?'selected':''}" data-id="${x.id}"><span>${x.id}</span>${x.r===plaza.r&&x.c===plaza.c?'<strong>PLAZA</strong>':''}${x.building?'<b class="building">'+x.building+'</b>':''}${Number.isInteger(x.owner)?'<i class="ownerdisc p'+x.owner+'"></i>':''}${x.density?'<em>'+('●'.repeat(x.density))+'</em>':''}<small>$${value(x)}</small></button>`).join('')}</div>
 <div class="sea">COAST — prototype geography</div>
 <div class="market"><h2>Building Market</h2>${[0,1].map(row=>`<div class="marketrow">${market.slice(row*5,row*5+5).map((c,j)=>`<button class="card" data-card="${row*5+j}"><b>${c.name}</b><span>${c.use}</span><strong>${'●'.repeat(c.density)}</strong><small>Subsidy $${c.coins} · Skip $${j}</small></button>`).join('')}</div>`).join('')}<div class="municipal">Municipal staging — empty</div></div>
 </section>
 <aside><h2><span class="playerdisc p${p.i}"></span>${p.name}</h2><div class="money">Hidden cash: $<b>${p.cash}</b></div><p>Tokens available: ${p.tokens}</p><h3>Action: ${modeLabel()}</h3><p>${help()}</p>${mode==='zone'&&selected?zoneControls():''}<button id="end">End turn early</button><hr><h3>Growth</h3><p>Population ${population} / Jobs ${jobs}</p><p>Thresholds: 4 → 9 → 15</p></aside></main>`;
 document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
 document.querySelectorAll('.parcel').forEach(el=>el.onclick=()=>parcelClick(el.dataset.id));
 document.querySelectorAll('.card').forEach(el=>el.onclick=()=>takeCard(+el.dataset.card));
 document.querySelector('#end').onclick=endTurn;
 document.querySelectorAll('[data-zone]').forEach(el=>el.onclick=()=>applyZone(el.dataset.zone,+el.dataset.density));
}
function modeLabel(){return {acquire:'Acquire parcel',sell:'Sell parcel',road:'Build Road',zone:'Zone / Rezone',building:'Take Building'}[mode]}
function help(){return {acquire:'Click any unowned parcel. Pay its current land value.',sell:'Click one of your parcels to sell it at current land value.',road:'Road edge placement UI is the next implementation step.',zone:'Click one of your parcels, then choose proposed zoning.',building:'Choose a card from either market row. Skip payments are applied automatically.'}[mode]}
function zoneControls(){return `<div class="zonecontrols">${['residential','commercial','municipal'].map(z=>`<div><b>${z}</b> ${[1,2,3].map(d=>`<button data-zone="${z}" data-density="${d}">${'●'.repeat(d)}</button>`).join('')}</div>`).join('')}</div>`}
function parcelClick(id){const x=parcels.find(q=>q.id===id);if(x.r===plaza.r&&x.c===plaza.c)return;
 if(setupDraft){const pi=draftOrder[draftPick],p=players[pi];if(x.owner!==null)return alert('Choose an unowned parcel.');x.owner=pi;p.tokens--;p.owned.push(id);draftPick++;if(draftPick>=draftOrder.length){setupDraft=false;turn=0;actions=CONFIG.actions;}render();return;}
 if(actions<=0)return;const p=players[turn];
 if(mode==='acquire'&&x.owner===null){const cost=value(x);if(p.tokens<1||p.cash<cost)return alert('Not enough cash or ownership tokens.');x.owner=turn;p.tokens--;p.cash-=cost;p.owned.push(id);spendAction();render();return}
 if(mode==='sell'&&x.owner===turn){p.cash+=value(x);p.tokens++;p.owned=p.owned.filter(q=>q!==id);x.owner=null;spendAction();render();return}
 if(mode==='zone'&&x.owner===turn){selected=id;render();return}
 if(mode==='road')alert('Road edge placement is not active yet — this button is now part of the five-action interface.');
}
function councilOdds(x,use,density){let yes=0;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{const n=parcels.find(p=>p.r===x.r+dr&&p.c===x.c+dc);const nd=n?n.density:0, nu=n?n.zone:'greenfield';const diff=Math.abs(density-nd);yes+=diff===0?2:diff===1?1:0;yes+=nu===use?1:0});return yes}
function applyZone(use,density){const x=parcels.find(q=>q.id===selected);if(!x)return;const yes=councilOdds(x,use,density);let bag=Array(yes).fill(1).concat(Array(12-yes).fill(0));for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}const draw=bag.slice(0,7).reduce((a,b)=>a+b,0);if(draw>=4){x.zone=use;x.density=density;alert(`Council PASSED: ${draw} Yes / ${7-draw} No\nBag: ${yes} Yes / ${12-yes} No`);spendAction();selected=null;render()}else{alert(`Council FAILED: ${draw} Yes / ${7-draw} No\nBag: ${yes} Yes / ${12-yes} No\nPaid redraw UI comes next.`)}}
function takeCard(i){if(mode!=='building'||actions<=0)return;const p=players[turn],rowStart=i<5?0:5,pos=i-rowStart,c=market[i];if(p.cash<pos)return alert('Not enough cash to pay skip costs.');for(let j=rowStart;j<i;j++)market[j].coins++;p.cash-=pos;p.cash+=c.coins;alert(`Took ${c.name}. Market subsidy collected: $${c.coins}.\n\nParcel placement/build legality is the next implementation step; for now this card is discarded.`);c.coins=0;spendAction();render()}
function endTurn(){turn=(turn+1)%players.length;actions=CONFIG.actions;mode='acquire';selected=null;render()}
render();