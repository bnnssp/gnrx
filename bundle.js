var I=Symbol("Comlink.proxy"),j=Symbol("Comlink.endpoint"),W=Symbol("Comlink.releaseProxy"),R=Symbol("Comlink.finalizer"),E=Symbol("Comlink.thrown"),L=e=>typeof e=="object"&&e!==null||typeof e=="function",D={canHandle:e=>L(e)&&e[I],serialize(e){let{port1:t,port2:n}=new MessageChannel;return O(e,t),[n,[n]]},deserialize(e){return e.start(),F(e)}},B={canHandle:e=>L(e)&&E in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},M=new Map([["proxy",D],["throw",B]]);function $(e,t){for(let n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function O(e,t=globalThis,n=["*"]){t.addEventListener("message",function i(o){if(!o||!o.data)return;if(!$(n,o.origin)){console.warn(`Invalid origin '${o.origin}' for comlink proxy`);return}let{id:a,type:r,path:s}=Object.assign({path:[]},o.data),c=(o.data.argumentList||[]).map(g),l;try{let d=s.slice(0,-1).reduce((p,u)=>p[u],e),h=s.reduce((p,u)=>p[u],e);switch(r){case"GET":l=h;break;case"SET":d[s.slice(-1)[0]]=g(o.data.value),l=!0;break;case"APPLY":l=h.apply(d,c);break;case"CONSTRUCT":{let p=new h(...c);l=J(p)}break;case"ENDPOINT":{let{port1:p,port2:u}=new MessageChannel;O(e,u),l=X(p,[p])}break;case"RELEASE":l=void 0;break;default:return}}catch(d){l={value:d,[E]:0}}Promise.resolve(l).catch(d=>({value:d,[E]:0})).then(d=>{let[h,p]=b(d);t.postMessage(Object.assign(Object.assign({},h),{id:a}),p),r==="RELEASE"&&(t.removeEventListener("message",i),P(t),R in e&&typeof e[R]=="function"&&e[R]())}).catch(d=>{let[h,p]=b({value:new TypeError("Unserializable return value"),[E]:0});t.postMessage(Object.assign(Object.assign({},h),{id:a}),p)})}),t.start&&t.start()}function G(e){return e.constructor.name==="MessagePort"}function P(e){G(e)&&e.close()}function F(e,t){return x(e,[],t)}function y(e){if(e)throw new Error("Proxy has been released and is not useable")}function z(e){return f(e,{type:"RELEASE"}).then(()=>{P(e)})}var v=new WeakMap,w="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{let t=(v.get(e)||0)-1;v.set(e,t),t===0&&z(e)});function q(e,t){let n=(v.get(t)||0)+1;v.set(t,n),w&&w.register(e,t,e)}function Y(e){w&&w.unregister(e)}function x(e,t=[],n=function(){}){let i=!1,o=new Proxy(n,{get(a,r){if(y(i),r===W)return()=>{Y(o),z(e),i=!0};if(r==="then"){if(t.length===0)return{then:()=>o};let s=f(e,{type:"GET",path:t.map(c=>c.toString())}).then(g);return s.then.bind(s)}return x(e,[...t,r])},set(a,r,s){y(i);let[c,l]=b(s);return f(e,{type:"SET",path:[...t,r].map(d=>d.toString()),value:c},l).then(g)},apply(a,r,s){y(i);let c=t[t.length-1];if(c===j)return f(e,{type:"ENDPOINT"}).then(g);if(c==="bind")return x(e,t.slice(0,-1));let[l,d]=T(s);return f(e,{type:"APPLY",path:t.map(h=>h.toString()),argumentList:l},d).then(g)},construct(a,r){y(i);let[s,c]=T(r);return f(e,{type:"CONSTRUCT",path:t.map(l=>l.toString()),argumentList:s},c).then(g)}});return q(o,e),o}function V(e){return Array.prototype.concat.apply([],e)}function T(e){let t=e.map(b);return[t.map(n=>n[0]),V(t.map(n=>n[1]))]}var _=new WeakMap;function X(e,t){return _.set(e,t),e}function J(e){return Object.assign(e,{[I]:!0})}function b(e){for(let[t,n]of M)if(n.canHandle(e)){let[i,o]=n.serialize(e);return[{type:"HANDLER",name:t,value:i},o]}return[{type:"RAW",value:e},_.get(e)||[]]}function g(e){switch(e.type){case"HANDLER":return M.get(e.name).deserialize(e.value);case"RAW":return e.value}}function f(e,t,n){return new Promise(i=>{let o=K();e.addEventListener("message",function a(r){!r.data||!r.data.id||r.data.id!==o||(e.removeEventListener("message",a),i(r.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)})}function K(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Q=F(new Worker(new URL("./wrk/ffs.js",self.location))),H=(e,t,n)=>Q.findSolution(e,t,n);var C=class{constructor(t=document.body){this.container=t,this.controllers=[],this.hidden=!1}addSlider(t,n,i,o=0,a=100,r=1){let s=this._createUIItem(t),c=document.createElement("input");c.className="slider",c.type="range",c.min=o,c.max=a,c.step=r,c.value=n[i];let l=document.createElement("span");l.textContent=c.value,c.oninput=()=>{n[i]=parseFloat(c.value),l.textContent=c.value},s.appendChild(c),s.appendChild(l),this.container.appendChild(s)}addCheckbox(t,n,i){let o=this._createUIItem(t),a=document.createElement("input");a.type="checkbox",a.checked=n[i],a.onchange=()=>{n[i]=a.checked},o.appendChild(a),this.container.appendChild(o)}addDropdown(t,n,i,o){let a=this._createUIItem(t),r=document.createElement("select");for(let[s,c]of Object.entries(o)){let l=document.createElement("option");l.value=c,l.textContent=s,r.appendChild(l)}r.value=n[i],r.onchange=()=>{n[i]=parseFloat(r.value)},a.appendChild(r),this.container.appendChild(a)}addButton(t,n){let i=this._createUIItem(""),o=document.createElement("button");o.textContent=t,o.className="neumorphic-button",o.onclick=n,i.appendChild(o),this.container.appendChild(i)}addInfo(t,n){let i=this._createUIItem(t),o=document.createElement("div");o.className="info",o.textContent=n,i.appendChild(o),this.container.appendChild(i)}toggleMenu(){this.hidden=!this.hidden,this.container.classList.toggle("hidden",this.hidden)}_createUIItem(t){let n=document.createElement("div");if(n.className="ui-item",t){let i=document.createElement("label");i.textContent=t,n.appendChild(i)}return n}};function Z(e){m(1,1),m(4,5),m(3,4),m(4,3),m(3,2),m(2,1),m(2,3),m(3,5),m(1,2),ee(e)}var k=[];function m(e,t){let n=e/t,i=document.createElement("div");i.className="card-container";let o=document.createElement("div");o.style.backgroundColor="hsl(0, 0%, 90%)",n<=1?(o.style.width="50px",o.style.height=50/n+"px"):(o.style.height="50px",o.style.width=50*n+"px");let a=0,r=document.createElement("p");r.innerText=`${e}:${t}`,o.append(r);let s=document.createElement("p");s.innerHTML=`amount: <span class='span-amount'> ${a} </span>`,s.style.fontSize="1em",i.append(s),i.append(o),i.addEventListener("click",()=>{a++,s.innerHTML=`amount: <span class='span-amount'> ${a} </span>`,k.push([e,t])}),S.append(i)}function ee(e){let t=document.createElement("div");t.innerText="run",t.style.position="absolute",t.style.cursor="pointer",t.style.right="5vw",t.style.bottom="10vh",t.style.fontSize="4em",t.style.rotate="-90deg",t.addEventListener("click",()=>{k[0]!==void 0&&(document.querySelector(".menu-wraper").style.display="none",e(k))}),S.append(t)}function te(e){let t=document.createElement("div");return t.innerText="next",t.style.position="absolute",t.style.cursor="pointer",t.style.right="5vw",t.style.bottom="10vh",t.style.fontSize="4em",t.style.rotate="-90deg",t}function U(e,t){let n=2,i=1,o=document.createElement("div"),a=document.createElement("input");a.className="inputAR",a.value=n,a.oninput=s=>{n=s.target.value};let r=document.createElement("input");r.className="inputAR",r.value=i,r.oninput=s=>{i=s.target.value},button=te(t),button.addEventListener("click",()=>{o.innerHTML="",e.CONTAINER_AR=i/n,Z(t)}),o.append(a,r,button),S.append(o)}var S=document.querySelector(".menu-container");function ne(e,t){return{dimension:{width:e,height:t},aspectRatio:e/t,url:""}}var oe=["#0000f3","#FF243A","#3CFF00","#373636","#EEFF00","#33FF92","#B813FF"],A={CONTAINER_AR:0};U(A,ie);new C(document.getElementById("uiContainer"));function ie(e){let t=document.createElement("canvas");t.width=window.innerWidth,t.height=window.innerHeight,t.onclick=()=>r(),document.body.append(t);let n=20,i={width:0,height:0};i.width=t.width-n,i.height=i.width*A.CONTAINER_AR,i.height>t.height&&(i.height=t.height,i.width=i.height/A.CONTAINER_AR);let o=[];for(let s of e)o.push(ne(s[0],s[1]));o.sort((s,c)=>s.aspectRatio-c.aspectRatio);let a=t.getContext("2d");function r(){H(o,i,{randomizeThreshold:1}).then(c=>{a.clearRect(0,0,t.width,t.height),c.pictures.sort((u,N)=>u.dimension.width/u.dimension.height-N.dimension.width/N.dimension.height);let l=0,d=0,h=o[0].aspectRatio,p=h;for(let u of c.pictures)a?.beginPath(),h=o[l].aspectRatio,h!==p&&(d++,p=h),a.fillStyle=oe[0],a?.fillRect(u.position.x+n*.5,u.position.y+n*.5,u.dimension.width,u.dimension.height),a.strokeStyle="white",a.lineWidth=1,a?.strokeRect(u.position.x+n*.5,u.position.y+n*.5,u.dimension.width,u.dimension.height),a.lineWidth=1,a?.beginPath(),a.strokeStyle="black",a?.strokeRect(n*.5,n*.5,i.width,i.height),l++})}r()}

