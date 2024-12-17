{
  __sveltekit_gizbw0 = {
    base: new URL(".", location).pathname.slice(0, -1)
  };

  const element = document.currentScript.parentElement;

  const data = [null,null];

  Promise.all([
    import("./_app/immutable/entry/start.DsgVrNq9.js"),
    import("./_app/immutable/entry/app.DrJhaEPd.js")
  ]).then(([kit, app]) => {
    kit.start(app, element, {
      node_ids: [0, 2],
      data,
      form: null,
      error: null
    });
  });
}