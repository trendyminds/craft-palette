(() => {
  // scripts/access.js
  (() => {
    if (!("fetch" in window)) {
      return;
    }
    fetch(`/actions/palette/access`).then((res) => {
      if (res.status !== 200) {
        return;
      }
      return res.json();
    }).then((data) => {
      if (!data) {
        return;
      }
      const { css, js } = data;
      const script = document.createElement("script");
      script.src = js;
      script.defer = true;
      document.body.appendChild(script);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = css;
      document.body.appendChild(link);
    });
  })();
})();
