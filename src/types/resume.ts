/* =========================================================
   UPLOAD + STATUS
========================================================= */

export interface UploadResponse {
  resumeId: number;

  status: string;
}

export interface ResumeStatusResponse {
  resumeId: number;

  status: string;

  uploadedAt: string;

  processedAt: string | null;

  failureReason: string | null;
}

/* =========================================================
   COMMON TYPES
========================================================= */

export type Severity = "HIGH" | "MEDIUM" | "LOW";

export type ScoreColor = "GREEN" | "BLUE" | "AMBER" | "RED" | "GRAY";

export interface Suggestion {
  id?: string;

  category: string;

  severity: Severity;

  title?: string;

  message: string;

  icon?: string;

  color?: ScoreColor;
}

export interface Strength {
  id: string;

  category: string;

  message: string;

  color: ScoreColor;

  icon: string;
}

/* =========================================================
   SCORE BREAKDOWN
========================================================= */

export interface ScoreBreakdown {
  category: string;

  title: string;

  layer: string;

  score: number;

  weight: number;

  status: string;

  color: ScoreColor;

  icon: string;

  explanation: string;

  highlights: string[];

  recommendations: string[];
}

/* =========================================================
   DOMAIN INSIGHTS
========================================================= */

export interface DomainInsights {
  detectedDomain: string;

  confidence: number;

  inferredSeniority: string;

  inferredExperienceYears: number;

  expectedSkills: string[];

  detectedSkills: string[];

  missingSkills: string[];

  explanation: string;
}

/* =========================================================
   ATS SCORE
========================================================= */

export interface AtsScore {
  overallScore: number;

  universalScore: number;

  domainRelevanceScore: number;

  atsCompatibilityScore: number;

  impactMetricsScore: number;

  readabilityScore: number;

  actionVerbScore: number;

  contentClarityScore: number;

  resumeLengthScore: number;

  structureQualityScore: number;

  domainInsights: DomainInsights;

  strengths: string[];

  improvements: string[];

  breakdown: ScoreBreakdown[];
}

/* =========================================================
   HEADER SUMMARY
========================================================= */

export interface HeaderSummary {
  fileName: string;

  uploadedAt: string;

  processedAt: string;

  totalPages: number;

  totalWords: number;

  totalCharacters: number;

  processingStatus: string;

  overallScore: number;

  universalScore: number;

  domainRelevanceScore: number;

  detectedRole: string;

  seniority: string;

  experienceYears: number;

  overallStatus: string;

  overallColor: ScoreColor;

  summary: string;
}

/* =========================================================
   SCORE CARDS
========================================================= */

export interface ScoreCard {
  id: string;

  category: string;

  title: string;

  score: number;

  weight: number;

  description: string;

  status: string;

  color: ScoreColor;

  icon: string;
}

/* =========================================================
   KEYWORD OVERVIEW
========================================================= */

export interface KeywordOverview {
  matchedKeywords: number;

  missingKeywords: number;

  totalKeywords: number;

  matchedSkills: string[];

  missingSkills: string[];
}

/* =========================================================
   MAIN RESPONSE
========================================================= */

export interface ResumeAnalysisResponse {
  resumeId: number;

  analysisAvailable: boolean;

  suggestions: Suggestion[];

  header: HeaderSummary;

  scoreCards: ScoreCard[];

  keywordOverview: KeywordOverview;

  strengths: Strength[];

  scoreBreakdown: ScoreBreakdown[];

  /* Optional legacy fields */

  originalFileName?: string;

  processingStatus?: string;

  uploadedAt?: string;

  processedAt?: string;

  failureReason?: string | null;

  totalPages?: number;

  totalWords?: number;

  totalCharacters?: number;

  atsScore?: AtsScore;
}
