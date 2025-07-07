
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


export const textEnterSlice = (text: string) => {
	// " / " 를 줄바꿈으로 변경
	let text_array = text.split(" /");
	let text_array_join = text_array.join("\n");
	return text_array_join;
};
export const textEnterJoin = (text: string) => {
	// 줄바꿈을 전체 " / " 로 변경
	let text_array = text.split("\n");
	let text_array_join = text_array.join(" /");
	return text_array_join;
};

export const changeInput = (text: string, setInput: (text: string) => void) => {
	// 입력제한 x : 30 , y : 15 해당값을 넘길시 return
	let text_array = text.split("\n");
	if (text_array.length > 15) {
		alert("Y input limit exceeded");
		return;
	}
	for (let i = 0; i < text_array.length; i++) {
		if (text_array[i].length > 30) {
			alert("X input limit exceeded");
			return;
		}
	}
	setInput(text);
};