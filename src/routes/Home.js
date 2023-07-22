import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import { addDoc, getDocs, collection } from "firebase/firestore";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(dbService, "nweets"));
    querySnapshot.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "nweets"), {
        nweet,
        createAt: Date.now(),
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
              <h4>{nweet.nweet}</h4>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Home;
