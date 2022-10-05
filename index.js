(() => {
  const idioms = ["诗情画意", "南来北往", "一团和气", "落花流水"];
  let charCellGroup = document.querySelector(".char-cell-group");
  let oBlanks = document.querySelectorAll(".blank-cell-group .wrapper");
  let charCollection = [];
  let charAreas = [];
  let blankAreas = [];
  let resArr = [];
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
    console.log("blankAreas", blankAreas);
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
    this.style.left = cellX + "px";
    this.style.top = cellY + "px";
  }
  function handleTouchMove(e) {
    e.preventDefault();
    const moveX = e.touches[0].clientX;
    const moveY = e.touches[0].clientY;
    cellY = moveY - mouseY;
    cellX = moveX - mouseX;
    this.style.left = cellX + "px";
    this.style.top = cellY + "px";
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
        setPosition(this,{startX,startY})
        return;
      }
    }

    // 回弹逻辑
    const _index = Number(this.dataset.index);
    const charArea = charAreas[_index];
    this.style.left = charArea.startX + "px";
    this.style.top = charArea.startY + "px";
  }
  function setPosition(el, { startX, startY }) {
    el.style.left = startX + "px";
    el.style.top = startY + "px ";
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
  init();
})();
