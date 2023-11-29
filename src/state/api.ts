import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse } from "./types";

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
      query: () => "mostSellersKpi/mostSellers2022", // Bu endpoint'ın yolunu düzenleyin
      providesTags: ["mostSellers2022"],
    }),
    getMostSellers2023: build.query<Array<GetMostSellers2023Response>, void>({
      query: () => "mostSellersKpi/mostSellers2023", // Bu endpoint'ın yolunu düzenleyin
      providesTags: ["MostSellers2023"],
    }),
  }),
});

export const { useGetKpisQuery, useGetMostSellers2022Query, useGetMostSellers2023Query } = api;
