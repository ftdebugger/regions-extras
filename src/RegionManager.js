export class RegionManager {

    constructor() {
        this.regions = {};
        this.factories = [];
    }

    /**
     * @param factory
     */
    registerAbstractFactory(factory) {
        this.factories.push(factory);
    }

    /**
     * @param {string} name
     * @param {AbstractRegion} Region
     */
    registerRegion(name, Region) {
        this.regions[name] = Region;
    }

    /**
     * @param {{regionClass: Function, regionType: string}} options
     * @returns {AbstractRegion}
     */
    getRegion(options) {
        let factories = this.factories;

        for (let index = 0; index < factories.length; index++) {
            let Region = factories[index].call(this, options);
            if (Region) {
                return Region;
            }
        }

        throw new Error('Unknown region type');
    }
}

export let defaultManager = new RegionManager();

/**
 * Allow pass regionClass to region
 */
defaultManager.registerAbstractFactory(function (options) {
    if (options.regionClass && typeof options.regionClass === 'function') {
        return options.regionClass;
    }
});

/**
 * Allow pass regionType
 */
defaultManager.registerAbstractFactory(function ({regionType = 'replace', async}) {
    if (async) {
        regionType = 'async_' + regionType;
    }

    return this.regions[regionType];
});
