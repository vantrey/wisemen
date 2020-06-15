import React, {useEffect} from 'react';
import Cards from "./Cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store/store";
import {add_Card, delete_Card, get_Cards, update_Card} from "../bll/cardsReducer";
import {NavLink, useParams} from "react-router-dom";
import LearnPage from "./LearnPage";
import {CARDS_PATH, LEARN_PATH} from "../../../ui/components/routes/Routes";
import Link from "../../../ui/common/Link/Link";


const CardsContainer: React.FC = () => {
    const {pack_id} = useParams();
    const {cards, isFetching} = useSelector((state: AppStateType) => state.cards);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(get_Cards(pack_id))
    }, [])

    const onAddNewCard = () => {
        dispatch(add_Card({cardsPack_id: pack_id}))
    }
    const onDeleteCard = (card_id:string) => {
        dispatch(delete_Card( card_id,pack_id))
    }
    const onUpdateCard = (_id:string) => {
        dispatch(update_Card({_id,answer:'wtf?' },pack_id))
    }


    return (
        <div>
            <Cards
                isFetching={isFetching}
                cards={cards}
                onAddNewCard={onAddNewCard}
                onDeleteCard={onDeleteCard}
                onUpdateCard={onUpdateCard}
            />
            <Link title={'learn'} path={`${LEARN_PATH}`}/>
        </div>
    );
};

export default CardsContainer;