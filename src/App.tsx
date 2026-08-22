import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import Sections from "./Sections";
import Portfolio from "./Portfolio";
import AiEthics from "./AiEthics";

function Home() {
  return (
    <>
      <Hero />
      <Sections />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/ai-ethics" element={<AiEthics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
