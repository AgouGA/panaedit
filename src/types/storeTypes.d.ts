/* 
State. format is defined by pannellum
 */
declare interface State {
	default: {
		firstScene: string
		sceneFadeDuration: number
		type: 'equirectangular'
		autoLoad: boolean
		compass: boolean
		hotSpotDebug: boolean
		hfov: number
		vfov: number
		minPitch: number
		maxPitch: number
		basePath: string
	}
	scenes: Scene[string]
	articles: Article[]
	editor: {
		activeScene: string
		yaw: number
		pitch: number
	}
}

declare interface Scene {
	title: string
	northOffset: number
	panorama: string
	hotSpots: Hotspot[]
}

declare interface Hotspot {
	pitch: number
	yaw: number
	type: 'scene' | 'info'
	text: string
	sceneId: string
}

declare interface Article {
	id: number
	title: string
	url: string
	photos: Photo[]
}

declare interface Photo {
	url: string
	label: string
}
