// FirebaseManager.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from './Config';  // Adjust the import path accordingly

class FirebaseManager {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  // Authentication
  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up: ", error.message);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in: ", error.message);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Error logging out: ", error.message);
      throw error;
    }
  }

  // User Management
  async addUser(userType, user) {
    try {
      const userRef = doc(this.db, 'Users', user.uid);
      await setDoc(userRef, {
        userType: userType,
        ...user
      });
    } catch (error) {
      console.error("Error adding user: ", error.message);
      throw error;
    }
  }

  async getUser(uid) {
    try {
      const userRef = doc(this.db, 'Users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        throw new Error('User does not exist');
      }
    } catch (error) {
      console.error("Error getting user: ", error.message);
      throw error;
    }
  }

  // Additional methods for setting and getting other data can be added here...
}

export default FirebaseManager;
