export interface Criteria {
  id: string;
  name: string;
  points: number;
  description: string;
}

export interface CriteriaState {
  [key: string]: number;
}