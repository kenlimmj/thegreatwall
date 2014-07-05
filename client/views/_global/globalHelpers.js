String.prototype.toTitleCase = function() {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

    return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
        if (index > 0 && index + match.length !== title.length &&
            match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
            (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
            title.charAt(index - 1).search(/[^\s-]/) < 0) {
            return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
            return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
    });
};

//// Text Modifiers ////

// Converts a string to title case
UI.registerHelper('makeTitle', function(s) {
    return s.toTitleCase();
});

// Returns a human-readable date from an ISO date. If the date is not
// well-formed or does not exist, returns the text specified by fillerString
UI.registerHelper('displayDate', function(d, fillerString) {
    if (d) {
        if (d.length) {
            return moment(d[0]).format("MMMM Do YYYY");
        }
        return moment(d).format("MMMM Do YYYY");
    } else {
        return fillerString;
    }
});

UI.registerHelper('thisValue', function() {
    return this;
});

//// Getters ////

// Returns the username associated with a user ID
UI.registerHelper('getUsername', function(userId) {
    Meteor.subscribe('user', {
        _id: userId
    }, {}, {}, 1);

    return Meteor.users.findOneFaster().username;
});

// Returns the subject name associated with a subject ID
UI.registerHelper('getSubjectName', function(subjectId) {
    Meteor.subscribe('subject', {
        _id: subjectId
    }, {}, {}, 1);

    return Subjects.findOneFaster().name
});

//// Environment Modifiers ////

// Loads MathJax on a page
UI.registerHelper('loadMathJax', function() {
    $('<script src="//beta.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>').appendTo(document.head);

    return null;
});