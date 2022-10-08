import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import ContentDetail from './component/ContentDetail';
import Home from './component/home';





function App() {
  return (
    <div className="App">

<BrowserRouter>
        <Routes>
      
            <Route element={<Home/>} path="/" />
            <Route path="/content/:id" element={<ContentDetail/>}/>
        
        </Routes>
        </BrowserRouter>
      {/* </header> */}
    </div>
  )
}

export default App
