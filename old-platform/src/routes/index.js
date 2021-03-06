import React from "react";
import {Route, Switch} from "react-router-dom";

import Bord from "./Bord/index";
import Catalog from "./Catalog/index";
import About from "./About/index";
import Home from "./HomePage/index";
import Blog from "./Blog/index";
import Formular from "./Formular/index";
import BlogPost from "../components/REAL/BlogPost";

const NoMatchPage = () => {
  return (
    <React.Fragment>
     <div style={{ fontSize: "15em", textAlign: "center", color: "black" }} >404</div>
     <p style={{ fontSize: "2em", textAlign: "center", color: "gray" }} >Construim cea mai mare colecție de date despre învățământ, dar din păcate nu am găsit ce căutai.</p>
    </React.Fragment>
  );
};

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
   <Switch>
      <Route path={`${match.url}home`} component={Home}/>
      <Route path={`${match.url}catalogue`} component={Catalog}/>
      <Route path={`${match.url}panel`} component={Bord}/>   
      <Route path={`${match.url}about`} component={About}/> 
      <Route path={`${match.url}blog`} component={Blog}/>  
      <Route path={`${match.url}blog/:slug`} component={BlogPost}/>  
      <Route path={`${match.url}form`} component={Formular}/> 
      <Route component={NoMatchPage} />
  </Switch>
  </div>
);

export default App;
