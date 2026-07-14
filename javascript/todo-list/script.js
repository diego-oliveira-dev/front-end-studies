let list = [];
renderList();

const itemInput = document.querySelector('.js-item-input');

function renderList() {
    let displayList = '';
    list.forEach((item, index) => {
        displayList +=
            `<div class="item">
            <input type="checkbox">
            <p>${item}</p>
            <button class="js-delete-button">x</button>
        </div>`;
    });
    document.querySelector('.list').innerHTML = displayList;

    document.querySelectorAll('.js-delete-button').forEach(
        (deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                list.splice(index, 1);
                renderList();
            })
        })
}

document.querySelector('.js-add-button').addEventListener(
    'click', () => addItem()
);

function addItem() {
    const item = itemInput.value;
    if (item.trim() === '') return;

    list.push(item);
    renderList();
    cleanInput(itemInput);
}

function cleanInput(itemInput) {
    itemInput.value = '';
}

itemInput.addEventListener(
    'keydown', (event) => handleEnterKeydown(event)
);

function handleEnterKeydown(event) {
    if (event.key === 'Enter') addItem();
}