// วิธีใช้งาน
// ให้นำ component นี้ไป wrap ที่ root component ที่ต้องการให้เข้าถึง state ได้ จากนั้นเรียกใช้

"use client";

const globalStates = [
  // example state 1
  {
    name: "exampleCounter",
    initialState: { exampleValue: 0 },
    reducers: {
      exampleSetValue: (state: any, action: PayloadAction) => {
        state.exampleValue = action.payload;
      },
      exampleIncrease: (state: any) => {
        state.exampleValue = state.exampleValue + 1;
      },
      exampleDecrease: (state: any) => {
        state.exampleValue = state.exampleValue - 1;
      },
    },
  },
  // example state 2
  {
    name: "exampleString",
    initialState: { value: "Hello world" },
    reducers: {
      exampleSetValue: (state: any, action: PayloadAction) => {
        state.value = action.payload;
      },
    },
  },

  {
    name: "loadImage",
    initialState: { data: "" },
    reducers: {
      setLoadImage: (state: any, action: PayloadAction) => {
        state.data = action.payload;
      },
    },
  },
  {
    name: "loadRoom",
    initialState: { data: "" },
    reducers: {
      setLoadRoom: (state: any, action: PayloadAction) => {
        state.data = action.payload;
      },
    },
  },
];

// ตัวอย่างการเรียกค่ากับการเซตค่าของ state ใน component
// const dispatch = useAppDispatch(); เพื่อประกาศฟังก์ชันสำหรับการเรียกใช้ actions
// const readState = useAppSelector((state:RootState) => state.exampleCounter.exampleValue); เพื่ออ่านค่า state
// <div onClick={() => dispatch(actions.exampleCounter.exampleSetValue(300))}>Set</div>

export default function GlobalStateWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) storeRef.current = makeStore();
  return <Provider store={storeRef.current}>{children}</Provider>;
}

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

let reducers: any = {};
let actions: RootState = {};

globalStates.forEach((item) => {
  const slice: RootState = {
    name: item.name,
    initialState: item.initialState,
    reducers: item.reducers,
  };
  const created = createSlice(slice);
  reducers[item.name] = created.reducer;
  actions[item.name] = created.actions;
});

export { actions };
export const makeStore = () => configureStore({ reducer: reducers });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
