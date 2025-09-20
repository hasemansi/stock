// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import Register from './components/Auth/Register'
// import Login from './components/Auth/Login'
// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     // <Register />
//     <Login />
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Auth/Dashboard';

function App() {
  const handleFilter = (e) => {
    const value = e.target.value;
    console.log('Search input:', value); // You can handle filtering logic here
  };

  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;