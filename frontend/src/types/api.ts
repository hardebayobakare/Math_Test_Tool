export interface DataPoint {
  x: number;
  y: number;
}

export interface QuestionResponse {
  dataPoints: DataPoint[];
  equation: string;
}

export interface AnswerResponse {
  result: boolean;
}

export interface SubmitAnswerRequest {
  studentName: string;
  answer: string;
} 