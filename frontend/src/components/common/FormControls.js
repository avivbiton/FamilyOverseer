import React from 'react'
import classnames from "classnames";

export const InputControl = ({
    type,
    text,
    id,
    name,
    value,
    onChange,
    placeholder,
    description,
    classes,
    error
}) => (

        <div className="form-group">
            {text ? <label for={id}>{text}</label> : null}
            <input
                className={classnames(`form-control form-control-lg ${classes}`, {
                    "is-invalid": error
                })}
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-describedby={`descOf${name}`}
            />
            {description ? <small id={`descOf${name}`} className="form-textd text-muted">{description}</small> : null}
            <div className="invalid-feedback">{error}</div>
        </div>

    );


export const ButtonControl = ({
    text,
    id,
    name,
    onClick,
    classes,
    disabled
}) => (
        <div className="form-group">
            <button type="button" className={`btn btn-primary ${classes}`}
                id={id}
                name={name}
                onClick={onClick}
                disabled={disabled}
            >{text}</button>
        </div>

    )


