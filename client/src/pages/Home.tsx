import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Braces,
  Check,
  ChevronDown,
  ChevronRight,
  Cpu,
  ExternalLink,
  Github,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  PenTool,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Twitter,
  Workflow,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { site } from "@/data/site";
import { trpc } from "@/lib/trpc";

const iconMap: Record<string, typeof Globe2> = {
  globe: Globe2,
  mobile: MonitorSmartphone,
  spark: Sparkles,
  layers: Layers3,
  pen: PenTool,
  chart: BarChart3,
  cpu: Cpu,
  zap: Zap,
};

const categoryIcons = [Globe2, MonitorSmartphone, Sparkles, Cpu];
const navItems = ["Services", "Solutions", "Work", "Process", "About", "Contact"];
const projectTypeOptions = ["Website", "Mobile App", "AI Solution", "Business Software", "Dashboard", "IoT / Smart Technology", "Automation", "UI/UX Design", "Other"];

function Reveal({ children, className = "", delay = "" }: { children: React.ReactNode; className?: string; delay?: string }) {
  return <div className={`reveal ${delay} ${className}`}>{children}</div>;
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="mb-7 flex items-center gap-3 eyebrow"><span className="text-white/35">{index}</span><span className="h-px w-8 bg-cyan-300/50" />{children}</div>;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-200/50 bg-cyan-200/10 text-lg text-cyan-200 shadow-[0_0_24px_rgba(85,231,227,.12)]">{site.brand.logoMark}</span>{!compact && <span className="text-sm font-extrabold tracking-[-.02em] text-white">{site.brand.name}</span>}</div>;
}

function HeroVisual() {
  return (
    <div className="device-stage" aria-label="Abstract digital product ecosystem illustration">
      <div className="hero-line" style={{ top: "18%", left: "2%", width: "84%" }} />
      <div className="hero-line" style={{ top: "76%", left: "19%", width: "74%", animationDelay: "1.2s" }} />
      <div className="absolute left-[18%] top-[8%] h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_#55e7e3]" />
      <div className="device-panel main">
        <div className="panel-top"><span className="mono text-[9px] text-slate-400">PRODUCT / OVERVIEW</span><span className="panel-dot" /></div>
        <div className="flex items-center justify-between px-5 pt-5"><div><p className="mono text-[9px] text-cyan-200/70">SYSTEM HEALTH</p><p className="mt-2 text-3xl font-bold tracking-[-.08em] text-white">98.4<span className="text-base text-cyan-200">%</span></p></div><div className="rounded-full border border-cyan-200/20 px-3 py-1 font-mono text-[9px] text-cyan-200">LIVE</div></div>
        <div className="signal-bars"><span style={{ height: "38%" }} /><span style={{ height: "54%" }} /><span style={{ height: "47%" }} /><span style={{ height: "78%" }} /><span style={{ height: "62%" }} /><span style={{ height: "91%" }} /><span style={{ height: "70%" }} /><span style={{ height: "100%" }} /></div>
        <div className="interface-lines"><i /><i /><i /></div>
      </div>
      <div className="device-panel phone"><div className="phone-screen"><div className="flex items-center justify-between"><span className="h-1.5 w-10 rounded-full bg-white/30" /><span className="h-2 w-2 rounded-full bg-cyan-200" /></div><div className="phone-orb" /><p className="mono text-center text-[8px] text-white/70">IDEA → PRODUCT</p><div className="mt-7 grid gap-2"><span className="h-2 rounded-full bg-white/15" /><span className="h-2 w-3/4 rounded-full bg-cyan-200/35" /><span className="h-2 w-1/2 rounded-full bg-white/15" /></div></div></div>
      <div className="device-panel floating"><div className="float-chip"><span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_#55e7e3]" />AI / AUTOMATION</div><div className="mx-4 h-px bg-cyan-200/20" /><div className="px-4 py-4"><div className="flex items-end gap-1.5"><span className="h-4 w-2 rounded-full bg-cyan-200/40" /><span className="h-7 w-2 rounded-full bg-cyan-200/70" /><span className="h-11 w-2 rounded-full bg-cyan-200" /><span className="h-8 w-2 rounded-full bg-cyan-200/70" /><span className="h-14 w-2 rounded-full bg-cyan-200" /></div></div></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeNav, setActiveNav] = useState("Home");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const inquiry = trpc.inquiries.create.useMutation();
  const [, setLocation] = useLocation();
  const caseStudyFilters = ["ALL", "WEB", "MOBILE", "AI", "BUSINESS", "IOT", "AUTOMATION"];
  const filteredProjects = activeFilter === "ALL" ? site.projects : site.projects.filter((project) => project.filter === activeFilter);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "services", "solutions", "work", "process", "about", "contact"];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(visible.target.id === "home" ? "Home" : visible.target.id.charAt(0).toUpperCase() + visible.target.id.slice(1));
    }, { rootMargin: "-25% 0px -60%" });
    sectionIds.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    inquiry.mutate({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      company: String(form.get("company") ?? ""),
      projectType: String(form.get("projectType") ?? ""),
      budget: String(form.get("budget") ?? ""),
      timeline: String(form.get("timeline") ?? ""),
      description: String(form.get("description") ?? ""),
      reference: String(form.get("reference") ?? ""),
      preferredContact: String(form.get("preferredContact") ?? "Email"),
      website: String(form.get("website") ?? ""),
    }, {
      onSuccess: () => { setSubmitted(true); toast.success("Your project request is on its way."); },
      onError: () => toast.error("We could not send that just now. Please try again or use email."),
    });
  };

  return (
    <div className="site-shell noise">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "nav-glass" : ""}`}>
        <div className="container-wide flex h-[76px] items-center justify-between">
          <button onClick={() => scrollTo("home")} aria-label="Go to homepage"><BrandMark /></button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            <button className={`text-xs transition-colors ${activeNav === "Home" ? "text-white" : "text-slate-400 hover:text-white"}`} onClick={() => scrollTo("home")}>Home</button>
            {navItems.map((item) => <button key={item} className={`text-xs transition-colors ${activeNav === item ? "text-white" : "text-slate-400 hover:text-white"}`} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}
          </nav>
          <button onClick={() => scrollTo("contact")} className="btn-primary hidden sm:inline-flex">Start a project <ArrowUpRight size={15} /></button>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-200 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menuOpen && <div className="nav-glass absolute inset-x-0 top-[76px] border-t border-white/10 px-6 py-5 lg:hidden"><div className="container-wide grid gap-4">{["Home", ...navItems].map((item) => <button key={item} className="py-2 text-left text-sm text-slate-200" onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}<button onClick={() => scrollTo("contact")} className="btn-primary mt-2 justify-center">Start a project <ArrowUpRight size={15} /></button></div></div>}
      </header>

      <main>
        <section id="home" className="relative min-h-[820px] overflow-hidden border-b border-white/[.06] pt-36 lg:min-h-[900px] lg:pt-48">
          <div className="grid-bg absolute inset-0" /><div className="hero-orb" /><div className="absolute -left-64 top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />
          <div className="container-wide relative grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div className="max-w-[700px]">
              <Reveal><div className="mb-7 flex items-center gap-3 eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_13px_#55e7e3]" />{site.hero.eyebrow}</div></Reveal>
              <Reveal delay="delay-1"><h1 className="display max-w-[720px] text-white">{site.hero.title.map((line) => <span className="block" key={line}>{line}{line === "real products." && <span className="text-cyan-200">.</span>}</span>)}</h1></Reveal>
              <Reveal delay="delay-2"><p className="body-copy mt-8 max-w-[520px] text-[16px]">{site.hero.body}</p></Reveal>
              <Reveal delay="delay-3"><div className="mt-9 flex flex-wrap items-center gap-3"><button onClick={() => scrollTo("contact")} className="btn-primary">Start your project <ArrowRight size={16} /></button><button onClick={() => scrollTo("work")} className="btn-ghost">See our work <ArrowDownRight size={16} /></button></div></Reveal>
              <Reveal delay="delay-3"><div className="mt-16 flex items-center gap-4 text-[10px] text-slate-500"><span className="h-px w-10 bg-cyan-200/50" /><span className="mono">ONE TEAM • MULTIPLE SKILLS • ONE GOAL</span></div></Reveal>
            </div>
            <Reveal className="lg:pl-4" delay="delay-2"><HeroVisual /></Reveal>
          </div>
          <div className="container-wide absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center justify-between text-[10px] text-slate-500"><span className="mono">SCROLL TO EXPLORE</span><span className="flex items-center gap-2 font-mono text-cyan-200/60"><span className="h-1.5 w-1.5 rounded-full bg-cyan-200" /> AVAILABLE FOR NEW PROJECTS</span></div>
        </section>

        <section className="section-tight border-b border-white/[.06] bg-[#090f1b]">
          <div className="container-wide"><Reveal><SectionLabel index="02">A clear starting point</SectionLabel><div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end"><h2 className="section-title max-w-[650px] text-white">What can we build <span className="text-cyan-200">for you?</span></h2><p className="body-copy max-w-[360px]">You do not need to know the technical answer. Start with the problem. We will help you find the right product.</p></div></Reveal><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["Websites", "Mobile apps", "AI & automation", "Smart technology"].map((title, index) => { const Icon = categoryIcons[index]; return <Reveal key={title} delay={`delay-${(index % 3) + 1}`}><button onClick={() => scrollTo("contact")} className="glass-card glass-card-hover group flex min-h-[188px] w-full flex-col justify-between p-6 text-left"><div className="flex items-center justify-between"><span className="icon-box"><Icon size={19} strokeWidth={1.6} /></span><ArrowUpRight size={17} className="text-slate-600 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-200" /></div><div><h3 className="text-xl font-bold tracking-[-.04em] text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-400">{site.services[index === 2 ? 2 : index === 3 ? 6 : index].summary}</p></div></button></Reveal>; })}</div></div>
        </section>

        <section id="solutions" className="section border-b border-white/[.06]">
          <div className="container-wide"><Reveal><SectionLabel index="03">From unclear to actionable</SectionLabel><div className="grid gap-8 md:grid-cols-[1fr_.72fr] md:items-end"><h2 className="section-title max-w-[680px] text-white">You bring the idea.<br /><span className="text-slate-500">We handle the technology.</span></h2><p className="body-copy max-w-[350px]">A good project starts with a conversation in plain language. Here is what that transformation can look like.</p></div></Reveal><div className="mt-14 grid gap-3">{site.problems.map(([problem, solution, detail], index) => <Reveal key={problem} delay={`delay-${(index % 3) + 1}`}><div className="problem-flow glass-card px-5 py-5 sm:px-7"><div className="flex items-center gap-4"><span className="mono text-[10px] text-slate-600">0{index + 1}</span><p className="text-sm text-slate-200">{problem}</p></div><div className="flow-arrow"><ArrowRight size={15} /></div><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-bold text-cyan-200">{solution}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><Check size={16} className="shrink-0 text-cyan-200/70" /></div></div></Reveal>)}</div></div>
        </section>

        <section id="services" className="section border-b border-white/[.06] bg-[#090f1b]">
          <div className="container-wide"><Reveal><SectionLabel index="04">The capability underneath</SectionLabel><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="section-title text-white">What we <span className="text-cyan-200">do.</span></h2><p className="body-copy max-w-[390px]">One team for the moments where strategy, design and technology need to work together.</p></div></Reveal><div className="mt-14 grid gap-3 md:grid-cols-2">{site.services.map((service) => { const Icon = iconMap[service.icon]; return <Reveal key={service.number}><article className="glass-card glass-card-hover group relative overflow-hidden p-6 sm:p-7"><div className="flex items-start justify-between"><div className="icon-box"><Icon size={20} strokeWidth={1.6} /></div><span className="mono text-[10px] text-slate-600">{service.number}</span></div><h3 className="mt-8 text-xl font-bold tracking-[-.04em] text-white">{service.title}</h3><p className="mt-3 max-w-[360px] text-sm leading-7 text-slate-400">{service.summary}</p><div className="mt-7 flex items-center justify-between border-t border-white/[.08] pt-4"><span className="text-xs text-slate-500">{service.useCase}</span><button onClick={() => scrollTo("contact")} className="flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-[.08em] text-cyan-200 opacity-70 transition-opacity group-hover:opacity-100">Learn more <ChevronRight size={15} /></button></div></article></Reveal>; })}</div></div>
        </section>

        <section className="section border-b border-white/[.06]">
          <div className="container-wide"><Reveal><SectionLabel index="05">The outcome for you</SectionLabel><div className="grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-start"><h2 className="section-title text-white">What does this<br /><span className="text-cyan-200">mean for you?</span></h2><div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">{site.benefits.map(([title, detail], index) => <div key={title} className="border-l border-cyan-200/25 pl-5"><p className="mono text-[10px] text-cyan-200/80">0{index + 1}</p><h3 className="mt-3 text-base font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p></div>)}</div></div></Reveal></div>
        </section>

        <section id="work" className="section border-b border-white/[.06] bg-[#090f1b]">
          <div className="container-wide"><Reveal><SectionLabel index="06">Problems understood. Solutions designed. Products built.</SectionLabel><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="eyebrow">Case studies</p><h2 className="section-title mt-4 text-white">See how ideas become <span className="text-cyan-200">practical solutions.</span></h2><p className="body-copy mt-5 max-w-[560px]">Every project starts with a problem, requirement or idea. We understand the need, plan the solution, build the product and improve it through testing and feedback.</p></div><span className="mono text-[10px] text-slate-500">PROJECTS / CONCEPTS / DEMOS</span></div></Reveal><Reveal><div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter case studies">{caseStudyFilters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 font-mono text-[10px] tracking-[.08em] transition-all ${activeFilter === filter ? "border-cyan-200/70 bg-cyan-200/10 text-cyan-100" : "border-white/10 text-slate-500 hover:border-cyan-200/40 hover:text-white"}`}>{filter}</button>)}</div></Reveal><div className="mt-8 grid gap-4 md:grid-cols-2">{filteredProjects.length === 0 ? <div className="glass-card col-span-full p-10 text-center text-sm text-slate-500">More case studies are being prepared for this category.</div> : filteredProjects.map((project) => <Reveal key={project.title}><article className="glass-card glass-card-hover overflow-hidden"><div className={`project-visual ${project.accent}`}><div className="visual-grid" /><span className="visual-kicker">{project.category} / {project.label}</span><div className="visual-beam" /><div className="absolute bottom-7 left-8 z-[2] text-3xl font-extrabold tracking-[-.08em] text-white/90">{project.icon === "shield" ? <ShieldCheck size={38} strokeWidth={1} /> : project.icon === "waves" ? <Workflow size={38} strokeWidth={1} /> : project.icon === "chart" ? <BarChart3 size={38} strokeWidth={1} /> : <Sparkles size={38} strokeWidth={1} />}</div></div><div className="p-6"><div className="flex items-center justify-between gap-4"><h3 className="text-xl font-bold tracking-[-.04em] text-white">{project.title}</h3><span className="mono shrink-0 text-[9px] text-cyan-200/70">{project.label}</span></div><p className="mt-3 text-sm leading-7 text-slate-400">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] text-slate-500">{tag}</span>)}</div><div className="mt-6 grid gap-3 border-t border-white/[.08] pt-5 text-xs leading-5"><div><span className="mono mr-2 text-[9px] text-slate-600">CHALLENGE</span><span className="text-slate-400">{project.problem}</span></div><div><span className="mono mr-2 text-[9px] text-slate-600">BUILT</span><span className="text-slate-400">{project.built}</span></div><div><span className="mono mr-2 text-[9px] text-slate-600">RESULT</span><span className="text-slate-400">{project.result}</span></div></div><button onClick={() => setLocation(`/case-studies/${project.slug}`)} className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.08em] text-cyan-200">View case study <ArrowUpRight size={14} /></button></div></article></Reveal>)}</div></div>
        </section>

        <section id="process" className="section border-b border-white/[.06]">
          <div className="container-wide"><Reveal><SectionLabel index="07">A calm, clear way to move forward</SectionLabel><div className="grid gap-8 md:grid-cols-[1fr_.78fr] md:items-end"><h2 className="section-title text-white">How we <span className="text-cyan-200">work.</span></h2><p className="body-copy max-w-[370px]">No black box. You know what is happening at every stage — from the first conversation to the handover.</p></div></Reveal><div className="process-track mt-16">{site.process.map(([number, title, detail]) => <Reveal key={number}><div className="process-step"><div className="process-node">{number}</div><h3 className="text-sm font-bold text-white">{title}</h3><p className="mx-auto mt-2 max-w-[120px] text-xs leading-5 text-slate-500">{detail}</p></div></Reveal>)}</div><Reveal><div className="mt-20 grid gap-3 sm:grid-cols-3"><div className="glass-card p-6"><p className="mono text-[10px] text-cyan-200">01 / SEND YOUR IDEA</p><p className="mt-4 text-sm leading-6 text-slate-300">Tell us what you need. You do not need a perfect plan.</p></div><div className="glass-card p-6"><p className="mono text-[10px] text-cyan-200">02 / WE DISCUSS IT</p><p className="mt-4 text-sm leading-6 text-slate-300">We ask the right questions and find the useful shape of the work.</p></div><div className="glass-card p-6"><p className="mono text-[10px] text-cyan-200">03 / YOU GET A PLAN</p><p className="mt-4 text-sm leading-6 text-slate-300">A clear next step before a line of code needs to be written.</p></div></div></Reveal></div>
        </section>

        <section id="about" className="section border-b border-white/[.06] bg-[#090f1b]">
          <div className="container-wide"><Reveal><SectionLabel index="08">Simple on the surface. Powerful underneath.</SectionLabel><div className="grid gap-12 md:grid-cols-[.84fr_1.16fr] md:items-start"><div><h2 className="section-title text-white">One team.<br /><span className="text-cyan-200">Many skills.</span></h2><p className="body-copy mt-7 max-w-[390px]">We bring the right mix of thinking, design and engineering to each project. The team structure stays flexible; the communication stays clear.</p><div className="mt-9 flex items-center gap-3"><div className="flex -space-x-2">{["C", "D", "A", "I"].map((letter) => <span key={letter} className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#090f1b] bg-gradient-to-br from-indigo-400/80 to-cyan-200/70 text-xs font-bold text-[#07101a]">{letter}</span>)}</div><span className="text-xs text-slate-400">Connected by the product, not a hierarchy.</span></div></div><div className="relative grid gap-3 sm:grid-cols-2">{site.team.map(([role, detail], index) => <div key={role} className="glass-card glass-card-hover p-5"><div className="mb-5 flex items-center justify-between"><span className="icon-box h-9 w-9 rounded-lg"><Braces size={16} /></span><span className="mono text-[9px] text-slate-600">0{index + 1}</span></div><h3 className="text-sm font-bold text-white">{role}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{detail}</p></div>)}</div></div></Reveal><Reveal><div className="mt-24 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[["Custom-built", "No off-the-shelf answers when your problem needs a better fit."], ["Client-focused", "The product should make sense to the person using it."], ["Clear communication", "We explain decisions in simple language."], ["Modern technology", "Current tools, chosen for practical reasons."], ["Flexible delivery", "A small project or a serious build — the approach adapts."], ["Ongoing support", "We remain available when the product needs its next step."]].map(([title, detail]) => <div key={title} className="flex gap-4 border-t border-white/[.1] py-5"><Check size={16} className="mt-1 shrink-0 text-cyan-200" /><div><h3 className="text-sm font-bold uppercase tracking-[.04em] text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{detail}</p></div></div>)}</div></Reveal></div>
        </section>

        <section className="section border-b border-white/[.06]">
          <div className="container-wide"><Reveal><SectionLabel index="09">The technology, when you want the detail</SectionLabel><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="section-title max-w-[670px] text-white">Built with <span className="text-cyan-200">modern technology.</span></h2><p className="body-copy max-w-[350px]">We lead with outcomes. Underneath, we use a dependable toolkit for products that need to work.</p></div></Reveal><Reveal><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[["Frontend", "React · Next.js · TypeScript · Tailwind CSS"], ["Backend", "Node.js · APIs · Python"], ["AI", "LLMs · AI APIs · Automation · RAG"], ["Database", "PostgreSQL · Supabase · Firebase"], ["Cloud", "Vercel · Cloud services · Deployment"], ["IoT", "ESP32 · Sensors · MQTT · Dashboards"]].map(([title, stack], index) => <div key={title} className="glass-card p-6"><span className="mono text-[10px] text-cyan-200/70">0{index + 1}</span><h3 className="mt-7 text-base font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{stack}</p></div>)}</div></Reveal></div>
        </section>

        <section className="section border-b border-white/[.06] bg-[#090f1b]">
          <div className="container-wide"><Reveal><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><SectionLabel index="10">Questions, made simple</SectionLabel><h2 className="section-title text-white">Good to <span className="text-cyan-200">know.</span></h2><p className="body-copy mt-6 max-w-[330px]">If your question is not here, send it anyway. A useful conversation is always a good place to start.</p></div><div className="grid gap-2">{site.faqs.map(([question, answer], index) => <div key={question} className="border-b border-white/[.1]"><button className="flex w-full items-center justify-between gap-4 py-5 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span className="text-sm font-bold text-white">{question}</span>{openFaq === index ? <ChevronDown size={17} className="shrink-0 text-cyan-200" /> : <Plus size={17} className="shrink-0 text-slate-500" />}</button>{openFaq === index && <p className="max-w-[640px] pb-5 pr-10 text-sm leading-7 text-slate-400">{answer}</p>}</div>)}</div></div></Reveal></div>
        </section>

        <section id="contact" className="section relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(91,124,255,.17),transparent_34%),radial-gradient(circle_at_15%_75%,rgba(85,231,227,.08),transparent_32%)]" />
          <div className="container-wide relative"><Reveal><SectionLabel index="11">A better first step</SectionLabel><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><h2 className="section-title text-white">Have an idea?<br /><span className="text-cyan-200">Let’s talk.</span></h2><p className="body-copy mt-7 max-w-[380px]">Tell us what you need. You do not need to know the technical details. Just explain your idea in simple words.</p><div className="mt-10 grid gap-4"><a className="flex items-center gap-4 text-sm text-slate-300 transition-colors hover:text-cyan-200" href={`mailto:${site.brand.email}`}><span className="icon-box h-10 w-10 rounded-lg"><Mail size={16} /></span>{site.brand.email}</a><a className="flex items-center gap-4 text-sm text-slate-300 transition-colors hover:text-cyan-200" href={`tel:${site.brand.phone}`}><span className="icon-box h-10 w-10 rounded-lg"><Phone size={16} /></span>{site.brand.phone}</a><a className="flex items-center gap-4 text-sm text-slate-300 transition-colors hover:text-cyan-200" href="#contact"><span className="icon-box h-10 w-10 rounded-lg"><MessageCircle size={16} /></span>{site.brand.whatsapp}</a></div></div><div className="glass-card p-5 sm:p-8">{submitted ? <div className="flex min-h-[530px] flex-col items-center justify-center text-center"><div className="grid h-16 w-16 place-items-center rounded-full border border-cyan-200/40 bg-cyan-200/10 text-cyan-200"><Check size={28} /></div><p className="eyebrow mt-8">REQUEST RECEIVED</p><h3 className="mt-4 text-3xl font-extrabold tracking-[-.06em] text-white">Thank you.<br />We’ve received your request.</h3><p className="body-copy mt-5 max-w-[350px]">We will review your requirements and contact you through the selected method.</p><button onClick={() => setSubmitted(false)} className="btn-ghost mt-8">Send another request</button></div> : <form onSubmit={handleSubmit} className="grid gap-5" aria-label="Project inquiry form"><div className="grid gap-5 sm:grid-cols-2"><label><span className="field-label">Name *</span><input required name="name" className="form-input" placeholder="Your name" /></label><label><span className="field-label">Email *</span><input required type="email" name="email" className="form-input" placeholder="you@company.com" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label><span className="field-label">Phone / WhatsApp</span><input name="phone" className="form-input" placeholder="How can we reach you?" /></label><label><span className="field-label">Company / business</span><input name="company" className="form-input" placeholder="Optional" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label><span className="field-label">What do you want to build? *</span><select required name="projectType" className="form-input"><option value="">Choose one</option>{projectTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><label><span className="field-label">Budget range</span><select name="budget" className="form-input"><option value="">Let’s discuss</option><option>Starter project</option><option>Business project</option><option>AI / smart project</option><option>Custom solution</option></select></label></div><div className="grid gap-5 sm:grid-cols-2"><label><span className="field-label">Expected timeline</span><select name="timeline" className="form-input"><option value="">Flexible</option><option>As soon as possible</option><option>1–2 months</option><option>3–6 months</option><option>Exploring an idea</option></select></label><label><span className="field-label">Preferred contact</span><select name="preferredContact" className="form-input"><option>Email</option><option>Phone</option><option>WhatsApp</option></select></label></div><label><span className="field-label">Tell us what you want the product to do. *</span><textarea required minLength={15} name="description" className="form-input min-h-[130px] resize-y" placeholder="A few sentences is enough to begin." /></label><label><span className="field-label">Reference link</span><input type="url" name="reference" className="form-input" placeholder="Optional website, sketch or inspiration" /></label><input tabIndex={-1} autoComplete="off" name="website" className="hidden" aria-hidden="true" /><div className="flex flex-col gap-4 border-t border-white/[.1] pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-[280px] text-xs leading-5 text-slate-500">Every project is different. Final pricing depends on scope, features, integrations and timeline.</p><button disabled={inquiry.isPending} className="btn-primary justify-center">{inquiry.isPending ? "Sending…" : "Send project request"} <Send size={15} /></button></div></form>}</div></div></Reveal></div>
        </section>

        <section className="relative overflow-hidden border-y border-white/[.06] bg-[#090f1b] py-28"><div className="absolute inset-0 grid-bg opacity-50" /><div className="container-wide relative text-center"><Reveal><p className="eyebrow">THE NEXT STEP IS SIMPLE</p><h2 className="mx-auto mt-7 max-w-[950px] text-[clamp(3.4rem,9vw,8rem)] font-extrabold leading-[.86] tracking-[-.08em] text-white">Have an idea?<br /><span className="text-cyan-200">Let’s build it.</span></h2><p className="body-copy mx-auto mt-8 max-w-[420px]">You do not need the perfect plan. You just need the idea. We can help shape the rest.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><button onClick={() => scrollTo("contact")} className="btn-primary">Start your project <ArrowRight size={16} /></button><a href={`mailto:${site.brand.email}`} className="btn-ghost">Talk to us <Mail size={15} /></a></div></Reveal></div></section>
      </main>

      <footer className="bg-[#060a12] py-16"><div className="container-wide"><div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.7fr] md:gap-8"><div><BrandMark /><p className="body-copy mt-6 max-w-[350px] text-sm">{site.brand.description}</p><p className="mono mt-8 text-[10px] text-cyan-200/65">{site.brand.tagline}</p></div><div><p className="mono text-[10px] text-slate-500">EXPLORE</p><div className="mt-5 grid gap-3 text-sm text-slate-400">{["Services", "Work", "Process", "About", "Contact"].map((item) => <button key={item} className="text-left transition-colors hover:text-white" onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}</div></div><div><p className="mono text-[10px] text-slate-500">FOLLOW OUR WORK</p><div className="mt-5 grid gap-3 text-sm text-slate-400">{site.socials.slice(0, 4).map(([label, handle, href]) => <a key={label} href={href} onClick={(event) => href === "#" && event.preventDefault()} className="flex items-center gap-2 transition-colors hover:text-cyan-200"><span>{label}</span><ExternalLink size={12} /></a>)}</div></div></div><div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/[.08] pt-6 text-xs text-slate-600 sm:flex-row"><span>© {new Date().getFullYear()} {site.brand.name}. All rights reserved.</span><span>Built for ideas that deserve a real product.</span></div></div></footer>
    </div>
  );
}
