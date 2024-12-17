{
    __sveltekit_30d1a7 = {
        base: new URL(".", location).pathname.slice(0, -1)
    };

    const element = document.currentScript.parentElement;

    Promise.all([
        import("./_app/immutable/entry/start.Sq9JXxtY.js"),
        import("./_app/immutable/entry/app.DSYvpi_G.js")
    ]).then(([kit, app]) => {
        kit.start(app, element, {
            node_ids: [0, 2],
            data: [null,null],
            form: null,
            error: null
        });
    });
}