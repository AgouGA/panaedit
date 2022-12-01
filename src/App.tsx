import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";

import Workspace from "../src/features/workspace/Workspace";
import Layout from "./Layout";
import Header from "./features/header/Header";
import SidebarLayout from "./features/sidebar-layout/SidebarLayout";

function App() {
    return (
        <Provider store={store}>
            <Workspace>
                <Layout header={<Header />} sidebar={<SidebarLayout />}></Layout>
            </Workspace>
        </Provider>
    );
}

export default App;
