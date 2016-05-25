var ReplaceRegion = require('../region/ReplaceRegion'),
    SimpleView = require('./fixture/SimpleView'),
    SimpleLayout = require('./fixture/SimpleLayout');

describe('replace region', function () {

    beforeEach(function () {
        this.$el = $('<div></div>').appendTo('body');
        this.region = new ReplaceRegion({
            el: this.$el
        });
        this.view = new SimpleView();
    });

    afterEach(function () {
        this.$el.remove();
        this.view.destroy();
    });

    it('can render inside region', function () {
        this.region.show(this.view);
        expect(this.view.$el).toBeInDOM();
    });

    it('replace region element and render own', function () {
        this.region.show(this.view);
        expect(this.region.$placeholder).not.toBeInDOM();
        expect(this.region.el).toBeInDOM();
        expect(this.region.$el).toBeInDOM();
        expect(this.view.$el.parent()).toBeMatchedBy('body');
    });

    it('correct replace region during view destroy', function () {
        this.region.show(this.view);
        this.view.destroy();

        expect(this.region.el).toBeInDOM();
        expect($(this.region.el).parent()).toBeMatchedBy('body');
    });

    it('empty region', function () {
        this.region.show(this.view);
        this.region.empty();

        expect(this.view.$el).not.toBeInDOM();
        expect(this.region.el).toBeInDOM();
    });

    describe('double render', function () {

        beforeEach(function () {
            this.view2 = new SimpleView();
        });

        afterEach(function () {
            this.view2.destroy();
        });

        it('support double render', function () {
            this.region.show(this.view);
            this.region.show(this.view2);

            expect(this.view.$el).not.toBeInDOM();
            expect(this.view2.$el).toBeInDOM();
        });

    });

    it('create link in region view to parent view', function () {
        var layout = new SimpleLayout().render();
        layout.regionA.show(this.view);
        expect(this.view._parentView).toBe(layout);
        expect(this.view._parent).toBe(layout.regionA);
        expect(this.view._parent._parent).toBe(layout.regionManager);
        expect(this.view._parent._parent._parent).toBe(layout);
    });

});
