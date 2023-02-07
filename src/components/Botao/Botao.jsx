import React from 'react'
import './Botao.css'

export default props => {
    let classes = 'botao '
    classes += props.operacao ? 'operacao' : ''
    classes += props.duplo ? 'duplo' : ''
    classes += props.triplo ? 'triplo' : ''

    return (
        <button
            onClick={e => props.click && props.click(e.target.innerHTML)}
            className={classes}>
            {props.label}
        </button>
    )
}