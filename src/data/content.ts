// All facts in this file are sourced directly from Abdullah Jrad's CV
// and the hyperlinks embedded in it. Nothing here is invented.

export const profile = {
  name: "Abdullah Jrad",
  email: "abdullah.jrad@outlook.com",
  location: "Beirut, Lebanon",
  github: "https://github.com/Abedsay",
  linkedin: "https://www.linkedin.com/in/abdullah-jrad/",
  cvPath: `${import.meta.env.BASE_URL}cv/Abdullah_Jrad_CV.pdf`,
  currentRole: "Quality Assurance Consultant",
  currentCompany: "Noema Consulting",
  buildingToward: "SDET + AI Engineering",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  bullets: string[];
  highlight?: {
    title: string;
    bullets: string[];
  };
}

export const experience: ExperienceItem[] = [
  {
    role: "Quality Assurance Consultant",
    company: "Noema Consulting",
    period: "06/2025 — Present",
    location: "Remote / Lebanon",
    bullets: [
      "Designed and executed manual test cases for web applications and new feature releases.",
      "Identified, documented, and tracked software defects through Jira while collaborating directly with developers.",
      "Performed regression testing and validated bug fixes before deployment.",
      "Developed automated test workflows using Katalon Studio to reduce repetitive testing effort.",
      "Worked in Agile development environments, coordinating testing activities with developers across sprint cycles and releases.",
    ],
    highlight: {
      title: "AI Chatbot Testing & Optimization",
      bullets: [
        "Took primary QA responsibility for a full AI project involving LLM-based chatbots and agent systems.",
        "Worked directly with developers throughout development and releases — evaluating AI responses, identifying issues, and communicating findings for resolution.",
        "Designed and executed scenarios to evaluate response accuracy, relevance, consistency, edge cases, and overall system behavior.",
        "Created structured prompts and guidelines to improve consistency and quality.",
      ],
    },
  },
  {
    role: "Full Stack Developer Intern",
    company: "Integrated Digital Systems (IDS)",
    period: "12/2024 — 02/2025",
    location: "Remote / Lebanon",
    bullets: [
      "Built UI screens and reusable components using React.",
      "Integrated frontend with backend REST APIs for data display and profile updates.",
      "Worked with MySQL for storing and retrieving user information.",
      "Used Git and GitHub for version control.",
    ],
  },
  {
    role: "IT Support Intern",
    company: "Lebanese American University (LAU)",
    period: "01/2025 — 04/2025",
    location: "On Site / Beirut, Lebanon",
    bullets: [
      "Assisted students and faculty with troubleshooting software, device, and network issues.",
      "Prepared computer labs and installed required applications for classes and exams.",
      "Supported classroom devices (projectors, PCs, speakers) to ensure daily operations.",
    ],
  },
  {
    role: "Frontend Development",
    company: "CodeAlpha & CodSoft",
    period: "06/2024 — 08/2024",
    location: "Remote / Lebanon",
    bullets: [
      "Developed interactive UI pages using HTML, CSS, and JavaScript based on assigned tasks.",
      "Strengthened understanding of component layouts, styling, and user interaction logic.",
    ],
  },
];

export type ProjectCategory = "Software Engineering" | "AI / ML" | "Systems";

export interface Project {
  slug: string;
  name: string;
  categories: ProjectCategory[];
  tagline: string;
  description: string;
  approach: string[];
  technologies: string[];
  contribution: string;
  status: string;
  links: { label: string; url: string }[];
  architecture?: string[];
  problem: string;
  decisions: string[];
  results: string[];
  lessons: string[];
  visualFlow: string[];
}

export const projects: Project[] = [
  {
    slug: "cpc",
    name: "Clinic Platform (CPC)",
    categories: ["Software Engineering"],
    tagline: "Role-based clinic management system — Android app + web platform",
    description:
      "A team-built, role-based clinic management system supporting patients, doctors, pharmacists, and lab technicians, consisting of an Android application and a companion web platform sharing the same backend.",
    approach: [
      "Built screens and workflows for login/authentication, appointment scheduling, medical record access, prescription handling, storage and inventory management, and lab result submission.",
      "Implemented secure credential-recovery flows (email/phone).",
      "Integrated the application with backend APIs built in PHP and MySQL for data consistency across roles.",
      "Built a real-time messaging system using a custom TCP socket server for staff communication.",
      "On the web platform: dashboard interfaces, data display pages, and administrative controls for managing user access and clinic operations through the same backend.",
    ],
    technologies: ["PHP", "MySQL", "Android (Java)", "TCP Sockets", "REST APIs"],
    contribution:
      "This was a team project. I contributed to the Android app through a dedicated branch in a teammate's repository, while the web platform is in my own repository.",
    status: "Academic team project — completed",
    architecture: [
      "Android Client (patients, doctors, pharmacists, lab techs)",
      "Web Platform (dashboards, admin controls)",
      "Shared PHP / MySQL Backend",
      "Custom TCP Socket Server (staff messaging)",
    ],
    problem: "Coordinate distinct clinic workflows across mobile and web experiences while keeping role-specific operations connected.",
    decisions: [
      "Use one PHP/MySQL backend for Android and web clients.",
      "Separate workflows by patient, doctor, pharmacist, and lab-technician roles.",
      "Use a dedicated TCP socket server for staff messaging.",
    ],
    results: ["Completed as an academic team project.", "Delivered Android and web interfaces connected to the shared backend."],
    lessons: ["Role-based systems need clear workflow boundaries.", "Shared backends make client integration and data consistency central engineering concerns."],
    visualFlow: ["Android", "Web platform", "PHP / MySQL", "Staff messaging"],
    links: [
      { label: "Android App (teammate's repo, my branch)", url: "https://github.com/ibrahimmabrouki/CPC_App/tree/Abdullah" },
      { label: "Web Platform (my repo)", url: "https://github.com/Abedsay/Software-Engineering-Website" },
    ],
  },
  {
    slug: "lenet-cnn",
    name: "Parallel CNN (LeNet-5) Acceleration",
    categories: ["AI / ML", "Systems"],
    tagline: "Distributed, multi-core, and GPU acceleration of a CNN — MPI / OpenMP / CUDA C",
    description:
      "Accelerated the key layers of a LeNet-5 convolutional neural network — convolution and fully connected layers — using distributed (MPI), multi-core (OpenMP), and GPU (CUDA C) parallelism.",
    approach: [
      "Identified and optimized the most compute-heavy operations in the network.",
      "Implemented distributed, multi-core, and GPU parallel versions of the same computation.",
      "Measured speedup, scalability, and efficiency against a sequential baseline.",
      "Verified correctness by comparing outputs across implementations.",
    ],
    technologies: ["CUDA C", "MPI", "OpenMP", "C"],
    contribution: "Solo academic project (Parallel Programming coursework).",
    status: "Academic project — completed",
    problem: "Reduce the cost of convolutional and fully connected CNN operations while preserving correct outputs.",
    decisions: [
      "Compare MPI, OpenMP, and CUDA C approaches against a sequential baseline.",
      "Target convolution and fully connected layers, the compute-heavy operations.",
      "Validate output correctness before interpreting performance measurements.",
    ],
    results: ["Implemented distributed, multi-core, and GPU parallel versions.", "Measured speedup, scalability, and efficiency against the sequential baseline."],
    lessons: ["Performance work requires a correct baseline and comparable measurements.", "Parallel strategy should match the available compute resource."],
    visualFlow: ["LeNet-5 layers", "Sequential baseline", "MPI / OpenMP / CUDA", "Validated comparison"],
    links: [{ label: "GitHub Repository", url: "https://github.com/Abedsay/Parallelizing-LeNet-5-CNN" }],
  },
  {
    slug: "sentiment-analysis",
    name: "Sentiment Analysis on IMDB Reviews",
    categories: ["AI / ML"],
    tagline: "TF-IDF + Logistic Regression / Random Forest binary sentiment classification",
    description:
      "Binary sentiment classification on IMDB movie reviews using classical machine learning: TF-IDF feature extraction and Logistic Regression / Random Forest models.",
    approach: [
      "Preprocessed review text and extracted TF-IDF features (top 5,000 words).",
      "Trained and compared Logistic Regression and Random Forest classifiers.",
      "Achieved ~90% accuracy and an AUC of 0.962 with the Logistic Regression model.",
      "Compared model performance and runtime, and analyzed failure cases such as mixed sentiment and sarcasm/context.",
    ],
    technologies: ["Python", "scikit-learn", "TF-IDF", "Logistic Regression", "Random Forest"],
    contribution: "Solo project.",
    status: "Completed",
    problem: "Classify IMDB review sentiment and compare classical ML approaches with attention to performance and failure cases.",
    decisions: [
      "Represent review text with TF-IDF features from the top 5,000 words.",
      "Compare Logistic Regression with Random Forest.",
      "Inspect mixed sentiment and sarcasm/context as failure cases rather than treating metrics as the whole story.",
    ],
    results: ["Logistic Regression achieved approximately 90% accuracy and 0.962 AUC.", "Compared model performance and runtime."],
    lessons: ["Model evaluation includes failure patterns, not only aggregate metrics.", "A simpler model can be a strong benchmark when it is measured carefully."],
    visualFlow: ["IMDB reviews", "TF-IDF · 5k words", "LR / Random Forest", "Metrics + failure cases"],
    links: [{ label: "GitHub Repository", url: "https://github.com/Abedsay/Machine-Learning-in-Sentiment-Analysis" }],
  },
  {
    slug: "file-sharing-server",
    name: "File Sharing Server",
    categories: ["Systems", "Software Engineering"],
    tagline: "Resumable file transfer over a custom client–server protocol — Flask GUI",
    description:
      "A file-sharing system with upload/download progress tracking and automatic resume for interrupted transfers, hosted on a local network for access from multiple devices.",
    approach: [
      "Implemented chunked data transfer between server and client.",
      "Built automatic resume logic for interrupted transfers.",
      "Hosted the server on a local network so multiple devices could connect.",
      "Tested file-transfer reliability and recovery from dropped connections.",
    ],
    technologies: ["Python", "Flask", "Sockets"],
    contribution: "Solo project.",
    status: "Completed",
    architecture: ["Client (GUI)", "Chunked Transfer Protocol", "Flask Server", "Resume / Recovery Logic"],
    problem: "Move files across a local network while recovering from interrupted transfers.",
    decisions: [
      "Transfer data in chunks rather than as a single uninterrupted operation.",
      "Track upload/download progress and resume interrupted work.",
      "Host the Flask-based server for multiple local-network devices.",
    ],
    results: ["Implemented chunked transfer and automatic resume logic.", "Tested reliability and dropped-connection recovery."],
    lessons: ["Network systems need recovery paths as well as a happy path.", "Reliability testing is part of implementation, not an afterthought."],
    visualFlow: ["Client GUI", "Chunked protocol", "Flask server", "Resume / recovery"],
    links: [{ label: "GitHub Repository", url: "https://github.com/Abedsay/File_Sharing_Server" }],
  },
  {
    slug: "community-platform",
    name: "Community Web Platform",
    categories: ["Software Engineering"],
    tagline: "Full-stack web app — React front end on a REST/MySQL backend",
    description:
      "A full-stack web application with user login, profile pages, and data-viewing screens — matching the work described in the Full Stack Developer internship at Integrated Digital Systems.",
    approach: [
      "Developed user login, profile pages, and data-viewing screens.",
      "Integrated front-end components with backend REST endpoints.",
      "Managed client-side state updates in response to API data.",
    ],
    technologies: ["React", "REST APIs", "MySQL"],
    contribution: "Built as part of the Full Stack Developer internship at IDS.",
    status: "Completed",
    problem: "Build an internship web application that connects account and profile interfaces to existing backend data.",
    decisions: [
      "Build reusable React UI screens for login, profiles, and data views.",
      "Integrate the client with REST endpoints for data and profile updates.",
      "Use MySQL for user-information storage and retrieval.",
    ],
    results: ["Completed front-end screens and REST API integrations during the IDS internship.", "Used Git and GitHub for version control."],
    lessons: ["Useful frontend work depends on clear API contracts and state updates.", "Version control supports collaboration across the full-stack workflow."],
    visualFlow: ["React UI", "REST API", "MySQL", "Profile + data views"],
    links: [{ label: "GitHub Repository", url: "https://github.com/Abedsay/Community-Knowledge-Platform" }],
  },
];

export const aiEngineeringFlow = [
  { key: "data", label: "Data", detail: "IMDB reviews and user conversation turns", evidence: "Academic ML + current QA context" },
  { key: "system", label: "Model / AI system", detail: "Classifiers, LLM chatbots, and agent systems", evidence: "Academic projects + current evaluation work" },
  { key: "application", label: "Application", detail: "Interfaces and workflows where people use the system", evidence: "Software engineering projects" },
  { key: "evaluation", label: "Evaluation", detail: "Accuracy, relevance, consistency, edge cases, and behavior", evidence: "Primary QA responsibility at Noema" },
  { key: "automation", label: "Automation", detail: "Repeatable test workflows and structured guidelines", evidence: "Katalon Studio + current QA practice" },
  { key: "feedback", label: "Feedback", detail: "Structured findings shared with developers", evidence: "Current collaboration practice" },
];

export const engineeringDirection = {
  stages: ["Computer Science", "Software Development", "Quality Engineering", "Test Automation", "AI Applications / Systems"],
  destinations: ["SDET", "AI Engineering"],
};

export const skills: { category: string; items: string[] }[] = [
  { category: "Programming", items: ["Java", "Python", "JavaScript", "TypeScript", "PHP", "C", "C#"] },
  { category: "AI & Machine Learning", items: ["Prompt Engineering", "Generative AI", "Agentic AI", "Text Classification"] },
  { category: "Web & APIs", items: ["React", "Node.js", "Flask", "HTML", "CSS", "REST APIs", "Postman"] },
  { category: "Testing & Quality", items: ["Manual Testing", "Test Automation", "AI Application Testing", "Test Cases", "Katalon Studio"] },
  { category: "Data & Development Tools", items: ["SQL", "Git", "GitHub", "Jira", "Confluence"] },
  { category: "Systems & HPC", items: ["Linux", "Android (Java)", "CUDA C", "MPI", "OpenMP"] },
];

export const education = {
  degree: "B.Sc. in Computer Science",
  school: "Lebanese American University (LAU)",
  note: "USAID Scholarship",
  period: "2022 — 2025",
  location: "Beirut",
  courses: [
    "Algorithms and Data Structures",
    "Objects and Data Abstraction",
    "Web and Mobile Development",
    "Parallel Programming",
  ],
};

export const certifications = [
  { name: "Kanz — AI Showcase Certificate" },
  { name: "NVIDIA — Fundamentals of Accelerated Computing with CUDA C/C++" },
  { name: "Katalon — AI Skilled Certificate" },
  { name: "Katalon — Practitioner Level Certificate" },
  { name: "Katalon — Professional Level Certificate" },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Fluent (IELTS C1)" },
  { name: "German", level: "Beginner" },
];
