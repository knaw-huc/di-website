let hamburgerStatus = false;
let breakpoint = '1000px'

function hamburger() {
    if (!hamburgerStatus) {
      showElems()
      document.getElementById('hamburgerImg').setAttribute('src','images/icons/icon-x.svg' )
      hamburgerStatus = true;
    }else {
      hideElems()
      hamburgerStatus = false;
      document.getElementById('hamburgerImg').setAttribute('src', 'images/icons/icon-hamburger.svg');
    }
}


var isSmallscreen = window.matchMedia('(max-width: '+breakpoint+')')
handleResponsive(isSmallscreen) // Call listener function at run time
isSmallscreen.addListener(handleResponsive) // Attach listener function on state changes

function handleResponsive() {
  if (isSmallscreen.matches) {
    // small
    document.getElementById('hamburger').style.display = 'block';
    hideElems();
  } else {
    document.getElementById('hamburger').style.display = 'none';
    showElems()
  }

}



function hideElems() {
  const allHideOnSmall = document.querySelectorAll(".hideOnSmall");
  for (i = 0; i < allHideOnSmall.length; i++) {
      allHideOnSmall[i].style.display = 'none'
  }
}

function showElems() {
  const allHideOnSmall = document.querySelectorAll(".hideOnSmall");
  for (i = 0; i < allHideOnSmall.length; i++) {
      allHideOnSmall[i].style.display = 'block'
  }
}
