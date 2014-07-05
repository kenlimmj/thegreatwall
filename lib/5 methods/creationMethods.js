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
}

Meteor.methods({
    'parseMarkdown': function(data) {
        check(data, String);

        if (Meteor.isServer) return marked(data);
    }
});