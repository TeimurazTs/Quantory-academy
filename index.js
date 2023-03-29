const dvdLogo = document.querySelector('.dvd-logo');
let xDirection = 1;
let yDirection = 1;

let audioForX = new Audio('assets/laser.mp3');
let audioForY = new Audio('assets/laser.mp3');

let rect;

let hue = 50;

function getCoordinates() {
  rect = dvdLogo.getBoundingClientRect();
}

function moveDVDLogo() {
  getCoordinates()
  const maxX = window.innerWidth - rect.width - 2;
  const maxY = window.innerHeight - rect.height - 2;

  dvdLogo.style.transform = `translateX(${rect.x + xDirection * 5}px) translateY(${rect.y + yDirection * 5}px)`;

  getCoordinates()

  if (rect.x <= 0 || rect.x >= maxX) {
    audioForX.play()
    dvdLogo.style.filter = `hue-rotate(${hue}deg)`
    hue *= 2
    xDirection *= -1;
    dvdLogo.style.animationPlayState = 'paused';
    setTimeout(() => dvdLogo.style.animationPlayState = 'running', 100);
  }

  if (rect.y <= 0 || rect.y >= maxY) {
    audioForY.play()
    dvdLogo.style.filter = `hue-rotate(${hue}deg)`
    hue *= 2;
    yDirection *= -1;
    dvdLogo.style.animationPlayState = 'paused';
    setTimeout(() => dvdLogo.style.animationPlayState = 'running', 100);
  }

  requestAnimationFrame(moveDVDLogo);
}

requestAnimationFrame(moveDVDLogo); 
