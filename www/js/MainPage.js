define(['MainView', 'TextInputDialog', 'ListPage', 'EditPage'],
function(MainView, TextInputDialog, ListPage, EditPage) {

function addFollowToView(twitterScreenName, twitter, view, viewFactory, refreshList)
{
    if (twitterScreenName[0] == "@")
        twitterScreenName = twitterScreenName.substring(1);

    if (twitterScreenName == twitter.authorisedScreenName())
    {
        new EditPage(twitterScreenName, twitter, view.page, viewFactory);
        view.addEditable("@"+twitterScreenName, "#"+twitterScreenName, refreshList)
    }
    else
    {
        new ListPage(twitterScreenName, twitter, viewFactory);
        view.addFollowing("@"+twitterScreenName, "#"+twitterScreenName, refreshList)
    }
};

function MainPage(id, twitter, viewFactory, settingsHref)
{
    var followDialog = new TextInputDialog("followDialog");
    var model = JSON.parse(localStorage.getItem('following')) || [];
    var view = new MainView(id, "#followDialog", settingsHref);

    view.setFollowClick(function() {
        followDialog.show("Follow", "Twitter user", "@", function(user) {
            model.push(user);
            localStorage.setItem('following', JSON.stringify(model));
            addFollowToView(user, twitter, view, viewFactory, true);
        });
    });

    model.forEach(function(follow)
    {
        addFollowToView(follow, twitter, view, viewFactory, false);
    });
}

return MainPage;

});