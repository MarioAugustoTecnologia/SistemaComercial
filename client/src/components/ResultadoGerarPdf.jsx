import React, { useEffect, useState } from "react";
import {Link, Outlet } from "react-router-dom";
import generatePDF, { Margin } from 'react-to-pdf';
import "bootstrap-icons/font/bootstrap-icons.css";


const ResultadoGerarPdf = () => {

  const [result, setResult] = useState([])


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/resultados", {

      method: "GET",
      headers: {'content-type':'application/json'} }
      
    ).then((res) => {

    return res.json()   

    }).then((resp) => {

      setResult(resp)

    }).catch((err) => {
      console.log(err.message)
    }) 
  }, [])
  
  const GerarPdf = () => document.getElementById('conteudo');
  const personalizacao = {
     method: 'open',
     page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.MEDIUM,
    // default is 'A4'
    format: 'A4',
    // default is 'portrait'
    orientation: 'portrait',
 },
}



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

          <div id="conteudo">

            <h5 style={{ fontWeight: 'bold', color: 'blue', margin: '0 700px' }}>Resultados:</h5><br /><br />
            <table className="table" id="table" style={{ margin: '0 300px', fontFamily: 'arial', fontSize: '17px', width: 900 }}>
              <thead>
                <tr>
                  <th className="th" scope="col">Id:</th>
                  <th className="th" scope="col">Total das Entradas:</th>
                  <th className="th" scope="col">Total das Saidas:</th>
                  <th className="th" scope="col">Resultado:</th>
                  <th className="th" scope="col">Mês:</th>

                </tr>
              </thead>
              <tbody>
                {result &&
                  result.map(item => (
                    <tr key={item.id}>
                      <td className="td">{item.id}</td>
                      <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.entradas)}</td>
                      <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.saidas)}</td>
                      <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.resultado)}</td>
                      <td className="td">{item.mes}</td>


                    </tr>
                  ))

                }

              </tbody>


            </table>

          </div>


          <div className="mb3">
            <button style={{ margin: '0 25px', backgroundColor: 'LimeGreen', color: 'white', fontSize: '15px', fontFamily: 'arial' }} className="btn rounded-0" onClick={() => generatePDF(GerarPdf, personalizacao)} >Gerar PDF:</button>
            <Link to="/resultado" className="btn rounded-0" style={{ fontSize: '15px', fontFamily: 'arial', color: 'white', backgroundColor: 'orange', width: '8%' }}>Voltar:</Link>
          </div>


        </div>

      </div>
        <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
           <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
        </footer>
    </div> 

  )
}

export default ResultadoGerarPdf