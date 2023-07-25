import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "fBase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure? you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, `nweets`, nweetObj.id));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await updateDoc(doc(dbService, "nweets", nweetObj.id), {
      text: newNweet,
    });

    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                onChange={onChange}
                value={newNweet}
                placeholder="Edit your nweet"
                required
              />
              <button onClick={toggleEditing}>Cancel</button>
              <input type="submit" value="Update Nweet" />
            </form>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {isOwner ? (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Nweet;
