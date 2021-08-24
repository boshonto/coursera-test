var main = document.querySelector('main');
var todoName = document.querySelector('.todoName');
var addButton = document.querySelector('.add');
var addButtonForm = document.querySelector('.addButton');

addButton.addEventListener('click', (e) => {

    e.preventDefault();

    var todoContent = todoName.value;
    if(todoContent){
        main.querySelector('.todos').innerHTML +=   `<div class = "todo">
                                    <p class = "text">${todoContent}</p>
                                    <i class="far fa-trash-alt"></i>
                                </div>`;
        todoName.value='';
    }

    main.querySelectorAll('.far').forEach((e) => {
        e.addEventListener(('click'), () => {
            e.parentElement.remove();
        });
    })
});

