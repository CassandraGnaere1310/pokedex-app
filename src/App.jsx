import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Pokédex</h1>

      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
