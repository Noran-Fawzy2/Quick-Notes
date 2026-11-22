
import { FaSearch, FaPlus } from "react-icons/fa";

function Header({ search, setSearch, onAddNote, activeCategory }) {
  return (
    <header className="main-header">
      <div className="header-title">
        <span className="welcome-text">YOUR PERSONAL SPACE </span>
        <h1>
          {activeCategory === "All Notes"
            ? "My Notes"
            : activeCategory}
        </h1>
        <p>Capture your thoughts, organize your life.</p>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="add-button" onClick={onAddNote}>
          <FaPlus />
          <span>New Note</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
