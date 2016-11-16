import {expect} from 'chai';

import SimpleLayout from './fixture/SimpleLayout';
import AsyncView from './fixture/AsyncView';
import SimpleView from './fixture/SimpleView';

import './index.js';

const SIMPLE_VIEW = 'simple view';

describe('region helper', function () {

    beforeEach(function () {
        this.layout = new SimpleLayout();
        this.layout.render().$el.appendTo('body');
    });

    afterEach(function () {
        this.layout.destroy();
    });

    it('attach named helper', function () {
        expect(this.layout.getRegion('regionA')).not.to.equal(undefined);
        expect(this.layout.getRegion('regionB')).not.to.equal(undefined);
    });

    it('first region will be synced', function () {
        this.layout.getRegion('regionA').show(new SimpleView());

        expect(this.layout.$el.html()).contain(SIMPLE_VIEW);
    });

    it('second region will be async', function () {
        let asyncView = new AsyncView(),
            promise = this.layout.getRegion('regionB').show(asyncView);

        expect(this.layout.$el.html()).not.contain(SIMPLE_VIEW);
        asyncView.resolve();

        return promise.then(() => {
            expect(this.layout.$el.html()).contain(SIMPLE_VIEW);
        });
    });

    it('third region will be async with custom promise', function () {
        let asyncView = new AsyncView();

        let haveBeenCalled = false;
        asyncView.promise = function() {
            haveBeenCalled = true;
        };

        let promise = this.layout.getRegion('regionC').show(asyncView);
        this.layout.resolve();

        return promise.then(() => {
            expect(this.layout.$el.html()).contain(SIMPLE_VIEW);
            expect(haveBeenCalled).to.equal(false);
        });
    });

    it('create link in region to parent', function () {
        expect(this.layout.getRegion('regionA')._parent).to.equal(this.layout);
        expect(this.layout.getRegion('regionB')._parent).to.equal(this.layout);
    });

});
