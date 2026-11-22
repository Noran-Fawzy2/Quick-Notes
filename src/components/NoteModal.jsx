
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

function NoteModal({ isOpen, onClose, onSave, editingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [color, setColor] = useState("lavender");

  useEffect(() => {
    if (isOpen) {
      setTitle(editingNote?.title || "");
      setContent(editingNote?.content || "");
      setCategory(editingNote?.category || "Personal");
      setColor(editingNote?.color || "lavender");
    }
  }, [isOpen, editingNote]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      color,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="note-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingNote ? "Edit Note" : "Create New Note"}</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Note Title</label>
          <input
            type="text"
            placeholder="Give your note a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Note Content</label>
          <textarea
            placeholder="Write your thoughts here..."
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Ideas</option>
            <option>Important</option>
          </select>

          <label>Choose Color</label>
          <div className="color-options">
            {["lavender", "mint", "peach", "blue"].map((item) => (
              <button
                type="button"
                key={item}
                className={`color-option ${item} ${
                  color === item ? "selected" : ""
                }`}
                onClick={() => setColor(item)}
                title={item}
              />
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              {editingNote ? "Update Note" : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
