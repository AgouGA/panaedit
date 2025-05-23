import React, { useEffect } from 'react'

import { openWorkFiles } from '../functions/openWorkFiles'
import { useDispatch } from 'react-redux'
import { replaceCache } from '../store'
import _ from 'lodash'
import { useEditor } from '../hooks/useEditor'
import { loadOnlineAssets } from '../functions/loadOnlineAssets'

/* 
	After opening the work folder, store all files including subfolders in a js Map
	with the original path in the key, and an object url as the value.
	later on, we just need to fiter out the files we need 
*/
const _directories = ['panoramas', 'articles', 'photos']

const FilesProvider = ({ children, directories = _directories }) => {
	const dispatch = useDispatch()
	const { cache, scenes } = useEditor()

	// Add useEffect to check if we have scenes but no cache
	useEffect(() => {
		// If we have scenes (from a loaded project) but no cache, try to load directory automatically
		const hasScenes = scenes && Object.keys(scenes).length > 0
		const hasEmptyCache = !cache || cache.length === 0
		
		if (hasScenes && hasEmptyCache) {
			console.log("Project loaded with scenes but no cache. Attempting to load work files...")
			// Try to automatically load from a predefined directory or show a prompt
			handleSelectDirectory()
		}
	}, [scenes])

	const handleSelectDirectory = async () => {
		const map = await openWorkFiles(directories)
		dispatch(replaceCache({ map }))
	}

	// populate the cache from hosted public directory
	const handleLoadDemoAssets = async () => {
		const map = await loadOnlineAssets()
		dispatch(replaceCache({ map }))
	}

	// If we have scenes but no cache, show a more specific message
	const hasScenes = scenes && Object.keys(scenes).length > 0
	const hasScenesButNoCache = hasScenes && (!cache || cache.length === 0)

	if (!cache || cache.length == 0) {
		return (
			<div className="flex h-full flex-col justify-center">
				<iframe
					className="absolute left-0 top-0 z-0 overflow-hidden"
					tabIndex={-1}
					width="100%"
					height="100%"
					allowFullScreen={true}
					src="https://cdn.pannellum.org/2.5/pannellum.htm#config=http://localhost:5173/defBG.json"></iframe>
				<div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-40"></div>
				<div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center">
					<div className="grid grid-cols-2 p-8 backdrop-blur-xl rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.2)"}}>
						<h1 className="text-bold col-span-2 mb-6 text-xl text-neutral-100 ">
							Pannellum Tour Editor
						</h1>
						
						{hasScenesButNoCache && (
							<div className="col-span-2 mb-6 bg-blue-900 bg-opacity-50 p-4 rounded">
								<p className="text-white">
									Project loaded successfully but panorama files need to be loaded.
									Please select the directory containing your panorama files.
								</p>
							</div>
						)}
						
						<div>
							<button onClick={handleLoadDemoAssets} className="rounded-sm">
								Read Tutorial
							</button>
						</div>

						<div>
							<button onClick={handleSelectDirectory} className="rounded-sm">
								Select Working Directory
							</button>
						</div>
						<p className="mt-12 text-xs col-span-2">
							Working directory must contain 3 folders:
							<br />articles, panoramas and photos
							<br />Must be .jpg or .png (all lowercase)
						</p>
					</div>
				</div>
			</div>
		)
	} else {
		return <>{children}</>
	}
}

export default FilesProvider