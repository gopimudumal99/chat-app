import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Chart from "./Chart";
import Login from   './Login'

function App() {
  return (
    <div style={{fontFamily:'Avenir'}}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/chats" element={<Chart/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
