import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import TenderList from './tenderFactory/TenderList';
import TenderDetails from './tender/TenderDetails';
import NewTender from './tenderFactory/NewTender';
import TenderPassed from './tenderPassed/TenderPassed';

const App = () => {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<TenderList />} />
                    <Route path="/tender/:address" element={<TenderDetails />} />
                    <Route path="/new" element={<NewTender />} />
                    <Route path="/tender/passed/:address" element={<TenderPassed />} />
                </Routes>
            </Layout>
        </BrowserRouter>

    );
}

export default App; 