(window.webpackJsonp=window.webpackJsonp||[]).push([[13,17],{149:function(t,e,s){},21:function(t,e,s){},311:function(t,e,s){"use strict";var n=s(149);s.n(n).a},355:function(t,e,s){"use strict";s.r(e);var n=s(68),i={components:{Cropper:s(11).b},data:function(){return{img:"https://images.pexels.com/photos/1451124/pexels-photo-1451124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",stencil:n.default}}},o=(s(311),s(1)),c=Object(o.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"advanced-stencil-example"},[e("Cropper",{attrs:{src:this.img,"stencil-component":this.stencil}})],1)},[],!1,null,null,null);e.default=c.exports},51:function(t,e,s){t.exports=s.p+"assets/img/handler.d2843e4e.svg"},52:function(t,e,s){"use strict";var n=s(21);s.n(n).a},68:function(t,e,s){"use strict";s.r(e);var n=s(11),i={name:"CircleStencil",components:{PreviewResult:n.e,DraggableArea:n.c,DraggableElement:n.d},props:{img:{type:Object},resultCoordinates:{type:Object},stencilCoordinates:{type:Object}},computed:{style:function(){var t=this.stencilCoordinates,e=t.height,s=t.width,n=t.left,i=t.top;return{width:"".concat(s,"px"),height:"".concat(e,"px"),left:"".concat(n,"px"),top:"".concat(i,"px")}}},methods:{onMove:function(t){this.$emit("move",t)},onHandlerMove:function(t){var e=t.shift(),s=e.left/2,i=-e.top/2,o=this.resultCoordinates;o.height,o.width,o.left,o.top;this.$emit("resize",new n.f(t.nativeEvent,{left:s,right:s,top:i,bottom:i},{compensate:!0}))},aspectRatios:function(){return{minimum:1,maximum:1}}}},o=(s(52),s(1)),c=Object(o.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"circle-stencil",style:this.style},[e("DraggableElement",{attrs:{classname:"circle-stencil__handler"},on:{drag:this.onHandlerMove}},[e("img",{staticClass:"circle-stencil__icon",attrs:{src:s(51),alt:""}})]),this._v(" "),e("DraggableArea",{on:{move:this.onMove}},[e("PreviewResult",{attrs:{classname:"circle-stencil__preview",img:this.img,"result-coordinates":this.resultCoordinates,"stencil-coordinates":this.stencilCoordinates}})],1)],1)},[],!1,null,null,null);e.default=c.exports}}]);