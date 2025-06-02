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

export async function ambilDaftarTodoList() {
  const refDokumen = collection(basisdata, "todo");
  const kueri = query(refDokumen, orderBy("teks")); // urutkan berdasarkan teks, bisa disesuaikan

  try {
    const cuplikanKueri = await getDocs(kueri);
    const hasilKueri = cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      teks: dokumen.data().teks,
      status: dokumen.data().status
    }));

    return hasilKueri;
  } catch (error) {
    console.error("Gagal mengambil daftar todo list:", error);
    return [];
  }
}

export async function tambahTodoList(teks) {
  try {
    // menyimpan data ke koleksi 'todolist' di Firebase
    const refDokumen = await addDoc(collection(basisdata, "todolist"), {
      teks: teks,
      status: false // default : belum selesai
    });

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data todo list');
  } catch (error) {
    // menampilkan pesan gagal
    console.log('gagal menyimpan data todo list:', error.message);
  }
}