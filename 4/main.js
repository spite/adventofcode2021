import { loadFile } from "../modules/load.js";

class Card {
  constructor(data) {
    const lines = data.split("\r\n");
    this.rows = [];
    for (const line of lines) {
      const row = [];
      for (let i = 0; i < line.length; i += 3) {
        row.push({
          number: parseFloat(line.substring(i, i + 2)),
          checked: false,
        });
      }
      this.rows.push(row);
    }
  }

  mark(n) {
    for (const row of this.rows) {
      const cell = row.find((v) => v.number === n);
      if (cell) {
        cell.checked = true;
      }
    }
  }

  check() {
    for (const row of this.rows) {
      let complete = true;
      for (let i = 0; i < row.length; i++) {
        if (row[i].checked === false) {
          complete = false;
          break;
        }
      }
      if (complete) {
        return true;
      }
    }

    for (let i = 0; i < this.rows[0].length; i++) {
      let complete = true;
      for (const row of this.rows) {
        if (row[i].checked === false) {
          complete = false;
          break;
        }
      }
      if (complete) {
        return true;
      }
    }

    return false;
  }

  print() {
    let res = "";
    for (const row of this.rows) {
      for (const cell of row) {
        const num =
          cell.number < 10 ? `&nbsp;${cell.number}` : `${cell.number}`;
        let char = cell.checked ? `<b>${num}</b>` : num;
        res += `${char} `;
      }
      res += "<br/>";
    }
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = res;
    document.body.append(div);
  }

  score() {
    let total = 0;
    for (const row of this.rows) {
      for (const cell of row) {
        if (cell.checked === false) {
          total += cell.number;
        }
      }
    }
    return total;
  }
}

function parseData(file) {
  const blocks = file.split("\r\n\r\n");
  const numbers = blocks[0].split(",").map((v) => parseFloat(v));
  const cards = [];
  for (let i = 1; i < blocks.length; i++) {
    const card = new Card(blocks[i]);
    cards.push(card);
  }
  return { numbers, cards };
}

function play(game) {
  for (const i of game.numbers) {
    for (const card of game.cards) {
      card.mark(i);
      card.print();
    }
    for (const card of game.cards) {
      const res = card.check(i);
      if (res) {
        const score = card.score() * i;
        return score;
      }
    }
  }
}

function play2(game) {
  for (const i of game.numbers) {
    for (const card of game.cards) {
      card.mark(i);
      card.print();
    }
    for (const card of game.cards) {
      const res = card.check(i);
      if (res) {
        if (game.cards.length === 1) {
          return game.cards[0].score() * i;
          debugger;
        }
        const pos = game.cards.indexOf(card);
        game.cards.splice(pos, 1);
      }
    }
  }
  debuggger;
}

const sample = await loadFile("input.txt");
const game = parseData(sample);
const res = play2(game);
console.log(res);
