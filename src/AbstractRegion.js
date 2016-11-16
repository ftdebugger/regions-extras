import {Region} from 'backbone.marionette';

export class AbstractRegion extends Region {

    show(view, options) {
        view._parent = this;

        return super.show(view, options);
    }

}
