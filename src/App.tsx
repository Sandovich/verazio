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
import Team from "./Team";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Client-side route changes don't reset scroll position the way a full
    // page load does, so a navigation from deep in a long page (e.g. the
    // "Full portfolio" link from partway down the homepage) lands on the
    // new page at the old scroll offset instead of the top. Hash links are
    // left alone — Home's own effect (or the browser) handles those.
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
        <Route path="/ai-ethics" element={<AiEthics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
