import React, {ReactNode, useEffect, useState} from 'react';

import "./styles.css";
import ReactModal from "react-modal";

interface EditModalProps {
    onSave: (editedTitle: string, editedDescription: string, id: string) => void;
    id?: string;
    initialTitle: string;
    initialDescription: string;
    children: ReactNode
    modalTitle: string;
}

const EditModal: React.FC<EditModalProps> = ({ modalTitle, children, onSave, initialTitle, initialDescription, id }) => {
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setEditedTitle(initialTitle);
        setEditedDescription(initialDescription);
    }, [initialTitle, initialDescription]);

    const firstChild = React.Children.toArray(children)[0] as React.ReactElement;
    const firstChildWithOnClick = React.cloneElement(firstChild, { onClick: () => setIsOpen(true) });
    return(
        <div>
            {firstChildWithOnClick}
            <ReactModal isOpen={isOpen} className="modal">
                <div className="edit-modal">
                    <h2>{modalTitle}</h2>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <label>Description:</label>
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <div>
                        <button onClick={() => { onSave(editedTitle, editedDescription, id || ""); setIsOpen(false)}} >Save</button>
                        <button onClick={() => {setIsOpen(false)}}>Cancel</button>
                    </div>
                </div>
            </ReactModal>
        </div>

    )
};

export default EditModal;
