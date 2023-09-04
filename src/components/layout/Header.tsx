import React, {SyntheticEvent, useContext, useState} from "react";
import {Btn} from "../common/Btn";

import './Header.css';
import {SearchContext} from "../../contexts/search.context";

export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState(search);

    const setSearchFromLocalState = (event: SyntheticEvent) => {
        event.preventDefault();
        setSearch(inputValue);
    };

    return (
        <header>
            <h1>
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