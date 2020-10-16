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
let render = false;

export default function Pokemon() {
    const [pokemon, setPokemon] = useState("");
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

    useEffect(() => {
        (async () => {
            const getPokemon = await axios.get(url + count);
            setPokemon(getPokemon.data);
        })();
        pokemons.push(pokemon);
        if (pokemons.length <= max) {
            count++;
        }
        render = true;
    }, [count]);

    /* console.log("pokemons", pokemons); */

    const loadMore = () => {
        axios
            .get(url + "?offset=17&limit=16")
            .then((res) => {
                console.log("res:", res);
                setPokemon(res.data.results[i]);
                pokemons.push(pokemon);
                console.log(pokemons);
                console.log(i);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                <button className="button" onClick={loadMore}>
                    More
                </button>
            </div>
        </>
    );
}
