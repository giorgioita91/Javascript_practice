const btnOpenModal = document.getElementById('btnModal');
const modalCourse = document.getElementById ('modalContainer');
const btnCloseModal = document.getElementById('btnClose');

const formModal = document.getElementById('modalCourse');
const btnSumbit = document.getElementById('buttonSubmit');

const titoloValue = document.getElementById('titoloCorso');
const temaValue = document.getElementById('temaCorso');
const livelloValue = document.getElementById('livelloCorso');
const immagineValue = document.getElementById('immagineCorso');

const courseArray = [];

const listaCorsi = document.getElementById('listaRoot');


const renderCourse = () => {
    const liContainer = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    const img = document.createElement('img');

    h3.textContent = titoloValue.value;
    p.textContent = temaValue.value;
    strong.textContent = livelloValue.value;
    img.textContent = immagineValue.value;
    liContainer.className = 'cardCourse';

    
    
    if (img.textContent == '') {
        
        img.classList.add('imgInvisible');
    } else {
        img.classList.remove('imgInvisible');
    }

    liContainer.appendChild(img);
    
    

    liContainer.appendChild(h3);
    liContainer.appendChild(p);
    liContainer.appendChild(strong);

    listaCorsi.appendChild(liContainer);

};

const randomId = (min, max) => {
    const random = Math.floor(Math.random()* (max - min) + min);
    return random;
}

formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
    if (e.submitter.id == "buttonSubmit") {
        if (
            titoloValue.value == "" &&
            temaValue.value === "" &&
            livelloValue.value === "" &&
            immagineValue.value === ""
        ){
            alert('non hai inserito nessun valore!')
        }else{
            courseObj = {
                id: randomId(1,99),
                titolo: titoloValue.value,
                tema: temaValue.value,
                livello: livelloValue.value,
                immagine: immagineValue.value
            }
            courseArray.push(courseObj);
        }
    }
});



const handleOpenModal = () => {
    modalCourse.classList.add('modalVisible');
}

const handleCloseModal = () => {
    modalCourse.classList.remove('modalVisible');
}

const load = () => {
    btnOpenModal.addEventListener('click', handleOpenModal);
    btnCloseModal.addEventListener('click', handleCloseModal);
    btnSumbit.addEventListener('click', renderCourse);
}

load();




























