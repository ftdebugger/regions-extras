var manager = require('../region/manager');

var ReplaceRegion = require('../region/ReplaceRegion');
var AsyncReplaceRegion = require('../region/AsyncReplaceRegion');

describe('region manager', function () {

    it('show create over type', function () {
        var region = manager.getRegion({
            regionType: 'replace'
        });

        expect(region).toBe(ReplaceRegion);
    });

    it('show create over type', function () {
        var region = manager.getRegion({
            async: true
        });

        expect(region).toBe(AsyncReplaceRegion);
    });

    it('show create by default', function () {
        var region = manager.getRegion({});
        expect(region).toBe(ReplaceRegion);
    });

    it('show create with regionClass', function () {
        var region = manager.getRegion({
            regionClass: AsyncReplaceRegion
        });
        expect(region).toBe(AsyncReplaceRegion);
    });

});
