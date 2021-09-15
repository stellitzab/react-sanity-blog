import './App.css';
import { BrowserRouter, Route} from "react-router-dom"
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/Post.js";
//import Footer from "./components/Footer.js";
//import Background from "./components/Background.js";
import './styles/style.css';
import './images/waves.svg';
import AllPostsByAuthor from './components/AllPostsByAuthor';



function App() {
  return (
    <BrowserRouter>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/:slug" />
        <Route component={AllPostsByAuthor} path="/author" />
    </BrowserRouter>
  );
}

export default App;
