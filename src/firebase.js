import firebase from "firebase";

//File config kết nối với firebase cloud.

const firebaseConfig = {
  apiKey: "AIzaSyCln_3vggZ3EC5Q9oCluWscDS08WWwdrkg",
  authDomain: "webphim-7ec17.firebaseapp.com",
  projectId: "webphim-7ec17",
  storageBucket: "webphim-7ec17.appspot.com",
  messagingSenderId: "885568892840",
  appId: "1:885568892840:web:d9cbe3b71fd18238df379d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// db là database của firebase (hay còn gọi với cái tên thân mật là firestore hay firestore cloud)
const db = firebaseApp.firestore();
// auth là tài khoản của người dùng
const auth = firebase.auth();
// Phương thức cho phép đăng nhập bằng google của firebase
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
