import React, { useEffect, useState } from "react";
import axios from "axios";

let count = 1;
let pokemons = [];
let max = 15;

export default function Pokemon() {
    const [pokemon, setPokemon] = useState("");
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [buttonText, setbuttonText] = useState("Moves");
    const [showModal, setShowModal] = useState(false);
    const [showStats, setShowStats] = useState(true);
    const [showMoves, setShowMoves] = useState(false);


    useEffect(() => {
        axios.get(url + count)
            .then(function(res){
                setPokemon(res.data);
            })
            if(pokemon != ""){
                pokemons.push(pokemon);
            }
        if (pokemons.length <= max) {
            count++;
        }
    }, [count]);

    const loadMore = () => {
        for(let i = 17; i <= 33; i++){
         axios.get(url + i)
        .then(function(res){
            setPokemon(res.data);
            pokemons.push(res.data);
        }).catch(function(err){
            console.log(err);
        })
    }
}

    const showDetails = (e) => {
        axios.get(url + e.currentTarget.id)
        .then(function(res){
            setPokemon(res.data);
            setShowModal(true);
            setShowStats(true);
            setbuttonText("Moves");
            setShowMoves(false);
        }).catch(function(err){
            console.log(err);
        })
    }

    const hideDetails = () => {
        setShowModal(false);
    }

    const showMoveDetails = () => {
        if(showMoves == false){
            setShowMoves(true);
            setShowStats(false);
            setbuttonText("Stats");
        }else{
            setShowMoves(false);
            setShowStats(true);
            setbuttonText("Moves");
        }
    }


    return (
        <>
            <div className="pokemon-grid-container">
                {pokemons.length != 0 &&
                    pokemons.map((element) => (
                        <div className="pokemon-grid-child" id={element.id} key={element.id} onClick={(e) => showDetails(e)}>
                            <span className="id">#{element.id}</span>
                            <span className="name">{element.name}</span>
                            <div className="types">
                                <span className="type">{element.types[0].type.name}</span>
                            {element.types[1] &&
                                <span className="type">{element.types[1].type.name}</span>
                            }
                            </div>
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

     {/* ------------------------MODAL-------------------------- */}

            {showModal &&
            <div className="pokemon-modal" >
                            <span className="id">#{pokemon.id}</span>
                            <span className="name">{pokemon.name}</span>
                            <button className="buttonClose" onClick={hideDetails}>X</button>
                            <button id="buttonMoves" onClick={showMoveDetails}>{buttonText}</button>
                            <div className="types">
                                <span className="type">{pokemon.types[0].type.name}</span>
                            {pokemon.types[1] &&
                                <span className="type">{pokemon.types[1].type.name}</span>
                            }
                            </div>
                                <div>
                                    <img src={pokemon.sprites.front_default} />
                                    <img src={pokemon.sprites.back_default} />
                                </div>
                                {showStats &&
                                <div className="details">
                                    <span className="detail">Height: {pokemon.height}</span>
                                    <span className="detail">Weight: {pokemon.weight}</span>
                                {pokemon.abilities.map((element) => (
                                    <div className="abilities">
                                        <span className="ability">Ability: {element.ability.name}</span>
                                    </div>
                                    ))}
                                <table>
                                    <tbody>
                                        {pokemon.stats.map((element) => (
                                            <tr><td>{element.stat.name}:</td><td className="stat_value">{element.base_stat}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                                }
                                {showMoves &&
                                <>
                                <h2>Moves</h2>
                                <div className="moves">
                                <ul>
                                    {pokemon.moves.map((element)=>(
                                            <li><span className="move">{element.move.name}</span></li>
                                    ))}
                                </ul>
                                </div>
                                </>
                                }
            </div>
            }
        </>
    );
}
