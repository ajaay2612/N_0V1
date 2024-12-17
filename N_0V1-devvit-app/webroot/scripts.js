{
    __sveltekit_13vmygt = {
        base: new URL(".", location).pathname.slice(0, -1)
    };

    const element = document.currentScript.parentElement;

    Promise.all([
        import("./_app/immutable/entry/start.BVHwcgfw.js"),
        import("./_app/immutable/entry/app.DKxz3eXF.js")
    ]).then(([kit, app]) => {
        kit.start(app, element, {
            node_ids: [0, 2],
            data: [null,null],
            form: null,
            error: null
        });
    });
}