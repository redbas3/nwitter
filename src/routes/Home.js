import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const nweetArray = [];
      querySnapshot.forEach((document) => {
        nweetArray.push({ ...document.data(), id: document.id });
      });
      console.log(nweetArray);
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        createdId: userObj.uid,
      });
      setNweet("");
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event) => {
    event.preventDefault();

    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={nweet}
          type="input"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
        <div>
          {nweets.map((nweet) => (
            <div key={nweet.id}>
              <h4>{nweet.text}</h4>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Home;
