define(function() {

    function ListPresenter(id, model, view)
    {
        var presenter = this;
        this.view = view;
        this.model = model;
        this.id = id;
        this._twitterScreenName = '';
        view.onRefreshClicked(function() { model.load(presenter._twitterScreenName); });
        model.onItemsLoaded(function(items) { view.refresh(items); });
    }

    ListPresenter.prototype.show = function(title, twitterScreenName)
    {
        this.view.clear();
        this.view.setHeading(title);
        this.model.load(twitterScreenName);
        this._twitterScreenName = twitterScreenName;
    };

    return ListPresenter;

});