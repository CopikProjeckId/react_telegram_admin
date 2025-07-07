export const APP_CONFIG = {
	APP_TITLE: "NINEBIX",
	APP_VERSION: "1.0.0",
	APP_VERSION_CODE: 1,
	APP_FETCH_URL: "https://bignoseanimalscoin.com/v1",
	APP_TELEGRAM_WEB_APP_VERSION: 56,
	APP_TELEGRAM_WEB_APP_URL: "https://telegram.org/js/telegram-web-app.js",
};
export type AppConfig = typeof APP_CONFIG;

export enum ROUTES {
	DASHBOARD = "/",
	USER_LIST = "/user-list",
	ITEM_LIST = "/shop-list",
	ITEM_CREATE = "/item-create",
	MISSION_LIST = "/mission-list",
	CREATE_MISSION = "/create-mission",
	BOT_SETTING = "/bot-setting",
	BOT_MESSAGE_SENDER = "/bot-message-sender",
}
export const ROUTES_KEY: Record<string, string> = {
	[ROUTES.DASHBOARD]: "dashboard",
	[ROUTES.USER_LIST]: "user-list",
	[ROUTES.ITEM_LIST]: "shop-list",
	[ROUTES.ITEM_CREATE]: "item-create",
	[ROUTES.MISSION_LIST]: "mission-list",
	[ROUTES.CREATE_MISSION]: "create-mission",
	[ROUTES.BOT_SETTING]: "bot-setting",
	[ROUTES.BOT_MESSAGE_SENDER]: "bot-message-sender",
};
export enum AppStatusType {
	LOGIN = "login",
	DASHBOARD = ROUTES.DASHBOARD,
	USER_LIST = ROUTES.USER_LIST,
	ITEM_LIST = ROUTES.ITEM_LIST,
	ITEM_CREATE = ROUTES.ITEM_CREATE,
	MISSION_LIST = ROUTES.MISSION_LIST,
	CREATE_MISSION = ROUTES.CREATE_MISSION,
	BOT_SETTING = ROUTES.BOT_SETTING,
	BOT_MESSAGE_SENDER = ROUTES.BOT_MESSAGE_SENDER,
};

export enum TokenType {
	TON = "TON",
	PLATFORM_TOKEN = "PLATFORM_TOKEN",
}

export enum ItemType {
	CONSUMABLE = "CONSUMABLE",
	PERMANENT_COSTUME = "PERMANENT_COSTUME",
	TIMED_COSTUME = "TIMED_COSTUME",
	LEVEL_UPGRADE = "LEVEL_UPGRADE",
}
export type DB_TYPE = {
	telegramUser: {
		id: string;
		telegram_id: string;
		username: string;
		first_name: string;
		last_name: string;
		language_code: string;
		photo_url: string;
		mission_stamp: string;
		premium: number;
		created_at: string;
		updated_at: string;
		lasted_at: string;
	},
	item: {
		id: string;
		name: string;
		type: ItemType;
		token_type: TokenType;
		price: number;
		description: string;
		lv: number;
		bonus_value: number;
		bonus_percent: number;
		reward_type: TokenType;
		time_seconds: number;
		created_at: string;
	},
	bounsmissiontable: {
		idx_key: number;
		logo: string;
		script: string;
		link: string;
		type: TokenType;
		credit: number;
		limit_date: string;
	},
	useritem: {
		id: string;
		name: DB_TYPE["item"]["name"];
		lv: number;
		count: number;
		created_at: string;
		end_time: string;
		itemId: DB_TYPE["item"]["id"];
		telegramUserId: DB_TYPE["telegramUser"]["id"];
	},
	referral: {
		referral_user: DB_TYPE["telegramUser"]["id"];
		owner_user: DB_TYPE["telegramUser"]["id"];
	},
	userrewardtoken: {
		platform_token: number;
		ton_coin: number;
		created_at: string;
		telegramUserId: DB_TYPE["telegramUser"]["id"];
	},
	wallet: {
		address: string;
		public_key: string;
		telegramUserId: DB_TYPE["telegramUser"]["id"];
	},
	traffic: {
		login: number;
		deposit: number;
		withdraw: number;
		ads: number;
	}
}
export const DB_TYPE_typeof: Record<keyof DB_TYPE, Record<keyof DB_TYPE[keyof DB_TYPE], string | number>> = {
	telegramUser: {
		id: "string",
		telegram_id: "string",
		username: "string",
		first_name: "string",
		last_name: "string",
		language_code: "string",
		photo_url: "string",
		mission_stamp: "string",
		premium: "number",
		created_at: "string",
		updated_at: "string",
		lasted_at: "string",
	},
	item: {
		id: "string",
		name: "string",
		type: "string",
		token_type: "string",
		price: "number",
		description: "string",
		lv: "number",
		bonus_value: "number",
		bonus_percent: "number",
		reward_type: "string",
		time_seconds: "number",
		created_at: "string",
	},
	bounsmissiontable: {
		idx_key: "number",
		logo: "string",
		script: "string",
		link: "string",
		type: "string",
		credit: "number",
		limit_date: "string",
	},
	useritem: {
		id: "string",
		name: "string",
		lv: "number",
		count: "number",
		created_at: "string",
		end_time: "string",
		itemId: "string",
		telegramUserId: "string",
	},
	referral: {
		referral_user: "string",
		owner_user: "string",
	},
	userrewardtoken: {
		platform_token: "number",
		ton_coin: "number",
		created_at: "string",
		telegramUserId: "string",
	},
	wallet: {
		address: "string",
		public_key: "string",
		telegramUserId: "string",
	},
	traffic: {
		login: "number",
		deposit: "number",
		withdraw: "number",
		ads: "number",
	}
}
export enum UserListEnum {
	RANK = "rank",
	ID = "id",
	TELEGRAM_ID = "telegram_id",
	TOKEN = "platform_token",
	USERNAME = "username",
	FIRST_NAME = "first_name",
	LAST_NAME = "last_name",
	PHOTO_URL = "photo_url",
	PREMIUM = "premium",
	CREATED_AT = "created_at",
	UPDATED_AT = "updated_at",
	LASTED_AT = "lasted_at",
	MISSION_STAMP = "mission_stamp",
}

export enum ShopListEnum {
	id = "id",
	name = "name",
	type = "type",
	token_type = "token_type",
	price = "price",
	description = "description",
	lv = "lv",
	bonus_value = "bonus_value",
	bonus_percent = "bonus_percent",
	reward_type = "reward_type",
	time_seconds = "time_seconds",
	created_at = "created_at",
};
export const shop_auto_increment = ["id", "created_at"];
export const shop_SubScription: Record<keyof DB_TYPE["item"], string> = {
	id: "item Id",
	name: "item Name",
	type: "item Type",
	token_type: "token Type",
	price: "item Price",
	description: "item Description",
	lv: "item Lv Check : 1 - true , 0 - false",
	bonus_value: "bonus Value - CONSUMABLE type Only + Value and LV not 0 ?? value * lv",
	bonus_percent: "bonus Percent - CONSUMABLE type Only + Bonus Percent",
	reward_type: "reward Type",
	time_seconds: "time Seconds - COSTUME type Only + value / seconds",
	created_at: "created At",
}

export enum MissionListEnum {
	idx_key = "idx_key",
	logo = "logo",
	script = "script",
	link = "link",
	type = "type",
	credit = "credit",
	limit_date = "limit_date",
};
export const mission_auto_increment = ["idx_key"];
export const mission_SubScription: Record<keyof DB_TYPE["bounsmissiontable"], string> = {
	idx_key: "mission Idx Key",
	logo: "mission Logo url",
	script: "mission Script",
	link: "mission Link",
	type: "mission Type",
	credit: "mission Credit",
	limit_date: "mission Limit Date",
}
