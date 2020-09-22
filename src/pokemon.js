import React, { useEffect, useState } from "react";
var Pokedex = require("pokedex-promise-v2");
import axios from "axios";

var options = {
    protocol: "https",
    hostName: "localhost:443",
    versionPath: "/api/v2/",
    cacheLimit: 100 * 1000,
    timeout: 5 * 1000,
};

var P = new Pokedex(options);
let count = 1;
let pokemons = [];
let max = 16;

export default function Pokemon() {
    const [pokemon, setPokemon] = useState("");

    useEffect(() => {
        (async () => {
            const getPokemon = await axios.get(
                "https://pokeapi.co/api/v2/pokemon/" + count
            );
            setPokemon(getPokemon.data);
        })();
        pokemons.push(pokemon);
        if (pokemons.length <= max) {
            count++;
        }
    }, [count]);

    console.log("pokemons", pokemons);

    return (
        <>
            <div className="pokemon-grid-container">
                {pokemons.length != 0 &&
                    pokemons.map((element) => (
                        <div className="pokemon-grid-child" key={element.id}>
                            <span className="id">#{element.id}</span>
                            <span className="name">{element.name}</span>
                            {element.sprites && (
                                <div>
                                    <img src={element.sprites.front_default} />
                                    <img src={element.sprites.back_default} />
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <div className="button-container">
                <button className="button">More</button>
            </div>
        </>
    );
}
