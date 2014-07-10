module.exports = {
    instance: null,

    /**
     * @returns {Handlebars}
     */
    getInstance: function () {
        if (!this.instance) {
            if (typeof Handlebars != "undefined") {
                this.instance = Handlebars;
            }
        }

        if (!this.instance) {
            throw new Error("Cannot find handlebars");
        }

        return this.instance;
    },

    /**
     * @param {Handlebars} instance
     */
    setInstance: function (instance) {
        this.instance = instance;
    }
};

