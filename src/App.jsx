import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader";
import { Suspense, lazy } from "react";


const Home = lazy(() => import("./pages/Home/Home"));
const Temperature = lazy(() => import("./pages/Temperature/Temperature"));
const CO2 = lazy(() => import("./pages/CO2/CO2"));
const Methane = lazy(() => import("./pages/Methane/Methane"));
const NitrousOxide = lazy(() => import("./pages/NitrousOxide/NitrousOxide"));
const Arctic = lazy(() => import("./pages/Arctic/Arctic"));

export default function App() {
  return (
    <Suspense fallback={<Loader label="Loading page..." />}>
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
    </Suspense>
  );
}