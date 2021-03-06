define(['TextInputDialog'],
function(TextInputDialog) {

    function EditView(id)
    {
        this.page =
        $('<div class="editview">\
             <div class="header"><h1></h1></div>\
             <div class="content">\
               <ul></ul>\
             </div>\
             <div class="footer">\
               <div class="buttons">\
                 <button class="back">Back</button>\
                 <button class="refresh">Refresh</button>\
                 <button class="add">Add new</button>\
               </div>\
             </div>\
           </div>');

        this._textDialog = new TextInputDialog(id+"TextDialog");

        var view = this;
        this.page.find(".add").click(function() {
            view._textDialog.show("Add Item", "Enter new text:", '', function(newText) {
                view._addClickedCallback(newText);
            });
        });

        this._addClickedCallback = function(newName){};
        this._changeClickedCallback = function(oldText, newText){};
        this._removeClickedCallback = function(item){};
    }

    EditView.prototype.clear = function()
    {
        var itemList = this.page.find("ul");
        itemList.empty();
        itemList.append('<li>Loading...</li>');
    };

    EditView.prototype.setHeading = function(heading)
    {
        this.page.find("h1").text(heading);
    };

    EditView.prototype.refresh = function(items)
    {
        var itemList = this.page.find("ul");
        var view = this;

        function showChangeDialog(oldText)
        {
            view._textDialog.show("Change Item", "Enter new text:", oldText, function(newText) {
                view._changeClickedCallback(oldText, newText);
            });
        }

        itemList.empty();
        items.forEach(function(item) {
            var li = $("<li/>");
            li.append($("<a/>")
                      .append(item.name)
                      .click(function() { showChangeDialog(item.name); }));
            li.append($("<a>Remove</a>")
                      .click(function() { view._removeClickedCallback(item); }));
            itemList.append(li);
        });
    };

    EditView.prototype.remove = function(item)
    {
        var itemList = this.page.find("ul");
        itemList.find("a").filter(function(i){return $(this).text() == item.name;}).parents("li").remove();
    };

    EditView.prototype.onAddClicked = function(callback)
    {
        this._addClickedCallback = callback;
    };

    EditView.prototype.onChangeClicked = function(callback)
    {
        this._changeClickedCallback = callback;
    };

    EditView.prototype.onRefreshClicked = function(callback)
    {
        this.page.find(".refresh").unbind('click').click(callback);
    };

    EditView.prototype.onRemoveClicked = function(callback)
    {
        this._removeClickedCallback = callback;
    };

    return EditView;

});
