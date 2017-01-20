(function ($) {
    $.fn.tilt = function (options) {

        /**
         * Loop every instance
         */
        return this.each(function () {

            /**
             * RequestAnimationFrame
             */
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
                maxTilt: $(this).is('[data-tilt-max]') ? $(this).data('tilt-max') : 20,
                perspective: $(this).is('[data-tilt-perspective]') ? $(this).data('tilt-perspective') : 1000,
                easing: $(this).is('[data-tilt-easing]') ? $(this).data('tilt-easing') : 'cubic-bezier(.03,.98,.52,.99)',
                scale: $(this).is('[data-tilt-scale]') ? $(this).data('tilt-scale') : '1',
                speed: $(this).is('[data-tilt-speed]') ? $(this).data('tilt-speed') : '300',
                transition: $(this).is('[data-tilt-transition]') ? $(this).data('tilt-transition') : true,
                axis: $(this).is('[data-tilt-axis]') ? $(this).data('tilt-axis') : null,
                reset: $(this).is('[data-tilt-reset]') ? $(this).data('tilt-reset') : true,
            }, options);

            /**
             * Bind mouse movement evens on instance
             */
            this.bindEvents = () => {
                $(this).on('mousemove', this.mouseMove);
                $(this).on('mouseenter', this.mouseEnter);
                if (this.settings.reset) $(this).on('mouseleave', this.mouseLeave);
            };

            /**
             * Set transition only on mouse leave and mouse enter so it doesn't influence mouse move transforms
             */
            this.setTransition = () => {
                if (this.timeout !== undefined) clearTimeout(this.timeout);
                $(this).css({'transition': `${this.settings.speed}ms ${this.settings.easing}`});
                this.timeout = setTimeout(() => {
                    $(this).css({'transition': ''});
                }, this.settings.speed);
            };

            this.mouseEnter = () => {
                this.ticking = false;
                $(this).css({'will-change': 'transform'});
                this.setTransition();

                // Trigger change event
                $(this).trigger("tilt.mouseEnter");
            };

            this.getMousePositions = () => {
                if (event === undefined) {
                    event = {
                        pageX: $(this).offset().left + $(this).width() / 2,
                        pageY: $(this).offset().top + $(this).height() / 2
                    };
                }
                return {x: event.pageX, y: event.pageY};
            };

            this.mouseMove = () => {
                this.mousePositions = this.getMousePositions();
                this.requestTick();
            };

            this.mouseLeave = () => {
                this.setTransition();
                this.reset = true;
                this.requestTick();

                // Trigger change event
                $(this).trigger("tilt.mouseLeave");
            };

            this.api = {
                getValues: () => {
                    this.mousePositions = this.getMousePositions();
                    return this.getValues();
                },

                reset: () => {
                    this.mouseLeave();
                    setTimeout(() => {this.reset = false;},this.settings.transition);
                },

                destroy: () => {
                    $(this).css({'will-change': '','transform': ''});
                    $(this).off('mousemove mouseenter mouseleave');
                }
            };

            /**
             * Get tilt values
             *
             * @returns {{x: tilt value, y: tilt value}}
             */
            this.getValues = () => {
                const width = this.clientWidth;
                const height = this.clientHeight;
                const percentageX = (this.mousePositions.x - $(this).offset().left) / width;
                const percentageY = (this.mousePositions.y - $(this).offset().top) / height;
                // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value
                const tiltX = ((this.settings.maxTilt / 2) - ((percentageX) * this.settings.maxTilt)).toFixed(2);
                const tiltY = (((percentageY) * this.settings.maxTilt) - (this.settings.maxTilt / 2)).toFixed(2);
                // Return x & y tilt values
                return {tiltX, tiltY, 'percentageX': percentageX * 100, 'percentageY': percentageY * 100};
            };

            /**
             * Update tilt transforms on mousemove
             */
            this.updateTransforms = () => {
                this.transforms = this.getValues();

                if (this.reset) {
                    this.reset = false;
                    $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg)`);
                    return;
                } else {
                    $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(${this.settings.axis === 'x' ? 0 : this.transforms.tiltY}deg) rotateY(${this.settings.axis === 'y' ? 0 : this.transforms.tiltX}deg) scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`);
                }

                // Trigger change event
                $(this).trigger("change", [this.transforms]);

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