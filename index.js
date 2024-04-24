function move(nbcase) {
  return nbcase * 124;
}

function convertRight(n) {
  switch (n) {
    case 0:
      return 3;
    case 1:
      return 2;
    case 2:
      return 1;
    case 3:
      return 0;
    default:
      return -9;
  }
}

function getGameStateInArray() {
  const tab = new Array();
  const td = document.getElementsByTagName("td");
  let j = 0,
    k = 0;

  for (let i = 0; i < 4; i++) tab[i] = new Array();
  for (let i = 0; i < td.length; i++) {
    j = i % 4;

    if (i < 4) k = 0;
    else if (i < 8) k = 1;
    else if (i < 12) k = 2;
    else k = 3;

    if (td[i].hasChildNodes()) tab[k][j] = parseInt(td[i].firstChild.innerHTML);
    else tab[k][j] = -1;
  }
  return tab;
}

function clearTPosFin(tabInit, tPosFin) {
  for (let i = 0; i < 4; i++) {
    if (tabInit[i] == -1 && tPosFin[i] != -1) {
      for (let j = i + 1; j < 4; j++) {
        if (tPosFin[j] > 0) tPosFin[j] -= 1;
      }
      tPosFin[i] = -1;
    }
  }
  return tPosFin;
}

function buildAllQuarterDataTable(tabFin, tabPosFin) {
  const allQuarterDataTable = new Array();

  for (let i = 0; i < 4; i++) allQuarterDataTable[i] = new Array();
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 4; i++) {
      if (j == 0) allQuarterDataTable[i][j] = tabFin[i];
      else if (j == 1) allQuarterDataTable[i][j] = tabPosFin[i];
    }
  }
  return allQuarterDataTable;
}

function calculQuarterNewState(tab) {
  const tabInit = new Array();
  let j, k;
  let offset = 0;
  let tPosFin = [0, 1, 2, 3];
  let allQuarterDataTable = new Array();

  for (let i = 0; i < 4; i++) allQuarterDataTable[i] = new Array();
  for (i = 0; i < 4; i++) tabInit[i] = tab[i];
  for (i = 3; i >= 0; i--) {
    if (tab[i] != -1) {
      i -= offset;
      offset = 0;

      while (i - 1 - offset >= 0 && tab[i - 1 - offset] == -1) {
        for (k = i - offset; k <= 3; k++) {
          tab[k - 1] = tab[k];
          tab[k] = -1;
        }
        offset++;
      }

      j = i - offset;

      if (j > 0) {
        if (tab[j] == tab[j - 1]) {
          if (j - 2 >= 0) {
            if (tab[j] == tab[j - 2]) {
              if (j - 3 >= 0) {
                if (tab[j] == tab[j - 3]) {
                  tab = [2 * tab[j], 2 * tab[j], -1, -1];
                  tPosFin = [0, 0, 1, 1];
                  tPosFin = clearTPosFin(tabInit, tPosFin);
                  allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

                  return allQuarterDataTable;
                }

                tab = [tab[0], 2 * tab[j], tab[j], -1];
                tPosFin = [0, 1, 1, 2];
                tPosFin = clearTPosFin(tabInit, tPosFin);
                allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

                return allQuarterDataTable;
              }

              tab = [2 * tab[j], tab[j], tab[j + 1], -1];
              tPosFin = [0, 0, 1, 2];
              tPosFin = clearTPosFin(tabInit, tPosFin);
              allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

              return allQuarterDataTable;
            }

            if (j - 3 >= 0 && tab[j - 2] == -1 && tab[j] == tab[j - 3]) {
              tab = [2 * tab[j], tab[j], -1, -1];
              tPosFin = [0, -1, 0, 1];
              tPosFin = clearTPosFin(tabInit, tPosFin);
              allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

              return allQuarterDataTable;
            }

            if (j == 2) {
              tab = [tab[0], 2 * tab[j], tab[j + 1], -1];
              tPosFin = [0, 1, 1, 2];

              if (tab[0] == -1) {
                tab = [tab[1], tab[2], tab[3], -1];
                tPosFin = [-1, 0, 0, 1];
              }

              tPosFin = clearTPosFin(tabInit, tPosFin);
              allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

              return allQuarterDataTable;
            } else tab = [tab[0], tab[1], 2 * tab[j], -1];
            tPosFin = [0, 1, 2, 2];
            offset = 1;
          } else {
            tab = [2 * tab[j], tab[j + 1], tab[j + 2], -1];
            tPosFin = [0, 0, 1, 2];
            tPosFin = clearTPosFin(tabInit, tPosFin);
            allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

            return allQuarterDataTable;
          }
        } else if (tab[j - 1] == -1 && j - 2 >= 0) {
          if (tab[j - 2] == tab[j]) {
            if (j - 3 >= 0) {
              if (tab[j - 3] == tab[j]) {
                tab = [2 * tab[j], tab[j], -1, -1];
                tPosFin = [0, 0, -1, 1];
                tPosFin = clearTPosFin(tabInit, tPosFin);
                allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

                return allQuarterDataTable;
              }

              tab = [tab[0], 2 * tab[j], -1, -1];
              tPosFin = [0, 1, -1, 1];
              tPosFin = clearTPosFin(tabInit, tPosFin);
              allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

              return allQuarterDataTable;
            }

            tab = [2 * tab[j], tab[j + 1], -1, -1];
            tPosFin = [0, -1, 0, 1];
            tPosFin = clearTPosFin(tabInit, tPosFin);
            allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

            return allQuarterDataTable;
          }
        }
      }
    }
  }

  tPosFin = clearTPosFin(tabInit, tPosFin);
  allQuarterDataTable = buildAllQuarterDataTable(tab, tPosFin);

  return allQuarterDataTable;
}

function after_animation(id_dep_table, id_arr_table, index_carre) {
  const tabEmpty = new Array(
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15
  );
  let i = index_carre;
  let tabInit;
  let futureNewSquare;
  let indexOfValue;
  let noMotion = true;
  let superposed = false;
  let value2x;
  let className;
  const element = document.getElementById(id_dep_table[i]);
  const value = parseInt(element.firstChild.innerHTML);

  element.removeChild(element.firstChild);

  for (let j = 0; j < i; j++) {
    if (id_arr_table[j] == id_arr_table[i]) {
      value2x = 2 * value;
      className = "carre_1 c" + value2x;
      document.getElementById(id_arr_table[j]).firstChild.innerHTML = value2x;
      document.getElementById(id_arr_table[j]).firstChild.className = className;
      superposed = true;
    }
  }

  if (!superposed) {
    const new_div = document.createElement("div");
    className = "carre_1 c" + value;
    new_div.className = className;
    new_div.innerHTML = value;

    document.getElementById(id_arr_table[i]).appendChild(new_div);
  }

  if (id_dep_table.length == id_arr_table.length) {
    for (let iterator = 0; iterator < id_dep_table.length; iterator++) {
      if (id_dep_table[iterator] != id_arr_table[iterator]) {
        noMotion = false;
        break;
      }
    }
  }

  if (i == id_dep_table.length - 1 && noMotion == false) {
    tabInit = getGameStateInArray();

    for (let k = 0; k < 4; k++) {
      for (let j = 0; j < 4; j++) {
        if (tabInit[k][j] != -1) {
          indexOfValue = tabEmpty.indexOf(4 * k + j);
          tabEmpty.splice(indexOfValue, 1);
        }
      }
    }

    futureNewSquare = Math.floor(Math.random() * (tabEmpty.length - 1) + 0);
    const new_div = document.createElement("div");
    new_div.className = "carre_1 c2";
    new_div.innerHTML = "2";

    document.getElementById(tabEmpty[futureNewSquare] + 1).appendChild(new_div);
  }
}

const main = function () {
  let direction = null;
  let xTouchStart = null;
  let yTouchStart = null;
  let xTouchEnd = null;
  let yTouchEnd = null;

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("touchend", handleTouchEnd, false);
  $(document).keydown(handleKeyDown);

  function getTouches(event) {
    return (
      event.touches || // browser API
      event.originalEvent.touches // jQuery
    );
  }

  function handleTouchStart(event) {
    const touch = getTouches(event)[0];
    xTouchStart = touch.clientX;
    yTouchStart = touch.clientY;
  }

  function handleTouchMove(event) {
    event.preventDefault();
    event.stopPropagation();
    const touch = getTouches(event)[0];
    xTouchEnd = touch.clientX;
    yTouchEnd = touch.clientY;

    return false;
  }

  function handleTouchEnd() {
    const xDiff = xTouchStart - xTouchEnd;
    const yDiff = yTouchStart - yTouchEnd;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff < 0) {
        /* right swipe */
        direction = "right";
      } else {
        /* left swipe */
        direction = "left";
      }
    } else {
      if (yDiff < 0) {
        /* down swipe */
        direction = "down";
      } else {
        /* up swipe */
        direction = "up";
      }
    }

    handleUserAction(direction);
  }

  function handleKeyDown(event) {
    const keyCode = event.which;
    switch (keyCode) {
      case 37:
        direction = "left";
        break;
      case 38:
        direction = "up";
        break;
      case 39:
        direction = "right";
        break;
      case 40:
        direction = "down";
        break;
    }
    handleUserAction(direction);
  }

  function handleUserAction(direction) {
    const id_dep_table = new Array();
    const id_arr_table = new Array();
    const elements = $(".carre_1");
    const tabInit = getGameStateInArray();

    const tabInitQuarter = new Array();
    const tabFinAll = new Array();
    const tabPosFinAll = new Array();
    let tabsString;
    let indexTabsFin = 0;

    switch (direction) {
      case "left":
        for (let j = 0; j < 4; j++) {
          for (let i = 0; i < 4; i++) {
            // line initial table
            tabInitQuarter[i] = tabInit[j][i];
          }
          // line initial table calculation and each cell end position
          tabsString = calculQuarterNewState(tabInitQuarter);

          for (let l = 0; l < 2; l++) {
            for (let k = 0; k < 4; k++) {
              if (l == 0)
                tabFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              else if (l == 1) {
                tabPosFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              }
            }
          }

          indexTabsFin += 4;
        }

        for (let j = 0; j < elements.length; j++) {
          const id_s = $(elements[j]).parent().attr("id");
          const idHTML = parseInt(id_s);
          const idTab = idHTML - 1;
          const posDeb = idTab % 4;
          const posFin = tabPosFinAll[idTab];
          let offset = Math.abs(posDeb - posFin);

          id_dep_table.push(idHTML);
          id_arr_table.push(idHTML - offset);
          offset = move(offset);
          offset = "-=" + offset + "px";

          (function (j) {
            $(elements[j]).animate({ left: offset }, 200, function () {
              after_animation(id_dep_table, id_arr_table, j);
            });
          })(j);
        }

        break;

      case "up":
        for (let j = 0; j < 4; j++) {
          for (let i = 0; i < 4; i++) {
            // line initial table
            tabInitQuarter[i] = tabInit[i][j];
          }
          // line initial table calculation and each cell end position
          tabsString = calculQuarterNewState(tabInitQuarter);

          for (let l = 0; l < 2; l++) {
            for (let k = 0; k < 4; k++) {
              if (l == 0)
                tabFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              else if (l == 1) {
                tabPosFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              }
            }
          }

          indexTabsFin += 4;
        }

        for (let j = 0; j < elements.length; j++) {
          const id_s = $(elements[j]).parent().attr("id");
          const idHTML = parseInt(id_s);
          const idTab = idHTML - 1;
          const posDeb = Math.floor(idTab / 4);
          const posFin = tabPosFinAll[((idTab * 4) % 16) + posDeb];
          let offset = Math.abs(posDeb - posFin);

          id_dep_table.push(idHTML);
          id_arr_table.push(idHTML - offset * 4);
          offset = move(offset);
          offset = "-=" + offset + "px";

          (function (j) {
            $(elements[j]).animate({ top: offset }, 200, function () {
              after_animation(id_dep_table, id_arr_table, j);
            });
          })(j);
        }

        break;

      case "right":
        for (let j = 0; j < 4; j++) {
          for (let i = 0; i < 4; i++) {
            // line initial table
            tabInitQuarter[3 - i] = tabInit[j][i];
          }
          // line initial table calculation and each cell end position
          tabsString = calculQuarterNewState(tabInitQuarter);

          for (let l = 0; l < 2; l++) {
            for (let k = 0; k < 4; k++) {
              if (l == 0)
                tabFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              else if (l == 1) {
                tabPosFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              }
            }
          }

          indexTabsFin += 4;
        }

        for (let j = 0; j < elements.length; j++) {
          const id_s = $(elements[j]).parent().attr("id");
          const idHTML = parseInt(id_s);
          const idTab = idHTML - 1;
          const posDeb = idTab % 4;
          const posFin = convertRight(
            tabPosFinAll[idTab - posDeb + convertRight(posDeb)]
          );
          let offset = Math.abs(posDeb - posFin);

          id_dep_table.push(idHTML);
          id_arr_table.push(idHTML + offset);
          offset = move(offset);
          offset = "+=" + offset + "px";

          (function (j) {
            $(elements[j]).animate({ left: offset }, 200, function () {
              after_animation(id_dep_table, id_arr_table, j);
            });
          })(j);
        }

        break;

      case "down":
        for (let j = 0; j < 4; j++) {
          for (let i = 0; i < 4; i++) {
            // line initial table
            tabInitQuarter[3 - i] = tabInit[i][j];
          }
          // line initial table calculation and each cell end position
          tabsString = calculQuarterNewState(tabInitQuarter);

          for (let l = 0; l < 2; l++) {
            for (let k = 0; k < 4; k++) {
              if (l == 0)
                tabFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              else if (l == 1) {
                tabPosFinAll[k + indexTabsFin] = parseInt(tabsString[k][l]);
              }
            }
          }

          indexTabsFin += 4;
        }

        for (let j = 0; j < elements.length; j++) {
          const id_s = $(elements[j]).parent().attr("id");
          const idHTML = parseInt(id_s);
          const idTab = idHTML - 1;
          const posDeb = convertRight(Math.floor(idTab / 4));
          const posFin = tabPosFinAll[posDeb + (idTab % 4) * 4];
          let offset = Math.abs(posDeb - posFin);

          id_dep_table.push(idHTML);
          id_arr_table.push(idHTML + offset * 4);
          offset = move(offset);
          offset = "+=" + offset + "px";

          (function (j) {
            $(elements[j]).animate({ top: offset }, 200, function () {
              after_animation(id_dep_table, id_arr_table, j);
            });
          })(j);
        }
        break;
    }
  }
};

$(document).ready(main);
