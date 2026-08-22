import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Hero from "./Hero";
import Sections from "./Sections";
import Portfolio from "./Portfolio";
import CaseStudyPage from "./CaseStudy";
import AiEthics from "./AiEthics";
import Contact from "./Contact";
import Careers from "./Careers";
import Journal from "./Journal";
import JournalPost from "./JournalPost";

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Client-side navigation doesn't auto-scroll to a hash the way a full
    // page load does — wait a tick for the route's content to mount, then
    // scroll it into view ourselves.
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      return () => clearTimeout(t);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Sections />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/verazio">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
        <Route path="/ai-ethics" element={<AiEthics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
