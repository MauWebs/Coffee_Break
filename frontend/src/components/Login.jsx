import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';

function Login() {

    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Store State 
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    // error, loading, 
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
        dispatch(login(email, password));
    };

    return (

        <form onSubmit={handleSubmit} action="#" method='POST'>

            <input

                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id='email'
                name='email'
                autoComplete='email'
                required />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id='password'
                name='password'
                autoComplete='password'
                required />

            <button type="submit">Login</button>

        </form>

    );

};

export default Login;