(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{151:function(t,e,a){},358:function(t,e,a){"use strict";var s=a(151);a.n(s).a},385:function(t,e,a){"use strict";a.r(e);var s={components:{Cropper:a(11).c},data:function(){return{image:"https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80"}},methods:{reset:function(){this.image=null},uploadImage:function(t){var e=this.$refs.cropper.getResult().canvas;if(e){var a=new FormData;e.toBlob(function(t){a.append("file",t),fetch("http://example.com/upload/",{method:"POST",body:a})},"image/jpeg")}}}},i=(a(358),a(1)),o=Object(i.a)(s,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"upload-to-server-example"},[e("div",{staticClass:"cropper-wrapper"},[e("cropper",{ref:"cropper",attrs:{src:this.image}})],1),this._v(" "),e("div",{staticClass:"button-wrapper"},[e("span",{staticClass:"button",on:{click:this.uploadImage}},[this._v("\n        Crop image\n      ")])])])},[],!1,null,null,null);e.default=o.exports}}]);