
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/custom.css";

import AppRouter from "./routes";

import { LoadingProvider } from "./context/LoadingContext";
import Loading from './components/loading';

export default function App() {

  return (
      <LoadingProvider>
        <Loading />
        <AppRouter />
    </LoadingProvider>
  );
}