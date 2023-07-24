"use strict";(self.webpackChunkkaralos=self.webpackChunkkaralos||[]).push([[769],{4144:function(n,e,t){t.r(e);var r,i,o=t(1413),a=t(3433),s=t(4165),c=t(5861),l=t(9439),d=t(168),u=t(2791),p=t(7726),x=t(276),h=t(4082),f=t(5617),g=t(8267),m=t(4912),Z=t(9369),j=t(6598),y=t(49),v=(t(9323),t(9503)),w=t(7639),b=t(5849),k=t(8588),P=t(4554),L=t(1867),S=t(2492),C=t(4567),G=t(7234),V=t(1849),I=t(9596),O=t(9709),U=t(184),z=m.default.div(r||(r=(0,d.Z)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: ",";\n  border-width: ",";\n  border-radius: ",";\n  border-color: ",";\n  border-style: dashed;\n  background-color: #fafafa;\n  color: #bdbdbd;\n  outline: none;\n  transition: border 0.24s ease-in-out;\n  height: ",";\n"])),(0,V.V)(20),(0,V.V)(2),(0,V.V)(2),(function(n){return n.theme.palette.dark}),(0,V.V)(200)),F=(0,m.default)(Z.Z)(i||(i=(0,d.Z)(["\n  margin-top: ",";\n"])),(0,V.V)(24));e.default=function(){var n=(0,m.useTheme)(),e=(0,f.eh)(),t=(0,u.useState)([]),r=(0,l.Z)(t,2),i=r[0],d=r[1],R=(0,h.k)(),W=(0,l.Z)(R,2),D=W[0],N=W[1],H=function(){var n=(0,c.Z)((0,s.Z)().mark((function n(){return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:Promise.allSettled(i.map(function(){var n=(0,c.Z)((0,s.Z)().mark((function n(t){var r,i,o,a;return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t){n.next=4;break}return o=t.name.toLowerCase().replace(/\s+/g,"-"),a=(0,x.iH)(e,o),n.abrupt("return",D(a,t,{contentType:"image/".concat(t.type),customMetadata:{GPSLatitude:null!==(r=t.GPSLatitude)&&void 0!==r?r:"",GPSLongitude:null!==(i=t.GPSLongitude)&&void 0!==i?i:""}}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())).then((function(){return d([])}));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),A=(0,g.uI)({accept:{"image/*":[]},onDrop:function(n){Promise.all(n.map(function(){var n=(0,c.Z)((0,s.Z)().mark((function n(e){var t,r,i;return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,v.ZP.load(e);case 2:return i=n.sent,n.abrupt("return",Object.assign(e,{preview:URL.createObjectURL(e),GPSLatitude:null===(t=i.GPSLatitude)||void 0===t?void 0:t.description,GPSLongitude:null===(r=i.GPSLongitude)||void 0===r?void 0:r.description}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())).then((function(n){return d(n)}))}}),B=A.getRootProps,E=A.getInputProps,M=A.open,T=function(n){return function(){var e=(0,a.Z)(i);e.splice(e.indexOf(n),1),d(e)}};return(0,u.useEffect)((function(){return function(){i.forEach((function(n){return URL.revokeObjectURL(n.preview)}))}}),[i]),(0,U.jsx)(p.Z,{pageName:"Admin",children:(0,U.jsxs)(j.Z,{maxWidth:"lg",children:[(0,U.jsx)(Z.Z,{direction:"row",justifyContent:"end",useFlexGap:!0,sx:{marginBottom:(0,V.V)(12)},children:(0,U.jsx)(w.Z,{title:i.length>0?null:"No files added to Upload.",children:(0,U.jsx)("span",{children:(0,U.jsx)(O.Z,{size:"medium",type:"button",variant:"contained",onClick:H,color:"secondary",disabled:!(i.length>0),startIcon:(0,U.jsx)(I.Z,{}),loading:N,loadingPosition:"start",children:"Upload"})})})}),(0,U.jsx)(z,{children:(0,U.jsxs)("div",(0,o.Z)((0,o.Z)({},B({className:"dropzone"})),{},{onClick:function(n){return n.stopPropagation},children:[(0,U.jsx)("input",(0,o.Z)({},E())),(0,U.jsx)("p",{children:"Drag 'n' drop some files here, or click to select images"}),(0,U.jsx)(Z.Z,{direction:"row",justifyContent:"center",useFlexGap:!0,children:(0,U.jsx)(b.Z,{size:"medium",type:"button",variant:"contained",onClick:M,children:"Add"})})]}))}),(0,U.jsx)(F,{direction:"row",alignItems:"center",flexWrap:"wrap",justifyContent:"flex-start",spacing:2,useFlexGap:!0,children:i.map((function(e,t){return(0,U.jsxs)(k.Z,{sx:{maxWidth:280,display:"flex"},children:[(0,U.jsx)(P.Z,{sx:{display:"flex",width:(0,V.V)(130),justifyContent:"flex-start"},children:(0,U.jsx)(L.Z,{component:"img",image:e.preview,alt:e.name,sx:{width:"auto",maxWidth:(0,V.V)(130),height:(0,V.V)(133),objectFit:"cover"}})}),(0,U.jsxs)(P.Z,{sx:{display:"flex",flexDirection:"column",width:(0,V.V)(150)},children:[(0,U.jsxs)(S.Z,{sx:{flex:"1 0 auto"},children:[(0,U.jsx)(C.Z,{noWrap:!0,variant:"body2",color:"text.secondary",children:"Pending upload"}),(0,U.jsx)(w.Z,{title:e.name,children:(0,U.jsxs)(Z.Z,{direction:"row",children:[(0,U.jsx)("span",{style:{width:"calc(100% - ".concat(30,"px)")},children:(0,U.jsx)(y.y,{defaultValue:e.name.slice(0,e.name.lastIndexOf(".")),onSave:function(n){return function(n,e){var t=(0,a.Z)(i),r=t[e],o=(n.substring(0,n.lastIndexOf("."))||n).replace(/\s+/g,"-").toLowerCase(),s=r.type.slice(r.type.lastIndexOf("/")+1),c=new File([r],"".concat(o,".").concat(s),{type:r.type});t[e]=Object.assign(c,{preview:URL.createObjectURL(c),GPSLatitude:r.GPSLatitude,GPSLongitude:r.GPSLongitude}),d(t)}(n.value,t)},placeholder:"Image name",style:{border:"".concat((0,V.V)(1)," solid #ffff"),paddingLeft:0,fontSize:n.typography.body1.fontSize}})}),(0,U.jsxs)(C.Z,{component:"span",variant:"body2",color:"text.secondary",style:{width:(0,V.V)(30),lineHeight:(0,V.V)(34)},children:[".",e.type.slice(e.type.lastIndexOf("/")+1)]})]})})]}),(0,U.jsx)(G.Z,{children:(0,U.jsx)(b.Z,{size:"small",color:"primary",onClick:T(e),children:"Remove Image"})})]})]},e.name)}))})]})})}},7726:function(n,e,t){var r,i=t(9439),o=t(4942),a=t(1413),s=t(168),c=t(6934),l=t(4554),d=t(9464),u=t(977),p=t(4567),x=t(5849),h=t(4721),f=t(3236),g=t(6278),m=t(7064),Z=t(9900),j=t(266),y=t(8654),v=t(5256),w=t(8008),b=t(1009),k=t(609),P=t(1334),L=t(2791),S=t(1849),C=t(1087),G=t(6929),V=t(184),I=(0,c.ZP)(C.rU)(r||(r=(0,s.Z)(["\n  text-decoration: none;\n  color: inherit;\n"]))),O=(0,c.ZP)(v.Z,{shouldForwardProp:function(n){return"open"!==n}})((function(n){var e=n.theme,t=n.open;return(0,a.Z)({zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),borderBottom:1},t&&{marginLeft:"".concat((0,S.V)(240)),width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})})})),U=(0,c.ZP)(y.ZP,{shouldForwardProp:function(n){return"open"!==n}})((function(n){var e=n.theme,t=n.open;return{"& .MuiDrawer-paper":(0,a.Z)({position:"relative",whiteSpace:"nowrap",width:"".concat((0,S.V)(240)),transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),boxSizing:"border-box"},!t&&(0,o.Z)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}))}}));e.Z=function(n){var e=(0,G.a)(),t=L.useState(!0),r=(0,i.Z)(t,2),o=r[0],s=r[1],c=function(){s(!o)};return(0,V.jsxs)(l.Z,{sx:{display:"flex",backgroundColor:"white"},children:[(0,V.jsx)(O,{elevation:0,position:"absolute",open:o,children:(0,V.jsxs)(d.Z,{sx:{pr:"24px"},children:[(0,V.jsx)(u.Z,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:c,sx:(0,a.Z)({marginRight:"36px",backgroundColor:"black"},o&&{display:"none"}),children:(0,V.jsx)(w.Z,{})}),(0,V.jsx)(p.Z,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,sx:{flexGrow:1,color:"black"},children:n.pageName}),e.user?(0,V.jsx)(x.Z,{onClick:e.logout,color:"primary",children:"Logout"}):(0,V.jsx)(x.Z,{component:C.rU,to:"/sign-in",color:"inherit",children:"Login"})]})}),(0,V.jsxs)(U,{elevation:0,variant:"permanent",open:o,children:[(0,V.jsx)(d.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"flex-end",px:[1]},children:(0,V.jsx)(u.Z,{onClick:c,children:(0,V.jsx)(b.Z,{})})}),(0,V.jsx)(h.Z,{}),(0,V.jsxs)(f.Z,{component:"nav",children:[(0,V.jsx)(L.Fragment,{children:(0,V.jsx)(I,{to:"/",children:(0,V.jsxs)(g.Z,{children:[(0,V.jsx)(m.Z,{children:(0,V.jsx)(k.Z,{})}),(0,V.jsx)(Z.Z,{primary:"Home"})]})})}),(0,V.jsx)(h.Z,{sx:{my:1}}),(0,V.jsx)(L.Fragment,{children:(0,V.jsx)(I,{to:"/gallery",children:(0,V.jsxs)(g.Z,{children:[(0,V.jsx)(m.Z,{children:(0,V.jsx)(P.Z,{})}),(0,V.jsx)(Z.Z,{primary:"Gallery"})]})})}),(0,V.jsx)(h.Z,{sx:{my:1}})]})]}),(0,V.jsxs)(l.Z,{component:"main",sx:{backgroundColor:function(n){return"light"===n.palette.mode?n.palette.grey[100]:n.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[(0,V.jsx)(d.Z,{}),(0,V.jsx)(j.Z,{maxWidth:"xl",sx:{mt:4,mb:4},children:n.children})]})]})}}}]);
//# sourceMappingURL=769.be6280ba.chunk.js.map