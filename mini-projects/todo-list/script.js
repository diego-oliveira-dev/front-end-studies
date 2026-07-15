let list = ["dog walk", "wash dishes", "make dinner"];
renderList();

const itemInput = document.querySelector('.js-item-input');

function renderList() {
    renderItems();
    setupDropdownMenus();
    setupEditButtons();
    setupDeleteButtons();
}

function renderItems() {
    let displayList = '';
    list.forEach((item, index) => {
        displayList += `
        <div class="item">
            <input type="checkbox" class="checkbox-element">
            <span>${item}</span>
            <div class="dropdown">
                <button class="js-options-button options-button">...</button>
                <div class="menu">
                    <div class="menu-item js-info-button">Info</div>
                    <div class="menu-item js-edit-button">Edit</div>
                    <div class="menu-item js-delete-button delete-button">Delete</div>
                </div>
            </div>
        </div>`;
    });
    document.querySelector('.list').innerHTML = displayList;
}

function setupDropdownMenus() {
    document.querySelectorAll('.js-options-button')
        .forEach((button) => {
            button.addEventListener(
                'click', (event) => {
                    event.stopPropagation();
                    const menu = button.nextElementSibling;

                    document.querySelectorAll('.menu').forEach((otherMenu) => {
                        if (otherMenu !== menu) otherMenu.classList.remove('open');
                    })

                    menu.classList.toggle('open');
                }
            )
        });

    document.querySelectorAll('.menu-item')
        .forEach((item) => {
            item.addEventListener('click', () => {
                item.closest('.menu').style.display = 'none';
            })
        });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.menu').forEach((menu) => {
                menu.classList.remove('open');
            })
        }
    })
}

function setupDeleteButtons() {
    document.querySelectorAll('.js-delete-button').forEach(
        (deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                list.splice(index, 1);
                renderList();
            })
        })
}

function setupEditButtons() {
    document.querySelectorAll('.js-edit-button').forEach(
        (editButton, index) => {
            editButton.addEventListener('click', () => {
                editButton.classList.toggle('open');
                alert(`Clicked`);
                renderList();
            })
        })
}

document.querySelectorAll('.checkbox-element').forEach(
    (inputElement) => {
        inputElement.addEventListener('click', () => {
            const item = inputElement.nextElementSibling;
            
            inputElement.classList.toggle('checked');
        })
    }
)

document.querySelector('.js-add-button').addEventListener(
    'click', () => addItem());

function addItem() {
    const item = itemInput.value;
    if (item.trim() === '') return;

    list.push(item);
    renderList();
    cleanInput(itemInput);
}

function cleanInput(itemInput) { itemInput.value = ''; }


itemInput.addEventListener(
    'keydown', (event) => handleEnterKeydown(event)
);

function handleEnterKeydown(event) {
    if (event.key === 'Enter') addItem();
}