import type { Candidate, CandidateAnalysis, Job, Application, MessageThread, RecentActivity } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@stanford.edu',
    phone: '+1 (555) 382-9102',
    location: 'San Francisco, CA (Open to Remote)',
    links: {
      linkedin: 'linkedin.com/in/sarah-jenkins-dev',
      github: 'github.com/sjenkins-codes',
      portfolio: 'sjenkins.dev'
    },
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Stanford University',
        graduationYear: '2018',
        gpa: '3.8/4.0',
        details: 'Honors in CS, Software Engineering Track.'
      }
    ],
    experience: [
      {
        title: 'Senior Software Engineer (Full-Stack)',
        company: 'Stripe',
        duration: 'Jan 2022 - Present',
        responsibilities: [
          'Led a cross-functional engineering team of 6 to rebuild Stripe\'s developer checkout onboarding portal.',
          'Mentored 4 junior engineers and designed internal React component library, boosting team velocity by 25%.',
          'Designed and optimized high-throughput Node.js microservices processing over 12,000 requests per minute with 99.99% uptime.'
        ]
      },
      {
        title: 'Software Engineer II',
        company: 'Airbnb',
        duration: 'June 2018 - Dec 2021',
        responsibilities: [
          'Developed complex map-based search interfaces using React, Redux, and GraphQL, increasing search engagement by 14%.',
          'Implemented REST and GraphQL API endpoints in Node.js, integrating PostgreSQL database layer.'
        ]
      }
    ],
    skills: [
      {
        category: 'Programming Languages',
        items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL']
      },
      {
        category: 'Frameworks & Libraries',
        items: ['React', 'Next.js', 'Node.js', 'Express', 'Redux', 'GraphQL', 'Tailwind CSS', 'Jest']
      },
      {
        category: 'Databases & Cloud',
        items: ['PostgreSQL', 'Redis', 'MongoDB', 'AWS', 'Docker']
      }
    ],
    projects: [
      {
        name: 'PayStream',
        description: 'An open-source billing engine dashboard showing real-time transaction processing pipelines.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Redis', 'Tailwind CSS'],
        url: 'github.com/sjenkins-codes/paystream'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect - Associate (2023)'
    ],
    achievements: [
      'Stripe Engineering Excellence Award (Q3 2023)'
    ],
    languages: ['English (Native)', 'Spanish (Conversational)'],
    resumeText: `SARAH JENKINS\nSan Francisco, CA | +1 (555) 382-9102 | sarah.jenkins@stanford.edu\nGitHub: github.com/sjenkins-codes | LinkedIn: linkedin.com/in/sarah-jenkins-dev\n\nSUMMARY\nResult-driven Senior Full-Stack Engineer with 6+ years of experience. Expert in React, Node.js, and TypeScript.\n\nPROFESSIONAL EXPERIENCE\n\nStripe - San Francisco, CA\nSenior Software Engineer | Jan 2022 - Present\n- Led a cross-functional engineering team of 6 to rebuild Stripe's developer checkout onboarding portal.\n- Mentored 4 junior engineers and designed internal React component library, boosting team velocity by 25%.\n- Designed and optimized high-throughput Node.js microservices processing over 12,000 requests per minute with 99.99% uptime.\n\nAirbnb - San Francisco, CA\nSoftware Engineer II | June 2018 - Dec 2021\n- Developed complex map-based search interfaces using React, Redux, and GraphQL, increasing search engagement by 14%.\n\nEDUCATION\n\nStanford University\nBachelor of Science in Computer Science, GPA: 3.8/4.0 | Graduated 2018\n\nTECHNICAL SKILLS\n- Languages: TypeScript, JavaScript, Python, Go, SQL\n- Frameworks: React, Next.js, Node.js, Express, Redux, GraphQL, Tailwind CSS, Jest\n- Cloud/DB: PostgreSQL, Redis, MongoDB, AWS, Docker\n\nCERTIFICATIONS\n- AWS Certified Solutions Architect - Associate (Amazon Web Services, 2023)`,
    careerPreferences: {
      targetRole: 'Senior Full-Stack Developer',
      preferredRoles: ['Senior Full-Stack Engineer', 'Lead Web Developer', 'Staff Software Engineer', 'API Platform Developer'],
      experienceLevel: 'Senior',
      preferredLocations: ['San Francisco, CA', 'Remote', 'Oakland, CA', 'San Jose, CA'],
      employmentTypes: ['Full-time', 'Contract'],
      preferredIndustries: ['Technology', 'FinTech', 'AI/ML', 'Developer Infrastructure'],
      expectedSalaryMin: 175000,
      expectedSalaryMax: 225000,
      preferredWorkMode: 'Remote',
      preferredTechnologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      careerInterests: ['Backend Systems', 'Developer Tools', 'Open Source', 'Microservices Scaling'],
      careerGoals: 'I am trying to build my career toward leading architecture and engineering team operations for high-throughput developer platform APIs and transaction checkout infrastructure.'
    },
    insights: {
      profileStrength: 85,
      strengths: [
        'Strong TypeScript & React foundations validated in Stripe dashboard migrations.',
        '6+ years professional experience across high-growth startups (Stripe, Airbnb).',
        'Demonstrated team mentorship and microservice scaling operations.'
      ],
      improvements: [
        'AWS Cloud orchestration experience is listed but lacks concrete operational bullets in Stripe/Airbnb responsibilities.',
        'Add professional summary to reinforce senior technical capabilities.'
      ],
      nextSteps: [
        'Complete your professional summary to highlight system design expertise.',
        'Link your GitHub profiles and active open-source projects.',
        'Add detailed description of AWS Solutions Architect associate certificate implementations.'
      ]
    }
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    email: 'david.chen@mit.edu',
    phone: '+1 (617) 293-8472',
    location: 'Boston, MA',
    links: {
      linkedin: 'linkedin.com/in/dchen-ml',
      github: 'github.com/dchen-mit'
    },
    education: [
      {
        degree: 'Master of Science in Artificial Intelligence',
        institution: 'MIT',
        graduationYear: '2020',
        details: 'Specialization in NLP and Deep Learning. Thesis on transformer models optimization.'
      }
    ],
    experience: [
      {
        title: 'Machine Learning Engineer',
        company: 'Anthropic',
        duration: 'Oct 2022 - Present',
        responsibilities: [
          'Optimized inference pipelines for Large Language Models (LLMs), achieving a 40% reduction in latency and 30% GPU memory savings.',
          'Fine-tuned transformer models on domain-specific datasets using PyTorch, Hugging Face, and DeepSpeed.'
        ]
      }
    ],
    skills: [
      {
        category: 'ML/AI Specialties',
        items: ['Deep Learning', 'NLP', 'Transformers', 'LLM Fine-Tuning', 'Embedding Search']
      },
      {
        category: 'Languages & Frameworks',
        items: ['Python', 'C++', 'PyTorch', 'TensorFlow', 'Hugging Face', 'NumPy', 'Pandas']
      }
    ],
    projects: [
      {
        name: 'LiteAttention',
        description: 'An open-source library implementing sparse self-attention mechanism in PyTorch.',
        technologies: ['Python', 'PyTorch', 'CUDA'],
        url: 'github.com/dchen-mit/lite-attention'
      }
    ],
    certifications: [],
    achievements: ['NeurIPS Outstanding Reviewer Award (2022)'],
    languages: ['English (Native)', 'Mandarin (Fluent)'],
    resumeText: `DAVID CHEN\nBoston, MA | +1 (617) 293-8472 | david.chen@mit.edu\nGitHub: github.com/dchen-mit | LinkedIn: linkedin.com/in/dchen-ml\n\nSUMMARY\nMachine Learning Engineer with 6 years of deep learning and NLP experience. Expert in transformer fine-tuning and inference optimizations.\n\nPROFESSIONAL EXPERIENCE\n\nAnthropic - Boston, MA\nMachine Learning Engineer | Oct 2022 - Present\n- Optimized inference pipelines for Large Language Models (LLMs), achieving a 40% reduction in latency and 30% GPU memory savings.\n- Fine-tuned transformer models on domain-specific datasets using PyTorch, Hugging Face, and DeepSpeed.\n\nEDUCATION\n\nMassachusetts Institute of Technology (MIT)\nMaster of Science in Artificial Intelligence | Graduated 2020`
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    email: 'elena.rostova@wharton.upenn.edu',
    phone: '+1 (215) 839-4729',
    location: 'New York, NY',
    links: {
      linkedin: 'linkedin.com/in/elena-rostova-pm'
    },
    education: [
      {
        degree: 'Master of Business Administration (MBA)',
        institution: 'Wharton School, UPenn',
        graduationYear: '2021',
        details: 'Major in Operations & Information Decisions.'
      },
      {
        degree: 'Bachelor of Science in Software Engineering',
        institution: 'Columbia University',
        graduationYear: '2016',
        gpa: '3.7/4.0'
      }
    ],
    experience: [
      {
        title: 'Senior Product Manager',
        company: 'Uber',
        duration: 'Aug 2021 - Present',
        responsibilities: [
          'Product owner for Uber Eats merchant dashboard used by 800,000+ active restaurants worldwide.',
          'Launched new automated menu recommendations feature, increasing restaurant upsells by $40M ARR within 6 months.'
        ]
      },
      {
        title: 'Software Engineer & Tech Lead',
        company: 'Bloomberg LP',
        duration: 'June 2016 - Aug 2019',
        responsibilities: [
          'Led development of the real-time news alert platform, reducing messaging latency to under 50ms.',
          'Transitioned backend API services from C++ to Go, improving system throughput by 80%.'
        ]
      }
    ],
    skills: [
      {
        category: 'Product Management',
        items: ['Product Strategy', 'Roadmapping', 'Agile/Scrum', 'A/B Testing', 'Product Analytics', 'User Research']
      },
      {
        category: 'Technical & Analytical',
        items: ['SQL', 'Python', 'Go', 'System Design', 'Amplitude', 'Mixpanel', 'Tableau', 'C++']
      }
    ],
    projects: [
      {
        name: 'RestoInsight API',
        description: 'Flask-based regression analysis tool for restaurant inventory planning.',
        technologies: ['Python', 'Flask', 'PostgreSQL']
      }
    ],
    certifications: ['Certified Scrum Product Owner (CSPO)'],
    achievements: ['Delivered $40M ARR growth feature at Uber in 2022'],
    languages: ['English (Fluent)', 'Russian (Native)'],
    resumeText: `ELENA ROSTOVA\nNew York, NY | +1 (215) 839-4729 | elena.rostova@wharton.upenn.edu\nLinkedIn: linkedin.com/in/elena-rostova-pm\n\nSUMMARY\nSenior Product Manager with 3 years of PM experience and 3 years of technical developer background.\n\nPROFESSIONAL EXPERIENCE\n\nUber - New York, NY\nSenior Product Manager | Aug 2021 - Present\n- Product owner for Uber Eats merchant dashboard used by 800,000+ active restaurants worldwide.\n- Launched new automated menu recommendations feature, increasing restaurant upsells by $40M ARR within 6 months.\n\nBloomberg LP - New York, NY\nSoftware Engineer & Technical Lead | June 2016 - Aug 2019\n- Led development of the real-time news alert platform, reducing messaging latency to under 50ms.\n- Transitioned backend API services from C++ to Go, improving system throughput by 80%.\n\nEDUCATION\n\nWharton School, UPenn\nMBA | Graduated 2021\n\nColumbia University\nBachelor of Science in Software Engineering, GPA: 3.7/4.0 | Graduated 2016`
  },
  {
    id: 'marcus-thompson',
    name: 'Marcus Thompson',
    email: 'marcus.thompson@devmail.net',
    phone: '+1 (415) 728-3901',
    location: 'Oakland, CA',
    links: {
      github: 'github.com/marcus-t-codes'
    },
    education: [
      {
        degree: 'Associate of Applied Science in Web Development',
        institution: 'Lanier Technical College',
        graduationYear: '2020'
      }
    ],
    experience: [
      {
        title: 'Frontend Developer',
        company: 'AppScale Startups',
        duration: 'Mar 2021 - Present',
        responsibilities: [
          'Developed responsive marketing pages and web applications for 15+ startup clients using React, HTML5, and CSS3.',
          'Maintained high client satisfaction ratings by implementing designs exactly as provided in Figma files.'
        ]
      }
    ],
    skills: [
      {
        category: 'Web Tech',
        items: ['JavaScript', 'HTML5', 'CSS3', 'React', 'jQuery', 'Bootstrap', 'Sass']
      },
      {
        category: 'Design & Tools',
        items: ['Figma', 'Git', 'Webpack', 'Photoshop']
      }
    ],
    projects: [
      {
        name: 'PixelArt Canvas',
        description: 'A browser-based interactive pixel art editor supporting custom colors.',
        technologies: ['JavaScript', 'HTML5', 'CSS3']
      }
    ],
    certifications: [],
    achievements: [],
    languages: ['English (Native)'],
    resumeText: `MARCUS THOMPSON\nOakland, CA | +1 (415) 728-3901 | marcus.thompson@devmail.net\nGitHub: github.com/marcus-t-codes\n\nSUMMARY\nCreative Frontend Developer with 3+ years of experience specializing in highly interactive, responsive user interfaces.\n\nPROFESSIONAL EXPERIENCE\n\nAppScale Startups - San Francisco, CA (Remote)\nFrontend Developer | Mar 2021 - Present\n- Developed responsive marketing pages and web applications for 15+ startup clients using React, HTML5, and CSS3.\n\nEDUCATION\n\nLanier Technical College\nAssociate of Applied Science in Web Development | Graduated 2020`
  },
  {
    id: 'aisha-patel',
    name: 'Aisha Patel',
    email: 'aisha.patel@cloudnet.org',
    phone: '+1 (206) 482-9018',
    location: 'Seattle, WA',
    links: {
      linkedin: 'linkedin.com/in/aisha-patel-cloud',
      github: 'github.com/apatel-ops'
    },
    education: [
      {
        degree: 'Bachelor of Science in Computer Science & Systems',
        institution: 'University of Washington',
        graduationYear: '2019',
        gpa: '3.6/4.0'
      }
    ],
    experience: [
      {
        title: 'DevOps & Site Reliability Engineer',
        company: 'Cloudflare',
        duration: 'Oct 2021 - Present',
        responsibilities: [
          'Maintained CI/CD pipelines deploying over 150 times daily across multiple global Kubernetes clusters.',
          'Reduced AWS and cloud provider monthly spend by 30% through automated resource sizing and migration to Spot Instances.'
        ]
      },
      {
        title: 'Cloud Infrastructure Engineer',
        company: 'F5 Networks',
        duration: 'July 2019 - Sep 2021',
        responsibilities: [
          'Deployed and monitored multi-region workloads in AWS using EC2, RDS, VPC, and CloudWatch.'
        ]
      }
    ],
    skills: [
      {
        category: 'DevOps & IAC',
        items: ['Terraform', 'Ansible', 'Docker', 'Kubernetes', 'Helm', 'CI/CD']
      },
      {
        category: 'Cloud & OS',
        items: ['AWS', 'Google Cloud', 'Linux (Ubuntu/CentOS)', 'Bash Scripting', 'Nginx']
      }
    ],
    projects: [
      {
        name: 'AutoKubeScale',
        description: 'Kubernetes custom controller that scales deployments based on custom Prometheus queue length metrics.',
        technologies: ['Go', 'Kubernetes API', 'Prometheus', 'Docker']
      }
    ],
    certifications: [
      'Certified Kubernetes Administrator (CKA, 2022)'
    ],
    achievements: [],
    languages: ['English (Native)', 'Hindi (Fluent)'],
    resumeText: `AISHA PATEL\nSeattle, WA | +1 (206) 482-9018 | aisha.patel@cloudnet.org\nGitHub: github.com/apatel-ops | LinkedIn: linkedin.com/in/aisha-patel-cloud\n\nSUMMARY\nSRE specialist with 5+ years of experience optimizing CI/CD pipelines, container orchestration, and Infrastructure-as-Code.\n\nPROFESSIONAL EXPERIENCE\n\nCloudflare - Seattle, WA\nDevOps & Site Reliability Engineer | Oct 2021 - Present\n- Maintained CI/CD pipelines deploying over 150 times daily across multiple global Kubernetes clusters.\n- Reduced AWS and cloud provider monthly spend by 30% through automated resource sizing and migration to Spot Instances.\n\nF5 Networks - Seattle, WA\nCloud Infrastructure Engineer | July 2019 - Sep 2021\n- Deployed and monitored multi-region workloads in AWS using EC2, RDS, VPC, and CloudWatch.\n\nEDUCATION\n\nUniversity of Washington\nBS in Computer Science & Systems, GPA: 3.6/4.0 | Graduated 2019`
  },
  {
    id: 'rahul-kumar',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@devnet.in',
    phone: '+91 (987) 654-3210',
    location: 'Bangalore, India',
    links: {
      github: 'github.com/rahul-k-backend'
    },
    education: [
      {
        degree: 'Bachelor of Technology in Computer Science',
        institution: 'IIIT Bangalore',
        graduationYear: '2024'
      }
    ],
    experience: [
      {
        title: 'Associate Backend Engineer',
        company: 'InnovateTech Systems',
        duration: 'June 2024 - Present',
        responsibilities: [
          'Developed backend applications using Python and SQL, creating REST endpoints for dashboard modules.',
          'Constructed API test suites with PyTest and containerized microservices using Docker for streamlined testing.',
          'Interfaced with PostgreSQL database clusters, writing optimized queries and managing migrations.'
        ]
      }
    ],
    skills: [
      {
        category: 'Backend Stack',
        items: ['Python', 'FastAPI', 'SQL', 'PostgreSQL', 'Docker', 'REST APIs', 'SQLAlchemy']
      },
      {
        category: 'Tools',
        items: ['Git', 'Docker', 'Postman', 'Linux']
      }
    ],
    projects: [
      {
        name: 'RestoStore',
        description: 'Microservice-based online food order database API.',
        technologies: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker']
      }
    ],
    certifications: [],
    achievements: [],
    languages: ['English', 'Hindi', 'Kannada'],
    resumeText: `RAHUL KUMAR\nBangalore, India | +91 (987) 654-3210 | rahul.kumar@devnet.in\nGitHub: github.com/rahul-k-backend\n\nSUMMARY\nBackend Developer with 1.5 years of experience specializing in Python and REST API development.\n\nPROFESSIONAL EXPERIENCE\n\nInnovateTech Systems - Bangalore, India\nAssociate Backend Engineer | June 2024 - Present\n- Developed backend applications using Python and SQL, creating REST endpoints for dashboard modules.\n- Constructed API test suites with PyTest and containerized microservices using Docker for streamlined testing.\n- Interfaced with PostgreSQL database clusters, writing optimized queries and managing migrations.\n\nEDUCATION\n\nIIIT Bangalore\nBachelor of Technology in Computer Science | Graduated 2024\n\nTECHNICAL SKILLS\n- Languages/DB: Python, FastAPI, SQL, PostgreSQL, SQLAlchemy\n- Tools: Docker, REST APIs, Git, Postman, Linux`
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    email: 'priya.sharma@webdesign.com',
    phone: '+1 (408) 392-8471',
    location: 'San Jose, CA',
    links: {
      linkedin: 'linkedin.com/in/priya-sharma-frontend',
      github: 'github.com/priya-sharma-codes'
    },
    education: [
      {
        degree: 'Bachelor of Science in Web Engineering',
        institution: 'San Jose State University',
        graduationYear: '2022',
        gpa: '3.9/4.0'
      }
    ],
    experience: [
      {
        title: 'Frontend Web Engineer',
        company: 'CreativeSaaS LLC',
        duration: 'July 2022 - Present',
        responsibilities: [
          'Built responsive user interfaces for SaaS web applications using React, Next.js, and TypeScript, boosting conversion by 20%.',
          'Worked closely with product designers to implement pixel-perfect Figma translations with complex CSS animations.',
          'Integrated REST APIs and GraphQL schemas, managing state using Redux Toolkit.'
        ]
      }
    ],
    skills: [
      {
        category: 'Web Architecture',
        items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux Toolkit', 'Figma']
      },
      {
        category: 'Methodologies',
        items: ['Responsive Web Design', 'CSS Animations', 'Git', 'WCAG Accessibility']
      }
    ],
    projects: [
      {
        name: 'DesignSystem Kit',
        description: 'Open-source Tailwind component library focusing on clean interactions and accessibility.',
        technologies: ['React', 'Tailwind CSS', 'TypeScript']
      }
    ],
    certifications: [],
    achievements: ['SJSU Graduated with Summa Cum Laude honors'],
    languages: ['English (Native)', 'Hindi (Fluent)'],
    resumeText: `PRIYA SHARMA\nSan Jose, CA | +1 (408) 392-8471 | priya.sharma@webdesign.com\nGitHub: github.com/priya-sharma-codes | LinkedIn: linkedin.com/in/priya-sharma-frontend\n\nSUMMARY\nFrontend Web Developer with 3 years of experience. Expert in React, Next.js, TypeScript, and Figma-to-code translations.\n\nPROFESSIONAL EXPERIENCE\n\nCreativeSaaS LLC - San Jose, CA\nFrontend Web Engineer | July 2022 - Present\n- Built responsive user interfaces for SaaS web applications using React, Next.js, and TypeScript.\n- Worked closely with product designers to implement pixel-perfect Figma translations with complex CSS animations.\n- Integrated REST APIs and GraphQL schemas, managing state using Redux Toolkit.\n\nEDUCATION\n\nSan Jose State University\nBachelor of Science in Web Engineering, GPA: 3.9/4.0 | Graduated 2022`
  },
  {
    id: 'arjun-patel',
    name: 'Arjun Patel',
    email: 'arjun.patel@aitrader.io',
    phone: '+1 (312) 482-9034',
    location: 'Chicago, IL',
    links: {
      linkedin: 'linkedin.com/in/arjun-ml-engineer',
      github: 'github.com/arjunp-ai'
    },
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Illinois Chicago (UIC)',
        graduationYear: '2023'
      }
    ],
    experience: [
      {
        title: 'Machine Learning Analyst',
        company: 'CapitalAI Solutions',
        duration: 'June 2023 - Present',
        responsibilities: [
          'Built Python data pipelines processing textual logs to detect fraudulent trading transactions.',
          'Fine-tuned NLP models and transformer classifiers using PyTorch and Hugging Face pipelines.',
          'Leveraged Pandas and Scikit-Learn to build clustering models that grouped active trade patterns.'
        ]
      }
    ],
    skills: [
      {
        category: 'Data & ML Stack',
        items: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Pandas', 'Scikit-Learn', 'SQL']
      },
      {
        category: 'Dev Tools',
        items: ['Git', 'Docker', 'Jupyter Notebook', 'FastAPI']
      }
    ],
    projects: [
      {
        name: 'TextClust',
        description: 'CLI tool to cluster textual log files based on semantic embeddings.',
        technologies: ['Python', 'HuggingFace', 'Scikit-Learn']
      }
    ],
    certifications: [],
    achievements: [],
    languages: ['English', 'Gujarati'],
    resumeText: `ARJUN PATEL\nChicago, IL | +1 (312) 482-9034 | arjun.patel@aitrader.io\nGitHub: github.com/arjunp-ai | LinkedIn: linkedin.com/in/arjun-ml-engineer\n\nSUMMARY\nML Engineer with 2 years of experience specializing in NLP, transformers, and python data pipelines.\n\nPROFESSIONAL EXPERIENCE\n\nCapitalAI Solutions - Chicago, IL\nMachine Learning Analyst | June 2023 - Present\n- Built Python data pipelines processing textual logs to detect fraudulent trading transactions.\n- Fine-tuned NLP models and transformer classifiers using PyTorch and Hugging Face pipelines.\n- Leveraged Pandas and Scikit-Learn to build clustering models that grouped active trade patterns.\n\nEDUCATION\n\nUniversity of Illinois Chicago (UIC)\nBachelor of Science in Computer Science | Graduated 2023`
  }
];

export const mockAnalyses: Record<string, CandidateAnalysis> = {
  'sarah-jenkins': {
    candidateId: 'sarah-jenkins',
    jobTitle: 'Senior Full-Stack Developer',
    jobDescription: 'Seeking a Senior Full-Stack Engineer with 5+ years of software development experience. Must be highly skilled in React, Node.js, and TypeScript. Experience leading engineering squads is highly desired. Top tier degree preferred.',
    matchResult: {
      overallScore: 94,
      status: 'Strong Match',
      breakdown: { technical: 96, experience: 95, education: 90, projects: 95 },
      strengths: [
        { point: 'Leading Stripe microservice architecture development with Node.js and TypeScript.', evidenceId: 'sarah-ev-1' },
        { point: 'Led Stripe checkout onboarding squad of 6 developers.', evidenceId: 'sarah-ev-2' },
        { point: 'BS in Computer Science from Stanford University.', evidenceId: 'sarah-ev-3' }
      ],
      gaps: [],
      aiExplanation: 'Sarah is an outstanding candidate with 6 years of experience, direct team leadership, and a solid CS foundation from Stanford.'
    },
    requirements: [
      { id: 'sarah-req-1', requirement: '5+ years software experience', category: 'experience', status: 'strong_match', explanation: 'Has 6 years of experience across Stripe and Airbnb.', evidenceId: 'sarah-ev-4' },
      { id: 'sarah-req-2', requirement: 'TypeScript/Node/React', category: 'technical', status: 'strong_match', explanation: 'Uses TypeScript, React, and Node.js in all roles.', evidenceId: 'sarah-ev-1' },
      { id: 'sarah-req-3', requirement: 'Team leadership', category: 'experience', status: 'strong_match', explanation: 'Led an onboarding engineering squad of 6 at Stripe.', evidenceId: 'sarah-ev-2' },
      { id: 'sarah-req-4', requirement: 'Top tier university degree', category: 'education', status: 'strong_match', explanation: 'Graduated from Stanford University with a BS in CS.', evidenceId: 'sarah-ev-3' }
    ],
    evidence: [
      { id: 'sarah-ev-1', claim: 'TypeScript/Node/React', quote: 'Design and optimized high-throughput Node.js microservices ... React, TypeScript, and Tailwind CSS', section: 'Experience - Stripe' },
      { id: 'sarah-ev-2', claim: 'Team leadership', quote: 'Led a cross-functional engineering team of 6 to rebuild Stripe\'s developer checkout onboarding portal', section: 'Experience - Stripe' },
      { id: 'sarah-ev-3', claim: 'BS Computer Science', quote: 'Bachelor of Science in Computer Science ... Stanford University', section: 'Education' },
      { id: 'sarah-ev-4', claim: '5+ years experience', quote: 'Senior Software Engineer ... Jan 2022 - Present ... Software Engineer II ... June 2018 - Dec 2021', section: 'Experience' }
    ]
  },
  
  'david-chen': {
    candidateId: 'david-chen',
    jobTitle: 'Machine Learning Engineer',
    jobDescription: 'Seeking an ML Engineer with deep expertise in Natural Language Processing, Transformer architectures, and Large Language Models (LLMs). An MS or PhD is highly preferred.',
    matchResult: {
      overallScore: 89,
      status: 'Strong Match',
      breakdown: { technical: 94, experience: 85, education: 95, projects: 80 },
      strengths: [
        { point: 'Inference pipelines optimization and fine-tuning transformer models at Anthropic.', evidenceId: 'david-ev-1' },
        { point: 'Master of Science in Artificial Intelligence from MIT.', evidenceId: 'david-ev-2' }
      ],
      gaps: [],
      aiExplanation: 'David possesses top-tier credentials, including hands-on LLM engineering at Anthropic and an MS from MIT.'
    },
    requirements: [
      { id: 'david-req-1', requirement: 'NLP and Transformers', category: 'technical', status: 'strong_match', explanation: 'Thesis on transformer models optimization at MIT and prompt optimization at Microsoft.', evidenceId: 'david-ev-2' },
      { id: 'david-req-2', requirement: 'LLM Fine-tuning', category: 'technical', status: 'strong_match', explanation: 'Fine-tuned transformer models on domain-specific datasets using PyTorch/Hugging Face.', evidenceId: 'david-ev-1' },
      { id: 'david-req-3', requirement: 'MS/PhD in AI or CS', category: 'education', status: 'strong_match', explanation: 'Holds an MS in AI from MIT.', evidenceId: 'david-ev-2' }
    ],
    evidence: [
      { id: 'david-ev-1', claim: 'LLM Fine-tuning', quote: 'Fine-tuned transformer models on domain-specific datasets using PyTorch, Hugging Face, and DeepSpeed.', section: 'Experience - Anthropic' },
      { id: 'david-ev-2', claim: 'MS in AI from MIT', quote: 'Master of Science in Artificial Intelligence | MIT ... Thesis on transformer models optimization.', section: 'Education' }
    ]
  },

  'elena-rostova': {
    candidateId: 'elena-rostova',
    jobTitle: 'Technical Product Manager',
    jobDescription: 'Looking for a Technical PM with software engineering roots. Own roadmap development and lead agile engineering squads. MBA desired.',
    matchResult: {
      overallScore: 78,
      status: 'Good Match',
      breakdown: { technical: 80, experience: 85, education: 90, projects: 50 },
      strengths: [
        { point: 'Product manager for Uber Eats merchant dashboard, delivering ARR gains.', evidenceId: 'elena-ev-2' },
        { point: '3 years developer experience at Bloomberg LP writing C++ and Go.', evidenceId: 'elena-ev-1' }
      ],
      gaps: [],
      aiExplanation: 'Elena is a strong candidate, combining Ivy League engineering (Columbia) with business strategy (Wharton MBA).'
    },
    requirements: [
      { id: 'elena-req-1', requirement: 'Product management experience', category: 'experience', status: 'match', explanation: 'PM at Uber since 2021.', evidenceId: 'elena-ev-2' },
      { id: 'elena-req-2', requirement: 'Agile squad leadership', category: 'experience', status: 'strong_match', explanation: 'Led Uber team of 10 engineers and designers.', evidenceId: 'elena-ev-2' },
      { id: 'elena-req-3', requirement: 'Software engineering background', category: 'technical', status: 'strong_match', explanation: 'C++ and Go Software Engineer at Bloomberg LP.', evidenceId: 'elena-ev-1' }
    ],
    evidence: [
      { id: 'elena-ev-1', claim: 'Software engineering background', quote: 'Bloomberg LP ... Software Engineer & Technical Lead | June 2016 - Aug 2019 ... Transitioned backend API services from C++ to Go', section: 'Experience - Bloomberg' },
      { id: 'elena-ev-2', claim: 'Uber PM & Agile squad', quote: 'Uber Eats merchant dashboard ... Led a remote team of 10 engineers, 2 product designers, and 1 data scientist using Agile', section: 'Experience - Uber' }
    ]
  },

  'marcus-thompson': {
    candidateId: 'marcus-thompson',
    jobTitle: 'Senior Frontend Engineer',
    jobDescription: 'Seeking Senior Frontend Engineer with 5+ years experience, expert React/CSS, and strong TypeScript.',
    matchResult: {
      overallScore: 62,
      status: 'Needs Review',
      breakdown: { technical: 65, experience: 55, education: 50, projects: 60 },
      strengths: [
        { point: 'Responsive CSS designs and Figma conversions.', evidenceId: 'marcus-ev-1' }
      ],
      gaps: [
        { point: 'Missing TypeScript', description: 'TypeScript is not listed on candidate resume or experience.' },
        { point: 'Tenure gap', description: 'Has 3 years experience, which is below the 5+ years requirement.' }
      ],
      aiExplanation: 'Marcus shows strong junior-to-mid CSS layout skills, but is missing typescript and senior tenure requirements.'
    },
    requirements: [
      { id: 'marcus-req-1', requirement: '5+ years experience', category: 'experience', status: 'not_met', explanation: 'Has 3 years of frontend experience (since 2021).', evidenceId: 'marcus-ev-2' },
      { id: 'marcus-req-2', requirement: 'Expert React & TypeScript', category: 'technical', status: 'not_met', explanation: 'React is listed, but TypeScript is completely unmentioned.', evidenceId: 'marcus-ev-3' }
    ],
    evidence: [
      { id: 'marcus-ev-1', claim: 'Figma and React CSS', quote: 'Web Tech: JavaScript, HTML5, CSS3, React ... Figma, Git, Webpack', section: 'Skills' },
      { id: 'marcus-ev-2', claim: 'Tenure length', quote: 'Frontend Developer | Mar 2021 - Present', section: 'Experience' },
      { id: 'marcus-ev-3', claim: 'Missing TypeScript', quote: 'Not Mentioned', section: 'Skills' }
    ]
  },

  'aisha-patel': {
    candidateId: 'aisha-patel',
    jobTitle: 'DevOps Engineer',
    jobDescription: 'Seeking DevOps specialist with Kubernetes, Terraform IaC, and cloud platform experience.',
    matchResult: {
      overallScore: 85,
      status: 'Strong Match',
      breakdown: { technical: 90, experience: 85, education: 80, projects: 85 },
      strengths: [
        { point: 'Certified Kubernetes Administrator (CKA).', evidenceId: 'aisha-ev-1' },
        { point: 'Terraform and Ansible IaC modules.', evidenceId: 'aisha-ev-2' }
      ],
      gaps: [],
      aiExplanation: 'Aisha is a very strong DevOps match with validated Kubernetes operations and Terraform IaC skills.'
    },
    requirements: [
      { id: 'aisha-req-1', requirement: 'Kubernetes container management', category: 'technical', status: 'strong_match', explanation: 'Managed global Kubernetes clusters deploying 150 times daily.', evidenceId: 'aisha-ev-1' },
      { id: 'aisha-req-2', requirement: 'Terraform IaC', category: 'technical', status: 'strong_match', explanation: 'Built reusable Terraform & Ansible modules.', evidenceId: 'aisha-ev-2' }
    ],
    evidence: [
      { id: 'aisha-ev-1', claim: 'Kubernetes SRE', quote: 'deploying over 150 times daily across multiple global Kubernetes clusters. ... Certified Kubernetes Administrator', section: 'Experience / Certs' },
      { id: 'aisha-ev-2', claim: 'Terraform modules', quote: 'Managed infrastructure as code using Terraform and Ansible, creating reusable modules', section: 'Experience' }
    ]
  },

  'rahul-kumar': {
    candidateId: 'rahul-kumar',
    jobTitle: 'Backend Developer',
    jobDescription: 'Seeking a Backend Developer with experience building Python apps, implementing SQL databases (PostgreSQL preferred), Docker containerization, and developing REST APIs.',
    matchResult: {
      overallScore: 82,
      status: 'Good Match',
      breakdown: { technical: 88, experience: 70, education: 80, projects: 85 },
      strengths: [
        { point: 'Direct Python and SQL backend development experience.', evidenceId: 'rahul-ev-1' },
        { point: 'FastAPI REST API design and Docker containerization.', evidenceId: 'rahul-ev-2' }
      ],
      gaps: [
        { point: 'Junior tenure', description: 'Rahul has 1.5 years experience which is slightly short of the standard mid-level threshold, though he has strong foundational tools.' }
      ],
      aiExplanation: 'Rahul Kumar is a strong Python backend match. He meets all core technical requirements (Python, SQL, FastAPI, Docker). His experience is general, but his coding foundation is solid.'
    },
    requirements: [
      { id: 'rahul-req-1', requirement: 'Python and SQL database usage', category: 'technical', status: 'strong_match', explanation: 'Developed backend applications using Python and SQL database layers.', evidenceId: 'rahul-ev-1' },
      { id: 'rahul-req-2', requirement: 'Docker containerization', category: 'technical', status: 'strong_match', explanation: 'Containerized microservices using Docker for testing environments.', evidenceId: 'rahul-ev-3' },
      { id: 'rahul-req-3', requirement: 'REST API development', category: 'technical', status: 'strong_match', explanation: 'Created REST API endpoints and dashboard modules using FastAPI.', evidenceId: 'rahul-ev-2' }
    ],
    evidence: [
      { id: 'rahul-ev-1', claim: 'Python and SQL backend', quote: 'Developed backend applications using Python and SQL, creating REST endpoints for dashboard modules.', section: 'Experience' },
      { id: 'rahul-ev-2', claim: 'REST APIs & FastAPI', quote: 'REST API endpoints and dashboard modules using FastAPI. ... SQLAlchemy ... FastAPI, SQL, PostgreSQL', section: 'Experience & Skills' },
      { id: 'rahul-ev-3', claim: 'Docker container', quote: 'containerized microservices using Docker for streamlined testing.', section: 'Experience' }
    ]
  },
  
  'priya-sharma': {
    candidateId: 'priya-sharma',
    jobTitle: 'Frontend Developer',
    jobDescription: 'Seeking a Frontend Web Engineer with 3+ years experience. Expert in React, Next.js, and TypeScript. Must have experience with pixel-perfect Figma translations and CSS animations.',
    matchResult: {
      overallScore: 91,
      status: 'Strong Match',
      breakdown: { technical: 93, experience: 90, education: 90, projects: 90 },
      strengths: [
        { point: 'React, Next.js, and TypeScript developer with CreativeSaaS.', evidenceId: 'priya-ev-1' },
        { point: 'Figma mockups to code translation with CSS animation setups.', evidenceId: 'priya-ev-2' }
      ],
      gaps: [],
      aiExplanation: 'Priya Sharma is an excellent match. She has exactly 3 years experience, uses React/TypeScript, and has a strong design sense.'
    },
    requirements: [
      { id: 'priya-req-1', requirement: '3+ years Frontend React/TS experience', category: 'experience', status: 'strong_match', explanation: 'Has 3 years experience at CreativeSaaS.', evidenceId: 'priya-ev-3' },
      { id: 'priya-req-2', requirement: 'React, Next.js, TypeScript', category: 'technical', status: 'strong_match', explanation: 'React, Next.js, and TypeScript are core elements in her daily stack.', evidenceId: 'priya-ev-1' },
      { id: 'priya-req-3', requirement: 'Figma to code with CSS animations', category: 'technical', status: 'strong_match', explanation: 'Worked with designers to translate Figma modules into code with responsive animations.', evidenceId: 'priya-ev-2' }
    ],
    evidence: [
      { id: 'priya-ev-1', claim: 'React, Next.js, TS', quote: 'SaaS web applications using React, Next.js, and TypeScript ... React, Next.js, TypeScript, JavaScript', section: 'Experience & Skills' },
      { id: 'priya-ev-2', claim: 'Figma & CSS animations', quote: 'pixel-perfect Figma translations with complex CSS animations. ... CSS Animations, Figma', section: 'Experience & Skills' },
      { id: 'priya-ev-3', claim: '3 years experience', quote: 'Frontend Web Engineer | July 2022 - Present', section: 'Experience' }
    ]
  },

  'arjun-patel': {
    candidateId: 'arjun-patel',
    jobTitle: 'ML Engineer',
    jobDescription: 'Seeking an ML Engineer with Python experience, transformer model implementation, NLP knowledge, and data analytics tools (Pandas/Scikit-Learn).',
    matchResult: {
      overallScore: 76,
      status: 'Good Match',
      breakdown: { technical: 82, experience: 70, education: 75, projects: 70 },
      strengths: [
        { point: 'Hands-on Hugging Face and PyTorch fine-tuning experience.', evidenceId: 'arjun-ev-1' },
        { point: 'Data processing pipelines with Pandas and Scikit-Learn.', evidenceId: 'arjun-ev-2' }
      ],
      gaps: [
        { point: 'Limited database exposure', description: 'Lists SQL but lacks backend relational/NoSQL DB integration experience in his responsibilities.' }
      ],
      aiExplanation: 'Arjun is a good junior-to-mid ML engineer. He has 2 years experience, solid python, and Direct transformer modeling familiarity.'
    },
    requirements: [
      { id: 'arjun-req-1', requirement: 'Transformer & NLP models', category: 'technical', status: 'strong_match', explanation: 'Fine-tuned transformer models and classifiers using PyTorch & Hugging Face.', evidenceId: 'arjun-ev-1' },
      { id: 'arjun-req-2', requirement: 'Data analytics (Pandas, Scikit)', category: 'technical', status: 'strong_match', explanation: 'Leveraged Pandas and Scikit-Learn to build trade pattern clusters.', evidenceId: 'arjun-ev-2' }
    ],
    evidence: [
      { id: 'arjun-ev-1', claim: 'Transformers and NLP', quote: 'Fine-tuned NLP models and transformer classifiers using PyTorch and Hugging Face pipelines.', section: 'Experience' },
      { id: 'arjun-ev-2', claim: 'Pandas & Scikit-Learn', quote: 'Leveraged Pandas and Scikit-Learn to build clustering models ... Python, PyTorch, Transformers, NLP, Pandas, Scikit-Learn', section: 'Experience & Skills' }
    ]
  }
};

export const mockJobs: Job[] = [
  {
    id: 'job-fs',
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'We are seeking a Senior Full-Stack Engineer with 5+ years of software development experience. Must be highly skilled in React, Node.js, and TypeScript. Experience leading engineering squads is highly desired. Top tier degree preferred.',
    requirements: [
      '5+ years of software development experience',
      'Expertise in React, Node.js, and TypeScript',
      'Experience leading engineering squads and mentoring junior developers',
      'BS/MS in Computer Science from a top tier university'
    ],
    responsibilities: [
      'Lead design and implementation of dashboard modules and developer portals',
      'Optimize API endpoints and microservices for maximum uptime and latency reduction',
      'Mentor junior engineers and collaborate with UX product designers'
    ],
    applicantsCount: 12,
    shortlistedCount: 4,
    interviewsCount: 2,
    createdDate: '2026-08-10',
    status: 'active',
    experience: '5+ years',
    salaryRange: '$160,000 - $190,000',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'job-ml',
    title: 'Machine Learning Engineer',
    department: 'Research & AI',
    location: 'Boston, MA (Hybrid)',
    type: 'Full-time',
    description: 'We are seeking a Machine Learning Engineer with deep expertise in Natural Language Processing (NLP), transformer architectures, and Large Language Models (LLMs). Experience in training frameworks (PyTorch, DeepSpeed) and vector indexing (Pinecone) is required.',
    requirements: [
      'Deep knowledge of transformer model architectures and fine-tuning strategies',
      'Hands-on PyTorch, Hugging Face, and deep speed training experience',
      'Familiarity with vector databases (Pinecone, Milvus)',
      'MS or PhD in Artificial Intelligence / Computer Science'
    ],
    responsibilities: [
      'Fine-tune pre-trained models on domain datasets to optimize domain search',
      'Benchmark and optimize model inference endpoints on GPU cluster instances',
      'Publish research findings and implement production-ready semantic indexers'
    ],
    applicantsCount: 8,
    shortlistedCount: 3,
    interviewsCount: 1,
    createdDate: '2026-08-12',
    status: 'active',
    experience: '3+ years',
    salaryRange: '$170,000 - $210,000',
    skills: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Pinecone', 'Docker']
  },
  {
    id: 'job-pm',
    title: 'Technical Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for a Technical Product Manager to lead SaaS merchant analytics modules. The ideal candidate has a software development background, strong data analysis chops (SQL, Tableau), and agile scrum experience.',
    requirements: [
      '4+ years of product management owning SaaS web apps',
      'Prior professional software engineering experience (C++, Go, Java)',
      'Strong SQL and metrics analytics experience (Amplitude, Mixpanel)',
      'MBA or equivalent business operation training'
    ],
    responsibilities: [
      'Define product roadmap, author specs, and manage requirements backlog',
      'Own product metric analytics and perform user research with customers',
      'Lead sprint standups and align cross-functional engineering squads'
    ],
    applicantsCount: 15,
    shortlistedCount: 2,
    interviewsCount: 2,
    createdDate: '2026-08-08',
    status: 'active',
    experience: '4+ years',
    salaryRange: '$150,000 - $180,000',
    skills: ['Product Strategy', 'Roadmapping', 'Agile', 'SQL', 'Amplitude', 'System Design']
  },
  {
    id: 'job-do',
    title: 'DevOps Engineer',
    department: 'Operations',
    location: 'Seattle, WA',
    type: 'Full-time',
    description: 'Looking for a DevOps/SRE Engineer to maintain continuous deployment workflows across global multi-region Kubernetes clusters. Strong Terraform IaC experience is required.',
    requirements: [
      '4+ years DevOps experience with focus on infrastructure scalability',
      'Docker, Kubernetes, and Helm container orchestration expert',
      'Infrastructure as Code proficiency using Terraform and Ansible',
      'DevOps certifications (CKA, Terraform Associate)'
    ],
    responsibilities: [
      'Manage CI/CD pipeline automation and monitor resource diagnostic clusters',
      'Architect cost-saving resource scaling programs in AWS/GCP cloud',
      'Formulate disaster recovery modules and optimize logging (ELK stack)'
    ],
    applicantsCount: 6,
    shortlistedCount: 2,
    interviewsCount: 1,
    createdDate: '2026-08-14',
    status: 'active',
    experience: '4+ years',
    salaryRange: '$140,000 - $175,000',
    skills: ['Kubernetes', 'Terraform', 'Docker', 'Ansible', 'AWS', 'CI/CD']
  },
  {
    id: 'job-fe',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Seeking a Senior Frontend Engineer to build accessible, high-performance UI layers. Expert in React, TypeScript, Tailwind CSS, and Figma mock-up translations.',
    requirements: [
      '5+ years frontend engineering experience',
      'Expert React, TypeScript, and modern styling architectures (Tailwind CSS, Sass)',
      'Web accessibility standards compliance (WCAG AA)',
      'BS in CS or related software discipline'
    ],
    responsibilities: [
      'Translate design components into clean, typed, modular code layouts',
      'Perform web optimization diagnostics to reduce bundles and improve latency',
      'Construct automated test coverage suites (Jest, Playwright)'
    ],
    applicantsCount: 10,
    shortlistedCount: 1,
    interviewsCount: 0,
    createdDate: '2026-08-16',
    status: 'paused', // Set to paused status
    experience: '5+ years',
    salaryRange: '$150,000 - $185,000',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Jest']
  },
  {
    id: 'job-qa',
    title: 'Automation QA Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Contract',
    description: 'Seeking a QA Engineer to build test suites using Cypress and Playwright.',
    requirements: ['3+ years automation testing', 'Cypress/Playwright experience'],
    responsibilities: ['Write test plans', 'Execute automated checks'],
    applicantsCount: 4,
    shortlistedCount: 0,
    interviewsCount: 0,
    createdDate: '2026-08-18',
    status: 'draft',
    experience: '3+ years',
    salaryRange: '$80 - $100 / hr',
    skills: ['Playwright', 'Cypress', 'JavaScript', 'QA Automation']
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    candidateId: 'sarah-jenkins',
    candidateName: 'Sarah Jenkins',
    candidateEmail: 'sarah.jenkins@stanford.edu',
    jobId: 'job-fs',
    jobTitle: 'Senior Full-Stack Developer',
    appliedDate: '2026-08-18',
    status: 'Shortlisted',
    matchScore: 94,
    nextStep: 'Schedule technical interview'
  },
  {
    id: 'app-2',
    candidateId: 'david-chen',
    candidateName: 'David Chen',
    candidateEmail: 'david.chen@mit.edu',
    jobId: 'job-ml',
    jobTitle: 'Machine Learning Engineer',
    appliedDate: '2026-08-17',
    status: 'Interview',
    matchScore: 89,
    nextStep: 'System design interview on Friday'
  },
  {
    id: 'app-3',
    candidateId: 'elena-rostova',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.rostova@wharton.upenn.edu',
    jobId: 'job-pm',
    jobTitle: 'Technical Product Manager',
    appliedDate: '2026-08-16',
    status: 'Screening',
    matchScore: 78,
    nextStep: 'Review MBA thesis references'
  },
  {
    id: 'app-4',
    candidateId: 'marcus-thompson',
    candidateName: 'Marcus Thompson',
    candidateEmail: 'marcus.thompson@devmail.net',
    jobId: 'job-fe',
    jobTitle: 'Senior Frontend Engineer',
    appliedDate: '2026-08-15',
    status: 'Applied',
    matchScore: 62,
    nextStep: 'Verify TypeScript capability self-evaluation'
  },
  {
    id: 'app-5',
    candidateId: 'aisha-patel',
    candidateName: 'Aisha Patel',
    candidateEmail: 'aisha.patel@cloudnet.org',
    jobId: 'job-do',
    jobTitle: 'DevOps Engineer',
    appliedDate: '2026-08-14',
    status: 'Offer',
    matchScore: 85,
    nextStep: 'Pending candidate signature'
  },
  {
    id: 'app-6',
    candidateId: 'rahul-kumar',
    candidateName: 'Rahul Kumar',
    candidateEmail: 'rahul.kumar@devnet.in',
    jobId: 'job-fs',
    jobTitle: 'Backend Developer',
    appliedDate: '2026-08-20',
    status: 'Screening',
    matchScore: 82,
    nextStep: 'Review SQL test score'
  },
  {
    id: 'app-7',
    candidateId: 'priya-sharma',
    candidateName: 'Priya Sharma',
    candidateEmail: 'priya.sharma@webdesign.com',
    jobId: 'job-fe',
    jobTitle: 'Frontend Developer',
    appliedDate: '2026-08-19',
    status: 'Shortlisted',
    matchScore: 91,
    nextStep: 'Prepare portfolio design assessment review'
  },
  {
    id: 'app-8',
    candidateId: 'arjun-patel',
    candidateName: 'Arjun Patel',
    candidateEmail: 'arjun.patel@aitrader.io',
    jobId: 'job-ml',
    jobTitle: 'ML Engineer',
    appliedDate: '2026-08-18',
    status: 'Interview',
    matchScore: 76,
    nextStep: 'Introductory recruiter call scheduled'
  }
];

export const mockMessages: MessageThread[] = [
  {
    id: 'msg-1',
    candidateId: 'sarah-jenkins',
    candidateName: 'Sarah Jenkins',
    role: 'Senior Full-Stack Developer',
    messages: [
      { sender: 'recruiter', text: 'Hi Sarah, your fullstack profile looks very strong. We would like to schedule a quick screening call. Are you available this Thursday?', timestamp: '2026-08-19T10:00:00Z' },
      { sender: 'candidate', text: 'Hi Alex, thank you for reaching out! Yes, I am free on Thursday between 2 PM and 5 PM PST. Let me know what time works best.', timestamp: '2026-08-19T11:30:00Z' },
      { sender: 'recruiter', text: 'Great! Let\'s lock in 3:00 PM PST this Thursday. I will send over a calendar invite shortly.', timestamp: '2026-08-19T14:00:00Z' }
    ],
    lastMessageDate: '2026-08-19',
    unread: false
  },
  {
    id: 'msg-2',
    candidateId: 'david-chen',
    candidateName: 'David Chen',
    role: 'Machine Learning Engineer',
    messages: [
      { sender: 'recruiter', text: 'Hi David, your NeurIPS research papers are very impressive. Are you open to scheduling a system design discussion?', timestamp: '2026-08-18T09:00:00Z' },
      { sender: 'candidate', text: 'Thanks Alex. Yes, I\'d be happy to. I\'m currently wrapping up some fine-tuning runs but can talk tomorrow afternoon.', timestamp: '2026-08-18T12:00:00Z' }
    ],
    lastMessageDate: '2026-08-18',
    unread: true
  },
  {
    id: 'msg-3',
    candidateId: 'rahul-kumar',
    candidateName: 'Rahul Kumar',
    role: 'Backend Developer',
    messages: [
      { sender: 'candidate', text: 'Hi, I just submitted my resume for the Backend Developer opening. Looking forward to your response.', timestamp: '2026-08-20T12:00:00Z' }
    ],
    lastMessageDate: '2026-08-20',
    unread: true
  }
];

export const mockRecentActivities: RecentActivity[] = [
  {
    id: 'act-1',
    text: 'Rahul Kumar was moved to Screening stage for Backend Developer.',
    category: 'stage_change',
    timestamp: '10 minutes ago'
  },
  {
    id: 'act-2',
    text: 'Priya Sharma was shortlisted for Senior Frontend Engineer.',
    category: 'shortlist',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-3',
    text: 'New resume uploaded and parsed for Arjun Patel (ML Engineer).',
    category: 'upload',
    timestamp: '1 day ago'
  },
  {
    id: 'act-4',
    text: 'New job opening "Automation QA Engineer" saved as Draft.',
    category: 'job_created',
    timestamp: '2 days ago'
  }
];
