import React, { useEffect, useState } from "react";
import {Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";


const MesCompraAtual = () => {

  const [mescompraatual, setMesCompraAtual] = useState([])


  useEffect(() => {

    fetch("https://sistemacomercialserver.onrender.com/mescompraatual").then((res) => {

        return res.json()

    }).then((resp) => {

        setMesCompraAtual(resp)

    }).catch((err) => {
        console.log(err.message)
    })

}, []) 

const handleDelete = (id) => {    

  fetch("https://sistemacomercialserver.onrender.com/mescompraatual/" + id , {

      method: "DELETE"    

  }).then((res) => {           
                       
     window.location.reload();     
                
  }).catch((err) => {
    toast.error('Erro ! :' +err.message)
  })

}

  const logout = () => {
    localStorage.clear()
    console.clear();    
  }
  
  
return (

<div className="container-fluid">
  <div className="row flex-nowrap">
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary" style={{fontFamily:'arial', fontSize:'19px'}}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to=""
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
               Opções:
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                  <Link
                    to="/home"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Painel:</span>
                  </Link>
                </li>
              <li className="w-100">
                <Link
                  to="/usuarios"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Usuarios:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/compras"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-cash ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
                   Produtos:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/fornecedores"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-truck ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
                     Resultado:
                  </span>
                </Link>
              </li>     
              
              <li className="w-100" onClick={logout}>
                <Link
                  to="/"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
       <div className="col p-0 m-0" style={{fontFamily:'arial'}}>
           <div className="p-2 d-flex justify-content-center shadow text-white" style={{backgroundColor:'blue'}}>
               <h4><strong style={{fontFamily:'arial'}}>Sistema de Gestão Comercial:</strong></h4>
           </div>
           <Outlet />
              <div className="px-5 mt-5">                 
                  
                    <div className="mt-3">
                          <table className="table" id="table" style={{fontFamily:'arial', fontSize:'20px', width:'20%'}}>
                              <thead hidden='true'>
                                  <tr>
                                  <th className="th" scope="col" >Id:</th>
                                  <th className="th" scope="col">Mes Atual:</th>                                
                                  <th className="th" scope="col">Ação:</th>                       
                                  </tr> 
                              </thead>
                              <tbody>                                
                                { 
                                    mescompraatual.map(item => (
                                    <tr key={item.id}>
                                           <td className="td" hidden='true'>{item.id}</td>
                                           <td className="td" style={{color:'blue', fontSize:'50px'}}><strong>{item.mes}</strong></td>
                                           <td className="td"><button className="excluir" onClick={() => {handleDelete(item.id)}} style={{color:'white', backgroundColor:'red', border:'none', borderRadius:'5px', fontSize:'23px', marginTop:'25px'}}>Excluir:</button></td>                                    
                                    </tr>
                                  ))
                                                                                                     
                                } 
                                                                      
                              </tbody>
                              <ToastContainer/> 
                
                          </table> 
           
                    </div>
                  </div><br /> 
                
                 
                 
                </div> 
          
       </div> 
                 
    </div>

 

  )
}

export default MesCompraAtual