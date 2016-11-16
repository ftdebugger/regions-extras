import {AbstractRegion} from './AbstractRegion';

import {defaultManager} from './RegionManager';

export class ReplaceRegion extends AbstractRegion {

    constructor(options) {
        super(options);

        this.replaceElement = true;
    }

    show(view, options) {
        view.once('before:destroy', this._empty, this);

        super.show(view, options);
    }

}

defaultManager.registerRegion('replace', ReplaceRegion);
