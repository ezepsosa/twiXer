export interface Props {
  trends: Trend[];
}

export interface Trend {
  trendName: string;
  count: number;
  type: string;
}
