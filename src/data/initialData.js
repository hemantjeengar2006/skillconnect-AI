// Initial State and Mock Database for AI Academia-Industry Collaboration Portal

export const initialStudentData = {
  id: "std-101",
  name: "Rahul Sharma",
  email: "rahul.sharma@student.edu",
  phone: "+91 98765 43210",
  course: "BCA (Bachelor of Computer Applications)",
  department: "Computer Applications",
  semester: 5,
  rollNo: "BCA-2023-084",
  college: "Apex Institute of Technology & Science",
  cgpa: 8.4,
  location: "Bangalore, Karnataka",
  targetCareer: "Python Developer",
  summary: "Motivated 5th semester BCA student passionate about backend software engineering, databases, and building robust web APIs. Seeking an internship in Python development.",
  github: "https://github.com/rahul-sharma-dev",
  linkedin: "https://linkedin.com/in/rahul-sharma-tech",
  
  technicalSkills: [
    { name: "Python", level: "Advanced", score: 85, verified: true, category: "Programming" },
    { name: "SQL", level: "Intermediate", score: 72, verified: true, category: "Database" },
    { name: "Git", level: "Intermediate", score: 68, verified: false, category: "Tools" },
    { name: "HTML & CSS", level: "Advanced", score: 88, verified: true, category: "Frontend" },
    { name: "JavaScript", level: "Intermediate", score: 62, verified: false, category: "Frontend" },
    { name: "DSA (Basics)", level: "Basic", score: 45, verified: false, category: "Core CS" },
  ],
  
  softSkills: ["Problem Solving", "Team Collaboration", "Agile Basics", "Communication"],

  projects: [
    {
      id: "p1",
      title: "Smart City Traffic Analytics",
      description: "A real-time data dashboard tracking municipal vehicle traffic density, automated bottleneck alerts, and historical reporting using Python, SQLite, and Flask.",
      tech: ["Python", "Flask", "SQL", "JavaScript", "Leaflet.js"],
      link: "https://github.com/rahul-sharma-dev/smart-traffic",
      date: "Nov 2025"
    },
    {
      id: "p2",
      title: "Campus Resource Booking Portal",
      description: "Full-featured web application allowing college lab slot reservations, projector checkouts, and admin approval workflows.",
      tech: ["HTML5", "CSS3", "JavaScript", "Python API"],
      link: "https://github.com/rahul-sharma-dev/campus-booking",
      date: "Aug 2025"
    }
  ],

  certifications: [
    {
      id: "c1",
      title: "Python for Everybody & Automation Specialization",
      issuer: "Coursera / University of Michigan",
      year: "2025",
      credentialId: "CERT-PY-88392"
    },
    {
      id: "c2",
      title: "Relational Database Design with SQL",
      issuer: "Infosys Springboard",
      year: "2025",
      credentialId: "INF-SQL-5421"
    }
  ],

  resumeFileName: "Rahul_Sharma_BCA_Resume.pdf",
  resumeLastUpdated: "2026-02-20",

  applications: [
    {
      id: "app-1",
      internshipId: "int-101",
      company: "TechCorp Solutions",
      role: "Python Developer Intern",
      appliedDate: "2026-03-02",
      status: "Shortlisted",
      stageIndex: 2, // 0: Applied, 1: Under Review, 2: Shortlisted, 3: Assessment, 4: Interview, 5: Selected
      matchScore: 82,
      stipend: "₹25,000 / month",
      location: "Bangalore (Hybrid)",
      type: "Internship"
    },
    {
      id: "app-2",
      internshipId: "int-103",
      company: "CloudScale Systems",
      role: "Full Stack Web Intern",
      appliedDate: "2026-03-08",
      status: "Under Review",
      stageIndex: 1,
      matchScore: 68,
      stipend: "₹22,000 / month",
      location: "Remote",
      type: "Internship"
    },
    {
      id: "app-3",
      internshipId: "int-105",
      company: "FinTech Pulse",
      role: "Backend API Engineering Trainee",
      appliedDate: "2026-03-12",
      status: "Interview",
      stageIndex: 4,
      matchScore: 88,
      stipend: "₹28,000 / month",
      location: "Hyderabad",
      type: "Internship"
    }
  ],

  feedbackReceived: [
    {
      company: "TechCorp Solutions",
      reviewer: "Alok Nambiar (Senior Tech Lead)",
      date: "2026-03-14",
      technicalSkills: 4,
      problemSolving: 4,
      communication: 4,
      teamwork: 5,
      professionalism: 5,
      comments: "Rahul demonstrated solid command over Core Python and SQL queries during the initial screening round. Needs to practice asynchronous request handling and Django ORM to stand out."
    }
  ]
};

// Target Career Profiles & Skill Requirements
export const careerRoleRequirements = {
  "Python Developer": {
    title: "Python Backend Developer",
    required: ["Python", "SQL", "Django", "REST API", "Git"],
    preferred: ["Docker", "AWS", "DSA", "PostgreSQL"],
    averageStipend: "₹25,000 - ₹35,000 / mo",
    industryDemand: "High (4,200+ Active Roles)",
    description: "Design server-side logic, write clean scalable Python endpoints, integrate relational databases, and build RESTful microservices."
  },
  "Full Stack Developer": {
    title: "Full Stack Web Developer (MERN)",
    required: ["React", "Node.js", "Express", "MongoDB", "Git", "REST API"],
    preferred: ["TypeScript", "Docker", "Tailwind CSS", "Next.js"],
    averageStipend: "₹22,000 - ₹32,000 / mo",
    industryDemand: "Very High (5,800+ Active Roles)",
    description: "Build reactive client interfaces, scalable Node/Express backends, and maintain database schemas."
  },
  "AI & Data Science Intern": {
    title: "AI / Data Science Engineer",
    required: ["Python", "SQL", "Pandas", "Scikit-learn", "Machine Learning", "Data Visualization"],
    preferred: ["PyTorch", "NLP", "Docker", "Deep Learning"],
    averageStipend: "₹28,000 - ₹40,000 / mo",
    industryDemand: "Rapidly Growing (3,900+ Active Roles)",
    description: "Perform exploratory data analysis, train predictive ML models, fine-tune NLP pipelines, and present analytical insights."
  },
  "Cloud & DevOps Trainee": {
    title: "Cloud & DevOps Trainee",
    required: ["Linux", "Git", "Docker", "Python", "CI/CD", "AWS Basics"],
    preferred: ["Kubernetes", "Terraform", "Networking", "Bash"],
    averageStipend: "₹26,000 - ₹38,000 / mo",
    industryDemand: "High (3,100+ Active Roles)",
    description: "Manage deployment pipelines, containerize applications, and maintain cloud infrastructure."
  }
};

// Curated Personalized Learning Roadmaps for Identified Skill Gaps
export const roadmapTemplates = {
  "Python Developer": [
    {
      phase: "Phase 1: Advanced Python & Clean Architecture",
      duration: "Week 1 - 2",
      status: "In Progress",
      milestones: [
        "Master Generators, Decorators, and Context Managers",
        "Object Oriented Design Principles & SOLID fundamentals",
        "Virtual environments and package dependency locking (Poetry/Pipenv)"
      ],
      resources: ["Python Official Docs Deep Dive", "RealPython Advanced Concepts"],
      recommendedAction: "Complete the Advanced Python Assessment"
    },
    {
      phase: "Phase 2: Building Production REST APIs",
      duration: "Week 3 - 4",
      status: "Upcoming",
      milestones: [
        "HTTP Methods, Status Codes, and RESTful routing standards",
        "Serialization, Request Validation & JWT Authentication",
        "FastAPI / Flask API development with Swagger Documentation"
      ],
      resources: ["FastAPI Interactive Tutorial", "Postman API Fundamentals"],
      recommendedAction: "Build a CRUD REST API with JWT Auth"
    },
    {
      phase: "Phase 3: Django Framework & ORM Mastery",
      duration: "Week 5 - 6",
      status: "Upcoming",
      milestones: [
        "Django MVT architecture, models, migrations and admin panel",
        "Django REST Framework (DRF) viewsets and serializers",
        "Optimizing SQL queries with select_related and prefetch_related"
      ],
      resources: ["Django Official Tutorial", "Django for APIs by William Vincent"],
      recommendedAction: "Build an Academia Course Registration Backend"
    },
    {
      phase: "Phase 4: Containerization with Docker & Git Workflows",
      duration: "Week 7 - 8",
      status: "Upcoming",
      milestones: [
        "Dockerfile creation and multi-stage builds for Python apps",
        "Docker Compose for running Python API + PostgreSQL container",
        "GitHub Actions CI/CD to run automated tests on pull requests"
      ],
      resources: ["Docker 101 for Developers", "GitHub Actions Mastery"],
      recommendedAction: "Containerize your previous project and deploy on Render/Railway"
    },
    {
      phase: "Phase 5: Real-World Capstone Project & Internship Ready",
      duration: "Week 9 - 10",
      status: "Upcoming",
      milestones: [
        "Build a complete e-commerce or AI collaboration API service",
        "Integrate automated Pytest unit and integration test suite",
        "Write clear README documentation with API endpoints and architecture diagram"
      ],
      resources: ["TechCorp Best Practices Handbook"],
      recommendedAction: "Apply for 5 matched Python Developer Internships directly on Portal"
    }
  ]
};

// Active Internships and Job Openings posted by Industry Partners
export const initialInternships = [
  {
    id: "int-101",
    company: "TechCorp Solutions",
    companyLogo: "🏢",
    role: "Python Developer Intern",
    category: "Python Developer",
    location: "Bangalore (Hybrid)",
    mode: "Hybrid",
    duration: "6 Months",
    stipend: "₹25,000 / month",
    postedDate: "2026-03-01",
    deadline: "2026-04-15",
    openings: 4,
    requiredSkills: ["Python", "SQL", "Django", "REST API", "Git"],
    preferredSkills: ["Docker", "PostgreSQL", "DSA"],
    eligibility: "BCA / B.Tech CSE / MCA / M.Tech (3rd or 4th year / final year)",
    description: "TechCorp Solutions is seeking a motivated Python Developer Intern to contribute to our high-throughput enterprise SaaS backend. You will collaborate with senior architects to create resilient microservices and maintain optimized database queries.",
    benefits: ["Pre-Placement Offer (PPO) based on performance", "Flexible hours", "Mentorship from Staff Engineers"]
  },
  {
    id: "int-102",
    company: "NextGen AI Labs",
    companyLogo: "🤖",
    role: "AI / Data Science Engineer Intern",
    category: "AI & Data Science Intern",
    location: "Pune (Hybrid)",
    mode: "Hybrid",
    duration: "6 Months",
    stipend: "₹30,000 / month",
    postedDate: "2026-03-04",
    deadline: "2026-04-20",
    openings: 3,
    requiredSkills: ["Python", "SQL", "Pandas", "Scikit-learn", "Machine Learning"],
    preferredSkills: ["PyTorch", "NLP", "Docker"],
    eligibility: "B.Tech / BCA / MCA / M.Sc Data Science with strong statistical acumen",
    description: "Work on cutting-edge generative AI, NLP retrieval pipelines, and predictive analytics models deployed in enterprise operations.",
    benefits: ["GPU compute access", "Conference sponsorship", "Direct path to Full-time AI Engineer"]
  },
  {
    id: "int-103",
    company: "CloudScale Systems",
    companyLogo: "☁️",
    role: "Full Stack Web Intern",
    category: "Full Stack Developer",
    location: "Remote (All India)",
    mode: "Remote",
    duration: "3 - 6 Months",
    stipend: "₹22,000 / month",
    postedDate: "2026-03-06",
    deadline: "2026-04-18",
    openings: 6,
    requiredSkills: ["React", "Node.js", "Express", "MongoDB", "Git"],
    preferredSkills: ["TypeScript", "Tailwind CSS", "REST API"],
    eligibility: "Students currently enrolled in BCA, B.Tech or MCA",
    description: "Build dynamic frontend components and responsive portals alongside our cloud team, integrating asynchronous Node services and MongoDB.",
    benefits: ["100% remote flexibility", "Home office stipend", "Certificate of Merit"]
  },
  {
    id: "int-104",
    company: "FinTech Pulse",
    companyLogo: "💳",
    role: "Backend API Engineering Trainee",
    category: "Python Developer",
    location: "Hyderabad",
    mode: "On-site",
    duration: "6 Months",
    stipend: "₹28,000 / month",
    postedDate: "2026-03-10",
    deadline: "2026-04-25",
    openings: 5,
    requiredSkills: ["Python", "REST API", "SQL", "Git"],
    preferredSkills: ["Django", "Docker", "Redis", "Security"],
    eligibility: "Graduating batch of 2026 or 2027 in CS / IT / CA",
    description: "Build resilient financial transaction handling microservices, webhook dispatchers, and automated unit test cases.",
    benefits: ["Health insurance coverage", "PPO conversion rate > 80%", "Free meal vouchers"]
  },
  {
    id: "int-105",
    company: "Apex Cyber Innovations",
    companyLogo: "🛡️",
    role: "Cloud & DevOps Intern",
    category: "Cloud & DevOps Trainee",
    location: "Noida / Delhi NCR",
    mode: "Hybrid",
    duration: "6 Months",
    stipend: "₹26,000 / month",
    postedDate: "2026-03-12",
    deadline: "2026-04-30",
    openings: 3,
    requiredSkills: ["Linux", "Git", "Docker", "Python", "CI/CD"],
    preferredSkills: ["AWS Basics", "Kubernetes", "Bash"],
    eligibility: "Engineering and Computer Application undergraduates",
    description: "Assist DevOps architects in building automated GitHub Actions CI/CD workflows, containerizing microservices, and monitoring server metrics.",
    benefits: ["AWS Certification exam voucher paid by company", "PPO opportunity"]
  }
];

// College / University Administration Data & Cohort Analytics
export const initialCollegeData = {
  institutionName: "Apex Institute of Technology & Science",
  code: "AITS-ACAD-2026",
  location: "Bangalore Campus",
  deanTPO: "Dr. Sudhir Rao (Dean - Training & Placement)",
  tpoEmail: "tpo@aits.edu.in",
  totalStudentsMonitored: 1250,
  activePartnerCompanies: 86,
  totalInternshipsPlaced: 320,
  activePlacementDrives: 14,
  
  departmentStats: [
    {
      dept: "BCA",
      studentsCount: 220,
      skillsProficiency: {
        Python: 78,
        Java: 65,
        SQL: 72,
        JavaScript: 61,
        React: 43,
        Cloud: 38,
        AIML: 51,
        DSA: 49
      },
      placedCount: 88,
      avgStipend: "₹24,500"
    },
    {
      dept: "B.Tech CSE",
      studentsCount: 480,
      skillsProficiency: {
        Python: 82,
        Java: 84,
        SQL: 79,
        JavaScript: 70,
        React: 56,
        Cloud: 52,
        AIML: 64,
        DSA: 68
      },
      placedCount: 210,
      avgStipend: "₹32,000"
    },
    {
      dept: "MCA",
      studentsCount: 160,
      skillsProficiency: {
        Python: 75,
        Java: 76,
        SQL: 80,
        JavaScript: 65,
        React: 48,
        Cloud: 44,
        AIML: 54,
        DSA: 58
      },
      placedCount: 94,
      avgStipend: "₹28,000"
    }
  ],

  topSkillGapsIdentified: [
    { skill: "Cloud & DevOps (Docker / AWS)", avgScore: 38, gapPercentage: 62, urgency: "High", recommendedAction: "Organize 2-week hands-on Docker & AWS workshop for 5th & 6th sem" },
    { skill: "Frontend Frameworks (React.js)", avgScore: 43, gapPercentage: 57, urgency: "High", recommendedAction: "Introduce modern SPA curriculum module in Web Tech lab" },
    { skill: "Data Structures & Algorithms (DSA)", avgScore: 49, gapPercentage: 51, urgency: "Medium", recommendedAction: "Launch weekly competitive coding hackathons on LeetCode/HackerRank" },
    { skill: "AI / Machine Learning (NLP & LLMs)", avgScore: 51, gapPercentage: 49, urgency: "Medium", recommendedAction: "Invite industry mentors from NextGen AI for guest lecture series" }
  ],

  placementDrives: [
    { id: "drv-1", company: "TechCorp Solutions", date: "2026-03-28", roles: ["Python Intern", "DevOps Intern"], eligibility: "BCA / B.Tech > 7.0 CGPA", registeredStudents: 84, status: "Confirmed" },
    { id: "drv-2", company: "CloudScale Systems", date: "2026-04-05", roles: ["Full Stack Intern"], eligibility: "All CS Branches > 6.5 CGPA", registeredStudents: 112, status: "Scheduling Tests" },
    { id: "drv-3", company: "FinTech Pulse", date: "2026-04-12", roles: ["Backend API Trainee"], eligibility: "BCA / B.Tech CSE", registeredStudents: 76, status: "Shortlisting" },
    { id: "drv-4", company: "NextGen AI Labs", date: "2026-04-22", roles: ["AI / Data Science Engineer"], eligibility: "Math / CS with Python score > 75%", registeredStudents: 49, status: "Announced" }
  ],

  monitoredStudentsSample: [
    { id: "s1", name: "Rahul Sharma", dept: "BCA", sem: 5, cgpa: 8.4, topSkill: "Python (85%)", readiness: "Ready (82%)", status: "Shortlisted at TechCorp" },
    { id: "s2", name: "Priya Patel", dept: "B.Tech CSE", sem: 7, cgpa: 9.1, topSkill: "React & Node (90%)", readiness: "Ready (94%)", status: "Offer Accepted (Amazon)" },
    { id: "s3", name: "Aman Verma", dept: "MCA", sem: 3, cgpa: 7.8, topSkill: "SQL & Java (78%)", readiness: "Training Needed (65%)", status: "Under Review (CloudScale)" },
    { id: "s4", name: "Sneha Reddy", dept: "BCA", sem: 5, cgpa: 8.7, topSkill: "Python & ML (80%)", readiness: "Ready (85%)", status: "Interview Round (NextGen AI)" },
    { id: "s5", name: "Vikram Malhotra", dept: "B.Tech CSE", sem: 7, cgpa: 7.2, topSkill: "Git & Linux (70%)", readiness: "Training Needed (58%)", status: "Skill Gap in React/Cloud" }
  ]
};

// Industry Company Profile Data
export const initialCompanyData = {
  id: "comp-101",
  name: "TechCorp Solutions Pvt Ltd",
  domain: "Cloud & Enterprise SaaS",
  headquarters: "Tech Park, Outer Ring Road, Bangalore",
  contactPerson: "Alok Nambiar (Senior Talent Acquisition & Tech Lead)",
  email: "recruitment@techcorpsolutions.com",
  website: "https://techcorpsolutions.com",
  verified: true,
  activeJobCount: 8,
  activeInternshipCount: 5,
  totalApplicationsReceived: 640,
  shortlistedCandidates: 75,
  
  requiredSkillsCatalog: [
    { name: "Python", weight: 95, mandatory: true },
    { name: "SQL", weight: 85, mandatory: true },
    { name: "Django", weight: 80, mandatory: true },
    { name: "REST API", weight: 90, mandatory: true },
    { name: "Git", weight: 75, mandatory: true },
    { name: "Docker", weight: 65, mandatory: false },
    { name: "PostgreSQL", weight: 70, mandatory: false }
  ],

  companyApplications: [
    {
      id: "app-1",
      candidateId: "std-101",
      name: "Rahul Sharma",
      course: "BCA (Sem 5)",
      college: "Apex Institute of Technology & Science",
      cgpa: 8.4,
      role: "Python Developer Intern",
      appliedDate: "2026-03-02",
      matchScore: 82,
      matchedSkills: ["Python", "SQL", "Git"],
      missingSkills: ["Django", "Docker"],
      assessmentScore: "85% (Verified)",
      status: "Shortlisted",
      hasFeedback: true
    },
    {
      id: "app-202",
      candidateId: "std-102",
      name: "Ananya Deshmukh",
      course: "B.Tech CSE (Sem 7)",
      college: "Apex Institute of Technology & Science",
      cgpa: 8.9,
      role: "Python Developer Intern",
      appliedDate: "2026-03-04",
      matchScore: 94,
      matchedSkills: ["Python", "SQL", "Django", "REST API", "Git"],
      missingSkills: ["Docker"],
      assessmentScore: "92% (Verified)",
      status: "Interview",
      hasFeedback: false
    },
    {
      id: "app-203",
      candidateId: "std-103",
      name: "Rohan Kulkarni",
      course: "MCA (Sem 3)",
      college: "Apex Institute of Technology & Science",
      cgpa: 7.5,
      role: "Python Developer Intern",
      appliedDate: "2026-03-09",
      matchScore: 64,
      matchedSkills: ["Python", "SQL"],
      missingSkills: ["Django", "REST API", "Git", "Docker"],
      assessmentScore: "68% (Pending)",
      status: "Under Review",
      hasFeedback: false
    }
  ]
};

// Interactive Skill Assessments Database
export const assessmentModules = [
  {
    id: "assess-python",
    title: "Python Core & Advanced Concepts",
    category: "Programming",
    icon: "🐍",
    durationMinutes: 10,
    questionsCount: 5,
    difficulty: "Intermediate to Advanced",
    skillsImpacted: ["Python"],
    questions: [
      {
        id: 1,
        question: "In Python, which of the following is true about immutable types?",
        options: [
          "Lists, dictionaries, and sets are immutable",
          "Integers, strings, and tuples cannot have their values modified in-place",
          "Tuples can be modified in-place if they contain primitive data types",
          "Immutable types always occupy less memory than mutable types"
        ],
        correctAnswer: 1,
        explanation: "Integers, floats, strings, and tuples are immutable in Python; operations creating a change actually allocate a new memory object."
      },
      {
        id: 2,
        question: "What is the primary function of a Python generator using the 'yield' keyword?",
        options: [
          "It terminates execution of a recursive function immediately",
          "It yields CPU control to other operating system threads",
          "It creates an iterator that produces values lazily on-demand without loading everything in memory",
          "It forces garbage collection of unused variables"
        ],
        correctAnswer: 2,
        explanation: "Generators return an iterator object and yield values one at a time on demand (lazy evaluation), which saves RAM."
      },
      {
        id: 3,
        question: "What does the '@functools.wraps' decorator do when creating custom decorators?",
        options: [
          "It measures the execution time of the decorated function",
          "It preserves the original function's name, docstring, and metadata",
          "It automatically caches the output using memoization",
          "It prevents any exceptions from being raised inside the function"
        ],
        correctAnswer: 1,
        explanation: "@functools.wraps updates the wrapper function to look like the wrapped function, copying docstrings and name."
      },
      {
        id: 4,
        question: "Which SQL ORM technique helps solve the N+1 query problem in backend frameworks like Django?",
        options: [
          "Using raw cursor execution without transactions",
          "Using select_related() for foreign keys and prefetch_related() for many-to-many relationships",
          "Disabling database indexing on high volume tables",
          "Calling .all() multiple times in a for loop"
        ],
        correctAnswer: 1,
        explanation: "select_related performs SQL JOINs, while prefetch_related executes a batch query with IN (...), preventing N+1 queries."
      },
      {
        id: 5,
        question: "What is the time complexity of lookup in a Python dictionary in the average case?",
        options: [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N^2)"
        ],
        correctAnswer: 2,
        explanation: "Python dictionaries are built using hash tables, offering O(1) average time complexity for lookups."
      }
    ]
  },
  {
    id: "assess-sql",
    title: "Relational Database & SQL Proficiency",
    category: "Database",
    icon: "🗄️",
    durationMinutes: 10,
    questionsCount: 5,
    difficulty: "Intermediate",
    skillsImpacted: ["SQL"],
    questions: [
      {
        id: 1,
        question: "Which SQL clause is used to filter records after an aggregate function (e.g., GROUP BY)?",
        options: [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "PARTITION BY"
        ],
        correctAnswer: 1,
        explanation: "HAVING is evaluated after GROUP BY to filter grouped rows, whereas WHERE filters individual rows before grouping."
      },
      {
        id: 2,
        question: "What is the difference between INNER JOIN and LEFT OUTER JOIN?",
        options: [
          "INNER JOIN returns unmatched records from the right table",
          "LEFT OUTER JOIN returns all rows from the left table even if there is no match in the right table",
          "INNER JOIN is always slower than LEFT JOIN",
          "There is no difference in modern relational databases"
        ],
        correctAnswer: 1,
        explanation: "LEFT JOIN preserves all rows from the left table and inserts NULLs for unmatched right-table columns."
      },
      {
        id: 3,
        question: "What type of index is typically created automatically on a Primary Key column?",
        options: [
          "Full-text Index",
          "Clustered B-Tree Index",
          "Bitmap Index",
          "Spatial R-Tree Index"
        ],
        correctAnswer: 1,
        explanation: "Most RDBMSs (like MySQL InnoDB and PostgreSQL) create a clustered B-Tree index on the Primary Key."
      },
      {
        id: 4,
        question: "In ACID database properties, what does 'Atomicity' guarantee?",
        options: [
          "Data is stored in small atomic units of 4KB",
          "A transaction either completes in its entirety or is completely rolled back",
          "Multiple transactions execute in isolation without interference",
          "Committed changes survive hardware crashes"
        ],
        correctAnswer: 1,
        explanation: "Atomicity ensures 'all or nothing' transaction execution."
      },
      {
        id: 5,
        question: "Which SQL statement is used to remove all records from a table quickly without logging individual row deletions?",
        options: [
          "DELETE FROM table_name",
          "TRUNCATE TABLE table_name",
          "DROP TABLE table_name",
          "REMOVE ALL table_name"
        ],
        correctAnswer: 1,
        explanation: "TRUNCATE TABLE deallocates data pages quickly with minimal transaction logging compared to DELETE."
      }
    ]
  },
  {
    id: "assess-react",
    title: "Modern React & Frontend Development",
    category: "Development",
    icon: "⚛️",
    durationMinutes: 10,
    questionsCount: 5,
    difficulty: "Intermediate",
    skillsImpacted: ["React", "JavaScript"],
    questions: [
      {
        id: 1,
        question: "In React, why shouldn't you mutate state directly (e.g., `state.count = 5`)?",
        options: [
          "It causes JavaScript syntax error in browser",
          "React compares state references to trigger re-renders; direct mutation doesn't trigger UI updates",
          "It deletes the state variable from window memory",
          "React automatically converts mutable variables to immutable constants"
        ],
        correctAnswer: 1,
        explanation: "React relies on immutability and shallow reference comparison to detect when component re-rendering is needed."
      },
      {
        id: 2,
        question: "What does the second argument (dependency array) of `useEffect` represent?",
        options: [
          "The list of child components that can call this effect",
          "The variables whose change triggers the effect callback to re-run",
          "The timeout in milliseconds before the effect runs",
          "The database connection string"
        ],
        correctAnswer: 1,
        explanation: "useEffect will only re-run if one of the dependencies in the array has changed between renders."
      },
      {
        id: 3,
        question: "What is the benefit of React's Virtual DOM?",
        options: [
          "It bypasses the browser rendering engine completely",
          "It computes minimal required DOM mutations through reconciliation (diffing) before batch updating the real DOM",
          "It allows running C++ code directly inside the browser",
          "It eliminates the need for CSS"
        ],
        correctAnswer: 1,
        explanation: "The Virtual DOM calculates differences (diffing) and batches updates to minimize costly real DOM reflows."
      },
      {
        id: 4,
        question: "What hook is used to cache the result of an expensive calculation between renders?",
        options: [
          "useCallback",
          "useMemo",
          "useRef",
          "useReducer"
        ],
        correctAnswer: 1,
        explanation: "useMemo caches the result of an expensive function, recomputing only when dependencies change."
      },
      {
        id: 5,
        question: "In React props, what is the significance of the `key` prop in lists?",
        options: [
          "It sets the CSS z-index of the item",
          "It gives elements a stable identity so React knows which items changed, were added, or removed",
          "It encrypts the item before sending it to the server",
          "It binds keyboard event listeners to the element"
        ],
        correctAnswer: 1,
        explanation: "Keys help React identify which items have changed, been added, or been removed during reconciliation."
      }
    ]
  }
];

// Sample Resumes for 1-Click AI Resume Parsing Demonstrations
export const sampleResumes = {
  pythonResume: {
    label: "Python Backend Aspirant (Rahul Sharma)",
    text: `RAHUL SHARMA
Email: rahul.sharma@student.edu | Phone: +91 98765 43210
Course: Bachelor of Computer Applications (BCA) - 5th Semester (CGPA: 8.4)
Institution: Apex Institute of Technology & Science

PROFESSIONAL SUMMARY:
Diligent BCA student with strong technical foundation in Python programming, relational databases (SQL), and web fundamentals. Built end-to-end analytics dashboards and campus management tools. Seeking Python Backend Internship.

TECHNICAL SKILLS:
- Languages: Python 3.11, JavaScript (ES6+), HTML5, CSS3, SQL
- Frameworks & Libraries: Flask, Pandas, NumPy, Bootstrap, TailwindCSS
- Databases & Tools: MySQL, SQLite, Git, GitHub, VS Code, Linux basics
- Core Concepts: Object-Oriented Programming (OOP), RESTful API design, Agile

PROJECTS:
1. Smart City Traffic & Air Quality Analytics (Python, Flask, SQLite, Leaflet.js)
   - Developed real-time dashboard plotting vehicle density across 15 monitoring zones.
   - Built REST endpoints serving JSON data with sub-200ms latency.
2. Campus Lab & Projector Booking Portal (HTML, CSS, JS, Python)
   - Created role-based booking portal for students and faculty.

CERTIFICATIONS:
- Python for Everybody Specialization - Coursera / Univ of Michigan (2025)
- Relational Database Management with SQL - Infosys Springboard (2025)`
  },

  mernResume: {
    label: "Full Stack MERN Developer Resume (Priya Patel)",
    text: `PRIYA PATEL
Email: priya.patel@tech.edu | Phone: +91 98111 22334
Course: B.Tech Computer Science & Engineering (7th Semester - CGPA: 9.1)
College: Apex Institute of Technology & Science

OBJECTIVE:
Enthusiastic full-stack engineer experienced in React.js, Node.js, Express, and MongoDB. Passionate about crafting high-performance UI and scalable microservices.

TECHNICAL SKILLS:
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, TypeScript, HTML5/CSS3
- Backend: Node.js, Express.js, REST APIs, GraphQL basics, JWT Authentication
- Databases: MongoDB, Mongoose, PostgreSQL, Redis
- Tools: Docker, Git, GitHub, Postman, Jest, AWS S3 basics

PROJECTS:
1. DevCollab - Real-Time Code Collaboration (React, Node.js, Socket.io, MongoDB)
   - Real-time pair-programming platform with syntax highlighting and room management.
2. HealthPulse E-Commerce Platform (MERN Stack, Stripe API)
   - Complete checkout system with cart state management, webhooks, and order tracking.

CERTIFICATIONS:
- Meta Front-End Developer Professional Certificate (Coursera)
- AWS Certified Cloud Practitioner (2025)`
  },

  aiResume: {
    label: "AI & Data Science Student Resume (Aman Verma)",
    text: `AMAN VERMA
Email: aman.verma@datascience.edu | Phone: +91 97222 33445
Degree: Master of Computer Applications (MCA) - 3rd Semester (CGPA: 8.6)
Institution: Apex Institute of Technology & Science

PROFILE:
Passionate Data Science student specializing in Machine Learning, Statistical Modeling, and Python data pipelines. Experienced with Scikit-learn, Pandas, and exploratory data analysis.

TECHNICAL SKILLS:
- Languages: Python, R, SQL
- Machine Learning & Data: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, PyTorch basics
- Data Engineering & NLP: Feature Engineering, NLTK, TF-IDF, Word2Vec, SQLite
- Platforms & Tools: Jupyter Notebook, Google Colab, Git, Streamlit, Docker

PROJECTS:
1. Predictive Customer Churn Engine (Python, Scikit-learn, Streamlit)
   - Trained Random Forest & XGBoost classifiers with 89% accuracy and interactive visualizer.
2. Sentiment Analysis on Tech Reviews (Python, NLTK, NLP)
   - Processed 10,000+ customer reviews using VADER & custom vectorizers.

CERTIFICATIONS:
- DeepLearning.AI Machine Learning Specialization
- SQL for Data Science - UC Davis`
  }
};
