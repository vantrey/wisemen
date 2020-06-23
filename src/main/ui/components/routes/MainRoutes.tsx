import React from 'react';
import {Route} from 'react-router-dom';
import Root from '../root/Root';
import Profile from '../profile/Profile';


export const ROOT_PATH = '/';
export const PROFILE_PATH = '/profile';
export const GAME_PATH = '/game';
export const CREATE_CARDS_PATH = '/cards';
export const FIND_DECK_PATH = '/decks';
export const HOME_PATH = '/home';

const MainRoutes = () => {

    return (
        <>
            <Route exact  path={ROOT_PATH}   render={() => <Root/>} />
            <Route exact  path={PROFILE_PATH} render={() => <Profile />} />
            <Route path={GAME_PATH} render={() => <Profile />} />
            <Route path={CREATE_CARDS_PATH} render={() => <Profile />} />
            <Route path={FIND_DECK_PATH} render={() => <Profile />} />
            <Route path={HOME_PATH} render={() => <Profile />} />
        </>
    )
}
export default MainRoutes;