(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{132:function(t,s,e){},315:function(t,s,e){"use strict";var i=e(132);e.n(i).a},375:function(t,s,e){"use strict";e.r(s);var i={components:{Cropper:e(11).c},data:function(){return{img:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",coordinates:{width:0,height:0,left:0,top:0},image:null}},methods:{crop:function(){var t=this.$refs.cropper.getResult(),s=t.coordinates,e=t.canvas;this.coordinates=s,this.image=e.toDataURL()}}},a=(e(315),e(1)),n=Object(a.a)(i,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"getting-result-second-example"},[e("Cropper",{ref:"cropper",attrs:{src:t.img,"stencil-props":{aspectRatio:1}}}),t._v(" "),e("div",{staticClass:"results-wrapper"},[this.image?e("div",{staticClass:"results"},[t._m(0),t._v(" "),e("p",[t._v("\n        Width: "+t._s(t.coordinates.width)+"\n      ")]),t._v(" "),e("p",[t._v("\n        Height: "+t._s(t.coordinates.height)+"\n      ")]),t._v(" "),e("p",[t._v("\n        Left: "+t._s(t.coordinates.left)+"\n      ")]),t._v(" "),e("p",[t._v("\n        Top: "+t._s(t.coordinates.top)+"\n      ")])]):t._e(),t._v(" "),this.image?e("div",{staticClass:"preview"},[e("img",{attrs:{src:this.image,alt:""}})]):t._e()]),t._v(" "),e("div",{staticClass:"button",on:{click:t.crop}},[t._v("\n    Crop Image\n  ")])],1)},[function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("b",[this._v("Results:")])])}],!1,null,null,null);s.default=n.exports}}]);