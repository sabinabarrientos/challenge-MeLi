import React from 'react';
import SearchService from './services/Search.service';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { SearchProvider } from './providers/Search.provider';
import ItemDetail from './components/ItemDetail/ItemDetail';
import HomePage from './components/HomePage/HomePage';
import SharedErrorPage from './components/SharedErrorPage/SharedErrorPage';

const App: React.FC = (): JSX.Element => {

    return (
        <Router>
            <SearchProvider>
                <Routes>

                    <Route
                        path={SearchService.states.home}
                        element={<HomePage />} />
                    <Route
                        path={SearchService.states.search}
                        element={<Layout />} />
                    <Route
                        path={`${SearchService.states.detail}:id`}
                        element={<ItemDetail />} />
                    <Route
                        path={SearchService.states.error}
                        element={<SharedErrorPage />} />

                </Routes>
            </SearchProvider>
        </Router>
    );
};

export default App;
