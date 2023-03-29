let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.getElementById('navbar-container-pcfta').classList.remove('visually-hidden');
  } else {
    document.getElementById('navbar-container-pcfta').classList.add('visually-hidden');
  }
  prevScrollPos = currentScrollPos;
}
