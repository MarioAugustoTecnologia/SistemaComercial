import React, { useEffect, useState } from "react";
import {Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";


const EntradasUltima = () => {

  const [entradadata, setEntradadata] = useState([])


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/atual").then((res) => {

        return res.json()

    }).then((resp) => {

        setEntradadata(resp)

    }).catch((err) => {
        console.log(err.message)
    })

}, []) 

/*const handleDelete = (id) => {    

  fetch("http://localhost:3000/atual/" + id , {

      method: "DELETE"    

  }).then((res) => {           
                       
     window.location.reload();     
                
  }).catch((err) => {
    toast.error('Erro ! :' +err.message)
  })

}*/

const navigate = useNavigate()

function Return(){
  navigate('/entradas')
  
}

 const LoadEdit = (id) => {
    navigate("/vendaatual/editar/" + id);
  }

  const logout = () => {
    localStorage.clear()
    console.clear();    
  }
  
  
return (

<div className="container-fluid">
      <div className="row flex-nowrap" >

        <div className="main-wrapper">

          <nav class="sidebar bg-secondary" style={{ width:'220px', height: 1000, margin:'-12px'}}>
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
        </div><br /><br />

      </div>

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-850px' }}>

        <div className="px-5 mt-5">

          <div className="mt-3">
            <table className="table" id="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '20%' }}>
              <thead hidden='true'>
                <tr>
                  <th className="th" scope="col" >Id:</th>
                  <th className="th" scope="col">Venda nº:</th>
                  <th className="th" scope="col">Ação:</th>
                </tr>
              </thead>
              <tbody>
               {entradadata &&
                  entradadata.map(item => (
                    <tr key={item.id}>
                      <td className="td" hidden='false'>{item.id}</td>
                      <td className="td" style={{ color: 'blue', fontSize: '30px' }}><strong>{item.numero}</strong></td>
                      <td className="td"><button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px', fontSize: '20px', marginTop: '25px' }}>Editar:</button></td>
                      <td className="td"><button className="voltar" onClick={Return} style={{ color: 'white', backgroundColor: 'orange', border: 'none', borderRadius: '5px', fontSize: '20px', marginTop: '25px' }}>Voltar:</button></td>
                    </tr>
                  ))
                }

              </tbody>
              <ToastContainer />

            </table>

          </div>
        </div><br />

      </div>
      <br /><br />
           <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{position:'fixed', left:0, bottom:0, width:'100%', color:'white', textAlign:'center', zIndex:1000}}>
                   <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
            </footer>
 

    </div>

 

  )
}

export default EntradasUltima