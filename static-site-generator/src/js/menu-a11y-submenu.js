//event for button
let elements = document.querySelectorAll(".subLi");
let openLists = []
let responsEvent = 'mouseover'
if (isTouchDevice()) {
  responsEvent = 'click'
}
Array.from(elements).forEach(function(element) {
      element.addEventListener(responsEvent, openSubmenu);
    });



    function openSubmenu(em) {
      console.log('klikt');
      let theId = em.id
      console.log(theId);


      if (openLists.includes(theId)) {
        // close
        //     let myIndex = openLists.indexOf(theId);
        //     if (myIndex !== -1) {
        //         openLists.splice(myIndex, 1);
        //     }




      } else {
        // Set open


        //openLists.push(theId)
      }
    }




// function openSubmenu(em) {
//
//   let theId = em.id
//   if (theId === undefined) {
//     theId = this.id
//   }
//   theId = theId.replace('parent_', '')
//
//
//   if (openLists.includes(theId)) {
//
//     //if open
//     document.getElementById('sub_'+theId).style.display = 'none';
//     let myIndex = openLists.indexOf(theId);
//     if (myIndex !== -1) {
//         openLists.splice(myIndex, 1);
//     }
//
//
//   } else {
//     // if closed
//     let elem = document.getElementById('sub_'+theId)
//     elem.style.display = 'block';
//     console.log(elem);
//     elem.addEventListener('mouseout', function() {
//       openSubmenu(theId);
//     });
//     openLists.push(theId)
//   }
// }







function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}
