import {expect} from 'chai';
import $ from 'jquery';

import {AsyncReplaceRegion} from '../src/AsyncReplaceRegion';
import AsyncView from './fixture/AsyncView';
import AsyncViewDeferred from './fixture/AsyncViewDeferred';
import AsyncViewNoneDeferred from './fixture/AsyncViewNoneDeferred';
import SimpleLayout from './fixture/SimpleLayout';

import './index.js';

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
        let promise = this.region.show(this.view);

        expect(this.view.$el).not.toBeInDOM();
        this.view.resolve();

        return promise.then(() => {
            expect(this.view.$el).toBeInDOM();
        });
    });

    it('can render jquery deferred view inside region', function () {
        let view = new AsyncViewDeferred(),
            promise = this.region.show(view);

        expect(view.$el).not.toBeInDOM();
        view.resolve();

        return promise.then(function () {
            expect(view.$el).toBeInDOM();
        });
    });

    it('can render immediately inside region', function () {
        let view = new AsyncViewNoneDeferred(),
            promise = this.region.show(view);

        return promise.then(function () {
            expect(view.$el).toBeInDOM();
        });
    });

    it('can consume custom promise', function () {
        let resolve;

        let region = new AsyncReplaceRegion({
            el: this.$el,
            promise: new Promise(function (res) {
                resolve = res;
            })
        });

        let promise = region.show(this.view);

        expect(this.view.$el).not.toBeInDOM();
        resolve();

        return promise.then(() => {
            expect(this.view.$el).toBeInDOM();
        });
    });

    it('create link in region view to parent view', function () {
        let layout = new SimpleLayout().render(),
            promise = layout.getRegion('regionB').show(this.view);

        this.view.resolve();

        return promise.then(() => {
            expect(this.view._parent).to.equal(layout.getRegion('regionB'));
        });
    });
});
