(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{147:function(t,i,e){},335:function(t,i,e){t.exports=e.p+"assets/img/resize.ea093182.svg"},336:function(t,i,e){t.exports=e.p+"assets/img/resize-vertical.6e8efe13.svg"},337:function(t,i,e){t.exports=e.p+"assets/img/resize-horizontal.a014d1ec.svg"},338:function(t,i,e){t.exports=e.p+"assets/img/resize-reduce.36d53e78.svg"},339:function(t,i,e){t.exports=e.p+"assets/img/resize-maximize.2b3cc6c2.svg"},340:function(t,i,e){t.exports=e.p+"assets/img/center.9908b0d1.svg"},341:function(t,i,e){"use strict";var s=e(147);e.n(s).a},382:function(t,i,e){"use strict";e.r(i);var s={components:{Cropper:e(11).c},data:function(){return{image:"https://images.unsplash.com/photo-1532182657011-d3d31357b5d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=696&q=80",size:{width:null,height:null}}},methods:{updateSize:function(t){var i=t.coordinates;this.size.width=Math.round(i.width),this.size.height=Math.round(i.height)},resize:function(){var t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$refs.cropper.setCoordinates([function(s,n){return t=s,{width:s.width*i,height:s.height*e}},function(i,e){return{left:t.left+(t.width-i.width)/2,top:t.top+(t.height-i.height)/2}}])},center:function(){this.$refs.cropper.setCoordinates(function(t,i){return{left:i.width/2-t.width/2,top:i.height/2-t.height/2}})},maximize:function(){var t=this.$refs.cropper,i=t.coordinates.left+t.coordinates.width/2,e=t.coordinates.top+t.coordinates.height/2;t.setCoordinates([function(t,i){return{width:i.width,height:i.height}},function(t,s){return{left:i-t.width/2,top:e-t.height/2}}])}}},n=(e(341),e(1)),r=Object(n.a)(s,function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"set-coordinates-example"},[s("Cropper",{ref:"cropper",staticClass:"coodinates-cropper",attrs:{src:t.image,"stencil-props":{minAspectRatio:.5}},on:{change:t.updateSize}}),t._v(" "),s("div",{staticClass:"buttons"},[s("div",{staticClass:"button",attrs:{title:"Resize (x2)"},on:{click:function(i){return t.resize(2,2)}}},[s("img",{attrs:{src:e(335)}})]),t._v(" "),s("div",{staticClass:"button",attrs:{title:"Resize height (x2)"},on:{click:function(i){return t.resize(1,2)}}},[s("img",{attrs:{src:e(336)}})]),t._v(" "),s("div",{staticClass:"button",attrs:{title:"Resize width (x2)"},on:{click:function(i){return t.resize(2,1)}}},[s("img",{attrs:{src:e(337)}})]),t._v(" "),s("div",{staticClass:"button",attrs:{title:"Resize (x1/2)"},on:{click:function(i){return t.resize(.5,.5)}}},[s("img",{attrs:{src:e(338)}})]),t._v(" "),s("div",{staticClass:"button",attrs:{title:"Maximize"},on:{click:function(i){return t.maximize()}}},[s("img",{attrs:{src:e(339)}})]),t._v(" "),s("div",{staticClass:"button",attrs:{title:"Center"},on:{click:function(i){return t.center()}}},[s("img",{attrs:{src:e(340)}})])]),t._v(" "),t.size.width&&t.size.height?s("div",{staticClass:"size-info"},[s("div",[t._v("Width: "+t._s(t.size.width)+"px")]),t._v(" "),s("div",[t._v("Height: "+t._s(t.size.height)+"px")])]):t._e()],1)},[],!1,null,null,null);i.default=r.exports}}]);