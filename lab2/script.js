const photos = [
  "https://m.media-amazon.com/images/I/913MMr0R37L.jpg", 
  "https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-1920x1080-5630.jpg",
  "https://wallpaperaccess.com/full/138728.jpg",
  "https://wallpapers.com/images/hd/hd-ocean-dock-50tgnxobumlsqssw.jpg", 
  "https://getwallpapers.com/wallpaper/full/8/a/6/59243.jpg"
];

let index = 0;
const photosLength = photos.length;
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const container = document.querySelector("#container")
const photo1 = document.querySelectorAll('img')[0];
const photo2 = document.querySelectorAll('img')[1];
const photo3 = document.querySelectorAll('img')[2];
const animationTime = 1000
const controls = document.querySelector("#controls")

const initPhotos = () => {
	photos.forEach((photo, idx) => {
  	const img = document.createElement('img')
    img.src=photo;
    img.width=500;
    container.appendChild(img);
    const dot = document.createElement('div')
    dot.classList.add('dot')
    if (idx === 0) {
    	dot.classList.add('active')
    }
    dot.addEventListener('click', () => {
      	container.style.transition = `all ${animationTime}ms ease-in-out`;
        const active = document.querySelector('.active');
        active.classList.remove('active')
        dot.classList.add('active');
				container.style.left = `-${idx*300}px`
        index=idx;
      })
    controls.appendChild(dot)
  })
}

initPhotos();

const handleButtonClick = (isPrev) => {
  index =  index + (isPrev ? -1 : 1)
  if (index <= 0) {
  	index = photosLength - 1
  } else if (index >= photosLength) {
  	index = 0
  }
	container.style.transition = `all ${animationTime}ms ease-in-out`;
	container.style.left = isPrev ? '0px' : `-${index*300}px`; 
  const active = document.querySelector('.active');
  active.classList.remove('active');
  const dots = document.querySelectorAll('.dot');
  dots[index].classList.add('active');
}

setInterval(() => handleButtonClick(false), animationTime*2.5)

prev.addEventListener('click', () => handleButtonClick(true))
next.addEventListener('click', () => handleButtonClick(false))

