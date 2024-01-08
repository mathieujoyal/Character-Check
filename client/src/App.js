import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Globalstyles from "./Globalstyles";
import Homepage from "./Homepage";
import Header from "./Header";

const App = () => {
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
