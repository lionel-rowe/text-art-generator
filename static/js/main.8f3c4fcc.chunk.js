(this["webpackJsonptext-art-generator"]=this["webpackJsonptext-art-generator"]||[]).push([[0],{17:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);n(17);var r=n(15),a=n(4),c=n(2),o=n(10),i=n(1),u=n(6),s=n(7),l=new Proxy(document.documentElement,{get:function(e,t){return parseFloat(getComputedStyle(e).getPropertyValue("--".concat(t.replace(/[a-z][A-Z]/g,(function(e){return Object(u.a)(e).join("-").toLowerCase()})))))}}),f=navigator.userAgent.includes("Mobi"),d=function(){var e=f?window.screen:document.documentElement.getBoundingClientRect();return[e.width,e.height]},b=function(){return d()[0]},m=function(e){var t=document.createElement(e);return t.classList.add("invisible"),t.setAttribute("aria-hidden","true"),document.body.appendChild(t),t},j=function(){var e;null===(e=document.querySelector("#file"))||void 0===e||e.classList.add("max-hit-box")},h=function(e){var t;e&&1&e.buttons||(null===(t=document.querySelector("#file"))||void 0===t||t.classList.remove("max-hit-box"))},v=/[\n \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,p=m("pre"),O=function(e){return function(t){p.textContent="".concat("".concat(t.repeat(e),"\n").repeat(e));var n=p.getBoundingClientRect(),r=n.width,a=n.height,c=Math.min(r,a);return p.textContent="",{width:r/e,height:a/e,aspectRatio:[c/r,c/a]}}};var g,x,y=n(8);!function(e){e[e.Red=0]="Red",e[e.Green=1]="Green",e[e.Blue=2]="Blue",e[e.Alpha=3]="Alpha",e[e.Modulus=4]="Modulus"}(x||(x={}));var w=(g={},Object(y.a)(g,x.Red,.299),Object(y.a)(g,x.Green,.587),Object(y.a)(g,x.Blue,.114),g),C=function(e){var t,n=document.createElement("canvas").getContext("2d"),r=Object(u.a)(e).map(function(e){return function(t){var n=e.canvas;n.height=70,n.width=70;var r=[0,0,n.width,n.height];return e.font="48px monospace",e.fillStyle="#fff",e.fillRect.apply(e,r),e.fillStyle="#000",e.fillText(t,10,50),{ch:t,val:e.getImageData.apply(e,r).data.reduce((function(e,t,n){return n%x.Modulus===x.Alpha?e:e+t}),0)}}}(n)),a=-1/0,c=1/0,o=Object(s.a)(r);try{for(o.s();!(t=o.n()).done;){var i=t.value.val;a=Math.max(a,i),c=Math.min(c,i)}}catch(l){o.e(l)}finally{o.f()}return{charVals:r,min:c,max:a}},k=function(e){return Math.pow(10,e/50-1)},E=["brightness","contrast","charVals"],M=function(e){var t=e.brightness,n=e.contrast,r=e.charVals,a=Object(o.a)(e,E);if(!r.length)return[];var c,i,l=a.pixelMatrix,f=a.allPixels,d=k(t),b=(c=k(n),function(e){return e<.5?Math.pow(2,c-1)*Math.pow(e,c):1-Math.pow(-2*e+2,c)/2}),m=0,j=r[m],h=Object(s.a)(f);try{for(h.s();!(i=h.n()).done;){for(var v,p=i.value;m<r.length;){if(j=r[m],b(p.val)*d<=j.val){p.ch=j.ch;break}++m}p.ch=(null===(v=j)||void 0===v?void 0:v.ch)||" "}}catch(O){h.e(O)}finally{h.f()}return Object(u.a)(l)},S=new Map,L=function(e){return new Promise((function(t){var n=new FileReader;n.onload=function(e){return t(e.target.result)},n.readAsDataURL(e)}))},N=[{name:"ASCII",content:Object(u.a)(new Array(4096)).map((function(e,t){return String.fromCodePoint(t)})).filter((function(e){return/[ -~]/.test(e)})).join("")},{name:"Block",content:"\u2582\u2583\u2585\u2586\u2587"},{name:"Block 2",content:"\u2580\u2584\u2588\u258c\u2590\u2591\u2592\u2593"},{name:"Kana",content:"\u3000\u3041\u3042\u3043\u3044\u3045\u3046\u3047\u3048\u3049\u304a\u304b\u304c\u304d\u304e\u304f\u3050\u3051\u3052\u3053\u3054\u3055\u3056\u3057\u3058\u3059\u305a\u305b\u305c\u305d\u305e\u305f\u3060\u3061\u3062\u3063\u3064\u3065\u3066\u3067\u3068\u3069\u306a\u306b\u306c\u306d\u306e\u306f\u3070\u3071\u3072\u3073\u3074\u3075\u3076\u3077\u3078\u3079\u307a\u307b\u307c\u307d\u307e\u307f\u3080\u3081\u3082\u3083\u3084\u3085\u3086\u3087\u3088\u3089\u308a\u308b\u308c\u308d\u308e\u308f\u3090\u3091\u3092\u3093\u3094\u3095\u309b\u309c\u309d\u309e\u309f\u30a0\u30a1\u30a2\u30a3\u30a4\u30a5\u30a6\u30a7\u30a8\u30a9\u30aa\u30ab\u30ac\u30ad\u30ae\u30af\u30b0\u30b1\u30b2\u30b3\u30b4\u30b5\u30b6\u30b7\u30b8\u30b9\u30ba\u30bb\u30bc\u30bd\u30be\u30bf\u30c0\u30c1\u30c2\u30c3\u30c4\u30c5\u30c6\u30c7\u30c8\u30c9\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d0\u30d1\u30d2\u30d3\u30d4\u30d5\u30d6\u30d7\u30d8\u30d9\u30da\u30db\u30dc\u30dd\u30de\u30df\u30e0\u30e1\u30e2\u30e3\u30e4\u30e5\u30e6\u30e7\u30e8\u30e9\u30ea\u30eb\u30ec\u30ed\u30ee\u30ef\u30f0\u30f1\u30f2\u30f3\u30f4\u30f5\u30f6\u30f7\u30f8\u30f9\u30fa\u30fb\u30fc\u30fd\u30fe\u30ff\u3096"},{name:"Qian Zi Jing",content:"\u5929\u5730\u7384\u9ec3\uff0c\u5b87\u5b99\u6d2a\u8352\u3002\u3000\u65e5\u6708\u76c8\u6603\uff0c\u8fb0\u5bbf\u5217\u5f35\u3002\n\u5bd2\u4f86\u6691\u5f80\uff0c\u79cb\u6536\u51ac\u85cf\u3002\u3000\u958f\u9918\u6210\u6b72\uff0c\u5f8b\u5442\u8abf\u967d\u3002\n\u96f2\u9a30\u81f4\u96e8\uff0c\u9732\u7d50\u70ba\u971c\u3002\u3000\u91d1\u751f\u9e97\u6c34\uff0c\u7389\u51fa\u5d11\u5d17\u3002\n\u528d\u865f\u5de8\u95d5\uff0c\u73e0\u7a31\u591c\u5149\u3002\u3000\u679c\u73cd\u674e\u67f0\uff0c\u83dc\u91cd\u82a5\u8591\u3002\n\u6d77\u9e79\u6cb3\u6de1\uff0c\u9c57\u6f5b\u7fbd\u7fd4\u3002\u3000\u9f8d\u5e2b\u706b\u5e1d\uff0c\u9ce5\u5b98\u4eba\u7687\u3002\n\u59cb\u5236\u6587\u5b57\uff0c\u4e43\u670d\u8863\u88f3\u3002\u3000\u63a8\u4f4d\u8b93\u570b\uff0c\u6709\u865e\u9676\u5510\u3002\n\u5f14\u6c11\u4f10\u7f6a\uff0c\u5468\u767c\u6bb7\u6e6f\u3002\u3000\u5750\u671d\u554f\u9053\uff0c\u5782\u62f1\u5e73\u7ae0\u3002\n\u611b\u80b2\u9ece\u9996\uff0c\u81e3\u4f0f\u620e\u7f8c\u3002\u3000\u9050\u9087\u58f9\u9ad4\uff0c\u7387\u8cd3\u6b78\u738b\u3002\n\u9cf4\u9cf3\u5728\u6a39\uff0c\u767d\u99d2\u98df\u5834\u3002\u3000\u5316\u88ab\u8349\u6728\uff0c\u8cf4\u53ca\u842c\u65b9\u3002\n\u84cb\u6b64\u8eab\u9aee\uff0c\u56db\u5927\u4e94\u5e38\u3002\u3000\u606d\u60df\u97a0\u990a\uff0c\u8c48\u6562\u6bc0\u50b7\u3002\n\u5973\u6155\u8c9e\u7d5c\uff0c\u7537\u6548\u624d\u826f\u3002\u3000\u77e5\u904e\u5fc5\u6539\uff0c\u5f97\u80fd\u83ab\u5fd8\u3002\n\u7f54\u8ac7\u5f7c\u77ed\uff0c\u9761\u6043\u5df1\u9577\u3002\u3000\u4fe1\u4f7f\u53ef\u8986\uff0c\u5668\u6b32\u96e3\u91cf\u3002\n\u58a8\u60b2\u7d72\u67d3\uff0c\u8a69\u8b9a\u7f94\u7f8a\u3002\u3000\u666f\u884c\u7dad\u8ce2\uff0c\u524b\u5ff5\u4f5c\u8056\u3002\n\u5fb7\u5efa\u540d\u7acb\uff0c\u5f62\u7aef\u8868\u6b63\u3002\u3000\u7a7a\u8c37\u50b3\u8072\uff0c\u865b\u5802\u7fd2\u807d\u3002\n\u798d\u56e0\u60e1\u7a4d\uff0c\u798f\u7de3\u5584\u6176\u3002\u3000\u5c3a\u74a7\u975e\u5bf6\uff0c\u5bf8\u9670\u662f\u7af6\u3002\n\u8cc7\u7236\u4e8b\u541b\uff0c\u66f0\u56b4\u8207\u656c\u3002\u3000\u5b5d\u7576\u7aed\u529b\uff0c\u5fe0\u5247\u76e1\u547d\u3002\n\u81e8\u6df1\u5c65\u8584\uff0c\u5919\u8208\u6eab\u51ca\u3002\u3000\u4f3c\u862d\u65af\u99a8\uff0c\u5982\u677e\u4e4b\u76db\u3002\n\u5ddd\u6d41\u4e0d\u606f\uff0c\u6df5\u6f84\u53d6\u6620\u3002\u3000\u5bb9\u6b62\u82e5\u601d\uff0c\u8a00\u8fad\u5b89\u5b9a\u3002\n\u7be4\u521d\u8aa0\u7f8e\uff0c\u614e\u7d42\u5b9c\u4ee4\u3002\u3000\u69ae\u696d\u6240\u57fa\uff0c\u85c9\u751a\u7121\u7adf\u3002\n\u5b78\u512a\u767b\u4ed5\uff0c\u651d\u8077\u5f9e\u653f\u3002\u3000\u5b58\u4ee5\u7518\u68e0\uff0c\u53bb\u800c\u76ca\u8a60\u3002\n\u6a02\u6b8a\u8cb4\u8ce4\uff0c\u79ae\u5225\u5c0a\u5351\u3002\u3000\u4e0a\u548c\u4e0b\u7766\uff0c\u592b\u5531\u5a66\u96a8\u3002\n\u5916\u53d7\u5085\u8a13\uff0c\u5165\u5949\u6bcd\u5100\u3002\u3000\u8af8\u59d1\u4f2f\u53d4\uff0c\u7336\u5b50\u6bd4\u5152\u3002\n\u5b54\u61f7\u5144\u5f1f\uff0c\u540c\u6c23\u9023\u679d\u3002\u3000\u4ea4\u53cb\u6295\u5206\uff0c\u5207\u78e8\u7bb4\u898f\u3002\n\u4ec1\u6148\u96b1\u60fb\uff0c\u9020\u6b21\u5f17\u96e2\u3002\u3000\u7bc0\u7fa9\u5ec9\u9000\uff0c\u985b\u6c9b\u532a\u8667\u3002\n\u6027\u975c\u60c5\u9038\uff0c\u5fc3\u52d5\u795e\u75b2\u3002\u3000\u5b88\u771f\u5fd7\u6eff\uff0c\u9010\u7269\u610f\u79fb\u3002\n\u5805\u6301\u96c5\u64cd\uff0c\u597d\u7235\u81ea\u7e3b\u3002\u3000\u90fd\u9091\u83ef\u590f\uff0c\u6771\u897f\u4e8c\u4eac\u3002\n\u80cc\u9099\u9762\u6d1b\uff0c\u6d6e\u6e2d\u64da\u6d87\u3002\u3000\u5bae\u6bbf\u76e4\u9b31\uff0c\u6a13\u89c0\u98db\u9a5a\u3002\n\u5716\u5beb\u79bd\u7378\uff0c\u756b\u7db5\u4ed9\u9748\u3002\u3000\u4e19\u820d\u508d\u555f\uff0c\u7532\u5e33\u5c0d\u6979\u3002\n\u8086\u7b75\u8a2d\u5e2d\uff0c\u9f13\u745f\u5439\u7b19\u3002\u3000\u5347\u968e\u7d0d\u965b\uff0c\u5f01\u8f49\u7591\u661f\u3002\n\u53f3\u901a\u5ee3\u5167\uff0c\u5de6\u9054\u627f\u660e\u3002\u3000\u65e2\u96c6\u58b3\u5178\uff0c\u4ea6\u805a\u7fa4\u82f1\u3002\n\u675c\u7a3f\u937e\u96b8\uff0c\u6f06\u66f8\u58c1\u7d93\u3002\u3000\u5e9c\u7f85\u5c07\u76f8\uff0c\u8def\u4fe0\u69d0\u537f\u3002\n\u6236\u5c01\u516b\u7e23\uff0c\u5bb6\u7d66\u5343\u5175\u3002\u3000\u9ad8\u51a0\u966a\u8f26\uff0c\u9a45\u8f42\u632f\u7e93\u3002\n\u4e16\u797f\u4f88\u5bcc\uff0c\u8eca\u99d5\u80a5\u8f15\u3002\u3000\u7b56\u529f\u8302\u5be6\uff0c\u52d2\u7891\u523b\u9298\u3002\n\u78fb\u6eaa\u4f0a\u5c39\uff0c\u4f50\u6642\u963f\u8861\u3002\u3000\u5944\u5b85\u66f2\u961c\uff0c\u5fae\u65e6\u5b70\u71df\u3002\n\u6853\u516c\u5321\u5408\uff0c\u6fdf\u5f31\u6276\u50be\u3002\u3000\u7dba\u8ff4\u6f22\u60e0\uff0c\u8aaa\u611f\u6b66\u4e01\u3002\n\u4fca\u4e42\u5bc6\u52ff\uff0c\u591a\u58eb\u5bd4\u5be7\u3002\u3000\u6649\u695a\u66f4\u9738\uff0c\u8d99\u9b4f\u56f0\u6a6b\u3002\n\u5047\u9014\u6ec5\u8662\uff0c\u8e10\u571f\u6703\u76df\u3002\u3000\u4f55\u9075\u7d04\u6cd5\uff0c\u97d3\u5f0a\u7169\u5211\u3002\n\u8d77\u7fe6\u9817\u7267\uff0c\u7528\u8ecd\u6700\u7cbe\u3002\u3000\u5ba3\u5a01\u6c99\u6f20\uff0c\u99b3\u8b7d\u4e39\u9752\u3002\n\u4e5d\u5dde\u79b9\u8de1\uff0c\u767e\u90e1\u79e6\u5e76\u3002\u3000\u5dbd\u5b97\u6052\u5cb1\uff0c\u79aa\u4e3b\u4e91\u4ead\u3002\n\u96c1\u9580\u7d2b\u585e\uff0c\u96de\u7530\u8d64\u57ce\u3002\u3000\u6606\u6c60\u78a3\u77f3\uff0c\u9245\u91ce\u6d1e\u5ead\u3002\n\u66e0\u9060\u7dbf\u9088\uff0c\u5dd6\u5cab\u6773\u51a5\u3002\u3000\u6cbb\u672c\u65bc\u8fb2\uff0c\u52d9\u8332\u7a3c\u7a61\u3002\n\u4ff6\u8f09\u5357\u755d\uff0c\u6211\u85dd\u9ecd\u7a37\u3002\u3000\u7a05\u719f\u8ca2\u65b0\uff0c\u52f8\u8cde\u9edc\u965f\u3002\n\u5b5f\u8efb\u6566\u7d20\uff0c\u53f2\u9b5a\u79c9\u76f4\u3002\u3000\u5eb6\u5e7e\u4e2d\u5eb8\uff0c\u52de\u8b19\u8b39\u6555\u3002\n\u8046\u97f3\u5bdf\u7406\uff0c\u9452\u8c8c\u8fa8\u8272\u3002\u3000\u8cbd\u53a5\u5609\u7337\uff0c\u52c9\u5176\u7957\u690d\u3002\n\u7701\u8eac\u8b4f\u8aa1\uff0c\u5bf5\u589e\u6297\u6975\u3002\u3000\u6b86\u8fb1\u8fd1\u6065\uff0c\u6797\u768b\u5e78\u5373\u3002\n\u5169\u758f\u898b\u6a5f\uff0c\u89e3\u7d44\u8ab0\u903c\u3002\u3000\u7d22\u5c45\u9592\u8655\uff0c\u6c89\u9ed8\u5bc2\u5be5\u3002\n\u6c42\u53e4\u5c0b\u8ad6\uff0c\u6563\u616e\u900d\u9059\u3002\u3000\u6b23\u594f\u7d2f\u9063\uff0c\u617c\u8b1d\u6b61\u62db\u3002\n\u6e20\u8377\u7684\u6b77\uff0c\u5712\u83bd\u62bd\u689d\u3002\u3000\u6787\u6777\u665a\u7fe0\uff0c\u68a7\u6850\u65e9\u51cb\u3002\n\u9673\u6839\u59d4\u7ff3\uff0c\u843d\u8449\u98c4\u98bb\u3002\u3000\u904a\u9d7e\u7368\u904b\uff0c\u51cc\u6469\u7d73\u9704\u3002\n\u803d\u8b80\u7feb\u5e02\uff0c\u5bd3\u76ee\u56ca\u7bb1\u3002\u3000\u6613\u8f36\u6538\u754f\uff0c\u5c6c\u8033\u57a3\u7246\u3002\n\u5177\u81b3\u9910\u98ef\uff0c\u9069\u53e3\u5145\u8178\u3002\u3000\u98fd\u98eb\u70f9\u5bb0\uff0c\u98e2\u53ad\u7cdf\u7ce0\u3002\n\u89aa\u621a\u6545\u820a\uff0c\u8001\u5c11\u7570\u7ce7\u3002\u3000\u59be\u5fa1\u7e3e\u7d21\uff0c\u4f8d\u5dfe\u5e37\u623f\u3002\n\u7d08\u6247\u5713\u6f54\uff0c\u9280\u71ed\u7152\u714c\u3002\u3000\u665d\u7720\u5915\u5bd0\uff0c\u85cd\u7b4d\u8c61\u5e8a\u3002\n\u5f26\u6b4c\u9152\u5bb4\uff0c\u63a5\u676f\u8209\u89f4\u3002\u3000\u77ef\u624b\u9813\u8db3\uff0c\u6085\u8c6b\u4e14\u5eb7\u3002\n\u5ae1\u5f8c\u55e3\u7e8c\uff0c\u796d\u7940\u70dd\u5617\u3002\u3000\u7a3d\u9859\u518d\u62dc\uff0c\u609a\u61fc\u6050\u60f6\u3002\n\u724b\u7252\u7c21\u8981\uff0c\u9867\u7b54\u5be9\u8a73\u3002\u3000\u9ab8\u57a2\u60f3\u6d74\uff0c\u57f7\u71b1\u9858\u6dbc\u3002\n\u9a62\u9a3e\u72a2\u7279\uff0c\u99ed\u8e8d\u8d85\u9a64\u3002\u3000\u8a85\u65ac\u8cca\u76dc\uff0c\u6355\u7372\u53db\u4ea1\u3002\n\u5e03\u5c04\u907c\u4e38\uff0c\u5d47\u7434\u962e\u562f\u3002\u3000\u606c\u7b46\u502b\u7d19\uff0c\u921e\u5de7\u4efb\u91e3\u3002\n\u91cb\u7d1b\u5229\u4fd7\uff0c\u4e26\u7686\u4f73\u5999\u3002\u3000\u6bdb\u65bd\u6dd1\u59ff\uff0c\u5de5\u9870\u598d\u7b11\u3002\n\u5e74\u77e2\u6bcf\u50ac\uff0c\u66e6\u6689\u6717\u66dc\u3002\u3000\u7487\u74a3\u61f8\u65a1\uff0c\u6666\u9b44\u74b0\u7167\u3002\n\u6307\u85aa\u4fee\u795c\uff0c\u6c38\u7d8f\u5409\u52ad\u3002\u3000\u77e9\u6b65\u5f15\u9818\uff0c\u4fef\u4ef0\u5eca\u5edf\u3002\n\u675f\u5e36\u77dc\u838a\uff0c\u5f98\u5f8a\u77bb\u773a\u3002\u3000\u5b64\u964b\u5be1\u805e\uff0c\u611a\u8499\u7b49\u8a9a\u3002\n\u8b02\u8a9e\u52a9\u8005\uff0c\u7109\u54c9\u4e4e\u4e5f\u3002",default:!0},{name:"Fullwidth ASCII",content:"\u3000\uff01\uff02\uff03\uff04\uff05\uff06\uff07\uff08\uff09\uff0a\uff0b\uff0c\uff0d\uff0e\uff0f\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\uff1a\uff1b\uff1c\uff1d\uff1e\uff1f\uff20\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff2a\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a\uff3b\uff3c\uff3d\uff3e\uff3f\uff40\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff4a\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a\uff5b\uff5c\uff5d\uff5e",default:!0}],R="eye.jpg",A=["/text-art-generator",R].join("/"),F={fileName:R,src:A,alphabet:N.find((function(e){return e.default})).content,resolutionX:200,invert:!1,brightness:50,contrast:50},I=n(3),B=n.n(I),P=n(5),T=n(16),V=Object(T.a)("keyval-store",1,{upgrade:function(e){e.createObjectStore("keyval")}}),X={get:function(e){return Object(P.a)(B.a.mark((function t(){return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,V;case 2:return t.abrupt("return",t.sent.get("keyval",e));case 3:case"end":return t.stop()}}),t)})))()},set:function(e,t){return Object(P.a)(B.a.mark((function n(){return B.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,V;case 2:return n.abrupt("return",n.sent.put("keyval",t,e));case 3:case"end":return n.stop()}}),n)})))()},del:function(e){return Object(P.a)(B.a.mark((function t(){return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,V;case 2:return t.abrupt("return",t.sent.delete("keyval",e));case 3:case"end":return t.stop()}}),t)})))()},clear:function(){return Object(P.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V;case 2:return e.abrupt("return",e.sent.clear("keyval"));case 3:case"end":return e.stop()}}),e)})))()},keys:function(){return Object(P.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V;case 2:return e.abrupt("return",e.sent.getAllKeys("keyval"));case 3:case"end":return e.stop()}}),e)})))()}};window.idb=X;var z,U=function(e){return new Promise((function(t){var n=setTimeout((function(){return t(n)}),e)}))},D=function(){return new Promise((function(e){return requestAnimationFrame(e)}))},G={success:{icon:"\u2705"},failure:{icon:"\u274c"},generic:{icon:""}},q=Object.fromEntries(Object.keys(G).map((function(e){return[e,(t={style:e},function(){var e=Object(P.a)(B.a.mark((function e(n){var r;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=document.createElement("div")).classList.add("toast"),r.style.opacity="0",r.style.transition="opacity 0.6s",r.textContent=[G[t.style].icon,n].filter(Boolean).join(" "),document.body.appendChild(r),e.next=8,D();case 8:return r.style.opacity="1",e.next=11,U(2600);case 11:return r.style.transition="opacity 0.8s",r.style.opacity="0",e.next=15,U(800);case 15:r.remove();case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())];var t}))),J=n(12),K=n(0),Z=function(e){var t=e.content,n=Object(i.useState)(0),r=Object(c.a)(n,2),a=r[0],o=r[1],u=Object(i.useCallback)((function(e){e&&o(Math.min(b()-e.getBoundingClientRect().x-l.margin,400))}),[]);return Object(K.jsx)("span",{ref:u,className:"tooltip",style:{width:a},children:t})},H=function(e){var t=e.tooltip,n=e.className,r=Object(i.useState)(!1),a=Object(c.a)(r,2),o=a[0],u=a[1],s=function(){return u(!0)};return Object(K.jsx)("span",{className:"help-parent",children:Object(K.jsxs)("span",{onMouseEnter:s,onClick:s,onMouseLeave:function(){return u(!1)},role:"button","aria-label":"Help",children:[Object(K.jsx)("span",{"aria-hidden":!0,className:Object(J.a)(["help",n]),children:"?"}),o&&Object(K.jsx)(Z,{content:t})]})})},Q=function(e){var t=e.handleUpload,n=e.fileName,r=e.src,a=Object(i.useCallback)(function(){var e=Object(P.a)(B.a.mark((function e(n){var r,a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=null===(r=n.target.files)||void 0===r?void 0:r[0]){e.next=5;break}return e.abrupt("return");case 5:if("image"===a.type.split("/")[0]){e.next=8;break}return q.failure("Must be an image file type"),e.abrupt("return");case 8:return e.t0=t,e.t1=a.name,e.next=12,L(a);case 12:e.t2=e.sent,e.t3={fileName:e.t1,src:e.t2},(0,e.t0)(e.t3);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(K.jsx)("div",{className:"form-row file-upload",children:Object(K.jsx)("div",{className:"interactive",children:Object(K.jsxs)("label",{htmlFor:"file",title:"Upload an image",children:[Object(K.jsxs)("div",{children:[Object(K.jsx)("div",{className:"label",children:"Image file"}),Object(K.jsx)("button",{className:"btn",type:"button",children:"Upload"}),Object(K.jsx)("input",{id:"file",type:"file",onChange:a}),Object(K.jsx)("span",{className:"file-name",children:n})]}),Object(K.jsx)("div",{children:Object(K.jsx)("img",{className:"thumbnail",src:r,alt:n})})]})})})};!function(e){e[e.Small=0]="Small",e[e.Medium=1]="Medium",e[e.Large=2]="Large",e[e.Modulus=3]="Modulus"}(z||(z={}));var W=function(e){var t=e.content,n=Object(i.useState)(1),r=Object(c.a)(n,2),a=r[0],o=r[1],u=Object(i.useState)(!1),s=Object(c.a)(u,2),j=s[0],h=s[1],v=Object(i.useRef)([0,0]),p=Object(i.useState)(z.Small),O=Object(c.a)(p,2),g=O[0],x=O[1],y=Object(i.useState)(null),w=Object(c.a)(y,2),C=w[0],k=w[1],E=Object(i.useRef)(null);Object(i.useLayoutEffect)((function(){var e=m("pre");return k(e),function(){return e.remove()}}),[]);var M=Object(i.useMemo)((function(){if(!C)return[0,0];C.textContent=t;var e=C.getBoundingClientRect(),n=e.width,r=e.height;return C.textContent="",[n,r]}),[C,t]),S=Object(c.a)(M,2),L=S[0],N=S[1],R=Object(i.useCallback)((function(){if(g!==z.Large){var e=l.margin,t=l.sidebar,n=l.sidebarMarginRight,r=(b()-(g===z.Small?2*e+t+n:0))/L;o(Math.min(r,1))}else o(1)}),[L,g]);return Object(i.useLayoutEffect)((function(){return R(),window.addEventListener("resize",R),function(){return window.removeEventListener("resize",R)}}),[R]),Object(i.useLayoutEffect)((function(){var e=function(){return h(!1)},t=function(){return h(!0)},n=function(e){"Escape"===e.key&&x(z.Small)};return document.addEventListener("mousedown",e),document.addEventListener("mousemove",t),window.addEventListener("keydown",n),function(){document.removeEventListener("mousedown",e),document.removeEventListener("mousemove",t),window.removeEventListener("keydown",n)}}),[]),Object(i.useLayoutEffect)((function(){return g!==z.Small&&(document.body.style.userSelect="none"),function(){document.body.style.userSelect=""}}),[g]),Object(i.useLayoutEffect)((function(){if(g===z.Large){var e=Object(c.a)(v.current,2),t=e[0],n=e[1];setTimeout((function(){var e=d(),r=Object(c.a)(e,2),a=r[0],o=r[1];window.scroll(t*L-a/2,n*N-o/2)}),0)}}),[g,N,L]),Object(K.jsxs)("div",{className:Object(J.a)({"center-content":g===z.Small,interactive:!f&&g===z.Small,"zoom-medium":g!==z.Small,"zoom-large":g===z.Large}),children:[g!==z.Small&&Object(K.jsx)("button",{type:"button",onClick:function(){return x(z.Small)},className:"close-btn","aria-label":"Close",children:Object(K.jsx)("span",{"aria-hidden":!0,children:"\xd7"})}),Object(K.jsx)("pre",{ref:E,onClick:function(e){if(!j&&!f){var t=e.clientX,n=e.clientY,r=e.currentTarget.getBoundingClientRect(),a=r.x,c=r.y,o=r.width,i=r.height;v.current=[(t-a)/o,(n-c)/i],x((function(e){return(e+1)%z.Modulus}))}},className:"text-art",translate:"no",style:{transform:"scale(".concat(a,")"),margin:g===z.Large?0:"".concat(-(N-a*N)/2,"px ").concat(-(L-a*L)/2,"px ")},children:t})]})},Y=["label","setConfig","configItem"];function $(e){var t=e.label,n=e.setConfig,r=e.configItem,i=Object(o.a)(e,Y),u=Object.entries(r);if(1!==u.length)throw new RangeError("config item must be a single item");var s=u,l=Object(c.a)(s,1),f=Object(c.a)(l[0],2),d=f[0],b=f[1];return Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)("label",{htmlFor:d,children:t}),Object(K.jsx)("input",Object(a.a)(Object(a.a)({type:"number"},Object(a.a)(Object(a.a)({},i),{},{id:d,defaultValue:b})),{},{onChange:function(e){var t=Number(e.currentTarget.value);e.currentTarget.value&&e.currentTarget.reportValidity()&&n(Object(y.a)({},d,t))}}))]})}var _=n(14),ee=F.src,te=Object(o.a)(F,["src"]),ne=function(){var e=Object(i.useState)("loading"),t=Object(c.a)(e,2),n=t[0],r=t[1],o=Object(i.useState)(null),l=Object(c.a)(o,2),f=l[0],d=l[1],b=function(e){var t=Object(i.useState)(e),n=Object(c.a)(t,2),r=n[0],o=n[1];return[r,Object(i.useCallback)((function(e){o((function(t){return e instanceof Function?Object(a.a)(Object(a.a)({},t),e(t)):Object(a.a)(Object(a.a)({},t),e)}))}),[])]}(te),p=Object(c.a)(b,2),g=p[0],y=p[1],k=Object(i.useState)(""),E=Object(c.a)(k,2),L=E[0],R=E[1],A=Object(i.useState)(""),F=Object(c.a)(A,2),I=F[0],B=F[1],P=function(){var e=Object(i.useState)(0),t=Object(c.a)(e,2),n=t[0],r=t[1];return Object(i.useMemo)((function(){return{value:n,increment:function(){return r((function(e){return e+1}))}}}),[n])}(),T=g.resolutionX,V=g.invert,z=g.alphabet,U=g.fileName,G=g.contrast,J=g.brightness,Z=Object(i.useState)(!1),Y=Object(c.a)(Z,2),ne=Y[0],re=Y[1];Object(i.useEffect)((function(){return document.addEventListener("dragenter",j),document.addEventListener("mousemove",h),document.addEventListener("drop",h),function(){h(),document.removeEventListener("dragenter",j),document.removeEventListener("mousemove",h),document.removeEventListener("drop",h)}}),[]),Object(i.useEffect)((function(){Promise.all([X.get("config").then((function(e){y(Object(a.a)(Object(a.a)({},te),e))})),X.get("src").then((function(e){R(e||ee)}))]).then((function(){return r("loaded")}))}),[y]),Object(i.useEffect)((function(){"loaded"===n&&X.set("config",g)}),[n,g]),Object(i.useEffect)((function(){"loaded"===n&&X.set("src",L)}),[n,L]);var ae=Object(i.useMemo)((function(){return function(e){return Object(u.a)(new Set(e)).filter((function(e){return"\n"!==e})).sort((function(e,t){return e.localeCompare(t)})).join("")}(z)}),[z]),ce=Object(i.useMemo)((function(){return function(e){var t,n=Object(s.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(!v.test(r))return O(100)(r)}}catch(a){n.e(a)}finally{n.f()}return O(100)(" ")}(ae)}),[ae]).aspectRatio,oe=Object(_.a)((function(){return{charVals:[],min:0,max:0}}),10,!0),ie=Object(c.a)(oe,2),ue=ie[0],se=ie[1];Object(i.useEffect)((function(){"loaded"===n&&se((function(){return C(ae)}))}),[n,ae,se]);var le=Object(i.useMemo)((function(){return function(e){var t=e.invert;return function(e){var n=e.charVals,r=e.min,a=e.max-r||1;return n.map((function(e){var n=e.ch,c=(e.val-r)/a;return{ch:n,val:t?1-c:c}})).sort((function(e,t){return e.val-t.val}))}}({invert:V})(ue)}),[V,ue]);Object(i.useEffect)((function(){return document.documentElement.setAttribute("color-scheme",ne?"dark":"light"),function(){document.documentElement.removeAttribute("color-scheme")}}),[ne]);var fe=Object(i.useCallback)((function(e){var t=e.fileName,n=e.src;y({fileName:t}),R(n)}),[y]);Object(i.useEffect)((function(){(function(e){return new Promise((function(t){var n=S.get(e);if(n)t(n);else{var r=document.createElement("img");r.onload=function(){S.set(e,r),t(r)},r.crossOrigin="anonymous",r.src=e}}))})(L).then(d)}),[L]);var de=Object(i.useMemo)((function(){return function(e){var t=e.resolutionX,n=e.aspectRatio,r=e.img;if(!r)return{pixelMatrix:[],allPixels:[]};var a=r.width,o=r.height,i=t/a,u=[a,o].map((function(e,t){return Math.round(e*i*n[t])})),l=Object(c.a)(u,2),f=l[0],d=l[1],b=[0,0,f,d],m=document.createElement("canvas");m.width=f,m.height=d;var j=m.getContext("2d");j.fillStyle="#fff",j.fillRect.apply(j,b),j.drawImage.apply(j,[r].concat(b));var h,v=j.getImageData.apply(j,b).data,p=0,O=[],g=[],y=-1/0,C=1/0,k=Object(s.a)(v.entries());try{for(k.s();!(h=k.n()).done;){var E=Object(c.a)(h.value,2),M=E[0],S=E[1],L=M%x.Modulus;if(L!==x.Alpha)p+=S*w[L];else{var N={val:p};y=Math.max(y,p),C=Math.min(C,p),M%(f*x.Modulus)===x.Alpha?O.push([N]):O[O.length-1].push(N),g.push(N),p=0}}}catch(I){k.e(I)}finally{k.f()}for(var R=0,A=g;R<A.length;R++){var F=A[R];F.val=(F.val-C)/(y-C)}return g.sort((function(e,t){return e.val-t.val})),{pixelMatrix:O,allPixels:g}}({resolutionX:T,aspectRatio:ce,img:f})}),[T,ce,f]),be=Object(_.a)((function(){return[]}),10,!0),me=Object(c.a)(be,2),je=me[0],he=me[1];Object(i.useLayoutEffect)((function(){if("loaded"===n){var e=!1,t=de.allPixels,r=de.pixelMatrix;return D().then((function(){e||he((function(){var e=M({pixelMatrix:r,allPixels:t,brightness:J,contrast:G,charVals:le});return re(V),e}))})),function(){e=!0}}}),[n,V,J,G,le,de,he]),Object(i.useLayoutEffect)((function(){return B(function(e){return e.map((function(e){return e.map((function(e){return e.ch})).join("")})).join("\n")}(je))}),[je]);var ve=Object(i.useCallback)((function(){window.confirm("Reset image and settings to defaults?")&&(B(""),R(ee),y(te),P.increment())}),[y,P]);return"loading"===n?Object(K.jsx)(K.Fragment,{children:"Loading..."}):Object(K.jsx)("div",{children:Object(K.jsxs)("div",{className:"panes",children:[Object(K.jsxs)("form",{className:"controls",onSubmit:function(e){return e.preventDefault()},children:[Object(K.jsx)("h1",{children:"Text Art Generator"}),Object(K.jsx)(Q,{fileName:U,src:L,handleUpload:fe}),Object(K.jsx)("div",{className:"form-row",children:Object(K.jsx)($,{label:"Width (characters)",configItem:{resolutionX:T},setConfig:y,min:20,max:300,step:1})}),Object(K.jsxs)("div",{className:"form-row",children:[Object(K.jsx)("label",{htmlFor:"invert",children:"Invert (light on dark)?"}),Object(K.jsx)("input",{id:"invert",type:"checkbox",defaultChecked:V,onChange:function(e){y({invert:e.currentTarget.checked})}})]}),Object(K.jsxs)("div",{className:"form-row",children:[Object(K.jsx)("label",{htmlFor:"alphabet",children:"Alphabet"}),Object(K.jsx)(H,{tooltip:'Choose one of the presets or roll your own.\n\nFor best results, make sure to use characters that are all the same width when displayed in a monospace font. For example, "ABCabc" is fine, and so is "\u4e00\u4e8c\u4e09\u56db\u4e94", but "abc\u4e00\u4e8c\u4e09" isn\'t.'}),Object(K.jsxs)("select",{onChange:function(e){var t=e.currentTarget.value;t&&y({alphabet:t})},value:N.find((function(e){return e.content===z}))?z:"",children:[Object(K.jsx)("option",{value:"",disabled:!0,children:"-- Presets --"},""),Object.entries(N).map((function(e){var t=Object(c.a)(e,2),n=t[0],r=t[1];return Object(K.jsx)("option",{value:r.content,children:r.name},n)}))]}),Object(K.jsx)("textarea",{id:"alphabet",value:z,onChange:function(e){return y({alphabet:e.currentTarget.value})}})]}),Object(K.jsxs)("div",{className:"form-row",children:[Object(K.jsx)($,{label:"Brightness",configItem:{brightness:J},setConfig:y,min:0,max:100,step:1}),Object(K.jsx)($,{label:"Contrast",configItem:{contrast:G},setConfig:y,min:0,max:100,step:1})]}),Object(K.jsx)("hr",{}),Object(K.jsxs)("div",{className:"form-row form-buttoms",children:[Object(K.jsx)("button",{type:"button",onClick:function(){var e=m("textarea");e.value=I,e.select(),document.execCommand("copy")?q.success("Copied to clipboard"):q.failure("Failed to copy"),e.remove()},children:"Copy text art"}),Object(K.jsx)("button",{type:"button",onClick:ve,children:"Reset to defaults"})]})]}),Object(K.jsx)(W,{content:I})]})},P.value)},re=document.getElementById("root");Object(r.render)(Object(K.jsx)(ne,{}),re)}},[[24,1,2]]]);
//# sourceMappingURL=main.8f3c4fcc.chunk.js.map