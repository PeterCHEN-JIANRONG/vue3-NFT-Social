(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f3be5a00"],{1057:function(e,t,c){"use strict";c("bd2d")},"2e91":function(e,t,c){"use strict";c.r(t);var r=c("2909"),n=(c("99af"),c("a434"),c("7a23")),o=c("6c02"),a=c("f286"),l=c("8e50"),s=c("f832"),i=function(e){return Object(n["pushScopeId"])("data-v-67470892"),e=e(),Object(n["popScopeId"])(),e},u=["onSubmit"],b={class:"mb-3"},d=i((function(){return Object(n["createElementVNode"])("label",{for:"content",class:"form-label"},"貼文內容",-1)})),f={class:"mb-5"},m={for:"formFiles",class:"form-label"},p=Object(n["createTextVNode"])("上傳圖片 "),j={class:"spinner-border spinner-border-sm",role:"status"},v={class:"image__card position-relative"},O=["src"],h=["onClick"],g={class:"text-center"},k={key:0,class:"mb-2"},w=i((function(){return Object(n["createElementVNode"])("span",{class:"fs-6 text-danger"},"上傳圖片超過 8 張，請刪除圖片",-1)})),E=[w],V=["disabled"],N={setup:function(e){var t=Object(o["e"])(),c=Object(n["inject"])("axios"),i=Object(n["inject"])("$swal"),w=Object(n["ref"])(!1),N=Object(n["ref"])(null),y=Object(n["ref"])(""),B=Object(n["ref"])([]),_=Object(a["a"])(),C=function(e,c,r){i.fire({position:"center",icon:"success",title:e,text:c,showConfirmButton:!1,timer:1500}).then((function(){t.push(r)}))},x=function(){if(B.value.length>8)i.fire(Object(s["errorAlertConstruct"])("失敗","上傳圖片超過 8 張，請刪除圖片"));else{var e={user:_.user._id,content:y.value,image:B.value,tags:["出遊","快樂的心情"],type:"person"},t="".concat("https://warm-falls-13177.herokuapp.com","/post");w.value=!0,c.post(t,e).then((function(){N.value.reset(),w.value=!1,C("貼文","送出成功","/")})).catch((function(e){console.log(e)}))}},S=Object(n["ref"])(null),F=Object(n["ref"])(!1),D=function(){if(0!==S.value.files.length){if(S.value.files.length>8)return i.fire(Object(s["errorAlertConstruct"])("失敗","上傳圖片超過 8 張，請重新上傳")),void N.value.reset();for(var e=new FormData,t=0;t<S.value.files.length;t+=1){var n=S.value.files[t];e.append("photos",n)}var o="".concat("https://warm-falls-13177.herokuapp.com","/upload/photos"),a={"Content-Type":"multipart/form-data"};F.value=!0,c.post(o,e,{headers:a}).then((function(e){F.value=!1,B.value=[].concat(Object(r["a"])(B.value),Object(r["a"])(e.data.data))})).catch((function(e){F.value=!1,i.fire(Object(s["errorAlertConstruct"])("失敗",e.response.data.message))}))}};return function(e,t){var c=Object(n["resolveComponent"])("Loading");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(c,{active:w.value,"z-index":1060},null,8,["active"]),Object(n["createVNode"])(l["a"],{tittle:"張貼動態"}),Object(n["createElementVNode"])("form",{ref_key:"form",ref:N,class:"shadow__post bg-white border border-2 border-dark p-5 mb-5",onSubmit:Object(n["withModifiers"])(x,["prevent"])},[Object(n["createElementVNode"])("div",b,[d,Object(n["withDirectives"])(Object(n["createElementVNode"])("textarea",{class:"form-control border border-2 border-dark",id:"content",rows:"4","onUpdate:modelValue":t[0]||(t[0]=function(e){return y.value=e})},null,512),[[n["vModelText"],y.value]])]),Object(n["createElementVNode"])("div",f,[Object(n["createElementVNode"])("label",m,[p,Object(n["withDirectives"])(Object(n["createElementVNode"])("span",j,null,512),[[n["vShow"],F.value]])]),Object(n["createElementVNode"])("input",{type:"file",id:"formFiles",class:"form-control mb-2",ref_key:"formFiles",ref:S,onChange:D,multiple:""},null,544),B.value.length>0?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{key:0,class:Object(n["normalizeClass"])(["row g-2",{"row-cols-2":B.value.length>1}])},[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(B.value,(function(e,t){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{class:"col",key:e},[Object(n["createElementVNode"])("div",v,[Object(n["createElementVNode"])("img",{src:e,class:"w-100 h-15s img-cover"},null,8,O),Object(n["createElementVNode"])("span",{class:"image__delete position-absolute top-0 end-0 m-2 fs-6 badge bg-light text-dark cursor-pointer",onClick:function(e){return B.value.splice(t,1)}},"刪除",8,h)])])})),128))],2)):Object(n["createCommentVNode"])("",!0)]),Object(n["createElementVNode"])("div",g,[B.value.length>8?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",k,E)):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("button",{type:"submit",class:"btn btn-secondary w-50 border border-2 border-dark rounded-3",disabled:B.value.length>8||F.value}," 送出貼文 ",8,V)])],40,u)],64)}}},y=(c("1057"),c("d959")),B=c.n(y);const _=B()(N,[["__scopeId","data-v-67470892"]]);t["default"]=_},"8e50":function(e,t,c){"use strict";var r=c("7a23"),n={class:"tittle bg-white border border-2 border-dark mb-3"},o={class:"text-center my-3"},a={props:{tittle:{type:String,default:"標題"}},setup:function(e){return function(t,c){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",n,[Object(r["createElementVNode"])("h1",o,Object(r["toDisplayString"])(e.tittle),1)])}}},l=(c("d89e"),c("d959")),s=c.n(l);const i=s()(a,[["__scopeId","data-v-6333d894"]]);t["a"]=i},bd2d:function(e,t,c){},d89e:function(e,t,c){"use strict";c("ffbc")},ffbc:function(e,t,c){}}]);
//# sourceMappingURL=chunk-f3be5a00.59c83b5d.js.map