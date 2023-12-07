import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetMonthlyProfit2022Response, GetMostBuyingCustomersResponse, GetTotalRevenueResponse } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getMostSellers2022: build.query<Array<getMostSellers2022Response>, void>({
      query: () => "mostSellersKpi/mostSellers2022",
      providesTags: ["mostSellers2022"],
    }),
    getMostSellers2023: build.query<Array<GetMostSellers2023Response>, void>({
      query: () => "mostSellersKpi/mostSellers2023", 
      providesTags: ["MostSellers2023"],
    }),
    getMonthlyProfit2022: build.query<Array<GetMonthlyProfit2022Response>, void>({
      query: () => "monthlyProfitKpi/monthlyProfit2022", 
      providesTags: ["monthlyProfit2022"],
    }),
    getMonthlyProfit2023: build.query<Array<GetMonthlyProfit2023Response>, void>({
      query: () => "monthlyProfitKpi/monthlyProfit2023", 
      providesTags: ["monthlyProfit2023"],
    }),
    getBestSellersAll: build.query<Array<GetBestSellersAllResponse>, void>({
      query: () => "bestSellersAllKpi/bestSellersAll", 
      providesTags: ["bestSellersAll"],
    }),
    getMostSellersCountry: build.query<Array<GetMostSellersCountryResponse>, void>({
      query: () => "mostSellersCountryKpi/mostSellersCountry", 
      providesTags: ["mostSellersCountry"],
    }),
    getMostBuyingCustomers: build.query<Array<GetMostBuyingCustomersResponse>, void>({
      query: () => "mostBuyingCustomersKpi/mostBuyingCustomers", 
      providesTags: ["mostBuyingCustomers"],
    }),
    getTotalRevenue: build.query<Array<GetTotalRevenueResponse>, void>({
      query: () => "TotalRevenueKpi/TotalRevenue", 
      providesTags: ["TotalRevenue"],
    }),
  }),
});

export const { useGetKpisQuery, useGetMostSellers2022Query, useGetMostSellers2023Query, useGetMonthlyProfit2022Query, useGetMonthlyProfit2023Query, useGetBestSellersAllQuery, useGetMostSellersCountryQuery, useGetMostBuyingCustomersQuery, useGetTotalRevenueQuery} = api;


