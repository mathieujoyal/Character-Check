import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Globalstyles from "./Globalstyles";
import Homepage from "./Homepage";
import Header from "./Header";
import Calculator from "./Calculator";
import Encyclopedia from "./Encyclopedia";

const App = () => {
  
  return (
    <BrowserRouter>
    <Globalstyles />
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage /> }/>
        <Route path="/calculator" element={<Calculator />}/>
        <Route path="/encyclopedia" element={<Encyclopedia />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
