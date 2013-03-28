define(['oAuthConfig'], function(oAuthConfig) {

    function Twitter(store)
    {
        this.store = store;
        this._authorisationChangeCallbacks = [];

        this.oAuth = OAuth({
            consumerKey: oAuthConfig.consumerKey,
            consumerSecret: oAuthConfig.consumerSecret,
            enablePrivilege: false
        });

        if (store.accessTokenKey && store.accessTokenSecret)
        {
            this.oAuth.setAccessToken(store.accessTokenKey, store.accessTokenSecret);
        }
    }

    Twitter.prototype.onAuthorisationChange = function(callback)
    {
        this._authorisationChangeCallbacks.push(callback);
    };

    Twitter.prototype.authorised = function()
    {
        return this.oAuth !== undefined && this.oAuth.getAccessTokenKey() != "";
    };

    Twitter.prototype.getUserTimeline = function(screenName, success)
    {
        var url;
        if (this.authorised())
        {
            url = "https://api.twitter.com/1.1/statuses/user_timeline.json?trim_user=true&include_rts=false&count=100&screen_name=";
            this.oAuth.getJSON(url+screenName, success, function(data) { alert("Get timeline failed"); });
        }
        else
        {
            url = "https://api.twitter.com/1/statuses/user_timeline.json?trim_user=true&include_rts=false&count=100&screen_name=";
            $.getJSON(url+screenName, success);
        }
    };

    Twitter.prototype.tweet = function(text, success, failure)
    {
        if (this.authorised())
        {
            var screenName = this.store.screenName;
            this.oAuth.post("https://api.twitter.com/1.1/statuses/update.json",
                            { status: text },
                            function(data) {
                                console.log("### TWEETED as " + screenName + ":\n" + text);
                                success(data);
                            },
                            failure);
        }
        else
        {
            failure("Twitter not authorised");
        }
    };

    Twitter.prototype.setAuthorisation = function(accessTokenKey, accessTokenSecret, userId, screenName)
    {
        this.store.accessTokenKey = accessTokenKey;
        this.store.accessTokenSecret = accessTokenSecret;
        this.store.userId = userId;
        this.store.screenName = screenName;
        this.oAuth.setAccessToken(accessTokenKey, accessTokenSecret);
        this._authorisationChangeCallbacks.forEach(function(callback) { callback(userId, screenName); });
    };

    Twitter.prototype.authorisedScreenName = function()
    {
        return this.store.screenName;
    };

    return Twitter;

});
