import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3001';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            if (response.status === 200) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
            } else {
                setError(response.data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-800 to-purple-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-white mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-blue-400 hover:text-blue-500">Don't have an account? Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
