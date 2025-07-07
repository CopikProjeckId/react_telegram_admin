
import { create } from "zustand";
import { TelegramWebApp } from "./types/twa.type";
import { AppStatusType } from "./types/type";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
	interface Window {
		Telegram: {
			WebApp: TelegramWebApp;
		};
		native: Record<string, any>;
		navigate: Record<string, any>;
	}
}
export interface AppStatus {
	app_status: AppStatusType;
	setAppStatus: (status: AppStatusType) => void;
}
export const useAppStatus = create<AppStatus>()((set) => ({
	app_status: AppStatusType.LOGIN,
	setAppStatus: (status: AppStatusType) => set({ app_status: status }),
}));