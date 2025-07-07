import { DB_TYPE } from "../types/type";
import Fetch from "./fetch";
import * as ZU from "zustand";

interface DashboardData {
	chart_data: {
		date: string;
		total: number;
	}[];
	traffic_data: {
		date: string;
		login: number;
		deposit: number;
		withdraw: number;
		ads: number;
	}[];
	total: number;
	traffic_total: {
		login: number;
		deposit: number;
		withdraw: number;
		ads: number;
	};
	user_call: {
		page: number;
		limit: number;
		end: number;
	};
	user_list: DB_TYPE["telegramUser"][];
	item_call: {
		page: number;
		limit: number;
		end: number;
	};
	item_list: DB_TYPE["item"][];
	mission_call: {
		page: number;
		limit: number;
		end: number;
	};
	mission_list: DB_TYPE["bounsmissiontable"][];

	setChartData: (chart_data: any) => void;
	setTrafficData: (traffic_data: any) => void;
	setTotal: (total: number) => void;
	setTrafficTotal?: (traffic_total: any) => void;
	setUserCall: (user_call: any) => void;
	setUserList: (user_list: DB_TYPE["telegramUser"][]) => void;
	setItemCall: (item_call: any) => void;
	setItemList: (item_list: DB_TYPE["item"][]) => void;
	setMissionCall: (mission_call: any) => void;
	setMissionList: (mission_list: DB_TYPE["bounsmissiontable"][]) => void;
}
export const useDashBoard = ZU.create<DashboardData | null>((set) => {
	return {
		chart_data: [],
		traffic_data: [],
		total: 0,
		traffic_total: {
			login: 0,
			deposit: 0,
			withdraw: 0,
			ads: 0,
		},
		user_call: {
			page: 1,
			limit: 10,
			end: 0,
		},
		user_list: [],
		item_call: {
			page: 1,
			limit: 10,
			end: 0,
		},
		item_list: [],
		mission_call: {
			page: 1,
			limit: 10,
			end: 0,
		},
		mission_list: [],
		setChartData: (chart_data: any) => set({ chart_data }),
		setTrafficData: (traffic_data: any) => set({ traffic_data }),
		setTotal: (total: number) => set({ total }),
		setTrafficTotal: (traffic_total: any) => set({ traffic_total }),
		setUserCall: (user_call: any) => set({ user_call }),
		setUserList: (user_list: DB_TYPE["telegramUser"][]) => set({ user_list }),
		setItemCall: (item_call: any) => set({ item_call }),
		setItemList: (item_list: DB_TYPE["item"][]) => set({ item_list }),
		setMissionCall: (mission_call: any) => set({ mission_call }),
		setMissionList: (mission_list: DB_TYPE["bounsmissiontable"][]) => set({ mission_list }),
	};
});

export default class DataCall {
	private static instance: DataCall;
	public static getInstance() {
		if (!DataCall.instance) {
			DataCall.instance = new DataCall();
		}
		return DataCall.instance;
	}
	private fetch: Fetch;
	private constructor() {
		this.fetch = Fetch.getInstance();
	}
	public async get_dashboard_data() {
		await this.fetch._get("admin/dashboard", {}).then((res) => {
			useDashBoard.setState({ chart_data: res.data.data.user_signup_Month_daily_count.chart_data, total: res.data.data.user_signup_Month_daily_count.total, traffic_data: res.data.data.traffic_Month_daily_count.chart_data, traffic_total: res.data.data.traffic_Month_daily_count.total });
		});
	}
	public async getUserList() {
		await this.fetch._get("admin/user", {}).then((res) => {
			for (let rank in res.data.users) {
				res.data.users[rank]['rank'] = Number(rank) + 1;
			}
			useDashBoard.setState({ user_list: res.data.users });
		});
	}
	public async getUserDetail(id: string) {
		return await this.fetch._get("admin/user-detail", { id: id }).then((res) => {
			return res.data.user;
		});
	}
	public async editUserItem(user_id: string, id: string, count: number) {
		return await this.fetch._put("admin/user-item", { telegramUserId: user_id, id: id, count: count }).then((res) => {
			return res.data.user;
		});
	}
	public async getItemList() {
		return await this.fetch._get("admin/item", {}).then((res) => {
			useDashBoard.setState({ item_list: res.data.items });
		});
	}
	public async updateItem(item: DB_TYPE["item"]) {
		let item_data = {
			price: item.price,
			bonus_value: item.bonus_value,
			bonus_percent: item.bonus_percent,
		};
		return await this.fetch._put("admin/item", { id: item.id, ...item_data }).then((res) => {
			return res.data.item;
		});
	}
	public async getMissionList() {
		await this.fetch._get("admin/mission", {}).then((res) => {
			for (let mission of res.data.mission) {
				mission['id'] = Number(mission['idx_key']);
			}
			useDashBoard.setState({ mission_list: res.data.mission as DB_TYPE["bounsmissiontable"][] });
		});
	}
	public async updateMission(mission: DB_TYPE["bounsmissiontable"]) {
		return await this.fetch._put("admin/mission", { ...mission }).then((res) => {
			return res.data.mission;
		});
	}
	public async createItem(item: DB_TYPE["item"]) {
		return await this.fetch._post("admin/item", { ...item }).then((res) => {
			return res;
		});
	}
	public async createMission(mission: DB_TYPE["bounsmissiontable"]) {
		return await this.fetch._post("admin/mission", { ...mission }).then((res) => {
			return res;
		});
	}
}

