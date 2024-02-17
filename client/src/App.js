import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Globalstyles from "./Globalstyles"
import Homepage from "./Homepage"
import Header from "./Header"
import Calculator from "./Calculator"
import Encyclopedia from "./Encyclopedia"
import Login from "./Login"
import Register from "./Register"
import SheetMaker from "./SheetMaker"
import SheetLoader from "./SheetLoader"
import SheetUsing from "./SheetUsing"

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
        <Route path="/register" element={<Register />}/>
        <Route path="/sheetmaker" element={<SheetMaker />}/>
        <Route path="/sheetloader" element={<SheetLoader />}/>
        <Route path="/sheetUsing/:sheetId" element={<SheetUsing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

