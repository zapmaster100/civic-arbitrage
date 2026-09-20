import {CONFIG} from './config.js';
const players=['Blue','Red','Green','Yellow'].map((name,i)=>({name,cash:CONFIG.startCash,tokens:CONFIG.tokens,owned:[],i}));
let turn=0,actions=CONFIG.actions;
const rows='ABCDEFG'.split('');
const parcels=[];
for(let r=0;r<CONFIG.height;r++)for(let c=0;c<CONFIG.width;c++)parcels.push({id:rows[r]+(c+1),r,c,owner:null,zone:'greenfield',density:0,building:null,water:r===6});
const plaza={r:1,c:4};
function value(p){let v=p.density;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{const n=parcels.find(x=>x.r===p.r+dr&&x.c===p.c+dc);if(n)v+=n.density});if(p.water)v+=p.density;return v}
function render(){
 const p=players[turn];
 document.querySelector('#app').innerHTML=`
 <header><div><h1>Civic Arbitrage</h1><p>Playas de México · v0.1 prototype</p></div><div class="turn"><b>${p.name}</b> · ${actions} actions</div></header>
 <main><section><div class="board">${parcels.map(x=>`<button class="parcel ${x.zone} ${x.water?'water':''}" data-id="${x.id}"><span>${x.id}</span>${x.r===plaza.r&&x.c===plaza.c?'<strong>PLAZA</strong>':''}${x.owner!==null?'<i>'+players[x.owner].name[0]+'</i>':''}<small>$${value(x)}</small></button>`).join('')}</div><div class="sea">PACIFIC / CARIBBEAN COAST — prototype geography</div></section>
 <aside><h2>${p.name}</h2><div class="money">Hidden cash: $<b>${p.cash}</b></div><p>Tokens available: ${p.tokens}</p><h3>Prototype actions</h3><p>Click an unowned parcel to acquire it for current land value. Click your parcel to select it.</p><button id="end">End turn</button><hr><h3>Growth</h3><p>Population 0 / Jobs 0</p><p>Thresholds: 4 → 9 → 15</p><hr><h3>Build status</h3><p>Board shell + acquisition/valuation loop active. Council, roads, zoning and market are next.</p></aside></main>`;
 document.querySelectorAll('.parcel').forEach(el=>el.onclick=()=>act(el.dataset.id));
 document.querySelector('#end').onclick=endTurn;
}
function act(id){if(actions<=0)return;const x=parcels.find(q=>q.id===id),p=players[turn];if(x.r===plaza.r&&x.c===plaza.c)return;if(x.owner===null){const cost=value(x);if(p.tokens<1||p.cash<cost)return;x.owner=turn;p.tokens--;p.cash-=cost;p.owned.push(id);actions--;render();}else if(x.owner===turn){alert(`${id} · value $${value(x)} · owned by ${p.name}\n\nSell/zoning controls are coming next.`)}}
function endTurn(){turn=(turn+1)%players.length;actions=CONFIG.actions;render()}
render();