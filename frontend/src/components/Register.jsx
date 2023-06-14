import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from '../actions/userActions';

// event
import Messages from "./Messages";
import Loader from "./Loader";

function Register() {

    // States
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Store State 
    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    // Dispatch
    const dispatch = useDispatch();

    // Router
    const navigate = useNavigate();
    const path = '/';

    // if userInfo useEffect
    useEffect(() => {
        if (userInfo) {
            navigate(path);
        }
    }, [userInfo]);

    // Handle
    const handleSubmit = (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords must match!');
        } else {
            dispatch(register(user_name, email, password));
        };

    };

    return (

        <>

            {message && <Messages>{message}</Messages>}

            {error && <Messages>{error}</Messages>}

            {loading ? (<Loader />) : (

                <>

                    <h2>Register</h2>

                    <form onSubmit={handleSubmit} action="#" method="POST">

                        <input
                            value={user_name}
                            onChange={(e) => setUser_name(e.target.value)}
                            type="text"
                            name="username"
                            placeholder="User Name"
                            autoComplete="name"
                            required />

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            required />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="password"
                            required />

                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            autoComplete="password"
                            required />

                        <button type="submit">Register</button>

                    </form>


                </>

            )}

        </>

    );

};

export default Register;