(function ($) {
    $.fn.tilt = function (options) {

        function tick() {
            if (this.ticking) return;
            requestAnimationFrame(this.updateTransforms.bind(this, event));
            this.ticking = true;
        }

        /**
         * Get tilt values
         *
         * @returns {{x: tilt value, y: tilt value}}
         */
        function getValues(event) {
            // Position inside instance
            const offset = $(this).offset();
            // Dimensions of instance
            const width = $(this).width();
            const height = $(this).height();
            // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value
            const posx = (((event.pageX - offset.left) / width) * this.settings.maxTilt) - (this.settings.maxTilt / 2);
            const posy = (((event.pageY - offset.top) / height) * this.settings.maxTilt) - (this.settings.maxTilt / 2);
            // Return x & y tilt values
            return {posx, posy}
        }

        /**
         * Loop every instance
         */
        return this.each(function () {

            this.ticking = false;

            /**
             * Default settings merged with user settings
             * Can be set trough data attributes or as parameter.
             * @type {*}
             */
            this.settings = $.extend({
                class: $(this).is('[data-tilt-class]') ? $(this).data('tilt-class') : 'is-tilting',
                maxTilt: $(this).is('[data-tilt-max]') ? $(this).data('tilt-max') : 10,
                perspective: $(this).is('[data-tilt-perspective]') ? $(this).data('tilt-perspective') : 1000,
            }, options);

            /**
             * Bind mouse movement evens on instance
             */
            this.bindEvents = () => {
                $(this).on('mousemove', tick);
                $(this).on('mouseleave', this.resetTransforms);
            };

            this.resetTransforms = () =>{
                $(this).css('transform', '');
            };

            this.updateTransforms = (event) => {
                const transforms = getValues.call(this, event);
                $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(${transforms.posx}deg) rotateY(${transforms.posy}deg)`);
                this.ticking = false;
            };

            this.init = () => {
                this.bindEvents();
            };

            // Init
            this.init();

        });
    };
}(jQuery));