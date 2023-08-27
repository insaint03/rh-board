(function(){"use strict";var t={9081:function(t,e,n){n(7658);var i=n(6369),a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("md-app",{staticClass:"md-layout"},[e("md-app-content",[e("router-view")],1)],1)],1)},r=[],s={name:"App",props:{configure:Object},computed:{routes(){return this.$router.getRoutes().map((t=>t.path))}},mounted(){},data(){return{}}},o=s,l=n(1001),u=(0,l.Z)(o,a,r,!1,null,null,null),c=u.exports,d=n(4809),h=n.n(d),p=n(2631),f=function(){var t=this,e=t._self._c;return e("div",t._l(t.cards,(function(n,i){return e("div",{key:`c-row-${i}`,staticClass:"md-layout"},t._l(n,(function(n,a){return e("div",{key:`it-cell-${i}.${a}`,staticClass:"md-layout-item"},[e(t.binding_component(n),t._b({tag:"component"},"component",n,!1))],1)})),0)})),0)},m=[],b=function(){var t=this,e=t._self._c;return e("CardSection",t._b({staticClass:"tableau-card"},"CardSection",t.bindings,!1),[e("div",{ref:"viz",staticClass:"tableau-placeholder"})])},g=[],v=function(){var t=this,e=t._self._c;return e("md-card",[e("md-card-actions",{attrs:{"md-alignment":"space-between"}},[e("div",t._l(t.actions||[],(function(n,i){return e("md-button",t._b({key:`card.${i}`,class:n.icon?"md-icon-button":""},"md-button",n,!1),[n.icon?e("md-icon",[t._v(t._s(n.icon))]):[t._v(t._s(n.title||n.label||n.text))]],2)})),1),null!=t.title?e("div",{staticClass:"md-title"},[t._v(t._s(t.title))]):t._e()]),e("md-card-media",[t._t("default")],2)],1)},w=[],y={name:"CardSection",props:{title:String,subtitle:String,description:String,actions:Array},mounted(){},data(){return{}}},_=y,$=(0,l.Z)(_,v,w,!1,null,null,null),x=$.exports,j={name:"TableauCard",mounted(){let{src:t,host:e,endpoint:n,params:i}=this.setup.tableau,a=this.$refs.viz,r=n(this.tableau,e),s=Object.assign({},i,this.params||{});this.utils.include(t),this.utils.until((()=>window.tableau&&a)).then((()=>{this.viz=new window.tableau.Viz(a,r,s)}))},props:["path","params","tableau","title","subtitle","description"],components:{CardSection:x},computed:{},data(){return{viz:null,bindings:{title:this.title,subtitle:this.subtitle,description:this.description,actions:[{icon:"link",click:()=>window.open(this.setup.tableau.host,"_blank")},{icon:"mail",click:()=>alert(`tableau ${this.title}`)}]}}}},k=j,C=(0,l.Z)(k,b,g,!1,null,"16442f50",null),S=C.exports,O=function(){var t=this,e=t._self._c;return e("CardSection",{key:`d3-canvas.${t.latest}`},[e("div",{ref:"d3",staticClass:"d3-canvas",staticStyle:{"min-height":"300px"}},[e("svg",{staticClass:"d3-canvas-svg",staticStyle:{"max-width":"100%",height:"auto"},attrs:{viewBox:`0,0,${t.width},${t.height}`,width:t.width,height:t.height}},[e("g",t._b({},"g",t.styles.background||{},!1),[e("g",t._b({},"g",t.styles.nodes||{},!1),t._l(t.nodes,(function(n){return e(n.shape||"circle",t._b({key:`d3-node.${n.id}`,tag:"component",attrs:{cx:n.x,cy:n.y}},"component",n,!1))})),1),e("g",t._b({},"g",t.styles.links||{},!1),t._l(t.links,(function(n){return e(n.shape||"line",t._b({key:`d3-link.${n.id}`,tag:"component",attrs:{strokeWidth:n.weight||n.value||1,x1:n.source.x,y1:n.source.y,x2:n.target.x,y2:n.target.y}},"component",n,!1))})),1)])])])])},P=[];n(6229),n(7330),n(2062);let T={url:(t,e,n,i)=>{let a=e.split("/").filter((t=>t&&0<t.trim().length)).join("/"),r=new URL(`${t}/${a}`);return r.hostname=t,r.pathname=a,r.search=n?"?"+Object.entries(n).map((([t,e])=>`:${t}=${e}`)).join("&"):"",r.hash=i?`#${encodeURIComponent(i)}`:"",r.href},include:t=>new Promise((e=>{let n=document.querySelector(`script[src*="${t}"]`);n?e():(n=document.createElement("script"),n.src=t,n.async=!0,n.addEventListener("load",e),document.body.appendChild(n))})),until:(t,e,n)=>{let i;return e=Math.min(e||6e4,6e4),n=Math.max(e/1e3,100),new Promise(((e,a)=>{let r=Date.now();i=setInterval((()=>{Date.now()<=r&&a("timeout");let n=t();n?e(n):!1===n&&a()}),n)})).finally((()=>clearInterval(i)))},read:t=>new Promise((e=>{let n=new FileReader;n.addEventListener("load",(()=>{e(n.result)})),n.readAsText(t)})),gets:(t,e)=>new Promise(((n,i)=>{let a=new XMLHttpRequest,r=new URL(`${window.location.protocol}//${window.location.host}/`);r.pathname=t,Object.entries(e||{}).forEach((t=>r.searchParams(...t))),a.addEventListener("load",(()=>{n(a)})),a.addEventListener("error",i),a.open("GET",r),a.send()})),install:function(t){t.prototype.utils=T}};var E=T;const M={tableau:{host:"https://public.tableau.com",src:"https://public.tableau.com/javascripts/api/tableau-2.9.2.min.js",endpoint(t,e){return`${e||this.host}/views/${t}`},params:{display_static_image:"y",bootstrapWhenNotified:"true",embed:"true",language:"ko-KR",showVizHome:"n",apiID:"host0#navType=2",navSrc:"Parse"}},d3:{src:"https://cdn.jsdelivr.net/npm/d3@7"},datafile:"/boards.json",includes:[],install:function(t){t.prototype.setup=M}};var L=M,R={name:"GraphCard",props:["d3","data"],components:{CardSection:x},methods:{refresh(){this.nodes||(this.nodes=this.$props.data.nodes.map((t=>({...t}))),this.links=this.$props.data.links.map((t=>({...t})))),E.until((()=>window.d3&&this.$refs.d3)).then((()=>{this.width=this.$refs.d3.offsetWidth,this.height=this.$refs.d3.offsetHeight;const t=window.d3;this.simulation?this.simulation.stop():this.simulation=t.forceSimulation(this.nodes).force("link",t.forceLink(this.links).id((t=>t.id))).force("charge",t.forceManyBody()).on("tick",(()=>{this.updated=Date.now()})),this.simulation.force("center",t.forceCenter(this.width/2,this.height/2))}))},on_dragstart(t){console.log("start",t),t.active&&this.simulation.alphaTarget(.3).restart(),t.subject.fx=t.subject.x,t.subject.fy=t.subject.y},on_dragging(t){console.log("ing",t),t.subject.fx=t.x,t.subject.fy=t.y},on_dragend(t){console.log("end",t),t.active||this.simulation.alphaTarget(0),t.subject.fx=null,t.subject.fy=null}},mounted(){E.include(L.d3.src),this.refresh()},watch:{width(){this.refresh()}},data(){let t=Math.round(1e6*Math.random()).toString().replace(/[^\d]+/g,"");return{simulation:null,nodes:null,links:null,width:null,height:null,canvas_id:`d3-${t}-${Date.now()}`,latest:Date.now(),styles:this.$props.styles||{}}}},Z=R,z=(0,l.Z)(Z,O,P,!1,null,null,null),D=z.exports,I={name:"containerSection",components:{tableauCard:S,graphCard:D},methods:{binding_component(t){switch(!0){case null!=t.tableau:return"tableau-card";case null!=t.d3:return"graph-card";case null!=t.text:return"pre";default:return"div"}},binding_attributes(t){const e=["tableau","d3","text"];return Object.fromEntries(Object.entries(t).filter((([t])=>!e.includes(t))))}},data(){return{cards:this.cardboards(this.$route.path)}}},A=I,H=(0,l.Z)(A,f,m,!1,null,null,null),U=H.exports;(function(t,e,n){t[e]=t[e]||[],t[n]=t[n]||function(){t[e].push(arguments)}})(window,"_boards","cardboards"),i["default"].config.productionTip=!1,i["default"].use(p.ZP),i["default"].use(h()),i["default"].use(E),i["default"].use(L);const W=async function(t,e){await(L.includes||[]).map((async t=>await E.include(t)));let n=JSON.parse((await E.gets(L.datafile)).responseText);i["default"].use({install:t=>{t.boards=n,t.prototype.cardboards=t=>n[t]}});const a=Object.entries(n).map((([t,e])=>({path:t,component:U}))),r=new p.ZP({routes:a,boards:n,setup:L,mode:"history",base:e||"/"});return new i["default"]({boards:n,router:r,render:t=>t(c)}).$mount(t)};window._boards.push=W,window._boards.map((t=>W.apply(window,t)))}},e={};function n(i){var a=e[i];if(void 0!==a)return a.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,i,a,r){if(!i){var s=1/0;for(c=0;c<t.length;c++){i=t[c][0],a=t[c][1],r=t[c][2];for(var o=!0,l=0;l<i.length;l++)(!1&r||s>=r)&&Object.keys(n.O).every((function(t){return n.O[t](i[l])}))?i.splice(l--,1):(o=!1,r<s&&(s=r));if(o){t.splice(c--,1);var u=a();void 0!==u&&(e=u)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[i,a,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var a,r,s=i[0],o=i[1],l=i[2],u=0;if(s.some((function(e){return 0!==t[e]}))){for(a in o)n.o(o,a)&&(n.m[a]=o[a]);if(l)var c=l(n)}for(e&&e(i);u<s.length;u++)r=s[u],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(c)},i=self["webpackChunkrh_board"]=self["webpackChunkrh_board"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9081)}));i=n.O(i)})();
//# sourceMappingURL=app.9768a830.js.map