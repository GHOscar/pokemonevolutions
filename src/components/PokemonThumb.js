import React from 'react'

const PokemonThumb = (props) => {
    console.log(props);
    const style = props.type + " thumb-container";
    return (
        <div className={style}>
            <div className="number"><small>#0{props.id}</small></div>
            <img src={props.image} alt={props.name} />
            <div className="detail-wrapper">
                <h3>{props.name}</h3>
                <small>Type: {props.type}</small>
            </div>
        </div>
    )
}

export default PokemonThumb