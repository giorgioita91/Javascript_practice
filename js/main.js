const btnOpenModal = document.getElementById('btnModal');
const modalCourse = document.getElementById ('modalContainer');
const btnCloseModal = document.getElementById('btnClose');

const formModal = document.getElementById('modalCourse');
const btnSumbit = document.getElementById('buttonSubmit');
const titoloValue = document.getElementById('titoloCorso');

const courseArray = [];



const renderCourse = () => {
    
};


formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
    if (e.submitter.id == "buttonSubmit") {
        if (titoloValue.value == '') {
            alert('non hai inserito nessun valore!')
        }else{
            
            courseObj = {
                id: randomId(1,99),
                titolo: titoloValue.value
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

}

load();




























