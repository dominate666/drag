(() => {
  const idioms = ["诗情画意", "南来北往", "一团和气", "落花流水"];
  let charCellGroup = document.querySelector(".char-cell-group");
  let oBlanks = document.querySelectorAll(".blank-cell-group .wrapper");
  let charCollection = [];
  let charAreas = [];
  let blankAreas = [];
  let resArr = [undefined,undefined,undefined,undefined]
  let oChars = null;
  let startX = 0;
  let startY = 0;
  let cellX = 0;
  let cellY = 0;
  let mouseX = 0;
  let mouseY = 0;
  const init = () => {
    charCollection = formatCharsArr();
    render();
    oChars = charCellGroup.querySelectorAll(".cell-item .wrapper");
    getAreas(oBlanks, blankAreas);
    getAreas(oChars, charAreas);
    bindEvent();
  };
  function render() {
    let str = "";
    charCollection.forEach((item, index) => {
      str += charCellTpl(item, index);
    });
    charCellGroup.innerHTML = str;
  }
  function bindEvent() {
    for (let i = 0; i < oChars.length; i++) {
      oChars[i].addEventListener("touchstart", handleTouchStart, false);
      oChars[i].addEventListener("touchmove", handleTouchMove, false);
      oChars[i].addEventListener("touchend", handleTouchEnd, false);
    }
  }
  function handleTouchStart(e) {
    cellW = this.offsetWidth;
    cellH = this.offsetHeight;
    cellX = this.offsetLeft;
    cellY = this.offsetTop;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    mouseX = startX - cellX;
    mouseY = startY - cellY;
    this.style.width = cellW + "px";
    this.style.height = cellH + "px";
    this.style.position = "fixed";
    setPosition(this, { x: cellX, y: cellY });
  }
  function handleTouchMove(e) {
    e.preventDefault();
    const moveX = e.touches[0].clientX;
    const moveY = e.touches[0].clientY;
    cellY = moveY - mouseY;
    cellX = moveX - mouseX;
    setPosition(this, { x: cellX, y: cellY });
  }
  function handleTouchEnd(e) {
    const blankWidth = oBlanks[0].offsetWidth;
    const blankHeight = oBlanks[0].offsetHeight;
    for (let i = 0; i < blankAreas.length; i++) {
      if (resArr[i] !== undefined) {
        continue;
      }

      let { startX, startY } = blankAreas[i];
      if (
        (cellX > startX &&
          cellX < startX + blankWidth / 2 &&
          cellY > startY &&
          cellY < startY + blankHeight / 2) ||
        (cellX + blankWidth > startX + blankWidth / 2 &&
          cellX + blankWidth < startX + blankWidth &&
          cellY > startY &&
          cellY < startY + blankHeight / 2)
      ) {
        setPosition(this, { x: startX, y: startY });
        setResArr(this, i);
        console.log(resArr)
        if (!resArr.includes(undefined)) {
          setTimeout(() => {
            if (!checkResult()) {
              alert("错了");
            } else {
                alert("正确了");
            }
            resetPosition();
          }, 500);
        }
        return;
      }
    }

    // 回弹逻辑
    const _index = Number(this.dataset.index);
    const charArea = charAreas[_index];
    setPosition(this, { x: charArea.startX, y: charArea.startY });
  }
  function setPosition(el, { x, y }) {
    el.style.left = x + "px";
    el.style.top = y + "px ";
  }
  function resetPosition() {
    console.log(resArr)
    resArr.forEach((item) => {
      const el = item.el;
      const index = Number(el.dataset.index);
      const { startX, startY } = charAreas[index];
      setPosition(el, { x: startX, y: startY });
    });
    resArr = [];
    startX = 0;
    startY = 0;
    cellX = 0;
    cellY = 0;
    mouseY = 0;
  }
  function getAreas(domCollection, arrWrapper) {
    let startX = 0;
    let startY = 0;
    for (let i = 0; i < domCollection.length; i++) {
      startX = domCollection[i].offsetLeft;
      startY = domCollection[i].offsetTop;
      arrWrapper.push({
        startX,
        startY,
      });
    }
  }
  function formatCharsArr() {
    let _arr = [];
    idioms.forEach((item) => {
      _arr = _arr.concat(item.split(""));
    });
    return _arr.sort(randomSort);
  }
  function randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  }
  function charCellTpl(char, index) {
    return `
            <div class="cell-item" >
                <div class="wrapper" data-index="${index}">${char}</div>
            </div>
            
            `;
  }
  function setResArr(el, index) {
    resArr[index] = {
      char: el.innerText,
      el
    };
  }
  function checkResult() {
    let idiom = "";
    resArr.forEach((item) => {
      idiom += item.char;
    });
    return idioms.find((item) => item === idiom);
  }
  init();
})();
