import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Store } from "../../store/store";
import PickerItem from "./PickerItem";


type propType = {
    onClose: () => void
}

function ScenePicker({ onClose }: propType) {

    const scenes = useSelector((store: Store) => store.scenes);
    const dispatch = useDispatch();

    const list = Object.keys(scenes);

    const handleClickItem = (item) => {
        dispatch({ type: "SET_FIRST_SCENE", payload: item });
        onClose();
    }

    return (
        <div>
            <h1>Pick Scene</h1>
            <button onClick={() => onClose()}>cancel</button>

            {list.length == 0 ?
                (<>
                    <p>No panorama images in the project, can't set staring panorama</p>
                </>) :

                (<ul>
                    {list.map(item => <PickerItem 
                        onClick={() => handleClickItem(item)} 
                        item={item} 
                        title={scenes[item].title}>
                        </PickerItem>)}
                </ul>)}
        </div>
    );
}

export default ScenePicker;
