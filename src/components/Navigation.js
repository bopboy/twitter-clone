import React from 'react'
import { Link } from 'react-router-dom'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
                <li><Link to="/"><FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /></Link></li>
                <li>
                    <Link to="/profile"
                        style={{ marginLeft: 10, display: "flex", flexDirection: "column", alignItems: "center", fontSize: 12 }}
                    >
                        <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
                        <span style={{ marginTop: 10 }}>{userObj?.displayName ? `${userObj.displayName}'s Profile` : "Profile"}</span>
                    </Link>
                </li>
            </ul>
            <hr />
        </nav>
    )
}
export default Navigation