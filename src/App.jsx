
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import { FaStickyNote } from "react-icons/fa";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("quickNotes")) || [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState("All Notes");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      activeCategory === "All Notes" ||
      note.category === activeCategory;

    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id
            ? { ...note, ...noteData }
            : note
        )
      );
    } else {
      const newNote = {
        ...noteData,
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      setNotes((prev) => [newNote, ...prev]);
    }

    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirmed) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        notes={notes}
      />

      <main className="main-content">
        <Header
          search={search}
          setSearch={setSearch}
          onAddNote={handleAddNote}
          activeCategory={activeCategory}
        />

        <section className="notes-section">
          <div className="section-heading">
            <div>
              <h2>Your Collection</h2>
              <p>
                {filteredNotes.length}{" "}
                {filteredNotes.length === 1 ? "note" : "notes"} found
              </p>
            </div>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <FaStickyNote />
              </div>
              <h3>
                {search
                  ? "No matching notes found"
                  : "No notes yet"}
              </h3>
              <p>
                {search
                  ? "Try searching with another keyword."
                  : "Your thoughts deserve a place. Create your first note!"}
              </p>
              {!search && (
                <button className="add-button" onClick={handleAddNote}>
                  + Create Your First Note
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </div>
  );
}

export default App;
