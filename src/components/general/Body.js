import React from 'react';
import { Route } from 'react-router-dom';

import MenuBar from '../general/MenuBar';

import AccountList from '../accounts/AccountList';
import CategoryList from '../categories/CategoryList';
import RecordList from '../records/RecordList';

import NewAccount from '../accounts/NewAccount';
import NewCategory from '../categories/NewCategory';
import RecordsMenuBar from '../records/templates/MenuBar';

import AccountSidebar from '../accounts/AccountSidebar';
import CategorySidebar from '../categories/CategorySidebar';
import RecordSidebar from '../records/RecordSidebar';

const Body = props => (
    <div className="body">
        <div className="menu-bar">
            <Route path="/" render={props => (<MenuBar><NewAccount /></MenuBar>)} exact />
            <Route path="/categories" render={props => (<MenuBar><NewCategory /></MenuBar>)} exact />
            <Route path="/accounts/:id" component={RecordsMenuBar} exact />
        </div>
        <div className="body__main">
            <div className="main">
                <Route path="/" component={AccountList} exact />
                <Route path="/accounts/:id" component={RecordList} exact />
                <Route path="/categories" component={CategoryList} exact />
            </div>
            <div className="sidebar">
                <Route path="/" component={AccountSidebar} exact />
                <Route path="/accounts/:id" component={RecordSidebar} exact />
                <Route path="/categories" component={CategorySidebar} exact />
            </div>
        </div>
    </div>
);

export default Body;
