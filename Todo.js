let uservalue = document.getElementById("task"); //user value
let btn = document.getElementById("btn"); // button
let todos = document.getElementById("additem"); //parentelement of todo
let box = document.getElementById("todo"); //parent element of input and button
let warningmsg=document.getElementById('warningmsg');
let islengthexceeds = false,isedited = false,editele = "";
let i = 1;
let newtext = "";

function additem() {
  let val = uservalue.value;
  if (val == "") alert("Todo is empty");
  
  else {
    let item = document.createElement("h4");
    item.innerHTML = `${val} <button class="Edit ">Edit</button> <button class="Delete" >Delete</button>`;
    if (isedited) {
      todos.replaceChild(item, editele);
      btn.innerHTML = "Submit";
      isedited = false;
      sessionStorage.setItem(newtext, uservalue.value);
    } else {
      todos.appendChild(item);
      sessionStorage.setItem(`Todo${i++}`, val);
    }
      if(islengthexceeds)
      box.removeChild(warningmsg)

    item.querySelector(".Delete").addEventListener("click", (e) => {
      removeitem(e.target.parentElement);
    });
    item.querySelector(".Edit").addEventListener("click", (e) => {
      let p = e.target.parentElement.innerText;
      edititem(p.split("\n")[0]);
      newtext = findkey(p.split("\n")[0]);
      editele = e.target.parentElement;
    });

    uservalue.value = "";
  }
}

function edititem(edited) {
  uservalue.value = edited;
  btn.innerText = "Edit";
  isedited = true;
}
function removeitem(e) {
        let p=e.innerText;
    let deletekey=findkey(p.split("\n")[0]);
    sessionStorage.removeItem(deletekey);
  todos.removeChild(e);
}
btn.addEventListener("click", additem);

uservalue.addEventListener("input", (e) => {
  let inputlength = uservalue.value;

  if (inputlength.length >= 40) {
    islengthexceeds=true;
    warningmsg.innerHTML = "you can add upto 40 words";
    warningmsg.style.color = "red";
    box.appendChild(warningmsg);
  }
  if ((islengthexceeds == true && inputlength.length < 40)) {
    box.removeChild(warningmsg);
  }
});

function findkey(text) {
  for (const i in sessionStorage) {
    if (sessionStorage[i] == text) return i;
  }
}