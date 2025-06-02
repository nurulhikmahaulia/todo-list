import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDdr0fxnYpfeG2b6GlTQ_-4TqpmGk2uvOk",
  authDomain: "insan-cemerlang-80713.firebaseapp.com",
  projectId: "insan-cemerlang-80713",
  storageBucket: "insan-cemerlang-80713.appspot.com",
  messagingSenderId: "1016858047753",
  appId: "1:1016858047753:web:0534dda2085c2adab68fd8",
  measurementId: "G-E7G0K9XTCD"
};

const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarTodo() {
  try {
    const refDokumen = collection(basisdata, "todo");
    const kueri = query(refDokumen, orderBy("teks")); // Mengurutkan berdasarkan teks
    const cuplikanKueri = await getDocs(kueri);
    
    return cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      teks: dokumen.data().teks,
      status: dokumen.data().status
    }));
  } catch (error) {
    console.error("Gagal mengambil data todo:", error);
    return [];
  }
}

//fungsi untuk menambah todo list
export async function tambahTodoList(teks, status) {
  try {
    // menyimpan data ke Firebase
    const refDokumen = await addDoc(collection(basisdata, "todo"), {
      teks: teks,
      status: status // bisa "belum", "proses", atau "selesai"
    });

    // menampilkan pesan berhasil
    console.log('Berhasil menyimpan data todo');
  } catch (error) {
    // menampilkan pesan gagal
    console.log('Gagal menyimpan data todo:', error);
  }
}