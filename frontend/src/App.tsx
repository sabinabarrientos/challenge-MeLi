import React from 'react';
import './App.css';
import SearchService from './services/Search.service';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { SearchProvider } from './providers/Search.provider'
import ItemDetail from './components/ItemDetail/ItemDetail';

const App: React.FC = (): JSX.Element => {

  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route
            path={SearchService.states.home}
            element={<Layout />} />
          <Route
            path={SearchService.states.search}
            element={<Layout />} />
          <Route
            path={SearchService.states.detail}
            element={<ItemDetail />} />

        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;
