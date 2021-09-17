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



function App() {
  return (
    <BrowserRouter>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/:slug" />
        <Route component={AuthorPage} path="/author/:name" />
    </BrowserRouter>
  );
}

export default App;
