var AsyncReplaceRegion = require('../region/AsyncReplaceRegion'),
    AsyncViewDeferred = require('./fixture/AsyncViewDeferred'),
    AsyncView = require('./fixture/AsyncView'),
    AsyncViewNoneDeferred = require('./fixture/AsyncViewNoneDeferred'),
    SimpleLayout = require('./fixture/SimpleLayout');

describe('replace region', function () {

    beforeEach(function () {
        this.$el = $('<div></div>').appendTo('body');
        this.region = new AsyncReplaceRegion({
            el: this.$el
        });
        this.view = new AsyncView();
    });

    afterEach(function () {
        this.$el.remove();
        this.view.destroy();
    });

    it('can render inside region', function (done) {
        var _this = this,
            promise = _this.region.show(_this.view);

        expect(_this.view.$el).not.toBeInDOM();
        _this.view.resolve();

        return promise.then(function () {
            expect(_this.view.$el).toBeInDOM();
            done();
        });
    });

    it('can render jquery deferred view inside region', function (done) {
        var _this = this,
            view = new AsyncViewDeferred(),
            promise = _this.region.show(view);

        expect(view.$el).not.toBeInDOM();
        view.resolve();

        return promise.then(function () {
            expect(view.$el).toBeInDOM();
            done();
        });
    });

    it('can render immediately inside region', function (done) {
        var view = new AsyncViewNoneDeferred(),
            promise = this.region.show(view);

        return promise.then(function () {
            expect(view.$el).toBeInDOM();
            done();
        });
    });

    it('if region destroy before resolve, render will not invoked', function () {
        var spy = jasmine.createSpy();
        this.view.on('render', spy);

        this.region.show(this.view);
        this.region.empty();

        expect(spy.calls.count()).toBe(0);
    });

    it('create link in region view to parent view', function (done) {
        var _this = this,
            layout = new SimpleLayout().render(),
            promise = layout.regionB.show(_this.view);

        _this.view.resolve();

        return promise.then(function () {
            expect(_this.view._parentView).toBe(layout);
            expect(_this.view._parent).toBe(layout.regionB);
            expect(_this.view._parent._parent).toBe(layout.regionManager);
            expect(_this.view._parent._parent._parent).toBe(layout);
            done();
        });
    });
});
