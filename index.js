const themeButton = document.getElementById("theme-button");
const textArea = document.getElementById("feedback");
const name = document.getElementById("name");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  themeButton.classList.toggle("theme-button-dark");
  textArea.classList.toggle("dark-mode");
  name.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

// Add your query for the sign now button here
let submitButton = document.getElementById("submit-button");


const addSignature = (person) => {
  // Write your code to manipulate the DOM here
  //const nameInput = document.getElementById("name");
  const signatureParagraph = document.createElement("p");
  signatureParagraph.textContent += `🖊️ ${person.name}, thank you for the feedback.`;
    document.querySelector(".signatures").appendChild(signatureParagraph);

}

const validateForm = () => {

  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-FeedbackForm").elements;

  let person = {
    name: petitionInputs[0].value // accesses and saves value of first input
  }
  
  // TODO: Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if(containsErrors==false){
    addSignature(person);
    
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    toggleModal(person);
  }
  containsErrors = false;
}

submitButton.addEventListener("click", validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for(let i=0; i<revealableContainers.length;i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add('active');
    } else {
      /* remove the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener("scroll", reveal);

const toggleModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");
  
  let intervalId = setInterval(() => {
    scaleImage();
  }, 500);
  
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.name}! We appreciate your feedback!`;
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000)
}

let scaleFactor = 1;
let modalImage = document.querySelector(".modal-content img");;

const scaleImage = () => {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}
