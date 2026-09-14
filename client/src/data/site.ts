export const site = {
  brand: {
    name: "[AGENCY NAME]",
    shortName: "[AGENCY]",
    tagline: "BUILD. INNOVATE. DELIVER.",
    description: "We turn ideas, problems and business requirements into practical digital products.",
    email: "[EMAIL ADDRESS]",
    phone: "[PHONE NUMBER]",
    whatsapp: "[WHATSAPP NUMBER]",
    location: "[LOCATION]",
    website: "[WEBSITE]",
    logoMark: "◒",
    colors: {
      electric: "#5b7cff",
      cyan: "#55e7e3",
      violet: "#a78bfa",
    },
  },
  hero: {
    eyebrow: "DIGITAL PRODUCT STUDIO / 01",
    title: ["We turn your", "ideas into", "real products."],
    body: "From websites and mobile apps to AI, automation, dashboards and smart technology, we build practical digital solutions around your goals.",
  },
  services: [
    { number: "01", title: "Web development", summary: "Modern, responsive websites and web applications.", useCase: "Launch a site that makes your business look as capable as it is.", icon: "globe" },
    { number: "02", title: "Mobile applications", summary: "Useful and engaging mobile applications for real users.", useCase: "Turn an app idea into a focused, testable product.", icon: "mobile" },
    { number: "03", title: "AI solutions", summary: "AI assistants, intelligent tools and data-driven features.", useCase: "Give your team a smarter way to search, support or decide.", icon: "spark" },
    { number: "04", title: "Business software", summary: "Custom systems that simplify daily work.", useCase: "Replace scattered spreadsheets and manual handoffs.", icon: "layers" },
    { number: "05", title: "UI/UX design", summary: "Simple, professional and easy-to-use digital experiences.", useCase: "Make complex products feel obvious from the first click.", icon: "pen" },
    { number: "06", title: "Dashboards & analytics", summary: "Data displayed clearly so businesses can make better decisions.", useCase: "See the signals that matter without digging through reports.", icon: "chart" },
    { number: "07", title: "IoT & smart technology", summary: "Connected devices, monitoring and hardware-software integration.", useCase: "Connect sensors, devices and insights into one useful system.", icon: "cpu" },
    { number: "08", title: "Automation", summary: "Reduce repetitive work with smart workflows.", useCase: "Give valuable hours back to your people.", icon: "zap" },
  ],
  problems: [
    ["I need a website.", "Website", "A clear digital home for your business."],
    ["I have an app idea.", "Mobile app", "A focused product your users can actually use."],
    ["I want to automate my work.", "Automation", "A smoother workflow with fewer manual steps."],
    ["I need a dashboard.", "Dashboard", "The right data, visible at the right moment."],
    ["I want to use AI.", "AI tool", "Practical intelligence built around your context."],
    ["I need a smart device.", "IoT system", "Connected hardware with a useful digital layer."],
  ],
  benefits: [
    ["Save time", "Reduce repetitive work and keep momentum."],
    ["Save effort", "Simplify complicated processes for your team."],
    ["Grow your business", "Create better digital experiences for customers."],
    ["Look professional", "Present your business with clarity and confidence."],
    ["Make better decisions", "Use dashboards and data you can understand."],
    ["Automate work", "Let technology handle the repeatable tasks."],
  ],
  projects: [
    { label: "CONCEPT", title: "CyberSentinel", category: "AI monitoring", description: "Suspicious network activity surfaced in a calm, actionable command center.", problem: "Security signals were hard to triage quickly.", built: "AI-assisted monitoring concept with a prioritised alert view.", result: "A clearer path from signal to response.", accent: "blue", icon: "shield" },
    { label: "PROTOTYPE", title: "Smart IOT Monitor", category: "Connected systems", description: "Real-time sensor data transformed into a useful operations view.", problem: "Device status lived in disconnected places.", built: "A monitoring dashboard with live device health and trends.", result: "One operational picture for the whole system.", accent: "cyan", icon: "waves" },
    { label: "DEMO", title: "AI Student Assistant", category: "AI product", description: "A focused learning companion designed around questions, context and progress.", problem: "Students needed support without adding more noise.", built: "An assistant flow that turns questions into next steps.", result: "A more confident path through difficult topics.", accent: "violet", icon: "spark" },
    { label: "CONCEPT", title: "Business Dashboard", category: "Data & decisions", description: "Business information brought together so teams can act with confidence.", problem: "Important numbers were scattered across tools.", built: "A role-aware dashboard with clear decision signals.", result: "Less searching. More useful conversations.", accent: "blue", icon: "chart" },
  ],
  process: [
    ["01", "Idea", "You tell us what you need."],
    ["02", "Discover", "We understand your requirements."],
    ["03", "Plan", "We decide what should be built."],
    ["04", "Design", "We create the user experience."],
    ["05", "Build", "We develop the solution."],
    ["06", "Test", "We check quality and performance."],
    ["07", "Launch", "We help you release it."],
    ["08", "Support", "We keep helping when needed."],
  ],
  team: [
    ["Project / client management", "We keep the work clear, focused and moving."],
    ["Frontend development", "Interfaces that feel natural on every screen."],
    ["Backend development", "Reliable systems underneath the experience."],
    ["UI/UX design", "Simple paths through complex ideas."],
    ["AI / ML", "Practical intelligence, not technology theatre."],
    ["Mobile & IoT", "Products that meet people in the real world."],
  ],
  faqs: [
    ["Do I need technical knowledge?", "No. Just explain what you want to achieve. We will help shape the technical path."],
    ["How do I start a project?", "Send your requirements through the project form and we will discuss the next steps."],
    ["Can you build a custom solution?", "Yes. Projects can be designed around your specific requirements, context and goals."],
    ["Do you work with small businesses?", "Yes. Solutions can be scaled according to the project and the problem you need to solve."],
    ["Can I request changes?", "Yes. The review and revision process is defined clearly before development begins."],
    ["How does pricing work?", "Pricing depends on scope, features, integrations and timeline. Every project is different."],
  ],
  socials: [
    ["Instagram", "[INSTAGRAM HANDLE]", "#"],
    ["LinkedIn", "[LINKEDIN URL]", "#"],
    ["GitHub", "[GITHUB URL]", "#"],
    ["YouTube", "[YOUTUBE URL]", "#"],
    ["X / Twitter", "[X URL]", "#"],
  ],
};

export type SiteConfig = typeof site;
export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
  reference?: string;
  preferredContact: string;
  website?: string;
};
