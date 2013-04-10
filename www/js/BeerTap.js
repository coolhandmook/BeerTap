define(['Twitter', 'TwitterConfirmer', 'TapsModel', 'JQMListView', 'ListPresenter', 'JQMEditView', 'EditPresenter', 'FollowingPresenter', 'SettingsPage'],
function(Twitter, TwitterConfirmer, TapsModel, JQMListView, ListPresenter, JQMEditView, EditPresenter, FollowingPresenter, SettingsPage) {

    function BeerTap(isPhoneGap, twitterProxy)
    {
        this.twitter = new Twitter(localStorage, twitterProxy);

        var listModel = new TapsModel(this.twitter);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPresenter("listPage", listModel, listView, $.mobile.changePage);

        var editView = new JQMEditView("editPage");
        var editModel = new TapsModel(new TwitterConfirmer(this.twitter, editView.page));
        var editPresenter = new EditPresenter("editPage", editModel, editView);

        var settingsPresenter = new SettingsPage("settings", this.twitter, isPhoneGap);

        this.mainPage = new FollowingPresenter("main", this.twitter, listPresenter, editPresenter, settingsPresenter);

        $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
        $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
        $(document).ajaxError(function() { alert("Error fetching data"); });
        $.mobile.defaultDialogTransition = 'none';
        $.mobile.defaultPageTransition = 'none';

        window.addEventListener("orientationchange", function() { hideAddressBar(); });
        hideAddressBar();

        settingsPresenter.checkForTwitterAuthorisation(this.twitter);
    }

    function hideAddressBar()
    {
        if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
            document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
        setTimeout(function(){ window.scrollTo(0,1); }, 100);
    }

    return BeerTap;

});
