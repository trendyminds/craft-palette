(()=>{"fetch"in window&&fetch("/actions/palette/access").then(e=>{if(e.status===200)return e.json()}).then(e=>{if(!e)return;let{css:c,js:r}=e,t=document.createElement("script");t.src=r,t.defer=!0,document.body.appendChild(t);let n=document.createElement("link");n.rel="stylesheet",n.href=c,document.body.appendChild(n)});})();
