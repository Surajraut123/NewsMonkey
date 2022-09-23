
import './App.css';


//learning class based Components

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {

  state={
    progress :0
  }

  setProgress = (progress) => {
    this.setState({progress : progress})
  }

  //Render is a life cycle method, Render html content on screen
  render() {
    return (
      <div>
        {/* <NavBar/>
        <News setProgress={this.setProgress}  pageSize={6} country="in" category="sports"/> */}
        
        <Router>
            <NavBar/>
            <LoadingBar
              height={3}
              color='red'
              progress={this.state.progress}
            />
              <Routes>
                <Route exact path="/" element={<News setProgress={this.setProgress}   key="general" pageSize={9} country="in" category="general"/>}></Route>
                <Route exact path="/business" element={<News setProgress={this.setProgress}   key="business"pageSize={9} country="in" category="business"/>}></Route>
                <Route exact path="/entertainment" element={<News setProgress={this.setProgress}   key="entertainment"pageSize={9} country="in" category="entertainment"/>}></Route>
                <Route exact path="/general" element={<News setProgress={this.setProgress}   key="general"pageSize={9} country="in" category="general"/>}></Route>
                <Route exact path="/health" element={<News setProgress={this.setProgress}   key="health"pageSize={9} country="in" category="health"/>}></Route>
                <Route exact path="/science" element={<News setProgress={this.setProgress}   key="science"pageSize={9} country="in" category="science"/>}></Route>
                <Route exact path="/sports" element={<News setProgress={this.setProgress}   key="sports"pageSize={9} country="in" category="sports"/>}></Route>
                <Route exact path="/technology" element={<News setProgress={this.setProgress}   key="technology"pageSize={9} country="in" category="technology"/>}></Route>
              </Routes>
        </Router> 

      </div>
    )
  }
}
