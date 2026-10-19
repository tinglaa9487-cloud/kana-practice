const STORE_KEY='kana-days-v1';
const fresh=()=>({stats:{},wrong:{},total:0,correct:0,settings:{type:'hira',mode:'learn',random:false,auto:false,rate:1,remove:true}});
let db=fresh();try{const saved=JSON.parse(localStorage.getItem(STORE_KEY));if(saved&&saved.stats&&saved.wrong&&saved.settings){db={...db,...saved,settings:{...db.settings,...saved.settings}};}}catch(e){}
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(db));}catch(e){notify('無法儲存紀錄，請確認瀏覽器允許本機儲存。');}}
function statKey(rows,type,mode){return type+'|'+[...rows].sort().join(',')+'|'+mode;}
function statsFor(rows,type){const a=Object.entries(db.stats).filter(([key])=>key.startsWith(type+'|'+[...rows].sort().join(',')+'|')).map(([,s])=>s);return {count:a.reduce((n,s)=>n+s.count,0),best:a.reduce((n,s)=>Math.max(n,s.best??0),0)};}
