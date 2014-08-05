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

/*
 * FACEBOOK STUFF
 */
// let's define the facebook object first. the stuff inside of this function is pretty much copied from the node example for fbgraph
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

// then we add methods to the Facebook prototype. A generic query method that uses Meteor.sync and uses Meteor's inbuilt done() function to return results
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

// an implementation of the query generic that gets the user's data
Facebook.prototype.getFBUserData = function() {
    return this.query('me');
}

// another implementation of the query generic that gets the user's friends who also use this app. sorry FB graph 2.0 doesn't allow me to grab all of the user's friends
Facebook.prototype.getFBFriendsData = function() {
    return this.query('/me/friends');
}

/*
 * TWITTER STUFF
 * (Pretty much the same deal as facebook)
 */
// creates twitter prototype using twitter node 
function Twitter(accessToken, accessTokenSecret) {
    var twitter = Meteor.require('twitter');
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    var twit = new twitter({
        consumer_key: 'EE1GEwZb2OwfCIsRQqwxgxZVh',
        consumer_secret: 'SoBeOSS8xE2GwAQr6cpbrPh7Qmr1HAWtEwNJxSsPwZ3X9b8QvK',
        access_token_key: this.accessToken,
        access_token_secret: this.accessTokenSecret
    });
    this.twit = twit;
}

// same shit as facebook above, only for twitter. parameters for Twitter REST API
Twitter.prototype.query = function(query, parameters) {
    var self = this;
    var data = Meteor.sync(function(done) {
        self.twit.get(query, parameters, function(res) {
            done(null, res);
        });
    });
    return data.result;
}

// helper function for getting friends
Twitter.prototype.getTwitterFriendsData = function() {
    var parameters = {
        include_entities: true,
        count: 200 // feel free to change this to a more manageable number. defaults to 20.
    };
    return this.query('/friends/list.json', parameters);
}

// gets all friends using next_cursor
Twitter.prototype.getTwitterAllFriendsData = function() {
    var parameters = {
        include_entities: true,
        count: 200,
        cursor: -1
    };

    var users = [];
    var hasNextCursor = true;

    while(hasNextCursor) {
        var fetchData = this.query('/friends/list.json', parameters);

        if(fetchData['next_cursor'] == 0 || fetchData.hasOwnProperty('errors')) {
            hasNextCursor = false;
        } else {
            parameters['cursor'] = fetchData['next_cursor'];
        }

        users = users.concat(fetchData['users']);
    }
    
    return users;
}

// debug helper function for getting rate limit status
// twitter allows 15 get requests per 15min per user (checked this using multiple accounts. confirmed its per user not per app)
Twitter.prototype.getTwitterRateLimitStatus = function() {
    var parameters = {
        include_entities: true,
        resources: 'friends'
    };
    return this.query('/application/rate_limit_status.json', parameters);
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
    },
    getTwitterFriendsData: function() {
        var twitter = new Twitter(Meteor.user().services.twitter.accessToken, Meteor.user().services.twitter.accessTokenSecret); //because twitter is extra like that
        var data = twitter.getTwitterFriendsData();
        return data;
    },
    getTwitterAllFriendsData: function() {
        var twitter = new Twitter(Meteor.user().services.twitter.accessToken, Meteor.user().services.twitter.accessTokenSecret); //because twitter is extra like that
        var data = twitter.getTwitterAllFriendsData();
        return data;
    },
    getTwitterRateLimitStatus: function() {
        var twitter = new Twitter(Meteor.user().services.twitter.accessToken, Meteor.user().services.twitter.accessTokenSecret); //because twitter is extra like that
        var data = twitter.getTwitterRateLimitStatus();
        return data;
    }
});