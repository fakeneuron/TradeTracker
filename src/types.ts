export interface Trade {
  id: string;
  date: string;
  time: string;
  asset: string;
  type: 'buy' | 'sell';
  price: number;
  lotSize: number;
  takeProfit?: number;
  stopLoss?: number;
}

export interface ChartNote {
  timeframe: string;
  note: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  support: string;
  resistance: string;
  image?: string;
}

export interface News {
  time: string;
  type: string;
  expectedValue: string;
  actualValue: string;
  note: string;
}

export interface TradeManagementData {
  trailingStop: number;
  riskManagement: string;
  newTargets: string;
}