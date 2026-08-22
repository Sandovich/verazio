export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "ai-native-not-ai-only",
    title: "AI-native doesn't mean AI-only",
    category: "Process",
    date: "2026-08-22",
    readTime: "5 min read",
    excerpt:
      "The timeline changed. The judgment calls didn't move an inch. Here's what actually gets faster when a studio builds this way, and what deliberately doesn't.",
    body: [
      "Every studio that touches AI in production gets asked some version of the same question, usually in the first five minutes of a call: \"so is this just going to be a prompt?\" It's a fair question, and the honest answer is no — but it deserves more than a denial.",
      "What actually changed for us is the cost of iteration. Building a first working draft of a hero section used to mean a day of a developer's time before anyone could react to it. Now it's closer to an hour. That compression is real, and it's the entire reason a 1-to-3-week timeline is possible instead of the 6-to-12 weeks a traditional agency budgets for the same scope.",
      "What didn't change is who decides whether that first draft is any good. AI is very good at producing a plausible layout, a plausible color system, plausible copy. Plausible is not the bar. The reason so much AI-assisted output reads as generic — the same ivory-and-terracotta palette, the same three-card feature grid, the same safe serif — is that nobody applied judgment after the generation step. They shipped the first plausible thing.",
      "Our process treats the AI-generated first pass the way a photographer treats a contact sheet: raw material, not the deliverable. Someone senior looks at it and asks the questions a client would ask — does this actually fit the brand, does this layout serve the actual buyer journey, would a real competitor's site make this look forgettable — and then the real work starts. Sometimes that's a light edit. Sometimes it's a full rebuild that keeps almost nothing from the first pass.",
      "The practical upshot for a client: you're not paying for a slower version of what a no-code AI site builder already does for free. You're paying for the speed of AI generation plus a senior editorial pass that a $20/month tool has no mechanism for. That combination is the actual product — not the AI on its own, and not senior judgment working at pre-AI speed either.",
    ],
  },
  {
    slug: "who-owns-what-ai-helped-build",
    title: "Who owns what you didn't fully make yourself",
    category: "Rights & Ethics",
    date: "2026-08-22",
    readTime: "6 min read",
    excerpt:
      "AI-assisted work raises a real question every serious client eventually asks: what exactly are we allowed to do with this afterward? Our answer, in plain terms.",
    body: [
      "This is the question we'd ask if we were the client, so we don't wait for it to come up: when part of a build involved AI tooling somewhere in the pipeline, what do you actually own at the end?",
      "The short answer is: all of it. Every project we deliver transfers full ownership of the final code, copy, and visual assets to the client on completion. There's no ongoing license fee, no clause that lets us reuse your specific design elsewhere, and no dependency on Verazio remaining involved for the site to keep working. If we vanished the day after delivery, you'd still own a working, portable asset.",
      "The more nuanced question is about the AI tools themselves — the models and platforms used during production, not the deliverable they helped produce. We don't train custom models on client material, and we don't feed confidential brief material into tools whose terms of service claim training rights over submitted content. That's a checklist we go through before a tool gets used on client work, not an afterthought.",
      "We're also direct about a limitation that's easy to gloss over: AI-generated visual and written material exists in a genuinely unsettled area of copyright law across different jurisdictions, and that's true industry-wide, not a Verazio-specific gap. Where it matters — a logo, a namable visual asset meant to be trademarked — we flag that explicitly during the brief stage rather than let a client assume a level of protection that may not exist yet. Better to have that conversation on day one than have it turn into a surprise a year later.",
      "None of this is a substitute for a client's own legal counsel on anything high-stakes. What we can promise is that we won't be the vague party in that conversation — you'll get a straight answer about what we used, how, and what's actually yours.",
    ],
  },
  {
    slug: "why-we-price-after-diagnose",
    title: "Why we quote a price after Diagnose, not before",
    category: "Process",
    date: "2026-08-22",
    readTime: "4 min read",
    excerpt:
      "A number on the phone before we understand the brief is a guess wearing a suit. Here's why we make you wait a few days for a real one.",
    body: [
      "Almost every first call ends with some version of \"so roughly what does this cost?\" We understand why — budgeting requires a number, and waiting is annoying. But a number given before we've actually understood the brief is a guess with a decimal point, and guesses given confidently are how projects end up over budget and behind schedule.",
      "Our process starts with Diagnose: we go through the actual goal, the buyer journey the site needs to support, what already exists that's usable, and what a realistic scope looks like. That step produces a written brief you approve — not a proposal PDF designed to look impressive, an actual scoped plan with pages, sections, and interactions listed out.",
      "The quote comes after that, and it's fixed once you approve it. Not an hourly estimate that creeps, not a range with the ceiling doing the real work. A number, attached to a specific scope, that doesn't move unless the scope does.",
      "The trade-off is that you wait a few days longer for a number than a studio that quotes off a five-minute call would give you. We think that's the right trade. A fast number that's wrong costs you more time in the long run — in scope disputes, in change orders, in a budget that turns out to have been fiction from the start — than a slower number that actually holds.",
    ],
  },
];
