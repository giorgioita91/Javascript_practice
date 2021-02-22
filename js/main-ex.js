/** 1° cosa da fare
 * dichiaro variabili e costanti
 */
// seleziono bottone per aprire la MODAL in HTML riga 27
const btnOpenModal = document.querySelector('#btnModal');
// seleziono bottone per chiudere la MODAL in HTML riga 37
const btnCloseModal = document.querySelector('#btnClose');

// seleziono la modal contenitore, in HTML riga 33
const modalCourse = document.getElementById('modalContainer');
// seleziono il bottone del form "APPLICA MODIFICHE", in HTML riga 75
const btnSave = document.getElementById('buttonModify')


// seleziono il bottone del form "AGGIUNGI", in HTML riga 74
const btnSubmit = document.getElementById('buttonSubmit');

//seleziono il form, riga HTML 39
const formModal = document.querySelector('#modalCourse');

//seleziono h2 vuoto, riga HTML 36
const h2 = document.getElementById('textContent');

//seleziono le input presenti nel mio form 
//N.B uso document e non la variabile formModal
const titoloValue = document.getElementById('titoloCorso')
const temaValue = document.getElementById('temaCorso')
const livelloValue = document.getElementById('livelloCorso')
const imgValue = document.getElementById('immagineCorso')

// seleziono la lista presente riga 97 HTML
const ulLista = document.querySelector('.listaCorsi')

// creo un array vuoto nel quale salverò i miei valori di output
const courseArray = [];

// seleziono lo span per inserire nel futuro il numero di elementi presenti nell'array
const totCorsi= document.getElementById('totCorsi');


// creo una funzione  che mi restituisce il numero di elementi presenti nell'array
const getNumberOfCourse = () => {
    const num = courseArray.length;
    return totCorsi.textContent = num // questo valore è un valore STRINGA
}


/** 4° cosa da fare
 * funzione handleOpen
 */
// questa funzione mi permette di far apparire la modal
 const handleOpenModal = (e) => {
    modalCourse.classList.add('modalVisible') // aggingo una classe 
    // eseguo una condizione, mi tornerà utile nel momento in cui la modal dovrà mostrarsi.
    // chiedo se è presente un id all'interno del <div class="modalBody">
    if(modalCourse.firstElementChild.id){ 
        // nascondo il bottone aggiungi
        btnSubmit.hidden = true;
        // rimuovo attributo al bottone aggiungi
        btnSubmit.removeAttribute('type')
        // imposto attributo al bottone applica modifiche
        btnSave.setAttribute('type','submit');
        // mostro bottone applica modifiche
        btnSave.hidden = false
        // imposto il titolo della modal, il mio famoso h2 vuoto
        h2.textContent = 'Modifica corso';
    }else{
        // imposto il titolo della modal, il mio famoso h2 vuoto
        h2.textContent = 'Aggiungi Corso';
        // imposto come stringa vuota, momentaneamente questo span, al suo interno ci sarà un id-corso
        document.getElementById('idCourse').textContent = ''
        // mostro bottone aggiungi
        btnSubmit.hidden = false;
        // imposto attributo al bottone aggiungi
        btnSubmit.setAttribute('type','submit');
        // nascondo il bottone applica modifiche
        btnSave.hidden = true
        // rimuovo attributo bottone modifiche
        btnSave.removeAttribute('type')
    }
 }

// creo una funzione per pulire i valori dei campi delle mie input
const handleClearField = () => {
    titoloValue.value = "";
    temaValue.value = "";
    livelloValue.value = "";
    imgValue.value = "";
}


 /**
  * function close
  */
// la funzione close chiude la modal rimuovendo la classe
  const handleClose = (e) => {
      modalCourse.classList.remove('modalVisible')
      // quando chiudo la modal devo svuotare i campi
      handleClearField()
      // mi servirà dopo per eliminare l'id quando chiuderà la modal relativa alle modifiche
      modalCourse.firstElementChild.removeAttribute('id')
  }

 /** 
  * function close from back
  */
 // posso chiudere la modal cliccando lo sfondo nero
 const handleCloseFromBack = (e) => {
    // dato che il mio evento si scatena sul contenitore Modal devo selezionare il target specifico
   if(e.target.classList.contains('modalVisible')){
       handleClose() // invoco la chiusura
   }
}

// renderizzo il corso appena aggiunto creando i vari elementi HTML
const renderCourse = (courseObj) => {
    const liContainer = document.createElement('li'); // <li>
    // liContainer.id = courseObj.id provate così
    liContainer.setAttribute('data-id',courseObj.id); // <li data-id="numeroID">
    liContainer.className = 'cardCourse';

    const h3 = document.createElement('h3')// <h3></h3>
    const p = document.createElement('p')// <p></p>
    const strong = document.createElement('strong')
    const img = document.createElement('img')

    // definisco un id per gli elementi
    h3.id ='title-h3';
    strong.id = 'livello-strong';
    p.id ='tema-p';
    img.id = 'immagine-img'

    // inserisco i valori dentro gli elementi
    h3.textContent = courseObj.title;
    strong.textContent = courseObj.livello;
    p.textContent = courseObj.tema;
    img.setAttribute('src',courseObj.img)

    // creo i bottoni di rimozione e modidica
    const btnDelete = document.createElement('button');
    const btnSetting = document.createElement('button');

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'btnCourseContainer';


    btnDelete.setAttribute('type','button');
    btnSetting.setAttribute('type','button');

    btnDelete.id = 'delete';
    btnSetting.id = 'modify';

    const iconS = document.createElement('i');
    const iconD = document.createElement('i');

    iconS.classList.add('fa','fa-cog');
    iconD.classList.add('fa','fa-trash');

    btnDelete.className = 'btn';
    btnSetting.className = 'btn';
    
    btnSetting.textContent = 'modifica';
    btnDelete.textContent= 'rimuovi';
   
    
    // appendo i vari elementi 
    btnSetting.appendChild(iconS)
    btnDelete.appendChild(iconD)
    
    buttonContainer.appendChild(btnSetting)
    buttonContainer.appendChild(btnDelete)

    liContainer.appendChild(h3)
    liContainer.appendChild(strong)
    liContainer.appendChild(p)
    liContainer.appendChild(img)
    liContainer.appendChild(buttonContainer)

    ulLista.appendChild(liContainer)

}

/**
 * function ui
 */
// aggiorno la mia interfaccia, se non ci sono elementi lascio il mio msg visibile
// sennò mostro i miei corsi
 const ui = () => {
     (courseArray.length === 0) 
     ? document.getElementById('emptyList').style.display = 'block' // se è vera fa questo
     : document.getElementById('emptyList').style.display = 'none' // se è falsa fa questo
 }

/**
 * function random ID
 */
// creo una funzione random che accetta un range di valori
 const randomId = (min,max) => {
    const random = Math.floor(Math.random()* (max - min) +min);
    return random;
 }

/**
 * function addCourse
 */
// creo la funzione per aggiungere i corsi
const handleAddCourse = (e) => {
    // eseguo il preveantDefault per bloccare il corrente submit prima dell'esecuzione dei comandi
    e.preventDefault();
    console.log(e);
    // faccio un controllo per capire quale bottone posso cliccare per scatenare le istruzioni successive
    if(e.submitter.id == 'buttonSubmit'){
        // se i valori non sono vuoi
        if(titoloValue.value !== ''
        && temaValue.value !== ''
        && livelloValue.value !== ''
        && imgValue.value !== ''){
            // aggiungo i valori di input al mio oggetto
            courseObj = {
                id:randomId(1,99), // todo da vedere dopo
                title: titoloValue.value,
                tema: temaValue.value,
                livello: livelloValue.value,
                img: imgValue.value
            }
            // stampo l'oggetto
            console.log(courseObj);
            // effettuo il push dell'oggetto - DOMANDA, avrei potuto usare map? - come lo fareste?
            courseArray.push(courseObj);
            console.log(courseArray);
            

            // rimuovo le condizioni di else
            titoloValue.classList.remove('error')
            temaValue.classList.remove('error')
            livelloValue.classList.remove('error')
            imgValue.classList.remove('error')

            // invoco la funzione per chiudere la modal
            handleClose();
            // invoco la funzione per renderizzare in HTML l'oggetto
            // passo l'oggetto come parametro
            renderCourse(courseObj)
            // invoco la funzione per aggiornare la mia interfaccia
            ui();
            // aggiorno il numero di elementi presenti nella funzione 
            getNumberOfCourse();
        }else{
            // se è false la condizione scatta l'errore
            titoloValue.classList.add('error')
            temaValue.classList.add('error')
            livelloValue.classList.add('error')
            imgValue.classList.add('error')
        }
    }
}
// rimuovo i corsi
const removeCourse = (e) => {
    // console.log(e.target);
    // controllo se il target è relativo al mio bottone rimuovi
    if(e.target.id == 'delete'){
        console.log(e.target)
        // seleziono l'antenato più vicino al mio target ossia il contenitore della card
        const elm = e.target.closest('.cardCourse');
        // utilizzo il metodo find per capire quale tra gli oggetti presenti nell'array ha l'id == al dataset della mia card
        const obj = courseArray.find( valoreCorrente =>  valoreCorrente.id == elm.dataset.id )
        console.log(obj);

        //  soluzione un po' macchinosa
        // let indexArr = 0;
        // for(corso of courseArray){
        //     if(corso.id == obj.id){
        //         break;
        //     }
        //     indexArr++
        // }
        
        // salvo il mio indice dell'oggetto in una costante
        const num = courseArray.indexOf(obj);
        // eseguo lo splice rimuovendo un elemento all'indice num, il "+" serve per trasformare la stringa in number
        courseArray.splice(+num,1);
        // seleziono la lista ul ma tramite getElement in modo da avere un aggiornamento vivo del DOM
        const listRoot = document.getElementById('listaRoot')
        console.log(num)
        // rimuovo l'elemento dal DOM
        listRoot.children[+num].remove();
        // aggiorno la mia interfaccia
        ui();
        // aggiorno la funzione per il conto della lunghezza del mio array
        getNumberOfCourse();
    }
}

// renderizzo i cambiamenti passando come parametro l'oggetto modificato
const handleRenderChange = (obj) => {
    // seleziono in maniera multipla la mia card tramite classe
    const cards = document.getElementsByClassName('cardCourse');
    // trasformo la collezione di HTML in Array ed eseguo il find()
    // lo faccio per confrontare se tra tutte le mie card una ha il dataset.id === all' id del mio oggetto
    const li = Array.from(cards).find( x => {
        return x.dataset.id == `${JSON.stringify(obj.id)}` // converto in stringa il valore del mio OBJ.iD
    })

    // seleziono la parte testale dei miei elementi nel DOM ed assegno un valore dato dal mio nuovo oggetto
    li.querySelector('#title-h3').textContent = obj.title
    li.querySelector('#tema-p').textContent = obj.tema
    li.querySelector('#livello-strong').textContent = obj.livello
    li.querySelector('#immagine-img').textContent = obj.img
}


// applico le modifiche
const handleApplyChanges = (e) => {
    // al submit congelo ogni azione con il preventDefault ed eseguo le mie istruzioni
    e.preventDefault();
    // condizione per capire se il bottone è applica modifiche
    if(e.submitter.id == 'buttonModify'){
        // se lo è ...
        console.log(e.submitter);
        // seleziono il mio id 
        const idCourse = document.getElementById('idCourse').textContent;
        // verifico quale oggetto nel mio array ha quell'id
        const objEdit = courseArray.find( x => x.id === +idCourse);
        console.log("QUESTO é l'ID dell nuovo oggetto",idCourse);
        // creo un nuovo oggetto con i valori acquisiti in input
        const obj = {
            id:+idCourse,
            title:titoloValue.value,
            tema:temaValue.value,
            livello:livelloValue.value,
            img:imgValue.value
        }
        console.log(obj);
        // adesso con lo splice aggiungo 1 elemento - obj- nell'indice dato dall'indexOf()
        courseArray.splice(courseArray.indexOf(objEdit),1,obj);
        // chiudo la modal
        handleClose();
        // re-renderizzo i miei cambiamenti passando il nuovo oggetto aggiornato
        handleRenderChange(obj)
    }
}

// apro la mia modal di modifica
const handleEditModal = (e) =>{
    e.preventDefault();
    // condizione necessaria per identificare quale bottone sto cliccando se è il bottone modifica
    if(e.target.id == 'modify'){
        // se lo è... creo un id, mi serve per le condizioni presenti nella funzione handleOpenModal
        modalCourse.firstElementChild.id = 'modalBodyEdit';
        // apro la mia modal
        handleOpenModal();
        // seleziono il mio id dal HTML
        const card = e.target.closest('.cardCourse').dataset.id; // "15"
        // verifico se dataset == obj.id
        const objEdit = courseArray.find( x => x.id == +card) 

        console.log(objEdit);
        // aggiungo il mio id obj nella modal, nello span
        document.getElementById('idCourse').textContent = objEdit.id
        // assegno alle input i valori del mio oggetto
        titoloValue.value = objEdit.title
        temaValue.value = objEdit.tema
        livelloValue.value = objEdit.livello
        imgValue.value = objEdit.img
    }
}



/** 2° cosa da fare
 * dichiaro la funzione che gestisce gli eventi
 */
const load = () => {

    btnOpenModal.addEventListener('click',handleOpenModal)
    btnCloseModal.addEventListener('click',handleClose);
    modalCourse.addEventListener('click',handleCloseFromBack)
    formModal.addEventListener('submit',handleAddCourse)
    formModal.addEventListener('submit',handleApplyChanges)
    ulLista.addEventListener('click', removeCourse)
    ulLista.addEventListener('click', handleEditModal)
    getNumberOfCourse();
}
//3° cosa da fare
load();