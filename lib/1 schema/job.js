Schema.Job = new SimpleSchema({
    author: {
        type: String,
        label: "Job entry author",
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function() {
            return Meteor.userId();
        }
    },
    createdAt: {
        type: Date,
        label: "Job entry creation date",
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
        label: "Job entry update date",
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
    mdContent: {
        type: String,
        label: "JB entry body (Markdown)",
        min: 1
    },
    htmlContent: {
        type: String,
        label: "JB entry body (HTML)",
        min: 1,
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return marked(mdContent.value);
            }
        }
    },
    status: {
        type: String,
        label: "Job status",
        allowedValues: ["open", "filled"],
        defaultValue: "open"
    }
});