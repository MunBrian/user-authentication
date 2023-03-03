import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={(<HomePage />)}  />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    
  );
}

export default App;
