import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCK40LBBLYCEyAyAx4IIl0RVjk-fwDzHy8",
    authDomain: "nodejs1-7a602.firebaseapp.com",
    projectId: "nodejs1-7a602",
    storageBucket: "nodejs1-7a602.appspot.com",
    messagingSenderId: "890818005497",
    appId: "1:890818005497:web:0c6b9f874c8fbd1b2dd528",
    measurementId: "G-YRZJV3KGEF"
  };

  //init firebase app
  initializeApp(firebaseConfig);

  //init services
  const db = getFirestore()

  //collection ref
  const colRef = collection(db, 'books')


  //get collection data
  getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc)=>{
      books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
  })
  .catch(err =>{
    console.log(err.message)
  })

  // Adding documents
  const addBookForm = document.querySelector('.add');
  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
    })
    .then(() => {
      addBookForm.reset()
    })
  })


  //deleting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef)
    .then(()=> {
      deleteBookForm.reset();
    })
  })