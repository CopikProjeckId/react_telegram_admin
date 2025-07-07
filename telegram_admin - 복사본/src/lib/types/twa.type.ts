// Telegram Web App의 메인 인터페이스 정의
export interface TelegramWebApp {
	// Mini App으로 전달된 원시 데이터 문자열
	initData: string;

	// Mini App으로 전달된 데이터 객체 (신뢰할 수 없는 데이터)
	initDataUnsafe: WebAppInitData;

	// 사용자 Telegram 앱의 Bot API 버전
	version: string;

	// 사용자 Telegram 앱의 플랫폼 이름 (예: "iOS", "Android")
	platform: string;

	// 현재 Telegram 앱의 테마 모드 ("light" 또는 "dark")
	colorScheme: "light" | "dark";

	// Telegram 테마 설정을 담은 객체
	themeParams: ThemeParams;

	// Mini App이 현재 활성화되었는지 여부 (최소화된 상태 아님)
	isActive: boolean;

	// Mini App이 최대 높이로 확장되었는지 여부
	isExpanded: boolean;

	// 현재 Mini App의 가시 영역 높이 (실시간 업데이트됨)
	viewportHeight: number;

	// 마지막으로 안정적인 상태에서의 가시 영역 높이 (애니메이션 중 변화하지 않음)
	viewportStableHeight: number;

	// 현재 헤더의 색상 (#RRGGBB 형식)
	headerColor: string;

	// 현재 배경의 색상 (#RRGGBB 형식)
	backgroundColor: string;

	// 현재 하단 바의 색상 (#RRGGBB 형식)
	bottomBarColor: string;

	// Mini App을 닫을 때 확인 대화 상자가 활성화되었는지 여부
	isClosingConfirmationEnabled: boolean;

	// Mini App을 닫거나 최소화하기 위한 세로 스와이프 제스처가 활성화되었는지 여부
	isVerticalSwipesEnabled: boolean;

	// Mini App이 전체 화면 모드로 표시 중인지 여부
	isFullscreen: boolean;

	// Mini App의 화면 방향이 고정되었는지 여부
	isOrientationLocked: boolean;

	// 기기의 안전 영역 여백 정보 (노치, 내비게이션 바 등을 고려한 값)
	safeAreaInset: SafeAreaInset;

	// Telegram UI 요소와 겹치지 않는 콘텐츠 표시 안전 영역 정보
	contentSafeAreaInset: ContentSafeAreaInset;

	// 뒤로가기 버튼 제어 객체
	BackButton: BackButton;

	// 하단의 주요 버튼 제어 객체
	MainButton: BottomButton;

	// 하단의 보조 버튼 제어 객체
	SecondaryButton: BottomButton;

	// 설정 버튼 제어 객체
	SettingsButton: SettingsButton;

	// 햅틱 피드백 제어 객체
	HapticFeedback: HapticFeedback;

	// 클라우드 스토리지 제어 객체
	CloudStorage: CloudStorage;

	// 생체 인증 제어 객체
	BiometricManager: BiometricManager;

	// 가속도계 데이터 제어 객체
	Accelerometer: Accelerometer;

	// 기기 방향 데이터 제어 객체
	DeviceOrientation: DeviceOrientation;

	// 자이로스코프 데이터 제어 객체
	Gyroscope: Gyroscope;

	// 위치 데이터 제어 객체
	LocationManager: LocationManager;

	// Telegram 앱이 특정 버전 이상을 지원하는지 확인
	isVersionAtLeast(version: string): boolean;

	// 앱 헤더 색상을 설정 (#RRGGBB 형식)
	setHeaderColor(color: string): void;

	// 앱 배경 색상을 설정 (#RRGGBB 형식)
	setBackgroundColor(color: string): void;

	// 앱 하단 바 색상을 설정 (#RRGGBB 형식)
	setBottomBarColor(color: string): void;

	// Mini App 닫기 확인 대화 상자 활성화
	enableClosingConfirmation(): void;

	// Mini App 닫기 확인 대화 상자 비활성화
	disableClosingConfirmation(): void;

	// 세로 스와이프 제스처 활성화
	enableVerticalSwipes(): void;

	// 세로 스와이프 제스처 비활성화
	disableVerticalSwipes(): void;

	// 전체 화면 모드 요청
	requestFullscreen(): void;

	// 전체 화면 모드 종료
	exitFullscreen(): void;

	// Mini App의 현재 방향 고정
	lockOrientation(): void;

	// Mini App의 방향 고정 해제
	unlockOrientation(): void;

	// Mini App을 홈 화면에 추가 요청
	addToHomeScreen(): void;

	// Mini App의 홈 화면 추가 상태 확인
	checkHomeScreenStatus(callback?: (status: string) => void): void;

	// Telegram 앱 이벤트 리스너 추가
	onEvent(eventType: string, eventHandler: () => void): void;

	// Telegram 앱 이벤트 리스너 제거
	offEvent(eventType: string, eventHandler: () => void): void;

	// 데이터를 Telegram으로 전송
	sendData(data: string): void;

	// 인라인 쿼리를 Telegram 앱의 입력 필드에 삽입
	switchInlineQuery(query: string, chooseChatTypes?: string): void;

	// 외부 브라우저에서 링크 열기
	openLink(url: string, options?: { try_instant_view?: boolean }): void;

	// Telegram 앱에서 링크 열기
	openTelegramLink(url: string): void;

	// 송장(invoice) 열기
	openInvoice(url: string, callback?: (status: string) => void): void;

	// Telegram 스토리에 미디어 공유
	shareToStory(media_url: string, params?: StoryShareParams): void;

	// 메시지 공유 다이얼로그 열기
	shareMessage(msg_id: string, callback?: (success: boolean) => void): void;

	// 사용자 이모지 상태 설정
	setEmojiStatus(
		custom_emoji_id: string,
		params?: EmojiStatusParams,
		callback?: (success: boolean) => void
	): void;

	// 이모지 상태 액세스 요청
	requestEmojiStatusAccess(callback?: (granted: boolean) => void): void;

	// 파일 다운로드 요청
	downloadFile(params: DownloadFileParams, callback?: (status: boolean) => void): void;

	// 기본 팝업 표시
	showPopup(params: PopupParams, callback?: (buttonId: string | null) => void): void;

	// 간단한 경고(alert) 팝업 표시
	showAlert(message: string, callback?: () => void): void;

	// 확인(confirm) 팝업 표시
	showConfirm(message: string, callback?: (confirmed: boolean) => void): void;

	// QR 코드 스캔 팝업 표시
	showScanQrPopup(
		params: ScanQrPopupParams,
		callback?: (qrText: string) => boolean
	): void;

	// QR 코드 스캔 팝업 닫기
	closeScanQrPopup(): void;

	// 클립보드에서 텍스트 읽기
	readTextFromClipboard(callback?: (data: string | null) => void): void;

	// 사용자 작성 권한 요청
	requestWriteAccess(callback?: (status: string) => void): void;

	// 사용자 연락처 요청
	requestContact(callback?: (status: string) => void): void;

	// Mini App 준비 완료 알림
	ready(): void;

	// Mini App 확장 요청
	expand(): void;

	// Mini App 닫기 요청
	close(): void;
}


export interface WebAppInitData {
	// 쿼리 ID (Mini App 세션 고유 식별자, 선택 사항)
	query_id?: string;

	// Mini App을 실행한 사용자 정보
	user?: WebAppUser;

	// 수신자 정보 (채팅 상대)
	receiver?: WebAppUser;

	// 채팅 정보 (그룹/슈퍼그룹/채널 등)
	chat?: WebAppChat;

	// 채팅 유형 (예: "private", "group", "supergroup", "channel")
	chat_type?: string;

	// 글로벌 채팅 인스턴스 ID
	chat_instance?: string;

	// Mini App 실행 시 전달된 시작 매개변수
	start_param?: string;

	// 특정 시간 후 메시지 전송 가능 여부 (초 단위)
	can_send_after?: number;

	// 인증된 데이터의 Unix 타임스탬프
	auth_date: number;

	// 데이터 무결성을 검증하기 위한 해시 값
	hash: string;

	// 데이터 서명 (선택 사항)
	signature?: string;
}

// 사용자 정보를 나타내는 인터페이스
export interface WebAppUser {
	// 사용자 ID
	id: number;

	// 사용자가 봇인지 여부 (선택 사항)
	is_bot?: boolean;

	// 사용자 이름 (이름)
	first_name: string;

	// 사용자 성 (선택 사항)
	last_name?: string;

	// 사용자 Telegram ID 또는 @username (선택 사항)
	username?: string;

	// 사용자 언어 코드 (예: "en", "ko")
	language_code?: string;

	// Telegram Premium 사용자 여부 (선택 사항)
	is_premium?: boolean;

	// 사용자 프로필 사진 URL (선택 사항)
	photo_url?: string;

	// Mini App이 첨부 메뉴에 추가되었는지 여부 (선택 사항)
	added_to_attachment_menu?: boolean;

	// 사용자가 봇과 1:1 메시지 전송을 허용했는지 여부 (선택 사항)
	allows_write_to_pm?: boolean;
}

// 채팅 정보를 나타내는 인터페이스
export interface WebAppChat {
	// 채팅 ID
	id: number;

	// 채팅 유형 ("group", "supergroup", "channel")
	type: "group" | "supergroup" | "channel";

	// 채팅 제목
	title: string;

	// 채팅의 @username (선택 사항)
	username?: string;

	// 채팅의 프로필 사진 URL (선택 사항)
	photo_url?: string;
}

// Telegram 테마 파라미터
export interface ThemeParams {
	// 배경 색상 (#RRGGBB 형식)
	bg_color?: string;

	// 텍스트 색상 (#RRGGBB 형식)
	text_color?: string;

	// 힌트 텍스트 색상 (#RRGGBB 형식)
	hint_color?: string;

	// 링크 색상 (#RRGGBB 형식)
	link_color?: string;

	// 버튼 색상 (#RRGGBB 형식)
	button_color?: string;

	// 버튼 텍스트 색상 (#RRGGBB 형식)
	button_text_color?: string;

	// 보조 배경 색상 (#RRGGBB 형식)
	secondary_bg_color?: string;

	// 헤더 배경 색상 (#RRGGBB 형식)
	header_bg_color?: string;

	// 하단 바 배경 색상 (#RRGGBB 형식)
	bottom_bar_bg_color?: string;

	// 강조 텍스트 색상 (#RRGGBB 형식)
	accent_text_color?: string;

	// 섹션 배경 색상 (#RRGGBB 형식)
	section_bg_color?: string;

	// 섹션 헤더 텍스트 색상 (#RRGGBB 형식)
	section_header_text_color?: string;

	// 섹션 구분선 색상 (#RRGGBB 형식)
	section_separator_color?: string;

	// 부제목 텍스트 색상 (#RRGGBB 형식)
	subtitle_text_color?: string;

	// 파괴적인 작업 텍스트 색상 (#RRGGBB 형식)
	destructive_text_color?: string;
}

// 기기의 안전 영역 여백 정보
export interface SafeAreaInset {
	top: number; // 상단 여백
	bottom: number; // 하단 여백
	left: number; // 왼쪽 여백
	right: number; // 오른쪽 여백
}

// 콘텐츠 표시를 위한 안전 영역 여백 정보
export interface ContentSafeAreaInset {
	top: number; // 상단 여백
	bottom: number; // 하단 여백
	left: number; // 왼쪽 여백
	right: number; // 오른쪽 여백
}

// 뒤로가기 버튼 제어 객체
export interface BackButton {
	isVisible: boolean; // 버튼이 표시 중인지 여부
	onClick(callback: () => void): BackButton; // 버튼 클릭 시 이벤트 설정
	offClick(callback: () => void): BackButton; // 클릭 이벤트 제거
	show(): BackButton; // 버튼 표시
	hide(): BackButton; // 버튼 숨기기
}

// 하단 주요/보조 버튼 제어 객체
export interface BottomButton {
	type: "main" | "secondary"; // 버튼 유형
	text: string; // 버튼 텍스트
	color: string; // 버튼 색상
	textColor: string; // 버튼 텍스트 색상
	isVisible: boolean; // 버튼이 표시 중인지 여부
	isActive: boolean; // 버튼이 활성화되었는지 여부
	hasShineEffect: boolean; // 버튼에 빛나는 효과가 있는지 여부
	position: "left" | "right" | "top" | "bottom"; // 버튼 위치
	isProgressVisible: boolean; // 로딩 표시가 활성화되었는지 여부

	setText(text: string): BottomButton; // 버튼 텍스트 설정
	onClick(callback: () => void): BottomButton; // 버튼 클릭 이벤트 설정
	offClick(callback: () => void): BottomButton; // 클릭 이벤트 제거
	show(): BottomButton; // 버튼 표시
	hide(): BottomButton; // 버튼 숨기기
	enable(): BottomButton; // 버튼 활성화
	disable(): BottomButton; // 버튼 비활성화
	showProgress(leaveActive?: boolean): BottomButton; // 로딩 표시 시작
	hideProgress(): BottomButton; // 로딩 표시 종료
	setParams(params: Partial<BottomButton>): BottomButton; // 버튼 설정 변경
}

// 설정 버튼 제어 인터페이스
export interface SettingsButton {
	isVisible: boolean; // 설정 버튼이 현재 표시 중인지 여부
	onClick(callback: () => void): SettingsButton; // 설정 버튼 클릭 시 이벤트 리스너 등록
	offClick(callback: () => void): SettingsButton; // 설정 버튼 클릭 이벤트 리스너 제거
	show(): SettingsButton; // 설정 버튼 표시
	hide(): SettingsButton; // 설정 버튼 숨기기
}

// 햅틱 피드백 제어 인터페이스
export interface HapticFeedback {
	impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): HapticFeedback;
	// 충격 효과 발생 (스타일 지정: 가벼움, 중간, 무거움 등)
	notificationOccurred(type: "error" | "success" | "warning"): HapticFeedback;
	// 알림 효과 발생 (유형: 오류, 성공, 경고 등)
	selectionChanged(): HapticFeedback;
	// 선택 변경 효과 발생
}

// 클라우드 스토리지 제어 인터페이스
export interface CloudStorage {
	setItem(key: string, value: string, callback?: (error: Error | null, success: boolean) => void): CloudStorage;
	// 클라우드 스토리지에 항목 저장
	getItem(key: string, callback: (error: Error | null, value: string | null) => void): CloudStorage;
	// 클라우드 스토리지에서 항목 가져오기
	getItems(keys: string[], callback: (error: Error | null, values: { [key: string]: string }) => void): CloudStorage;
	// 여러 항목 가져오기
	removeItem(key: string, callback?: (error: Error | null, success: boolean) => void): CloudStorage;
	// 클라우드 스토리지에서 항목 제거
	removeItems(keys: string[], callback?: (error: Error | null, success: boolean) => void): CloudStorage;
	// 여러 항목 제거
	getKeys(callback: (error: Error | null, keys: string[]) => void): CloudStorage;
	// 저장된 모든 키 가져오기
}

// 생체 인증 제어 인터페이스
export interface BiometricManager {
	isInited: boolean; // 객체 초기화 여부
	isBiometricAvailable: boolean; // 생체 인증 가능 여부
	biometricType: "finger" | "face" | "unknown"; // 생체 인증 유형 (지문, 얼굴 등)
	isAccessRequested: boolean; // 액세스 요청 여부
	isAccessGranted: boolean; // 액세스 허용 여부
	isBiometricTokenSaved: boolean; // 생체 인증 토큰 저장 여부
	deviceId: string; // 고유 기기 ID

	init(callback?: () => void): BiometricManager; // 객체 초기화
	requestAccess(params: BiometricRequestAccessParams, callback?: (granted: boolean) => void): BiometricManager;
	// 생체 인증 액세스 요청
	authenticate(params: BiometricAuthenticateParams, callback?: (authenticated: boolean) => void): BiometricManager;
	// 사용자 인증
	updateBiometricToken(token: string, callback?: (updated: boolean) => void): BiometricManager;
	// 생체 인증 토큰 업데이트
	openSettings(): BiometricManager; // 설정 화면 열기
}

// 생체 인증 액세스 요청 매개변수
export interface BiometricRequestAccessParams {
	reason?: string; // 액세스 요청 이유 (선택 사항)
}

// 생체 인증 매개변수
export interface BiometricAuthenticateParams {
	reason?: string; // 인증 요청 이유 (선택 사항)
}

// 가속도계 제어 인터페이스
export interface Accelerometer {
	isStarted: boolean; // 가속도계 추적 활성화 여부
	x: number; // X축 가속도 (m/s²)
	y: number; // Y축 가속도 (m/s²)
	z: number; // Z축 가속도 (m/s²)

	start(params: AccelerometerStartParams, callback?: (success: boolean) => void): Accelerometer;
	// 가속도계 데이터 추적 시작
	stop(callback?: (success: boolean) => void): Accelerometer;
	// 가속도계 데이터 추적 중단
}

// 가속도계 시작 매개변수
export interface AccelerometerStartParams {
	refresh_rate?: number; // 새로고침 빈도 (20~1000ms, 기본값 1000ms)
}

// 기기 방향 제어 인터페이스
export interface DeviceOrientation {
	isStarted: boolean; // 기기 방향 추적 활성화 여부
	absolute: boolean; // 절대 방향 데이터 사용 여부
	alpha: number; // Z축 회전 (라디안)
	beta: number; // X축 회전 (라디안)
	gamma: number; // Y축 회전 (라디안)

	start(params: DeviceOrientationStartParams, callback?: (success: boolean) => void): DeviceOrientation;
	// 기기 방향 추적 시작
	stop(callback?: (success: boolean) => void): DeviceOrientation;
	// 기기 방향 추적 중단
}

// 기기 방향 시작 매개변수
export interface DeviceOrientationStartParams {
	refresh_rate?: number; // 새로고침 빈도 (20~1000ms)
	need_absolute?: boolean; // 절대 데이터 요청 여부
}

// 자이로스코프 제어 인터페이스
export interface Gyroscope {
	isStarted: boolean; // 자이로스코프 추적 활성화 여부
	x: number; // X축 회전 속도 (rad/s)
	y: number; // Y축 회전 속도 (rad/s)
	z: number; // Z축 회전 속도 (rad/s)

	start(params: GyroscopeStartParams, callback?: (success: boolean) => void): Gyroscope;
	// 자이로스코프 추적 시작
	stop(callback?: (success: boolean) => void): Gyroscope;
	// 자이로스코프 추적 중단
}

// 자이로스코프 시작 매개변수
export interface GyroscopeStartParams {
	refresh_rate?: number; // 새로고침 빈도 (20~1000ms)
}

// 위치 데이터 관리 인터페이스
export interface LocationManager {
	isInited: boolean; // 객체 초기화 여부
	isLocationAvailable: boolean; // 위치 데이터 사용 가능 여부
	isAccessRequested: boolean; // 위치 데이터 요청 여부
	isAccessGranted: boolean; // 위치 데이터 액세스 허용 여부

	init(callback?: () => void): LocationManager; // 객체 초기화
	getLocation(callback: (data: LocationData | null) => void): LocationManager;
	// 현재 위치 데이터 요청
	openSettings(): LocationManager; // 위치 설정 화면 열기
}

// 위치 데이터
export interface LocationData {
	latitude: number; // 위도
	longitude: number; // 경도
	altitude: number | null; // 고도
	course: number | null; // 진행 방향 (0°=북, 90°=동)
	speed: number | null; // 속도 (m/s)
	horizontal_accuracy: number | null; // 가로 방향 정확도 (m)
	vertical_accuracy: number | null; // 세로 방향 정확도 (m)
	course_accuracy: number | null; // 진행 방향 정확도 (°)
	speed_accuracy: number | null; // 속도 정확도 (m/s)
}

// Telegram 스토리 공유 매개변수
export interface StoryShareParams {
	text?: string; // 스토리에 추가될 캡션
	widget_link?: StoryWidgetLink; // 스토리에 포함될 위젯 링크
}

// Telegram 스토리 위젯 링크
export interface StoryWidgetLink {
	url: string; // 포함할 URL
	name?: string; // 표시할 이름
}

// QR 코드 스캔 팝업 매개변수
export interface ScanQrPopupParams {
	text?: string; // 팝업에 표시할 텍스트
}

// 기본 팝업 매개변수
export interface PopupParams {
	title?: string; // 팝업 제목 (선택 사항)
	message: string; // 팝업에 표시할 메시지
	buttons?: PopupButton[]; // 팝업에 표시할 버튼 배열
}

// 팝업 버튼 정의
export interface PopupButton {
	id?: string; // 버튼 식별자
	type?: "default" | "ok" | "close" | "cancel" | "destructive";
	// 버튼 유형
	text?: string; // 버튼에 표시할 텍스트
}

// 이모지 상태 설정 매개변수
export interface EmojiStatusParams {
	duration?: number; // 상태 지속 시간 (초)
}

// 파일 다운로드 요청 매개변수
export interface DownloadFileParams {
	url: string; // 다운로드할 파일의 URL
	file_name: string; // 파일 이름
}
