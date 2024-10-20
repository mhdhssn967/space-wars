
const start=document.getElementById('start')
const end=document.getElementById('end')
end.style.display='none'
function startGame(){
    start.style.display='none'
    const spaceship=document.getElementById('spaceship')
    const bullet=document.getElementById('bullet')

let newPosX=0;

document.addEventListener('mousemove',(event)=>{
    let mouseX=event.clientX
    console.log(`MouseX${mouseX}`);
    
    let screenWidth=window.innerWidth
    let spaceshipWidth=spaceship.offsetWidth
    newPosX=mouseX-(spaceshipWidth/2)
    if(newPosX<0){
        newPosX=0
    }
    if (newPosX + spaceshipWidth > screenWidth) newPosX = screenWidth - spaceshipWidth;
    spaceship.style.left = `${newPosX}px`;
})

let isShooting = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (bullet.style.bottom <= '10px') {
            shootBullet();
        }
    }
});

function shootBullet() {
    bullet.style.opacity = 1;
    bullet.style.bottom = `10px`;
    bullet.style.left = `${newPosX}px`;

    if (!isShooting) {
        isShooting = true;

        let moveBullet = setInterval(() => {
            let currentBottom = parseInt(bullet.style.bottom);
            bullet.style.bottom = `${currentBottom + 10}px`;

            aliens.forEach((alien) => {
                if (isCollision(bullet, alien)) {
                    clearInterval(moveBullet);
                    handleHit(alien);
                    bullet.style.bottom = `10px`;
                bullet.style.opacity = 0;
                isShooting = false;
                }
            });

            if (currentBottom > window.innerHeight) {
                clearInterval(moveBullet);
                bullet.style.bottom = `10px`;
                bullet.style.opacity = 0;
                isShooting = false;
            }
        }, 10);
    }
}

// Function to check for collision
function isCollision(bullet, alien) {
    const bulletRect = bullet.getBoundingClientRect();
    const alienRect = alien.getBoundingClientRect();
   

    return !(
        bulletRect.top > alienRect.bottom ||
        bulletRect.bottom < alienRect.top ||
        bulletRect.right < alienRect.left ||
        bulletRect.left > alienRect.right
    );
}

function handleHit(alien) {
    var deadAlien=true
    scoreAdd()

    alien.src = './Assets/burst.gif';
    alien.style.opacity = 1;

    setTimeout(() => {
        alien.style.opacity = 0;
        alien.style.display = 'none';

        setTimeout(() => {
            alien.style.opacity = 1;
            if(alien.id=='enemy1'){
            alien.src = './Assets/enemy1.png';
            }
            if(alien.id=='enemy2'){
            alien.src = './Assets/enemy2.png';
            } 
            if(alien.id=='enemy3'){
            alien.src = './Assets/enemy3.png';
            }
            if(alien.id=='enemy4'){
            alien.src = './Assets/enemy4.png';
            } 
            resetAlienPosition(alien); 
            alien.style.display = 'block';
            deadAlien=true 
        }, 100); 
    }, 1000);
}


function resetAlienPosition(alien) {
    let screenWidth = window.innerWidth;
    let randomX = Math.random() * (screenWidth - alien.offsetWidth);
    alien.style.left = `${randomX}px`;
    alien.style.top = `${Math.random() * (window.innerHeight - alien.offsetHeight-300)}px`;
}


const aliens = document.querySelectorAll('.alien');
const screenWidth = window.innerWidth;
let alienSpeeds = [];

function initAliens() {
    aliens.forEach((alien, index) => {
         
        alien.style.top = `${Math.random() * (window.innerHeight - alien.offsetHeight-300)}px`; 
        
        alienSpeeds[index] = 2 + Math.random() * 3; 
        alien.setAttribute('data-direction', 'right'); 
    });

    moveAliens();
}

function moveAliens() {
    aliens.forEach((alien, index) => {
        
        let currentLeft = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        let direction = alien.getAttribute('data-direction');
        let alienSpeed = alienSpeeds[index];

        if (direction === 'right') {
            if (currentLeft + alien.offsetWidth >= screenWidth) {
                alien.setAttribute('data-direction', 'left');
            } else {
                alien.style.left = `${currentLeft + alienSpeed}px`; 
            }
        }
        else if (direction === 'left') {
            if (currentLeft <= 0) {
                alien.setAttribute('data-direction', 'right');
            } else {
                alien.style.left = `${currentLeft - alienSpeed}px`; 
            }
        }
    });

    requestAnimationFrame(moveAliens);
}
let bulletMove1, bulletMove2, bulletMove3, bulletMove4; 


function enemy1Shoot() {
    const x1 = document.getElementById('x1');
    const org1='./Assets/x1.gif'
    x1.src=org1
    const enemy1 = document.getElementById('enemy1');
    const enemy1Rect = enemy1.getBoundingClientRect();
    const enemy1X = enemy1Rect.left;
    const enemy1Y = enemy1Rect.top;

    x1.style.position = 'absolute';
    x1.style.left = `${enemy1X + 50}px`;
    x1.style.top = `${enemy1Y + 100}px`;
    x1.style.opacity = 1;

   
    clearInterval(bulletMove1);
    moveX1Down();
}

function moveX1Down() {
    const x1 = document.getElementById('x1');
    let currentTop = parseInt(x1.style.top);
    bulletMove1 = setInterval(() => {
        currentTop += 8;
        x1.style.top = `${currentTop}px`;
        if (currentTop > window.innerHeight) {
            clearInterval(bulletMove1);
        }
    }, 15);
}

// shoot enemy2
function enemy2Shoot() {
    const x2 = document.getElementById('x2');
    const org2='./Assets/x2.gif'
    x2.src=org2
    const enemy2 = document.getElementById('enemy2');
    const enemy2Rect = enemy2.getBoundingClientRect();
    const enemy2X = enemy2Rect.left;
    const enemy2Y = enemy2Rect.top;

    x2.style.position = 'absolute';
    x2.style.left = `${enemy2X + 50}px`;
    x2.style.top = `${enemy2Y + 100}px`;
    x2.style.opacity = 1;

    clearInterval(bulletMove2); 
    moveX2Down();
}

function moveX2Down() {
    const x2 = document.getElementById('x2');
    let currentTop = parseInt(x2.style.top);
    bulletMove2 = setInterval(() => {
        currentTop += 8;
        x2.style.top = `${currentTop}px`;
        if (currentTop > window.innerHeight) {
            clearInterval(bulletMove2);
        }
    }, 15);
}

// shoot enemy3
function enemy3Shoot() {
    const x3 = document.getElementById('x3');
    const org3='./Assets/x3.gif'
    x3.src=org3
    const enemy3 = document.getElementById('enemy3');
    const enemy3Rect = enemy3.getBoundingClientRect();
    const enemy3X = enemy3Rect.left;
    const enemy3Y = enemy3Rect.top;

    x3.style.position = 'absolute';
    x3.style.left = `${enemy3X + 50}px`;
    x3.style.top = `${enemy3Y + 100}px`;
    x3.style.opacity = 1;

    clearInterval(bulletMove3); 
    moveX3Down();
}

function moveX3Down() {
    const x3 = document.getElementById('x3');
    let currentTop = parseInt(x3.style.top);
    bulletMove3 = setInterval(() => {
        currentTop += 8;
        x3.style.top = `${currentTop}px`;
        if (currentTop > window.innerHeight) {
            clearInterval(bulletMove3);
        }
    }, 15);
}

// shoot enemy4
function enemy4Shoot() {
    const x4 = document.getElementById('x4');
    const org4='./Assets/x4.gif'
    x4.src=org4
    const enemy4 = document.getElementById('enemy4');
    const enemy4Rect = enemy4.getBoundingClientRect();
    const enemy4X = enemy4Rect.left;
    const enemy4Y = enemy4Rect.top;

    x4.style.position = 'absolute';
    x4.style.left = `${enemy4X + 50}px`;
    x4.style.top = `${enemy4Y + 100}px`;
    x4.style.opacity = 1;

    clearInterval(bulletMove4);
    moveX4Down();
}

function moveX4Down() {
    const x4 = document.getElementById('x4');
    let currentTop = parseInt(x4.style.top);
    bulletMove4 = setInterval(() => {
        currentTop += 8;
        x4.style.top = `${currentTop}px`;
        if (currentTop > window.innerHeight) {
            clearInterval(bulletMove4);
        }
    }, 15);
}




setInterval(enemy1Shoot, 2000);
setInterval(enemy2Shoot, 2000);
setInterval(enemy3Shoot, 2000);
setInterval(enemy4Shoot, 2000);




const bullets = [x1, x2, x3, x4];
var health=500
function checkCollisions() {
    const healthbar=document.getElementById('healthbar')
    healthbar.style.width=(`${health}px`)
    bullets.forEach(bullet => {
        if (isCollision(bullet, spaceship)) {
            console.log('Hit detected!');
            health-=5
            console.log(health);
            handleCollision(bullet);
        }
        if(health<0){
            endGame(score)
        }
    });
}

function handleCollision(bullet) {
    bullet.style.zIndex=1
    const originalImageSrc = bullet.src; 
    const explosionGif = './Assets/YQDj.gif'; 


    bullet.src = explosionGif;

    setTimeout(() => {
        bullet.src = originalImageSrc; 
        resetSpaceshipPosition();
        bullet.display='none' 
    }, 100);

}

setInterval(checkCollisions, 50);  
initAliens();
const score=document.getElementById('score')
scoreValue=0
function scoreAdd(){
    score.innerHTML=scoreValue+=1
}

function endGame() {

    const endGameGif = './Assets/burst.gif'; 
    spaceship.src = endGameGif;
        spaceship.style.width='300px'
    setTimeout(() => {
        spaceship.style.display='none'
        gameOver()
    }, 1000);
}
function gameOver(){
    end.style.display='flex'
    const endScore=document.getElementById('endScore')
    endScore.innerHTML=scoreValue
}

}
