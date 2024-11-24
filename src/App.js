import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './component/List';
import Registration from './component/Add'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="list" element={<List />} ></Route>
        <Route path="add" element={<Registration />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
