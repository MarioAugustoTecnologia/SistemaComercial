import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const Resultado = () => {

  const [resultado, setResultado] = useState([])

  const API_URL = 'https://sistemacomercial-fv5g.onrender.com/resultados';
   
     useEffect(() => {
   
       fetch(API_URL)
         .then(response => response.json())
         .then(data => setResultado(data))
         .catch(error => console.error('Erro ao buscar os dados:', error));
   
     }, [])

      const handleDelete = async (id) => {
       
           const result = await Swal.fire({
             title: "Deseja Excluir ?",
             showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: "Excluir",
             denyButtonText: `Não Excluir`
           })
       
           if (result.isConfirmed) {
       
             fetch('https://sistemacomercial-fv5g.onrender.com/resultados/' + id, {
       
               method: "DELETE"
       
             }).then((res) => {
       
               window.location.reload();
               //toast.success('Excluido com sucesso !')      
       
             }).catch((err) => {
               toast.error('Erro ! :' + err.message)
             })
       
           } else if (result.isDenied) {
             Swal.fire("Nada excluido", "", "info");
           }
       
       
         }
     
const deleteall = async () => {
      
          const result = await Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
          })
      
          if (result.isConfirmed) {
      
            try {
              // Mapeia o array de vendas para um array de promessas de exclusão
              const deletePromises = resultado.map(item =>
                fetch(`${API_URL}/${item.id}`, {
                  method: 'DELETE',
                })
              );
      
              // Espera que todas as promessas de exclusão sejam resolvidas
              await Promise.all(deletePromises);
      
              // Limpa a lista no estado do React
              setResultado([]);
              //console.log('Todos os dados foram excluídos com sucesso!');
              toast.success('Excluido com sucesso !')  
      
            } catch (error) {
      
              console.error('Erro ao excluir todos os dados:', error);
            }    
            
          } else if (result.isDenied) {
            Swal.fire("Nada excluido", "", "info");
          }
      
      
 };

  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  return (
 <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="main-wrapper">


          <nav class="sidebar bg-secondary" style={{ width: '220px', height: 1000, margin: '-12px' }}>
            <br />
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
              <li className="w-100" style={{ margin: '12px' }}>
                <Link
                  to="/home"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-house"></i>

                  <span className="ms-2 d-sm-inline">
                    Home:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/usuarios"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-3 bi bi-person-check"></i>
                  <span className="ms-2 d-sm-inline">
                    Usuarios:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/entradas"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-cash-coin ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    Vendas:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/compras"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-cash ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    Compras:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/despesas"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-coin ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    Despesas:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/produtos"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-box-fill ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    Produtos e Serviços:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/transportes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi bi-truck-flatbed" style={{ margin: '0 8px' }}></i>
                  <span className="ms-2 d-sm-inline">
                    Transportes:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/fornecedores"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-truck ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    Fornecedores:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/clientes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-person-square ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    Clientes:
                  </span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/resultado"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-bank ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    Resultados:
                  </span>
                </Link>
              </li>
              <li className="w-100" style={{ margin: "0 7px" }}>
                <Link
                  to="/produto/codorc"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi bi-file-earmark-pdf" style={{ fontSize: '26px' }}></i>
                  <span className="ms-2 d-sm-inline">
                    Orçamentos:
                  </span>
                </Link>
              </li>
              <li className="w-100" onClick={logout}>
                <Link to="/"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-sm-inline">Sair:</span>
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-950px' }}>


        <div className="mb-3">

          <h5 style={{ fontWeight: 'bold', color: 'blue', margin: '0 700px' }}>Resultados:</h5><br /><br />

          <table className="table" id="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '1500px' }}>
            <thead>
              <tr>
                <th className="th" scope="col">Id:</th>
                <th className="th" scope="col">Total das Entradas:</th>
                <th className="th" scope="col">Total das Saidas:</th>
                <th className="th" scope="col">Resultado:</th>
                <th className="th" scope="col">Mês:</th>
                <th className="th" scope="col">Data de Cadastro:</th>
                <th className="th" scope="col">Ação:</th>
              </tr>
            </thead>
            <tbody>
              {resultado &&
                resultado.map(item => (
                  <tr key={item.id}>
                    <td className="td">{item.id}</td>
                    <td className="td">{item.entradas}</td>
                    <td className="td">{item.saidas}</td>
                    <td className="td">{item.resultado}</td>
                    <td className="td">{item.mes}</td>
                    <td className="td">{item.data_cad}</td>
                    <td className="td" >
                      <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                    </td>

                  </tr>
                ))
              }

            </tbody>
            <ToastContainer />

          </table>
              <Link to="/cadresultado" className="btn rounded-0" style={{ fontSize: '15px', fontFamily: 'arial', color: 'white', backgroundColor: 'green' }}>Novo Resultado:</Link>
              <Link to="/resultado/gerarpdf" className="btn rounded-0" style={{ fontSize: '15px', fontFamily: 'arial', color: 'white', backgroundColor: 'Crimson', width: '11%', margin: '0 20px' }}>Gerar Pdf:</Link>
              <Link className="btn rounded-0" style={{ color: 'white', backgroundColor: 'red', margin: '0 5px', fontSize: '15px', fontFamily: 'arial' }} onClick={deleteall}>Excluir Todos:</Link>
            

        </div><br /><br />
      </div>
      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
        <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
      </footer>
    </div>

  )
}

export default Resultado