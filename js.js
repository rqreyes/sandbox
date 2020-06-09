// Variable Declaration
const inventory = {
  'candy-1': 30,
  'candy-2': 15,
  'candy-3': 15,
};

const shelvesGridSize = 5;
let slotsLeft = 5 ** 2;
const shelves = [];
for (let i = 0; i < shelvesGridSize; i += 1) {
  const shelf = [];

  for (let j = 0; j < shelvesGridSize; j += 1) {
    shelf.push('-');
  }

  shelves.push(shelf);
}

// initialize inventory
const setInventory = () => {
  for (const counter in inventory) {
    $(`.candy-counter[data-type=${counter}]`).text(inventory[counter]);
  }
};
setInventory();

// initialize shelves
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

  // On Click Handler - Remove candy from shelf
  $('.shelf').on('click', function (evt) {
    // console.log('clicked on shelf candy: ', $(this), $(this).data());
    const candyType = $(evt.target).data('type');

    // if there's a candy present, then remove it
    if (candyType) {
      // increment slots left
      slotsLeft += 1;

      // increment counter of candy
      inventory[candyType] += 1;
      setInventory();

      // remove candy from slot
      shelves[this.rowIndex][evt.toElement.cellIndex] = '-';
      setShelves();
    }
  });
};
setShelves();

// Helper Methods

// On Click Handler - Add candy to shelf
$('.candy-item').on('click', function () {
  // console.log('clicked on inventory candy: ', $(this), $(this).data());
  const candyType = $(this).data('type');

  // if selected candy is available and the shelves aren't full, then add it
  if (inventory[candyType] && slotsLeft > 0) {
    // decrement slots left
    slotsLeft -= 1;

    // decrement counter of candy
    inventory[candyType] -= 1;
    setInventory();

    // place candy in first available table cell
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
});
