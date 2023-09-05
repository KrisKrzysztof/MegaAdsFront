import React, {SyntheticEvent, useContext, useState} from "react";
import {Btn} from "../common/Btn";

import './Header.css';
import {SearchContext} from "../../contexts/search.context";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState(search);

    const setSearchFromLocalState = (event: SyntheticEvent) => {
        event.preventDefault();
        setSearch(inputValue);
    };

    const navigate = useNavigate();
    const goToMainPage = () =>{
        navigate('/');
    }

    return (
        <header>
            <h1 onClick={goToMainPage}>
                <strong>Mega</strong> ogłoszenia
            </h1>
            <Btn to="/add" text="Dodaj ogłoszenie"/>
            <form className="search" onSubmit={setSearchFromLocalState}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    placeholder="Znajdź w ogłoszeniu..."
                />
                <Btn text="Szukaj"/>
            </form>
        </header>
    )
};