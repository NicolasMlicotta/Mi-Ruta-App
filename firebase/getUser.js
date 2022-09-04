// Busca y retorna usuario from db
import { doc, getDoc } from "firebase/firestore";
import getDb from "./getDb";

const getUser = async (userId) => {
  const [db] = getDb();
  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);
  return new Promise((resolve, reject) => {
    if (docSnap.exists()) {
      resolve(docSnap.data());
    } else {
      resolve(null);
    }
  });
};

export default getUser;
