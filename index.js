window.onload = () => {
  const game = {
    score: 0,
    plusMinusAmt: 0,
    fruitArray: [],
  };

  const generateFruit = (num, src) => {
    const container = document.querySelector(".container");
    for (let i = 0; i < num; i++) {
      const fruit = document.createElement("div");
      fruit.style.backgroundImage = `url(${src})`;
      fruit.classList.add("fruit");
      fruit.setAttribute("draggable", true);
      fruit.width = 80;
      fruit.height = 80;
      fruit.x = Math.random() * (920 - 80) + 80;
      fruit.y = Math.random() * (520 - 10) + 10;
      fruit.style.left = fruit.x + "px";
      fruit.style.top = fruit.y + "px";
      container.appendChild(fruit);

      fruit.addEventListener("dragstart", () => {
        fruit.classList.add("dragging");
        const squish = new Audio();
        squish.src = "audio/Squish.wav";
        squish.play();
      });
      fruit.addEventListener("dragend", (e) => {
        e.preventDefault();
        fruit.classList.remove("dragging");
        if (droppableInBasket) {
          fruit.remove();
          droppableInBasket = false;
        }
      });
    }
  };

  let droppableInBasket = false;
  const plusMinusButtons = document.querySelectorAll(".plus-minus-button");
  const filterButtons = document.querySelectorAll(".filter-button");
  const createButton = document.querySelector(".create-button");

  // user clicks create button
  createButton.addEventListener("click", () => {
    const success = new Audio();
    success.src = "audio/success.wav";
    if (game.fruitArray.length === 0) {
      return;
    } else if (game.fruitArray.length === 1) {
      success.play();
      generateFruit(game.plusMinusAmt, game.fruitArray[0]);
    } else if (game.fruitArray.length === 2) {
      success.play();
      generateFruit(game.plusMinusAmt, game.fruitArray[0]);
      generateFruit(game.plusMinusAmt, game.fruitArray[1]);
    } else if (game.fruitArray.length === 3) {
      success.play();
      generateFruit(game.plusMinusAmt, game.fruitArray[0]);
      generateFruit(game.plusMinusAmt, game.fruitArray[1]);
      generateFruit(game.plusMinusAmt, game.fruitArray[2]);
    }
  });

  // add or subtract amt of fruits
  plusMinusButtons.forEach((button) => {
    const plusMinusAmt = document.querySelector(".plus-minus-amt");
    plusMinusButtons[0].style.backgroundColor = "red";
    plusMinusButtons[1].style.backgroundColor = "green";
    button.addEventListener("click", () => {
      if (button === plusMinusButtons[0] && game.plusMinusAmt > 0) {
        game.plusMinusAmt--;
        plusMinusAmt.innerHTML = game.plusMinusAmt;
      } else if (button === plusMinusButtons[1]) {
        game.plusMinusAmt++;
        plusMinusAmt.innerHTML = game.plusMinusAmt;
      }
    });
  });

  // filter buttons click
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button === filterButtons[0] && !button.classList.contains("active")) {
        game.fruitArray.push("images/apple.png");
        button.style.backgroundColor = "red";
        button.style.color = "white";
        button.style.border = "2px solid black";
        button.classList.add("active");
      } else if (
        button === filterButtons[1] &&
        !button.classList.contains("active")
      ) {
        game.fruitArray.push("images/grape.png");
        button.style.backgroundColor = "purple";
        button.style.color = "white";
        button.style.border = "2px solid black";
        button.classList.add("active");
      } else if (
        button === filterButtons[2] &&
        !button.classList.contains("active")
      ) {
        game.fruitArray.push("images/orange.png");
        button.style.backgroundColor = "orange";
        button.style.color = "white";
        button.style.border = "2px solid black";
        button.classList.add("active");
      } else if (
        button.classList.contains("active") &&
        button === filterButtons[0]
      ) {
        let newArr = game.fruitArray.filter((i) => i !== "images/apple.png");
        game.fruitArray = newArr;
        button.style.backgroundColor = "white";
        button.style.color = "rgb(208, 208, 208)";
        button.style.border = "2px solid rgb(208, 208, 208)";
        button.classList.remove("active");
      } else if (
        button.classList.contains("active") &&
        button === filterButtons[1]
      ) {
        let newArr = game.fruitArray.filter((i) => i !== "images/grape.png");
        game.fruitArray = newArr;
        button.style.backgroundColor = "white";
        button.style.color = "rgb(208, 208, 208)";
        button.style.border = "2px solid rgb(208, 208, 208)";
        button.classList.remove("active");
      } else if (
        button.classList.contains("active") &&
        button === filterButtons[2]
      ) {
        let newArr = game.fruitArray.filter((i) => i !== "images/orange.png");
        game.fruitArray = newArr;
        button.style.backgroundColor = "white";
        button.style.color = "rgb(208, 208, 208)";
        button.style.border = "2px solid rgb(208, 208, 208)";
        button.classList.remove("active");
      }
    });
  });

  const basket = document.querySelector(".basket");
  basket.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  basket.addEventListener("drop", () => {
    const scoreTitle = document.querySelector(".score-title");
    scoreTitle.style.color = "black";
    const scoreAmt = document.querySelector(".score-amt");
    scoreAmt.style.color = "black";
    game.score++;
    scoreAmt.innerHTML = game.score;
    const dropped = new Audio();
    dropped.src = "audio/dropped.wav";
    dropped.volume = 0.6;
    dropped.play();
    basket.animate(basketWobble, basketWobbleTiming);
    droppableInBasket = true;
  });

  const basketWobble = [
    { transform: "translate(0px, 5px)" },
    { transform: "translate(10px, 0px)" },
    { transform: "translate(0px, -5px)" },
    { transform: "translate(-10px, 0px)" },
    { transform: "translate(0px, 5px)" },
  ];

  const basketWobbleTiming = {
    duration: 200,
    iterations: 2,
  };
};
