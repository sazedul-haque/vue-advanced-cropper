(window.webpackJsonp=window.webpackJsonp||[]).push([[9,37,39,40],{11:function(t,e,i){},12:function(t,e,i){"use strict";var s=i(11);i.n(s).a},14:function(t,e,i){"use strict";i.r(e);i(12);var s=i(1),r=Object(s.a)({},function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"example-wrapper"},[this._t("default")],2)},[],!1,null,null,null);e.default=r.exports},157:function(t,e,i){},32:function(t,e,i){},33:function(t,e,i){},345:function(t,e,i){t.exports=i.p+"assets/img/zoom-in.183e2f11.svg"},346:function(t,e,i){t.exports=i.p+"assets/img/zoom-out.2312de1c.svg"},347:function(t,e,i){t.exports=i.p+"assets/img/arrow-top.83788133.svg"},348:function(t,e,i){t.exports=i.p+"assets/img/arrow-left.68982e03.svg"},349:function(t,e,i){t.exports=i.p+"assets/img/arrow-right.94faf580.svg"},350:function(t,e,i){t.exports=i.p+"assets/img/arrow-bottom.a1a804cf.svg"},351:function(t,e,i){"use strict";var s=i(157);i.n(s).a},394:function(t,e,i){"use strict";i.r(e);var s=i(13),r=i(14),n=i(97),o=i(98),a={components:{Cropper:s.c,ExampleWrapper:r.default,VerticalButtons:n.default,SquareButton:o.default},data:function(){return{image:"https://images.unsplash.com/photo-1538888649860-8fb12eb67541?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1011&q=80",size:{width:null,height:null}}},methods:{boundaries:function(t){var e=t.cropper;t.imageSize;return{width:e.clientWidth,height:e.clientHeight}},updateSize:function(t){var e=t.coordinates;this.size.width=Math.round(e.width),this.size.height=Math.round(e.height)},zoom:function(t){this.$refs.cropper.zoom(t)},move:function(t){"left"===t?this.$refs.cropper.move(-this.size.width/4):"right"===t?this.$refs.cropper.move(this.size.width/4):"top"===t?this.$refs.cropper.move(0,-this.size.height/4):"bottom"===t&&this.$refs.cropper.move(0,this.size.height/4)}}},u=(i(351),i(1)),c=Object(u.a)(a,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("example-wrapper",{staticClass:"manipulate-image-example"},[s("cropper",{ref:"cropper",staticClass:"coordinates-cropper",attrs:{src:t.image,"default-boundaries":t.boundaries,"stencil-props":{minAspectRatio:.5}},on:{change:t.updateSize}}),t._v(" "),s("vertical-buttons",[s("square-button",{attrs:{title:"Zoom In"},on:{click:function(e){return t.zoom(2)}}},[s("img",{attrs:{src:i(345)}})]),t._v(" "),s("square-button",{attrs:{title:"Zoom Out"},on:{click:function(e){return t.zoom(.5)}}},[s("img",{attrs:{src:i(346)}})]),t._v(" "),s("square-button",{attrs:{title:"Move Top"},on:{click:function(e){return t.move("top")}}},[s("img",{attrs:{src:i(347)}})]),t._v(" "),s("square-button",{attrs:{title:"Move Left"},on:{click:function(e){return t.move("left")}}},[s("img",{attrs:{src:i(348)}})]),t._v(" "),s("square-button",{attrs:{title:"Move Right"},on:{click:function(e){return t.move("right")}}},[s("img",{attrs:{src:i(349)}})]),t._v(" "),s("square-button",{attrs:{title:"Move Bottom"},on:{click:function(e){return t.move("bottom")}}},[s("img",{attrs:{src:i(350)}})])],1),t._v(" "),t.size.width&&t.size.height?s("div",{staticClass:"size-info"},[s("div",[t._v("Width: "+t._s(t.size.width)+"px")]),t._v(" "),s("div",[t._v("Height: "+t._s(t.size.height)+"px")])]):t._e()],1)},[],!1,null,null,null);e.default=c.exports},81:function(t,e,i){"use strict";var s=i(32);i.n(s).a},82:function(t,e,i){"use strict";var s=i(33);i.n(s).a},97:function(t,e,i){"use strict";i.r(e);i(81);var s=i(1),r=Object(s.a)({},function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"vertical-buttons"},[this._t("default")],2)},[],!1,null,null,null);e.default=r.exports},98:function(t,e,i){"use strict";i.r(e);i(82);var s=i(1),r=Object(s.a)({},function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",t._b({staticClass:"square-button",on:{click:function(e){return t.$emit("click",e)}}},"div",t.$attrs,!1),[t._t("default")],2)},[],!1,null,null,null);e.default=r.exports}}]);