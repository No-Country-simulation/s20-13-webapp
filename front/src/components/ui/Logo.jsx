import React from 'react'
import { Link } from 'react-router'

export default function Logo() {
    return (
        <Link to={"/"} className="logo" >
            <img src="Logo.png" alt="Logo" />
        </Link>
    )
}
