var t=Object.defineProperty,e=("undefined"!=typeof require&&require,(e,i,s)=>(((e,i,s)=>{i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s})(e,"symbol"!=typeof i?i+"":i,s),s));!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();var i="data:image/png;base64,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";class s{constructor(t,i){e(this,"x"),e(this,"y"),e(this,"tx",0),e(this,"maxTx",4),e(this,"ty",12),e(this,"movingTx",4),e(this,"maxMovingTx",10),e(this,"xa",0),e(this,"ya",0),e(this,"dirX",0),e(this,"moving",!0),e(this,"animation",0),e(this,"movingAnimation",0),this.x=t,this.y=i}render(t,e,i,s){t.drawImage(e,this.moving?8*this.movingTx:8*this.tx,-1===this.xa||1===this.dirX?8*(this.ty+2):8*this.ty,16,16,16*this.x+i,16*this.y+s,16,16)}update(t){1===this.xa||1===this.ya?(this.moving=!0,this.dirX=0):-1===this.xa||-1===this.ya?(this.moving=!0,this.dirX=1):this.moving=!1,this.move(t)?0===Math.floor(20*Math.random())&&(this.xa=Math.floor(3*Math.random())-1,this.ya=Math.floor(3*Math.random())-1):(this.xa=0,this.ya=0),this.animation+=1,this.movingAnimation+=1,this.animation%5!=0||this.moving||(this.animation=0,this.tx+=2,this.tx%this.maxTx==0&&(this.tx=0)),this.movingAnimation%2==0&&this.moving&&(this.movingAnimation=0,this.movingTx+=2,this.movingTx%this.maxMovingTx==0&&(this.movingTx=4))}move(t){if(0!==this.xa||0!==this.ya){let e=!0;return 0!==this.xa&&this.move2(t,this.xa,0)&&(e=!1),0!==this.ya&&this.move2(t,0,this.ya)&&(e=!1),0===this.xa||0===this.ya||this.move3(t,this.xa,this.ya)||(this.xa=0,this.ya=0),!e}return!0}move3(t,e,i){const s=this.x+e,r=this.y+i;return!!t.getTile(1===e?Math.floor(s):Math.round(s),1===i?Math.floor(r):Math.round(r)).isPassable}move2(t,e,i){const s=this.x-0,r=this.y-0,h=this.x+0,a=this.y+0,n=this.x+e-0,l=this.y+i-0,o=this.x+e+0,d=this.y+i+0;let A=!1;for(let g=l;g<=d;g++)for(let e=n;e<=o;e++)if(!(e>=s&&e<=h&&g>=r&&g<=a||t.getTile(Math.round(e),Math.round(g)).isPassable))return A=!0,!1;return!A&&(this.x+=e/16,this.y+=i/16,!0)}}Math.seed=t=>{const e=4294967295;let i=123456789+t&e,s=987654321-t&e;return()=>{s=36969*(65535&s)+(s>>>16)&e,i=18e3*(65535&i)+(i>>>16)&e;let t=(s<<16)+(65535&i)>>>0;return t/=4294967296,t}};let r=Math.seed(Math.random()*(10+90*Math.random()));class h{constructor(t,i,s){e(this,"w"),e(this,"h"),e(this,"values"),this.w=t,this.h=i,this.values=new Array(t*i);for(let e=0;e<i;e+=s)for(let i=0;i<t;i+=s)this.setSample(i,e,2*r()-1);let h=s,a=1/t,n=1;do{const e=h/2;for(let s=0;s<i;s+=h)for(let i=0;i<t;i+=h){const t=(this.sample(i,s)+this.sample(i+h,s)+this.sample(i,s+h)+this.sample(i+h,s+h))/4+(2*r()-1)*h*a;this.setSample(i+e,s+e,t)}for(let i=0;i<t;i+=h)for(let s=0;s<t;s+=h){const t=this.sample(s,i),n=this.sample(s+h,i),l=this.sample(s,i+h),o=this.sample(s+e,i+e),d=this.sample(s+e,i-e),A=this.sample(s-e,i+e),g=(t+n+o+d)/4+(2*r()-1)*h*a*.5,c=(t+l+o+A)/4+(2*r()-1)*h*a*.5;this.setSample(s+e,i,g),this.setSample(s,i+e,c)}h/=2,a*=n+.8,n*=.3}while(h>1)}sample(t,e){return this.values[(t&this.w-1)+(e&this.h-1)*this.w]}setSample(t,e,i){this.values[(t&this.w-1)+(e&this.h-1)*this.w]=i}}const a=(t,e,i=Math.random()*Number.MAX_SAFE_INTEGER)=>{r=Math.seed(i);const s=new h(t,e,16),a=new h(t,e,16),l=new h(t,e,16),o=new h(t,e,32),d=new h(t,e,32),g=new Array(t*e),c=new Array(t*e);for(let r=0;r<e;r++)for(let i=0;i<t;i++){const h=i+r*t;let n=3*Math.abs(o.values[h]-d.values[h])-2,c=Math.abs(s.values[h]-a.values[h]);c=3*Math.abs(c-l.values[h])-2;let u=i/(t-1)*2-1,w=r/(e-1)*2-1;u<0&&(u=-u),w<0&&(w=-w);let f=u>=w?u:w;f*=f*f*f,f*=f*f*f,n=n+1-20*f,g[h]=n<-.5?A.water.id:n>.5&&c<-1.5?A.rock.id:A.grass.id}for(let h=0;h<t*e/2800;h++){let i=Math.round(r()*t),s=Math.round(r()*e);for(let h=0;h<10;h++){let h=i+Math.round(21*r()-10),a=s+Math.round(21*r()-10);for(let i=0;i<100;i++){let i=h+Math.round(5*r())-Math.round(5*r()),s=a+Math.round(5*r())-Math.round(5*r());for(let r=s-1;r<=s+1;r++)for(let s=i-1;s<=i+1;s++)s>=0&&r>=0&&s<t&&r<e&&1==g[s+r*t]&&(g[s+r*t]=A.sand.id)}}}for(let h=0;h<t*e/400;h++){const i=Math.round(r()*t),s=Math.round(r()*e);for(let h=0;h<200;h++){const h=i+Math.round(15*r())-Math.round(15*r()),a=s+Math.round(15*r())-Math.round(15*r());h>=0&&a>=0&&h<t&&a<e&&g[h+a*t]==A.grass.id&&(g[h+a*t]=A.tree.id)}}for(let h=0;h<t*e/40;h++){const i=Math.round(r()*t),s=Math.round(r()*e);i>=0&&s>=0&&i<t&&s<<e&&g[i+s*t]===A.sand.id&&(g[i+s*t]=A.cactus.id)}for(let h=0;h<t*e/400;h++){const i=Math.round(r()*t),s=Math.round(r()*e);for(let h=0;h<30;h++){const h=i+Math.round(5*r())-Math.round(5*r()),a=s+Math.round(5*r())-Math.round(5*r());h>=0&&a>=0&&h<t&&a<e&&g[h+a*t]==A.grass.id&&(g[h+a*t]=A.flower.id)}}let u=-1,w=-1;for(;-1===u||-1===w;){u=Math.round(r()*t),w=Math.round(r()*e);t:for(let e=w-1;e<=w+1;e++)for(let i=u-1;i<=u+1;i++)if(g[i+e*t]===A.water.id||g[i+e*t]===A.rock.id||g[i+e*t]===A.tree.id){u=-1,w=-1;break t}const i=n(g,t,u,w,3,3,A.tree.id),s=n(g,t,u,w,5,1,A.rock.id);i&&s||(u=-1,w=-1)}return g[u+w*t]=A.startingPosition.id,[g,c]},n=(t,e,i,s,r,h,a)=>{let n=0;for(let l=s-r;l<=s+r;l++)for(let s=i-r;s<=i+r;s++)t[s+l*e]===a&&n++;return n>=h},l={wood:{imageX:0,imageY:11},stone:{imageX:1,imageY:11}};class o{constructor(t){e(this,"id"),e(this,"isFarmable",!1),e(this,"isPassable",!0),e(this,"isOnGrass",!1),e(this,"isOnSand",!1),e(this,"color",0),this.id=t}update(t,e,i){}getOutcome(){}}class d extends o{constructor(t){super(t),this.color=1096065}render(t,e,i,s,r,h){const a=t.getTile(i,s-1).id===this.id||t.getTile(i,s-1).id===A.tree.id||t.getTile(i,s-1).id===A.flower.id,n=t.getTile(i,s+1).id===this.id||t.getTile(i,s+1).id===A.tree.id||t.getTile(i,s+1).id===A.flower.id,l=t.getTile(i-1,s).id===this.id||t.getTile(i-1,s).id===A.tree.id||t.getTile(i-1,s).id===A.flower.id,o=t.getTile(i+1,s).id===this.id||t.getTile(i+1,s).id===A.tree.id||t.getTile(i+1,s).id===A.flower.id,d=t.getTile(i-1,s-1).id===this.id||t.getTile(i-1,s-1).id===A.tree.id||t.getTile(i-1,s-1).id===A.flower.id,g=t.getTile(i+1,s-1).id===this.id||t.getTile(i+1,s-1).id===A.tree.id||t.getTile(i+1,s-1).id===A.flower.id,c=t.getTile(i-1,s+1).id===this.id||t.getTile(i-1,s+1).id===A.tree.id||t.getTile(i-1,s+1).id===A.flower.id,u=t.getTile(i+1,s+1).id===this.id||t.getTile(i+1,s+1).id===A.tree.id||t.getTile(i+1,s+1).id===A.flower.id;a||l?a&&l&&!d?t.renderTile(e,32,32,i,s,r,h):t.renderTile(e,l?8:0,a?32:24,i,s,r,h):t.renderTile(e,0,24,i,s,r,h),a||o?a&&o&&!g?t.renderTile(e,24,32,i,s,r+8,h):t.renderTile(e,o?8:16,a?32:24,i,s,r+8,h):t.renderTile(e,16,24,i,s,r+8,h),n||l?n&&l&&!c?t.renderTile(e,32,24,i,s,r,h+8):t.renderTile(e,l?8:0,n?32:40,i,s,r,h+8):t.renderTile(e,0,40,i,s,r,h+8),n||o?n&&o&&!u?t.renderTile(e,24,24,i,s,r+8,h+8):t.renderTile(e,o?8:16,n?32:40,i,s,r+8,h+8):t.renderTile(e,16,40,i,s,r+8,h+8)}}const A={water:new class extends o{constructor(t){super(t),e(this,"position1",0),e(this,"position2",0),e(this,"position3",0),e(this,"position4",0),e(this,"shouldAnimate",!0),this.isPassable=!1,this.color=3900150}render(t,e,i,s,r,h){this.shouldAnimate&&(this.position1=Math.round(3+3*Math.random()),this.position2=Math.round(3+3*Math.random()),this.position3=Math.round(3+3*Math.random()),this.position4=Math.round(3+3*Math.random()),this.shouldAnimate=!1);const a=t.getTile(i,s-1).id===this.id,n=t.getTile(i,s+1).id===this.id,l=t.getTile(i-1,s).id===this.id,o=t.getTile(i+1,s).id===this.id,d=t.getTile(i-1,s-1).id===this.id,A=t.getTile(i+1,s-1).id===this.id;a||l?a&&l&&!d?t.renderTile(e,32,8,i,s,r,h):a&&l?t.renderTile(e,8*this.position1,16,i,s,r,h):t.renderTile(e,l?8:0,a?8:0,i,s,r,h):t.renderTile(e,0,0,i,s,r,h),a||o?a&&o&&!A?t.renderTile(e,24,8,i,s,r+8,h):a&&o?t.renderTile(e,8*this.position2,16,i,s,r+8,h):t.renderTile(e,o?8:16,a?8:0,i,s,r+8,h):t.renderTile(e,16,0,i,s,r+8,h),n||l?n&&l?t.renderTile(e,8*this.position3,16,i,s,r,h+8):t.renderTile(e,l?8:0,n?8:16,i,s,r,h+8):t.renderTile(e,0,16,i,s,r,h+8),n||o?n&&o?t.renderTile(e,8*this.position4,16,i,s,r+8,h+8):t.renderTile(e,o?8:16,n?8:16,i,s,r+8,h+8):t.renderTile(e,16,16,i,s,r+8,h+8),a&&!l&&d&&t.renderTile(e,32,0,i,s,r,h-8),a&&!o&&A&&t.renderTile(e,24,0,i,s,r+8,h-8)}update(t,e,i){t.tickCount%10==0&&(this.shouldAnimate=!0)}}(0),grass:new d(1),sand:new class extends o{constructor(t){super(t),this.color=16498468}render(t,e,i,s,r,h){t.renderTile(e,40,0,i,s,r,h),t.renderTile(e,40,0,i,s,r+8,h),t.renderTile(e,40,0,i,s,r,h+8),t.renderTile(e,40,0,i,s,r+8,h+8)}}(2),tree:new class extends o{constructor(t){super(t),this.isFarmable=!0,this.isPassable=!1,this.isOnGrass=!0,this.color=417606}render(t,e,i,s,r,h){t.onTopTiles.find((t=>t.x===i&&t.y===s))||(t.onTopTiles.push({sx:16,sy:72,x:i,y:s,xOffset:0,yOffset:0}),t.onTopTiles.push({sx:24,sy:72,x:i,y:s,xOffset:8,yOffset:0})),t.renderTile(e,16,80,i,s,r,h+8),t.renderTile(e,24,80,i,s,r+8,h+8)}getOutcome(){return{amount:3,type:"wood"}}}(3),rock:new class extends o{constructor(t){super(t),this.isFarmable=!0,this.isPassable=!1,this.color=10265519}render(t,e,i,s,r,h){const a=t.getTile(i,s-1).id===this.id,n=t.getTile(i,s+1).id===this.id,l=t.getTile(i-1,s).id===this.id,o=t.getTile(i+1,s).id===this.id,d=t.getTile(i-1,s-1).id===this.id,A=t.getTile(i+1,s-1).id===this.id,g=t.getTile(i-1,s+1).id===this.id,c=t.getTile(i+1,s+1).id===this.id;a||l?a&&l&&!d?t.renderTile(e,32,56,i,s,r,h):t.renderTile(e,l?8:0,a?56:48,i,s,r,h):t.renderTile(e,0,48,i,s,r,h),a||o?a&&o&&!A?t.renderTile(e,24,56,i,s,r+8,h):t.renderTile(e,o?8:16,a?56:48,i,s,r+8,h):t.renderTile(e,16,48,i,s,r+8,h),n||l?n&&l&&!g?t.renderTile(e,32,48,i,s,r,h+8):t.renderTile(e,l?8:0,n?56:64,i,s,r,h+8):t.renderTile(e,0,64,i,s,r,h+8),n||o?n&&o&&!c?t.renderTile(e,24,48,i,s,r+8,h+8):t.renderTile(e,o?8:16,n?56:64,i,s,r+8,h+8):t.renderTile(e,16,64,i,s,r+8,h+8)}getOutcome(){return{amount:3,type:"stone"}}}(4),flower:new class extends o{constructor(t){super(t),this.isOnGrass=!0,this.color=1096065}render(t,e,i,s,r,h){t.renderTile(e,48,0,i,s,r+4,h+4)}}(5),cactus:new class extends o{constructor(t){super(t),this.isOnSand=!0,this.color=16498468}render(t,e,i,s,r,h){t.renderTile(e,56,0,i,s,r,h),t.renderTile(e,64,0,i,s,r+8,h),t.renderTile(e,56,8,i,s,r,h+8),t.renderTile(e,64,8,i,s,r+8,h+8)}}(6),dirt:new class extends o{constructor(t){super(t),this.color=7877903}render(t,e,i,s,r,h){const a=t.getTile(i,s-1).id===this.id,n=t.getTile(i,s+1).id===this.id,l=t.getTile(i-1,s).id===this.id,o=t.getTile(i+1,s).id===this.id,d=t.getTile(i-1,s-1).id===this.id,A=t.getTile(i+1,s-1).id===this.id,g=t.getTile(i-1,s+1).id===this.id,c=t.getTile(i+1,s+1).id===this.id;a||l?a&&l&&!d?t.renderTile(e,72,32,i,s,r,h):t.renderTile(e,l?48:40,a?32:24,i,s,r,h):t.renderTile(e,40,24,i,s,r,h),a||o?a&&o&&!A?t.renderTile(e,64,32,i,s,r+8,h):t.renderTile(e,o?48:56,a?32:24,i,s,r+8,h):t.renderTile(e,56,24,i,s,r+8,h),n||l?n&&l&&!g?t.renderTile(e,72,24,i,s,r,h+8):t.renderTile(e,l?48:40,n?32:40,i,s,r,h+8):t.renderTile(e,40,40,i,s,r,h+8),n||o?n&&o&&!c?t.renderTile(e,64,24,i,s,r+8,h+8):t.renderTile(e,o?48:56,n?32:40,i,s,r+8,h+8):t.renderTile(e,56,40,i,s,r+8,h+8)}}(7),startingPosition:new d(999)},g=Object.entries(A).map((([t,e])=>e));var c,u;(u=c||(c={}))[u.OWNED=1]="OWNED",u[u.VISIBLE=6]="VISIBLE";class w{constructor(t,i,s){e(this,"map2d"),e(this,"imageData"),e(this,"minimapCanvas",document.createElement("canvas")),e(this,"width"),e(this,"height"),this.map2d=t,this.width=i,this.height=s,this.imageData=t.createImageData(i,s),this.minimapCanvas.width=this.imageData.width,this.minimapCanvas.height=this.imageData.height}getRGB(t){return[t>>16&255,t>>8&255,255&t]}render(t,e,i,s){const r=Math.floor(this.map2d.canvas.width/s)-t.width/(i+s+10)-8,h=Math.round(t.width/(i+s+10));for(let a=0;a<this.height;a++)for(let t=0;t<this.width;t++){const i=t+a*this.width,s=e.getTile(t,a),[r,h,n]=this.getRGB(s.color);e.getTileState(t,a,c.OWNED)?(this.imageData.data[4*i]=255,this.imageData.data[4*i+1]=0,this.imageData.data[4*i+2]=0,this.imageData.data[4*i+3]=255):e.getTileState(t,a,c.VISIBLE)>=1?(this.imageData.data[4*i]=r,this.imageData.data[4*i+1]=h,this.imageData.data[4*i+2]=n,this.imageData.data[4*i+3]=255):(this.imageData.data[4*i]=0,this.imageData.data[4*i+1]=0,this.imageData.data[4*i+2]=0,this.imageData.data[4*i+3]=255)}this.minimapCanvas.getContext("2d").putImageData(this.imageData,0,0),this.map2d.drawImage(this.minimapCanvas,r,8,h,h),this.map2d.strokeStyle="rgba(255, 255, 255, 0.35)",this.map2d.strokeRect(r,8,h,h)}}let f=!1,m=!1;window.onload=()=>{f=!0,N()};let T=!1,M=!1,p=0,v=0,D=0,C=0,y=0,B=0;let x=3;let S=0;const I=(t=>{const e=new Image;return S++,e.onload=()=>{S--,0===S&&N()},e.src=t,e})(i),P=document.querySelector("#map"),O=P.getContext("2d"),z=new class{constructor(){e(this,"scrollX",0),e(this,"scrollY",0),e(this,"scrollSpeed",3),e(this,"keys",[]),window.onkeydown=t=>{this.keys[t.keyCode]=!0},window.onkeyup=t=>{this.keys[t.keyCode]=!1}}update(t,e,i,s){return this.scrollX=t,this.scrollY=e,this.keys[87]&&(this.scrollY+=this.scrollSpeed),this.keys[65]&&(this.scrollX+=this.scrollSpeed),this.keys[83]&&(this.scrollY-=this.scrollSpeed),this.keys[68]&&(this.scrollX-=this.scrollSpeed),this.keys[27]&&i&&i(),this.keys[49]&&s&&s(),[this.scrollX,this.scrollY]}};let b;const Q=new Array(1);for(let _=0;_<Q.length;_++)Q[_]={name:"Base",imageX:0,imageY:9};const E=new class{constructor(t,s,r){e(this,"tiles"),e(this,"data"),e(this,"tilesState"),e(this,"tileSize",16),e(this,"tickCount",0),e(this,"tileImage"),e(this,"imagesToLoad",0),e(this,"width"),e(this,"height"),e(this,"seed"),e(this,"entities",[]),e(this,"onTopTiles",[]),this.width=t,this.height=s,this.seed=r,this.tiles=new Array(t*s),this.data=new Array(t*s),this.tilesState=new Array(t*s),this.tileImage=this.loadImage(i)}loadImage(t){var e=new Image;return this.imagesToLoad++,e.onload=()=>{this.imagesToLoad--,0===this.imagesToLoad&&this.init()},e.src=t,e}init(){const t=((t,e,i=Math.random()*Number.MAX_SAFE_INTEGER)=>{for(;;){const s=a(t,e,i),r=new Array(256);for(let i=0;i<t*e;i++)r[255&s[0][i]]++;if(!(r[255&A.rock.id]<100||r[255&A.sand.id]<100||r[255&A.grass.id]<100||r[255&A.tree.id]<100))return s}})(this.width,this.height,this.seed);this.tiles=t[0],this.tilesState=[...t[1]],this.data=[...t[1]],this.tilesState.fill(0);for(let e=0;e<this.height;e++)for(let t=0;t<this.width;t++){if(this.tiles[t+e*this.width]===A.startingPosition.id)for(let i=0;i<5;i++)this.entities.push(new s(t,e))}}update(){this.tickCount++,this.tickCount>=Number.MAX_VALUE&&(this.tickCount=0);for(let t=0;t<this.width*this.height/50;t++){const t=Math.round(Math.random()*this.width),e=Math.round(Math.random()*this.height);this.getTile(t,e).update(this,t,e)}this.entities.forEach((t=>t.update(this)))}render(t,e,i,s,r){const h=Math.floor(-i/this.tileSize),a=Math.floor(-s/this.tileSize),n=Math.ceil((-i+t.width/r)/this.tileSize),l=Math.ceil((-s+t.height/r)/this.tileSize);for(let o=a;o<l;o++)for(let t=h;t<n;t++){const r=this.getTile(t,o),h=this.getTileState(t,o,1);if(r.isOnGrass){g.find((t=>t.id===A.grass.id)).render(this,e,t,o,i,s)}else if(r.isOnSand){g.find((t=>t.id===A.sand.id)).render(this,e,t,o,i,s)}r.render(this,e,t,o,i,s),1===h&&e.drawImage(this.tileImage,0,72,16,16,t*this.tileSize+i,o*this.tileSize+s,16,16)}this.entities.forEach((t=>t.render(e,this.tileImage,i,s))),this.onTopTiles.forEach((t=>{this.renderTile(e,t.sx,t.sy,t.x,t.y,t.xOffset+i,t.yOffset+s)}));for(let o=a;o<l;o++)for(let t=h;t<n;t++){const r=this.getTileState(t,o,6);if(1===r)e.drawImage(this.tileImage,240,16,8,8,t*this.tileSize+i+0,o*this.tileSize+s+0,8,8),e.drawImage(this.tileImage,240,16,8,8,t*this.tileSize+i+8,o*this.tileSize+s+0,8,8),e.drawImage(this.tileImage,240,16,8,8,t*this.tileSize+i+0,o*this.tileSize+s+8,8,8),e.drawImage(this.tileImage,240,16,8,8,t*this.tileSize+i+8,o*this.tileSize+s+8,8,8);else for(let h=0;h<4;h++){const a=h%2*2-1,n=2*(h>>1)-1,l=this.getTileState(t,o+n,6)!==r,d=this.getTileState(t+a,o,6)!==r;let A=25,g=1;3===r&&(g+=3),l&&(g+=n),d&&(A+=a),e.drawImage(this.tileImage,8*A,8*g,8,8,t*this.tileSize+i+h%2*8,o*this.tileSize+s+8*(h>>1),8,8)}}}renderTile(t,e,i,s,r,h,a){t.drawImage(this.tileImage,e,i,8,8,s*this.tileSize+h,r*this.tileSize+a,8,8)}getTile(t,e){if(t<0||e<0||t>=this.width||e>=this.height)return A.water;const i=g.find((i=>this.tiles[t+e*this.width]===i.id));return null!=i?i:A.water}getTileState(t,e,i){return t<0||e<0||t>=this.width||e>=this.height?0:6===i?(this.tilesState[t+e*this.width]&i)>>1:this.tilesState[t+e*this.width]&i}setTileState(t,e,i,s){if(!(t<0||e<0||t>=this.width||e>=this.height))if(6===s){const s=this.tilesState[t+e*this.width];this.tilesState[t+e*this.width]=i<<1|1&s}else this.tilesState[t+e*this.width]^=i,this.tiles[t+e*this.width]=A.dirt.id}setTile(t,e,i){t<0||e<0||t>=this.width||e>=this.height||(this.tiles[t+e*this.width]=i.id)}setData(t,e,i){t<0||e<0||t>=this.width||e>=this.height||(this.data[t+e*this.width]=i)}getData(t,e){return t<0||e<0||t>=this.width||e>=this.height?0:255&this.data[t+e*this.width]}recalcVisibility(){for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++){let i=this.getTileState(e,t,6);3===i&&(i>>=1),this.setTileState(e,t,i,6)}for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++){this.getTileState(e,t,1)&&this.revealTile(e,t,4)}}revealTile(t,e,i){for(let s=e-i;s<=e+i;s++)if(!(s<0||s>=this.height))for(let r=t-i;r<=t+i;r++){if(r<0||r>=this.width)continue;const h=r-t,a=s-e;if(h*h+a*a<=i*i+2){if(0===s||0===r||r===this.width-1||s===this.height-1)continue;this.setTileState(r,s,3,6)}}}}(32,32),N=()=>{if(f&&!(S>0)){if(P.width=window.innerWidth,P.height=window.innerHeight,b=new w(O,32,32),P.onmousedown=t=>{t.preventDefault(),T=!0,M=!1,p=t.clientX,v=t.clientY},P.onclick=t=>{if(T=!1,!M){const e=Math.floor(D+16*-y+window.innerWidth/x/2),i=Math.floor(C+16*-B+window.innerHeight/x/2),s=Math.floor((t.clientX/x-e)/16),r=Math.floor((t.clientY/x-i)/16);L(s,r,t.clientX/x,t.clientY/x)}},window.onmousemove=t=>{if(!T)return;t.preventDefault();const e=t.clientX-p,i=t.clientY-v;(M||e*e+i*i>64)&&(M=!0,D+=e/x,C+=i/x,p=t.clientX,v=t.clientY)},!m){for(let t=0;t<32;t++)for(let e=0;e<32;e++){const i=e+32*t;E.tiles[i]===A.startingPosition.id&&(y=e,B=t,E.setTileState(y,B,1,c.OWNED),E.recalcVisibility())}V(),m=!0}W()}};window.onresize=N;let k=null,Y=null,H=!1;const L=(t,e,i=800,s=600)=>{const r=Math.floor(O.canvas.width/x),h=Math.floor(O.canvas.height/x);if(i>=0&&i<=r&&s>=h-35&&s<=h&&k&&Y){return void(E.getTile(k,Y).isPassable&&Z(i,s))}if(t<0||e<0||t>32||e>32)return k=null,void(Y=null);const a=E.getTileState(t,e,c.VISIBLE);if(0===a)return k=null,void(Y=null);k===t&&Y===e||(k=t,Y=e,H=3===a)};let F=Date.now(),X=Date.now(),G=0;const V=()=>{requestAnimationFrame(V),F=X,X=Date.now(),G+=X-F,G>=60&&(G=0,U());const t=z.update(D,C,(()=>{}),(()=>{if(k&&Y){for(let t=0;t<5;t++)E.entities.push(new s(k,Y));E.setTileState(k,Y,1,c.OWNED),E.recalcVisibility(),k=null,Y=null}}));D===t[0]&&C===t[1]||(D=t[0],C=t[1]),W()},U=()=>{E.update()},W=()=>{x=Math.max(Math.floor(P.height/300+1),Math.floor(P.width/(16/9*300)+1)),D>16*y&&(D=16*y),C>16*B&&(C=16*B),D<16*y-480&&(D=16*y-480),C<16*B-480&&(C=16*B-480),O.imageSmoothingEnabled=!1,O.setTransform(x,0,0,x,0,0);const t=Math.floor(D+16*-y+window.innerWidth/x/2),e=Math.floor(C+16*-B+window.innerHeight/x/2);E.render(P,O,t,e,x);for(var i=0;i<Q.length;i++){const t=Math.floor(O.canvas.width/x),e=Math.floor(O.canvas.height/x);O.fillStyle="rgba(255, 255, 255, 0.3)",O.fillRect(0,e-35,t,e),K(Q[i].name,t/2+2,e-25-5,3),J(Q[i].imageX,Q[i].imageY,t/2,e-25)}if(k&&Y&&(O.strokeStyle="white",O.strokeRect(16*k+t,16*Y+e,16,16),H)){const i=E.getTile(k,Y).getOutcome();i&&(O.fillStyle="rgba(0, 0, 0, 0.3)",O.fillRect(16*k+t+16,16*Y+e,18,16),O.drawImage(I,8*l[i.type].imageX,8*l[i.type].imageY,8,8,16*k+t+18,16*Y+e+4,8,8),K(`${i.amount}`,16*k+t+27,16*Y+e+5,5))}j(),b.render(P,E,16,x)},q=[{imageX:0,imageY:11},{imageX:1,imageY:11}],j=()=>{for(let t=0;t<q.length;t++)O.drawImage(I,8*q[t].imageX,8*q[t].imageY,8,8,4,4+14*t,8,8),K("0",14,5+14*t,6)},R="ABCDEFGHIJKLMNOPQRSTUVWXYZ      0123456789.,!?'\":;()+-=*/\\%     ",K=(t,e,i,s=8)=>{t=t.toUpperCase();for(var r=0;r<t.length;r++){var h=R.indexOf(t.charAt(r)),a=0+h%32,n=29+(h>>5);O.drawImage(I,8*a,8*n,8,8,e+r*s,i,s,s)}},Z=(t,e)=>{const i=Math.floor(O.canvas.width/x)/2,s=Math.floor(O.canvas.height/x)-25;t>=i&&t<=i+16&&e>=s&&e<=s+16&&k&&Y&&(E.setTileState(k,Y,1,c.OWNED),E.recalcVisibility(),k=null,Y=null)},J=(t,e,i,s)=>{O.beginPath(),O.strokeStyle="yellow",O.rect(i,s,16,16),O.stroke(),O.drawImage(I,8*t,8*e,16,16,i,s,16,16)};
