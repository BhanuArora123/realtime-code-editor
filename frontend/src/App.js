// import "antd/dist/antd.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Editor from './pages/Editor';
import { Toaster } from 'react-hot-toast';
import ioObj from './utils/ioCon';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
function App() {
  return (
    <>
      <div>
        <Toaster position='top-right' toastOptions={ {
          success: {
            theme: {
              primary: "#4aed88"
            }
          }
        } }>

        </Toaster>
      </div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> }></Route>
            <Route path="/editor/:roomId" element={ <Editor /> }></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
