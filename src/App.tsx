import  Layout  from "./Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home";
import  NoteDetail  from "./pages/NoteDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { authRepository } from "./modules/auth/auth.repository";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    setSession();
  }, [])
  

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false)
  }

  if (isLoading) {
    return <div />
  }

  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Layout />}>
           <Route index element={<Home />}></Route>
           <Route path="/notes/:id" element={<NoteDetail />}></Route>
          </Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
