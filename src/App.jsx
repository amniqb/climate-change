import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Temperature from "./pages/Temperature/Temperature";
import CO2 from "./pages/CO2/CO2";
import Methane from "./pages/Methane/Methane";
import NitrousOxide from "./pages/NitrousOxide/NitrousOxide";
import Arctic from "./pages/Arctic/Arctic";

export default function App(){
  return ( 
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/temperature" element={<Temperature />} />
        <Route path="/co2" element={<CO2 />} />
        <Route path="/methane" element={<Methane />} />
        <Route path="/nitrous-oxide" element={<NitrousOxide />} />
        <Route path="/arctic" element={<Arctic />} />
      </Route>
    </Routes>
  );
}
