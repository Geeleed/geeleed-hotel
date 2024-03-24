import { RootState, useAppSelector } from "../component/GlobalStateWrapper";

export const loadBase64 = () =>
  useAppSelector((state: RootState) => state.loadImage.data);
export const loadRoom = () =>
  useAppSelector((state: RootState) => state.loadRoom.data);
