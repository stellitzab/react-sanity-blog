import './App.css';
import { BrowserRouter, Route} from "react-router-dom"
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/Post.js";
//import Footer from "./components/Footer.js";
//import Background from "./components/Background.js";
import './styles/style.css';
import './images/waves.svg';
//import AllPostsByAuthor from './components/AllPostsByAuthor';
import AuthorPage from './components/AuthorPage';
import AboutPage from './components/AboutPage';



function App() {
  return (
    <BrowserRouter>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/:slug" />
        <Route component={AuthorPage} path="/about/:name" />
        <Route component={AboutPage} path="/about" exact />
    </BrowserRouter>
  );
}

export default App;
