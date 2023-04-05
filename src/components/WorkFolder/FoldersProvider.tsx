import React from 'react'
import FolderSelector from './FolderSelector'
import { selectWorkFolder } from '../../functions'

export const FolderContext = React.createContext<Folders | null>(null)

/* 
	Wrapper for providing directory handles. 
	It should block the user and the rest of the app to not have to deal with 
	null pointers and unopened directories. We need to open ALL directories
	at this point otherwise security will block opening them
*/
const FoldersProvider = ({ children }) => {
	const [folders, setFolders] = React.useState<Folders | null>(null)

	const handleClick = () => {
		selectWorkFolder(window, setFolders)
	}

	// return directory selector if not set
	if (!folders) {
		return <FolderSelector onClick={handleClick} />
	} else {
		return <FolderContext.Provider value={folders}>{children}</FolderContext.Provider>
	}
}

export default FoldersProvider
