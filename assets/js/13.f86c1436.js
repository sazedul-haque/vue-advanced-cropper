(window.webpackJsonp=window.webpackJsonp||[]).push([[13,17],{123:function(t,e,s){},20:function(t,e,s){},305:function(t,e,s){"use strict";var i=s(123);s.n(i).a},354:function(t,e,s){"use strict";s.r(e);var i=s(63),n={components:{Cropper:s(11).c},data:function(){return{img:"https://images.pexels.com/photos/1451124/pexels-photo-1451124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",stencil:i.default}}},o=(s(305),s(1)),c=Object(o.a)(n,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"advanced-stencil-example"},[e("Cropper",{attrs:{src:this.img,"stencil-component":this.stencil}})],1)},[],!1,null,null,null);e.default=c.exports},47:function(t,e,s){t.exports=s.p+"assets/img/handler.d2843e4e.svg"},48:function(t,e,s){"use strict";var i=s(20);s.n(i).a},63:function(t,e,s){"use strict";s.r(e);var i=s(11),n={name:"CircleStencil",components:{PreviewResult:i.f,DraggableArea:i.d,DraggableElement:i.e},props:{img:{type:Object},resultCoordinates:{type:Object},stencilCoordinates:{type:Object}},computed:{style:function(){var t=this.stencilCoordinates,e=t.height,s=t.width,i=t.left,n=t.top;return{width:"".concat(s,"px"),height:"".concat(e,"px"),left:"".concat(i,"px"),top:"".concat(n,"px")}}},methods:{onMove:function(t){this.$emit("move",t)},onHandlerMove:function(t){var e=t.shift(),s=e.left/2,n=-e.top/2,o=this.resultCoordinates;o.height,o.width,o.left,o.top;this.$emit("resize",new i.h({left:s,right:s,top:n,bottom:n},{compensate:!0}))},aspectRatios:function(){return{minimum:1,maximum:1}}}},o=(s(48),s(1)),c=Object(o.a)(n,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"circle-stencil",style:this.style},[e("DraggableElement",{staticClass:"circle-stencil__handler",on:{drag:this.onHandlerMove}},[e("img",{staticClass:"circle-stencil__icon",attrs:{src:s(47),alt:""}})]),this._v(" "),e("DraggableArea",{on:{move:this.onMove}},[e("PreviewResult",{staticClass:"circle-stencil__preview",attrs:{img:this.img,"result-coordinates":this.resultCoordinates,"stencil-coordinates":this.stencilCoordinates}})],1)],1)},[],!1,null,null,null);e.default=c.exports}}]);