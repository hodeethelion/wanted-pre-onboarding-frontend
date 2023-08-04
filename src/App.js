import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signuppage from "./pages/Signuppage";
import Signinpage from "./pages/Signinpage";

function App() {
  return (
    <div className="App">
      <div style={{ fontWeight: 100, fontSize: 30 }}>App 시작</div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
