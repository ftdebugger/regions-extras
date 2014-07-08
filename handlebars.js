try {
    module.exports = require("injectify/runtime");
}
catch (e) {
    try {
        module.exports = require("hbsfy/runtime")
    }
    catch (e) {
        module.exports = require('handlebars/runtime')['default'];
    }
}
