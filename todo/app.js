//All Variables
var main = document.querySelector('main');
var todoName = document.querySelector('.todoName');
var addButton = document.querySelector('.add');
var addButtonForm = document.querySelector('.addButton');
var search = document.querySelector('.search input');
var todoItems = [];

//checking todoItems Array
if(localStorage != null){
    todoItems = JSON.parse(localStorage.getItem('todoItem'));
}

//Deleting Todo
const deleteTodo = () => {
    main.querySelectorAll('.far').forEach((e) => {
        e.addEventListener('click', () => {
            e.parentElement.remove();

            const indexOfTodo = todoItems.indexOf(e.previousElementSibling.textContent);
            if (indexOfTodo > -1) {
                todoItems.splice(indexOfTodo, 1);
                localStorage.setItem('todoItem', JSON.stringify(todoItems)); 
            }
        });
    })    
}

//Adding Todo from Add Button
addButton.addEventListener('click', (e) => {

    e.preventDefault();

    var todoContent = todoName.value.trim();

    //Adding Todo
    if(todoContent){
        main.querySelector('.todos').innerHTML +=   `<div class = "todo">
                                                        <p class = "text">${todoContent}</p>
                                                        <i class="far fa-trash-alt"></i>
                                                    </div>`;
        addButtonForm.reset();
    }

    deleteTodo();

    //Adding Todo in todoList.js
    todoItems.push(todoContent);

    //Getting City Name and Storting in Local Storage
    localStorage.setItem('todoItem', JSON.stringify(todoItems)); 
});

//Getting Local Storage Item
let todos = JSON.parse(localStorage.getItem('todoItem'));

//Adding Todo from Local storage
if(todos) {

    for (const i of todos){
        main.querySelector('.todos').innerHTML +=   `<div class = "todo">
                                                        <p class = "text">${i}</p>
                                                        <i class="far fa-trash-alt"></i>
                                                    </div>`;
    }

    deleteTodo();
}

//Searching for todos
const filterTodos = (term) => {
    Array.from(main.querySelector('.todos').children)
        .filter((todo) => !todo.textContent.includes(term))
        .forEach((todo) => todo.classList.add('filtered'));
    
    Array.from(main.querySelector('.todos').children)
        .filter((todo) => todo.textContent.includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
    const word = search.value.trim();
    filterTodos(word);
})