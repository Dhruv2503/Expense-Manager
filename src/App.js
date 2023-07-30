import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login"
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoutes";
import ForgetPassword from "./pages/auth/ForgetPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import CreateExpense from "./pages/CreateExpense";
import EditExpense from "./pages/EditExpense";
import DeleteExpense from "./pages/DeleteExpense"
import AuthProvider from "./Context/auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        
        <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-expense" element={<CreateExpense/>}/>
            <Route path="/edit-expense/:id" element={<EditExpense/>}/>
            <Route path="/delete-expense/:id" element={<DeleteExpense/>}/>
        </Route>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
