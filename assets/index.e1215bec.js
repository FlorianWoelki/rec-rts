var A=Object.defineProperty,t=("undefined"!=typeof require&&require,(t,e,r)=>(((t,e,r)=>{e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r})(t,"symbol"!=typeof e?e+"":e,r),r));!function(){const A=document.createElement("link").relList;if(!(A&&A.supports&&A.supports("modulepreload"))){for(const A of document.querySelectorAll('link[rel="modulepreload"]'))t(A);new MutationObserver((A=>{for(const e of A)if("childList"===e.type)for(const A of e.addedNodes)"LINK"===A.tagName&&"modulepreload"===A.rel&&t(A)})).observe(document,{childList:!0,subtree:!0})}function t(A){if(A.ep)return;A.ep=!0;const t=function(A){const t={};return A.integrity&&(t.integrity=A.integrity),A.referrerpolicy&&(t.referrerPolicy=A.referrerpolicy),"use-credentials"===A.crossorigin?t.credentials="include":"anonymous"===A.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(A);fetch(A.href,t)}}();class e{constructor(A,e,r){t(this,"w"),t(this,"h"),t(this,"values"),this.w=A,this.h=e,this.values=new Array(A*e);for(let t=0;t<e;t+=r)for(let e=0;e<A;e+=r)this.setSample(e,t,2*Math.random()-1);let o=r,i=1/A,s=1;do{const t=o/2;for(let r=0;r<e;r+=o)for(let e=0;e<A;e+=o){const A=(this.sample(e,r)+this.sample(e+o,r)+this.sample(e,r+o)+this.sample(e+o,r+o))/4+(2*Math.random()-1)*o*i;this.setSample(e+t,r+t,A)}for(let e=0;e<A;e+=o)for(let r=0;r<A;r+=o){const A=this.sample(r,e),s=this.sample(r+o,e),a=this.sample(r,e+o),n=this.sample(r+t,e+t),l=this.sample(r+t,e-t),h=this.sample(r-t,e+t),d=(A+s+n+l)/4+(2*Math.random()-1)*o*i*.5,c=(A+a+n+h)/4+(2*Math.random()-1)*o*i*.5;this.setSample(r+t,e,d),this.setSample(r,e+t,c)}o/=2,i*=s+.8,s*=.3}while(o>1)}sample(A,t){return this.values[(A&this.w-1)+(t&this.h-1)*this.w]}setSample(A,t,e){this.values[(A&this.w-1)+(t&this.h-1)*this.w]=e}}const r=(A,t)=>{const r=new e(A,t,16),o=new e(A,t,16),s=new e(A,t,16),a=new e(A,t,32),n=new e(A,t,32),l=new Array(A*t),h=new Array(A*t);for(let e=0;e<t;e++)for(let h=0;h<A;h++){const d=h+e*A;let c=3*Math.abs(a.values[d]-n.values[d])-2,f=Math.abs(r.values[d]-o.values[d]);f=3*Math.abs(f-s.values[d])-2;let g=h/(A-1)*2-1,w=e/(t-1)*2-1;g<0&&(g=-g),w<0&&(w=-w);let m=g>=w?g:w;m*=m*m*m,m*=m*m*m,c=c+1-20*m,l[d]=c<-.5?i.water.id:i.grass.id}for(let e=0;e<A*t/2800;e++){let e=Math.round(Math.random()*A),r=Math.round(Math.random()*t);for(let o=0;o<10;o++){let o=e+Math.round(21*Math.random()-10),s=r+Math.round(21*Math.random()-10);for(let e=0;e<100;e++){let e=o+Math.round(5*Math.random())-Math.round(5*Math.random()),r=s+Math.round(5*Math.random())-Math.round(5*Math.random());for(let o=r-1;o<=r+1;o++)for(let r=e-1;r<=e+1;r++)r>=0&&o>=0&&r<A&&o<t&&1==l[r+o*A]&&(l[r+o*A]=i.sand.id)}}}for(let e=0;e<A*t/400;e++){const e=Math.round(Math.random()*A),r=Math.round(Math.random()*t);for(let o=0;o<200;o++){const o=e+Math.round(15*Math.random())-Math.round(15*Math.random()),s=r+Math.round(15*Math.random())-Math.round(15*Math.random());o>=0&&s>=0&&o<A&&s<t&&l[o+s*A]==i.grass.id&&(l[o+s*A]=i.tree.id)}}return[l,h]};class o{constructor(A){t(this,"id"),this.id=A}}const i={water:new class extends o{}(0),grass:new class extends o{}(1),sand:new class extends o{}(2),tree:new class extends o{}(3)};let s=!1;window.onload=()=>{s=!0,B()},window.onresize=B;let a=!1,n=!1,l=0,h=0,d=0,c=0;var f=3;var g,w,m=(g="data:image/png;base64,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",w=new Image,u++,w.onload=function(){0==--u&&B()},w.src=g,w),u=0;const v=document.querySelector("#map"),M=v.getContext("2d"),p=new class{constructor(){t(this,"scrollX",0),t(this,"scrollY",0),t(this,"scrollSpeed",2),t(this,"keys",[]),window.onkeydown=A=>{this.keys[A.keyCode]=!0},window.onkeyup=A=>{this.keys[A.keyCode]=!1,this.scrollX=0,this.scrollY=0}}update(A){this.keys[87]&&(this.scrollY+=this.scrollSpeed,A()),this.keys[65]&&(this.scrollX+=this.scrollSpeed,A()),this.keys[83]&&(this.scrollY-=this.scrollSpeed,A()),this.keys[68]&&(this.scrollX-=this.scrollSpeed,A())}};var D=new Array(6);for(let U=0;U<D.length;U++)D[U]={name:"Base",imageX:0,imageY:6};const I=new class{constructor(A,e){t(this,"tiles"),t(this,"width"),t(this,"height"),this.width=A,this.height=e,this.tiles=new Array(A*e),this.init()}init(){const A=((A,t)=>{for(;;){const e=r(A,t),o=new Array(256);for(let r=0;r<A*t;r++)o[255&e[0][r]]++;if(!(o[2]<100||o[1]<100))return e}})(this.width,this.height);for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)this.tiles[e+t*this.height]={visible:0,owned:!1,tileId:A[0][e+t*this.height]}}}(128,128);async function B(){if(s&&!(u>0)){v.width=window.innerWidth,v.height=window.innerHeight,v.onmousedown=function(A){A.preventDefault(),a=!0,n=!1,l=A.clientX,h=A.clientY},v.onclick=function(A){if(a=!1,!n){var t=Math.floor(d+(v.width/f-2048)/2),e=Math.floor(c+(v.height/f-2048)/2);y(Math.floor((A.clientX/f-t)/16),Math.floor((A.clientY/f-e)/16))}};var A=Math.floor(d+(v.width/f-2048)/2),t=Math.floor(c+(v.height/f-2048)/2);y(Math.floor((800/f-A)/16),Math.floor((600/f-t)/16)),window.onmousemove=function(A){if(a){A.preventDefault();var t=A.clientX-l,e=A.clientY-h;(n||t*t+e*e>64)&&(n=!0,d+=t/f,c+=e/f,l=A.clientX,h=A.clientY,requestAnimationFrame(P))}},C()}}function y(A,t){if(A>0&&t>0&&A<128&&t<128){var e=H(A,t);e.owned=!e.owned,function(){for(var A=0;A<128;A++)for(var t=0;t<128;t++){I.tiles[t+128*A].visible&=1}for(A=0;A<128;A++)for(t=0;t<128;t++){I.tiles[t+128*A].owned&&Q(t,A,4)}}()}requestAnimationFrame(P)}function Q(A,t,e){for(var r=t-e;r<=t+e;r++)if(!(r<0||r>=128))for(var o=A-e;o<=A+e;o++)if(!(o<0||o>=128)){var i=o-A,s=r-t;if(i*i+s*s<=e*e+2){if(0===r||0===o||127===o||127===r)continue;I.tiles[o+128*r].visible=3}}}const C=()=>{0!==p.scrollX&&(d=p.scrollX),0!==p.scrollY&&(c=p.scrollY),requestAnimationFrame(C),p.update(P)};function P(){f=Math.max(Math.floor(v.height/300+1),Math.floor(v.width/(16/9*300)+1));var A=Math.max(0,2112-v.width/f)/2,t=Math.max(0,2112-v.height/f)/2;d<-A&&(d=-A),c<-t&&(c=-t),d>A&&(d=A),c>t&&(c=t),M.imageSmoothingEnabled=!1,M.setTransform(f,0,0,f,0,0);for(var e=Math.floor(d+(v.width/f-2048)/2),r=Math.floor(c+(v.height/f-2048)/2),o=Math.floor(-e/16),s=Math.floor(-r/16),a=Math.ceil((-e+v.width/f)/16),n=Math.ceil((-r+v.height/f)/16),l=s;l<n;l++)for(var h=o;h<a;h++){var g=H(h,l);if(g.tileId===i.sand.id)M.drawImage(m,40,0,8,8,16*h+e+0,16*l+r+0,8,8),M.drawImage(m,40,0,8,8,16*h+e+8,16*l+r+0,8,8),M.drawImage(m,40,0,8,8,16*h+e+0,16*l+r+8,8,8),M.drawImage(m,40,0,8,8,16*h+e+8,16*l+r+8,8,8);else if(g.tileId===i.grass.id||g.tileId===i.tree.id){for(var w=0;w<4;w++){var u=w%2*2-1,p=H(h,l+(C=2*(w>>1)-1)).tileId!==g.tileId,I=H(h+u,l).tileId!==g.tileId,B=H(h+u,l+C).tileId!==g.tileId,y=1,Q=4;p&&(Q+=C),I&&(y+=u),p||I||!B||(y+=3-w%2,Q-=w>>1),M.drawImage(m,8*y,8*Q,8,8,16*h+e+w%2*8,16*l+r+8*(w>>1),8,8)}g.tileId===i.tree.id&&(M.drawImage(m,16,48,8,8,16*h+e+0,16*l+r+0,8,8),M.drawImage(m,24,48,8,8,16*h+e+8,16*l+r+0,8,8),M.drawImage(m,16,56,8,8,16*h+e+0,16*l+r+8,8,8),M.drawImage(m,24,56,8,8,16*h+e+8,16*l+r+8,8,8))}else for(w=0;w<4;w++){var C;u=w%2*2-1,p=H(h,l+(C=2*(w>>1)-1)).tileId!==g.tileId,I=H(h+u,l).tileId!==g.tileId,B=H(h+u,l+C).tileId!==g.tileId,y=1,Q=1+3*g.tileId;p&&(Q+=C),I&&(y+=u),p||I||!B||(y+=3-w%2,Q-=w>>1),M.drawImage(m,8*y,8*Q,8,8,16*h+e+w%2*8,16*l+r+8*(w>>1),8,8)}g.owned&&M.drawImage(m,0,48,16,16,16*h+e,16*l+r,16,16)}b("GOLD: 500",4,4),b("FOOD: 0/100",4,14),M.beginPath(),M.fillStyle="rgba(255, 255, 255, 0.3)",M.fillRect(0,30,24,24*D.length+6),M.stroke();for(w=0;w<D.length;w++)b(D[w].name,6,34+24*w,3),L(D[w].imageX,D[w].imageY,4,38+24*w)}function H(A,t){return A<0||t<0||A>=128||t>=128?I.tiles[0]:I.tiles[A+128*t]}var X="ABCDEFGHIJKLMNOPQRSTUVWXYZ      0123456789.,!?'\":;()+-=*/\\%     ";function b(A,t,e,r=8){A=A.toUpperCase();for(var o=0;o<A.length;o++){var i=X.indexOf(A.charAt(o)),s=0+i%32,a=29+(i>>5);M.drawImage(m,8*s,8*a,8,8,t+o*r,e,r,r)}}function L(A,t,e,r){M.beginPath(),M.strokeStyle="yellow",M.rect(e,r,16,16),M.stroke(),M.drawImage(m,8*A,8*t,16,16,e,r,16,16)}
