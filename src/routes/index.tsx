import {
    Routes,
    Route,
    BrowserRouter,
  } from "react-router-dom";

import Home from "../pages/home";
import { MainLayout } from "../components/layout/mainLayout";
import CharacterDetails from "../pages/characterDetails";




  export default function AppRouter() {
    return (
      <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/character-details/:id" element={<CharacterDetails />} />
            </Route>
        </Routes>
      </BrowserRouter>
    );
  }