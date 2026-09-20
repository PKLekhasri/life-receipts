export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  education: string;
  occupation: string;
  annualIncome: string;
  state: string;
  district: string;
  preferredLanguage: string;
  skills: string;
}

export interface Opportunity {
  id: string;
  title: string;
  category: 'Scholarship' | 'Government Schemes' | 'Loan' | 'Healthcare' | 'Job' | string;
  description: string;
  benefits: string;
  eligibility: string;
  requiredDocuments: string;
  applicationProcess: string;
  faq: string;
  department: string;
  officialWebsite: string;
  deadline: string;
  status: 'Open' | 'Closing Soon' | 'Closed' | string;
  logoUrl?: string;
  reason?: string;
  score?: number;
}

export interface RecommendationResponse {
  opportunityId: string;
  title: string;
  category: string;
  description: string;
  benefits: string;
  eligibility: string;
  requiredDocuments: string;
  applicationProcess: string;
  faq: string;
  department: string;
  officialWebsite: string;
  deadline: string;
  status: string;
  logoUrl?: string;
  reason: string;
  score: number;
}
