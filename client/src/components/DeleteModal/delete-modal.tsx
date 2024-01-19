import React, {useState} from 'react';
import {FaTrash} from "react-icons/fa";
import ReactModal from "react-modal";
import "./styles.css"

interface DeleteModalProperties{
    cardId: string;
    boardId: string;
    onDelete: (cardId: string, boardId: string) => void
}

const DeleteModal: React.FC<DeleteModalProperties> = ({cardId, boardId, onDelete}) => {
    const [isOpen, setIsOpen] = useState(false);


    return(
        <div>
            <FaTrash className="delete-button" onClick={() => {setIsOpen(true)}} />
            <ReactModal isOpen={isOpen} className="modal">
                <div className="delete-modal">
                    <h2>Delete Card?</h2>
                    <div>
                        <button onClick={() => { onDelete(cardId, boardId); setIsOpen(false)}} >Delete</button>
                        <button onClick={() => {setIsOpen(false)}}>Cancel</button>
                    </div>
                </div>
            </ReactModal>
        </div>

    )
};

export default DeleteModal;