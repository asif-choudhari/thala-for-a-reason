import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Search } from "./Search";
import { useState } from "react";

function App() {
  const [isThala, setIsThala] = useState(false);
  return (
    <div className={isThala ? 'thala' : undefined} style={{height: '100%'}}> 
      <Routes>
        <Route index path="/" element={<Search isThala={isThala} setIsThala={setIsThala} />} />
        <Route path="/search" element={<Search isThala={isThala} setIsThala={setIsThala} />} />
      </Routes>
    </div>
  );
}

export default App;
