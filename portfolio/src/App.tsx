import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div id="header" className="container mx-auto">
        <div className="navbar-nav">
          <button className="navbar-item">Home</button>
          <button className="navbar-item">About Me</button>
          <button className="navbar-item">Projects</button>
          <button className="navbar-item">Social Media</button>
        </div>
        <div id="main" className="container mx-auto">
          <div id="about-me" className="container mx-auto">

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
