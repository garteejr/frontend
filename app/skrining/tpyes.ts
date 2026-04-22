export type Answer = "YA" | "TIDAK";

export type DetailItem = {
  question: number;
  answer: Answer;
  risk_point: number;
};

export type ResultType = {
  score: number;
  riskLevel: "LOW" | "MODERATE" | "HIGH";
  action: string;
  detail: DetailItem[];
};

export type ProfileType = {
  name: string;
  age: number;
  gender: string;
};