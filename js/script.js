let taskField = document.querySelector(".task-field");
let addBtn = document.querySelector(".add-btn");
const updateBtn = document.querySelector(".update-btn");
let taskList = document.querySelector(".list");
let errorField = document.querySelector(".todo-error");
let listArr = [], updateIndx;
const colors = ["red", "lightgreen", "dodgerblue"];

function addToList(task, idx) {
    const li = document.createElement("li");
    li.innerHTML = `<span class="main-text">${task}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>`;

    // edit functionality for specific li
    li.querySelector(".edit").addEventListener("click", function () {
        taskField.value = listArr[idx];
        addBtn.style.display = "none";
        updateBtn.style.display = "inline-block";
        updateIndx = idx;
    })

    // delete functionality for specific li
    li.querySelector(".delete").addEventListener("click", function () {
        listArr.splice(idx, 1);
        reloadList();
    })

    taskList.appendChild(li);

    // applying animation for this current task
    typeAnimation(li.querySelector(".main-text"));
}

function reloadList() {
    taskList.innerHTML = "";

    listArr.map((item, i) => {
        addToList(item, i);
    })
}

// add btn event listener
addBtn.addEventListener("click", function () {
    // clearing previous error message
    errorField.innerHTML = "";

    let task = taskField.value.trim();
    taskField.value = "";

    if (task === "") {
        errorField.innerHTML = "Please enter something (text or number).";
    }
    else {
        listArr.push(task);
        addToList(task, listArr.length - 1);
    }
});

// update btn event listener
updateBtn.addEventListener("click", function () {
    // clearing previous error message
    errorField.innerHTML = ""

    let updatedTask = taskField.value.trim();

    if (updatedTask === "") {
        errorField.innerHTML = "Please enter something (text or number).";
        return;
    }

    listArr[updateIndx] = updatedTask;
    const task = taskList.children[updateIndx];
    const mainText = task.querySelector(".main-text");

    mainText.innerHTML = updatedTask;
    typeAnimation(mainText);
    taskField.value = "";
    addBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
})

// typing animation function
function typeAnimation(element) {
    /// if it's a number then start counter function
    if (!isNaN(element.innerHTML)) {
        counter(element);
        return;
    }

    const currentText = element.innerHTML.split("");
    let idx = 0, colorIdx = 0;
    element.innerHTML = "";

    setInterval(() => {
        if (idx < currentText.length) {
            element.innerHTML += `<span style="color: ${colors[colorIdx % 3]}">${currentText[idx]}</span>`;
            idx++;
            colorIdx++;
        }
        else {
            if (element.lastChild) {
                element.removeChild(element.lastChild);
            }
            else {
                idx = 0;
                colorIdx = 0;
            }
        }
    }, 300)
}

// counter function
function counter(element) {
    let value = parseInt(element.innerHTML);
    element.innerHTML = "";

    let count = 0, colorIdx = 0;
    let intervalId = setInterval(() => {
        if (count <= value) {
            element.innerHTML = `<span style="color: ${colors[colorIdx % 3]}">${count}</span>`
            count++;
            colorIdx++;
        }
        else {
            clearInterval(intervalId);
        }
    }, 300)
}