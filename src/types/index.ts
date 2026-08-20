export interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
  gpa?: string;
  details?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CareerPreferences {
  targetRole: string;
  preferredRoles: string[];
  experienceLevel: string;
  preferredLocations: string[];
  employmentTypes: string[];
  preferredIndustries: string[];
  expectedSalaryMin: number;
  expectedSalaryMax: number;
  preferredWorkMode: string;
  preferredTechnologies: string[];
  careerInterests: string[];
  careerGoals: string;
}

export interface CandidateInsights {
  profileStrength: number;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: string[];
  achievements: string[];
  languages: string[];
  resumeText: string;
  careerPreferences?: CareerPreferences;
  insights?: CandidateInsights;
}

export interface Evidence {
  id: string;
  claim: string;
  quote: string;
  section: string;
  page?: number;
}

export interface JobRequirement {
  id: string;
  requirement: string;
  category: 'technical' | 'experience' | 'education' | 'projects';
  status: 'strong_match' | 'match' | 'not_found' | 'not_met';
  explanation: string;
  evidenceId?: string; // Links to Evidence
}

export interface MatchResult {
  overallScore: number;
  status: 'Strong Match' | 'Good Match' | 'Needs Review' | 'No Match';
  breakdown: {
    technical: number;
    experience: number;
    education: number;
    projects: number;
  };
  strengths: { point: string; evidenceId: string }[];
  gaps: { point: string; description: string }[];
  aiExplanation: string;
}

export interface CandidateAnalysis {
  candidateId: string;
  jobTitle: string;
  jobDescription: string;
  matchResult: MatchResult;
  requirements: JobRequirement[];
  evidence: Evidence[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // e.g. "Full-time", "Hybrid", "Remote", "Contract"
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicantsCount: number;
  shortlistedCount: number;
  interviewsCount: number;
  createdDate: string;
  status: 'active' | 'draft' | 'closed' | 'paused';
  experience?: string;
  salaryRange?: string;
  skills?: string[];
}

export interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  appliedDate: string;
  status: 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected';
  matchScore: number;
  nextStep: string;
}

export interface Message {
  sender: 'recruiter' | 'candidate';
  text: string;
  timestamp: string;
}

export interface MessageThread {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  messages: Message[];
  lastMessageDate: string;
  unread?: boolean;
}

export interface RecentActivity {
  id: string;
  text: string;
  category: 'shortlist' | 'upload' | 'stage_change' | 'job_created';
  timestamp: string;
}
