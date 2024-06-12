import "./App.css";
import NavItem from "./components/NavItem";
import PageBox from "./components/PageBox";

function App() {
  return (
    <>
      <div id="main">
        <div id="header" className="container mx-auto">
          <div className="navbar-nav">
            <NavItem onClick={() => console.log("Home clicked")}>
              Home
            </NavItem>
            <NavItem onClick={() => console.log("Home clicked")}>
              About Me
            </NavItem>
            <NavItem onClick={() => console.log("Home clicked")}>
              Projects
            </NavItem>
            <NavItem onClick={() => console.log("Home clicked")}>
              Social Media
            </NavItem>
          </div>
        </div>
        <div id="body" className="container mx-auto">
          <PageBox title="Home">Home</PageBox>
          <PageBox title="About Me">About me</PageBox>
          <PageBox title="Projects">Projects</PageBox>
          <PageBox title="Social Media">Social media</PageBox>
        </div>
        <div id="footer">Footer</div>
      </div>
    </>
  );
}

export default App;
