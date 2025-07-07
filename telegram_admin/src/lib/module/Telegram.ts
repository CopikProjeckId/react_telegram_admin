import * as ZU from "zustand";
import { TelegramWebApp } from "../types/twa.type";
import Fetch from "./fetch";
/* eslint-disable @typescript-eslint/no-explicit-any */
export type TWAStatus = {
	ready: boolean;
	qrCode?: boolean;
	setReady?: (ready: boolean) => void;
	setDeviceType?: (deviceType: string) => void;
	setQrCode?: (qrCode: boolean) => void;
};

export const useTWA = ZU.create<TWAStatus & { webApp: TelegramWebApp | null }>((set) => {
	return {
		webApp: null,
		ready: false,
		setWebApp: (webApp: TelegramWebApp | null) => set({ webApp }),
		setDeviceType: (deviceType: string) => set((state) => ({ ...state, deviceType })),
		setReady: (ready: boolean) => set((state) => ({ ...state, ready })),
		setQrCode: (qrCode: boolean) => set((state) => ({ ...state, qrCode })),
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	};
});
export default class Telegram {
	private static instance: Telegram;
	public static getInstance() {
		if (!Telegram.instance) {
			Telegram.instance = new Telegram();
		}
		return Telegram.instance;
	}
	private constructor() { }
	public init(): TWAStatus {
		if (window.Telegram) {
			useTWA.setState({ webApp: window.Telegram.WebApp, ready: true });
			Fetch.getInstance().axios_header({
				'Authorization': 'twa ' + useTWA.getState().webApp?.initData,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			});
		} else {
			window.location.href = 'https://t.me/BigNoseAnimals_bot';
			useTWA.setState({ ready: false });
		}
		return useTWA.getState();
	}
	public requestFullScreen() {
		useTWA.getState().webApp?.requestFullscreen();
		useTWA.getState().webApp?.disableVerticalSwipes();
		useTWA.getState().webApp?.lockOrientation();

	}
}
