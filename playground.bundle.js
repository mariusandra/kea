webpackJsonp([16],{511:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return v});var c,a,l,s=n(10),p=n.n(s),f=n(54),d=(n.n(f),n(55)),b=n.n(d),y=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),h=Object(f.kea)({propTypes:{id:b.a.number.isRequired},key:function(e){return e.id},path:function(e){return["scenes","main",e]},actions:function(){return{doit:!0}},reducers:function(e){var t=e.actions,n=e.key;return{done:[!1,b.a.bool,u({},t.doit,function(e,t){return t.key===n||e})]}},selectors:function(e){var t=e.selectors;return{isDone:[function(){return[t.done]},function(e){return e},b.a.bool]}}}),m=h(c=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),y(t,[{key:"render",value:function(){return p.a.createElement("div",null,"id: ",this.props.id,", done: ",this.props.done?"true":"false"," ",p.a.createElement("button",{onClick:this.actions.doit},"doit"))}}]),t}(s.Component))||c,_=(a=Object(f.connect)({key:function(e){return e.id},actions:[h.withKey(function(e){return e.id}),["doit"]],props:[h.withKey(function(e){return e.id}),["done","isDone"]],propTypes:{id:b.a.number.isRequired}}))(l=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),y(t,[{key:"render",value:function(){return p.a.createElement("div",null,p.a.createElement("p",null,"helper id: ",this.props.id,", done: ",this.props.done?"true":"false",", isDone: ",this.props.isDone?"true":"false"),p.a.createElement("p",null,p.a.createElement("button",{onClick:this.actions.doit},"Do it!")))}}]),t}(s.Component))||l,v=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),y(t,[{key:"render",value:function(){return p.a.createElement("div",null,p.a.createElement("div",null,p.a.createElement(m,{id:123}),p.a.createElement(_,{id:123})),p.a.createElement("div",null,p.a.createElement(m,{id:999}),p.a.createElement(_,{id:999})))}}]),t}(s.Component)}});