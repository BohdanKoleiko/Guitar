
const checkClass = document.querySelector('.swiper');

if (checkClass) {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    autoHeight: true,
    direction: 'horizontal',
    loop: true,
    speed: 700,
    spaceBetween: 25,
  
    // If we need pagination
    pagination: {
      el: '.customers__paginations',
      bulletClass: 'customers__pagination-bullet',
      bulletActiveClass: 'customers__controls-item_active',
      clickable: true,
      type: 'custom',
    },

    // If we need autoplay
    //autoplay: {
    //  delay: 5000,
    //},
    
    // Responsive brackpoints
    breakpoints: {
      // when window width is >= 1024px
      1024: {
        allowTouchMove: false,
      },
    },
  });
}