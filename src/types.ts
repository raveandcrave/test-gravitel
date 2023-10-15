export interface DashboardStat {
  scenarios: Statistic;
  lists: Statistic;
  dialogs: Statistic;
}

export interface Statistic {
  active: number;
  inactive: number;
  completed: number;
}
