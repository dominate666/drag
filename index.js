(() => {
  const idioms = ["诗情画意", "南来北往", "一团和气", "落花流水"];
  let charCollection = [];
  let charCellGroup = document.querySelector(".char-cell-group");
  const init = () => {
    charCollection = formatCharsArr();
    render();
  };
  function render() {
    let str = "";
    charCollection.forEach((item, index) => {
      str += charCellTpl(item, index);
    });
    charCellGroup.innerHTML = str;
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
            <div class="cell-item" data-index="${index}">
                <div class="wrapper">${char}</div>
            </div>
            
            `;
  }
  init();
})();
