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

        var promise;
        if ('promise' in this.options) {
            promise = this.options.promise;
            if (typeof promise === 'function') {
                promise = promise.call(this);
            }
        } else {
            promise = view.promise();
        }

        return Promise.resolve(promise).then(function () {
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
