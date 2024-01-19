import React, { useEffect, useState } from 'react';
import CardItem, {CardT} from '../CardItem/card-item';
import './styles.css';
import axios from "axios";
import EditModal from "../EditModal/edit-modal";

interface CardColumnProperties {
    initialCards?: string[];
    boardId: string;
    field: string;
}

const CardColumn: React.FC<CardColumnProperties> = ({ field, initialCards, boardId }) => {
    const [cards, setCards] = useState<string[] | undefined>(initialCards);

    const onCreateCard = async (title: string, description: string) => {
        try {
            const res = await axios.post<CardT>(process.env.REACT_APP_SERVER_URL + "/card", { title, description });

            await axios.put(process.env.REACT_APP_SERVER_URL + "/board", { boardId, cardId: res.data._id, field });

            if (res.status === 201 && cards) {
                setCards([...cards, res.data._id]);
            }
        } catch (e) {}
    };

    useEffect(() => {
        setCards(initialCards);
    }, [initialCards, boardId]);

    return (
        <div className="row">
            {cards?.map((card, index) => (
                <CardItem boardId={boardId} key={index} initialId={card} />
            ))}
            <EditModal onSave={onCreateCard} initialTitle={""} initialDescription={""} modalTitle={"Create Card"}>
                <button className="create-card" />
            </EditModal>
        </div>
    );
};

export default CardColumn;
