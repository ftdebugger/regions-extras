// configure environment
import 'es6-shim';

import '../src/index';

import $ from 'jquery';
import chai from 'chai';
import chaiJQuery from 'chai-jquery';

window.jQuery = $;
chai.use(chaiJQuery);

chai.use(function(chai, utils){
    let flag = utils.flag;

    chai.Assertion.addMethod('toBeInDOM', function() {
        let actual = flag(this, 'object');

        this.assert(actual && actual.parent().length > 0, 'Element should attach to DOM', 'Element should not attach to DOM');
    });

});
