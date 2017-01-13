(function ($) {
    $.fn.tilt = function(options) {

        const settings = $.extend({
            class: 'is-tilting'
        }, options);

        this.state = {
            active: true,
            test: false,
            settings: settings
        };

        this.test = () => {console.log(this.state)};

        return this.each(function () {

        });
    };
}(jQuery));