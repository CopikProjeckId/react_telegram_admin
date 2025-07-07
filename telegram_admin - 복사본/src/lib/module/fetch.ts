import axios, { Axios } from "axios";
import { APP_CONFIG } from "../types/type";

const default_timeout = 10000;

export default class Fetch {
	private static _instance: Fetch;

	public static getInstance(): Fetch {
		if (!this._instance) {
			this._instance = new Fetch();
		}
		return this._instance;
	}

	private axios: Axios;
	public api_path: Record<string, any> = {};
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = APP_CONFIG.APP_FETCH_URL;
		this.axios.defaults.timeout = default_timeout;
		this.axios.defaults.headers.common = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		};
	}
	public axios_header(header: Record<string, string>) {
		this.axios.defaults.headers.common = header;
		// this.get_api_path();
	}
	// private async get_api_path() {
	// 	this.api_path = (await this._get("/", {})).data.path;
	// }

	public async _get(url: string, params: any) {
		return await this.axios.get(url, { params });
	}

	public async _post(url: string, params: any) {
		return await this.axios.post(url, params);
	}

	public async _put(url: string, params: any) {
		return await this.axios.put(url, params);
	}

	public async _delete(url: string, params: any) {
		return await this.axios.delete(url, params);
	}

}


