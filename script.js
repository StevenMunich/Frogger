const game = document.getElementById('game');
        const frog = document.getElementById('frog');
        const gameWidth = game.clientWidth;
        const gameHeight = game.clientHeight;
        const frogSize = 40;
        let frogX = gameWidth / 2 - frogSize / 2;
        let frogY = gameHeight - frogSize;

        frog.style.left = `${frogX}px`;
        frog.style.top = `${frogY}px`;

       function checkPhone(){
         //phone buttons
        let leftButton = document.getElementById('leftButton');
        leftButton.style.left = `${frogX - 50}px`;
        leftButton.style.top = `${frogY}px`;
        leftButton.addEventListener('click', () => {
            if (frogX > 0) 
            frogX -= frogSize;
            frog.style.left = `${frogX}px`;
            checkCollision();
        });

        let RightButton = document.getElementById('rightButton');
        RightButton.style.left = `${frogX + 50}px`;
        RightButton.style.top = `${frogY}px`;
        RightButton.addEventListener('click', () => {
            if (frogX < gameWidth - frogSize) 
            frogX += frogSize;
            frog.style.left = `${frogX}px`;
            checkCollision();
        });
       let upButton = document.getElementById('upButton');   
       upButton.style.left = `${frogX}px`;
       upButton.style.top = `${frogY - 50}px`;
       upButton.addEventListener('click', () => {
                if (frogY > 0) 
                frogY -= frogSize;
                frog.style.left = `${frogX}px`;
                frog.style.top = `${frogY}px`;
                checkCollision();
          });
            
       downButton.style.left = `${frogX}px`;
       downButton.style.top = `${frogY + 20}px`;
         downButton.addEventListener('click', () => {
                if (frogY < gameHeight - frogSize) 
                frogY += frogSize;
                frog.style.left = `${frogX}px`;
                frog.style.top = `${frogY}px`;
                checkCollision();
          });
       }
      

        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (frogY > 0) frogY -= frogSize;
                    break;
                case 'ArrowDown':
                    if (frogY < gameHeight - frogSize) frogY += frogSize;
                    break;
                case 'ArrowLeft':
                    if (frogX > 0) frogX -= frogSize;
                    break;
                case 'ArrowRight':
                    if (frogX < gameWidth - frogSize) frogX += frogSize;
                    break;
            }
            frog.style.left = `${frogX}px`;
            frog.style.top = `${frogY}px`;
            checkCollision();
        });

        let cars = [];
        function createCar(y) {
            const car = document.createElement('div');
            car.appendChild(document.createElement('img'));
            car.firstChild.src = 'car.png';    
            car.firstChild.style.width = '100%'; 
            car.firstChild.style.height = '100%'; 
            car.classList.add('car');
            car.style.top = `${y}px`;
            car.style.left = `-${frogSize}px`;
            game.appendChild(car);
            moveCar(car);
            
            cars.push(car);//add to array

            car.addEventListener('animationend', () => { 
                car.remove();
                cars = cars.filter(c => c !== car);
            });
        }

        function moveCar(car) {
            let carX = -frogSize;
            const carSpeed = Math.random() * 2 + 1;
            function move() {
                carX += carSpeed;
                if (carX > gameWidth) {
                    car.remove();
                } else {
                    car.style.left = `${carX}px`;
                    requestAnimationFrame(move);
                }
                checkCollision();
            }
            move();
        }

        function checkCollision() {
            const frogRect = frog.getBoundingClientRect();
            cars.forEach(car => {
                const carRect = car.getBoundingClientRect();
                if (
                    frogRect.left < carRect.right &&
                    frogRect.right > carRect.left &&
                    frogRect.top < carRect.bottom &&
                    frogRect.bottom > carRect.top
                ) {
                    alert('You got ran over! Game Over.');
                    resetGame();
                }
            });
        }

        function resetGame() {
            frogX = gameWidth / 2 - frogSize / 2;
            frogY = gameHeight - frogSize;
            frog.style.left = `${frogX}px`;
            frog.style.top = `${frogY}px`;
            cars.forEach(car => car.remove());
            cars = [];
        }
        function checkWin() {
            if (frogY <= 200){
                alert('You made it Fren! You win!');
                resetGame();
            }
        }
        function startGame() {
            
            setInterval(() => {
                const carY = Math.floor(Math.random() * (gameHeight / frogSize)) * frogSize;
                createCar(carY);
                checkWin();                
            }, 1000);
        }
        checkPhone();
        startGame();