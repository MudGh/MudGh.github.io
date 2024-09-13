jQuery(document).ready(function($) {

   /*----------------------------------------------------*/
   /* FitText Settings - Adjust headline size responsively
   ------------------------------------------------------ */
   
   // Applies FitText to the element with class 'responsive-headline'
   // Adjusts the font size within the specified min and max range
   setTimeout(function() {
      $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
   }, 100); // Delay added to allow page to load before applying FitText

   /*----------------------------------------------------*/
   /* Smooth Scrolling - Enables smooth scrolling to anchor links
   ------------------------------------------------------ */
   
   $('.smoothscroll').on('click', function(e) {
      e.preventDefault(); // Prevents default anchor behavior

      var target = this.hash,
          $target = $(target);

      // Animates the scroll to the target anchor
      $('html, body').stop().animate({
         'scrollTop': $target.offset().top
      }, 800, 'swing', function() {
         window.location.hash = target; // Updates the URL hash after scroll
      });
   });

   // **Potential Issue**: Nested jQuery(document).ready - This function is already inside a ready event handler.
   // You can remove the inner one to avoid redundant code.

   /*----------------------------------------------------*/
   /* Project Modal Popup - Initializes popup for project images
   ------------------------------------------------------*/
   
   $('.item-wrap a').magnificPopup({
      type: 'inline',
      fixedContentPos: false, // Prevents fixed content on popup
      removalDelay: 200, // Animation delay before removal
      showCloseBtn: false, // Hides close button
      mainClass: 'mfp-fade' // Fade effect for popup
   });

   // Handles closing of the modal popup
   $(document).on('click', '.popup-modal-dismiss', function(e) {
      e.preventDefault(); // Prevents default link behavior
      $.magnificPopup.close(); // Closes the popup
   });

   /*----------------------------------------------------*/
   /* Photo Gallery Popup with Magnific Popup
   ------------------------------------------------------*/
   
      // Initialize magnificPopup for image popups within modals
      $('.image-popup').magnificPopup({
          type: 'image',
          closeOnContentClick: true, // Closes when image is clicked
          mainClass: 'mfp-fade', // Adds fade effect
          gallery: {
              enabled: true, // Enables gallery mode for image navigation
              navigateByImgClick: true, // Navigate images by clicking
              preload: [0, 1] // Preload the first and second images for better performance
          },
          removalDelay: 300, // Delay for the fade effect
          callbacks: {
              beforeOpen: function() {
                  // Ensuring the popup appears above other content
                  this.st.mainClass = 'mfp-fade mfp-zoom-in';
              }
          },
          closeBtnInside: true, // Close button inside the popup
          closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>' // Custom close button
      });
      
      // For modal close action
      $('.popup-modal-dismiss').on('click', function(e) {
          e.preventDefault();
          $.magnificPopup.close();
      });
  
   /*----------------------------------------------------*/
   /* Flexslider - Initializes the slider for displaying content
   ------------------------------------------------------*/
   
   $('.flexslider').flexslider({
      namespace: "flex-", // Namespace added to slider elements
      controlsContainer: ".flex-container", // Specifies the container for controls
      animation: 'slide', // Slide animation type
      controlNav: true, // Display navigation controls
      directionNav: false, // Hide directional arrows
      smoothHeight: true, // Adjust slider height based on the content
      slideshowSpeed: 7000, // Time between slides
      animationSpeed: 600, // Speed of slide transition
      randomize: false // Do not randomize the slide order
   });

   /*----------------------------------------------------*/
   /* Contact Form Submission - Handles form submission via AJAX
   ------------------------------------------------------*/
   
   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn(); // Show loading animation

      // Collect form input values
      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      // Concatenating form data into a query string
      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
                  '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      // AJAX call to send the form data
      $.ajax({
         type: "POST",
         url: "inc/sendEmail.php", // Backend script to handle form submission
         data: data, // Data being sent
         success: function(msg) {
            if (msg == 'OK') {
               $('#image-loader').fadeOut(); // Hide loader
               $('#message-warning').hide(); // Hide any warning messages
               $('#contactForm').fadeOut(); // Hide the form
               $('#message-success').fadeIn(); // Show success message
            } else {
               $('#image-loader').fadeOut(); // Hide loader
               $('#message-warning').html(msg); // Display warning message with server response
               $('#message-warning').fadeIn(); // Show warning message
            }
         }
      });
      return false; // Prevent form submission in the traditional way
   });
});
