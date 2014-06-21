Meteor.headly.config({
    data: function() {
        // TODO: Clearly this requires... seeing to.
    },
    facebook: function(data) {
        var title = '<meta property="og:title" content="' + data.title + '"/>',
            desc = '<meta name="og:description" content="' + data.ogExcerpt + '"/>';

        return title + "\n" + desc;
    },
    twitter: function(data) {
        var title = '<meta name="twitter:title" content="' + data.title + '"/>',
            desc = '<meta name="twitter:description" content="' + data.ogExcerpt + '"/>';

        return title + "\n" + desc;
    }
});