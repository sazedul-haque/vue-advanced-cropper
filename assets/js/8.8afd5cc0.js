(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{103:function(t,e,i){t.exports=i(104)},104:function(t,e,i){i(105),t.exports=i(13).Array.isArray},105:function(t,e,i){var o=i(32);o(o.S,"Array",{isArray:i(108)})},109:function(t,e,i){t.exports=i(110)},110:function(t,e,i){i(75),i(118),t.exports=i(13).Array.from},118:function(t,e,i){"use strict";var o=i(106),n=i(32),r=i(67),c=i(119),a=i(120),s=i(113),h=i(121),f=i(122);n(n.S+n.F*!i(123)(function(t){Array.from(t)}),"Array",{from:function(t){var e,i,n,l,u=r(t),p="function"==typeof this?this:Array,d=arguments.length,m=d>1?arguments[1]:void 0,g=void 0!==m,v=0,b=f(u);if(g&&(m=o(m,d>2?arguments[2]:void 0,2)),null==b||p==Array&&a(b))for(i=new p(e=s(u.length));e>v;v++)h(i,v,g?m(u[v],v):u[v]);else for(l=b.call(u),i=new p;!(n=l.next()).done;v++)h(i,v,g?c(l,m,[n.value,v],!0):n.value);return i.length=v,i}})},119:function(t,e,i){var o=i(64);t.exports=function(t,e,i,n){try{return n?e(o(i)[0],i[1]):e(i)}catch(e){var r=t.return;throw void 0!==r&&o(r.call(t)),e}}},120:function(t,e,i){var o=i(38),n=i(20)("iterator"),r=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||r[n]===t)}},121:function(t,e,i){"use strict";var o=i(33),n=i(66);t.exports=function(t,e,i){e in t?o.f(t,e,n(0,i)):t[e]=i}},122:function(t,e,i){var o=i(77),n=i(20)("iterator"),r=i(38);t.exports=i(13).getIteratorMethod=function(t){if(null!=t)return t[n]||t["@@iterator"]||r[o(t)]}},123:function(t,e,i){var o=i(20)("iterator"),n=!1;try{var r=[7][o]();r.return=function(){n=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!n)return!1;var i=!1;try{var r=[7],c=r[o]();c.next=function(){return{done:i=!0}},r[o]=function(){return c},t(r)}catch(t){}return i}},124:function(t,e,i){t.exports=i(125)},125:function(t,e,i){i(126),i(75),t.exports=i(127)},127:function(t,e,i){var o=i(77),n=i(20)("iterator"),r=i(38);t.exports=i(13).isIterable=function(t){var e=Object(t);return void 0!==e[n]||"@@iterator"in e||r.hasOwnProperty(o(e))}},149:function(t,e,i){t.exports=i(150)},150:function(t,e,i){i(151);var o=i(13).Object;t.exports=function(t,e){return o.getOwnPropertyDescriptor(t,e)}},151:function(t,e,i){var o=i(45),n=i(147).f;i(80)("getOwnPropertyDescriptor",function(){return function(t,e){return n(o(t),e)}})},152:function(t,e,i){t.exports=i(153)},153:function(t,e,i){i(144),t.exports=i(13).Object.getOwnPropertySymbols},154:function(t,e,i){t.exports=i(155)},155:function(t,e,i){i(156),t.exports=i(13).Object.keys},156:function(t,e,i){var o=i(67),n=i(76);i(80)("keys",function(){return function(t){return n(o(t))}})},157:function(t,e,i){i(158);var o=i(13).Object;t.exports=function(t,e,i){return o.defineProperty(t,e,i)}},158:function(t,e,i){var o=i(32);o(o.S+o.F*!i(44),"Object",{defineProperty:i(33).f})},159:function(t,e,i){},189:function(t,e,i){"use strict";var o=i(103),n=i.n(o);var r=i(109),c=i.n(r),a=i(124),s=i.n(a);function h(t){return function(t){if(n()(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(s()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return c()(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}i.d(e,"a",function(){return h})},320:function(t,e,i){"use strict";var o=i(159);i.n(o).a},367:function(t,e,i){"use strict";i.r(e);var o=i(81),n=i(11),r=i(189),c=(i(69),["left","right"]),a=["top","bottom"],s=["left","right","top","bottom"];i(86),i(220),i(79),i(222);i(219),i(93);function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var f=function t(e){h(this,t),this.type="move",this.directions=e};function l(t,e){return{left:t.left-e.left,top:t.top-e.top,width:t.width+e.left+e.right,height:t.height+e.top+e.bottom}}function u(t,e){return Object(o.a)({},t,{left:t.left+e.left,top:t.top+e.top})}function p(t){return t.width/t.height}function d(t,e){var i={left:0,top:0},o=g(t,e);return o.left&&o.left>0?i.left=o.left:o.right&&o.right>0&&(i.left=-o.right),o.top&&o.top>0?i.top=o.top:o.bottom&&o.bottom>0&&(i.top=-o.bottom),i}function m(t){return{left:t.left,top:t.top,right:t.left+t.width,bottom:t.top+t.height}}function g(t,e){var i={left:0,top:0,right:0,bottom:0};return s.forEach(function(o){var n=e[o],r=m(t)[o];i[o]=void 0!==n&&void 0!==r?"left"===o||"top"===o?Math.max(0,n-r):Math.max(0,r-n):0}),i}function v(t){var e=t.directions,i=t.coordinates,n=t.positionRestrictions,h=void 0===n?{}:n,f=t.sizeRestrictions,u=t.preserveRatio,p=t.compensate,d=Object(o.a)({},e),m=l(i,d).width,v=l(i,d).height;m<0&&(d.left<0&&d.right<0?(d.left=-(i.width-f.minWidth)/(d.left/d.right),d.right=-(i.width-f.minWidth)/(d.right/d.left)):d.left<0?d.left=-(i.width-f.minWidth):d.right<0&&(d.right=-(i.width-f.minWidth))),v<0&&(d.top<0&&d.bottom<0?(d.top=-(i.height-f.minHeight)/(d.top/d.bottom),d.bottom=-(i.height-f.minHeight)/(d.bottom/d.top)):d.top<0?d.top=-(i.height-f.minHeight):d.bottom<0&&(d.bottom=-(i.height-f.minHeight)));var b=g(l(i,d),h);p&&(b.left&&b.left>0&&0===b.right?(d.right+=b.left,d.left-=b.left):b.right&&b.right>0&&0===b.left&&(d.left+=b.right,d.right-=b.right),b.top&&b.top>0&&0===b.bottom?(d.bottom+=b.top,d.top-=b.top):b.bottom&&b.bottom>0&&0===b.top&&(d.top+=b.bottom,d.bottom-=b.bottom),b=g(l(i,d),h));var w={width:1/0,height:1/0,left:1/0,right:1/0,top:1/0,bottom:1/0};if(s.forEach(function(t){var e=b[t];e&&d[t]&&(w[t]=Math.max(0,1-e/d[t]))}),u){var x=Math.min.apply(Math,Object(r.a)(s.map(function(t){return w[t]})));x!==1/0&&s.forEach(function(t){d[t]*=x})}else s.forEach(function(t){w[t]!==1/0&&(d[t]*=w[t])});if(m=l(i,d).width,v=l(i,d).height,d.right+d.left&&(m>f.maxWidth?w.width=(f.maxWidth-i.width)/(d.right+d.left):m<f.minWidth&&(w.width=(f.minWidth-i.width)/(d.right+d.left))),d.bottom+d.top&&(v>f.maxHeight?w.height=(f.maxHeight-i.height)/(d.bottom+d.top):v<f.minHeight&&(w.height=(f.minHeight-i.height)/(d.bottom+d.top))),u){var y=Math.min(w.width,w.height);y!==1/0&&s.forEach(function(t){d[t]*=y})}else w.width!==1/0&&c.forEach(function(t){d[t]*=w.width}),w.height!==1/0&&a.forEach(function(t){d[t]*=w.height});return d}function b(t,e){var i;return e.minimum&&t<e.minimum?i=e.minimum:e.maximum&&t>e.maximum&&(i=e.maximum),i}function w(t){var e=t.event,i=t.coordinates,n=t.aspectRatio,r=t.positionRestrictions,c=t.sizeRestrictions,a=Object(o.a)({},i,{right:i.left+i.width,bottom:i.top+i.height}),h=e.params||{},m=Object(o.a)({},e.directions),g=h.allowedDirections||{left:!0,right:!0,bottom:!0,top:!0};c.widthFrozen&&(m.left=0,m.right=0),c.heightFrozen&&(m.top=0,m.bottom=0),s.forEach(function(t){g[t]||(m[t]=0)});var w=l(a,m=v({coordinates:a,directions:m,sizeRestrictions:c,positionRestrictions:r})).width,x=l(a,m).height,y=h.preserveRatio?p(a):b(w/x,n);if(y){var O=h.respectDirection;if(O||(O=a.width>=a.height||1===y?"width":"height"),"width"===O){var R=w/y-a.height;g.top&&g.bottom?(m.bottom=R/2,m.top=R/2):g.bottom?m.bottom=R:g.top?m.top=R:g.right?m.right=0:g.left&&(m.left=0)}else if("height"===O){var j=a.width-x*y;g.left&&g.right?(m.left=-j/2,m.right=-j/2):g.left?m.left=-j:g.right?m.right=-j:g.top?m.top=0:g.bottom&&(m.bottom=0)}m=v({directions:m,coordinates:a,sizeRestrictions:c,positionRestrictions:r,preserveRatio:!0,compensate:h.compensate})}return w=l(a,m).width,x=l(a,m).height,(y=h.preserveRatio?p(a):b(w/x,n))&&Math.abs(y-w/x)>.001&&s.forEach(function(t){g[t]||(m[t]=0)}),function(t){var e=t.event,i=t.coordinates,o=t.positionRestrictions,n=void 0===o?{}:o,r=u(i,e.directions);return u(r,d(r,n))}({event:new f({left:-m.left,top:-m.top}),coordinates:{width:i.width+m.right+m.left,height:i.height+m.top+m.bottom,left:i.left,top:i.top},positionRestrictions:r})}var x={name:"AlgorithmTester",components:{BoundingBox:n.a},data:function(){return{coordinates:{cropper:{width:100,height:100,left:150,top:150},stencil:{width:100,height:100,left:150,top:150},current:{width:100,height:100,left:150,top:150},area:{width:400,height:400,left:0,top:0}},stencilProps:'{\n\t"aspectRatio": 10/16\n}'}},computed:{cropperStyle:function(){return{width:"".concat(this.coordinates.cropper.width,"px"),height:"".concat(this.coordinates.cropper.height,"px"),top:"".concat(this.coordinates.cropper.top,"px"),left:"".concat(this.coordinates.cropper.left,"px")}},currentStyle:function(){return{width:"".concat(this.coordinates.current.width,"px"),height:"".concat(this.coordinates.current.height,"px"),top:"".concat(this.coordinates.current.top,"px"),left:"".concat(this.coordinates.current.left,"px")}},stencilStyle:function(){return{width:"".concat(this.coordinates.stencil.width,"px"),height:"".concat(this.coordinates.stencil.height,"px"),top:"".concat(this.coordinates.stencil.top,"px"),left:"".concat(this.coordinates.stencil.left,"px")}},areaStyle:function(){return{width:"".concat(this.coordinates.area.width,"px"),height:"".concat(this.coordinates.area.height,"px"),top:"".concat(this.coordinates.area.top,"px"),left:"".concat(this.coordinates.area.left,"px")}}},methods:{onResizeStencil:function(t){var e=t.directions;this.coordinates.stencil.left-=e.left,this.coordinates.stencil.top-=e.top,this.coordinates.stencil.width+=e.right+e.left,this.coordinates.stencil.height+=e.top+e.bottom},onResizeArea:function(t){var e=t.directions;this.coordinates.area.left-=e.left,this.coordinates.area.top-=e.top,this.coordinates.area.width+=e.right+e.left,this.coordinates.area.height+=e.top+e.bottom},onResizeCurrent:function(t){var e=t.directions;this.coordinates.current.left-=e.left,this.coordinates.current.top-=e.top,this.coordinates.current.width+=e.right+e.left,this.coordinates.current.height+=e.top+e.bottom},onResize:function(t){var e=w({coordinates:Object(o.a)({},this.coordinates.current),restrictions:{minWidth:100,minHeight:100,maxWidth:400,maxHeight:400},aspectRatio:{minimum:.5},allowedArea:{left:this.coordinates.area.left,top:this.coordinates.area.top,bottom:this.coordinates.area.top+this.coordinates.area.height,right:this.coordinates.area.left+this.coordinates.area.width},coefficient:1,resizeEvent:new n.f({},{left:-(this.coordinates.stencil.left-this.coordinates.current.left),top:-(this.coordinates.stencil.top-this.coordinates.current.top),bottom:this.coordinates.stencil.top+this.coordinates.stencil.height-(this.coordinates.current.top+this.coordinates.current.height),right:this.coordinates.stencil.left+this.coordinates.stencil.width-(this.coordinates.current.left+this.coordinates.current.width)},{compensate:!0}),complete:t});this.coordinates.current=Object(o.a)({},e)}}},y=(i(320),i(1)),O=Object(y.a)(x,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"bounding-box-example"},[o("div",{staticClass:"playground"},[o("div",{staticClass:"area-wrapper"},[o("div",{staticClass:"area"},[o("BoundingBox",{staticClass:"area-box",style:t.areaStyle,attrs:{"handler-component":"simple-handler","line-component":"simple-line","lines-classnames":{default:"line line--area"},"handlers-classnames":{default:"handler handler--area"}},on:{resize:t.onResizeArea}}),t._v(" "),o("BoundingBox",{staticClass:"stencil-box",style:t.stencilStyle,attrs:{"handler-component":"simple-handler","line-component":"simple-line","lines-classnames":{default:"line line--stencil"},"handlers-classnames":{default:"handler handler--stencil"}},on:{resize:t.onResizeStencil}}),t._v(" "),o("div",{staticClass:"current-box",style:t.currentStyle})],1),t._v(" "),o("div",{staticClass:"buttons"},[o("div",{staticClass:"button",on:{click:function(e){return t.onResize(!1)}}},[o("img",{attrs:{src:i(92)}})]),t._v(" "),o("div",{staticClass:"button button--complete",on:{click:function(e){return t.onResize(!0)}}},[o("img",{attrs:{src:i(92)}})])])])]),t._v(" "),o("div",{staticClass:"options"},[o("div",{staticClass:"option"},[t._v("\n\t\t\t\tStencil props:\n\t\t\t\t"),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.stencilProps,expression:"stencilProps"}],staticClass:"option__textarea",domProps:{value:t.stencilProps},on:{input:function(e){e.target.composing||(t.stencilProps=e.target.value)}}})])])])},[],!1,null,null,null);e.default=O.exports},77:function(t,e,i){var o=i(89),n=i(20)("toStringTag"),r="Arguments"==o(function(){return arguments}());t.exports=function(t){var e,i,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(i=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),n))?i:r?o(e):"Object"==(c=o(e))&&"function"==typeof e.callee?"Arguments":c}},80:function(t,e,i){var o=i(32),n=i(13),r=i(65);t.exports=function(t,e){var i=(n.Object||{})[t]||Object[t],c={};c[t]=e(i),o(o.S+o.F*r(function(){i(1)}),"Object",c)}},81:function(t,e,i){"use strict";var o=i(149),n=i.n(o),r=i(152),c=i.n(r),a=i(154),s=i.n(a),h=i(93),f=i.n(h);function l(t,e,i){return e in t?f()(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},o=s()(i);"function"==typeof c.a&&(o=o.concat(c()(i).filter(function(t){return n()(i,t).enumerable}))),o.forEach(function(e){l(t,e,i[e])})}return t}i.d(e,"a",function(){return u})},92:function(t,e,i){t.exports=i.p+"assets/img/resize.ea093182.svg"},93:function(t,e,i){t.exports=i(157)}}]);