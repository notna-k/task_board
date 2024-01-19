import React, {useEffect, useState} from 'react';
import EditModal from "../EditModal/edit-modal";
import axios from "axios";
import "./styles.css"
import DeleteModal from "../DeleteModal/delete-modal";

import {FaEdit} from "react-icons/fa";


interface CardItemProps {
    initialId: string | undefined;
    boardId: string
}
export interface CardT{
    _id: string;
    title: string;
    description: string;
}

const CardItem: React.FC<CardItemProps> = ({ initialId,  boardId}) => {
    const [id, setId] = useState(initialId);
    const [title, setTitle] = useState<string | undefined>("");
    const [description, setDescription] = useState<string | undefined>("");

    useEffect(() => {
        const fetch = async () =>{
            try {
                const res = await axios.get<CardT>(process.env.REACT_APP_SERVER_URL + "/card?id=" + id);
                if (res.status === 200) {
                    setTitle(res.data.title);
                    setDescription(res.data.description)
                }
            } catch(e){}
        }
        fetch();
    }, [id]);
    const modalSave = async (editedTitle: string, editedDescription: string, id: string) => {
        let res;
        try {
            res = await axios.patch(process.env.REACT_APP_SERVER_URL + "/card",
                { _id: id, title: editedTitle, description: editedDescription });
            if(res.status === 200){
                setTitle(editedTitle);
                setDescription(editedDescription);
            }
        } catch (e){}
    };

    const modalDelete = async (cardId: string, boardId: string) => {
        let res;
        try {
            res = await axios.delete(process.env.REACT_APP_SERVER_URL + "/board/card", {params:{
                cardId, boardId}});
            if (res.status === 200){
                setId(undefined);
            }

        } catch (e){}
    };



    if(id !== undefined) {
        return (
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-icons">
                    <EditModal
                        modalTitle={"Edit Card"}
                        id={id || ""}
                        onSave={modalSave}
                        initialTitle={title || ""}
                        initialDescription={description || ""}

                    >
                        <FaEdit className="edit-button"/>
                    </EditModal>
                    <DeleteModal
                        cardId={id || ""}
                        boardId={boardId}
                        onDelete={modalDelete}
                    />
                </div>

            </div>
        );
    } else return (<></>);
};

export default CardItem;
