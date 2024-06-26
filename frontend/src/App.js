import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Sprints from './components/Sprints';
import Discussions from './components/Discussions';
import AIComponent from './components/AIComponent';
import Agents from './components/Agents';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="app-header">
                    <h1>Dashboard</h1>
                    <nav className="app-nav">
                        <NavLink to="/users" activeClassName="active">Users</NavLink>
                        <NavLink to="/sprints" activeClassName="active">Sprints</NavLink>
                        <NavLink to="/discussions" activeClassName="active">Discussions</NavLink>
                        <NavLink to="/ai" activeClassName="active">AI Chat</NavLink>
                        <NavLink to="/agents" activeClassName="active">Agents</NavLink>
                    </nav>
                </header>
                <main className="app-main">
                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/sprints" element={<Sprints />} />
                        <Route path="/discussions" element={<Discussions />} />
                        <Route path="/ai" element={<AIComponent />} />
                        <Route path="/agents" element={<Agents />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;