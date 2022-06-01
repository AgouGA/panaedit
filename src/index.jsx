import ReactDOM from 'react-dom/client'
import Editor from './components/Editor'
import { legacy_createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from './reducer'
import { Provider } from 'react-redux';

let store = legacy_createStore(reducer, devToolsEnhancer())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Editor></Editor>
    </Provider>
)
