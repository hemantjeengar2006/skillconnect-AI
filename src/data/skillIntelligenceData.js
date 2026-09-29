// SkillBridge AI - Skill Intelligence, Graphs, Mock Interviews, and Market Demand Data

export const liveIndustrySkillDemand = [
  {
    skill: "Python",
    domain: "Backend / AI",
    demandLevel: "High Demand",
    trend: "up",
    growth30d: "+34%",
    activeOpenings: 4820,
    topCompanies: ["TechCorp", "NextGen AI", "Infosys", "FinTech Pulse"],
    collegeWorkshopRecommendation: "Advanced Asynchronous Python & FastAPI Microservices",
    urgency: "high"
  },
  {
    skill: "React.js",
    domain: "Frontend",
    demandLevel: "High Demand",
    trend: "up",
    growth30d: "+42%",
    activeOpenings: 5600,
    topCompanies: ["CloudScale", "Zomato", "Swiggy", "TechCorp"],
    collegeWorkshopRecommendation: "Modern React 19, Hooks, & State Management Bootcamp",
    urgency: "high"
  },
  {
    skill: "Cloud & Docker",
    domain: "DevOps / Infra",
    demandLevel: "High Demand",
    trend: "up",
    growth30d: "+48%",
    activeOpenings: 3950,
    topCompanies: ["AWS Partner Hub", "CloudScale", "Microsoft", "TCS"],
    collegeWorkshopRecommendation: "Hands-on Containerization with Docker & Kubernetes Basics",
    urgency: "critical"
  },
  {
    skill: "SQL & Relational DB",
    domain: "Database",
    demandLevel: "High Demand",
    trend: "stable",
    growth30d: "+18%",
    activeOpenings: 6100,
    topCompanies: ["FinTech Pulse", "HDFC Tech", "TechCorp", "Accenture"],
    collegeWorkshopRecommendation: "Query Optimization, Indexing, and Schema Architecture",
    urgency: "medium"
  },
  {
    skill: "AI / LLM & NLP",
    domain: "AI / Data",
    demandLevel: "High Demand",
    trend: "up",
    growth30d: "+68%",
    activeOpenings: 2900,
    topCompanies: ["NextGen AI Labs", "OpenAI Ecosystem", "Google Cloud Partners"],
    collegeWorkshopRecommendation: "Practical Generative AI & Retrieval-Augmented Generation (RAG)",
    urgency: "high"
  },
  {
    skill: "Node.js & Express",
    domain: "Backend",
    demandLevel: "Growing",
    trend: "up",
    growth30d: "+26%",
    activeOpenings: 3400,
    topCompanies: ["CloudScale", "Razorpay", "Postman", "Startup Incubators"],
    collegeWorkshopRecommendation: "Building High-Throughput RESTful APIs & WebSockets",
    urgency: "medium"
  },
  {
    skill: "DSA & Problem Solving",
    domain: "Core CS",
    demandLevel: "Stable",
    trend: "stable",
    growth30d: "+12%",
    activeOpenings: 7200,
    topCompanies: ["Google", "Amazon", "Microsoft", "Oracle"],
    collegeWorkshopRecommendation: "Competitive Coding & Technical Interview Patterns",
    urgency: "medium"
  },
  {
    skill: "Django / FastAPI",
    domain: "Backend",
    demandLevel: "Growing",
    trend: "up",
    growth30d: "+29%",
    activeOpenings: 2200,
    topCompanies: ["TechCorp Solutions", "FinTech Pulse", "Swiggy"],
    collegeWorkshopRecommendation: "Production Django MVT & REST Framework Deployment",
    urgency: "high"
  }
];

export const skillGraphData = {
  "Full Stack Developer": {
    category: "Software Engineering",
    description: "Complete end-to-end web architecture from reactive UI to scalable server databases.",
    nodes: [
      { id: "html_css", name: "HTML5 & CSS3", category: "Frontend Core", level: 90, status: "mastered", next: "react" },
      { id: "js", name: "Modern JavaScript (ES6+)", category: "Frontend Core", level: 75, status: "mastered", next: "react" },
      { id: "react", name: "React.js Framework", category: "Frontend Framework", level: 55, status: "in-progress", next: "state_mgmt", recommended: true },
      { id: "state_mgmt", name: "State Mgmt & Context", category: "Frontend Advanced", level: 40, status: "learning", next: "node" },
      { id: "node", name: "Node.js Runtime", category: "Backend Core", level: 35, status: "learning", next: "express" },
      { id: "express", name: "Express & REST APIs", category: "Backend Framework", level: 30, status: "gap", next: "mongodb", recommended: true },
      { id: "mongodb", name: "MongoDB & Mongoose", category: "Database", level: 25, status: "gap", next: "docker" },
      { id: "docker", name: "Docker & CI/CD", category: "DevOps", level: 10, status: "gap", next: "cloud" },
      { id: "cloud", name: "Cloud Deployment (AWS/Vercel)", category: "DevOps", level: 15, status: "gap", next: null }
    ]
  },
  "Python Developer": {
    category: "Backend & Systems",
    description: "Robust server-side logic, high-throughput microservices, and database optimization.",
    nodes: [
      { id: "py_core", name: "Python Core & OOP", category: "Language Core", level: 85, status: "mastered", next: "sql" },
      { id: "sql", name: "Relational SQL & RDBMS", category: "Database", level: 72, status: "mastered", next: "django" },
      { id: "git", name: "Git & Version Control", category: "Dev Tools", level: 68, status: "mastered", next: "rest_api" },
      { id: "django", name: "Django MVT & ORM", category: "Backend Framework", level: 20, status: "gap", next: "drf", recommended: true },
      { id: "rest_api", name: "RESTful API Architecture", category: "API Design", level: 35, status: "learning", next: "drf", recommended: true },
      { id: "drf", name: "Django REST Framework (DRF)", category: "API Framework", level: 15, status: "gap", next: "docker" },
      { id: "docker", name: "Docker Containers", category: "DevOps", level: 10, status: "gap", next: "celery" },
      { id: "celery", name: "Async Queues (Celery/Redis)", category: "Distributed Systems", level: 5, status: "gap", next: null }
    ]
  },
  "AI & Data Science": {
    category: "Data & Artificial Intelligence",
    description: "Data wrangling, statistical analytics, machine learning pipelines, and LLM integrations.",
    nodes: [
      { id: "py_ai", name: "Python for Data Analysis", category: "Language Core", level: 85, status: "mastered", next: "pandas" },
      { id: "pandas", name: "Pandas & NumPy", category: "Data Manipulation", level: 65, status: "in-progress", next: "viz" },
      { id: "viz", name: "Data Visualization (Matplotlib/Seaborn)", category: "Visualization", level: 60, status: "in-progress", next: "stats" },
      { id: "stats", name: "Applied Statistics & Probability", category: "Math & Analytics", level: 50, status: "learning", next: "ml" },
      { id: "ml", name: "Machine Learning (Scikit-Learn)", category: "AI Modeling", level: 30, status: "gap", next: "nlp", recommended: true },
      { id: "nlp", name: "NLP & LLM Prompt Engineering", category: "Advanced AI", level: 20, status: "gap", next: "deployment" },
      { id: "deployment", name: "ML Model Deployment (FastAPI)", category: "Production AI", level: 15, status: "gap", next: null }
    ]
  }
};

export const projectSkillMappings = [
  {
    projectId: "p1",
    projectTitle: "Smart City Traffic Analytics",
    detectedTech: ["Python", "Flask", "SQLite", "Leaflet.js", "REST API"],
    extractedSkills: [
      { name: "Python", confidence: "Strong", evidence: "Backend routes, traffic computation algorithms" },
      { name: "SQLite & SQL", confidence: "Strong", evidence: "Relational database schema and indexed queries" },
      { name: "REST API", confidence: "Moderate", evidence: "JSON data endpoints for frontend telemetry" },
      { name: "Data Visualization", confidence: "Moderate", evidence: "Heatmap coordinates and congestion charts" }
    ],
    careerMatchContribution: [
      { role: "Python Backend Developer", fitScore: "+28% Evidence Boost" },
      { role: "Data Analyst Trainee", fitScore: "+22% Evidence Boost" },
      { role: "Full Stack Developer", fitScore: "+15% Evidence Boost" }
    ]
  },
  {
    projectId: "p2",
    projectTitle: "Campus Resource Booking Portal",
    detectedTech: ["HTML5", "CSS3", "JavaScript", "Python API", "Authentication"],
    extractedSkills: [
      { name: "HTML & CSS", confidence: "Strong", evidence: "Responsive flexbox grid, clean UI forms" },
      { name: "JavaScript", confidence: "Moderate", evidence: "DOM manipulation and AJAX asynchronous calls" },
      { name: "Authentication Basics", confidence: "Moderate", evidence: "Session login, role-based role gatekeeping" }
    ],
    careerMatchContribution: [
      { role: "Full Stack Web Developer", fitScore: "+25% Evidence Boost" },
      { role: "Frontend Developer", fitScore: "+30% Evidence Boost" }
    ]
  }
];

export const mockInterviewQuestionsByRole = {
  "Python Developer": [
    {
      id: "q1",
      topic: "Core OOP & Python Architecture",
      question: "Explain the difference between Python Lists and Tuples. When would you strictly prefer a Tuple over a List in a backend system?",
      keyPoints: ["Mutability differences", "Memory allocation and hashing", "Tuples as dictionary keys or immutable config"],
      idealAnswer: "Lists are mutable sequences suitable for collections that grow or shrink. Tuples are immutable, consume less memory, and are hashable (can be used as dictionary keys). In backend architectures, tuples are preferred for immutable database records, coordinate pairs, or security configuration keys to prevent accidental mutation."
    },
    {
      id: "q2",
      topic: "Django & Database Optimization",
      question: "What is the N+1 query problem in Django ORM and how do you resolve it using select_related vs prefetch_related?",
      keyPoints: ["N+1 performance issue", "select_related for ForeignKey/OneToOne (SQL JOIN)", "prefetch_related for ManyToMany/Reverse (separate IN queries)"],
      idealAnswer: "The N+1 problem occurs when fetching N parent records causes N additional SQL queries when accessing related objects. select_related creates a single SQL JOIN for single-valued relationships (ForeignKey, OneToOne). prefetch_related executes a separate query with an IN clause for multi-valued relationships (ManyToMany, Reverse ForeignKey) and joins them in Python memory."
    },
    {
      id: "q3",
      topic: "REST API & HTTP Architecture",
      question: "Explain the idempotency of HTTP methods (GET, POST, PUT, DELETE, PATCH). Why is POST not considered idempotent?",
      keyPoints: ["Definition of Idempotency", "Safety vs Idempotency", "POST creates new resources on repeated calls"],
      idealAnswer: "An HTTP method is idempotent if executing it multiple times yields the exact same side-effect on the server as a single execution. GET, PUT, and DELETE are idempotent. POST is not idempotent because repeating the request creates duplicate resources (e.g., duplicate order IDs or user rows)."
    },
    {
      id: "q4",
      topic: "Practical Engineering & Debugging",
      question: "Describe your project 'Smart City Traffic Analytics'. What was the biggest architectural bottleneck you faced and how did you resolve it?",
      keyPoints: ["Problem formulation", "Technical decision making", "Performance optimization or query tuning"],
      idealAnswer: "In the Smart City project, telemetry data from multiple vehicle sensors generated rapid SQLite write locks. We resolved this by batching sensor inputs in an in-memory queue and executing bulk-insert transactions every 5 seconds, reducing database lock contention by 80%."
    }
  ],
  "Full Stack Developer": [
    {
      id: "fs-1",
      topic: "React Component Lifecycle & Hooks",
      question: "How does the React Virtual DOM work, and why does mutating state directly bypass reconciliation?",
      keyPoints: ["Diffing algorithm", "Immutability principle", "Shallow comparison triggering re-render"],
      idealAnswer: "React maintains a lightweight Virtual DOM in memory. When state updates, React builds a new Virtual tree, diffs it against the previous tree (reconciliation), and commits minimal batch updates to the real DOM. Mutating state directly keeps reference identical, causing shallow equality checks to skip re-renders."
    },
    {
      id: "fs-2",
      topic: "Node.js Event Loop & Concurrency",
      question: "Explain the Node.js Event Loop phases (Timers, Poll, Check) and how non-blocking I/O allows high throughput despite single-threading.",
      keyPoints: ["Single thread call stack", "libuv thread pool", "Event loop phases: timers, I/O polling, setImmediate"],
      idealAnswer: "Node.js runs Javascript code on a single thread call stack, but offloads blocking operations (file I/O, database calls, network) to the C++ libuv thread pool. When the asynchronous operation finishes, its callback is enqueued into the event loop phases (Timers, Poll, Check) to be processed when the call stack clears."
    },
    {
      id: "fs-3",
      topic: "State Management & API Caching",
      question: "What is the difference between client-side state (React Context/Zustand) and server-side cache (React Query/SWR)?",
      keyPoints: ["UI state vs asynchronous remote data", "Automatic re-fetching, deduplication, cache invalidation"],
      idealAnswer: "Client state handles synchronous UI toggles (modals, dark mode, active tab), whereas server state represents asynchronous external databases. Tools like React Query handle deduplication, background re-validation, loading states, and automatic cache invalidation that manual context would bloat."
    }
  ]
};

export const collegeHeatmapMatrix = {
  departments: ["BCA", "B.Tech CSE", "MCA", "B.Sc IT", "Data Science"],
  skills: [
    { id: "python", name: "Python Core" },
    { id: "react", name: "React.js" },
    { id: "cloud", name: "Cloud & Docker" },
    { id: "sql", name: "SQL & Databases" },
    { id: "aiml", name: "AI & Machine Learning" },
    { id: "dsa", name: "Data Structures (DSA)" },
    { id: "rest", name: "REST APIs" }
  ],
  matrix: {
    BCA: {
      python: { score: 85, status: "green", studentsTested: 120 },
      react: { score: 43, status: "red", studentsTested: 110, urgentTraining: true },
      cloud: { score: 38, status: "red", studentsTested: 95, urgentTraining: true },
      sql: { score: 72, status: "green", studentsTested: 130 },
      aiml: { score: 51, status: "yellow", studentsTested: 80 },
      dsa: { score: 49, status: "yellow", studentsTested: 115 },
      rest: { score: 45, status: "red", studentsTested: 105, urgentTraining: true }
    },
    "B.Tech CSE": {
      python: { score: 82, status: "green", studentsTested: 450 },
      react: { score: 56, status: "yellow", studentsTested: 420 },
      cloud: { score: 52, status: "yellow", studentsTested: 390 },
      sql: { score: 79, status: "green", studentsTested: 460 },
      aiml: { score: 64, status: "green", studentsTested: 380 },
      dsa: { score: 68, status: "green", studentsTested: 470 },
      rest: { score: 62, status: "yellow", studentsTested: 410 }
    },
    MCA: {
      python: { score: 75, status: "green", studentsTested: 150 },
      react: { score: 48, status: "red", studentsTested: 140, urgentTraining: true },
      cloud: { score: 44, status: "red", studentsTested: 135, urgentTraining: true },
      sql: { score: 80, status: "green", studentsTested: 155 },
      aiml: { score: 54, status: "yellow", studentsTested: 120 },
      dsa: { score: 58, status: "yellow", studentsTested: 145 },
      rest: { score: 50, status: "yellow", studentsTested: 138 }
    },
    "B.Sc IT": {
      python: { score: 68, status: "yellow", studentsTested: 90 },
      react: { score: 35, status: "red", studentsTested: 85, urgentTraining: true },
      cloud: { score: 30, status: "red", studentsTested: 80, urgentTraining: true },
      sql: { score: 70, status: "green", studentsTested: 92 },
      aiml: { score: 40, status: "red", studentsTested: 70, urgentTraining: true },
      dsa: { score: 42, status: "red", studentsTested: 88, urgentTraining: true },
      rest: { score: 38, status: "red", studentsTested: 82, urgentTraining: true }
    },
    "Data Science": {
      python: { score: 92, status: "green", studentsTested: 110 },
      react: { score: 38, status: "red", studentsTested: 95, urgentTraining: true },
      cloud: { score: 58, status: "yellow", studentsTested: 100 },
      sql: { score: 84, status: "green", studentsTested: 112 },
      aiml: { score: 82, status: "green", studentsTested: 115 },
      dsa: { score: 62, status: "yellow", studentsTested: 108 },
      rest: { score: 54, status: "yellow", studentsTested: 102 }
    }
  }
};

export const studentCareerTimelineMilestones = [
  {
    id: "m1",
    date: "March 2026",
    title: "AI Mock Technical Interview Completed",
    type: "Assessment",
    category: "Verified",
    description: "Completed Python Backend Developer Simulator with 84% Technical Understanding score. Verified by AI Skill Engine.",
    badge: "84% Score",
    status: "Completed"
  },
  {
    id: "m2",
    date: "February 2026",
    title: "Resume Extracted & AI Skill Profile Generated",
    type: "Profile",
    category: "Milestone",
    description: "Uploaded Rahul_Sharma_BCA_Resume.pdf. Extracted 6 technical skills and 2 real-world projects with evidence mapping.",
    badge: "Profile 78% Ready",
    status: "Completed"
  },
  {
    id: "m3",
    date: "January 2026",
    title: "Relational Database Design with SQL Certification",
    type: "Certification",
    category: "Credential",
    description: "Certified by Infosys Springboard (Credential INF-SQL-5421). Demonstrated proficiency in schema normalization and query optimization.",
    badge: "Verified Credential",
    status: "Completed"
  },
  {
    id: "m4",
    date: "November 2025",
    title: "Smart City Traffic Analytics Project Shipped",
    type: "Project",
    category: "Portfolio",
    description: "Built full-stack Python & Flask municipal analytics dashboard with SQLite integration and live telemetry visualization.",
    badge: "Evidence: Strong",
    status: "Completed"
  },
  {
    id: "m5",
    date: "Upcoming (April 2026)",
    title: "Docker & Cloud Microservices Milestone",
    type: "Roadmap",
    category: "Goal",
    description: "Targeting containerization of Flask API and deployment to cloud infrastructure to unlock 4 additional high-stipend internships.",
    badge: "Priority Goal",
    status: "In Progress"
  }
];
