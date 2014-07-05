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
            Session.setDefault('questionLimit', 20);

            return [
                listSubs.subscribe('question', {}, {}, {
                    createdAt: -1,
                    updatedAt: -1,
                    title: 1
                }, Session.get('questionLimit')),
                listSubs.subscribe('user', {}, {
                    username: 1
                }, {
                    _id: 1
                }, 0),
                listSubs.subscribe('subject', {}, {
                    name: 1
                }, {}, 0)
            ]
        }
    },
    data: {
        questions: Questions.findFaster({}, {
            sort: {
                createdAt: -1,
                updatedAt: -1,
                title: 1
            }
        })
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