import { Provider } from 'mobx-react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.scss';
import NavigationBar from './components/Navigation';
import MainContent from './MainContent';
import AppStore, { APP_STORE } from './stores/AppStore';

const stores = { [APP_STORE]: AppStore.create() };

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <div className="editor-wrapper">
        <NavigationBar />
        <DndProvider backend={HTML5Backend}>
          <div className="editor-content-wrapper">
            <MainContent />
          </div>
        </DndProvider>
      </div>
    </Provider>
  );
};

export default App;
