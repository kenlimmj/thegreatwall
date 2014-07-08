var requireAdmin = function(pause) {
    if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
        // Record the current path before redirecting so
        // we can redirect the user on successful login
        Session.set('loginRedirectRoute', Router.current().path);

        // Render the login form. No money, no honey.
        Router.go('loginForm');

        // Stop the world (for now)
        pause();
    }
}

var requireUser = function(pause) {
    if (!Meteor.user()) {
        // Record the current path before redirecting so
        // we can redirect the user on successful login
        Session.set('loginRedirectRoute', Router.current().path);

        // Render the login form. No money, no honey.
        Router.go('loginForm');

        // Stop the world (for now)
        pause();
    }
}

// List of routes associated with content editing
var editRoutes = ['profileEdit', 'questionEdit', 'answerEdit', 'cookbookEdit', 'lectureEdit'];

// List of routes associated with content creation
var createRoutes = ['questionCreate', 'answerCreate', 'cookbookCreate', 'lectureCreate'];

// List of routes associated with the knowledge base
var kbRoutes = ['kbList', 'kbDisplay', 'kbCreate', 'kbEdit'];

if (Meteor.isClient) {
    // Trigger a hook that is called when a bad path is requested by the client
    Router.onBeforeAction('dataNotFound');
    // Authenticate privileged actions
    // Router.onBeforeAction(requireAdmin, {
    //     only: ['profileList', 'jobCreate', 'jobEdit'].concat(kbRoutes)
    // });

    // Router.onBeforeAction(requireUser, {
    //     only: editRoutes.concat(createRoutes)
    // });
    Router.onBeforeAction(function() {
        Alerts.removeSeen();
    });
}

Router.map(function() {
    // Home Page
    this.route('questionList', {
        path: '/',
        controller: 'QuestionListController'
    })

    // Static pages
    this.route('about')
    this.route('contact')
    this.route('faq')
    this.route('terms')
    this.route('privacy')

    // User Information
    this.route('userAdminList', {
        path: 'admin/u',
        controller: 'UserAdminListController'
    })

    // Disciplines
    this.route('disciplineAdminList', {
        path: '/admin/d',
        controller: 'DisciplineAdminListController'
    })
    this.route('disciplineCreate', {
        path: '/d/new',
        controller: 'GlobalController'
    })

    // Questions
    this.route('questionAdminList', {
        path: '/admin/halp',
        controller: 'QuestionAdminListController'
    })
    this.route('questionCreate', {
        path: '/halp/new-question',
        controller: 'QuestionCreationController'
    })
    this.route('questionList', {
        path: '/halp',
        controller: 'QuestionListController'
    })
    this.route('questionEdit', {
        path: '/halp/:questionId/edit',
        controller: 'QuestionEditController'
    })

    // Answers
    this.route('answerCreate', {
        path: '/halp/:questionId/new-answer',
        controller: 'AnswerCreationController'
    })
    this.route('answerEdit', {
        path: '/halp/:answerId/edit',
        controller: 'AnswerByIdController'
    })

    // Jobs
    this.route('jobCreate', {
        path: '/j/new',
        controller: 'GlobalController'
    })
    this.route('jobList', {
        path: '/j',
        controller: 'JobListController'
    })
    this.route('jobDisplay', {
        path: '/j/:jobId',
        controller: 'JobByIdController'
    })
    this.route('jobReply', {
        path: '/j/:jobId/reply',
        controller: 'JobByIdController'
    })
    this.route('jobEdit', {
        path: '/j/:jobId/edit',
        controller: 'JobByIdController'
    })

    // Knowledge Base
    this.route('kbCreate', {
        path: '/kb/new'
    })
    this.route('kbList', {
        path: '/kb',
        controller: 'KbListController'
    })
    this.route('kbDisplay', {
        path: '/kb/:kbId',
        controller: 'KbByIdController'
    })
    this.route('kbEdit', {
        path: '/kb/:kbId/edit',
        controller: 'KbByIdController'
    })

    // Catch-all for nonsense paths
    this.route('notFound', {
        path: '*'
    })
});