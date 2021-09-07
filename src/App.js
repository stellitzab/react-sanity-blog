import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route} from "react-router-dom"
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/Post.js";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/:slug" />
      </div>
    </BrowserRouter>
  );
}

export default App;
