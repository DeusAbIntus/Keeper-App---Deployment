import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("error fetching notes:", error);
    }
  }

  async function addNote(newNote) {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      fetchNotes();
    } catch (error) {
      console.error("error adding note: ", error);
    }
  }

  async function deleteNote(id) {
    try {
      await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      fetchNotes();
    } catch (error) {
      console.error("error deleting note: ", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
