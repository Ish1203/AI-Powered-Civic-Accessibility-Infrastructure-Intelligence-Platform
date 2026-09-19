export type Severity="low"|"medium"|"high"|"critical";
export interface Analysis{category:string;issue_type:string;confidence:number;severity:Severity;detected_objects:string[];accessibility_impact:string;explanation:string;complaint:string;priority_score:number;demo_mode?:boolean}
export interface Report{id:number;civic_issue_id:string;title:string;description:string;status:string;category:string;severity:Severity;lat:number;lon:number;created_at:string;analysis?:Analysis}
