import {expect} from 'chai';

import {defaultManager} from '../src/RegionManager';
import {ReplaceRegion} from '../src/ReplaceRegion';
import {AsyncReplaceRegion} from '../src/AsyncReplaceRegion';

import './index.js';

describe('region manager', function () {

    it('show create over type', function () {
        let region = defaultManager.getRegion({
            regionType: 'replace'
        });

        expect(region).to.equal(ReplaceRegion);
    });

    it('show create over type', function () {
        let region = defaultManager.getRegion({
            async: true
        });

        expect(region).to.equal(AsyncReplaceRegion);
    });

    it('show create by default', function () {
        let region = defaultManager.getRegion({});
        expect(region).to.equal(ReplaceRegion);
    });

    it('show create with regionClass', function () {
        let region = defaultManager.getRegion({
            regionClass: AsyncReplaceRegion
        });
        expect(region).to.equal(AsyncReplaceRegion);
    });

});
