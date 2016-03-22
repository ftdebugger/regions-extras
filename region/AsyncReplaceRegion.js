'use strict';

var ReplaceRegion = require('./ReplaceRegion'),
    baseShow = ReplaceRegion.prototype.show,
    baseEmpty = ReplaceRegion.prototype.empty;

var uniqueToken = 1;

/**
 * @class ReplaceRegion
 */
module.exports = ReplaceRegion.createRegion({
    name: 'async_replace',

    show: function (view, options) {
        var _this = this;

        var token = this._asyncRenderToken = uniqueToken++;

        return Promise.resolve(view.promise()).then(function () {
            if (token === _this._asyncRenderToken) {
                baseShow.call(_this, view, options);
            }
        });
    },

    empty: function () {
        this._asyncRenderToken = null;
        baseEmpty.call(this);
    }

});
