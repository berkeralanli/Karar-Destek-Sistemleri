
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
export interface GetBestSellersAllResponse{
  _id: string;
  TotalQuantity: number;
  totalRevenue: number;
  ProductDescription: string;
  ProductPrice: number; 
}
export interface GetMostSellersCountryResponse{
  Country: string;
  salesPercentage: number;
}
export interface GetMostBuyingCustomersResponse{
  _id: string;
  TotalQuantity: number;
  totalRevenue: number;
  ProductPrice: string; 
}
export interface GetTotalRevenueResponse{
  totalRevenue: number;
}
export interface getMonthlyProfitAllYearsResponse{
  month: number;
  totalRevenue: number;
  
}
export interface getUserResponse{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: number; 
}
export interface getyirmiIkiTotalRevenueResponse{
  totalRevenue: number,
}
export interface getyirmiUcTotalRevenueResponse{
  totalRevenue: number,
}
export interface getyirmiIkiTotalQuantityResponse{
  totalQuantity: number,
}
export interface getyirmiUcTotalQuantityResponse{
  totalQuantity: number,
}