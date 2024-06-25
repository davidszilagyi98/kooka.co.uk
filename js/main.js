// dropdown
$(document).ready(function() {
    $('.navbar-nav .nav-link.dropdown-toggle').on('click', function() {
        var $parent = $(this).parent('.dropdown');
        var isOpen = $parent.hasClass('show');

        // Close all dropdowns except the current one
        $('.navbar-nav .dropdown-menu').not($parent.find('.dropdown-menu')).removeClass('show');

        // Toggle the dropdown
        $parent.find('.dropdown-menu').toggleClass('show', !isOpen);
    });
});


    


(function ($) {
    $.fn.countTo = function (options) {
        options = options || {};
        
        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from:            $(this).data('from'),
                to:              $(this).data('to'),
                speed:           $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals:        $(this).data('decimals'),
                format:          $(this).data('format')
            }, options);
            
            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            
            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            
            $self.data('countTo', data);
            
            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            
            // initialize the element with the starting value
            render(value);
            
            function updateTimer() {
                value += increment;
                loopCount++;
                
                render(value);
                
                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }
                
                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    
                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }
            
            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };
    
    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 2000,           // how long it should take to count between the target numbers
        refreshInterval: 200,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        format: '',            // additional formatting string to append
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    // Intersection Observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Delay the start of the counter until 70% of the element is visible
    };
    
    function formatter(value, settings) {
        if (settings.to === 2019) {
            return value.toFixed(settings.decimals);
        }
        if (settings.format === '+') {
            return value.toFixed(settings.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + '+';
        }
        return value.toFixed(settings.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
}(jQuery));

jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
            if (options.to === 2019) {
                return value.toFixed(options.decimals);
            }
            if (options.format === '+') {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + '+';
            }
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });

    // Intersection Observer
    const counterContainer = document.getElementById('counter-container');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start counter animations
                $('.timer').each(count);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(counterContainer);

    // Counter logic (same as before)
    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }
});




//parallex


// review

document.addEventListener("DOMContentLoaded", function() {
    // Define an array of testimonials
    const testimonials = [
      { name: "Excellent company and workmanship", text: "I had chosen Kooka Developments Ltd after doing my research about the company. They carried out a full exterior insulation on my...", stars: 5 },
      { name: "Cavity wall insulation", text: "I approached Kooka Development to check my cavity wall insulation since I experienced wet patches and mould on the walls. A survey was done...", stars: 5 },
      { name: "Cavity wall insulation", text: "I used kooka developments limited via trustatrader for cavity wall insulation. I found them to be thorough and good communicators during the survey..", stars: 5 },
      { name: "Cavity wall insulation", text: "Great work and reasonably priced.", stars: 5 },
      { name: "Loft Insulation", text: "We were looking for new loft insulation and found Kooka on Google. They are a local Company and rang for a quote. It was very reasonable so decided to go ahead with them...", stars: 5 },
      { name: "Cavity wall insulation", text: "Very well done job...", stars: 5 },
      { name: "Cavity Wall Insulation", text: "Great and quick installation...", stars: 5 },
      { name: "Cavity wall insulation", text: "We knew the work would be intrusive and noisy but the actual experience was fine. Courteous and polite at all times very professional. Just be prepared for dust around any internal openings...", stars: 5 },
      { name: "Insulation in attic", text: "Tidy job insulating attic..", stars: 5 },
      { name: "External wall insulation and rendering on semi detached house", text: "I can thoroughly recommend Kooka. They did a fantastic job with the external insulation and render of our house which they did a year ago. The quality of work was excellent...", stars: 5 },
      { name: "Cavity wall insulation", text: "I found Kooka Developments very friendly and affordable, excellent service would highly recommend them", stars: 5 },
      { name: "Excellent", text: "Amazing job done by Kooka, can’t recommend them enough, got the job done super quick, even with the bad weather. The lads were so polite...", stars: 5 },
      { name: "Loft insulation", text: "Fantastic company really helpful I would really recommend them...", stars: 5 },
      { name: "Cavity wall insulation", text: "Excellent company, very helpful, reliable and friendly...", stars: 5 },
      { name: "External insulation and rendering to bungalow.", text: "They communicated very well, carrying out the works in a very professional manner...", stars: 5 },
      { name: "External Wall Insulation", text: "We contracted Kooka to instal external wall insulation on to our semi-detached house. Kooka provided us with timely and comprehensive information...", stars: 5 },
      { name: "Cavity Wall instillation survey", text: "I needed a survey of my cavity walls undertaken quickly due to mortgage issues. Everyone went out of the way to help me get the survey carried out and the report written...", stars: 5 }
    ];

    // Function to generate stars HTML based on the given number of stars
    function generateStarsHTML(stars) {
      let starsHTML = '';
      for (let i = 0; i < stars; i++) {
        starsHTML += '<i class="fa-solid fa-star" style="color: #ffffff;"></i>';
      }
      return starsHTML;
    }

    // Function to change testimonial
    function changeTestimonial() {
      // Get the testimonial box elements
      const testimonialTextElement = document.getElementById("testimonialText");
      const nameTextElement = document.getElementById("nameText");
      const starsContainer = document.getElementById("starsContainer");
      
      // Initialize a random index to display a random testimonial initially
      const initialIndex = Math.floor(Math.random() * testimonials.length);

      // Display initial testimonial
      testimonialTextElement.textContent = testimonials[initialIndex].text;
      nameTextElement.textContent = testimonials[initialIndex].name;
      starsContainer.innerHTML = generateStarsHTML(testimonials[initialIndex].stars);

      // Initialize a counter to keep track of the current testimonial
      let counter = initialIndex;

      // Update testimonial text, name, and stars
      setInterval(function() {
        testimonialTextElement.textContent = testimonials[counter].text;
        nameTextElement.textContent = testimonials[counter].name;
        starsContainer.innerHTML = generateStarsHTML(testimonials[counter].stars);

        // Increment counter and loop back to 0 when it reaches the end
        counter = (counter + 1) % testimonials.length;
      }, 4000); // Change testimonial every 4 seconds
    }

    // Function to close the testimonial box
    function closeTestimonialBox() {
      document.getElementById("testimonialBox").style.display = 'none';
    }

    // Add event listener to the close button
    document.getElementById("closeBtn").addEventListener("click", closeTestimonialBox);

    // Add event listener to show the testimonial box when user scrolls
    window.addEventListener("scroll", function() {
      document.getElementById("testimonialBox").style.display = 'flex';
      // Remove the scroll event listener after it has been triggered once
      window.removeEventListener("scroll", arguments.callee);

      // Call the function to start changing testimonials
      changeTestimonial();
    });
  });


  // main image gallery

   function openUniqueFullScreen(imageSrc) {
      var fullScreenImage = document.querySelector('.unique-full-screen img');
      fullScreenImage.src = imageSrc;
      document.querySelector('.unique-full-screen').classList.add('active');
    }

    function closeUniqueFullScreen() {
      document.querySelector('.unique-full-screen').classList.remove('active');
    }


    // reveal

    ScrollReveal().reveal('.reveal', {
        delay: 0,
            distance: '50px',
            easing: 'ease-in-out',
            origin: 'bottom',
            reset: false, // Ensures the animation occurs only once when the element comes into view
            viewFactor: 0.2 // The element reveals when 20% of it is in view
        });


// gallery page

function filterImages(category) {
    var images = document.getElementsByClassName("gallery-item");

    for (var i = 0; i < images.length; i++) {
        if (images[i].classList.contains(category)) {
            images[i].style.display = "block";
        } else {
            images[i].style.display = "none";
        }
    }
    
    // Update active button
    var buttons = document.querySelectorAll(".gallery-controls button");
    buttons.forEach(button => {
        button.classList.remove("active-btn");
    });

    var activeButton = document.querySelector(`button[onclick="filterImages('${category}')"]`);
    activeButton.classList.add("active-btn");
}

// Initially display the first category (nature)
window.onload = function() {
    filterImages('nature');
}

var modal = document.getElementById("modal");
var modalImg = document.getElementById("modal-img");

function openModal(image) {
    modal.style.display = "block";
    modalImg.src = image.src;
}

function closeModal() {
    modal.style.display = "none";
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("gallery-item")) {
        modal.style.display = "block";
        modalImg.src = event.target.src;
    }
});


// reviews



//  function showView(viewId, btn) {
//     // Hide all views
//     var views = document.getElementsByClassName('view');
//     for (var i = 0; i < views.length; i++) {
//       views[i].style.display = 'none';
//     }

//     // Show the selected view
//     document.getElementById(viewId).style.display = 'block';

//     // Remove active class from all buttons
//     var buttons = document.querySelectorAll('.btn-group .btn');
//     buttons.forEach(function(button) {
//       button.classList.remove('active-btn');
//     });

//     // Add active class to the clicked button
//     btn.classList.add('active-btn');
//   }

//   // Show the first view by default
//   document.addEventListener("DOMContentLoaded", function() {
//     showView('view1', document.querySelector('.btn-group .btn'));
//   });





    document.addEventListener('DOMContentLoaded', function () {
        var servicesDropdown = document.getElementById('servicesDropdown');

        servicesDropdown.addEventListener('click', function (event) {
            if (!servicesDropdown.classList.contains('show')) {
                // Open the dropdown menu
                event.preventDefault();
                new bootstrap.Dropdown(servicesDropdown).toggle();
            } else {
                // Proceed with the default action (navigate to /services.html)
                window.location.href = servicesDropdown.href;
            }
        });
    });

