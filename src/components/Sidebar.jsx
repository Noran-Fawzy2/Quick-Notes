
import { FaStickyNote, FaUser, FaBriefcase, FaLightbulb, FaStar } from "react-icons/fa";

const categories = [
  { name: "All Notes", icon: <FaStickyNote /> },
  { name: "Personal", icon: <FaUser /> },
  { name: "Work", icon: <FaBriefcase /> },
  { name: "Ideas", icon: <FaLightbulb /> },
  { name: "Important", icon: <FaStar /> },
];

function Sidebar({ activeCategory, setActiveCategory, notes }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon"><FaStickyNote /></div>
        <h2>QuickNotes<span>.</span></h2>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">MENU</p>

        {categories.map((category) => (
          <button
            key={category.name}
            className={`sidebar-link ${
              activeCategory === category.name ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.name)}
          >
            {category.icon}
            <span>{category.name}</span>
            <small>
              {category.name === "All Notes"
                ? notes.length
                : notes.filter((note) => note.category === category.name).length}
            </small>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="footer-icon">✦</div>
        <p>Your ideas deserve a place.</p>
        <span>Keep everything organized</span>
      </div>
    </aside>
  );
}

export default Sidebar;
