(function ($) {
    $.fn.tilt = function (options) {

        /**
         * Loop every instance
         */
        return this.each(function () {

            this.settings = $.extend({
                class: $(this).is('[data-tilt-class]') ? $(this).data('tilt-class') : 'is-tilting'
            }, options);

            this.init = () => {
                this.bindEvents();
            };

            this.bindEvents = () => {
              $(this).on('mousemove', this.values);
            };

            this.values = function() {
                const offset = $(this).offset();
                return {
                    x: event.pageX - offset.left,
                    y: event.pageY - offset.top
                };
            };

            this.init();

        });
    };
}(jQuery));