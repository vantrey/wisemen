import React, {ChangeEvent, useRef, useState} from 'react';
import {UserType} from "../../../../../types/entities";
import {useDispatch} from "react-redux";
import {updateUser} from "../../bll/profileReducer";
import ProfileAvatar from "./ProfileAvatar";

type ProfilePropsType = {
    user: UserType
    isFetching: boolean
}

const ProfileAvatarContainer: React.FC<ProfilePropsType> = ({
                                                                user,
                                                                isFetching
                                                            }) => {

    const dispatch = useDispatch();

    const [newAvatar, setNewAvatar] = useState<string | null>(null);


    const inRef = useRef<HTMLInputElement>(null);

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            reader.readAsDataURL(newFile);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setNewAvatar(reader.result)
                }
            }
        }
    };

    const onChangeClick = () => {
        inRef && inRef.current && inRef.current.click()
    };

    const updateAvatar = () => {
        dispatch(updateUser(user.name, newAvatar));
        setNewAvatar(null)
    };

    return (
        <>
            {(isFetching &&

                <div>
                    ...LOADING
                </div>) ||

            <ProfileAvatar
                upload={upload}
                inRef={inRef}
                newAvatar={newAvatar}
                onChangeClick={onChangeClick}
                updateAvatar={updateAvatar}
                user={user}
                isFetching={isFetching}
            />}
        </>
    )
}
export default ProfileAvatarContainer;