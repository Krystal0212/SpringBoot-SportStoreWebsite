const images = [
  "/images/banner_slider_1.png",
  "/images/banner_slider_2.png",
  "/images/banner_slider_3.png",
  "/images/banner_slider_4.png",
  "/images/banner_slider_5.png",
  "/images/banner_slider_6.png",
  "/images/banner_slider_7.png",
  "/images/banner_slider_8.png"
];

const upper_texts = [
  "Your Journey to Greatness",
  "We Have Your Best",
  "Radiate Beauty",
  "The Best Prime Outfits",
  "Empowering Dreams",
  "Diversity Of Fitness Product",
  "Elevate Your Game",
  "Be With You"
];

const lower_texts = [
  "Begins Here",
  "Sports Selling Products",
  "Ignite Your Fitness Journey",
  "For Your Choice",
  "Achieving Goals Together",
  "Take A Look",
  "With Our Gear",
  "From The Beginning"
];

let currentIndex = 0;

function showBanner() {
  const bannerImage = document.getElementById("banner-image");
  const bannerText1 = document.getElementById("banner-text1");
  const bannerText2 = document.getElementById("banner-text2");

  console.log("Changing banner");

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    bannerImage.src = images[currentIndex];

    setTimeout(() => {
      // Split and display upper_texts preserving spaces
      const upperText = upper_texts[currentIndex].toUpperCase(); // Convert to uppercase
      bannerText1.innerHTML = upperText
        .split('') // Split into individual characters
        .map(char => {
          if (char === ' ') {
            return '<span>&nbsp;</span>'; // Preserve space with non-breaking space
          } else {
            return `<span>${char}</span>`;
          }
        })
        .join('');
    }, 1000);
    setTimeout(() => {
      // Split and display lower_texts preserving spaces
      const lowerText = lower_texts[currentIndex].toUpperCase(); // Convert to uppercase
      bannerText2.innerHTML = lowerText
        .split('') // Split into individual characters
        .map(char => {
          if (char === ' ') {
            return '<span>&nbsp;</span>'; // Preserve space with non-breaking space
          } else {
            return `<span>${char}</span>`;
          }
        })
        .join('');
    }, 1500);

    bannerText1.style.animation = 'slide-in 1.5s normal';
    bannerText2.style.animation = 'slide-in 1s normal';

    // Set user-select to none to make text unselectable
    bannerText1.style.userSelect = 'none';
    bannerText2.style.userSelect = 'none';

    setTimeout(() => {
      console.log("Next slide after 5 seconds");
      showBanner();
    }, 5000);
  }, 0);
}

showBanner(); // Start the animation
