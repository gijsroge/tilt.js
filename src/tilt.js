(function ($) {
    $.fn.tilt = function (options) {

        /**
         * Loop every instance
         */
        return this.each(function () {

            this.requestTick = () => {
                if (this.ticking) return;
                requestAnimationFrame(this.updateTransforms);
                this.ticking = true;
            };

            /**
             * Default settings merged with user settings
             * Can be set trough data attributes or as parameter.
             * @type {*}
             */
            this.settings = $.extend({
                class: $(this).is('[data-tilt-class]') ? $(this).data('tilt-class') : 'is-tilting',
                maxTilt: $(this).is('[data-tilt-max]') ? $(this).data('tilt-max') : 20,
                perspective: $(this).is('[data-tilt-perspective]') ? $(this).data('tilt-perspective') : 1000,
                easing: $(this).is('[data-tilt-easing]') ? $(this).data('tilt-easing') : 'cubic-bezier(.03,.98,.52,.99)',
                scale: $(this).is('[data-tilt-scale]') ? $(this).data('tilt-scale') : '1',
                speed: $(this).is('[data-tilt-speed]') ? $(this).data('tilt-speed') : '.3s'
            }, options);

            /**
             * Bind mouse movement evens on instance
             */
            this.bindEvents = () => {
                $(this).on('mousemove', this.mouseMove);
                $(this).on('mouseenter', this.mouseEnter);
                $(this).on('mouseleave', this.mouseLeave);
            };

            this.mouseEnter = () => {
                this.ticking = false;
                $(this).css({'will-change': 'transform', 'transition': `${this.settings.speed} ${this.settings.easing}`});
            };

            this.mouseMove = () => {
                this.mousePosition = {x: event.pageX, y: event.pageY};
                this.requestTick();
            };

            this.mouseLeave = () => {
                this.reset = true;
                this.requestTick();
            };

            /**
             * Get tilt values
             *
             * @returns {{x: tilt value, y: tilt value}}
             */
            this.getValues = () => {
                const width = this.clientWidth;
                const height = this.clientHeight;
                // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value
                const tiltX = ((this.settings.maxTilt / 2) - (((this.mousePosition.x - $(this).offset().left) / width) * this.settings.maxTilt)).toFixed(2);
                const tiltY = ((((this.mousePosition.y - $(this).offset().top) / height) * this.settings.maxTilt) - (this.settings.maxTilt / 2)).toFixed(2);
                // Return x & y tilt values
                return {tiltX, tiltY}
            };

            this.updateTransforms = () => {
                const transforms = this.getValues();
                console.table([transforms]);

                if(this.reset){
                    this.reset = false;
                    $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg)`);
                    return;
                }else{
                    $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(${transforms.tiltY}deg) rotateY(${transforms.tiltX}deg) scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`);
                }

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