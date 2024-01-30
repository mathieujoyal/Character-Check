import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Globalstyles from "./Globalstyles"
import Homepage from "./Homepage"
import Header from "./Header"
import Calculator from "./Calculator"
import Encyclopedia from "./Encyclopedia"
import Login from "./Login"
import Signup from "./Signup"
import SheetMaker from "./SheetMaker"

const App = () => {

  return (
    <BrowserRouter>
      <Header/>
      <Globalstyles />
      <Routes>
        <Route path="/" element={<Homepage /> }/>
        <Route path="/calculator" element={<Calculator />}/>
        <Route path="/encyclopedia" element={<Encyclopedia />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/sheetmaker" element={<SheetMaker />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

