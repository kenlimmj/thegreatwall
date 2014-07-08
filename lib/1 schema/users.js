Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    friends: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    friendRequest: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    credits: {
        type: Number,
        defaultValue: 0
    },
    subjectSubscription: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    xp: {
        type: Number,
        defaultValue: 0
    },
    school: {
        type: Schema.School,
        optional: true
    },
    location: {
        type: Schema.Loc,
        // TODO: Autovalue
    },
    ip: {
      type: String,
      regEx: SimpleSchema.RegEx.IP,
      // TODO: Autovalue
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
    },
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        label: "Answer creation date",
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
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});