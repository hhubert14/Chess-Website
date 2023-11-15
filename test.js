const contentDiv = document.getElementById('original_content')
const updateButton = document.getElementById('updated_content')

let msg = prompt("Want updates?", "yes");
if(msg === "yes"){
    contentDiv.innerHTML = 'Updated content';
}
