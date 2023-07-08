let TodoContainer=document.getElementById("todoItemsContainer");
let AddtodoItem=document.getElementById("AddtodoItem");
let ButtonTodoItem=document.getElementById("SaveBtn");
let NotePera=document.getElementById("note-pera");
let DisplayTime=document.getElementById("date");
let DisplayMonth=document.getElementById("month");
let DisplayYear=document.getElementById("year");
let DisplayDay=document.getElementById("Day");
let TotalTime=document.getElementById("total-time");
TotalTime.classList.add("totalTime");
DisplayTime.classList.add("DateText");
DisplayMonth.classList.add("monthText")

const month1 = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let NewMonth = month1[d.getMonth()];
let newYear=d.getFullYear();
let NewDate=d.getDate();
let NewDay=d.toLocaleString('en-US', { weekday: 'long',});
DisplayTime.textContent=NewDate;
DisplayMonth.textContent=NewMonth;
DisplayYear.textContent=newYear;
DisplayDay.textContent=NewDay;




ButtonTodoItem.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
let today =new Date();
    let month =today.getMonth()+1;
    let year=today.getFullYear();
    let date=today.getDate();

function AddstatusOfLabel(CheckBoxId,labelId,todoId){
//    let CheckBoxElement=document.getElementById(CheckBoxId);
   let labelElement=document.getElementById(labelId);
   labelElement.classList.toggle("checked");
   
    let todoItemIndex =todoList.findIndex(function(eachTodo){
        let eachTodoId= "todo"+eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }

    });
    let TodoObject= todoList[todoItemIndex];
    if(TodoObject === true){
        TodoObject.isChecked = false;
    }
    else{
        TodoObject.isChecked=true;
    }

}

function DeleteTodo(todoId){
    let todoElement=document.getElementById(todoId);
    TodoContainer.removeChild(todoElement);
    let DeleteElementIndex=todoList.findIndex(function(eachTodo){
    let eachTodoId= "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todoList.splice(DeleteElementIndex,1);
}

function getTodoFromLocalStorage(){
    let StringfiedTodo=localStorage.getItem("todoList");
    let parsedTodo = JSON.parse(StringfiedTodo);
    if(parsedTodo === null){
        return [];
    }
    else{
        return parsedTodo;
    }
}

let todoList=getTodoFromLocalStorage();
let todoCount=todoList.length;

function onAddTodo(){
    let Current_time=`${date}-${month}-${year}`
    let userInputElement=document.getElementById("todoUserInput");
    let userInputValue=userInputElement.value;
    if(userInputValue == ""){
        NotePera.textContent="Enter Your Task Frist";
        NotePera.style.color="red";
    }
    else{
        
        todoCount=todoCount+1
        let newTodo={
                text: userInputValue,
                uniqueNo:todoCount,
                isChecked: false,
                TodayDate:Current_time
            }
        
        todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    NotePera.textContent="";
    userInputElement.value="";
   
    
    }
   
   
}

function createAndAppendTodo(todo){
    let CheckBoxId= "checkbox" + todo.uniqueNo;
    let labelId="label" + todo.uniqueNo;
    let todoId="todo" + todo.uniqueNo;
    let timeId="time"+todo.uniqueNo;

// <-------------creating li element-------------------------->

    let todoElement=document.createElement("li");
    todoElement.id=todoId;
    todoElement.style.color="white";
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    TodoContainer.appendChild(todoElement);


// <----------------creating checkboc----------------------------->


    let Inputelement=document.createElement("input");
    Inputelement.type="checkbox";
    Inputelement.id=CheckBoxId;
    Inputelement.checked=todo.isChecked;
    Inputelement.classList.add("checkbox-input");
    todoElement.appendChild(Inputelement);
    Inputelement.onclick=function(){
        AddstatusOfLabel(CheckBoxId,labelId,todoId);
    }


// <---------------------creating Label Container------------------------------->

    let labelContainer=document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row");
    todoElement.appendChild(labelContainer);


// <-------------------------creating Label----------------------------------------->

    let labelElement=document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for",CheckBoxId);
    labelElement.textContent=todo.text;
    labelElement.style.fontSize="1.5rem";
    labelElement.id=labelId;
    if( todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);



    let TimeAndDate=document.createElement("h6");
    TimeAndDate.classList.add("time_Date");
    TimeAndDate.id=timeId;
    TimeAndDate.textContent=todo.TodayDate;
    labelContainer.appendChild(TimeAndDate);



// <---------------------------------create Delete container------------------------->

    let deleteContainer=document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

// <---------------------------Delete icon ----------------------------------------->


    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can","delete-icon");
    deleteIcon.onclick= function(){
        DeleteTodo(todoId);
    }
    deleteContainer.appendChild(deleteIcon);


   

}


AddtodoItem.onclick=function(){
    onAddTodo();
}


for (let todo of todoList ){
    createAndAppendTodo(todo);
}


