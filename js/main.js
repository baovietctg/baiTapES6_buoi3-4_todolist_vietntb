//Mảng tasks nhập vào (chưa hoàn thành)
let tasks = []

//Mảng tasks hoàn thành
let Local = []

//Thêm task
let addTask = () => {
    let inputTask = document.querySelector("#newTask").value;
    tasks.push(inputTask);
    document.querySelector("#newTask").value = "";
    document.querySelector("#newTask").focus();
    render(tasks);
    setlocalstorage(tasks);
}

//Hiện task lên giao diện
let render = () => {
    let content = "";
    tasks.map((task, index) => {
        content += `
            <li>
                <span style="font-size: 8px">${index+1}</span><span class="inputTask">${task}</span>
                    <div class ="buttons">
                        <button class="work" onclick="checkComplete('${index}')"class="check"><i class="fa-solid fa-check-double"></i></button>
                        <button class="clear" onclick="deleteTask('${index}')" ><i class="fa-sharp fa-solid fa-trash"></i></button>
                    </div>
            </li>
        `
    })
    document.querySelector("#todo").innerHTML = content;
}
document.querySelector("#addItem").onclick = addTask;

//Xếp thứ tự
let sortUp = () => {
    tasks.sort();
    Local.sort();
    render()
    checkTask()
}
document.getElementById("two").onclick = sortUp;

let sortDown = () => {
    tasks.reverse()
    Local.reverse()
    render()
    checkTask()
}
document.getElementById("three").onclick = sortDown;

//Xóa task
let deleteTask = (index) => {
    tasks.splice(index, 1);
    setlocalstorage(tasks);
    getlocalstorage();
}

let checkComplete = (index) => {
    Local.push(tasks[index])
    deleteTask(index)
    getlocalstorage();
}


let checkTask = () => {
    let content = "";
    Local.map((local, index) => {
        content += `
            <li>
                <span>${local}</span>
                <div class ="buttons">
                        <button class="clear" onclick="deleteLocal('${index}')" ><i class="fa-sharp fa-solid fa-trash"></i></button>
                </div>
            </li>
        `
    })
    document.querySelector("#completed").innerHTML = content;
}

let deleteLocal = (index) => {
    if (confirm('Bạn có muốn xóa task không?')) {
        Local.splice(index, 1);
        setlocalstorage(Local);
        getlocalstorage();
    }

}

let setlocalstorage = () => {

    localStorage.setItem("Todo", JSON.stringify(tasks));
    localStorage.setItem("COMPLETE", JSON.stringify(Local));
}
let getlocalstorage = () => {
    if (localStorage.getItem("Todo") != undefined) {
        tasks = JSON.parse(localStorage.getItem("Todo"));
    }
    render(tasks);
    if (localStorage.getItem("COMPLETE") != undefined) {
        toComplete = JSON.parse(localStorage.getItem("COMPLETE"));
    }
    checkTask(Local);
}
getlocalstorage();