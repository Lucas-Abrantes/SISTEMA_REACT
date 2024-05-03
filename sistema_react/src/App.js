import {Route,createRoutesFromElements,createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from '../src/pages/dashboard/Dashboard';
import RootLayout from '../src/layout/RootLayout';
import Login from "./pages/login/Login";
import CriarConta from "./pages/criarConta/CriarConta";
import NotPage from './pages/notPage/NotPage';
import TelaUsuario from "./pages/telaUsuario/TelaUsuario";
import TelaAdmin from "./pages/telaAdmin/TelaAdmin";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>  
         <Route index element={<Dashboard/>}></Route>
      </Route>
      <Route path="*" element={<NotPage/>}></Route> 

      <Route path="/login" element={<Login/>}></Route>   
         <Route path="/tela_admin" element={<TelaAdmin/>}></Route>
     
     

      <Route path="/criar_conta" element={<CriarConta/>}></Route> 
      <Route path="/tela_usuario" element={<TelaUsuario/>}></Route> 

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