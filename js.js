// Variable Declaration
const inventory = {
  'candy-1': 30,
  'candy-2': 15,
  'candy-3': 15,
};

const shelvesGridSize = 5;
let slotsLeft = shelvesGridSize ** 2;

const shelves = [];
for (let i = 0; i < shelvesGridSize; i += 1) {
  const shelf = [];

  for (let j = 0; j < shelvesGridSize; j += 1) {
    shelf.push('-');
  }

  shelves.push(shelf);
}

// set inventory
const setInventory = () => {
  for (const counter in inventory) {
    $(`.candy-counter[data-type=${counter}]`).text(inventory[counter]);
  }
};

// set shelves
const setShelves = () => {
  let shelvesDOM = '';

  shelves.forEach((shelf) => {
    shelfDOM = '<tr class="shelf">';
    shelf.forEach((slot) => {
      if (slot === 'candy-1')
        shelfDOM += '<td class="candy-slot candy-1" data-type="candy-1"></td>';
      else if (slot === 'candy-2')
        shelfDOM += '<td class="candy-slot candy-2" data-type="candy-2"></td>';
      else if (slot === 'candy-3')
        shelfDOM += '<td class="candy-slot candy-3" data-type="candy-3"></td>';
      else shelfDOM += '<td class="candy-slot"></td>';
    });
    shelvesDOM += shelfDOM;
  });

  $('#shelves').html(shelvesDOM);
  $('.shelf').on('click', candyRemove);
};

// Helper Methods

// On Click Handler - Remove candy from shelf
const candyRemove = function (evt) {
  const candyType = $(evt.target).data('type');

  // if there's a candy in the slot, then remove it
  if (candyType) {
    // increment slots left
    slotsLeft += 1;

    // increment counter of candy inventory
    inventory[candyType] += 1;
    setInventory();

    // remove candy from slot
    shelves[this.rowIndex][evt.toElement.cellIndex] = '-';
    setShelves();
  }
};

// On Click Handler - Add candy to shelf
const candyAdd = function () {
  const candyType = $(this).data('type');

  // if selected candy is available and the shelves aren't full, then add it
  if (inventory[candyType] && slotsLeft > 0) {
    // decrement slots left
    slotsLeft -= 1;

    // decrement counter of candy inventory
    inventory[candyType] -= 1;
    setInventory();

    // add candy in first available slot
    loopShelf: for (let i = 0; i < shelves.length; i += 1) {
      loopSlot: for (let j = 0; j < shelves[i].length; j += 1) {
        if (shelves[i][j] === '-') {
          shelves[i][j] = candyType;
          break loopShelf;
        }
      }
    }
    setShelves();
  }
};

// initialize inventory and shelves
setInventory();
$('.candy-item').on('click', candyAdd);
setShelves();
