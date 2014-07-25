Schema.Question = new SimpleSchema({
    subject: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    author: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true
    },
    subscribers: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date
                };
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: [Date],
        denyInsert: true,
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return {
                    $push: new Date
                }
            }
        }
    },
    title: {
        type: String,
        min: 1,
        max: 100,
        denyUpdate: true
    },
    displayExcerpt: {
        type: String,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return summarize(truncate(mdContent.value, 100));
            }
        }
    },
    ogExcerpt: {
        type: String,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return summarize(truncate(mdContent.value, 200));
            }
        }
    },
    mdContent: {
        type: String
    },
    htmlContent: {
        type: String,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return marked(mdContent.value);
            }
        }
    },
    answerStatus: {
        type: Boolean,
        defaultValue: false
    },
    openStatus: {
        type: Boolean,
        defaultValue: true
    },
    privateStatus: {
        type: Boolean,
        defaultValue: false
    }
});