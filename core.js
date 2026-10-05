"use strict";
(function(root){
 const scoreBid=(bid,tricks)=>bid===tricks?20+10*bid:-10*Math.abs(bid-tricks);
 const maxRounds=g=>Math.floor(60/g.players.length);
 function totals(g){const m=new Map(g.players.map(p=>[p.id,0]));g.rounds.forEach(r=>r.results.forEach(v=>m.set(v.playerId,m.get(v.playerId)+v.score)));return g.players.map(p=>({...p,score:m.get(p.id)}));}
 function stats(g){const m=new Map(g.players.map(p=>[p.id,{b:0,t:0,h:0,w:0}]));g.rounds.forEach(r=>{const top=Math.max(...r.results.map(v=>v.score));r.results.forEach(v=>{const a=m.get(v.playerId);a.b+=v.bid;a.t+=v.tricks;a.h+=Number(v.bid===v.tricks);a.w+=Number(v.score===top);});});const n=g.rounds.length;return totals(g).map(p=>{const a=m.get(p.id);return {...p,avgBid:n?a.b/n:0,avgTricks:n?a.t/n:0,hitRate:n?a.h/n:0,winRate:n?a.w/n:0};}).sort((a,b)=>b.score-a.score);}
 function timeline(g){const m=new Map(g.players.map(p=>[p.id,0]));return g.rounds.map((r,i)=>{r.results.forEach(v=>m.set(v.playerId,m.get(v.playerId)+v.score));return {round:i+1,scores:g.players.map(p=>({id:p.id,score:m.get(p.id)}))};});}
 function validate(value){
  if(!Array.isArray(value)||value.length>2000)throw Error('games');const gids=new Set();
  return value.map(g=>{
   if(!g||typeof g.id!=='string'||!g.id||gids.has(g.id)||typeof g.name!=='string'||!['active','complete'].includes(g.status)||!Array.isArray(g.players)||g.players.length<3||g.players.length>6||!Array.isArray(g.rounds)||g.rounds.length>maxRounds(g)||typeof g.createdAt!=='string'||!Number.isFinite(Date.parse(g.createdAt))||(g.completedAt!==null&&(typeof g.completedAt!=='string'||!Number.isFinite(Date.parse(g.completedAt)))))throw Error('game');
   gids.add(g.id);const ids=new Set();const players=g.players.map(p=>{if(!p||typeof p.id!=='string'||!p.id||ids.has(p.id)||typeof p.name!=='string'||!p.name.trim())throw Error('player');ids.add(p.id);return {id:p.id,name:p.name};});
   const rounds=g.rounds.map((r,i)=>{if(!r||r.cards!==i+1||!Array.isArray(r.results)||r.results.length!==players.length||typeof r.playedAt!=='string'||!Number.isFinite(Date.parse(r.playedAt)))throw Error('round');const seen=new Set();const results=r.results.map(v=>{if(!v||!ids.has(v.playerId)||seen.has(v.playerId)||!Number.isInteger(v.bid)||!Number.isInteger(v.tricks)||v.bid<0||v.tricks<0||v.bid>r.cards||v.tricks>r.cards||v.score!==scoreBid(v.bid,v.tricks))throw Error('result');seen.add(v.playerId);return {playerId:v.playerId,bid:v.bid,tricks:v.tricks,score:v.score};});if(results.reduce((s,v)=>s+v.tricks,0)!==r.cards||results.reduce((s,v)=>s+v.bid,0)===r.cards)throw Error('totals');return {cards:r.cards,playedAt:r.playedAt,results};});
   return {id:g.id,name:g.name,createdAt:g.createdAt,completedAt:g.completedAt,status:g.status,players,rounds};
  });
 }
 const API={scoreBid,maxRounds,totals,stats,timeline,validate};if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.WizardCore=API;
})(typeof window!=='undefined'?window:globalThis);
