import _ from 'lodash'

/* add hotspot */
export function _addHotspot(state: State, action: AddHotspotAction) {
	const { sceneKey, hotspot } = action.payload
	const scene = state.scenes[sceneKey]

	scene.hotSpots.push(hotspot)

	return state
}

/* remove hotspot with index */
export function _removeHotspot(state: State, action: RemoveHotspotAction) {
	const { sceneKey, hotspotIndex } = action.payload
	const scene = state.scenes[sceneKey]

	_.pullAt(scene.hotSpots, hotspotIndex)

	return state
}
