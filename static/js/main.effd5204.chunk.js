(this["webpackJsonphandlebars-template-editor"]=this["webpackJsonphandlebars-template-editor"]||[]).push([[0],{105:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),i=t(29),c=t.n(i),l=(t(77),t(78),t(30)),o=t(17),d=t(121),u=t(68),s=(t(79),t(39)),m=t(24),p=t(44),f=t(40);var b=function(e){return r.a.useContext(o.a)[e]},h=t(69),E=t(10),v=E.b.model("TreeNode",{id:E.b.identifierNumber,name:E.b.string,description:E.b.maybeNull(E.b.string),children:E.b.array(E.b.safeReference(E.b.late((function(){return v})))),parent:E.b.maybeNull(E.b.safeReference(E.b.late((function(){return v})))),isDroppable:!0}).actions((function(e){return{setChildren:function(n){e.children=Object(E.a)(n)},setIsDroppable:function(n){e.isDroppable=n}}})).views((function(e){return{get isRoot(){return null===e.parent},get type(){return"TreeNode"},get nodeIndexInParentNode(){return e.parent?e.parent.children.findIndex((function(n){return n.id===e.id})):null}}})),g=v,O=[{id:0,name:"root",description:"Root",parent:null,children:[1,2,3,4]},{id:1,name:"child-1",description:"Child 1",children:[5,6],parent:0},{id:2,name:"child-2",description:"Child 2",parent:0},{id:3,name:"child-3",description:"Child 3",parent:0},{id:4,name:"child-4",description:"Child 4",parent:0},{id:5,name:"grandchild-1",description:"GrandChild 1",parent:1},{id:6,name:"grandchild-2",description:"GrandChild 2",parent:1}],N=E.b.model("AppStore",{treeNodes:E.b.array(g),root:E.b.maybeNull(E.b.late((function(){return E.b.safeReference(g)})))}).actions((function(e){return{afterCreate:function(){var n;e.treeNodes=Object(E.a)(O),e.root=null!==(n=e.treeNodes.find((function(e){return e.isRoot})))&&void 0!==n?n:null},moveTreeNodes:function(n,t){var a=e.treeNodes.find((function(e){return e.id===n.id}));if(console.log("move",null===a||void 0===a?void 0:a.id,t.id),a){var r=t.parent,i=a.parent;if(r&&i){var c=t.nodeIndexInParentNode;if(null!==r.id&&null!==c){var l=Array.from(r.children.map((function(e){return e.id}))),o=l.findIndex((function(e){return e===a.id}));-1===o?(console.log("adding"),l.splice(c,0,a.id),a.parent=r,i.setChildren(Object(h.a)(i.children.filter((function(e){return e.id!==a.id}))))):(console.log("swapping"),l.splice(o,1,t.id),l.splice(c,1,a.id)),r.setChildren(l)}}}}}})),C=N.name,j=N,y=t(6),w=t.n(y),k=t(12),R=t(122),x=t(123),I=t(107),D=t(65),S=t(108),T=t(109),B=Object(o.c)((function e(n){var t=n.node,i=b(C).moveTreeNodes,c=Object(a.useState)(!0),l=Object(m.a)(c,2),o=l[0],d=l[1],u=Object(a.useRef)(null),h=Object(R.a)({accept:t.type,hover:function(e,n){if(u.current&&!1!==v){var a=e.id;if(a!==t.id&&!t.children.includes(a)){var r=u.current.getBoundingClientRect(),c=(r.bottom-r.top)/2,l=n.getClientOffset();if(l){var o=l.y-r.top;o<c||o>c||i(e,t)}}}},collect:function(e){return{isOverCurrent:e.isOver({shallow:!0})}}}),E=Object(m.a)(h,2),v=E[0].isOverCurrent,g=E[1],O=Object(x.a)({item:Object(s.a)(Object(s.a)({},t),{},{type:t.type}),canDrag:!t.isRoot,collect:function(e){return{isDragging:e.isDragging()}},end:function(e,n){var a=n.getItem();n.didDrop()||(console.log("drop",a.id,t.id),i(a,t))}}),N=Object(m.a)(O,2),j=N[0].isDragging,y=N[1],B=Object(a.useCallback)((function(){return d(!o)}),[o,d]);return y(g(u)),r.a.createElement("div",{ref:u,className:w()({"h-100":t.isRoot})},r.a.createElement(I.a,{className:w()({"tree-view-item":!0,"opacity-0":j,"h-100":t.isRoot})},t.children.length>0&&r.a.createElement(D.a,{className:"pl-0 no-underline no-box-shadow",color:"link",onClick:B},o?r.a.createElement(f.a,{icon:p.a}):r.a.createElement(f.a,{icon:p.b})),t.description,t.children.length>0&&r.a.createElement(S.a,{isOpen:o},r.a.createElement(k.a,null,(function(){var n;return r.a.createElement(r.a.Fragment,null,null===(n=t.children)||void 0===n?void 0:n.map((function(n){return r.a.createElement(T.a,{key:n.id},r.a.createElement(e,{node:n}))})))})))))})),G=t(110),A=t(111),F=t(112),J=Object(o.c)((function(){var e=b(C).root;return r.a.createElement(G.a,{fluid:!0},r.a.createElement(A.a,{className:"main-content vh-100"},r.a.createElement(F.a,{md:9},"Main Editor"),r.a.createElement(F.a,{md:3,className:"p-0"},r.a.createElement(T.a,{className:"h-100"},e&&r.a.createElement(B,{node:e})))))})),M=t(113),P=t(114),W=t(115),H=t(116),$=t(117),q=t(118),z=t(124),K=t(125),L=t(126),Q=t(119),U=t(120),V=function(){var e=Object(a.useState)(!1),n=Object(m.a)(e,2),t=n[0],i=n[1];return r.a.createElement(M.a,{color:"dark",dark:!0,expand:"md",fixed:"top",full:!0},r.a.createElement(P.a,{href:"/"},"reactstrap"),r.a.createElement(W.a,{onClick:function(){return i(!t)}}),r.a.createElement(S.a,{isOpen:t,navbar:!0},r.a.createElement(H.a,{className:"mr-auto",navbar:!0},r.a.createElement($.a,null,r.a.createElement(q.a,{href:"/components/"},"Components")),r.a.createElement($.a,null,r.a.createElement(q.a,{href:"https://github.com/reactstrap/reactstrap"},"GitHub")),r.a.createElement(z.a,{nav:!0,inNavbar:!0},r.a.createElement(K.a,{nav:!0,caret:!0},"Options"),r.a.createElement(L.a,{right:!0},r.a.createElement(Q.a,null,"Option 1"),r.a.createElement(Q.a,null,"Option 2"),r.a.createElement(Q.a,{divider:!0}),r.a.createElement(Q.a,null,"Reset")))),r.a.createElement(U.a,null,"Simple Text")))},X=Object(l.a)({},C,j.create()),Y=function(){return r.a.createElement(o.b,X,r.a.createElement(r.a.Fragment,null,r.a.createElement(V,null),r.a.createElement(d.a,{backend:u.a},r.a.createElement(J,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(104);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},72:function(e,n,t){e.exports=t(105)},78:function(e,n,t){},79:function(e,n,t){}},[[72,1,2]]]);
//# sourceMappingURL=main.effd5204.chunk.js.map