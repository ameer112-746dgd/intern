import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        ✕
      </button>
      <ul>
        <li>
          <Link to="/" onClick={toggleSidebar}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/interviews" onClick={toggleSidebar}>
            Interview List
          </Link>
        </li>
      </ul>
    </aside>
  );
}
