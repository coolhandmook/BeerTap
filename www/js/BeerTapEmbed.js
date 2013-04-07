define(['Twitter', 'ListView', 'ListPresenter', 'TapsModel', 'Utility'],
function (Twitter, ListView, ListPresenter, TapsModel, Utility) {

    function BeerTapEmbed(parent)
    {
        var twitterScreenName = 'BeerTapDemo';
        var screenNameMatch = /\btwitterScreenName=([^&]+)/.exec(window.location.search);
        if (screenNameMatch) twitterScreenName = screenNameMatch[1];
        var twitterProxyUrl = Utility.changeRelativePath(window.location.href, 'twitter');
        var twitterProxy = Utility.rewriteProxy(twitterProxyUrl);
        var twitter = new Twitter(localStorage, twitterProxy);
        var model = new TapsModel(twitter);
        var view = new ListView(twitterScreenName);
        var presenter = new ListPresenter(twitterScreenName, model, view);
        view.page.appendTo(parent);
        presenter.show('@'+twitterScreenName, twitterScreenName);
    }

    return BeerTapEmbed;

});
