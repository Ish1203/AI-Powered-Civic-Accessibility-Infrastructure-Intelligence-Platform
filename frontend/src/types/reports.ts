import type { User } from "./auth";

export type ReportStatus =
  | "REPORTED"
  | "AI VERIFIED"
  | "ASSIGNED"
  | "IN PROGRESS"
  | "RESOLVED"
  | "VERIFICATION"
  | "CLOSED";

export type ReportCategory =
  | "Accessibility"
  | "Road"
  | "Cleanliness"
  | "Public Space"
  | "Pedestrian Safety";

export type Severity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
}

export interface Detection {
  object: string;
  confidence: number;
  boundingBox?: number[];
}

export interface AccessibilityImpact {
  affected: boolean;
  type?: string;
  description?: string;
}

export interface AIAnalysis {
  category: ReportCategory;
  issueType: string;
  confidence: number;
  severity: Severity;
  detectedObjects: Detection[];
  accessibilityImpact: AccessibilityImpact;
  summary?: string;
}

export interface Report {
  id: string;
  civicIssueId: string;
  title: string;
  description: string;
  category: ReportCategory;
  issueType: string;
  severity: Severity;
  status: ReportStatus;

  imageUrl?: string;

  location: LocationData;

  aiAnalysis?: AIAnalysis;

  reporter?: User;

  createdAt: string;
  updatedAt?: string;
}

export interface CreateReportRequest {
  image: File;
  location: LocationData;
  description?: string;
}

export interface SubmitReportRequest {
  reportId: string;
  complaintText: string;
}