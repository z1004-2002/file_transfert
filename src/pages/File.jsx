import React from 'react';
import Header from '../components/Header';
import { Route, Routes } from 'react-router-dom';

const File = () => {
    return (
        <div className='page file'>
            <Header/>
                <Routes>
                    <Route path='/0' element={<div>test1</div>}></Route>
                    <Route path='/1' element={<div>test1</div>}></Route>
                </Routes>
        </div>
    );
};

export default File;