import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles/nav.css';

function Nav() {

    // Store State
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    return (

        <nav className="nav">

            <Link to="/" className="nav__logo">

                <img src="logo.png" alt="logo coffee" />

            </Link>


            {userInfo ?

                <ul>

                    <li className="nav__link">
                        <Link to='/'>
                            Home
                        </Link>
                    </li>

                    <li className="nav__link">
                        <Link to='/products'>
                            Products
                        </Link>
                    </li>

                    <li className="nav__link">
                        <Link to='/profile'>
                            Profile
                        </Link>
                    </li>

                </ul>

                :

                <ul>

                    <li className="nav__link">
                        <Link to='/login'>Login</Link>
                    </li>
                  
                    <li className="nav__link">
                        <Link to='/register'>Register</Link>
                    </li>

                </ul>

            }

        </nav>

    );

};

export default Nav;