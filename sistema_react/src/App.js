import {Route,createRoutesFromElements,createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from '../src/pages/dashboard/Dashboard';
import RootLayout from '../src/layout/RootLayout';
import Login from "./pages/login/Login";
import CriarConta from "./pages/criarConta/CriarConta";
import NotPage from './pages/notPage/NotPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>  
         <Route index element={<Dashboard/>}></Route>
      </Route>
      <Route path="*" element={<NotPage/>}></Route> 
      <Route path="/login" element={<Login/>}></Route> 
      <Route path="/criar_conta" element={<CriarConta/>}></Route> 
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;