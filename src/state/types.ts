
export interface GetKpisResponse{
  Country: string;
  Customer_ID: number;
  Description: string;
  Invoice_ID: number;
  Price: number;
  Quantity: number;
  StockCode: string;
  __v: number;
  InvoiceDate: string;
}


export interface getMostSellers2022Response{
  __id: string;
  TotalQuantity: number;
  totalRevenue: number;
  Description: string;
}

export interface GetMostSellers2023Response{
  __id: string;
  TotalQuantity: number;
  totalRevenue: number;
  Description: string;
}

export interface GetMonthlyProfit2022Response{
  TotalQuantity: number;
  totalRevenue: number;
  Description: string;
}
export interface GetMonthlyProfit2023Response{
  month: number;
  totalRevenue: number;
}
