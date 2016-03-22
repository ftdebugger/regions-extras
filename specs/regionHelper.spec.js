var SimpleLayout = require('./fixture/SimpleLayout');
var SimpleView = require('./fixture/SimpleView');
var AsyncView = require('./fixture/AsyncView');

var SIMPLE_VIEW = 'simple view';

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

        expect(this.layout.$el.html()).toContain(SIMPLE_VIEW);
    });

    it('second region will be async', function (done) {
        var _this = this,
            asyncView = new AsyncView(),
            promise = _this.layout.regionB.show(asyncView);

        expect(this.layout.$el.html()).not.toContain(SIMPLE_VIEW);
        asyncView.resolve();

        return promise.then(function () {
            expect(_this.layout.$el.html()).toContain(SIMPLE_VIEW);
            done();
        });
    });

    it('create link in region to parent', function () {
        expect(this.layout.regionA._parentView).toBe(this.layout);
        expect(this.layout.regionB._parentView).toBe(this.layout);
    });

});
