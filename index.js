(function () {
    //noinspection BadExpressionStatementJS
    "use strict";

    var Handlebars = require("./handlebars").getInstance(),
        Marionette = require("./marionette").getInstance();

    function regionHelper(name, options) {
        var id = _.uniqueId('region'),
            selector = '#' + id,
            view = this.view;

        name = name || id;

        if (view) {
            view.regionManager.addRegion(name, {
                selector: selector,
                regionType: require("./replace-region"),
                parentEl: function () {
                    return view.$el;
                }
            });
        }
        else {
            console.warn("Cannot find 'view' for region '" + name + "'");
        }

        return new Handlebars.SafeString('<div id="' + id + '"></div>');
    }

    Handlebars.registerHelper("region", regionHelper);

    var mixinTemplateHelpers = Marionette.View.prototype.mixinTemplateHelpers;
    Marionette.View.prototype.mixinTemplateHelpers = function (data) {
        data = mixinTemplateHelpers.call(this, data);
        data.view = this;

        return data;
    };

    module.exports = regionHelper;

})();
