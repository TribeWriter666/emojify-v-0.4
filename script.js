document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("#emoji-input");
  const animateButton = document.querySelector("#animate-button");
  const addButton = document.querySelector("#add-button");
  const screenshotButton = document.querySelector("#screenshot-button");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const slowDownButton = document.querySelector("#slow-down-button");
  const speedUpButton = document.querySelector("#speed-up-button");
  const darkModeToggle = document.querySelector("#dark-mode-toggle");
  const recordButton = document.querySelector("#record-button");
  const removeLastButton = document.querySelector("#remove-last-button");
  const changeDirectionButton = document.querySelector("#change-direction-button");
  const changeDirectionButtonAll = document.querySelector("#change-direction-button-all");
  const emojiListButton = document.querySelector("#emoji-list-button");
  const emojiList1 = document.querySelector(".emoji-list");
  const increaseSizeButton = document.querySelector("#increase-size-all-button");
  const decreaseSizeButton = document.querySelector("#decrease-size-all-button");
  const randomCheckbox = document.querySelector("#random-checkbox");
  const backgroundColorButton = document.querySelector("#background-color-button");
  const buttonContainer = document.querySelector(".button-container");
  const resetButton = document.querySelector("#reset-button");
  // ------------------------testing area-----------------------------------------------START
  const undoButton = document.querySelector("#undo-button");
  // const increaseLastButton = document.querySelector("#increase-size-last-button");
  // const decreaseLastButton = document.querySelector("#decrease-size-last-button");
  let previousEmojiArray = [];
  // ------------------------testing area-----------------------------------------------END

  let speed = 2;
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let dx = 2;
  let dy = 2;
  let emojiArray = [];
  let recording = false;
  let mediaRecorder;
  let fontSize = ["33px Arial",];
  let emojiList = [0];
  let isMouseDown = false;
  let isAnimating = false;

  // creates a list of emojis to pick from & auto populates the input-containe
  const generateEmojiList = () => {
    const emojiTable = document.createElement("table");

    emojiList = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿", "👹", "👺", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👐", "🙌", "👏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤙", "💪", "🖕", "✍️", "🙏", "🤳", "💔", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "🎂", "🍰", "🍔", "🍟", "🍕", "🍗", "🍖", "🍻", "🍺", "🍸", "🍹", "🍷", "🍴", "🍦", "🍧", "🎉", "🎊", "🎁", "🎀", "🎄", "🎁", "⛄️", "❄️", "⚡️", "🔥", "🌪️", "💦", "🌊", "🌈", "🌤️", "⛅️", "🌑", "🌝", "🌚", "🌛", "🌜", "🌞", "⭐️", "🌟", "💫", "✨", "⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🎱", "🏓", "🥊", "🚴‍♀️", "🚴‍♂️", "🏊‍♀️", "🏊‍♂️", "🤸‍♀️", "🤸‍♂️", "⛹️‍♀️", "⛹️‍♂️", "🏋️‍♀️", "🏋️‍♂️", "🚣‍♀️", "🚣‍♂️", "🏇", "🏂", "🎿", "🏂", "💍", "💄", "💋", "👄", "👅", "👂", "👃", "👣", "👀", "🗣️", "👤", "👥", "👶", "👦", "👧", "👨", "👩", "👱‍♀️", "👱", "👴", "👵", "👲", "👳‍♀️", "👳", "👮‍♀️", "👮", "👷‍♀️", "👷", "💂‍♀️", "💂", "🕵️‍♀️", "🕵️", "👩‍⚕️", "👨‍⚕️", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎨", "👨‍🎨", "👩‍🏭", "👨‍🏭", "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎤", "👨‍🎤", "👩‍🎨", "👨‍🎨", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼", "👨‍💼", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚀", "👨‍🚀", "👩‍⚖️", "👨‍⚖️", "👰", "🤵", "👸", "🤴", "🦸‍♀️", "🦸‍♂️", "🧙‍♀️", "🧙‍♂️", "🧝‍♀️", "🧝‍♂️", "🧛‍♀️", "🧛‍♂️", "🧟‍♀️", "🧟‍♂️", "🧞‍♀️", "🧞‍♂️", "🧜‍♀️", "🧜‍♂️", "🧚‍♀️", "🧚‍♂️", "👼", "🎅", "🤶", "⛄️", "🎁", "🎉", "🎂", "🎈", "🎊", "🎌", "🏮", "✨", "💫", "💥", "🎥", "🎬", "📹", "📼", "🔍", "🔎", "💡", "🔌", "🔋", "💊", "💉", "🛁", "🚿", "🏥", "🏨", "🔦", "🎆", "📔", "📕", "📖", "📗", "📘", "📙", "📚", "🛏️", "🛋️", "🚪", "🚽", "📓", "📒", "📃", "📜", "📄", "📰", "🗞️", "📑", "🔖", "🏷️", "💰", "💴", "💵", "💶", "💷", "💸", "💳", "🧾", "✉️", "📧", "📨", "📩", "📤", "📥", "📦", "📫", "📪", "📬", "📭", "🤬", "🗯️", "💭", "💤", "🕳️", "💣", "💬", "👁️‍🗨️", "🤍", "🙉", "🙈", "🙊", "🥺", "🤯", "💨", "💌", "🦻", "👂", "🐵", "🐒", "🦍", "🦧", "🐶", "🐕", "🐘", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿", "🦔", "🦇", "🐻", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊", "🦅", "🦆", "🦢", "🦉", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🐞", "🦗", "🕷", "🕸", "🦂", "🦟", "🦠", "💐", "🌸", "💮", "🏵", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘", "🍀", "🍁", "🍂", "🍃", "🐕", "🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "👩‍🦰", "👩‍🦳", "👵", "👧", "👨‍🦰", "👨‍🦳", "👴", "👦", "👨", "👧", "👩", "☢️", "☣", "🔞", "🚭", "♀️", "♂️", "⚧️", "♻️", "💲", "❌", "✔️", "⛔", "⚠️", "🏴‍☠️", "🏳️", "🏴", "🏁", "🚩", "🩸", "🚬", "⚰️", "🧻", "🛒", "💊", "🔑", "🔒", "🔐", "🔓", "⚙️", "👓", "🥽", "🧦", "💎", "👑", "🎵", "📌", "🕯️", "🔨", "🪓", "⛏️", "✂️", "🔫", "🧲", "🚪", "🧹", "🔧", "🏹", "🧫", "🧪", "📈", "📉", "⚖️", "🔗", "⛓️", "🗡️", "⚔️", "⚒️", "🧼", "🎵", "👢", "🩰", "🎧", "📻", "👠", "☎️", "📞", "💾", "📲", "📱", "📷", "🩺", "❓", "❔", "❕", "❗", "〰️", "⭕", "〽️", "🔮", "🧶", "🧵", "🎨", "🧸", "🧩", "🎲", "🎰", "🎣", "♟️", "♠️", "♦️", "🎮", "🪁", "⛸️", "🪀", "🎯", "🥎", "🧧", "🤿", "🎳", "🃏", "🎴", "🥏", "🎟️", "🧨", "🎗️", "🌡️", "☄️", "💧", "☔", "☂️", "🌂", "⛈️", "🌦️", "🌩️", "🌫️", "🌀", "🌨️", "🌧️", "☁️", "🌌", "🌠", "🌟", "🪐", "🌗", "🕣", "🚀", "🛸", "🛎️", "⏰", "⌚", "⏳", "🛰️", "🪂", "🚁", "🛬", "🛩️", "✈️", "🚢", "🛥️", "🚤", "🛶", "🛀🏽", "⚓", "🚧", "🛴", "🛹", "⛽", "🚲", "🚑", "🏍️", "🦽", "🦼", "🏎️", "🚜", "🚔", "🚂", "🎪", "🌏", "🌎", "🌍", "🏝️", "🗽", "🍇", "🔪", "🥄", "🧊", "🧃", "🦐", "🦑", "🦞", "🦀", "🍪", "🍣", "🍜", "🍄", "🧄", "🧅", "🍓", "🍒", "🥝", "🌶️", "🌽", "🍌", "🍍", "🍆", "🧂", "🌮", "🌯", "🌭", "🍕", "🍿", "🍩", "🥢", "🥪", "🥑", "🥥", "🍅", "🍎", "🍏", "🍑", "🍐", "🥒", "🍋", "🍊", "🍉", "🍦", "🍧", "☕", "🍯", "🍼", "🥛", "🦷", "🧠", "🦴", "🥞", "🍾", "💯", "📋", "🎢", "🧬", "₿", "🥜"];

    let currentRow;
    emojiList.forEach((emoji, index) => {
      if (index % 12 === 0) {
        currentRow = document.createElement("tr");
        emojiTable.appendChild(currentRow);
      }

      const emojiCell = document.createElement("td");
      emojiCell.innerHTML = emoji;
      emojiCell.addEventListener("click", (event) => {
        input.value = emoji;
        emojiListDiv.style.display = "none";
      });
      currentRow.appendChild(emojiCell);
    });

    return emojiTable;
  };

  const emojiListDiv = document.querySelector(".emoji-list");
  emojiListDiv.appendChild(generateEmojiList());

  // ------------------------testing area-----------------------------------------------START

  // ------------------------testing area-----------------------------------------------END


  // creates the background color table 
  const backgroundColorTable = document.createElement("table");
  backgroundColorTable.classList.add("background-color-table");
  buttonContainer.appendChild(backgroundColorTable);
  const backgroundColors = ["red", "tomato", "orange", "gold", "yellow", "khaki", "olive", "green", "limegreen", "mediumseagreen", "seagreen", "turquoise", "teal", "cornflowerblue", "dodgerblue", "blue", "navy", "purple", "violet", "plum", "hotpink", "pink", "lightpink", "peachpuff", "sandybrown", "peru", "chocolate", "sienna", "rosybrown", "silver", "gainsboro", "beige", "tan", "wheat", "khaki", "linen", "lightyellow", "white", "lightgray", "gray", "darkgray", "black"];

  backgroundColors.forEach((color) => {
    const colorCell = document.createElement("td");
    colorCell.style.backgroundColor = color;
    colorCell.addEventListener("click", () => {
      setBackgroundColor(color);
      backgroundColorTable.style.display = "none";
    });
    backgroundColorTable.appendChild(colorCell);
  });

  const setBackgroundColor = (color) => {
    canvas.style.backgroundColor = color;
  };

  backgroundColorButton.addEventListener("click", () => {
    backgroundColorTable.style.display = "block";
  });


  //pick random emoji
  function getRandomEmoji() {
    const index = Math.floor(Math.random() * emojiList.length);
    return emojiList[index];
  }

  //get random speed 
  const getRandomSpeed = () => {
    return Math.random() * 4 - 2;
  };

  // reset the animation
  const reset = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emojiArray = [];
  };

  //remove last emoji
  const removeEmoji = (index) => {
    emojiArray.splice(index, 1);
  };

  //speed -
  const slowDown = () => {
    speed /= 2;
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx /= 2;
      emojiArray[i].dy /= 2;
    }
  };

  // speed +
  const speedUp = () => {
    speed *= 2;
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx *= 2;
      emojiArray[i].dy *= 2;
    }
  };

  //  animates the emojis
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < emojiArray.length; i++) {
      const emoji = emojiArray[i]
      ctx.font = fontSize;
      ctx.fillText(emoji.value, emoji.x, emoji.y);

      if (emoji.x + emoji.dx > canvas.width || emoji.x + emoji.dx < 0) {
        emoji.dx = -emoji.dx;
      }

      if (emoji.y + emoji.dy > canvas.height || emoji.y + emoji.dy < 0) {
        emoji.dy = -emoji.dy;
      }

      emoji.x += emoji.dx;
      emoji.y += emoji.dy;
    }

    if (isAnimating) {
      requestAnimationFrame(animate);
    }
  };

  // adds an emoji to the animation
  const addEmoji = () => {
    emojiArray.push({
      value: input.value,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: 2,
      dy: 2,
      fontSize: fontSize
    });
  };

  // emojify! random or selected emoji stream
  const addEmoji2 = (x, y) => {
    let emojiValue;
    if (randomCheckbox.checked) {
      emojiValue = getRandomEmoji();
    } else {
      emojiValue = input.value;
    }

    emojiArray.push({
      value: emojiValue,
      x: x - canvas.offsetLeft,
      y: y - canvas.offsetTop,
      dx: speed * (Math.random() - 0.5),
      dy: speed * (Math.random() - 0.5),
      fontSize: fontSize
    });
  };

  // //undo last action
  // const undo = () => {
  //   if (lastState) {
  //     const img = new Image();
  //     img.onload = () => {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       ctx.drawImage(img, 0, 0);
  //     };
  //     img.src = lastState;
  //     lastState = null;
  //   }
  // };

  const undoEmoji = () => {
    if (previousEmojiArray.length > 0) {
      emojiArray = previousEmojiArray.pop();
    }
  };

  const saveEmojiArray = () => {
    previousEmojiArray.push([...emojiArray]);
  };

  //changes direction of 1 emoji
  const changeDirection = () => {
    let emoji = emojiArray[emojiArray.length - 1];
    emoji.dx = -emoji.dx;
    emoji.dy = -emoji.dy;
  };

  // changes direction of all the emojis
  const changeDirection1 = () => {
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx = -emojiArray[i].dx;
      emojiArray[i].dy = -emojiArray[i].dy;
    }
  };

  //testing emoji size function
  const increaseSize = () => {
    let emojiSizeUp = emojiArray[emojiArray.length - 1];
    emojiSizeUp.fontSize = parseInt(emojiSizeUp.fontSize) + 10 + "px Arial";
  };

  //testing emoji size function
  const decreaseSize = () => {
    let emojiSizeDown = emojiArray[emojiArray.length - 1];
    emojiSizeDown.fontSize = parseInt(emojiSizeDown.fontSize) - 10 + "px Arial";
  };

  // action listeners 
  addButton.addEventListener("click", addEmoji);
  slowDownButton.addEventListener("click", slowDown);
  speedUpButton.addEventListener("click", speedUp);
  changeDirectionButton.addEventListener("click", changeDirection);
  changeDirectionButtonAll.addEventListener("click", changeDirection1);
  resetButton.addEventListener("click", reset);

  animateButton.addEventListener("click", () => {
    isAnimating = true;
    animate();
  });

  emojiListButton.addEventListener("click", () => {
    emojiList1.style.display = emojiList1.style.display === "block" ? "none" : "block";
  });

  increaseSizeButton.addEventListener("click", () => {
    fontSize = parseInt(fontSize) + 6 + "px Arial";
  });

  decreaseSizeButton.addEventListener("click", () => {
    fontSize = parseInt(fontSize) - 6 + "px Arial";
  });

  // emojify listeners
  canvas.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    addEmoji2(event.clientX, event.clientY);
  });

  // emojify listeners
  canvas.addEventListener("mousemove", (event) => {
    if (isMouseDown) {
      addEmoji2(event.clientX, event.clientY);
    }
  });

  // emojify listeners
  canvas.addEventListener("mouseup", (event) => {
    isMouseDown = false;
    removeEmoji(emojiArray.length - 1);
  });

  //background color listener 
  backgroundColorButton.addEventListener("click", () => {
    backgroundColorTable.style.display = "block";
    backgroundColorTable.style.top = `${backgroundColorButton.offsetTop - backgroundColorTable.offsetHeight}px`;
    backgroundColorTable.style.left = `${backgroundColorButton.offsetLeft}px`;
  });

  // ------------------------testing area-----------------------------------------------START


  //  increaseLastButton.addEventListener("click", increaseSize);

  // decreaseLastButton.addEventListener("click", decreaseSize);
  resetButton.addEventListener("click", () => {
    saveEmojiArray();
    addEmoji();
  });
  // ------------------------testing area-----------------------------------------------END

  //random emoji checkbox listener
  randomCheckbox.addEventListener("change", (event) => {
    addEmoji2();
  });

  //screenshot function
  screenshotButton.addEventListener("click", () => {
    const screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = canvas.width;
    screenshotCanvas.height = canvas.height;

    const screenshotCtx = screenshotCanvas.getContext("2d");
    screenshotCtx.fillStyle = canvas.style.backgroundColor;
    screenshotCtx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < emojiArray.length; i++) {
      const emoji = emojiArray[i];
      screenshotCtx.font = fontSize;
      screenshotCtx.fillText(emoji.value, emoji.x, emoji.y);
    }

    const screenshot = screenshotCanvas.toDataURL();
    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "screenshot.png";
    link.click();
  });

  //listens for record button click
  recordButton.addEventListener("click", record);

  //listens for change to dark mode toggle and swaps the background color
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  });

  // listening for remove last animation click
  removeLastButton.addEventListener("click", () => {
    emojiArray.pop();
  });

  // listening for a reload of the page
  window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
  });

  // listening for a change of screen size
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
  });

  //record function, records 10s clip and saves it
  function record() {

    recording = true;
    mediaRecorder = new MediaRecorder(canvas.captureStream(30));
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = (event) => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "animation.webm";
      link.click();
    };

    mediaRecorder.start();

    const ctx = canvas.getContext("2d");

    // redraw the background color and emoji animation for each frame of the recording
    function draw() {
      ctx.fillStyle = canvas.style.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < emojiArray.length; i++) {
        const emoji = emojiArray[i];
        ctx.font = fontSize;
        ctx.fillText(emoji.value, emoji.x, emoji.y);
      }

      if (recording) {
        requestAnimationFrame(draw);
      }
    }

    draw();

    setTimeout(() => {
      recording = false;
      mediaRecorder.stop();
    }, 10000);
  };
});


