module.exports = {
    instance: null,

    /**
     * @returns {Marionette}
     */
    getInstance: function () {
        if (!this.instance) {
            if (typeof Marionette != "undefined") {
                this.instance = Marionette;
            }
        }

        if (!this.instance) {
            throw new Error("Cannot find marionette");
        }

        return this.instance;
    },

    /**
     * @param {Marionette} instance
     */
    setInstance: function (instance) {
        this.instance = instance;
    }
};
