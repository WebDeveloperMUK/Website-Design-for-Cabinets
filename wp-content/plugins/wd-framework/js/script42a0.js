(function( $ ) {
  'use strict';

  /****************************** add listing multi select filters ********************************/
  document.addEventListener('DOMContentLoaded', function() {
    const pathArray = window.location.pathname.split('/');
    if (pathArray[pathArray.length - 2] === 'add-listing' && document.querySelector('.add-listing-form__select__multiple')) {
      $('.add-listing-form__select__multiple').select2({
        tags: true,
        placeholder: 'Select an option',
        allowClear: true,
        width: '100%'
      });
    }
  });

  /******************************* product slide gallery && timer observer *****************************************/
  
  const target = document.querySelector('#advancedFiltersContent')
  const swipe = () => {
    const swiper = new Swiper('.cardsSwiper', {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
  if(typeof Swiper !== 'undefined') {
    swipe()
    const SwipObserver = new MutationObserver( function() {
      swipe()
    });
  }

  if ( target )
    SwipObserver.observe( target, {
      childList:     true,
      // attributes:    true,
      // characterData: true
    });
  
  const timerObserver = new MutationObserver(function() {
    $( ".auction-time-countdown" ).each(function( index ) {
      var time 	= $(this).data('time');
      var format 	= $(this).data('format');
      var compact = false;

      if(format == ''){
        format = 'yowdHMS';
      }
      if(data.compact_counter == 'yes'){
        compact	 = true;
      } else{
        compact	 = false;
      }
      var etext ='';
      if($(this).hasClass('future') ){
        var etext = '<div class="started">'+data.started+'</div>';
      } else{
        var etext = '<div class="over">'+data.checking+'</div>';
      }

      if ( ! $(' body' ).hasClass('logged-in') ) {
        time = $.SAcountdown.UTCDate(-(new Date().getTimezoneOffset()),new Date(time*1000));
      }

      $(this).SAcountdown({
        until: time,
        format: format,
        compact:  compact,

        onExpiry: closeAuction,
        expiryText: etext
      });
    });
  });
  if ( target ) timerObserver.observe( target, { childList: true } );

})( jQuery );
  /******************************* details element starts here *****************************************/

class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector('summary');
    // Store the <div class="content"> element
    this.content = el.querySelector('.content');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;
    
    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 200,
      easing: 'ease-out'
    });
    
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 200,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});
  /******************************* details element ends here *****************************************/