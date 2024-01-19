import React, {useEffect, useState} from 'react';
import './styles.css';
import CardColumn from "../CardColumn/card-column";
import axios from "axios/index";


interface BoardProperties {
    board: BoardT
}

export interface BoardT{
    _id: string;
    toDo: string[];
    inProgress: string[];
    done: string[]
}

const Board = ({board}: BoardProperties) => {



    return (
        <div className="board-row">
            <div className="board-column">
                <h2>To Do</h2>
                <CardColumn
                    field={"toDo"}
                    initialCards={board?.toDo} boardId={board?._id || ""} />
            </div>

            <div className="board-column">
                <h2>In Progress</h2>
                <CardColumn
                    field={"inProgress"}
                    initialCards={board?.inProgress} boardId={board?._id || ""} />
            </div>

            <div className="board-column">
                <h2>Done</h2>
                <CardColumn
                    field={"done"}
                    initialCards={board?.done} boardId={board?._id || ""}/>
            </div>



        </div>
    );
};

export default Board;
