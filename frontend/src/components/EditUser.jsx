import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userEdit } from '../actions/userActions';
import Loader from "./Loader";
import Messages from "./Messages";
import { useNavigate } from "react-router-dom";
import { USER_EDIT_RESET } from "../constants/userConsts";

function EditUser() {

    // Store State
    const userLogin = useSelector((state) => state.userLogin);
    const { error, success, loading, userInfo } = userLogin

    // State
    const [input_username, setInput_username] = useState(userInfo.user_name);
    const [input_email, setInput_email] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Dispatch
    const dispatch = useDispatch();

    // if userInfo useEffect
    useEffect(() => {

        if (userInfo.id !== userInfo.id) {
            dispatch({ type: USER_EDIT_RESET });
        } else {
            setInput_username(userInfo.user_name);
            setInput_email(userInfo.email);
        };

    }, [dispatch, success, userInfo]);

    // Router
    const navigate = useNavigate();
    const path = '/profile';

    // Handle
    const submitHandler = (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            window.alert('¡Las contraseñas deben coincidir!')
        } else {
            dispatch(userEdit({
                id: userInfo.id,
                user_name: input_username,
                email: input_email,
                password: password,
            }));
            navigate(path);
        };

    };

    return (

        <>

            {loading ? <Loader />

                : error

                    ? <Messages>{error}</Messages>

                    : (

                        <>

                            <form action="#" method="PUT" onSubmit={submitHandler}>

                                <input
                                    value={input_username}
                                    onChange={(e) => setInput_username(e.target.value)}
                                    type="text"
                                    name="username"
                                    placeholder="User Name"
                                    autoComplete="name"
                                    required />

                                <input
                                    value={input_email}
                                    onChange={(e) => setInput_email(e.target.value)}
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

                                <button type="submit">Edit</button>

                            </form>


                        </>

                    )}

        </>

    );

};

export default EditUser;