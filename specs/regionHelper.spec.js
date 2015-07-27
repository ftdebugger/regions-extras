var SimpleLayout = require('./fixture/SimpleLayout');
var SimpleView = require('./fixture/SimpleView');
var AsyncView = require('./fixture/AsyncView');

describe('region helper', function () {

    beforeEach(function () {
        this.layout = new SimpleLayout();
        this.layout.render().$el.appendTo('body');
    });

    afterEach(function () {
        this.layout.destroy();
    });

    it('attach named helper', function () {
        expect(this.layout.regionA).toBeDefined();
        expect(this.layout.regionB).toBeDefined();
    });

    it('first region will be synced', function () {
        this.layout.regionA.show(new SimpleView());

        expect(this.layout.$el.html()).toContain('simple view');
    });

    it('second region will be async', function () {
        var asyncView = new AsyncView();
        this.layout.regionB.show(asyncView);

        expect(this.layout.$el.html()).not.toContain('simple view');

        asyncView._promise.resolve();

        expect(this.layout.$el.html()).toContain('simple view');
    });

});
