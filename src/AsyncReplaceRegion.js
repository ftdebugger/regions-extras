import {ReplaceRegion} from './ReplaceRegion';
import {defaultManager} from './RegionManager';

let uniqueToken = 1;

export class AsyncReplaceRegion extends ReplaceRegion {

    show(view, options) {
        let token = this._asyncRenderToken = uniqueToken++,
            promise;

        if ('promise' in this.options) {
            promise = this.options.promise;

            if (typeof promise === 'function') {
                promise = promise.call(this);
            }
        } else {
            promise = view.promise();
        }

        return Promise.resolve(promise).then(() => {
            if (token === this._asyncRenderToken) {
                super.show(view, options);
            }
        });
    }

    empty() {
        this._asyncRenderToken = null;

        super.empty();
    }

}

defaultManager.registerRegion('async_replace', AsyncReplaceRegion);
