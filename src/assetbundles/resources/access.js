(function(){
(()=>{if(!("fetch"in window))return;let t="/";window.palette&&window.palette.baseUrl&&(t=`${window.palette.baseUrl}/`,t=t.replace(/\/+$/,"/")),fetch(`${t}actions/palette/access`).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(!e)return;const{css:c,js:s}=e,n=document.createElement("script");n.src=s,n.defer=!0,document.body.appendChild(n);const r=document.createElement("link");r.rel="stylesheet",r.href=c,document.body.appendChild(r)})})();

})()