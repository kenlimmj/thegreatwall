AdminController = GlobalController.extend({
    layoutTemplate: 'adminLayout',
    yieldTemplates: {
        'adminNav': {
            to: 'aside'
        },
    }
});

QuestionAdminListController = AdminController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionSelection', {});
            Session.setDefault('questionSort', {});
            Session.setDefault('questionLimit', 20);

            return [
                listSubs.subscribe('question', Session.get('questionSelection'), {}, Session.get('questionSort'), Session.get('questionLimit')),
                listSubs.subscribe('user', {}, {
                    username: 1
                }, {
                    _id: 1
                }, 0)
            ]
        }
    },
    data: {
        questions: Questions.findFaster()
    }
});

DisciplineAdminListController = AdminController.extend({
    waitOn: function() {
        return [
            listSubs.subscribe('discipline', {}, {}, {}, 0),
            listSubs.subscribe('subject', {}, {
                schools: 0
            }, {}, 0)
        ]
    },
    data: {
        disciplines: Disciplines.findFaster()
    }
});

UserAdminListController = AdminController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('userLimit', 20);

            return listSubs.subscribe('user', {}, {}, {
                username: 1
            }, Session.get('userLimit'));
        }
    },
    data: {
        users: Meteor.users.findFaster()
    }
})