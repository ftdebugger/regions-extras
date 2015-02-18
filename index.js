(function () {
    //noinspection BadExpressionStatementJS
    "use strict";

    var Handlebars = require("./handlebars").getInstance(),
        Marionette = require("./marionette").getInstance(),
        ReplaceRegion = require('./replace-region');

    function regionHelper(name, options) {
        var id = _.uniqueId('region'),
            selector = '#' + id,
            tagName = options.hash.tagName || options.hash.tag || 'div',
            regionClass = options.hash.regionClass || ReplaceRegion;

        name = name || id;

        var view = options.hash.view;

        if (!view) {
            var context = this;

            while (context && !context.view && context.__parent__) {
                context = context.__parent__;
            }

            view = context ? context.view : null;
        }

        if (view) {
            view.regionManager.addRegion(name, {
                selector: selector,
                regionClass: regionClass,
                parentEl: function () {
                    return view.$el;
                }
            });
        }
        else {
            console.warn("Cannot find 'view' for region '" + name + "'");
        }

        return new Handlebars.SafeString('<'+ tagName +' id="' + id + '"></'+ tagName +'>');
    }

    Handlebars.registerHelper("region", regionHelper);

    var mixinTemplateHelpers = Marionette.View.prototype.mixinTemplateHelpers;
    Marionette.View.prototype.mixinTemplateHelpers = function (data) {
        data = mixinTemplateHelpers.call(this, data);
        data.view = this;

        if (_.isFunction(data.content)) {
            data.content = data.content(data);
        }

        return data;
    };

    module.exports = regionHelper;

})();
