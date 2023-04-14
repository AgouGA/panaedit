import React from 'react'
import { removeHotspot, triggerRefresh, updateHotspot } from '../store'
import EditableLabel from './EditableLabel'

type Props = {
	hotspot: Hotspot
	hotspotIndex: number
	dispatch: (action) => void
	sceneKey: string
}

const HotspotListItem = ({
	hotspot,
	hotspotIndex,
	sceneKey,
	dispatch
}: Props) => {
	const { sceneId, text, pitch, yaw, type } = hotspot

	const handleRemove = (e) => {
		dispatch(removeHotspot({ sceneKey, hotspotIndex }))
		dispatch(triggerRefresh())
	}

	const handleLabelChange = (text) => {
		const update = { ...hotspot, text: text }

		dispatch(updateHotspot({ sceneKey, hotspotIndex, hotspot: update }))
		dispatch(triggerRefresh())
	}

	return (
		<li className="m-1 flex flex-row flex-nowrap justify-between bg-slate-900 bg-opacity-30 p-2">
			<div>
				<table className="text-sm">
					<tbody>
						<tr>
							<th>Yaw:</th>
							<td>{yaw}</td>
							<th>Pitch:</th>
							<td>{pitch}</td>
						</tr>
						<tr>
							<th>Type:</th>
							<td>{type}</td>
							<th>Target:</th>
							<td>{sceneId}</td>
						</tr>
					</tbody>
				</table>
				<p>
					<b>Label: </b>
					<EditableLabel
						value={text}
						onDoneEditing={handleLabelChange}
					/>
				</p>
			</div>
			<div>
				<button onClick={handleRemove}>remove</button>
			</div>
		</li>
	)
}

export default HotspotListItem
