import { APP_CONFIG, DB_TYPE } from "../types/type";
import Fetch from "./fetch";
import * as ZU from "zustand";

export enum game_type {
	red_and_green = "RED_AND_GREEN", // 레드 앤 그린
	tug = "TUG_OF_WAR", // 투그 오브 워
}
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
export const useTugDashBoard = ZU.create<DashboardData | null>((set) => {
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
export const useYoungheeDashBoard = ZU.create<DashboardData | null>((set) => {
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
		setMissionList: (mission_list: DB_TYPE["bounsmissiontable"][]) => set({ mission_list })
	};
});
export const useCheolsuDashBoard = ZU.create<DashboardData | null>((set) => {
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
		setMissionList: (mission_list: DB_TYPE["bounsmissiontable"][]) => set({ mission_list })
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
	public async get_dashboard_data(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			await this.fetch._get("admin/dashboard", {}, APP_CONFIG.APP_TUG_URL).then((res) => {
				useTugDashBoard.setState({ chart_data: res.data.data.user_signup_Month_daily_count.chart_data, total: res.data.data.user_signup_Month_daily_count.total, traffic_data: res.data.data.traffic_Month_daily_count.chart_data, traffic_total: res.data.data.traffic_Month_daily_count.total });
			});
		} else if (type == 'younghee') {
			await this.fetch._get("admin/dashboard", {}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				console.log(res);
				useYoungheeDashBoard.setState({ chart_data: res.data.data.user_signup_Month_daily_count.chart_data, total: res.data.data.user_signup_Month_daily_count.total, traffic_data: res.data.data.traffic_Month_daily_count.chart_data, traffic_total: res.data.data.traffic_Month_daily_count.total });
			});
		} else if (type == 'cheolsu') {
			await this.fetch._get("admin/dashboard", {}, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				useCheolsuDashBoard.setState({ chart_data: res.data.data.user_signup_Month_daily_count.chart_data, total: res.data.data.user_signup_Month_daily_count.total, traffic_data: res.data.data.traffic_Month_daily_count.chart_data, traffic_total: res.data.data.traffic_Month_daily_count.total });
			});
		} else {
			await this.fetch._get("admin/dashboard", {}).then((res) => {
				useDashBoard.setState({ chart_data: res.data.data.user_signup_Month_daily_count.chart_data, total: res.data.data.user_signup_Month_daily_count.total, traffic_data: res.data.data.traffic_Month_daily_count.chart_data, traffic_total: res.data.data.traffic_Month_daily_count.total });
			});
		}
	}
	public async getLiveGameCount(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._get("admin/live-game", {}, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res.data.liveGame;
			});
		} else if (type == 'younghee') {
			return await this.fetch._get("admin/live-game", {}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res.data.liveGame;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._get("admin/live-game", {}, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res.data.liveGame;
			});
		} else {
			return await this.fetch._get("admin/live-game", {}).then((res) => {
				return res.data.liveGame;
			});
		}
	}
	public async getUserList(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu', page?: number, limit?: number) {
		if (type == 'tug') {
			return await this.fetch._get("admin/user", {
				page: (useTugDashBoard.getState()?.user_call?.page ?? 1) * (useTugDashBoard.getState()?.user_call?.limit ?? 10),
				limit: useTugDashBoard.getState()?.user_call?.limit
			}, APP_CONFIG.APP_TUG_URL).then((res) => {
				for (let rank in res.data.users) {
					res.data.users[rank]['rank'] = Number(rank) + 1;
				}
				useTugDashBoard.setState({ user_list: res.data.users });
			});
		} else if (type == 'younghee') {
			return await this.fetch._get("admin/user", {
				page: (useYoungheeDashBoard.getState()?.user_call?.page ?? 1) * (useYoungheeDashBoard.getState()?.user_call?.limit ?? 10),
				limit: useYoungheeDashBoard.getState()?.user_call?.limit
			}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				for (let rank in res.data.users) {
					res.data.users[rank]['rank'] = Number(rank) + 1;
				}
				useYoungheeDashBoard.setState({ user_list: res.data.users });
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._get("admin/user", {
				page: page,
				limit: limit
			}, APP_CONFIG.APP_CHEOLSU_URL).then( async (res) => {
				console.log(res);
				return res.data;
			});
		} else {
			return await this.fetch._get("admin/user", {
				page: (useDashBoard.getState()?.user_call?.page ?? 1) * (useDashBoard.getState()?.user_call?.limit ?? 10),
				limit: useDashBoard.getState()?.user_call?.limit
			}).then((res) => {
				for (let rank in res.data.users) {
					res.data.users[rank]['rank'] = Number(rank) + 1;
				}
				useDashBoard.setState({ user_list: res.data.users });
			});
		}
	}
	public async getUserDetail(id: string, type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._get("admin/user-detail", { id: id }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res.data.user;
			});
		} else if (type == 'younghee') {
			return await this.fetch._get("admin/user-detail", { id: id }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res.data.user;
			});
		}
		else if (type == 'cheolsu') {
			return await this.fetch._get(`api/users/${id}`, {}, "https://cheolsu.squidminigame.com").then((res) => {
				return res.data.data;
			});
		} else {
			return await this.fetch._get("admin/user-detail", { id: id }).then((res) => {
				return res.data.user;
			});
		}
	}
	public async editUserItem(user_id: string, id: string, lv: number, type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._put("admin/user-item", { telegramUserId: user_id, id: id, lv: lv }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res.data.user;
			});
		} else if (type == 'younghee') {
			return await this.fetch._put("admin/user-item", { telegramUserId: user_id, id: id, lv: lv }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res.data.user;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._put("admin/user-item", { telegramUserId: user_id, id: id, lv: lv }, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res.data.user;
			});
		} else {
			return await this.fetch._put("admin/user-item", { telegramUserId: user_id, id: id, lv: lv }).then((res) => {
				return res.data.user;
			});
		}
	}
	public async editUserToken(user_id: string, token: string, value: number, type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._put("admin/token", { telegramUserId: user_id, token_type: token, value: value }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res.data.user;
			});
		} else if (type == 'younghee') {
			return await this.fetch._put("admin/token", { telegramUserId: user_id, token_type: token, value: value }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res.data.user;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._put(`api/users/${user_id}`, { [token.toLowerCase()]: value }, "https://cheolsu.squidminigame.com").then((res) => {
				return res.data.data;
			});
		} else {
			return await this.fetch._put("admin/token", { telegramUserId: user_id, token_type: token, value: value }).then((res) => {
				return res.data.user;
			});
		}
	}

	public async getItemList(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._get("admin/item", {}, APP_CONFIG.APP_TUG_URL).then((res) => {
				useTugDashBoard.setState({ item_list: res.data.items });
			});
		} else if (type == 'younghee') {
			return await this.fetch._get("admin/item", {}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				useYoungheeDashBoard.setState({ item_list: res.data.items });
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._get("admin/item", {}, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				useCheolsuDashBoard.setState({ item_list: res.data.items });
			});
		} else {
			return await this.fetch._get("admin/item", {}).then((res) => {
				useDashBoard.setState({ item_list: res.data.items });
			});
		}
	}

	public async updateItem(item: DB_TYPE["item"], type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			let item_data = {
				price: item.price,
				bonus_value: item.bonus_value,
				bonus_percent: item.bonus_percent,
			};
			return await this.fetch._put("admin/item", { id: item.id, ...item_data }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res.data.item;
			});
		} else if (type == 'younghee') {
			let item_data = {
				price: item.price,
				bonus_value: item.bonus_value,
				bonus_percent: item.bonus_percent,
			};
			return await this.fetch._put("admin/item", { id: item.id, ...item_data }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res.data.item;
			});
		} else if (type == 'cheolsu') {
			let item_data = {
				price: item.price,
				bonus_value: item.bonus_value,
				bonus_percent: item.bonus_percent,
			};
			return await this.fetch._put("admin/item", { id: item.id, ...item_data }, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res.data.item;
			});
		} else {
			let item_data = {
				price: item.price,
				bonus_value: item.bonus_value,
				bonus_percent: item.bonus_percent,
			};
			return await this.fetch._put("admin/item", { id: item.id, ...item_data }).then((res) => {
				return res.data.item;
			});
		}
	}
	public async getMissionList(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			await this.fetch._get("admin/mission", {}, APP_CONFIG.APP_TUG_URL).then((res) => {
				for (let mission of res.data.mission) {
					mission['id'] = Number(mission['idx_key']);
				}
				useTugDashBoard.setState({ mission_list: res.data.mission as DB_TYPE["bounsmissiontable"][] });
			});
		} else if (type == 'younghee') {
			await this.fetch._get("admin/mission", {}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				for (let mission of res.data.mission) {
					mission['id'] = Number(mission['idx_key']);
				}
				useYoungheeDashBoard.setState({ mission_list: res.data.mission as DB_TYPE["bounsmissiontable"][] });
			});
		} else if (type == 'cheolsu') {
			await this.fetch._get("admin/mission", {}, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				for (let mission of res.data.mission) {
					mission['id'] = Number(mission['idx_key']);
				}
				useCheolsuDashBoard.setState({ mission_list: res.data.mission as DB_TYPE["bounsmissiontable"][] });
			});
		} else {
			await this.fetch._get("admin/mission", {}).then((res) => {
				for (let mission of res.data.mission) {
					mission['id'] = Number(mission['idx_key']);
				}
				useDashBoard.setState({ mission_list: res.data.mission as DB_TYPE["bounsmissiontable"][] });
			});
		}
	}
	public async updateMission(mission: DB_TYPE["bounsmissiontable"], type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._put("admin/mission", { ...mission }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res.data.mission;
			});
		} else if (type == 'younghee') {
			return await this.fetch._put("admin/mission", { ...mission }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res.data.mission;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._put("admin/mission", { ...mission }, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res.data.mission;
			});
		} else {
			return await this.fetch._put("admin/mission", { ...mission }).then((res) => {
				return res.data.mission;
			});
		}
	}
	public async createItem(item: DB_TYPE["item"], type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._post("admin/item", { ...item }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res;
			});
		} else if (type == 'younghee') {
			return await this.fetch._post("admin/item", { ...item }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._post("admin/item", { ...item }, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._post("admin/item", { ...item }).then((res) => {
				return res;
			});
		}
	}
	public async createMission(mission: DB_TYPE["bounsmissiontable"], type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._post("admin/mission", { ...mission }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res;
			});
		} else if (type == 'younghee') {
			return await this.fetch._post("admin/mission", { ...mission }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._post("admin/mission", { ...mission }, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._post("admin/mission", { ...mission }).then((res) => {
				return res;
			});
		}
	}
	public async getConfigChange(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._get("admin/config-file", {}, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res;
			});
		} else if (type == 'younghee') {
			return await this.fetch._get("admin/config-file", {}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._get("admin/config-file", {}, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._get("admin/config-file", {}).then((res) => {
				return res;
			});
		}
	}
	public async getConfigChangeItem(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._get("admin/config-change-item", {}, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res;
			});
		} else if (type == 'younghee') {
			return await this.fetch._get("admin/config-change-item", {}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._get("admin/config-change-item", {}, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._get("admin/config-change-item", {}).then((res) => {
				return res;
			});
		}
	}
	public async updateConfigChange(config: any, type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._put("admin/config-file", { ...config }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res;
			});
		} else if (type == 'younghee') {
			return await this.fetch._put("admin/config-file", { ...config }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._put("admin/config-file", { ...config }, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._put("admin/config-file", { ...config }).then((res) => {
				return res;
			});
		}
	}
	public async updateConfigChangeItem(config: any, type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._put("admin/config-change-item", { ...config }, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res;
			});
		} else if (type == 'younghee') {
			return await this.fetch._put("admin/config-change-item", { ...config }, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._put("admin/config-change-item", { ...config }, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._put("admin/config-change-item", { ...config }).then((res) => {
				return res;
			});
		}
	}
	public async getUserListForMessage(type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		if (type == 'tug') {
			return await this.fetch._get("admin/user-name-and-telegram-id", {}, APP_CONFIG.APP_TUG_URL).then((res) => {
				return res;
			});
		} else if (type == 'younghee') {
			return await this.fetch._get("admin/user-name-and-telegram-id", {}, APP_CONFIG.APP_YOUNGHEE_URL).then((res) => {
				return res;
			});
		} else if (type == 'cheolsu') {
			return await this.fetch._get("admin/user-name-and-telegram-id", {}, APP_CONFIG.APP_CHEOLSU_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._get("admin/user-name-and-telegram-id", {}).then((res) => {
				return res;
			});
		}
	}
	public async sendMessageToUser(user_id: string | string[], message: string, message_type: string, type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		let data = {
			user_id: user_id,
			message: message,
			message_type: message_type
		};
		await this.fetch._post("admin/send-message-to-user", data, type == 'tug' ? APP_CONFIG.APP_TUG_URL : type == 'younghee' ? APP_CONFIG.APP_YOUNGHEE_URL : type == 'cheolsu' ? APP_CONFIG.APP_CHEOLSU_URL :  APP_CONFIG.APP_FETCH_URL).then((res) => {
			return res;
		});
	}
	public async getCallGameData({ id, type, game_type, start, limit, api_type }: { id: string, type?: 'ended' | 'now', game_type?: game_type, start?: number, limit?: number, api_type?: 'tug' | 'red_and_green' }) {
		if (type == 'ended') {
			return await this.fetch._get("admin/game-data", {
				id: id,
				type: type,
				game: game_type,
				start: start,
				limit: limit
			}, api_type == 'tug' ? APP_CONFIG.APP_TUG_URL : APP_CONFIG.APP_FETCH_URL).then((res) => {
				return res;
			});
		} else {
			return await this.fetch._get("admin/game-data", {
				id: id,
				type: type,
				game: game_type,
				start: start,
				limit: limit
			}, api_type == 'tug' ? APP_CONFIG.APP_TUG_URL : APP_CONFIG.APP_FETCH_URL).then((res) => {
				return res;
			});
		}
	}
	public async exchangeList(success: 0 | 1 | 2, api_type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		return await this.fetch._get("admin/exchange", { success: success }, api_type == 'tug' ? APP_CONFIG.APP_TUG_URL : api_type == 'younghee' ? APP_CONFIG.APP_YOUNGHEE_URL : api_type == 'cheolsu' ? APP_CONFIG.APP_CHEOLSU_URL : APP_CONFIG.APP_FETCH_URL).then((res) => {
			return res;
		});
	}
	public async updateExchange(id: string, success: 1 | 2, api_type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		return await this.fetch._put("admin/exchange", { id: id, success: success }, api_type == 'tug' ? APP_CONFIG.APP_TUG_URL : api_type == 'younghee' ? APP_CONFIG.APP_YOUNGHEE_URL : api_type == 'cheolsu' ? APP_CONFIG.APP_CHEOLSU_URL : APP_CONFIG.APP_FETCH_URL).then((res) => {
			return res;
		});
	}
	public async getRubyList(start?: number, limit?: number, api_type?: 'tug' | 'red_and_green' | 'younghee' | 'cheolsu') {
		return await this.fetch._get("admin/payment", {
			start: start,
			limit: limit
		}, api_type == 'tug' ? APP_CONFIG.APP_TUG_URL : api_type == 'younghee' ? APP_CONFIG.APP_YOUNGHEE_URL : api_type == 'cheolsu' ? APP_CONFIG.APP_CHEOLSU_URL : APP_CONFIG.APP_FETCH_URL)
		.then((res) => {
			return res.data.deposit_checker;
		});
	}
}

