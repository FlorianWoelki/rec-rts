var e=Object.defineProperty,t=("undefined"!=typeof require&&require,(t,i,r)=>(((t,i,r)=>{i in t?e(t,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[i]=r})(t,"symbol"!=typeof i?i+"":i,r),r));!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const i of e)if("childList"===i.type)for(const e of i.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var i="data:image/png;base64,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";class r{constructor(e,i,r){t(this,"w"),t(this,"h"),t(this,"values"),this.w=e,this.h=i,this.values=new Array(e*i);for(let t=0;t<i;t+=r)for(let i=0;i<e;i+=r)this.setSample(i,t,2*Math.random()-1);let s=r,A=1/e,l=1;do{const t=s/2;for(let r=0;r<i;r+=s)for(let i=0;i<e;i+=s){const e=(this.sample(i,r)+this.sample(i+s,r)+this.sample(i,r+s)+this.sample(i+s,r+s))/4+(2*Math.random()-1)*s*A;this.setSample(i+t,r+t,e)}for(let i=0;i<e;i+=s)for(let r=0;r<e;r+=s){const e=this.sample(r,i),l=this.sample(r+s,i),n=this.sample(r,i+s),d=this.sample(r+t,i+t),a=this.sample(r+t,i-t),o=this.sample(r-t,i+t),h=(e+l+d+a)/4+(2*Math.random()-1)*s*A*.5,g=(e+n+d+o)/4+(2*Math.random()-1)*s*A*.5;this.setSample(r+t,i,h),this.setSample(r,i+t,g)}s/=2,A*=l+.8,l*=.3}while(s>1)}sample(e,t){return this.values[(e&this.w-1)+(t&this.h-1)*this.w]}setSample(e,t,i){this.values[(e&this.w-1)+(t&this.h-1)*this.w]=i}}const s=(e,t)=>{const i=new r(e,t,16),s=new r(e,t,16),A=new r(e,t,16),l=new r(e,t,32),n=new r(e,t,32),a=new Array(e*t),o=new Array(e*t);for(let r=0;r<t;r++)for(let o=0;o<e;o++){const h=o+r*e;let g=3*Math.abs(l.values[h]-n.values[h])-2,c=Math.abs(i.values[h]-s.values[h]);c=3*Math.abs(c-A.values[h])-2;let w=o/(e-1)*2-1,m=r/(t-1)*2-1;w<0&&(w=-w),m<0&&(m=-m);let f=w>=m?w:m;f*=f*f*f,f*=f*f*f,g=g+1-20*f,a[h]=g<-.5?d.water.id:g>.5&&c<.5?d.rock.id:d.grass.id}for(let r=0;r<e*t/2800;r++){let i=Math.round(Math.random()*e),r=Math.round(Math.random()*t);for(let s=0;s<10;s++){let s=i+Math.round(21*Math.random()-10),A=r+Math.round(21*Math.random()-10);for(let i=0;i<100;i++){let i=s+Math.round(5*Math.random())-Math.round(5*Math.random()),r=A+Math.round(5*Math.random())-Math.round(5*Math.random());for(let s=r-1;s<=r+1;s++)for(let r=i-1;r<=i+1;r++)r>=0&&s>=0&&r<e&&s<t&&1==a[r+s*e]&&(a[r+s*e]=d.sand.id)}}}for(let r=0;r<e*t/400;r++){const i=Math.round(Math.random()*e),r=Math.round(Math.random()*t);for(let s=0;s<200;s++){const s=i+Math.round(15*Math.random())-Math.round(15*Math.random()),A=r+Math.round(15*Math.random())-Math.round(15*Math.random());s>=0&&A>=0&&s<e&&A<t&&a[s+A*e]==d.grass.id&&(a[s+A*e]=d.tree.id)}}let h=-1,g=-1;for(;-1===h||-1===g;){h=Math.round(Math.random()*e),g=Math.round(Math.random()*t);e:for(let t=g-1;t<=g+1;t++)for(let i=h-1;i<=h+1;i++)if(a[i+t*e]===d.water.id||a[i+t*e]===d.rock.id||a[i+t*e]===d.tree.id){h=-1,g=-1;break e}}return a[h+g*e]=d.startingPosition.id,[a,o]},A={wood:{imageX:0,imageY:11},stone:{imageX:1,imageY:11}};class l{constructor(e){t(this,"id"),t(this,"isFarmable",!1),t(this,"isPassable",!0),this.id=e}getOutcome(){}}class n extends l{render(e,t,i,r,s,A){const l=e.getTile(i,r-1).id===this.id||e.getTile(i,r-1).id===d.tree.id,n=e.getTile(i,r+1).id===this.id||e.getTile(i,r+1).id===d.tree.id,a=e.getTile(i-1,r).id===this.id||e.getTile(i-1,r).id===d.tree.id,o=e.getTile(i+1,r).id===this.id||e.getTile(i+1,r).id===d.tree.id,h=e.getTile(i-1,r-1).id===this.id||e.getTile(i-1,r-1).id===d.tree.id,g=e.getTile(i+1,r-1).id===this.id||e.getTile(i+1,r-1).id===d.tree.id,c=e.getTile(i-1,r+1).id===this.id||e.getTile(i-1,r+1).id===d.tree.id,w=e.getTile(i+1,r+1).id===this.id||e.getTile(i+1,r+1).id===d.tree.id;l||a?l&&a&&!h?e.renderTile(t,32,32,i,r,s,A):e.renderTile(t,a?8:0,l?32:24,i,r,s,A):e.renderTile(t,0,24,i,r,s,A),l||o?l&&o&&!g?e.renderTile(t,24,32,i,r,s+8,A):e.renderTile(t,o?8:16,l?32:24,i,r,s+8,A):e.renderTile(t,16,24,i,r,s+8,A),n||a?n&&a&&!c?e.renderTile(t,32,24,i,r,s,A+8):e.renderTile(t,a?8:0,n?32:40,i,r,s,A+8):e.renderTile(t,0,40,i,r,s,A+8),n||o?n&&o&&!w?e.renderTile(t,24,24,i,r,s+8,A+8):e.renderTile(t,o?8:16,n?32:40,i,r,s+8,A+8):e.renderTile(t,16,40,i,r,s+8,A+8)}}const d={water:new class extends l{constructor(e){super(e),this.isPassable=!1}render(e,t,i,r,s,A){const l=e.getTile(i,r-1).id===this.id,n=e.getTile(i,r+1).id===this.id,d=e.getTile(i-1,r).id===this.id,a=e.getTile(i+1,r).id===this.id,o=e.getTile(i-1,r-1).id===this.id,h=e.getTile(i+1,r-1).id===this.id;l||d?l&&d&&!o?e.renderTile(t,32,8,i,r,s,A):e.renderTile(t,d?8:0,l?8:0,i,r,s,A):e.renderTile(t,0,0,i,r,s,A),l||a?l&&a&&!h?e.renderTile(t,24,8,i,r,s+8,A):e.renderTile(t,a?8:16,l?8:0,i,r,s+8,A):e.renderTile(t,16,0,i,r,s+8,A),n||d?e.renderTile(t,d?8:0,n?8:16,i,r,s,A+8):e.renderTile(t,0,16,i,r,s,A+8),n||a?e.renderTile(t,a?8:16,n?8:16,i,r,s+8,A+8):e.renderTile(t,16,16,i,r,s+8,A+8),l&&!d&&o&&e.renderTile(t,32,0,i,r,s,A-8),l&&!a&&h&&e.renderTile(t,24,0,i,r,s+8,A-8)}}(0),grass:new n(1),sand:new class extends l{render(e,t,i,r,s,A){e.renderTile(t,40,0,i,r,s,A),e.renderTile(t,40,0,i,r,s+8,A),e.renderTile(t,40,0,i,r,s,A+8),e.renderTile(t,40,0,i,r,s+8,A+8)}}(2),tree:new class extends l{constructor(e){super(e),this.isFarmable=!0,this.isPassable=!1}render(e,t,i,r,s,A){const l=e.getTile(i,r-1).id===d.water.id||e.getTile(i,r-1).id===d.sand.id||e.getTile(i,r-1).id===d.rock.id,n=e.getTile(i,r+1).id===d.water.id||e.getTile(i,r+1).id===d.sand.id||e.getTile(i,r+1).id===d.rock.id,a=e.getTile(i-1,r).id===d.water.id||e.getTile(i-1,r).id===d.sand.id||e.getTile(i-1,r).id===d.rock.id,o=e.getTile(i+1,r).id===d.water.id||e.getTile(i+1,r).id===d.sand.id||e.getTile(i+1,r).id===d.rock.id;l&&a?e.renderTile(t,0,24,i,r,s,A):e.renderTile(t,a?0:8,l?24:32,i,r,s,A),l&&o?e.renderTile(t,16,24,i,r,s+8,A):e.renderTile(t,o?16:8,l?24:32,i,r,s+8,A),n&&a?e.renderTile(t,0,40,i,r,s,A+8):e.renderTile(t,a?0:8,n?40:32,i,r,s,A+8),n&&o?e.renderTile(t,16,40,i,r,s+8,A+8):e.renderTile(t,o?16:8,n?40:32,i,r,s+8,A+8);e.renderTile(t,16,72,i,r,s,A),e.renderTile(t,24,72,i,r,s+8,A),e.renderTile(t,16,80,i,r,s,A+8),e.renderTile(t,24,80,i,r,s+8,A+8)}getOutcome(){return{amount:3,type:"wood"}}}(3),rock:new class extends l{constructor(e){super(e),this.isFarmable=!0,this.isPassable=!1}render(e,t,i,r,s,A){const l=e.getTile(i,r-1).id===this.id,n=e.getTile(i,r+1).id===this.id,d=e.getTile(i-1,r).id===this.id,a=e.getTile(i+1,r).id===this.id,o=e.getTile(i-1,r-1).id===this.id,h=e.getTile(i+1,r-1).id===this.id,g=e.getTile(i-1,r+1).id===this.id,c=e.getTile(i+1,r+1).id===this.id;l||d?l&&d&&!o?e.renderTile(t,32,56,i,r,s,A):e.renderTile(t,d?8:0,l?56:48,i,r,s,A):e.renderTile(t,0,48,i,r,s,A),l||a?l&&a&&!h?e.renderTile(t,24,56,i,r,s+8,A):e.renderTile(t,a?8:16,l?56:48,i,r,s+8,A):e.renderTile(t,16,48,i,r,s+8,A),n||d?n&&d&&!g?e.renderTile(t,32,48,i,r,s,A+8):e.renderTile(t,d?8:0,n?56:64,i,r,s,A+8):e.renderTile(t,0,64,i,r,s,A+8),n||a?n&&a&&!c?e.renderTile(t,24,48,i,r,s+8,A+8):e.renderTile(t,a?8:16,n?56:64,i,r,s+8,A+8):e.renderTile(t,16,64,i,r,s+8,A+8)}getOutcome(){return{amount:3,type:"stone"}}}(4),startingPosition:new n(999)},a=Object.entries(d).map((([e,t])=>t));var o,h;(h=o||(o={}))[h.OWNED=1]="OWNED",h[h.VISIBLE=6]="VISIBLE";let g=!1;window.onload=()=>{g=!0,Q()};let c=!1,w=!1,m=0,f=0,T=0,u=0,M=0,B=0;let S=3;let y=0;const v=(e=>{const t=new Image;return y++,t.onload=()=>{y--,0===y&&Q()},t.src=e,t})(i),D=document.querySelector("#map"),k=D.getContext("2d"),p=new class{constructor(){t(this,"scrollX",0),t(this,"scrollY",0),t(this,"scrollSpeed",2),t(this,"keys",[]),window.onkeydown=e=>{this.keys[e.keyCode]=!0},window.onkeyup=e=>{this.keys[e.keyCode]=!1}}update(e,t,i,r){return this.scrollX=e,this.scrollY=t,this.keys[87]&&(this.scrollY+=this.scrollSpeed),this.keys[65]&&(this.scrollX+=this.scrollSpeed),this.keys[83]&&(this.scrollY-=this.scrollSpeed),this.keys[68]&&(this.scrollX-=this.scrollSpeed),this.keys[27]&&i&&i(),this.keys[49]&&r&&r(),[this.scrollX,this.scrollY]}},I=new Array(1);for(let x=0;x<I.length;x++)I[x]={name:"Base",imageX:0,imageY:9};const O=new class{constructor(e,r){t(this,"tiles"),t(this,"tilesState"),t(this,"tileSize",16),t(this,"tileImage"),t(this,"imagesToLoad",0),t(this,"width"),t(this,"height"),this.width=e,this.height=r,this.tiles=new Array(e*r),this.tilesState=new Array(e*r),this.tileImage=this.loadImage(i)}loadImage(e){var t=new Image;return this.imagesToLoad++,t.onload=()=>{this.imagesToLoad--,0===this.imagesToLoad&&this.init()},t.src=e,t}init(){const e=((e,t)=>{for(;;){const i=s(e,t),r=new Array(256);for(let s=0;s<e*t;s++)r[255&i[0][s]]++;if(!(r[2]<100||r[1]<100))return i}})(this.width,this.height);this.tiles=e[0],this.tilesState=e[1],this.tilesState.fill(0)}render(e,t,i,r,s){const A=Math.floor(-i/this.tileSize),l=Math.floor(-r/this.tileSize),n=Math.ceil((-i+e.width/s)/this.tileSize),d=Math.ceil((-r+e.height/s)/this.tileSize);for(let a=l;a<d;a++)for(let e=A;e<n;e++){const s=this.getTile(e,a),A=this.getTileState(e,a,1);s.render(this,t,e,a,i,r),1===A&&t.drawImage(this.tileImage,0,72,16,16,e*this.tileSize+i,a*this.tileSize+r,16,16)}}renderTile(e,t,i,r,s,A,l){e.drawImage(this.tileImage,t,i,8,8,r*this.tileSize+A,s*this.tileSize+l,8,8)}getTile(e,t){if(e<0||t<0||e>=this.width||t>=this.height)return d.water;const i=a.find((i=>this.tiles[e+t*this.width]===i.id));return null!=i?i:d.water}getTileState(e,t,i){return e<0||t<0||e>=this.width||t>=this.height?0:6===i?(this.tilesState[e+t*this.width]&i)>>1:this.tilesState[e+t*this.width]&i}setTileState(e,t,i,r){if(!(e<0||t<0||e>=this.width||t>=this.height))if(6===r){const r=this.tilesState[e+t*this.width];this.tilesState[e+t*this.width]=i<<1|1&r}else this.tilesState[e+t*this.width]^=i}setTile(e,t,i){e<0||t<0||e>=this.width||t>=this.height||(this.tiles[e+t*this.width]=i.id)}recalcVisibility(){for(let e=0;e<this.height;e++)for(let t=0;t<this.width;t++){let i=this.getTileState(t,e,6);3===i&&(i>>=1),this.setTileState(t,e,i,6)}for(let e=0;e<this.height;e++)for(let t=0;t<this.width;t++){this.getTileState(t,e,1)&&this.revealTile(t,e,4)}}revealTile(e,t,i){for(let r=t-i;r<=t+i;r++)if(!(r<0||r>=this.height))for(let s=e-i;s<=e+i;s++){if(s<0||s>=this.width)continue;const A=s-e,l=r-t;if(A*A+l*l<=i*i+2){if(0===r||0===s||s===this.width-1||r===this.height-1)continue;this.setTileState(s,r,3,6)}}}}(128,128),Q=()=>{if(g&&!(y>0)){D.width=window.innerWidth,D.height=window.innerHeight,D.onmousedown=e=>{e.preventDefault(),c=!0,w=!1,m=e.clientX,f=e.clientY},D.onclick=e=>{if(c=!1,!w){const t=Math.floor(T+16*-M+window.innerWidth/S/2),i=Math.floor(u+16*-B+window.innerHeight/S/2),r=Math.floor((e.clientX/S-t)/16),s=Math.floor((e.clientY/S-i)/16);P(r,s,e.clientX/S,e.clientY/S)}};for(let e=0;e<128;e++)for(let t=0;t<128;t++){const i=t+128*e;O.tiles[i]===d.startingPosition.id&&(M=t,B=e,O.setTileState(M,B,1,o.OWNED),O.recalcVisibility())}window.onmousemove=e=>{if(c){e.preventDefault();var t=e.clientX-m,i=e.clientY-f;(w||t*t+i*i>64)&&(w=!0,T+=t/S,u+=i/S,m=e.clientX,f=e.clientY,requestAnimationFrame(Y))}},E(),Y()}};let X=null,C=null,q=!1;const P=(e,t,i=800,r=600)=>{const s=Math.floor(k.canvas.width/S),A=Math.floor(k.canvas.height/S);if(i>=0&&i<=s&&r>=A-35&&r<=A&&X&&C){return void(O.getTile(X,C).isPassable&&N(i,r))}if(e<0||t<0||e>128||t>128)return X=null,void(C=null);const l=O.getTileState(e,t,o.VISIBLE);if(0===l)return X=null,C=null,void requestAnimationFrame(Y);X===e&&C===t||(X=e,C=t,q=3===l),requestAnimationFrame(Y)},E=()=>{requestAnimationFrame(E);const e=p.update(T,u,(()=>{requestAnimationFrame(Y)}),(()=>{X&&C&&(O.setTileState(X,C,1,o.OWNED),O.recalcVisibility(),requestAnimationFrame(Y),X=null,C=null)}));T===e[0]&&u===e[1]||(T=e[0],u=e[1],requestAnimationFrame(Y))},Y=()=>{S=Math.max(Math.floor(D.height/300+1),Math.floor(D.width/(16/9*300)+1)),T>16*M&&(T=16*M),u>16*B&&(u=16*B),T<16*M-2016&&(T=16*M-2016),u<16*B-2016&&(u=16*B-2016),k.imageSmoothingEnabled=!1,k.setTransform(S,0,0,S,0,0);const e=Math.floor(T+16*-M+window.innerWidth/S/2),t=Math.floor(u+16*-B+window.innerHeight/S/2);O.render(D,k,e,t,S);for(var i=0;i<I.length;i++){const e=Math.floor(k.canvas.width/S),t=Math.floor(k.canvas.height/S);k.fillStyle="rgba(255, 255, 255, 0.3)",k.fillRect(0,t-35,e,t),F(I[i].name,e/2+2,t-25-5,3),L(I[i].imageX,I[i].imageY,e/2,t-25)}if(X&&C&&(k.strokeStyle="white",k.strokeRect(16*X+e,16*C+t,16,16),q)){const i=O.getTile(X,C).getOutcome();i&&(k.fillStyle="rgba(0, 0, 0, 0.3)",k.fillRect(16*X+e+16,16*C+t,18,16),k.drawImage(v,8*A[i.type].imageX,8*A[i.type].imageY,8,8,16*X+e+18,16*C+t+4,8,8),F(`${i.amount}`,16*X+e+27,16*C+t+5,5))}b()},U=[{imageX:0,imageY:11},{imageX:1,imageY:11}],b=()=>{for(let e=0;e<U.length;e++)k.drawImage(v,8*U[e].imageX,8*U[e].imageY,8,8,4,4+14*e,8,8),F("0",14,5+14*e,6)},G="ABCDEFGHIJKLMNOPQRSTUVWXYZ      0123456789.,!?'\":;()+-=*/\\%     ",F=(e,t,i,r=8)=>{e=e.toUpperCase();for(var s=0;s<e.length;s++){var A=G.indexOf(e.charAt(s)),l=0+A%32,n=29+(A>>5);k.drawImage(v,8*l,8*n,8,8,t+s*r,i,r,r)}},N=(e,t)=>{const i=Math.floor(k.canvas.width/S)/2,r=Math.floor(k.canvas.height/S)-25;e>=i&&e<=i+16&&t>=r&&t<=r+16&&X&&C&&(O.setTileState(X,C,1,o.OWNED),O.recalcVisibility(),requestAnimationFrame(Y),X=null,C=null)},L=(e,t,i,r)=>{k.beginPath(),k.strokeStyle="yellow",k.rect(i,r,16,16),k.stroke(),k.drawImage(v,8*e,8*t,16,16,i,r,16,16)};
