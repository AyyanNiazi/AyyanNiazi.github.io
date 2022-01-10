(this["webpackJsonppancake-frontend"]=this["webpackJsonppancake-frontend"]||[]).push([[30],{1001:function(e,n,t){"use strict";var c,i=t(10),r=(t(0),t(7)),s=t(2),a=t(246),b=t(14),l=t(91),d=t(1),o=function(){var e=Object(b.b)().t;return Object(d.jsx)(s.y,{mb:"32px",isActive:!0,children:Object(d.jsx)(s.z,{children:Object(d.jsxs)(s.bb,{alignItems:["start",null,"center"],justifyContent:["start",null,"space-between"],flexDirection:["column",null,"row"],children:[Object(d.jsxs)("div",{children:[Object(d.jsx)(s.db,{scale:"lg",mb:"8px",children:e("You haven\u2019t set up your profile yet!")}),Object(d.jsx)(s.zc,{children:e("You can do this at any time by clicking on your profile picture in the menu")})]}),Object(d.jsx)(s.t,{as:l.a,to:"/create-profile",id:"teamsPageSetUpProfile",mt:["16px",null,0],children:e("Set up now")})]})})})},j=r.e.div(c||(c=Object(i.a)(["\n  border-bottom: 2px solid ",";\n  margin-bottom: 24px;\n  padding-bottom: 24px;\n"])),(function(e){return e.theme.colors.textSubtle}));n.a=function(){var e=Object(b.b)().t,n=Object(a.d)(),t=n.isInitialized,c=n.profile,i=t&&!c;return Object(d.jsxs)(d.Fragment,{children:[i&&Object(d.jsx)(o,{}),Object(d.jsxs)(j,{children:[Object(d.jsx)(s.db,{as:"h1",scale:"xxl",color:"secondary",children:e("Teams & Profiles")}),Object(d.jsx)(s.zc,{bold:!0,children:e("Show off your stats and collectibles with your unique profile. Team features will be revealed soon!")})]})]})}},1589:function(e,n,t){"use strict";t.r(n);t(0);var c,i,r,s,a,b,l,d,o=t(2),j=t(252),x=t.n(j),u=t(858),O=t(187),m=t(14),p=t(10),f=t(7),h=t(91),g=t(1),v=f.e.div(c||(c=Object(p.a)(["\n  align-self: stretch;\n  background: ",";\n  flex: none;\n  padding: 16px 0;\n  text-align: center;\n  width: 56px;\n"])),(function(e){return function(e){return e.isDark?"linear-gradient(139.73deg, #142339 0%, #24243D 47.4%, #37273F 100%)":"linear-gradient(139.73deg, #E6FDFF 0%, #EFF4F5 46.87%, #F3EFFF 100%)"}(e.theme)})),y=f.e.div(i||(i=Object(p.a)(["\n  align-items: start;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  padding: 24px;\n\n  "," {\n    align-items: center;\n    flex-direction: row;\n    font-size: 40px;\n  }\n"])),(function(e){return e.theme.mediaQueries.md})),z=f.e.div(r||(r=Object(p.a)(["\n  flex: 1;\n"]))),w=f.e.img(s||(s=Object(p.a)(["\n  border-radius: 50%;\n"]))),S=Object(f.e)(o.db).attrs({as:"h3"})(a||(a=Object(p.a)(["\n  font-size: 24px;\n\n  "," {\n    font-size: 40px;\n  }\n"])),(function(e){return e.theme.mediaQueries.md})),F=f.e.div(b||(b=Object(p.a)(["\n  flex: none;\n  margin-right: 8px;\n\n  "," {\n    height: 64px;\n    width: 64px;\n  }\n\n  "," {\n    display: none;\n  }\n"])),w,(function(e){return e.theme.mediaQueries.md})),k=f.e.div(l||(l=Object(p.a)(["\n  display: none;\n\n  "," {\n    display: block;\n    margin-left: 24px;\n\n    "," {\n      height: 128px;\n      width: 128px;\n    }\n  }\n"])),(function(e){return e.theme.mediaQueries.md}),w),I=Object(f.e)(o.y)(d||(d=Object(p.a)(["\n  margin-bottom: 16px;\n"]))),E=function(e){var n=e.rank,t=e.team,c=Object(m.b)().t,i=Object(g.jsx)(w,{src:"/images/teams/".concat(t.images.md),alt:"team avatar"});return Object(g.jsx)(I,{id:"team-".concat(t.id),children:Object(g.jsxs)(o.bb,{children:[Object(g.jsx)(v,{children:Object(g.jsx)(o.zc,{bold:!0,fontSize:"24px",children:n})}),Object(g.jsxs)(y,{children:[Object(g.jsxs)(z,{children:[Object(g.jsxs)(o.bb,{alignItems:"center",mb:"16px",children:[Object(g.jsx)(F,{children:i}),Object(g.jsx)(S,{children:t.name})]}),Object(g.jsx)(o.zc,{as:"p",color:"textSubtle",pr:"24px",mb:"16px",children:c(t.description)}),Object(g.jsxs)(o.bb,{children:[Object(g.jsxs)(o.bb,{children:[Object(g.jsx)(o.Wb,{width:"24px",mr:"8px",style:{alignSelf:"center"}}),Object(g.jsx)(o.zc,{fontSize:"24px",bold:!0,children:t.points.toLocaleString()})]}),Object(g.jsxs)(o.bb,{ml:"24px",children:[Object(g.jsx)(o.R,{width:"24px",mr:"8px",style:{alignSelf:"center"}}),Object(g.jsx)(o.zc,{fontSize:"24px",bold:!0,children:t.users.toLocaleString()})]})]})]}),Object(g.jsx)(o.t,{as:h.a,to:"/teams/".concat(null===t||void 0===t?void 0:t.id),variant:"secondary",scale:"sm",children:c("See More")}),Object(g.jsx)(k,{children:i})]})]})})},L=t(1001);n.default=function(){var e=Object(m.b)().t,n=Object(u.b)(),t=n.teams,c=n.isLoading,i=Object.values(t),r=x()(i,["points","id","name"],["desc","asc","asc"]);return Object(g.jsxs)(O.b,{children:[Object(g.jsx)(L.a,{}),Object(g.jsxs)(o.bb,{alignItems:"center",justifyContent:"space-between",mb:"32px",children:[Object(g.jsx)(o.db,{scale:"xl",children:e("Teams")}),c&&Object(g.jsx)(o.i,{spin:!0})]}),r.map((function(e,n){return Object(g.jsx)(E,{rank:n+1,team:e},e.id)}))]})}},858:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return b}));var c=t(0),i=t(28),r=t(73),s=t(176),a=function(e){var n=Object(i.c)((function(n){return n.teams.data[e]})),t=Object(r.b)();return Object(c.useEffect)((function(){t(Object(s.b)(e))}),[e,t]),n},b=function(){var e=Object(i.c)((function(e){return e.teams})),n=e.isInitialized,t=e.isLoading,a=e.data,b=Object(r.b)();return Object(c.useEffect)((function(){b(Object(s.c)())}),[b]),{teams:a,isInitialized:n,isLoading:t}}}}]);
//# sourceMappingURL=30.122d3c70.chunk.js.map