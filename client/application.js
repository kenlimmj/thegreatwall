Deps.autorun(function() {
    // Scroll the screen back to top when we move to a new page
    // FIXME: because this is a "feature" that could be implemented directly
    // into IR in later builds
    var current = Router.current();

    Deps.afterFlush(function() {
        $(window).scrollTop(0);
    });
});