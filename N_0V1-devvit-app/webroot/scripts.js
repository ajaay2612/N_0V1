{
    __sveltekit_1cr7u6y = {
        base: new URL(".", location).pathname.slice(0, -1)
    };

    const element = document.currentScript.parentElement;

    Promise.all([
        import("./_app/immutable/entry/start.CQFLuBDq.js"),
        import("./_app/immutable/entry/app.C8pHhKYJ.js")
    ]).then(([kit, app]) => {
        kit.start(app, element, {
            node_ids: [0, 2],
            data: [null,null],
            form: null,
            error: null
        });
    });
}