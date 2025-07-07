import { game_type } from "../module/data.call";

export enum MODE {
	DEVELOPMENT = "development",
	PRODUCTION = "production",
}
export const MODE_CONFIG = {
	[MODE.DEVELOPMENT]: {
		APP_FETCH_URL: "http://192.168.219.41:3004/v1",
		APP_TUG_URL: "http://192.168.219.41:3005/v1",
		APP_YOUNGHEE_URL: "http://192.168.219.41:3088/v1",
	},
	[MODE.PRODUCTION]: {
		APP_FETCH_URL: "https://squidminigame.com/v1",
		APP_TUG_URL: "https://tug.squidminigame.com/v1",
		APP_YOUNGHEE_URL: "https://younghee.squidminigame.com/v1",
	},
}
export const APP_CONFIG = {
	APP_TITLE: "NINEBIX",
	APP_VERSION: "1.0.0",
	APP_VERSION_CODE: 1,
	APP_FETCH_URL: MODE_CONFIG[MODE.PRODUCTION].APP_FETCH_URL,
	APP_TUG_URL: MODE_CONFIG[MODE.PRODUCTION].APP_TUG_URL,
	APP_YOUNGHEE_URL: 	MODE_CONFIG[MODE.PRODUCTION].APP_YOUNGHEE_URL,
	APP_CHEOLSU_URL: "https://cheolsu.squidminigame.com/v1",
	APP_TELEGRAM_WEB_APP_VERSION: 56,
	APP_TELEGRAM_WEB_APP_URL: "https://telegram.org/js/telegram-web-app.js",
};
export type AppConfig = typeof APP_CONFIG;

export enum ROUTES {
	DASHBOARD = "/",
	USER_LIST = "/user-list",
	TUG_USER_LIST = "/tug-user-list",
	YOUNGHEE_USER_LIST = "/younghee-user-list",
	CHEOLSU_USER_LIST = "/cheolsu-user-list",
	ITEM_LIST = "/shop-list",
	ITEM_CREATE = "/item-create",
	MISSION_LIST = "/mission-list",
	MISSION_LIST_TUG = "/tug-mission-list",
	CREATE_MISSION = "/create-mission",
	CREATE_MISSION_TUG = "/tug-create-mission",
	BOT_SETTING = "/bot-setting",
	BOT_SETTING_TUG = "/tug-bot-setting",
	BOT_MESSAGE_SENDER = "/bot-message-sender",
	BOT_MESSAGE_SENDER_TUG = "/tug-bot-message-sender",
	
	CONFIG_CHANGE = "/config-change",
	
	CONFIG_CHANGE_ITEM = "/config-change-item",
	CONFIG_CHANGE_ITEM_TUG = "/tug-config-change-item",
	CONFIG_CHANGE_ITEM_CHEOLSU = "/cheolsu-config-change-item",
	CONFIG_CHANGE_ITEM_YOUNGHEE = "/younghee-config-change-item",

	GAME_LIST = "/game-list",
	GAME_LIST_TUG = "/tug-game-list",

	RUBY_LIST = "/ruby-list",
	RUBY_LIST_TUG = "/tug-ruby-list",
	RUBY_LIST_YOUNGHEE = "/younghee-ruby-list",
	RUBY_LIST_CHEOLSU = "/cheolsu-ruby-list",

	EXCHANGE_LIST = "/exchange-list",
	EXCHANGE_LIST_TUG = "/tug-exchange-list",
	EXCHANGE_LIST_YOUNGHEE = "/younghee-exchange-list",
	EXCHANGE_LIST_CHEOLSU = "/cheolsu-exchange-list",
}
export const ROUTES_KEY: Record<string, string> = {
	[ROUTES.DASHBOARD]: "dashboard",
	[ROUTES.USER_LIST]: "user-list",
	[ROUTES.TUG_USER_LIST]: "tug-user-list",
	[ROUTES.YOUNGHEE_USER_LIST]: "younghee-user-list",
	[ROUTES.CHEOLSU_USER_LIST]: "cheolsu-user-list",
	[ROUTES.ITEM_LIST]: "shop-list",
	[ROUTES.ITEM_CREATE]: "item-create",
	[ROUTES.MISSION_LIST]: "mission-list",
	[ROUTES.MISSION_LIST_TUG]: "tug-mission-list",
	[ROUTES.CREATE_MISSION]: "create-mission",
	[ROUTES.CREATE_MISSION_TUG]: "tug-create-mission",
	[ROUTES.BOT_SETTING]: "bot-setting",
	[ROUTES.BOT_SETTING_TUG]: "tug-bot-setting",
	[ROUTES.BOT_MESSAGE_SENDER]: "bot-message-sender",
	[ROUTES.BOT_MESSAGE_SENDER_TUG]: "tug-bot-message-sender",
	[ROUTES.CONFIG_CHANGE]: "config-change",
	[ROUTES.CONFIG_CHANGE_ITEM]: "config-change-item",
	[ROUTES.CONFIG_CHANGE_ITEM_TUG]: "tug-config-change-item",
	[ROUTES.GAME_LIST]: "game-list",
	[ROUTES.GAME_LIST_TUG]: "tug-game-list",
	[ROUTES.RUBY_LIST]: "ruby-list",
	[ROUTES.RUBY_LIST_TUG]: "tug-ruby-list",
	[ROUTES.RUBY_LIST_YOUNGHEE]: "younghee-ruby-list",
	[ROUTES.RUBY_LIST_CHEOLSU]: "cheolsu-ruby-list",
	[ROUTES.EXCHANGE_LIST]: "exchange-list",
	[ROUTES.EXCHANGE_LIST_TUG]: "tug-exchange-list",
	[ROUTES.EXCHANGE_LIST_YOUNGHEE]: "younghee-exchange-list",
	[ROUTES.EXCHANGE_LIST_CHEOLSU]: "cheolsu-exchange-list",
};
export enum AppStatusType {
	LOGIN = "login",

	DASHBOARD = ROUTES.DASHBOARD,
	USER_LIST = ROUTES.USER_LIST,
	TUG_USER_LIST = ROUTES.TUG_USER_LIST,
	YOUNGHEE_USER_LIST = ROUTES.YOUNGHEE_USER_LIST,
	CHEOLSU_USER_LIST = ROUTES.CHEOLSU_USER_LIST,
	ITEM_LIST = ROUTES.ITEM_LIST,
	ITEM_CREATE = ROUTES.ITEM_CREATE,
	MISSION_LIST = ROUTES.MISSION_LIST,
	MISSION_LIST_TUG = ROUTES.MISSION_LIST_TUG,
	CREATE_MISSION = ROUTES.CREATE_MISSION,
	CREATE_MISSION_TUG = ROUTES.CREATE_MISSION_TUG,
	BOT_SETTING = ROUTES.BOT_SETTING,
	BOT_SETTING_TUG = ROUTES.BOT_SETTING_TUG,
	BOT_MESSAGE_SENDER = ROUTES.BOT_MESSAGE_SENDER,
	BOT_MESSAGE_SENDER_TUG = ROUTES.BOT_MESSAGE_SENDER_TUG,
	CONFIG_CHANGE = ROUTES.CONFIG_CHANGE,
	CONFIG_CHANGE_ITEM = ROUTES.CONFIG_CHANGE_ITEM,
	CONFIG_CHANGE_ITEM_TUG = ROUTES.CONFIG_CHANGE_ITEM_TUG,
	GAME_LIST = ROUTES.GAME_LIST,
	GAME_LIST_TUG = ROUTES.GAME_LIST_TUG,
	RUBY_LIST = ROUTES.RUBY_LIST,
	RUBY_LIST_TUG = ROUTES.RUBY_LIST_TUG,
	RUBY_LIST_YOUNGHEE = ROUTES.RUBY_LIST_YOUNGHEE,
	RUBY_LIST_CHEOLSU = ROUTES.RUBY_LIST_CHEOLSU,
	EXCHANGE_LIST = ROUTES.EXCHANGE_LIST,
	EXCHANGE_LIST_TUG = ROUTES.EXCHANGE_LIST_TUG,
	EXCHANGE_LIST_YOUNGHEE = ROUTES.EXCHANGE_LIST_YOUNGHEE,
	EXCHANGE_LIST_CHEOLSU = ROUTES.EXCHANGE_LIST_CHEOLSU,
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
export enum deposit_checker_status {
	pending = "P", // 대기
	success = "Y", // 성공
	fail = "N", // 실패
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
	},
	game: {
		id: string;
		game: game_type;
		char_position?: string;
		telegramUserId: string;
		state: 'idle' | 'hit' | 'end' | 'player' | 'cpu';
		created_at: string;
		ended_at: string;
	},
	exchange_data: {
		id?: string, // 교환 데이터 ID
		from_token?: string, // 교환 토큰
		to_token?: string, // 교환 토큰
		to_amount?: number, // 교환 수량
		from_amount?: number, // 교환 수량
		wallet_address: string, // 지갑 주소
		created_at?: string, // 생성일
		success?: number, // 성공 여부 0: 실패, 1: 성공
		telegramUserId?: string, // 텔레그램 사용자 ID
	},
	deposit_checker: {
		'id'?: string, // 입금 체크 ID
		'telegram_id'?: string, // 텔레그램 ID
		'sender'?: string, // 보낸 사람
		'receiver'?: string, // 받는 사람
		'amount'?: number, // 금액
		'tx_hash'?: string, // 트랜잭션 해시
		'status'?: deposit_checker_status, // 상태
		'telegramUserId'?: string, // 텔레그램 사용자 ID
		'created_at'?: string, // 생성일
	},
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
	},
	game: {
		id: "string",
		game: "string",
		char_position: "string",
		telegramUserId: "string",
		state: "string",
	},
	exchange_data: {
		id: "string",
		from_token: "string",
		to_token: "string",
		to_amount: "number",
		from_amount: "number",
		wallet_address: "string",
		created_at: "string",
		success: "number",
		telegramUserId: "string",
	},
	deposit_checker: {
		id: "string",
		telegram_id: "string",
		sender: "string",
		receiver: "string",
		amount: "number",
		tx_hash: "string",
		status: "string",
		telegramUserId: "string",
		created_at: "string",
	}
}
export enum UserListEnum {
	RANK = "rank",
	ITEM_LV = "user_item_lv",
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
export enum CheolsuUserListEnum {
	activeSessionId = "activeSessionId",
	boundBrowser = "boundBrowser",
	boundDeviceFingerprint = "boundDeviceFingerprint",
	boundDeviceType = "boundDeviceType",
	boundOS = "boundOS",
	collectCooldownActive = "collectCooldownActive",
	createdAt = "createdAt",
	currentDay = "currentDay",
	deviceBoundAt = "deviceBoundAt",
	deviceFingerprint = "deviceFingerprint",
	deviceInfo = "deviceInfo",
	deviceLocked = "deviceLocked",
	deviceSwitchedAt = "deviceSwitchedAt",
	firstLoginTime = "firstLoginTime",
	ipAddress = "ipAddress",
	lastActiveTime = "lastActiveTime",
	lastActivity = "lastActivity",
	lastCheckinDate = "lastCheckinDate",
	lastCollectTime = "lastCollectTime",
	lastDeviceAccess = "lastDeviceAccess",
	lastRewardPopupTime = "lastRewardPopupTime",
	lastRubyPurchase = "lastRubyPurchase",
	lastRubyPurchaseAmount = "lastRubyPurchaseAmount",
	lastRubyPurchaseDate = "lastRubyPurchaseDate",
	lastTabTime = "lastTabTime",
	lastUserAgent = "lastUserAgent",
	lastWatchAds = "lastWatchAds",
	referral = "referral",
	registeredDeviceId = "registeredDeviceId",
	ruby = "ruby",
	sessionActive = "sessionActive",
	sessionCreatedAt = "sessionCreatedAt",
	sessionHistory = "sessionHistory",
	sessionId = "sessionId",
	sms = "sms",
	telegramID = "telegramID",
	timerActive = "timerActive",
	timerStartTime = "timerStartTime",
	timerTimeLeft = "timerTimeLeft",
	ton = "ton",
	updatedAt = "updatedAt",
	weeklyCompletions = "weeklyCompletions",
	_id = "_id",
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

export enum GameListEnum {
	id = "id",
	game = "game",
	char_position = "char_position",
	telegramUserId = "telegramUserId",
	state = "state",
	created_at = "created_at",
	ended_at = "ended_at",
}

export enum DashboardEnum {
	live_game = "live_game",
	user_total_count = "user_total_count",
	token_total = "token_total",
	ruby_total = "ruby_total",
	earn_total = "earn_total",
}

