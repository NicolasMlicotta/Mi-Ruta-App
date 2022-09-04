import { useState, useEffect } from "react";
import getDb from "../firebase/getDb";
import { getDoc, doc } from "firebase/firestore";

function useCdLinks(CD) {
  const [db, app] = getDb();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLinks = async () => {
    const docRef = doc(db, "links", CD);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().linksArray) {
        setLinks(docSnap.data().linksArray);
        setLoading(false);
      } else {
        setLinks([]);
        setLoading(false);
      }
      return;
    }
  };

  useEffect(() => {
    if (CD) {
      getLinks();
    }
  }, [CD]);

  return { links, loading };
}

export default useCdLinks;
