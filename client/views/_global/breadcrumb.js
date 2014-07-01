Template.breadcrumb.helpers({
    currentCategory: function() {
        var currentUrl = Router.current().path.split('/');

        switch (currentUrl[currentUrl.length - 2]) {
            case 'q':
                return "Questions";
                break;
            case 'd':
                return "Disciplines";
                break;
            case 'a':
                return "Answers";
                break;
            case 'admin':
                return "Admin";
                break;
        }
    },
    currentPath: function() {
        var currentUrl = Router.current().path.split('/');

        switch (currentUrl[currentUrl.length - 1]) {
            case 'q':
                return "Questions";
                break;
            case 'd':
                return "Disciplines";
                break;
            case 'a':
                return "Answers";
                break;
            case 'u':
                return "Users";
                break;
            case 'j':
                return "Jobs";
                break;
            case 'new':
                return "New";
                break;
        }
    }
})