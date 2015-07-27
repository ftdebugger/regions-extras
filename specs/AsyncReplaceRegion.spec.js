var AsyncReplaceRegion = require('../region/AsyncReplaceRegion'),
    AsyncView = require('./fixture/AsyncView'),
    AsyncViewNoneDeferred = require('./fixture/AsyncViewNoneDeferred');

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

    it('can render inside region', function () {
        this.region.show(this.view);

        expect(this.view.$el).not.toBeInDOM();
        this.view._promise.resolve();
        expect(this.view.$el).toBeInDOM();
    });

    it('can render immediately inside region', function () {
        var view = new AsyncViewNoneDeferred();
        this.region.show(view);
        expect(view.$el).toBeInDOM();
    });

    it('if region destroy before resolve, render will not invoked', function () {
        var spy = jasmine.createSpy();
        this.view.on('render', spy);

        this.region.show(this.view);
        this.region.empty();

        expect(spy.calls.count()).toBe(0);
    });

});
