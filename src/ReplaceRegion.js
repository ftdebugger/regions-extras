import {AbstractRegion} from './AbstractRegion';

import {defaultManager} from './RegionManager';

export class ReplaceRegion extends AbstractRegion {

}

defaultManager.registerRegion('replace', ReplaceRegion);
