/**
 * Header Component.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
;(function ($) {
  'use strict';

  $.TopTenTourHeader = {

    /**
     * Base configuration.
     *
     * @var Object _baseConfig
     */
    _baseConfig: {
      headerFixMoment: 0,
      headerFixEffect: 'slide',
      breakpointsMap: {
        'md': 768,
        'sm': 576,
        'lg': 992,
        'xl': 1200
      }
    },

    /**
     * Initializtion of header.
     *
     * @param jQuery element
     *
     * @return jQuery
     */
    init: function (element) {

      if (!element || element.length !== 1 || element.data('TopTenTourHeader')) return;

      var self = this;

      this.element = element;
      this.config = $.extend(true, {}, this._baseConfig, element.data());

      this.observers = this._detectObservers();
      this.fixMediaDifference(this.element);
      this.element.data('TopTenTourHeader', new TopTenTourHeader(this.element, this.config, this.observers));

      $(window)
          .on('scroll.uHeader', function (e) {

            if ($(window).scrollTop() < ($(element).data('header-fix-moment') - 100) && $(element).data('effect-compensation') === true) {
              $(element).css({
                top: -($(window).scrollTop())
              })
                  .addClass($(element).data('effect-compensation-start-class'))
                  .removeClass($(element).data('effect-compensation-end-class'));
            } else if ($(element).data('effect-compensation') === true) {
              $(element).css({
                top: 0
              })
                  .addClass($(element).data('effect-compensation-end-class'))
                  .removeClass($(element).data('effect-compensation-start-class'));
            }

            if ($(window).scrollTop() > 5 && !$(element).hasClass('.u-scrolled')) {
              $(element).addClass('u-scrolled')
            } else {
              $(element).removeClass('u-scrolled')
            }

            element
                .data('TopTenTourHeader')
                .notify();

          })
          .on('resize.uHeader', function (e) {

            if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);

            self.resizeTimeOutId = setTimeout(function () {

              element
                  .data('TopTenTourHeader')
                  .checkViewport()
                  .update();

            }, 100);

          })
          .trigger('scroll.uHeader');

      return this.element;

    },

    /**
     *
     *
     * @param
     *
     * @return
     */
    _detectObservers: function () {

      if (!this.element || !this.element.length) return;

      var observers = {
        'xs': [],
        'sm': [],
        'md': [],
        'lg': [],
        'xl': []
      };

      /* ------------------------ xs -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element')) {
        observers['xs'].push(
            new TopTenTourHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top')) {

        if (this.element.hasClass('u-header--show-hide')) {

          observers['xs'].push(
              new TopTenTourHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section')) {

          observers['xs'].push(
              new TopTenTourHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance')) {

          observers['xs'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating')) {

        observers['xs'].push(
            new TopTenTourHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable')) {
        observers['xs'].push(
            new TopTenTourHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom')) {

        if (this.element.hasClass('u-header--change-appearance')) {
          observers['xs'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top') || this.element.hasClass('u-header--static')) {

        if (this.element.hasClass('u-header--show-hide')) {

          observers['xs'].push(
              new TopTenTourHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance')) {

          observers['xs'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom') || this.element.hasClass('u-header--abs-top-2nd-screen')) {

        observers['xs'].push(
            new TopTenTourHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance')) {

          observers['xs'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }

      /* ------------------------ sm -------------------------*/

      // Sticky top

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-sm')) {
        observers['sm'].push(
            new TopTenTourHeaderHasHiddenElement(this.element)
        );
      }

      if (this.element.hasClass('u-header--sticky-top-sm')) {

        if (this.element.hasClass('u-header--show-hide-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-sm')) {

        observers['sm'].push(
            new TopTenTourHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable-sm')) {
        observers['sm'].push(
            new TopTenTourHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-sm')) {

        if (this.element.hasClass('u-header--change-appearance-sm')) {
          observers['sm'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-sm') || this.element.hasClass('u-header--static-sm')) {

        if (this.element.hasClass('u-header--show-hide-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-sm') || this.element.hasClass('u-header--abs-top-2nd-screen-sm')) {

        observers['sm'].push(
            new TopTenTourHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }

      /* ------------------------ md -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-md')) {
        observers['md'].push(
            new TopTenTourHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top-md')) {

        console.log(1);

        if (this.element.hasClass('u-header--show-hide-md')) {

          observers['md'].push(
              new TopTenTourHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-md')) {

          observers['md'].push(
              new TopTenTourHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-md')) {

          observers['md'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-md')) {

        observers['md'].push(
            new TopTenTourHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable-md')) {
        observers['md'].push(
            new TopTenTourHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-md')) {

        if (this.element.hasClass('u-header--change-appearance-md')) {
          observers['md'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-md') || this.element.hasClass('u-header--static-md')) {

        if (this.element.hasClass('u-header--show-hide-md')) {

          observers['md'].push(
              new TopTenTourHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-md')) {

          observers['md'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-md') || this.element.hasClass('u-header--abs-top-2nd-screen-md')) {

        observers['md'].push(
            new TopTenTourHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-md')) {

          observers['md'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }


      /* ------------------------ lg -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-lg')) {
        observers['lg'].push(
            new TopTenTourHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top-lg')) {

        if (this.element.hasClass('u-header--show-hide-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-lg')) {

        observers['lg'].push(
            new TopTenTourHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable-lg')) {
        observers['lg'].push(
            new TopTenTourHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-lg')) {

        if (this.element.hasClass('u-header--change-appearance-lg')) {
          observers['lg'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-lg') || this.element.hasClass('u-header--static-lg')) {

        if (this.element.hasClass('u-header--show-hide-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-lg') || this.element.hasClass('u-header--abs-top-2nd-screen-lg')) {

        observers['lg'].push(
            new TopTenTourHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }

      /* ------------------------ xl -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-xl')) {
        observers['xl'].push(
            new TopTenTourHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top-xl')) {

        if (this.element.hasClass('u-header--show-hide-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-xl')) {

        observers['xl'].push(
            new TopTenTourHeaderFloatingObserver(this.element)
        );

      }

      // Sticky bottom

      if (this.element.hasClass('u-header--invulnerable-xl')) {
        observers['xl'].push(
            new TopTenTourHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-xl')) {

        if (this.element.hasClass('u-header--change-appearance-xl')) {
          observers['xl'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-xl') || this.element.hasClass('u-header--static-xl')) {

        if (this.element.hasClass('u-header--show-hide-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-xl') || this.element.hasClass('u-header--abs-top-2nd-screen-xl')) {

        observers['xl'].push(
            new TopTenTourHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new TopTenTourHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }


      return observers;

    },

    /**
     *
     *
     * @param
     *
     * @return
     */
    fixMediaDifference: function (element) {

      if (!element || !element.length || !element.filter('[class*="u-header--side"]').length) return;

      var toggleable;

      if (element.hasClass('u-header--side-left-xl') || element.hasClass('u-header--side-right-xl')) {

        toggleable = element.find('.navbar-expand-xl');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-xl')
              .addClass('navbar-expand-lg');
        }

      }
      else if (element.hasClass('u-header--side-left-lg') || element.hasClass('u-header--side-right-lg')) {

        toggleable = element.find('.navbar-expand-lg');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-lg')
              .addClass('navbar-expand-md');
        }

      }
      else if (element.hasClass('u-header--side-left-md') || element.hasClass('u-header--side-right-md')) {

        toggleable = element.find('.navbar-expand-md');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-md')
              .addClass('navbar-expand-sm');
        }

      }
      else if (element.hasClass('u-header--side-left-sm') || element.hasClass('u-header--side-right-sm')) {

        toggleable = element.find('.navbar-expand-sm');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-sm')
              .addClass('navbar-expand');
        }

      }

    }

  };

  /**
   * TopTenTourHeader constructor function.
   *
   * @param jQuery element
   * @param Object config
   * @param Object observers
   *
   * @return undefined
   */
  function TopTenTourHeader(element, config, observers) {

    if (!element || !element.length) return;

    this.element = element;
    this.config = config;

    this.observers = observers && $.isPlainObject(observers) ? observers : {};

    this.viewport = 'xs';
    this.checkViewport();

  }

  /**
   *
   *
   * @return Object
   */
  TopTenTourHeader.prototype.checkViewport = function () {

    var $w = $(window);

    if ($w.width() > this.config.breakpointsMap['sm'] && this.observers['sm'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'sm';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if(typeof this.config.breakpointsMap['sm'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }

    if ($w.width() > this.config.breakpointsMap['md'] && this.observers['md'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'md';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if (typeof this.config.breakpointsMap['md'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }

    if ($w.width() > this.config.breakpointsMap['lg'] && this.observers['lg'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'lg';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if (typeof this.config.breakpointsMap['lg'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }

    if ($w.width() > this.config.breakpointsMap['xl'] && this.observers['xl'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'xl';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if (typeof this.config.breakpointsMap['xl'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }


    if (this.prevViewport) this.prevViewport = this.viewport;

    if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

      if (typeof this.config.breakpointsMap['xs'] === 'undefined') {
        this.element.removeClass('js-header-fix-moment');
      } else {
        this.element.addClass('js-header-fix-moment');
      }

    }

    this.viewport = 'xs';


    return this;

  };

  /**
   * Notifies all observers.
   *
   * @return Object
   */
  TopTenTourHeader.prototype.notify = function () {

    if (this.prevViewport) {
      this.observers[this.prevViewport].forEach(function (observer) {
        observer.destroy();
      });
      this.prevViewport = null;
    }

    this.observers[this.viewport].forEach(function (observer) {
      observer.check();
    });

    return this;

  };

  /**
   * Reinit all header's observers.
   *
   * @return Object
   */
  TopTenTourHeader.prototype.update = function () {

    for (var viewport in this.observers) {

      this.observers[viewport].forEach(function (observer) {
        observer.destroy();
      });

    }

    this.prevViewport = null;

    this.observers[this.viewport].forEach(function (observer) {
      observer.reinit();
    });

    return this;

  };

  /**
   * Abstract constructor function for each observer.
   *
   * @param jQuery element
   *
   * @return Boolean|undefined
   */
  function TopTenTourAbstractObserver(element) {
    if (!element || !element.length) return;

    this.element = element;
    this.defaultState = true;

    this.reinit = function () {

      this
          .destroy()
          .init()
          .check();
    };

    return true;
  }

  /**
   * Header's observer which is responsible for 'sticky' behavior.
   *
   * @param jQuery element
   */
  function TopTenTourHeaderStickObserver(element) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.init();

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderStickObserver.prototype.init = function () {
    this.defaultState = true;
    this.offset = this.element.offset().top;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderStickObserver.prototype.destroy = function () {
    this.toDefaultState();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderStickObserver.prototype.check = function () {

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled < this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderStickObserver.prototype.changeState = function () {

    this.element.addClass('js-header-fix-moment');
    this.defaultState = !this.defaultState;

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderStickObserver.prototype.toDefaultState = function () {

    this.element.removeClass('js-header-fix-moment');
    this.defaultState = !this.defaultState;

    return this;

  };


  /**
   * Header's observer which is responsible for 'show/hide' behavior which is depended on scroll direction.
   *
   * @param jQuery element
   */
  function TopTenTourHeaderMomentShowHideObserver(element) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.init();
  }

  /**
   *
   *
   * @return Object
   */
  TopTenTourHeaderMomentShowHideObserver.prototype.init = function () {
    this.direction = 'down';
    this.delta = 0;
    this.defaultState = true;

    this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') !== 0 ? this.element.data('header-fix-moment') : 5;
    this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

    return this;
  };

  /**
   *
   *
   * @return Object
   */
  TopTenTourHeaderMomentShowHideObserver.prototype.destroy = function () {
    this.toDefaultState();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TopTenTourHeaderMomentShowHideObserver.prototype.checkDirection = function () {

    if ($(window).scrollTop() > this.delta) {
      this.direction = 'down';
    }
    else {
      this.direction = 'up';
    }

    this.delta = $(window).scrollTop();

    return this;

  };

  /**
   *
   *
   * @return Object
   */
  TopTenTourHeaderMomentShowHideObserver.prototype.toDefaultState = function () {

    switch (this.effect) {
      case 'slide' :
        this.element.removeClass('u-header--moved-up');
        break;

      case 'fade' :
        this.element.removeClass('u-header--faded');
        break;

      default:
        this.element.removeClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @return Object
   */
  TopTenTourHeaderMomentShowHideObserver.prototype.changeState = function () {

    switch (this.effect) {
      case 'slide' :
        this.element.addClass('u-header--moved-up');
        break;

      case 'fade' :
        this.element.addClass('u-header--faded');
        break;

      default:
        this.element.addClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @return Object
   */
  TopTenTourHeaderMomentShowHideObserver.prototype.check = function () {

    var docScrolled = $(window).scrollTop();
    this.checkDirection();


    if (docScrolled >= this.offset && this.defaultState && this.direction === 'down') {
      this.changeState();
    }
    else if (!this.defaultState && this.direction === 'up') {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TopTenTourHeaderShowHideObserver(element) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TopTenTourHeaderShowHideObserver.prototype.init = function () {
    if (!this.defaultState && $(window).scrollTop() > this.offset) return this;

    this.defaultState = true;
    this.transitionDuration = parseFloat(getComputedStyle(this.element.get(0))['transition-duration'], 10) * 1000;

    this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') > this.element.outerHeight() ? this.element.data('header-fix-moment') : this.element.outerHeight() + 100;
    this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TopTenTourHeaderShowHideObserver.prototype.destroy = function () {
    if (!this.defaultState && $(window).scrollTop() > this.offset) return this;

    this.element.removeClass('u-header--untransitioned');
    this._removeCap();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderShowHideObserver.prototype._insertCap = function () {

    this.element.addClass('js-header-fix-moment u-header--untransitioned');

    if (this.element.hasClass('u-header--static')) {

      $('html').css('padding-top', this.element.outerHeight());

    }

    switch (this.effect) {
      case 'fade' :
        this.element.addClass('u-header--faded');
        break;

      case 'slide' :
        this.element.addClass('u-header--moved-up');
        break;

      default :
        this.element.addClass('u-header--invisible')
    }

    this.capInserted = true;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderShowHideObserver.prototype._removeCap = function () {

    var self = this;

    this.element.removeClass('js-header-fix-moment');

    if (this.element.hasClass('u-header--static')) {

      $('html').css('padding-top', 0);

    }

    if (this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId);

    this.removeCapTimeOutId = setTimeout(function () {
      self.element.removeClass('u-header--moved-up u-header--faded u-header--invisible');
    }, 10);

    this.capInserted = false;

  };


  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderShowHideObserver.prototype.check = function () {

    var $w = $(window);

    if ($w.scrollTop() > this.element.outerHeight() && !this.capInserted) {
      this._insertCap();
    }
    else if ($w.scrollTop() <= this.element.outerHeight() && this.capInserted) {
      this._removeCap();
    }

    if ($w.scrollTop() > this.offset && this.defaultState) {
      this.changeState();
    }
    else if ($w.scrollTop() <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderShowHideObserver.prototype.changeState = function () {

    this.element.removeClass('u-header--untransitioned');

    if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId);

    switch (this.effect) {
      case 'fade' :
        this.element.removeClass('u-header--faded');
        break;

      case 'slide' :
        this.element.removeClass('u-header--moved-up');
        break;

      default:
        this.element.removeClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderShowHideObserver.prototype.toDefaultState = function () {

    var self = this;

    this.animationTimeoutId = setTimeout(function () {
      self.element.addClass('u-header--untransitioned');
    }, this.transitionDuration);


    switch (this.effect) {
      case 'fade' :
        this.element.addClass('u-header--faded');
        break;
      case 'slide' :
        this.element.addClass('u-header--moved-up');
        break;
      default:
        this.element.addClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TopTenTourHeaderChangeLogoObserver(element, config) {

    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.config = {
      fixPointSelf: false
    };

    if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

    this.init();

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeLogoObserver.prototype.init = function () {

    if (this.element.hasClass('js-header-fix-moment')) {
      this.hasFixedClass = true;
      this.element.removeClass('js-header-fix-moment');
    }
    if (this.config.fixPointSelf) {
      this.offset = this.element.offset().top;
    }
    else {
      this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 0;
    }
    if (this.hasFixedClass) {
      this.hasFixedClass = false;
      this.element.addClass('js-header-fix-moment');
    }

    this.imgs = this.element.find('.u-header__logo-img');
    this.defaultState = true;

    this.mainLogo = this.imgs.filter('.u-header__logo-img--main');
    this.additionalLogo = this.imgs.not('.u-header__logo-img--main');

    if (!this.imgs.length) return this;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeLogoObserver.prototype.destroy = function () {
    this.toDefaultState();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeLogoObserver.prototype.check = function () {

    var $w = $(window);

    if (!this.imgs.length) return this;

    if ($w.scrollTop() > this.offset && this.defaultState) {
      this.changeState();
    }
    else if ($w.scrollTop() <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeLogoObserver.prototype.changeState = function () {

    if (this.mainLogo.length) {
      this.mainLogo.removeClass('u-header__logo-img--main');
    }
    if (this.additionalLogo.length) {
      this.additionalLogo.addClass('u-header__logo-img--main');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeLogoObserver.prototype.toDefaultState = function () {

    if (this.mainLogo.length) {
      this.mainLogo.addClass('u-header__logo-img--main');
    }
    if (this.additionalLogo.length) {
      this.additionalLogo.removeClass('u-header__logo-img--main');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TopTenTourHeaderHideSectionObserver(element) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TopTenTourHeaderHideSectionObserver.prototype.init = function () {

    this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
    this.section = this.element.find('.u-header__section--hidden');
    this.defaultState = true;

    this.sectionHeight = this.section.length ? this.section.outerHeight() : 0;


    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHideSectionObserver.prototype.destroy = function () {

    if (this.section.length) {

      this.element.css({
        'margin-top': 0
      });

    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHideSectionObserver.prototype.check = function () {

    if (!this.section.length) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHideSectionObserver.prototype.changeState = function () {

    var self = this;

    this.element.stop().animate({
      'margin-top': self.sectionHeight * -1 - 1 // last '-1' is a small fix
    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHideSectionObserver.prototype.toDefaultState = function () {

    this.element.stop().animate({
      'margin-top': 0
    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TopTenTourHeaderChangeAppearanceObserver(element, config) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.config = {
      fixPointSelf: false
    };

    if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeAppearanceObserver.prototype.init = function () {

    if (this.element.hasClass('js-header-fix-moment')) {
      this.hasFixedClass = true;
      this.element.removeClass('js-header-fix-moment');
    }

    if (this.config.fixPointSelf) {
      this.offset = this.element.offset().top;
    }
    else {
      this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
    }

    if (this.hasFixedClass) {
      this.hasFixedClass = false;
      this.element.addClass('js-header-fix-moment');
    }

    this.sections = this.element.find('[data-header-fix-moment-classes]');

    this.defaultState = true;


    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeAppearanceObserver.prototype.destroy = function () {

    this.toDefaultState();

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeAppearanceObserver.prototype.check = function () {

    if (!this.sections.length) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeAppearanceObserver.prototype.changeState = function () {

    this.sections.each(function (i, el) {

      var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');

      if (!classes && !exclude) return;

      $this.addClass(classes + ' js-header-change-moment');
      $this.removeClass(exclude);

    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderChangeAppearanceObserver.prototype.toDefaultState = function () {

    this.sections.each(function (i, el) {

      var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');

      if (!classes && !exclude) return;

      $this.removeClass(classes + ' js-header-change-moment');
      $this.addClass(exclude);

    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TopTenTourHeaderHasHiddenElement(element, config) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.config = {
      animated: true
    };

    if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHasHiddenElement.prototype.init = function () {
    this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
    this.elements = this.element.find('.u-header--hidden-element');
    this.defaultState = true;
    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHasHiddenElement.prototype.destroy = function () {

    this.toDefaultState();

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHasHiddenElement.prototype.check = function () {

    if (!this.elements.length) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHasHiddenElement.prototype.changeState = function () {

    if (this.config.animated) {
      this.elements.stop().slideUp();
    }
    else {
      this.elements.hide();
    }

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderHasHiddenElement.prototype.toDefaultState = function () {

    if (this.config.animated) {
      this.elements.stop().slideDown();
    }
    else {
      this.elements.show();
    }

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TopTenTourHeaderFloatingObserver(element, config) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;

    this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this.config, config) : {};
    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderFloatingObserver.prototype.init = function () {

    this.offset = this.element.offset().top;
    this.sections = this.element.find('.u-header__section');

    this.defaultState = true;

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderFloatingObserver.prototype.destroy = function () {

    this.toDefaultState();

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderFloatingObserver.prototype.check = function () {

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderFloatingObserver.prototype.changeState = function () {

    this.element
        .addClass('js-header-fix-moment')
        .addClass(this.element.data('header-fix-moment-classes'))
        .removeClass(this.element.data('header-fix-moment-exclude'));

    if (this.sections.length) {
      this.sections.each(function (i, el) {

        var $section = $(el);

        $section.addClass($section.data('header-fix-moment-classes'))
            .removeClass($section.data('header-fix-moment-exclude'));

      });
    }

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  TopTenTourHeaderFloatingObserver.prototype.toDefaultState = function () {

    this.element
        .removeClass('js-header-fix-moment')
        .removeClass(this.element.data('header-fix-moment-classes'))
        .addClass(this.element.data('header-fix-moment-exclude'));

    if (this.sections.length) {
      this.sections.each(function (i, el) {

        var $section = $(el);

        $section.removeClass($section.data('header-fix-moment-classes'))
            .addClass($section.data('header-fix-moment-exclude'));

      });
    }

    this.defaultState = !this.defaultState;
    return this;

  };


  /**
   *
   *
   * @param
   *
   * @return
   */
  function TopTenTourHeaderWithoutBehaviorObserver(element) {
    if (!TopTenTourAbstractObserver.call(this, element)) return;
  }

  TopTenTourHeaderWithoutBehaviorObserver.prototype.check = function () {
    return this;
  };

  TopTenTourHeaderWithoutBehaviorObserver.prototype.init = function () {
    return this;
  };

  TopTenTourHeaderWithoutBehaviorObserver.prototype.destroy = function () {
    return this;
  };

  TopTenTourHeaderWithoutBehaviorObserver.prototype.changeState = function () {
    return this;
  };

  TopTenTourHeaderWithoutBehaviorObserver.prototype.toDefaultState = function () {
    return this;
  }


})(jQuery);
