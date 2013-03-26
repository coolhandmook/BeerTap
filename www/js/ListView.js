define(function() {

function ListView(id)
{
    this.page =
    $('<div class="listview">\
         <div class="header"><h1>@'+id+'</h1></div>\
         <div class="content">\
           <ul></ul>\
         </div>\
         <div class="footer"><a class="refresh" href="#">Refresh</a></div>\
       </div>');

    var view = this;
    this.page.find(".refresh").click(function() { view._fireRefreshClicked(); });
    this._refreshClickedCallbacks = [];
}

ListView.prototype.onRefreshClicked = function(callback)
{
    this._refreshClickedCallbacks.push(callback);
}

ListView.prototype.refresh = function(items)
{
    var itemList = this.page.find("ul");
    itemList.empty();
    items.forEach(function(item)
    {
        var date = item.date.toISOString().substring(0,10);
        itemList.append('<li>'+item.name+' <span class="date">'+date+'</span></li>');
    });
};

ListView.prototype._fireRefreshClicked = function()
{
    this._refreshClickedCallbacks.forEach(function(callback) { callback(); });
}

return ListView;

});
