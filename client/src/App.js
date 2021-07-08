import React from 'react';
import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {ModalProvider} from "./components/Modal/Modal";

import './sass/main-components.scss';
import {BrowserRouter} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <ModalProvider>
        <div className="main-wrapper">
          <Main/>
          <Footer/>
        </div>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
