import './App.css';
import { BrowserRouter, Route} from "react-router-dom"
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/Post.js";
import Footer from "./components/Footer.js";
import Background from "./components/Background.js";
import './styles/style.css';
import './images/waves.svg';



function App() {
  return (
    <BrowserRouter>
      <div className="curve waves">
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/:slug" />
        {Footer}
      </div>
    </BrowserRouter>
  );
}

export default App;
