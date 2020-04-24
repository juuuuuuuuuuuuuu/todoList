export interface ITodoInfo {
  content: string;
  date: string;
  status: string;
}

export interface IDivde {
  [key: string]: ITodoInfo[];
}