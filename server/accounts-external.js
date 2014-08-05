// startup API keys and secrets
Meteor.startup(function() {

    Accounts.loginServiceConfiguration.remove({
        service: 'facebook'
    });

    Accounts.loginServiceConfiguration.insert({
        service: 'facebook',
        appId: '1387460298176048',
        secret: '3de7ade48717cb2d856056e2ad36eea7'
    });

    Accounts.loginServiceConfiguration.remove({
        service: 'twitter'
    });

    Accounts.loginServiceConfiguration.insert({
        service: 'twitter',
        consumerKey: 'EE1GEwZb2OwfCIsRQqwxgxZVh',
        secret: 'SoBeOSS8xE2GwAQr6cpbrPh7Qmr1HAWtEwNJxSsPwZ3X9b8QvK'
    });
});

// defines facebook object
function Facebook(accessToken) {
	this.fb = Meteor.require('fbgraph');
	this.accessToken = accessToken;
	this.fb.setAccessToken(this.accessToken);
	this.options = {
		timeout: 3000,
		pool: {maxSockets: Infinity},
		headers: {connection: "keep-alive"}
	}
	this.fb.setOptions(this.options);
}

// queries data
Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}

// some basic methods to get user data and friends data
Facebook.prototype.getFBUserData = function() {
    return this.query('me');
}

Facebook.prototype.getFBFriendsData = function() {
    return this.query('/me/friends');
}

// add methods to meteor
// these methods can be used as such (like as if you didn't already know)
// Meteor.call('getFBFriendsData', function(err, data) {
//     // do something with data
// });
Meteor.methods({
    getFBUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFBUserData();
        return data;
    },
    getFBFriendsData: function() {   
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFBFriendsData();
        return data;
    }
});