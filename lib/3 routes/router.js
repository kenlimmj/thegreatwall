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
    Router.onBeforeAction(requireAdmin, {
        only: ['profileList', 'jobCreate', 'jobEdit'].concat(kbRoutes)
    });

    Router.onBeforeAction(requireUser, {
        only: editRoutes.concat(createRoutes)
    });
}

Router.map(function() {
    // Static pages
    this.route('about')
    this.route('contact')
    this.route('faq')
    this.route('terms')
    this.route('privacy')

    // User Authentication
    this.route('signUpForm', {
        path: '/u/new'
    })
    this.route('loginForm', {
        path: '/u/login'
    })

    // User Information
    this.route('profileList', {
        path: '/u'
    })
    this.route('profileCollectInfo', {
        path: '/u/:userId/dds'
    })
    this.route('profileDisplay', {
        path: '/u/:userId/view'
    })
    this.route('profileEdit', {
        path: '/u/:userId/update'
    })

    // Questions
    this.route('questionCreate', {
        path: '/q/new'
    })
    this.route('questionList', {
        path: '/q',
        controller: 'QuestionListController'
    })
    this.route('questionByUserList', {
        path: '/q/:userId',
        controller: 'QuestionByUserIdController'
    })
    this.route('questionBySubjectList', {
        path: '/q/:subjectId',
        controller: 'QuestionBySubjectController'
    })
    this.route('questionDisplay', {
        path: '/q/:questionId',
        controller: 'QuestionByIdController'
    })
    this.route('questionEdit', {
        path: '/q/:questionId/edit',
        controller: 'QuestionByIdController'
    })
    this.route('questionFlag', {
        path: '/q/:questionId/flag',
        controller: 'QuestionByIdController'
    })

    // Answers
    this.route('answerCreate', {
        path: '/a/new'
    })
    this.route('answerList', {
        path: '/a',
        controller: 'AnswerListController'
    })
    this.route('answerByUserList', {
        path: '/a/:userId',
        controller: 'AnswerByUserIdController'
    })
    this.route('answerDisplay', {
        path: '/a/:answerId',
        controller: 'AnswerByIdController'
    })
    this.route('answerEdit', {
        path: '/a/:answerId/edit',
        controller: 'AnswerByIdController'
    })
    this.route('answerFlag', {
        path: '/a/:answerId/flag',
        controller: 'AnswerByIdController'
    })

    // Notes
    this.route('cookbookCreate', {
        path: '/c/new'
    })
    this.route('cookbookList', {
        path: '/c',
        controller: 'CookbookListController'
    })
    this.route('cookbookByUserList', {
        path: '/c/:userId',
        controller: 'CookbookByUserIdController'
    })
    this.route('cookbookBySubjectList', {
        path: '/c/:subjectId',
        controller: 'CookbookBySubjectController'
    })
    this.route('cookbookDisplay', {
        path: '/c/:cbId',
        controller: 'CookbookByIdController'
    })
    this.route('cookbookEdit', {
        path: '/c/:cbId/edit',
        controller: 'CookbookByIdController'
    })
    this.route('cookbookFlag', {
        path: '/c/:cbId/flag',
        controller: 'CookbookByIdController'
    })

    // Lectures
    this.route('lectureCreate', {
        path: '/l/new'
    })
    this.route('lectureList', {
        path: '/l',
        controller: 'LectureListController'
    })
    this.route('lectureByUserList', {
        path: '/l/:userId',
        controller: 'LectureByUserIdController'
    })
    this.route('lectureDisplay', {
        path: '/l/:lectureId',
        controller: 'LectureByIdController'
    })
    this.route('lectureEdit', {
        path: '/l/:lectureId/edit',
        controller: 'LectureByIdController'
    })
    this.route('lectureFlag', {
        path: '/l/:lectureId/flag',
        controller: 'LectureByIdController'
    })

    // Jobs
    this.route('jobCreate', {
        path: '/j/new'
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