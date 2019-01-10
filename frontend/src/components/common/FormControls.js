import React from 'react'

export const InputControl = ({
    type,
    text,
    id,
    name,
    value,
    onChange,
    placeholder,
    description,
    classes
}) => (

        <div className="form-group">
            {text ? <label for={id}>{text}</label> : null}
            <input className={`form-control form-control-lg ${classes}`}
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-describedby={`descOf${name}`}
            />
            {description ? <small id={`descOf${name}`} className="form-textd text-muted">{description}</small> : null}
        </div>

    );


export const ButtonControl = ({
    text,
    id,
    name,
    onClick,
    classes
}) => (
        <div className="form-group">
            <button type="button" className={`btn btn-primary ${classes}`}
                id={id}
                name={name}
                onClick={onClick}
            >{text}</button>
        </div>

    )


