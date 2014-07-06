GlobalController = RouteController.extend({
    fastRender: true
});

CreationController = GlobalController.extend({
    layoutTemplate: 'creationLayout'
});

ListController = GlobalController.extend({
    layoutTemplate: 'listLayout'
});