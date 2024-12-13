(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const St="modulepreload",Pt=function(o,t){return new URL(o,t).href},rt={},ot=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){const n=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),h=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.allSettled(e.map(l=>{if(l=Pt(l,i),l in rt)return;rt[l]=!0;const d=l.endsWith(".css"),c=d?'[rel="stylesheet"]':"";if(!!i)for(let g=n.length-1;g>=0;g--){const B=n[g];if(B.href===l&&(!d||B.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${c}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":St,d||(u.as="script"),u.crossOrigin="",u.href=l,h&&u.setAttribute("nonce",h),document.head.appendChild(u),d)return new Promise((g,B)=>{u.addEventListener("load",g),u.addEventListener("error",()=>B(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(n){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n}return s.then(n=>{for(const a of n||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,Y=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),nt=new WeakMap;let gt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(e,t))}return t}toString(){return this.cssText}};const xt=o=>new gt(typeof o=="string"?o:o+"",void 0,Q),T=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new gt(e,o,Q)},Ct=(o,t)=>{if(Y)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=z.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},at=Y?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return xt(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Tt,defineProperty:kt,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:Ut,getOwnPropertySymbols:Rt,getPrototypeOf:jt}=Object,v=globalThis,ht=v.trustedTypes,Lt=ht?ht.emptyScript:"",K=v.reactiveElementPolyfillSupport,O=(o,t)=>o,I={toAttribute(o,t){switch(t){case Boolean:o=o?Lt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},V=(o,t)=>!Tt(o,t),lt={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:V};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&kt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=Ot(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return s==null?void 0:s.call(this)},set(n){const a=s==null?void 0:s.call(this);r.call(this,n),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;const t=jt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){const e=this.properties,i=[...Ut(e),...Rt(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(at(s))}else t!==void 0&&e.push(at(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ct(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:I).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const n=i.getPropertyOptions(s),a=typeof n.converter=="function"?{fromAttribute:n.converter}:((r=n.converter)==null?void 0:r.fromAttribute)!==void 0?n.converter:I;this._$Em=s,this[s]=a.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??V)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[O("elementProperties")]=new Map,x[O("finalized")]=new Map,K==null||K({ReactiveElement:x}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=globalThis,q=U.trustedTypes,ct=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,_t="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+_,Mt=`<${vt}>`,S=document,R=()=>S.createComment(""),j=o=>o===null||typeof o!="object"&&typeof o!="function",X=Array.isArray,Nt=o=>X(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",F=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,pt=/>/g,E=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,ft=/"/g,bt=/^(?:script|style|textarea|title)$/i,Ht=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),f=Ht(1),P=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$t=new WeakMap,w=S.createTreeWalker(S,129);function At(o,t){if(!X(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}const Bt=(o,t)=>{const e=o.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",n=k;for(let a=0;a<e;a++){const h=o[a];let l,d,c=-1,y=0;for(;y<h.length&&(n.lastIndex=y,d=n.exec(h),d!==null);)y=n.lastIndex,n===k?d[1]==="!--"?n=dt:d[1]!==void 0?n=pt:d[2]!==void 0?(bt.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=E):d[3]!==void 0&&(n=E):n===E?d[0]===">"?(n=s??k,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,l=d[1],n=d[3]===void 0?E:d[3]==='"'?ft:ut):n===ft||n===ut?n=E:n===dt||n===pt?n=k:(n=E,s=void 0);const u=n===E&&o[a+1].startsWith("/>")?" ":"";r+=n===k?h+Mt:c>=0?(i.push(l),h.slice(0,c)+_t+h.slice(c)+_+u):h+_+(c===-2?a:u)}return[At(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class L{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const a=t.length-1,h=this.parts,[l,d]=Bt(t,e);if(this.el=L.createElement(l,i),w.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=w.nextNode())!==null&&h.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(_t)){const y=d[n++],u=s.getAttribute(c).split(_),g=/([.?@])?(.*)/.exec(y);h.push({type:1,index:r,name:g[2],strings:u,ctor:g[1]==="."?It:g[1]==="?"?qt:g[1]==="@"?Dt:W}),s.removeAttribute(c)}else c.startsWith(_)&&(h.push({type:6,index:r}),s.removeAttribute(c));if(bt.test(s.tagName)){const c=s.textContent.split(_),y=c.length-1;if(y>0){s.textContent=q?q.emptyScript:"";for(let u=0;u<y;u++)s.append(c[u],R()),w.nextNode(),h.push({type:2,index:++r});s.append(c[y],R())}}}else if(s.nodeType===8)if(s.data===vt)h.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(_,c+1))!==-1;)h.push({type:7,index:r}),c+=_.length-1}r++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function C(o,t,e=o,i){var n,a;if(t===P)return t;let s=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const r=j(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=C(o,s._$AS(o,t.values),s,i)),t}class zt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??S).importNode(e,!0);w.currentNode=s;let r=w.nextNode(),n=0,a=0,h=i[0];for(;h!==void 0;){if(n===h.index){let l;h.type===2?l=new H(r,r.nextSibling,this,t):h.type===1?l=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&(l=new Vt(r,this,t)),this._$AV.push(l),h=i[++a]}n!==(h==null?void 0:h.index)&&(r=w.nextNode(),n++)}return w.currentNode=S,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class H{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),j(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==P&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=L.createElement(At(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const n=new zt(s,this),a=n.u(this.options);n.p(e),this.T(a),this._$AH=n}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new L(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new H(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class W{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(r===void 0)t=C(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{const a=t;let h,l;for(t=r[0],h=0;h<r.length-1;h++)l=C(this,a[i+h],e,h),l===P&&(l=this._$AH[h]),n||(n=!j(l)||l!==this._$AH[h]),l===p?t=p:t!==p&&(t+=(l??"")+r[h+1]),this._$AH[h]=l}n&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class It extends W{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class qt extends W{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class Dt extends W{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??p)===P)return;const i=this._$AH,s=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Vt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const J=U.litHtmlPolyfillSupport;J==null||J(L,H),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.2.1");const Wt=(o,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new H(t.insertBefore(R(),r),r,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let b=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return P}};var yt;b._$litElement$=!0,b.finalized=!0,(yt=globalThis.litElementHydrateSupport)==null||yt.call(globalThis,{LitElement:b});const Z=globalThis.litElementPolyfillSupport;Z==null||Z({LitElement:b});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kt={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:V},Ft=(o=Kt,t,e)=>{const{kind:i,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),r.set(e.name,o),i==="accessor"){const{name:n}=e;return{set(a){const h=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,h,o)},init(a){return a!==void 0&&this.P(n,void 0,o),a}}}if(i==="setter"){const{name:n}=e;return function(a){const h=this[n];t.call(this,a),this.requestUpdate(n,h,o)}}throw Error("Unsupported decorator location: "+i)};function m(o){return(t,e)=>typeof e=="object"?Ft(o,t,e):((i,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,n?{...i,wrapped:!0}:i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Zt(o,t){return(e,i,s)=>{const r=n=>{var a;return((a=n.renderRoot)==null?void 0:a.querySelector(o))??null};return Jt(e,i,{get(){return r(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Yt=o=>(...t)=>({_$litDirective$:o,values:t});let Qt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xt=Yt(class extends Qt{constructor(o){var t;if(super(o),o.type!==Gt.ATTRIBUTE||o.name!=="class"||((t=o.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(t=>o[t]).join(" ")+" "}update(o,[t]){var i,s;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!((i=this.nt)!=null&&i.has(r))&&this.st.add(r);return this.render(t)}const e=o.element.classList;for(const r of this.st)r in t||(e.remove(r),this.st.delete(r));for(const r in t){const n=!!t[r];n===this.st.has(r)||(s=this.nt)!=null&&s.has(r)||(n?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return P}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=Symbol();class ee{get taskComplete(){return this.t||(this.i===1?this.t=new Promise((t,e)=>{this.o=t,this.h=e}):this.i===3?this.t=Promise.reject(this.l):this.t=Promise.resolve(this.u)),this.t}constructor(t,e,i){var r;this.p=0,this.i=0,(this._=t).addController(this);const s=typeof e=="object"?e:{task:e,args:i};this.v=s.task,this.j=s.args,this.m=s.argsEqual??se,this.k=s.onComplete,this.A=s.onError,this.autoRun=s.autoRun??!0,"initialValue"in s&&(this.u=s.initialValue,this.i=2,this.O=(r=this.T)==null?void 0:r.call(this))}hostUpdate(){this.autoRun===!0&&this.S()}hostUpdated(){this.autoRun==="afterUpdate"&&this.S()}T(){if(this.j===void 0)return;const t=this.j();if(!Array.isArray(t))throw Error("The args function must return an array");return t}async S(){const t=this.T(),e=this.O;this.O=t,t===e||t===void 0||e!==void 0&&this.m(e,t)||await this.run(t)}async run(t){var n,a,h,l,d;let e,i;t??(t=this.T()),this.O=t,this.i===1?(n=this.q)==null||n.abort():(this.t=void 0,this.o=void 0,this.h=void 0),this.i=1,this.autoRun==="afterUpdate"?queueMicrotask(()=>this._.requestUpdate()):this._.requestUpdate();const s=++this.p;this.q=new AbortController;let r=!1;try{e=await this.v(t,{signal:this.q.signal})}catch(c){r=!0,i=c}if(this.p===s){if(e===te)this.i=0;else{if(r===!1){try{(a=this.k)==null||a.call(this,e)}catch{}this.i=2,(h=this.o)==null||h.call(this,e)}else{try{(l=this.A)==null||l.call(this,i)}catch{}this.i=3,(d=this.h)==null||d.call(this,i)}this.u=e,this.l=i}this._.requestUpdate()}}abort(t){var e;this.i===1&&((e=this.q)==null||e.abort(t))}get value(){return this.u}get error(){return this.l}get status(){return this.i}render(t){var e,i,s,r;switch(this.i){case 0:return(e=t.initial)==null?void 0:e.call(t);case 1:return(i=t.pending)==null?void 0:i.call(t);case 2:return(s=t.complete)==null?void 0:s.call(t,this.value);case 3:return(r=t.error)==null?void 0:r.call(t,this.error);default:throw Error("Unexpected status: "+this.i)}}}const se=(o,t)=>o===t||o.length===t.length&&o.every((e,i)=>!V(e,t[i])),G="projects",mt="config",ie=T`
    :host {
        display: block;
    }
    
    nav {
        display: flex;
        border-bottom: 1px solid var(--grey-3);
        flex-wrap: wrap;
        padding: 0 8px;
        
        a {
            padding: 14px 16px 8px;
            color: var(--font-color);
            border: 1px solid var(--grey-3);
            margin-bottom: -1px;
            transition: all 400ms ease-in-out;
            
            &:not(:first-child) {
                border-left: 0;
            }
            
            &:first-child {
                border-top-left-radius: 4px;
            }
            
            &:last-of-type {
                border-top-right-radius: 4px;
            }
            
            &.active {
                border-bottom-color: #fff;
                color: var(--secondary);
            }
            
            &:hover {
                color: var(--primary);
            }
        }
    }

    
    
    
`,re={projects:"Projekte",config:"Konfiguration"},oe={tab:re};var ne=Object.defineProperty,ae=(o,t,e,i)=>{for(var s=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(t,e,s)||s);return s&&ne(t,e,s),s};const tt=class tt extends b{constructor(){super(...arguments),this.error=""}render(){return f`
            <div>
                <h5>Üpsii! Da ist was schiefgelaufen...</h5>
                <p>Bitte kurz bescheid geben, am besten mit screenshot inkl. offener Konsole</p>
                <p>${this.error}</p>
            </div>
        `}};tt.styles=T`
        :host {
            display: block;
        }

    `;let D=tt;ae([m({type:String})],D.prototype,"error");customElements.get("wf-error-async")||customElements.define("wf-error-async",D);const Et=T`
    :host {
        display: block;
        font-family: var(--font-family);
        font-size: var(--font-size);
        color: var(--font-color);
    }
    
    :host, 
    *,
    *:before, 
    *:after {
        box-sizing: border-box;
    }
    
    a {
        text-decoration: none;
    }


    div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    
    ul,
    ol,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
`,he=T`
    :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    :host(:focus-visible) {
        outline: 0;
    }
    
    .cta {
        border: 2px solid transparent;
        cursor: pointer;
    }
    
    .xs { padding: 2px 8px; }
    .s { padding: 4px 12px; }
    .m { padding: 8px 16px; }
    .l { padding: 16px 24px; }
    .xl {  padding: 24px 36px; }
        
    .primary, .secondary, .tertiary { color: #fff; }
    
    .primary { background-color: var(--primary); border-color: var(--primary); }
    .secondary { background-color: var(--secondary); border-color: var(--secondary); }
    .tertiary { background-color: var(--tertiary); border-color: var(--tertiary); }

    .primary-outline { border-color: var(--primary); color: var(--primary); }
    .secondary-outline { border-color: var(--secondary); color: var(--secondary); }
    .tertiary-outline { border-color: var(--tertiary); color: var(--tertiary); }
`;var le=Object.defineProperty,A=(o,t,e,i)=>{for(var s=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(t,e,s)||s);return s&&le(t,e,s),s};const et=class et extends b{constructor(){super(...arguments),this.disabled=!1,this.appearance="primary",this.type="button",this.size="m",this.href=null,this.target="_self",this.renderButton=()=>f`
        <button class="cta ${this.appearance} ${this.size}" type="${this.type}" ?disabled="${this.disabled}" @click(${this.handleClick})>
            <slot></slot>
        </button>
    `,this.renderLink=()=>f`
        <a href="${this.href}" class="cta ${this.appearance} ${this.size}" ?disabled="${this.disabled}" target="${this.target}" @click(${this.handleClick})>
            <slot></slot>
        </a>
    `,this.handleClick=()=>{!this.disabled&&this.onClick&&this.onClick()}}render(){return this.href?this.renderLink():this.renderButton()}};et.styles=[Et,he];let $=et;A([m({type:Boolean})],$.prototype,"disabled");A([m({type:String})],$.prototype,"appearance");A([m({type:String})],$.prototype,"type");A([m({type:String})],$.prototype,"size");A([m({type:String})],$.prototype,"href");A([m({type:String})],$.prototype,"target");A([m({type:Function})],$.prototype,"onClick");A([Zt("#cta")],$.prototype,"_button");customElements.get("wf-button")||customElements.define("wf-button",$);var ce=Object.defineProperty,de=(o,t,e,i)=>{for(var s=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(t,e,s)||s);return s&&ce(t,e,s),s};const st=class st extends b{constructor(){super(...arguments),this.error=""}render(){return f`
            <wf-button @click="${()=>console.log("test cta")}">Test Button</wf-button>
            <wf-button href="#test">Test Link</wf-button>
        `}};st.styles=T`
        :host {
            display: block;
        }
    `;let M=st;de([m({type:String})],M.prototype,"error");customElements.get("wf-view-projects")||customElements.define("wf-view-projects",M);const pe=Object.freeze(Object.defineProperty({__proto__:null,ViewDefault:M},Symbol.toStringTag,{value:"Module"})),ue=T`
    div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    
    ul,
    ol,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    a {
        text-decoration: none;
    }
`;var fe=Object.defineProperty,wt=(o,t,e,i)=>{for(var s=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(t,e,s)||s);return s&&fe(t,e,s),s};const it=class it extends b{constructor(){super(...arguments),this.hidePrice=!1,this.currentView=G,this.tabs=[G,mt],this.viewsMap={[G]:async()=>(console.log(0),await ot(()=>Promise.resolve().then(()=>pe),void 0,import.meta.url),f`
                <wf-view-projects></wf-view-projects>`),[mt]:async()=>(console.log(1),await ot(()=>import("./index-DjwgHubo.js"),[],import.meta.url),f`
                <wf-view-config></wf-view-config>`)},this.viewLoadTask=new ee(this,{task:async([t])=>this.viewsMap[t](),args:()=>[this.currentView]}),this.renderTabLink=t=>f`
        <a href="javascript:void(0)" class="tab-link${Xt({active:this.currentView===t})}" @click="${()=>this.currentView=t}">${oe.tab[t]}</a>
    `,this.renderButtons=()=>f`
        
    `,this.handleToast=({detail:t})=>{}}async connectedCallback(){this.setInitialState(),window.addEventListener("updateToastMessage",this.handleToast),super.connectedCallback()}disconnectedCallback(){window.removeEventListener("updateToastMessage",this.handleToast),super.disconnectedCallback()}setInitialState(){}render(){return[f`
                <nav>
                    ${this.tabs.map(this.renderTabLink)}
                    ${this.renderButtons()}
                </nav>
            `,this.viewLoadTask.render({pending:()=>f`
                    <wf-spinner active></wf-spinner>`,complete:t=>f`
                    <div class="tabs">
                        ${t}
                    </div>
                `,error:t=>f`
                    <wf-error-async error="${t}"></wf-error-async>`})]}};it.styles=[ue,Et,ie];let N=it;wt([m({type:Boolean})],N.prototype,"hidePrice");wt([m({type:String})],N.prototype,"currentView");customElements.get("wf-bm-popup")||customElements.define("wf-bm-popup",N);export{T as i,m as n,b as r,f as x};
