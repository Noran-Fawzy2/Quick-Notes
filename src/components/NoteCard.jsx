
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className={`note-card ${note.color}`}>
      <div className="note-card-top">
        <span className="note-category">{note.category}</span>

        <div className="note-actions">
          <button onClick={() => onEdit(note)} title="Edit note">
            <FaEdit />
          </button>

          <button onClick={() => onDelete(note.id)} title="Delete note">
            <FaTrash />
          </button>
        </div>
      </div>

      <h3>{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="note-date">
        <FaCalendarAlt />
        <span>{note.date}</span>
      </div>
    </article>
  );
}

export default NoteCard;
