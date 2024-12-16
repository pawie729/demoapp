import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './domains/Home';
import Admin from './domains/admin/Admin';

export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

