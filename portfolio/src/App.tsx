import "./App.css";
import NavItem from "./components/NavItem";
import PageBox from "./components/PageBox";
import DownloadButton from "./components/DownloadButton";
import Button from "./components/Button";

function ScrollElementIntoView(elementID: string) {
  let elem = document.getElementById(elementID) as HTMLDivElement;

  if (elem) {
    elem.scrollIntoView({behavior: "smooth"});
  }
}

function App() {
  return (
    <>
      <div id="header" className="container mx-auto">
        <div className="navbar-nav navBar">
          <NavItem onClick={() => ScrollElementIntoView("home")}>Home</NavItem>
          <NavItem onClick={() => ScrollElementIntoView("about-me")}>About Me</NavItem>
          <NavItem onClick={() => ScrollElementIntoView("projects")}>Projects</NavItem>
          <NavItem onClick={() => ScrollElementIntoView("social-media")}>Social Media</NavItem>
        </div>
      </div>
      <div id="main">
        <PageBox title="Home">
          <h1>Welcome to my portfolio!</h1>
          <p>I am Cameron, a passionate software engineering student at Bournemouth University. Here, you'll find a showcase of my projects, skills, and experiences. Feel free to explore and connect with me through the social media links provided. Enjoy your visit!</p>
        </PageBox>
        <PageBox title="About Me">
          <h1>About Me</h1>
          <p>Hi! I'm Cameron, a Software Engineering student at Bournemouth University. I love tech and creating cool solutions to everyday problems. I've learned a lot about programming with Java, Python, and JavaScript, and I enjoy web development with HTML, CSS, React, and Node.js. I'm also familiar with Agile methods, Git, and database management with SQL and MongoDB. I believe in always learning and working together with others. My goal is to work on projects that make a difference and be part of a tech community that’s always pushing boundaries.</p>
          <DownloadButton fileDir="./CV/CV_Public.pdf" fileName="CV_Public.pdf">Download</DownloadButton>
        </PageBox>
        <PageBox title="Projects">
          <h1>Projects</h1>
          <p>Project details</p>
        </PageBox>
        <PageBox title="Social Media">
          <h1>Social Media</h1>
          <a href="https://www.linkedin.com/in/cameron-cartwright/" target="_blank">Linkedin</a>
          <br></br>
          <a href="https://github.com/Krone404" target="_blank">Github</a>
        </PageBox>
      </div>
      <div id="footer">Footer</div>
    </>
  );
}

export default App;