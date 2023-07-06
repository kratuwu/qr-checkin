import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseInit";

const List = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  useEffect(() => {
    getDocs(query(collection(db, "audience"))).then((snapshots) => {
      const docs: DocumentData[] = [];
      snapshots.forEach((snapshot) => {
        docs.push(snapshot.data());
      });
      setData(docs);
    });
  }, []);
  return (
    <div>
      {data.map((doc, i) => (
        <li key={i}>{doc.status}</li>
      ))}
    </div>
  );
};

export default List;
