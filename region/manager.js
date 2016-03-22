'use strict';

var manager = {
    regions: {},
    factories: [],

    /**
     * @param factory
     */
    registerAbstractFactory: function (factory) {
        this.factories.push(factory);
    },

    /**
     * @param {string} name
     * @param {AbstractRegion} Region
     */
    registerRegion: function (name, Region) {
        this.regions[name] = Region;
    },

    /**
     * @param {{regionClass: Function, regionType: string}} options
     * @returns {AbstractRegion}
     */
    getRegion: function (options) {
        var factories = this.factories;

        for (var index = 0; index < factories.length; index++) {
            var Region = factories[index].call(this, options);
            if (Region) {
                return Region;
            }
        }

        throw new Error('Unknown region type');
    }

};

/**
 * Allow pass regionClass to region
 */
manager.registerAbstractFactory(function (options) {
    if (options.regionClass && typeof options.regionClass === 'function') {
        return options.regionClass;
    }
});

/**
 * Allow pass regionType
 */
manager.registerAbstractFactory(function (options) {
    var type = (options.regionType || 'replace');

    if (options.async) {
        type = 'async_' + type;
    }

    return this.regions[type];
});

module.exports = manager;
