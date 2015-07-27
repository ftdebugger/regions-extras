(function () {
    'use strict';

    var Marionette = require('../marionette').getInstance(),
        Region = Marionette.Region,
        regionManager = require('./manager');

    /**
     * @class AbstractRegion
     */
    module.exports = Region.extend({}, {

        /**
         * @param {object|{name: string}} instanceOptions
         * @param {object} staticOptions
         * @returns {*}
         */
        createRegion: function (instanceOptions, staticOptions) {
            var NewRegion = this.extend(instanceOptions, staticOptions);
            regionManager.registerRegion(instanceOptions.name, NewRegion);

            return NewRegion;
        }

    });

})();
