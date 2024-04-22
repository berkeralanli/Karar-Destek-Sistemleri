import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetMonthlyProfit2022Response, GetMostBuyingCustomersResponse, GetTotalRevenueResponse, getMostSellers2022Response, GetMostSellers2023Response, GetMonthlyProfit2023Response, GetBestSellersAllResponse, GetMostSellersCountryResponse, getMonthlyProfitAllYearsResponse, getUserResponse, getyirmiIkiTotalRevenueResponse, getyirmiUcTotalRevenueResponse, getyirmiIkiTotalQuantityResponse, getyirmiUcTotalQuantityResponse } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis","mostSellers2022","MostSellers2023","monthlyProfit2022","monthlyProfit2023","bestSellersAll","mostSellersCountry","mostBuyingCustomers","TotalRevenue","monthlyProfitAllYears","users","yirmiIkiTotalRevenue","yirmiUcTotalRevenue","yirmiUcTotalQuantity","yirmiIkiTotalQuantity"],
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
    getMonthlyProfitAllYears: build.query<Array<getMonthlyProfitAllYearsResponse>, void>({
      query: () => "MonthlyProfitAllYearsKpi/monthlyProfitAllYears", 
      providesTags: ["monthlyProfitAllYears"],
    }),
    getUser: build.query<Array<getUserResponse>, void>({
      query: () => "users", 
      providesTags: ["users"],
    }),
    getyirmiIkiTotalRevenue: build.query<Array<getyirmiIkiTotalRevenueResponse>, void>({
      query: () => "yirmiIkiTotalRevenueKpi/yirmiIkiTotalRevenue", 
      providesTags: ["yirmiIkiTotalRevenue"],
    }),
    getyirmiUcTotalRevenue: build.query<Array<getyirmiUcTotalRevenueResponse>, void>({
      query: () => "yirmiUcTotalRevenueKpi/yirmiUcTotalRevenue", 
      providesTags: ["yirmiUcTotalRevenue"],
    }),
    getyirmiUcTotalQuantity: build.query<Array<getyirmiUcTotalQuantityResponse>, void>({
      query: () => "yirmiUcTotalQuantityKpi/yirmiUcTotalQuantity", 
      providesTags: ["yirmiUcTotalQuantity"],
    }),
    getyirmiIkiTotalQuantity: build.query<Array<getyirmiIkiTotalQuantityResponse>, void>({
      query: () => "yirmiIkiTotalQuantityKpi/yirmiIkiTotalQuantity", 
      providesTags: ["yirmiIkiTotalQuantity"],
    }),
  }),
});

export const { useGetKpisQuery, useGetMostSellers2022Query, useGetMostSellers2023Query, useGetMonthlyProfit2022Query, useGetMonthlyProfit2023Query, useGetBestSellersAllQuery, useGetMostSellersCountryQuery, useGetMostBuyingCustomersQuery, useGetTotalRevenueQuery, useGetMonthlyProfitAllYearsQuery, useGetUserQuery, useGetyirmiIkiTotalRevenueQuery, useGetyirmiUcTotalRevenueQuery,useGetyirmiUcTotalQuantityQuery, useGetyirmiIkiTotalQuantityQuery} = api;


