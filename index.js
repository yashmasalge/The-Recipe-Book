let globalTaskData = []
taskContents = document.getElementById('taskContents');
const taskModal = document.querySelector(".task__modal__body");


const addCard = () => {


    const addinput = {
        id : `${Date.now()}`,
        img : document.querySelector("#url").value,
        recname : document.querySelector("#recName").value,
        duration : document.querySelector("#duration").value,
        ingredients : document.querySelector("#ingredients").value,
        steps : document.querySelector("#steps").value
        } 

        taskContents.insertAdjacentHTML('beforeend',generateRecCard(addinput));

    globalTaskData.push(addinput);
    saveToLocalStorage();
}

const generateRecCard = ({id, img, recname, duration, ingredients, steps}) => 
`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
<div class="card" style = "background-color : #ffdad5">
    <div class="card-header">
        <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-outline-danger" onclick= "editTask(this)" name = ${id}><i
                    class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-outline-danger"  onclick= "deleteTask(this)" name = ${id}><i class="fas fa-trash-alt"></i></button>
        </div>
    </div>
    <img src=${img} class="card-img-top" alt="recipe_image" name = ${img}>
    <div class="card-body">
        <h5 class="card-title d-flex justify-content-center">${recname}</h5>
        <p class="card-text d-flex justify-content-center">${duration}</p>
        <h6>INGREDIENTS</h6>
        <p class="card-text">${ingredients}</p>
        <h6>STEPS</h6>
        <p class="card-text">${steps}</p>
    </div>
    <div class="card-footer d-flex justify-content-center">
        <button class="btn btn-outline-danger"  data-bs-toggle="modal" data-bs-target="#showTask" onclick = "openTask.apply(this, arguments)"  id=${id}>view Recipe</button>
    </div>
</div>
</div>`

const saveToLocalStorage = () => {
    localStorage.setItem("remains", JSON.stringify({pain: globalTaskData}));
}


const reloadRecipeCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("remains"));
    console.log(localStorageCopy);
if(localStorageCopy) {
    globalTaskData = localStorageCopy["pain"];
    console.log(globalTaskData);
}
globalTaskData.map((cardData) => {
    taskContents.insertAdjacentHTML('beforeend', generateRecCard(cardData));
})
}


const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((e) => e.id!= targetID)
    saveToLocalStorage();
    window.location.reload();
}

const editTask = (e) => {
    const targetID = e.getAttribute("name");
    // console.log(e)
    // console.log(e.parentNode)
    // console.log(e.parentNode.parentNode.parentNode.childNodes)
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1])


    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[7].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[11].setAttribute("contenteditable","true")

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].style.setProperty("border","1px solid black")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].style.setProperty("border","1px solid black")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[7].style.setProperty("border","1px solid black")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[11].style.setProperty("border","1px solid black")

    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Save Changes"
   
}

const saveEditTask = (e) => {
    if (!e) e = window.event;
    // const targetID = e.getAttribute("name");
    // const newTaskDetails = {
    //     id: e.parentNode.parentNode.parentNode.getAttribute("id"),
    //     url: e.parentNode.parentNode.childNodes[3].getAttribute("name"),
    //     title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
    //     type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
    //     description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML
    // }
    const refid = e.parentNode.parentNode.parentNode.getAttribute("id")
    console.log(refid)
    objIndex = globalTaskData.findIndex((obj => obj.id == refid ));
    console.log(objIndex)
    globalTaskData[objIndex].duration= e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML;
    globalTaskData[objIndex].recname = e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML;
    globalTaskData[objIndex].ingredients= e.parentNode.parentNode.childNodes[5].childNodes[7].innerHTML;
    globalTaskData[objIndex].steps= e.parentNode.parentNode.childNodes[5].childNodes[11].innerHTML;
    saveToLocalStorage()
    window.location.reload();
}



const htmlModalContent = ({ id, img, recname, duration, ingredients, steps }) => {
    const date = new Date(parseInt(id));
    return `
      <div class="mb-3"><img src=${img} ||  alt="bg image" class="img-fluid place__holder__image mb-3"/></div>
      <div><strong> Created on ${date.toDateString()}</string></div>
      <div class="mb-3"><h2 class="my-3">${recname}</h2></div>
      <div class="mb-3"><h5 class="my-3">${duration}</h5></div>
      <div class="mb-3"><p class="lead">${ingredients}</p></div>
      <div class="mb-3"><p class="lead">${steps}</p></div>`
  };

  
  const openTask = (e) => {
    if (!e) e = window.event;
  
    const getTask = globalTaskData.filter(({ id }) => id === e.target.id);
    console.log(getTask)
    taskModal.innerHTML = htmlModalContent(getTask[0]);
  };


