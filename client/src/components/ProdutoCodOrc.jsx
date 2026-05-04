import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import useScanDetecion from 'use-scan-detection-react18';


const ProdutoCodOrc = () => { 


   const [produtocod, setProdutoCod] = useState([]);
   const [buscarap, setBuscaRap] = useState('');  
    
   var table = produtocod.filter(item => item.codigo.includes(buscarap))
 
 
   const navigate = useNavigate();

   //const [value, setValue] = useState("");
   useScanDetecion({
    onComplete: setBuscaRap,
    minLength: 13 
   })


   useEffect(() => {

     fetch("https://sistemacomercial-fv5g.onrender.com/produtos").then((res) => {

      return res.json()

     }).then((resp) => {

      setProdutoCod(resp)

     }).catch((err) => {
      console.log(err.message)
    }) 
   
  }, [])  


const handleInsert = (id) => {
    
  navigate("/entradas/cadastrar/orc/" + id);  

} 



const logout = () => {
  localStorage.clear()
  console.clear();
  
}

    
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="main-wrapper">

          <nav class="sidebar bg-secondary" style={{ width: '200px', height: 1000, margin: '-12px' }}>
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

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-950px' }}>

        <div>
          <label htmlFor="Id" className="Id" style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold' }}>Busca por codigo de venda:</label>
          <div className="d-flex">
            <input style={{ fontFamily: 'arial', fontSize: '17px', width: '150px', fontWeight: 'bold', color: 'navy', padding: '2px' }} type="search" className="form-control rounded-0" value={buscarap} onChange={(e) => setBuscaRap(e.target.value)} id="busca" autoFocus='true' />
            <Link to="/orcvendas" className="btn rounded-0" style={{ margin: '0 20px', color: 'white', backgroundColor: 'orange', fontSize: '15px', fontFamily: 'arial', width: '240px' }}>Orçamento de Venda:</Link>

          </div><br />
          <div className="mb-3" style={{ marginTop:'-30px'}}>
            <h5 style={{ color: 'blue', margin: '0 550px' }}><strong><center>Produtos e Serviços:</center></strong></h5><br /><br />

            <table className="table" style={{fontFamily: 'arial', fontSize: '17px', width:'1500px'}} id="table">
              <thead>
                <tr>
                  <th scope="col" className="th">Id:</th>
                  <th scope="col" className="th">Nome:</th>
                  <th scope="col" className="th">Custo:</th>
                  <th scope="col" className="th">Preço:</th>
                  <th scope="col" className="th">Categoria:</th>
                  <th scope="col" className="th">Data de Cadastro:</th>
                  <th scope="col" className="th">Quantidade:</th>
                  <th scope="col" className="th">Codigo de Venda:</th>
                  <th scope="col" className="th">Ação:</th>
                </tr>
              </thead>
              <tbody>
                {
                  table.map(item => (
                    <tr key={item.id}>
                      <td className="td">{item.id}</td>
                      <td className="td">{item.nome}</td>
                      <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.custo)}</td>
                      <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.preco)}</td>
                      <td className="td">{item.categoria}</td>
                      <td className="td">{item.data_cadastro}</td>
                      <td className="td">{item.qtd}</td>
                      <td className="td">{item.codigo}</td>
                      <td className="td"  >

                        <button className="vender" onClick={() => { handleInsert(item.id) }} style={{ color: 'white', backgroundColor: 'green', border: 'none', borderRadius: '5px' }}>Orc Venda:</button>

                      </td>

                    </tr>
                  ))

                }

              </tbody>

            </table>



          </div>

        </div><br />

      </div>
  
    </div>
  )
}

export default ProdutoCodOrc
