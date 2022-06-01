//event for button
let elements = document.querySelectorAll(".subLi");

Array.from(elements).forEach(function(element) {
      element.addEventListener('click', openSubmenu);
      if (!isTouchDevice()) {
        element.addEventListener('mouseover', openSubmenu);
      }

      element.getElementsByTagName('a')[0].removeAttribute("href");
    });



    function openSubmenu(em) {
      hideSubmenus()
      this.removeAttribute("href");
      let theId = this.id.replace('parent_', '')

      visElem = document.getElementById('sub_'+theId);
      visElem.style.display = 'block';
      let baseHeight = document.getElementById('mainNav').getBoundingClientRect().top;
      let b_height = this.getBoundingClientRect();
      console.log(b_height.top);
      visElem.style.top = (b_height.top-baseHeight)+'px';
      visElem.addEventListener('mouseout', function() {
            visElem.style.display = 'none';
      });
      this.addEventListener('mouseout', function() {
            visElem.style.display = 'none';
      });
    }





function hideSubmenus() {
  let elements = document.querySelectorAll(".subnav");

  elements.forEach(function(element) {
    element.style.display = 'none';
      });
}



function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}
