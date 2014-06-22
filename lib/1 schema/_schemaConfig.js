if (Meteor.isServer) {
    // Initialize the markdown converter
    marked = Meteor.require('marked'),
    h = Meteor.require('highlight.js');

    // Set a bunch of options!
    marked.setOptions({
        breaks: true,
        sanitize: false,
        smartypants: true,
        highlight: function(code) {
            return h.highlightAuto(code).value;
        }
    });

    // Initialize truncation utilities
    summarize = Meteor.require('summarize-markdown'),
    truncate = Meteor.require('truncate');
}

Schema = {};