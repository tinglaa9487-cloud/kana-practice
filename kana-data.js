/* Modern basic kana: 46 readings, two scripts. */
const ROWS=[['あ','あいうえお','アイウエオ','a i u e o'],['か','かきくけこ','カキクケコ','ka ki ku ke ko'],['さ','さしすせそ','サシスセソ','sa shi su se so'],['た','たちつてと','タチツテト','ta chi tsu te to'],['な','なにぬねの','ナニヌネノ','na ni nu ne no'],['は','はひふへほ','ハヒフヘホ','ha hi fu he ho'],['ま','まみむめも','マミムメモ','ma mi mu me mo'],['や','やゆよ','ヤユヨ','ya yu yo'],['ら','らりるれろ','ラリルレロ','ra ri ru re ro'],['わ','わをん','ワヲン','wa wo n']];
const ALIASES={shi:['si'],chi:['ti'],tsu:['tu'],fu:['hu']};
const KANA=ROWS.flatMap(([row,h,k,r])=>r.split(' ').map((romaji,i)=>({row,hira:h[i],kata:k[i],romaji,aliases:ALIASES[romaji]||[],audio:h[i]})));
function makeQuestions(rows,type){return KANA.filter(k=>rows.includes(k.row)).flatMap(k=>(type==='mixed'?['hira','kata']:[type]).map(script=>({...k,script,char:k[script],id:script+':'+k.romaji})));}
function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function accepts(k,value){return [k.romaji,...k.aliases].includes(value.trim().toLowerCase());}
function choices(k){return shuffled([k.romaji,...shuffled(KANA.map(x=>x.romaji).filter(r=>r!==k.romaji)).slice(0,3)]);}
