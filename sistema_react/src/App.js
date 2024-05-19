import {Route,createRoutesFromElements,createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from '../src/pages/dashboard/Dashboard';
import RootLayout from '../src/layout/RootLayout';
import Login from "./pages/login/Login";
import NotPage from './pages/notPage/NotPage';
import TelaUsuario from "./pages/telaUsuario/TelaUsuario";
import TelaAdmin from "./pages/telaAdmin/TelaAdmin";
import EditarPagamento from "./pages/editarPagamento/EditarPagamento";
import EditarEvento from "./pages/editarEvento/EditarEvento";
import EditarUsuario from "./pages/editarUsuario/EditarUsuario";
import EditarInscrito from "./pages/editarInscrito/EditarInscrito";
import CriarEvento from "./pages/criarEvento/CriarEvento";
import CriarPagamento from "./pages/criarPagamento/CriarPagamento";
import CriarConta from "./pages/criarConta/CriarConta";
import CriarInscrito from "./pages/criaInscrito/CriarInscrito";
import Evento from "./pages/eventos/Eventos";
import TelaOrganizador from "./pages/telaOrganizador/TelaOrganizador";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>  
         <Route index element={<Dashboard/>}></Route>
      </Route>  
     
      <Route path="/tela_admin/*" element={<TelaAdmin/>}></Route>
      <Route path="/tela_admin/payments/editar_pagamento/:id" element={<EditarPagamento/>}></Route> 
      <Route path="/tela_admin/events/editar_evento/:id" element={<EditarEvento/>}></Route> 
      <Route path="/tela_admin/users/editar_usuario/:id" element={<EditarUsuario/>}></Route> 
      <Route path="/tela_admin/subscribers/editar_inscritos/:id" element={<EditarInscrito/>}></Route> 
      <Route path="/tela_admin/payments/criar_pagamento" element={<CriarPagamento/>}></Route> 
      <Route path="/tela_admin/users/criar_conta" element={<CriarConta/>}></Route> 
      <Route path="/tela_admin/events/criar_evento" element={<CriarEvento/>}></Route> 
      <Route path="/tela_admin/subscribers/criar_inscrito" element={<CriarInscrito/>}></Route> 

      <Route path="/tela_usuario/*" element={<TelaUsuario/>}></Route> 
      
      <Route path="/evento/*" element={<Evento/>}></Route> 
      <Route path="/evento/inscricoes/:id" element={<CriarInscrito/>}></Route> 
      <Route path="/evento/inscricoes/:id/pagamentos" element={<CriarPagamento/>}></Route> 
      <Route path="/criar_conta" element={<CriarConta/>}></Route>
      
       
      <Route path="/tela_organizador/*" element={<TelaOrganizador/>}></Route> 
      <Route path="/tela_organizador/payments/editar_pagamento/:id" element={<EditarPagamento/>}></Route> 
      <Route path="/tela_organizador/events/editar_evento/:id" element={<EditarEvento/>}></Route> 
      <Route path="/tela_organizador/users/editar_usuario/:id" element={<EditarUsuario/>}></Route> 
      <Route path="/tela_organizador/subscribers/editar_inscritos/:id" element={<EditarInscrito/>}></Route> 
      <Route path="/tela_organizador/payments/criar_pagamento" element={<CriarPagamento/>}></Route> 
      <Route path="/tela_organizador/users/criar_conta" element={<CriarConta/>}></Route> 
      <Route path="/tela_organizador/events/criar_evento" element={<CriarEvento/>}></Route> 
      <Route path="/tela_organizador/subscribers/criar_inscrito" element={<CriarInscrito/>}></Route> 



      <Route path="*" element={<NotPage/>}></Route> 
      <Route path="/login" element={<Login/>}></Route> 
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