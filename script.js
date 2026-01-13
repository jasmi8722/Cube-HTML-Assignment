document.addEventListener("DOMContentLoaded", () => {

  // NAVBAR HAMBURGER MENU (EXISTING CODE)
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = hamburger.querySelector("i");

    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  // PERFUME SECTION GALLERY FUNCTIONALITY
  const mainImage = document.querySelector(".main-image img");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".nav-btn.prev");
  const nextBtn = document.querySelector(".nav-btn.next");
  const thumbnails = document.querySelectorAll(".thumbnail-row img");
  const singleSubCard = document.getElementById("single-sub-card");
  const doubleSubCard = document.getElementById("double-sub-card");
  const addToCartBtn = document.getElementById("add-to-cart-btn");

  // Main bottle images for each fragrance
  const mainBottleImages = {
    original: "assets/original-main-img.png",
    lily: "assets/lily-main-img.png",
    rose: "assets/rose-main-img.png"
  };

  let currentImageIndex = -1; // -1 means showing the main bottle image
  let currentFragrance = "original";
  const totalImages = thumbnails.length + 1; // +1 for the main image

  // Update main image and dots based on current index
  function updateGalleryDisplay() {
    if (currentImageIndex === -1 || currentImageIndex === 8) {
      // Show main bottle image for current fragrance
      mainImage.src = mainBottleImages[currentFragrance];
    } else if (currentImageIndex >= 0 && currentImageIndex < thumbnails.length) {
      // Show thumbnail
      mainImage.src = thumbnails[currentImageIndex].src;
    }
    
    // Update which dot is active (dots follow the thumbnail index, -1 maps to 0 for visual purposes)
    const dotIndex = currentImageIndex === -1 || currentImageIndex === 8 ? 0 : currentImageIndex;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === dotIndex);
    });
  }

  // Previous button - go to previous thumbnail in loop
  prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    if (currentImageIndex === totalImages - 1) {
      currentImageIndex = -1;
    }
    updateGalleryDisplay();
  });

  // Next button - go to next thumbnail in loop
  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    if (currentImageIndex === totalImages - 1) {
      currentImageIndex = -1;
    }
    updateGalleryDisplay();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentImageIndex = index;
      updateGalleryDisplay();
    });
  });

  // Thumbnail navigation - clicking a thumbnail shows it in main image
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentImageIndex = index;
      updateGalleryDisplay();
    });
  });

  // SUBSCRIPTION CARD TOGGLE
  const purchaseTypeRadios = document.querySelectorAll('input[name="purchase_type"]');

  purchaseTypeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "single") {
        singleSubCard.classList.add("active");
        doubleSubCard.classList.remove("active");
      } else if (e.target.value === "double") {
        doubleSubCard.classList.add("active");
        singleSubCard.classList.remove("active");
      }
      updateAddToCartLink();
    });
  });

  // FRAGRANCE SELECTION & IMAGE UPDATE
  const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');

  fragranceRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      currentFragrance = e.target.value;
      currentImageIndex = -1; 
      updateGalleryDisplay(); 
      updateAddToCartLink();
    });
  });

  
  // DYNAMIC ADD TO CART LINK

  // Different cart URLs based on selections
  const cartLinks = {
    single: {
      original: "https://shop.example.com/cart/single-original",
      lily: "https://shop.example.com/cart/single-lily",
      rose: "https://shop.example.com/cart/single-rose"
    },
    double: {
      original: "https://shop.example.com/cart/double-original",
      lily: "https://shop.example.com/cart/double-lily",
      rose: "https://shop.example.com/cart/double-rose"
    }
  };

  function updateAddToCartLink() {
    // Get selected purchase type
    const selectedPurchaseType = document.querySelector('input[name="purchase_type"]:checked')?.value || "single";
    
    // Get selected fragrance
    const selectedFragrance = document.querySelector('input[name="fragrance"]:checked')?.value || "original";
    
    // Get the corresponding link
    const cartLink = cartLinks[selectedPurchaseType]?.[selectedFragrance] || "https://shop.example.com/cart";
    
    // Update the button href or data attribute
    addToCartBtn.href = cartLink;
    addToCartBtn.setAttribute("data-cart-link", cartLink);
  }

  // Handle add to cart button click
  addToCartBtn.addEventListener("click", (e) => {
    const cartLink = addToCartBtn.getAttribute("data-cart-link") || "https://shop.example.com/cart";
    console.log("Adding to cart with link:", cartLink);
    // Show visual feedback
    const originalText = addToCartBtn.textContent;
    addToCartBtn.textContent = "Added to Cart!";
    setTimeout(() => {
      addToCartBtn.textContent = originalText;
    }, 2000);
    // Navigate to the cart link
    window.location.href = cartLink;
  });

  // Initialize the add to cart link
  updateAddToCartLink();

 
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const currentItem = header.parentElement;
    const isActive = currentItem.classList.contains('active');

    // Close all items
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');

      const icon = item.querySelector('.icon i');
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    });

    // Toggle current item
    if (!isActive) {
      currentItem.classList.add('active');

      const currentIcon = header.querySelector('.icon i');
      currentIcon.classList.remove('fa-plus');
      currentIcon.classList.add('fa-minus');
    }
  });
});

const counters = document.querySelectorAll('.counter');
  const speed = 50; 

  const startCount = (entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const animate = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('%', '');
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment) + '%';
          setTimeout(animate, 20);
        } else {
          counter.innerText = target + '%';
        }
      };
      animate();
      observer.unobserve(counter);
    }
  };

  const observerOptions = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(startCount);
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

});

