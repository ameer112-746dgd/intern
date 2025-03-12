export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <h1>MentorLed Dashboard</h1>
    </nav>
  );
}
