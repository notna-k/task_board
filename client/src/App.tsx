import React, {useState, useEffect, FormEventHandler, ChangeEventHandler} from 'react';
import './App.css';
import Board, {BoardT} from "./components/Board/board";
import axios from "axios";



function App() {
    const [id, setId] = useState("65a27ed4677b9b3013e173ec");
    const [tempId, setTempId] = useState("65a27ed4677b9b3013e173ec")
    const [board, setBoard] = useState<BoardT>()
    const [isLoading, setIsLoading] = useState(false);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setTempId(event.currentTarget.value);
    }

    const onInputSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setId(tempId);
    }

    const onNewBoard: FormEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post<BoardT>(process.env.REACT_APP_SERVER_URL + "/board");
            setId(res.data._id);

            const existingBoardsString = localStorage.getItem("boards") || "";
            const existingBoards = existingBoardsString.split(", ");
            existingBoards.push(res.data._id);
            localStorage.setItem("boards", existingBoards.join(","));
        } catch (e) {}
    }



    useEffect(() => {
        const fetch = async () =>{
            try {
                setIsLoading(true)
                setBoard(undefined)
                const res = await axios.get<BoardT>(process.env.REACT_APP_SERVER_URL + "/board?id=" + id);
                setBoard(res.data)
            } catch(e){
                setBoard(undefined)
            } finally {
                setIsLoading(false)
            }
        }
        fetch();
    }, [id]);

    return (
        <div className="App">
            <div className="App-row">
                <input
                    type="text"
                    className="my-input"
                    placeholder="Enter board ID..."
                    onChange={onInputChange}
                />
                <button className="my-button" onClick={onInputSubmit}>SEARCH...</button>

                <button className="my-button" onClick={onNewBoard}>NEW BOARD...</button>
            </div>
            {(board !== undefined) && (!isLoading) ? (
                <Board board={board} />
            ) : (
                <p>Please enter a valid board ID</p>
            )}
        </div>
    );
}

export default App;
