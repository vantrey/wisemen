import {AppStateType, InferActionTypes} from '../store/store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {
    CardType,
    currentAnalyticsType,
    GameType,
    NewCardGradeType,
    UserFavoriteDecksType,
    UserFavoriteDeckType
} from "../../types/entities";
import {repository} from "../../helpers/repos_localStorage/reposetory";

import {batch} from "react-redux";
import {getCard} from "../../helpers/getCard/getCard";

const initialState = {
    userFavoriteDecks: {
        userId: '',
        favoriteDecks: []
    } as UserFavoriteDecksType,

    currentFavDeck: {
        favoriteDeckId: '',
        deckName: '',
        deck: []
    } as UserFavoriteDeckType,

    currentFavCard: {} as CardType,

    isFireworks: false, // game stop
    nextCardNumber: 0,

    currentAnalytics: {
        totalCardCount: 0,
        rightAnswers: 0,
        faults: 0,
        restCards: 0,
    } as currentAnalyticsType,

    gameType: 'inOrder' as GameType,
    isMulti: true,
    isSound: true,
    isRandomMode: false,
};

type InitialStateType = typeof initialState

export const favoriteDecksReducer =
    (state = initialState, action: ActionsType): InitialStateType => {
        switch (action.type) {

            case "FAVORITE_DECKS_REDUCER/SET_USER_FAVORITE_DECKS":

                return {
                    ...state,
                    userFavoriteDecks: action.userFavoriteDecks
                };

            case "FAVORITE_DECKS_REDUCER/SET_CURRENT_FAV_DECK":
                const currentFavDeck = state.userFavoriteDecks.favoriteDecks.find(
                    d => d.favoriteDeckId === action.favoriteDeckId
                )

                if (currentFavDeck) {
                    return {
                        ...state,
                        currentFavDeck: currentFavDeck,
                        currentAnalytics: {
                            ...state.currentAnalytics,
                            totalCardCount: currentFavDeck.deck.length
                        }
                    }
                }
                return state

            case "FAVORITE_DECKS_REDUCER/SET_CURRENT_FAV_CARD":
                return {
                    ...state,
                    currentFavCard: action.card
                }

            case "FAVORITE_DECKS_REDUCER/SET_GRADE_SUCCESS":
                return {
                    ...state,
                    currentFavDeck: {
                        ...state.currentFavDeck,
                        deck: state.currentFavDeck.deck.map(card => {
                            if (action.newCardGrade._id === card._id) {
                                return {...card, grade: action.newCardGrade.grade, shots: action.newCardGrade.shots}
                            }
                            return card
                        })
                    }
                }

            case "FAVORITE_DECKS_REDUCER/SET_IS_FIREWORKS":
                return {
                    ...state,
                    isFireworks: action.isFireworks
                }

            case "FAVORITE_DECKS_REDUCER/SET_ANALYTICS":
                const {
                    rightAnswers,
                    totalCardCount,
                    restCards,
                    faults
                } = state.currentAnalytics

                return {
                    ...state,
                    currentAnalytics: {
                        totalCardCount,
                        rightAnswers: action.isRightAnswer ? rightAnswers + 1 : rightAnswers,
                        faults: action.isRightAnswer ? faults : faults + 1,
                        restCards: totalCardCount - (rightAnswers + faults)
                    }
                }

            case "FAVORITE_DECKS_REDUCER/SET_GAME_TYPE":
                return {
                    ...state,
                    gameType: action.gameType
                }

            case "FAVORITE_DECKS_REDUCER/SET_NEXT_CARD_NUMBER":
                return {
                    ...state,
                    nextCardNumber: action.cardNumber
                }

            case "FAVORITE_DECKS_REDUCER/SET_IS_MULTI":
                return {
                    ...state,
                    isMulti: action.isMulti
                }

            case "FAVORITE_DECKS_REDUCER/SET_IS_SOUND":
                return {
                    ...state,
                    isSound: action.isSound
                }

            case "FAVORITE_DECKS_REDUCER/RESET_ANALYTICS":
                return {
                    ...state,
                    currentAnalytics: {
                        faults: 0,
                        rightAnswers: 0,
                        totalCardCount: 0,
                        restCards: 0
                    }
                }

            case "FAVORITE_DECKS_REDUCER/SET_IS_RANDOM_MODE":
                return {
                    ...state,
                    isRandomMode: action.isRandomMode
                }

            default:
                return state
        }
    };


export const favoriteDecksActions = {
    setUserFavoriteDecks: (userFavoriteDecks: UserFavoriteDecksType) => ({
        type: "FAVORITE_DECKS_REDUCER/SET_USER_FAVORITE_DECKS", userFavoriteDecks
    } as const),

    setCurrentFavDeck: (favoriteDeckId: string) => ({
        type: "FAVORITE_DECKS_REDUCER/SET_CURRENT_FAV_DECK",
        favoriteDeckId
    } as const),

    setCurrentFavCard: (card: CardType) => ({
        type: "FAVORITE_DECKS_REDUCER/SET_CURRENT_FAV_CARD",
        card
    } as const),

    setGradeSuccess: (newCardGrade: NewCardGradeType) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_GRADE_SUCCESS',
        newCardGrade
    } as const),

    setIsFireworks: (isFireworks: boolean) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_IS_FIREWORKS',
        isFireworks
    } as const),

    setAnalytics: (isRightAnswer: boolean) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_ANALYTICS',
        isRightAnswer
    } as const),

    setGameTypeSuccess: (gameType: GameType) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_GAME_TYPE',
        gameType
    } as const),

    setNextCardNumber: (cardNumber: number) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_NEXT_CARD_NUMBER',
        cardNumber
    } as const),

    setIsSound: (isSound: boolean) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_IS_SOUND',
        isSound
    } as const),

    setIsMulti: (isMulti: boolean) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_IS_MULTI',
        isMulti
    } as const),

    resetAnalytics: () => ({
        type: 'FAVORITE_DECKS_REDUCER/RESET_ANALYTICS'
    } as const),

    setIsRandomMode: (isRandomMode: boolean) => ({
        type: 'FAVORITE_DECKS_REDUCER/SET_IS_RANDOM_MODE',
        isRandomMode
    } as const),
};

type ActionsType = InferActionTypes<typeof favoriteDecksActions>


// thunks
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type DispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>

export const createUserFavoriteDecks = (userId: string | null): ThunkType =>
    (dispatch: DispatchType) => {

        let userFavoriteDecks = repository.get_UserFavoriteDecksFromLS(userId);

        if (!userFavoriteDecks) {
            repository.createUserFavoriteDecks(userId);
            userFavoriteDecks = repository.get_UserFavoriteDecksFromLS(userId);
        }
        if (userFavoriteDecks) {
            dispatch(favoriteDecksActions.setUserFavoriteDecks(userFavoriteDecks));
        }
    };

export const updateUserFavoriteDecks =
    (userId: string | null, favoriteDeckId: string, deckName: string, deck: Array<CardType>): ThunkType =>
        (dispatch: DispatchType) => {

            repository.updateUserFavoriteDeck(userId, favoriteDeckId, deckName, deck);
            const updatedUserFavoriteDecks = repository.get_UserFavoriteDecksFromLS(userId);

            if (updatedUserFavoriteDecks) {
                dispatch(favoriteDecksActions.setUserFavoriteDecks(updatedUserFavoriteDecks));
            }
        };

export const delUserFavoriteDecks =
    (userId: string | null, favoriteDeckId: string): ThunkType =>
        (dispatch: DispatchType) => {

            repository.delUserFavoriteDeck(userId, favoriteDeckId);
            const updatedUserFavoriteDecks = repository.get_UserFavoriteDecksFromLS(userId);

            if (updatedUserFavoriteDecks) {
                dispatch(favoriteDecksActions.setUserFavoriteDecks(updatedUserFavoriteDecks));
            }
        };

export const getCurrentFavDeck = (favoriteDeckId: string): ThunkType =>
    (dispatch: DispatchType, getState: () => AppStateType) => {
        batch(() => {
            dispatch(favoriteDecksActions.setCurrentFavDeck(favoriteDeckId));
            dispatch(favoriteDecksActions.setNextCardNumber(0));
            dispatch(getCurrentFavCard());
        })
    };

export const setEndGame = (): ThunkType =>
    (dispatch: DispatchType, getState: () => AppStateType) => {
        const gameType = getState().favoriteDecks.gameType
        dispatch(favoriteDecksActions.setNextCardNumber(0));

        if (gameType === "test") {
            //repository
            dispatch(favoriteDecksActions.resetAnalytics());
        }
        dispatch(favoriteDecksActions.setIsFireworks(true));
    }

export const getCurrentFavCard = (): ThunkType =>
    (dispatch: DispatchType, getState: () => AppStateType) => {
        const gameType = getState().favoriteDecks.gameType
        const cards = getState().favoriteDecks.currentFavDeck.deck;
        const {
            totalCardCount,
            faults,
            restCards,
            rightAnswers
        } = getState().favoriteDecks.currentAnalytics
        const currentCardNumber = getState().favoriteDecks.nextCardNumber
        let card: CardType; // undefined

        switch (gameType) {
            case "controlledRandom":
                card = getCard.controlledRandom(cards);
                dispatch(favoriteDecksActions.setCurrentFavCard(card));
                break;
            case "inOrder" || "test":
                if (totalCardCount === currentCardNumber) {
                    dispatch(setEndGame());
                } else {
                    card = cards[currentCardNumber];
                    batch(() => {
                        dispatch(favoriteDecksActions.setNextCardNumber(currentCardNumber + 1));
                        dispatch(favoriteDecksActions.setCurrentFavCard(card));
                    });
                }
                break;
        }
    };

export const setGameType = (gameType: GameType) => (dispatch: DispatchType) => {
    batch(() => {
        dispatch(favoriteDecksActions.setNextCardNumber(0));
        dispatch(getCurrentFavCard());
        dispatch(favoriteDecksActions.setGameTypeSuccess(gameType));
    })
};

export const setGrade = (newCardGrade: NewCardGradeType) =>
    (dispatch: DispatchType, getState: () => AppStateType) => {

        const userId = getState().login.userId;
        const {favoriteDeckId, deckName, deck} = getState().favoriteDecks.currentFavDeck;

        const updatedDeck = deck.map(card => {
            if (newCardGrade._id === card._id) {
                return {...card, grade: newCardGrade.grade, shots: newCardGrade.shots}
            }
            return card
        })

        repository.updateUserFavoriteDeck(userId, favoriteDeckId, deckName, updatedDeck);
        const updatedUserFavoriteDecks = repository.get_UserFavoriteDecksFromLS(userId);

        if (updatedUserFavoriteDecks) {
            // PUT to server
            batch(() => {
                dispatch(favoriteDecksActions.setUserFavoriteDecks(updatedUserFavoriteDecks));
                dispatch(favoriteDecksActions.setGradeSuccess(newCardGrade));
            })
        }
    };
