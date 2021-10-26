var i=Object.defineProperty,t=("undefined"!=typeof require&&require,(t,e,s)=>(((t,e,s)=>{e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s})(t,"symbol"!=typeof e?e+"":e,s),s));!function(){const i=document.createElement("link").relList;if(!(i&&i.supports&&i.supports("modulepreload"))){for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver((i=>{for(const e of i)if("childList"===e.type)for(const i of e.addedNodes)"LINK"===i.tagName&&"modulepreload"===i.rel&&t(i)})).observe(document,{childList:!0,subtree:!0})}function t(i){if(i.ep)return;i.ep=!0;const t=function(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerpolicy&&(t.referrerPolicy=i.referrerpolicy),"use-credentials"===i.crossorigin?t.credentials="include":"anonymous"===i.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(i);fetch(i.href,t)}}();var e="/rec-rts/assets/spritesheet.9910c70f.png";const s=0,h=1,n=2;class a{constructor(i,e,s){t(this,"id"),t(this,"x"),t(this,"y"),t(this,"xa",0),t(this,"ya",0),t(this,"dirX",0),t(this,"isDead",!1),t(this,"isPlayingDeadAnimation",!1),t(this,"isControlled",!1),this.id=i,this.x=e,this.y=s}update(i){}move(i){if(0!==this.xa||0!==this.ya){let t=!0;return 0!==this.xa&&this.move2(i,this.xa,0)&&(t=!1),0!==this.ya&&this.move2(i,0,this.ya)&&(t=!1),0===this.xa||0===this.ya||this.move3(i,this.xa,this.ya)||(this.xa=0,this.ya=0),!t}return!0}move3(i,t,e){const s=this.x+t,h=this.y+e;return!!i.getTile(1===t?Math.floor(s):Math.round(s),1===e?Math.floor(h):Math.round(h)).isPassable}move2(i,t,e){if(!i.getTile(Math.round((16*this.x+8*t)/16),Math.round((16*this.y+8*e)/16)).isPassable)return!1;for(let s=-1;s<2;s++)if(i.getBuilding(Math.round((16*this.x+8*t)/16),Math.round((16*this.y+8*e)/16)))return!1;return this.x+=t/16,this.y+=e/16,!0}getID(){return this.id}getX(){return this.x}getY(){return this.y}}class r extends a{constructor(i,e){super(s,i,e),t(this,"tx",0),t(this,"maxTx",4),t(this,"ty",12),t(this,"movingTx",4),t(this,"maxMovingTx",10),t(this,"moving",!0),t(this,"animation",0),t(this,"movingAnimation",0),t(this,"deadAnimationTx",8),t(this,"maxDeadAnimationTx",14),t(this,"deadAnimation",0),t(this,"isPunching",!1),t(this,"punchTx",16),t(this,"maxPunchAnimationTx",22),t(this,"punchAnimation",0)}render(i,t,e,s){this.isPunching?i.renderEntity(t,8*this.punchTx,1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s):this.isPlayingDeadAnimation||this.isDead?i.renderEntity(t,8*this.deadAnimationTx,1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s):i.renderEntity(t,this.moving?8*this.movingTx:8*this.tx,-1===this.xa||1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s)}update(i){if(this.isPunching)return this.punchAnimation+=1,void(this.punchAnimation%2==0&&(this.punchAnimation=0,this.punchTx+=2,this.punchTx===this.maxPunchAnimationTx&&(this.punchTx=16,this.isPunching=!1)));this.isPlayingDeadAnimation?this.playDeadAnimation():(1===this.xa||1===this.ya?(this.moving=!0,this.dirX=0):-1===this.xa||-1===this.ya?(this.moving=!0,this.dirX=1):this.moving=!1,this.move(i)?this.isControlled||0===Math.floor(20*Math.random())&&(this.xa=Math.floor(3*Math.random())-1,this.ya=Math.floor(3*Math.random())-1):(this.xa=0,this.ya=0),this.animation+=1,this.movingAnimation+=1,this.animation%5!=0||this.moving||(this.animation=0,this.tx+=2,this.tx%this.maxTx==0&&(this.tx=0)),this.movingAnimation%2==0&&this.moving&&(this.movingAnimation=0,this.movingTx+=2,this.movingTx%this.maxMovingTx==0&&(this.movingTx=4)))}playDeadAnimation(){this.isDead||(this.deadAnimation+=1,this.deadAnimation%2==0&&(this.deadAnimation=0,this.deadAnimationTx+=2,this.deadAnimationTx===this.maxDeadAnimationTx&&(this.isDead=!0)))}}class o extends a{constructor(i,e){super(h,i,e),t(this,"tx",0),t(this,"maxTx",4),t(this,"ty",16),t(this,"movingTx",4),t(this,"maxMovingTx",10),t(this,"moving",!0),t(this,"animation",0),t(this,"movingAnimation",0),t(this,"deadAnimationTx",8),t(this,"maxDeadAnimationTx",14),t(this,"deadAnimation",0)}render(i,t,e,s){this.isPlayingDeadAnimation||this.isDead?i.renderEntity(t,8*this.deadAnimationTx,1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s):i.renderEntity(t,this.moving?8*this.movingTx:8*this.tx,-1===this.xa||1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s)}update(i){0===Math.round(100*Math.random())&&(this.isPlayingDeadAnimation=!0),this.isPlayingDeadAnimation?this.playDeadAnimation():(1===this.xa||1===this.ya?(this.moving=!0,this.dirX=0):-1===this.xa||-1===this.ya?(this.moving=!0,this.dirX=1):this.moving=!1,this.move(i)?0===Math.floor(20*Math.random())&&(this.xa=Math.floor(3*Math.random())-1,this.ya=Math.floor(3*Math.random())-1):(this.xa=0,this.ya=0),this.animation+=1,this.movingAnimation+=1,this.animation%7!=0||this.moving||(this.animation=0,this.tx+=2,this.tx%this.maxTx==0&&(this.tx=0)),this.movingAnimation%2==0&&this.moving&&(this.movingAnimation=0,this.movingTx+=2,this.movingTx%this.maxMovingTx==0&&(this.movingTx=4)))}playDeadAnimation(){this.isDead||(this.deadAnimation+=1,this.deadAnimation%2==0&&(this.deadAnimation=0,this.deadAnimationTx+=2,this.deadAnimationTx===this.maxDeadAnimationTx&&(this.isDead=!0)))}}Math.seed=i=>{const t=4294967295;let e=123456789+i&t,s=987654321-i&t;return()=>{s=36969*(65535&s)+(s>>>16)&t,e=18e3*(65535&e)+(e>>>16)&t;let i=(s<<16)+(65535&e)>>>0;return i/=4294967296,i}};let d=Math.seed(Math.random()*(10+90*Math.random()));class l{constructor(i,e,s){t(this,"w"),t(this,"h"),t(this,"values"),this.w=i,this.h=e,this.values=new Array(i*e);for(let t=0;t<e;t+=s)for(let e=0;e<i;e+=s)this.setSample(e,t,2*d()-1);let h=s,n=1/i,a=1;do{const t=h/2;for(let s=0;s<e;s+=h)for(let e=0;e<i;e+=h){const i=(this.sample(e,s)+this.sample(e+h,s)+this.sample(e,s+h)+this.sample(e+h,s+h))/4+(2*d()-1)*h*n;this.setSample(e+t,s+t,i)}for(let e=0;e<i;e+=h)for(let s=0;s<i;s+=h){const i=this.sample(s,e),a=this.sample(s+h,e),r=this.sample(s,e+h),o=this.sample(s+t,e+t),l=this.sample(s+t,e-t),m=this.sample(s-t,e+t),g=(i+a+o+l)/4+(2*d()-1)*h*n*.5,c=(i+r+o+m)/4+(2*d()-1)*h*n*.5;this.setSample(s+t,e,g),this.setSample(s,e+t,c)}h/=2,n*=a+.8,a*=.3}while(h>1)}sample(i,t){return this.values[(i&this.w-1)+(t&this.h-1)*this.w]}setSample(i,t,e){this.values[(i&this.w-1)+(t&this.h-1)*this.w]=e}}const m=(i,t,e=Math.random()*Number.MAX_SAFE_INTEGER)=>{d=Math.seed(e);const s=new l(i,t,16),h=new l(i,t,16),n=new l(i,t,16),a=new l(i,t,32),r=new l(i,t,32),o=new Array(i*t),m=new Array(i*t);for(let d=0;d<t;d++)for(let e=0;e<i;e++){const l=e+d*i;let m=3*Math.abs(a.values[l]-r.values[l])-2,g=Math.abs(s.values[l]-h.values[l]);g=3*Math.abs(g-n.values[l])-2;let c=e/(i-1)*2-1,u=d/(t-1)*2-1;c<0&&(c=-c),u<0&&(u=-u);let T=c>=u?c:u;T*=T*T*T,T*=T*T*T,m=m+1-20*T,o[l]=m<-.5?x.water.id:m>.5&&g<-1.5?x.rock.id:x.grass.id}for(let l=0;l<i*t/2800;l++){let e=Math.round(d()*i),s=Math.round(d()*t);for(let h=0;h<10;h++){let h=e+Math.round(21*d()-10),n=s+Math.round(21*d()-10);for(let e=0;e<100;e++){let e=h+Math.round(5*d())-Math.round(5*d()),s=n+Math.round(5*d())-Math.round(5*d());for(let h=s-1;h<=s+1;h++)for(let s=e-1;s<=e+1;s++)s>=0&&h>=0&&s<i&&h<t&&1==o[s+h*i]&&(o[s+h*i]=x.sand.id)}}}for(let l=0;l<i*t/400;l++){const e=Math.round(d()*i),s=Math.round(d()*t);for(let h=0;h<200;h++){const h=e+Math.round(15*d())-Math.round(15*d()),n=s+Math.round(15*d())-Math.round(15*d());h>=0&&n>=0&&h<i&&n<t&&o[h+n*i]==x.grass.id&&(o[h+n*i]=x.tree.id)}}for(let l=0;l<i*t/40;l++){const e=Math.round(d()*i),s=Math.round(d()*t);e>=0&&s>=0&&e<i&&s<<t&&o[e+s*i]===x.sand.id&&(o[e+s*i]=x.cactus.id)}for(let l=0;l<i*t/400;l++){const e=Math.round(d()*i),s=Math.round(d()*t);for(let h=0;h<30;h++){const h=e+Math.round(5*d())-Math.round(5*d()),n=s+Math.round(5*d())-Math.round(5*d());h>=0&&n>=0&&h<i&&n<t&&o[h+n*i]==x.grass.id&&(o[h+n*i]=x.flower.id)}}let c=-1,u=-1;for(;-1===c||-1===u;){c=Math.round(d()*i),u=Math.round(d()*t);i:for(let t=u-1;t<=u+1;t++)for(let e=c-1;e<=c+1;e++)if(o[e+t*i]===x.water.id||o[e+t*i]===x.rock.id||o[e+t*i]===x.tree.id){c=-1,u=-1;break i}const e=g(o,i,c,u,3,3,x.tree.id),s=g(o,i,c,u,5,1,x.rock.id);e&&s||(c=-1,u=-1)}return o[c+u*i]=x.startingPosition.id,[o,m]},g=(i,t,e,s,h,n,a)=>{let r=0;for(let o=s-h;o<=s+h;o++)for(let s=e-h;s<=e+h;s++)i[s+o*t]===a&&r++;return r>=n},c={wood:{imageX:0,imageY:11},stone:{imageX:1,imageY:11}};class u{constructor(i){t(this,"id"),t(this,"isFarmable",!1),t(this,"isPassable",!0),t(this,"isOnGrass",!1),t(this,"isOnSand",!1),t(this,"color",0),this.id=i}update(i,t,e){}getOutcome(){}}class T extends u{constructor(i){super(i),this.color=1096065}render(i,t,e,s,h,n){const a=i.getTile(e,s-1).id===this.id||i.getTile(e,s-1).id===x.tree.id||i.getTile(e,s-1).id===x.flower.id,r=i.getTile(e,s+1).id===this.id||i.getTile(e,s+1).id===x.tree.id||i.getTile(e,s+1).id===x.flower.id,o=i.getTile(e-1,s).id===this.id||i.getTile(e-1,s).id===x.tree.id||i.getTile(e-1,s).id===x.flower.id,d=i.getTile(e+1,s).id===this.id||i.getTile(e+1,s).id===x.tree.id||i.getTile(e+1,s).id===x.flower.id,l=i.getTile(e-1,s-1).id===this.id||i.getTile(e-1,s-1).id===x.tree.id||i.getTile(e-1,s-1).id===x.flower.id,m=i.getTile(e+1,s-1).id===this.id||i.getTile(e+1,s-1).id===x.tree.id||i.getTile(e+1,s-1).id===x.flower.id,g=i.getTile(e-1,s+1).id===this.id||i.getTile(e-1,s+1).id===x.tree.id||i.getTile(e-1,s+1).id===x.flower.id,c=i.getTile(e+1,s+1).id===this.id||i.getTile(e+1,s+1).id===x.tree.id||i.getTile(e+1,s+1).id===x.flower.id;a||o?a&&o&&!l?i.renderTile(t,32,32,e,s,h,n):i.renderTile(t,o?8:0,a?32:24,e,s,h,n):i.renderTile(t,0,24,e,s,h,n),a||d?a&&d&&!m?i.renderTile(t,24,32,e,s,h+8,n):i.renderTile(t,d?8:16,a?32:24,e,s,h+8,n):i.renderTile(t,16,24,e,s,h+8,n),r||o?r&&o&&!g?i.renderTile(t,32,24,e,s,h,n+8):i.renderTile(t,o?8:0,r?32:40,e,s,h,n+8):i.renderTile(t,0,40,e,s,h,n+8),r||d?r&&d&&!c?i.renderTile(t,24,24,e,s,h+8,n+8):i.renderTile(t,d?8:16,r?32:40,e,s,h+8,n+8):i.renderTile(t,16,40,e,s,h+8,n+8)}}const f={tent:new class extends class{constructor(i){t(this,"id"),this.id=i}update(i,t,e){}}{render(i,t,e,s,h,n){const a=.75;if(!i.onTopTiles.find((i=>i.x===e-a&&i.y===s-1)))for(let r=0;r<2;r++)for(let t=0;t<5;t++)i.onTopTiles.push({sx:8*(5+t),sy:8*(8+r),x:e-a,y:s-1,xExtraOffset:8*t,yExtraOffset:8*r,dw:8,dh:8});for(let r=2;r<4;r++)for(let o=0;o<5;o++)i.renderTile(t,8*(5+o),8*(8+r),e-a,s-1,h+8*o,n+8*r,8,8)}}(0)},x={water:new class extends u{constructor(i){super(i),t(this,"position1",0),t(this,"position2",0),t(this,"position3",0),t(this,"position4",0),t(this,"shouldAnimate",!0),this.isPassable=!1,this.color=3900150}render(i,t,e,s,h,n){this.shouldAnimate&&(this.position1=Math.round(3+3*Math.random()),this.position2=Math.round(3+3*Math.random()),this.position3=Math.round(3+3*Math.random()),this.position4=Math.round(3+3*Math.random()),this.shouldAnimate=!1);const a=i.getTile(e,s-1).id===this.id,r=i.getTile(e,s+1).id===this.id,o=i.getTile(e-1,s).id===this.id,d=i.getTile(e+1,s).id===this.id,l=i.getTile(e-1,s-1).id===this.id,m=i.getTile(e+1,s-1).id===this.id;a||o?a&&o&&!l?i.renderTile(t,32,8,e,s,h,n):a&&o?i.renderTile(t,8*this.position1,16,e,s,h,n):i.renderTile(t,o?8:0,a?8:0,e,s,h,n):i.renderTile(t,0,0,e,s,h,n),a||d?a&&d&&!m?i.renderTile(t,24,8,e,s,h+8,n):a&&d?i.renderTile(t,8*this.position2,16,e,s,h+8,n):i.renderTile(t,d?8:16,a?8:0,e,s,h+8,n):i.renderTile(t,16,0,e,s,h+8,n),r||o?r&&o?i.renderTile(t,8*this.position3,16,e,s,h,n+8):i.renderTile(t,o?8:0,r?8:16,e,s,h,n+8):i.renderTile(t,0,16,e,s,h,n+8),r||d?r&&d?i.renderTile(t,8*this.position4,16,e,s,h+8,n+8):i.renderTile(t,d?8:16,r?8:16,e,s,h+8,n+8):i.renderTile(t,16,16,e,s,h+8,n+8),a&&!o&&l&&i.renderTile(t,32,0,e,s,h,n-8),a&&!d&&m&&i.renderTile(t,24,0,e,s,h+8,n-8)}update(i,t,e){i.tickCount%10==0&&(this.shouldAnimate=!0)}}(0),grass:new T(1),sand:new class extends u{constructor(i){super(i),this.color=16498468}render(i,t,e,s,h,n){i.renderTile(t,40,0,e,s,h,n),i.renderTile(t,40,0,e,s,h+8,n),i.renderTile(t,40,0,e,s,h,n+8),i.renderTile(t,40,0,e,s,h+8,n+8)}}(2),tree:new class extends u{constructor(i){super(i),this.isFarmable=!0,this.isPassable=!1,this.isOnGrass=!0,this.color=417606}render(i,t,e,s,h,n){const a=16,r=72,o=i.getTile(e,s-1).id===this.id,d=i.getTile(e-1,s).id===this.id,l=i.getTile(e+1,s).id===this.id,m=i.getTile(e,s+1).id===this.id,g=i.getTile(e-1,s-1).id===this.id,c=i.getTile(e+1,s-1).id===this.id,u=i.getTile(e-1,s+1).id===this.id,T=i.getTile(e+1,s+1).id===this.id;i.onTopTiles.find((i=>i.x===e&&i.y===s))||(o&&g&&d?i.onTopTiles.push({sx:32,sy:r,x:e,y:s,xExtraOffset:0,yExtraOffset:0}):i.onTopTiles.push({sx:a,sy:r,x:e,y:s,xExtraOffset:0,yExtraOffset:0}),o&&c&&l?i.onTopTiles.push({sx:32,sy:80,x:e,y:s,xExtraOffset:8,yExtraOffset:0}):i.onTopTiles.push({sx:24,sy:r,x:e,y:s,xExtraOffset:8,yExtraOffset:0})),m&&u&&d?i.renderTile(t,32,80,e,s,h,n+8):i.renderTile(t,a,80,e,s,h,n+8),m&&T&&l?i.renderTile(t,32,r,e,s,h+8,n+8):i.renderTile(t,24,80,e,s,h+8,n+8)}getOutcome(){return{amount:3,type:"wood"}}}(3),rock:new class extends u{constructor(i){super(i),this.isFarmable=!0,this.isPassable=!1,this.color=10265519}render(i,t,e,s,h,n){const a=i.getTile(e,s-1).id===this.id,r=i.getTile(e,s+1).id===this.id,o=i.getTile(e-1,s).id===this.id,d=i.getTile(e+1,s).id===this.id,l=i.getTile(e-1,s-1).id===this.id,m=i.getTile(e+1,s-1).id===this.id,g=i.getTile(e-1,s+1).id===this.id,c=i.getTile(e+1,s+1).id===this.id;a||o?a&&o&&!l?i.renderTile(t,32,56,e,s,h,n):i.renderTile(t,o?8:0,a?56:48,e,s,h,n):i.renderTile(t,0,48,e,s,h,n),a||d?a&&d&&!m?i.renderTile(t,24,56,e,s,h+8,n):i.renderTile(t,d?8:16,a?56:48,e,s,h+8,n):i.renderTile(t,16,48,e,s,h+8,n),r||o?r&&o&&!g?i.renderTile(t,32,48,e,s,h,n+8):i.renderTile(t,o?8:0,r?56:64,e,s,h,n+8):i.renderTile(t,0,64,e,s,h,n+8),r||d?r&&d&&!c?i.renderTile(t,24,48,e,s,h+8,n+8):i.renderTile(t,d?8:16,r?56:64,e,s,h+8,n+8):i.renderTile(t,16,64,e,s,h+8,n+8)}getOutcome(){return{amount:3,type:"stone"}}}(4),flower:new class extends u{constructor(i){super(i),this.isOnGrass=!0,this.color=1096065}render(i,t,e,s,h,n){i.renderTile(t,48,0,e,s,h+4,n+4)}}(5),cactus:new class extends u{constructor(i){super(i),this.isOnSand=!0,this.color=16498468}render(i,t,e,s,h,n){i.renderTile(t,56,0,e,s,h,n),i.renderTile(t,64,0,e,s,h+8,n),i.renderTile(t,56,8,e,s,h,n+8),i.renderTile(t,64,8,e,s,h+8,n+8)}}(6),dirt:new class extends u{constructor(i){super(i),this.color=7877903}render(i,t,e,s,h,n){const a=i.getTile(e,s-1).id===this.id,r=i.getTile(e,s+1).id===this.id,o=i.getTile(e-1,s).id===this.id,d=i.getTile(e+1,s).id===this.id,l=i.getTile(e-1,s-1).id===this.id,m=i.getTile(e+1,s-1).id===this.id,g=i.getTile(e-1,s+1).id===this.id,c=i.getTile(e+1,s+1).id===this.id;a||o?a&&o&&!l?i.renderTile(t,72,32,e,s,h,n):i.renderTile(t,o?48:40,a?32:24,e,s,h,n):i.renderTile(t,40,24,e,s,h,n),a||d?a&&d&&!m?i.renderTile(t,64,32,e,s,h+8,n):i.renderTile(t,d?48:56,a?32:24,e,s,h+8,n):i.renderTile(t,56,24,e,s,h+8,n),r||o?r&&o&&!g?i.renderTile(t,72,24,e,s,h,n+8):i.renderTile(t,o?48:40,r?32:40,e,s,h,n+8):i.renderTile(t,40,40,e,s,h,n+8),r||d?r&&d&&!c?i.renderTile(t,64,24,e,s,h+8,n+8):i.renderTile(t,d?48:56,r?32:40,e,s,h+8,n+8):i.renderTile(t,56,40,e,s,h+8,n+8)}}(7),startingPosition:new T(999)},y=Object.entries(x).map((([i,t])=>t));var w,p;(p=w||(w={}))[p.OWNED=1]="OWNED",p[p.VISIBLE=6]="VISIBLE";class M{constructor(i,e,s){t(this,"map2d"),t(this,"imageData"),t(this,"minimapCanvas",document.createElement("canvas")),t(this,"width"),t(this,"height"),this.map2d=i,this.width=e,this.height=s,this.imageData=i.createImageData(e,s),this.minimapCanvas.width=this.imageData.width,this.minimapCanvas.height=this.imageData.height}getRGB(i){return[i>>16&255,i>>8&255,255&i]}render(i,t,e,s){const h=Math.floor(this.map2d.canvas.width/s)-i.width/(e+s+10)-8,n=Math.round(i.width/(e+s+10));for(let a=0;a<this.height;a++)for(let i=0;i<this.width;i++){const e=i+a*this.width,s=t.getTile(i,a),[h,n,r]=this.getRGB(s.color);t.getTileState(i,a,w.OWNED)?(this.imageData.data[4*e]=255,this.imageData.data[4*e+1]=0,this.imageData.data[4*e+2]=0,this.imageData.data[4*e+3]=255):t.getTileState(i,a,w.VISIBLE)>=1?(this.imageData.data[4*e]=h,this.imageData.data[4*e+1]=n,this.imageData.data[4*e+2]=r,this.imageData.data[4*e+3]=255):(this.imageData.data[4*e]=0,this.imageData.data[4*e+1]=0,this.imageData.data[4*e+2]=0,this.imageData.data[4*e+3]=255)}this.minimapCanvas.getContext("2d").putImageData(this.imageData,0,0),this.map2d.drawImage(this.minimapCanvas,h,8,n,n),this.map2d.strokeStyle="rgba(255, 255, 255, 0.35)",this.map2d.strokeRect(h,8,n,n)}}class v extends a{constructor(i,e){super(n,i,e),t(this,"tx",0),t(this,"maxTx",4),t(this,"ty",20),t(this,"movingTx",4),t(this,"maxMovingTx",10),t(this,"moving",!0),t(this,"animation",0),t(this,"movingAnimation",0),t(this,"deadAnimationTx",8),t(this,"maxDeadAnimationTx",14),t(this,"deadAnimation",0),t(this,"isPunching",!1),t(this,"punchTx",16),t(this,"maxPunchAnimationTx",22),t(this,"punchAnimation",0)}render(i,t,e,s){this.isPunching?i.renderEntity(t,8*this.punchTx,1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s):this.isPlayingDeadAnimation||this.isDead?i.renderEntity(t,8*this.deadAnimationTx,1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s):i.renderEntity(t,this.moving?8*this.movingTx:8*this.tx,-1===this.xa||1===this.dirX?8*(this.ty+2):8*this.ty,this.x,this.y,e,s)}update(i){if(this.isPunching)return this.punchAnimation+=1,void(this.punchAnimation%2==0&&(this.punchAnimation=0,this.punchTx+=2,this.punchTx===this.maxPunchAnimationTx&&(this.punchTx=16,this.isPunching=!1)));if(this.isPlayingDeadAnimation)this.playDeadAnimation();else{if(1===this.xa||1===this.ya?(this.moving=!0,this.dirX=0):-1===this.xa||-1===this.ya?(this.moving=!0,this.dirX=1):this.moving=!1,this.move(i)){const t=i.entities.filter((i=>i.getID()===s));let e=!1;t.forEach((i=>{const t=i.getX()-this.x,s=i.getY()-this.y;t*t+s*s<9&&(this.xa=0,this.ya=0,e=!0,t<0&&(this.xa=-1),t>0&&(this.xa=1),s<0&&(this.ya=-1),s>0&&(this.ya=1))})),e||0!==Math.floor(20*Math.random())||(this.xa=Math.floor(3*Math.random())-1,this.ya=Math.floor(3*Math.random())-1)}else this.xa=0,this.ya=0;this.animation+=1,this.movingAnimation+=1,this.animation%5!=0||this.moving||(this.animation=0,this.tx+=2,this.tx%this.maxTx==0&&(this.tx=0)),this.movingAnimation%2==0&&this.moving&&(this.movingAnimation=0,this.movingTx+=2,this.movingTx%this.maxMovingTx==0&&(this.movingTx=4))}}playDeadAnimation(){this.isDead||(this.deadAnimation+=1,this.deadAnimation%2==0&&(this.deadAnimation=0,this.deadAnimationTx+=2,this.deadAnimationTx===this.maxDeadAnimationTx&&(this.isDead=!0)))}}let A=!1,S=!1;window.onload=()=>{A=!0,R()};let D=!1,E=!1,I=0,X=0,b=0,P=0,O=0,k=0;let z=3;let C=0;const Y=(i=>{const t=new Image;return C++,t.onload=()=>{C--,0===C&&R()},t.src=i,t})(e),B=document.querySelector("#map"),N=B.getContext("2d"),L=new class{constructor(){t(this,"scrollX",0),t(this,"scrollY",0),t(this,"keys",[]),window.onkeydown=i=>{this.keys[i.keyCode]=!0},window.onkeyup=i=>{this.keys[i.keyCode]=!1}}update(i,t,e,s,h){return this.scrollX=i,this.scrollY=t,h&&h(0,0),this.keys[87]&&h&&h(0,-1),this.keys[65]&&h&&h(-1,0),this.keys[83]&&h&&h(0,1),this.keys[68]&&h&&h(1,0),this.keys[27]&&e&&e(),this.keys[49]&&s&&s(),[this.scrollX,this.scrollY]}};let V;const W=new Array(1);for(let ni=0;ni<W.length;ni++)W[ni]={name:"Base",imageX:0,imageY:9};const G=new class{constructor(i,s,h){t(this,"tiles"),t(this,"data"),t(this,"tilesState"),t(this,"tileSize",16),t(this,"isBuilding"),t(this,"tickCount",0),t(this,"tileImage"),t(this,"imagesToLoad",0),t(this,"width"),t(this,"height"),t(this,"seed"),t(this,"entities",[]),t(this,"onTopTiles",[]),this.width=i,this.height=s,this.seed=h,this.tiles=new Array(i*s),this.data=new Array(i*s),this.tilesState=new Array(i*s),this.isBuilding=new Array(i*s),this.tileImage=this.loadImage(e)}loadImage(i){var t=new Image;return this.imagesToLoad++,t.onload=()=>{this.imagesToLoad--,0===this.imagesToLoad&&this.init()},t.src=i,t}init(){const i=((i,t,e=Math.random()*Number.MAX_SAFE_INTEGER)=>{for(;;){const s=m(i,t,e),h=new Array(256);for(let e=0;e<i*t;e++)h[255&s[0][e]]++;if(!(h[255&x.rock.id]<100||h[255&x.sand.id]<100||h[255&x.grass.id]<100||h[255&x.tree.id]<100))return s}})(this.width,this.height,this.seed);this.tiles=i[0],this.tilesState=[...i[1]],this.data=[...i[1]],this.tilesState.fill(0),this.isBuilding.fill(0);for(let t=0;t<this.height;t++)for(let i=0;i<this.width;i++){if(this.tiles[i+t*this.width]===x.startingPosition.id)for(let e=0;e<5;e++)this.entities.push(0===Math.round(1*Math.random())?new r(i,t):new o(i,t))}}update(){this.tickCount++,this.tickCount>=Number.MAX_VALUE&&(this.tickCount=0);for(let i=0;i<this.width*this.height/50;i++){const i=Math.round(Math.random()*this.width),t=Math.round(Math.random()*this.height);this.getTile(i,t).update(this,i,t)}this.entities.filter((i=>!i.isDead)).forEach((i=>i.update(this)))}render(i,t,e,s,h){const n=Math.floor(-e/this.tileSize),a=Math.floor(-s/this.tileSize),r=Math.ceil((-e+i.width/h)/this.tileSize),o=Math.ceil((-s+i.height/h)/this.tileSize);for(let d=a;d<o;d++)for(let i=n;i<r;i++){const h=this.getTile(i,d);if(h.isOnGrass){y.find((i=>i.id===x.grass.id)).render(this,t,i,d,e,s)}else if(h.isOnSand){y.find((i=>i.id===x.sand.id)).render(this,t,i,d,e,s)}h.render(this,t,i,d,e,s)}for(let d=a;d<o;d++)for(let i=n;i<r;i++){1===this.getTileState(i,d,1)&&f.tent.render(this,t,i,d,e,s)}this.entities.forEach((i=>i.render(this,t,e,s))),this.onTopTiles.forEach((i=>{this.renderTile(t,i.sx,i.sy,i.x,i.y,i.xExtraOffset+e,i.yExtraOffset+s,i.dw,i.dh)}));for(let d=a;d<o;d++)for(let i=n;i<r;i++){const h=this.getTileState(i,d,6);if(1===h)t.drawImage(this.tileImage,240,16,8,8,i*this.tileSize+e+0,d*this.tileSize+s+0,8,8),t.drawImage(this.tileImage,240,16,8,8,i*this.tileSize+e+8,d*this.tileSize+s+0,8,8),t.drawImage(this.tileImage,240,16,8,8,i*this.tileSize+e+0,d*this.tileSize+s+8,8,8),t.drawImage(this.tileImage,240,16,8,8,i*this.tileSize+e+8,d*this.tileSize+s+8,8,8);else for(let n=0;n<4;n++){const a=n%2*2-1,r=2*(n>>1)-1,o=this.getTileState(i,d+r,6)!==h,l=this.getTileState(i+a,d,6)!==h;let m=25,g=1;3===h&&(g+=3),o&&(g+=r),l&&(m+=a),t.drawImage(this.tileImage,8*m,8*g,8,8,i*this.tileSize+e+n%2*8,d*this.tileSize+s+8*(n>>1),8,8)}}}renderEntity(i,t,e,s,h,n,a){i.drawImage(this.tileImage,t,e,this.tileSize,this.tileSize,s*this.tileSize+n,h*this.tileSize+a,this.tileSize,this.tileSize)}renderTile(i,t,e,s,h,n,a,r=8,o=8){i.drawImage(this.tileImage,t,e,8,8,s*this.tileSize+n,h*this.tileSize+a,r,o)}getTile(i,t){if(i<0||t<0||i>=this.width||t>=this.height)return x.water;const e=y.find((e=>this.tiles[i+t*this.width]===e.id));return null!=e?e:x.water}getBuilding(i,t){if(i<0||t<0||i>=this.width||t>=this.height)return;return this.isBuilding[i+t*this.width]?f.tent:void 0}getTileState(i,t,e){return i<0||t<0||i>=this.width||t>=this.height?0:6===e?(this.tilesState[i+t*this.width]&e)>>1:this.tilesState[i+t*this.width]&e}setTileState(i,t,e,s){if(!(i<0||t<0||i>=this.width||t>=this.height))if(6===s){const s=this.tilesState[i+t*this.width];this.tilesState[i+t*this.width]=e<<1|1&s}else this.tilesState[i+t*this.width]^=e,this.setBuilding(i,t)}setBuilding(i,t){for(let e=0;e<1;e++)for(let s=-1;s<2;s++){const h=i+s,n=t-e,a=h+n*this.width;if(this.isBuilding[a]){this.isBuilding[a]=0;const i=this.onTopTiles.findIndex((i=>i.x===h-.75&&i.y===n-1));i>-1&&this.onTopTiles.splice(i,10)}else{this.tiles[a]=x.dirt.id,this.isBuilding[a]=1;for(let i=0;i<2;i++){const i=this.onTopTiles.findIndex((i=>i.x===h&&i.y===n));i>-1&&this.onTopTiles.splice(i,1)}}}}setTile(i,t,e){i<0||t<0||i>=this.width||t>=this.height||(this.tiles[i+t*this.width]=e.id)}setData(i,t,e){i<0||t<0||i>=this.width||t>=this.height||(this.data[i+t*this.width]=e)}getData(i,t){return i<0||t<0||i>=this.width||t>=this.height?0:255&this.data[i+t*this.width]}recalcVisibility(){for(let i=0;i<this.height;i++)for(let t=0;t<this.width;t++){let e=this.getTileState(t,i,6);3===e&&(e>>=1),this.setTileState(t,i,e,6)}for(let i=0;i<this.height;i++)for(let t=0;t<this.width;t++){this.getTileState(t,i,1)&&this.revealTile(t,i,4)}}revealTile(i,t,e){for(let s=t-e;s<=t+e;s++)if(!(s<0||s>=this.height))for(let h=i-e;h<=i+e;h++){if(h<0||h>=this.width)continue;const n=h-i,a=s-t;if(n*n+a*a<=e*e+2){if(0===s||0===h||h===this.width-1||s===this.height-1)continue;this.setTileState(h,s,3,6)}}}}(128,128),R=()=>{if(A&&!(C>0)){if(B.width=window.innerWidth,B.height=window.innerHeight,V=new M(N,128,128),B.onmousedown=i=>{i.preventDefault(),D=!0,E=!1,I=i.clientX,X=i.clientY},B.onclick=i=>{if(D=!1,!E){const t=Math.floor(b+16*-O+window.innerWidth/z/2),e=Math.floor(P+16*-k+window.innerHeight/z/2),h=Math.floor((i.clientX/z-t)/16),n=Math.floor((i.clientY/z-e)/16);H(h,n,i.clientX/z,i.clientY/z),G.entities.forEach((i=>{h===Math.round(i.getX())&&n===Math.round(i.getY())&&i.getID()===s&&(i.isControlled=!0)}))}},window.onmousemove=i=>{if(!D)return;i.preventDefault();const t=i.clientX-I,e=i.clientY-X;(E||t*t+e*e>64)&&(E=!0,b+=t/z,P+=e/z,I=i.clientX,X=i.clientY)},!S){for(let i=0;i<128;i++)for(let t=0;t<128;t++){const e=t+128*i;G.tiles[e]===x.startingPosition.id&&(O=t,k=i,G.setTileState(O,k,1,w.OWNED),G.recalcVisibility())}J(),S=!0}Z()}};window.onresize=R;let F=null,q=null,_=!1;const H=(i,t,e=800,s=600)=>{const h=Math.floor(N.canvas.width/z),n=Math.floor(N.canvas.height/z);if(e>=0&&e<=h&&s>=n-35&&s<=n&&F&&q){return void(G.getTile(F,q).isPassable&&si(e,s))}if(i<0||t<0||i>128||t>128)return F=null,void(q=null);const a=G.getTileState(i,t,w.VISIBLE);if(0===a)return F=null,void(q=null);F===i&&q===t||(F=i,q=t,_=3===a)};let U=Date.now(),j=Date.now(),K=0;const J=()=>{requestAnimationFrame(J),U=j,j=Date.now(),K+=j-U,K>=60&&(K=0,Q());const i=L.update(b,P,(()=>{}),(()=>{if(F&&q){for(let i=0;i<5;i++)G.entities.push(new v(F,q));G.setTileState(F,q,1,w.OWNED),G.recalcVisibility(),F=null,q=null}}),((i,t)=>{const e=G.entities.find((i=>i.isControlled));e&&(e.xa=i,e.ya=t)}));b===i[0]&&P===i[1]||(b=i[0],P=i[1]),Z()},Q=()=>{G.update()},Z=()=>{z=Math.max(Math.floor(B.height/300+1),Math.floor(B.width/(16/9*300)+1)),b>16*O&&(b=16*O),P>16*k&&(P=16*k),b<16*O-2016&&(b=16*O-2016),P<16*k-2016&&(P=16*k-2016),N.imageSmoothingEnabled=!1,N.setTransform(z,0,0,z,0,0);const i=Math.floor(b+16*-O+window.innerWidth/z/2),t=Math.floor(P+16*-k+window.innerHeight/z/2);G.render(B,N,i,t,z);for(var e=0;e<W.length;e++){const i=Math.floor(N.canvas.width/z),t=Math.floor(N.canvas.height/z);N.fillStyle="rgba(255, 255, 255, 0.3)",N.fillRect(0,t-35,i,t),ei(W[e].name,i/2+2,t-25-5,3),hi(W[e].imageX,W[e].imageY,i/2,t-25)}if(F&&q&&(N.strokeStyle="white",N.strokeRect(16*F+i,16*q+t,16,16),_)){const e=G.getTile(F,q).getOutcome();e&&(N.fillStyle="rgba(0, 0, 0, 0.3)",N.fillRect(16*F+i+16,16*q+t,18,16),N.drawImage(Y,8*c[e.type].imageX,8*c[e.type].imageY,8,8,16*F+i+18,16*q+t+4,8,8),ei(`${e.amount}`,16*F+i+27,16*q+t+5,5))}ii(),V.render(B,G,16,z)},$=[{imageX:0,imageY:11},{imageX:1,imageY:11}],ii=()=>{for(let i=0;i<$.length;i++)N.drawImage(Y,8*$[i].imageX,8*$[i].imageY,8,8,4,4+14*i,8,8),ei("0",14,5+14*i,6)},ti="ABCDEFGHIJKLMNOPQRSTUVWXYZ      0123456789.,!?'\":;()+-=*/\\%     ",ei=(i,t,e,s=8)=>{i=i.toUpperCase();for(var h=0;h<i.length;h++){var n=ti.indexOf(i.charAt(h)),a=0+n%32,r=29+(n>>5);N.drawImage(Y,8*a,8*r,8,8,t+h*s,e,s,s)}},si=(i,t)=>{const e=Math.floor(N.canvas.width/z)/2,s=Math.floor(N.canvas.height/z)-25;i>=e&&i<=e+16&&t>=s&&t<=s+16&&F&&q&&(G.setTileState(F,q,1,w.OWNED),G.recalcVisibility(),F=null,q=null)},hi=(i,t,e,s)=>{N.beginPath(),N.strokeStyle="yellow",N.rect(e,s,16,16),N.stroke(),N.drawImage(Y,8*i,8*t,16,16,e,s,16,16)};
