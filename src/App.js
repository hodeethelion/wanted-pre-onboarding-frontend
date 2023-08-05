import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signuppage from "./pages/Signuppage";
import Signinpage from "./pages/Signinpage";
import Todopage from "./pages/Todopage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
          <Route path="/todo" element={<Todopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
