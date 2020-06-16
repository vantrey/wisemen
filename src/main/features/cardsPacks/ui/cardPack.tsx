import React from "react";
import Link from "../../../ui/common/Link/Link";
import {CARDS_PATH} from "../../../ui/components/routes/Routes";
import {repository} from "../../../helpers/repos_localStorage/Token";
import ModalonDeletePack from "./Моdal/ModalonADDPack";
import ModalOnDeletePack from "./Моdal/ModalonDeletePack";
type CardPackType = {
    name: string
    grade: number
    id: string
    deletedPacksCards:(cardsPackId:string)=>void
    cardsPackId:string
    user_id:string
}

const CardPack: React.FC<CardPackType> = (props) => {

    return (
        <>
            <td> {props.name} </td>
            <td> {props.grade} </td>
            <td ><Link title={'cards'} path={`${CARDS_PATH}/${props.id}`}/> </td>
            <td>{repository.get_Auth_id() == props.user_id ?
                <ModalOnDeletePack deletedPacksCards={props.deletedPacksCards} user_id={props.user_id}
                        id={props.id}/>
                : ''
            }</td>



        </>
    )
}

export default CardPack