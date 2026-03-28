import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';
import useScanDetecion from 'use-scan-detection-react18';

const ProdutosCodigo = () => {


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


  const LoadEdit = (id) => {
    navigate("/produtos/editar/" + id);
  }

  const handleDelete = (id) => {

    Swal.fire({
      title: "Deseja Excluir ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: `Não Excluir`
    }).then((result) => {

      if (result.isConfirmed) {

        fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + id, {

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
    });


  }

  const handleInsert = (id) => {

    navigate("/entradas/cadastrar/" + id);

  }

  const handleInsertBuy = (id) => {

    navigate("/cadcompras/" + id);

  }

  const logout = () => {
    localStorage.clear()
    console.clear();

  }



  return (
    <div className="container-fluid">
      <div className="row flex-nowrap" >

        <div className="main-wrapper" >

          <nav class="sidebar bg-secondary" style={{ width: '200px', height: 950, margin: '-12px' }}>
            <br />
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"><br /><br />
              <li className="w-100" style={{ margin: '12px' }} >
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


        <div className="mb3" style={{ marginTop: '-50px' }}>
          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 800px' }}>Produtos:</h4>
          <label htmlFor="Id" className="Id" style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold' }}>Busca por codigo:</label><br />

          <input style={{ fontFamily: 'arial', fontSize: '17px', width: '140px', color: 'navy', fontWeight: 'bold', padding: '2px' }} type="search" className="form-control rounded-0" value={buscarap} onChange={(e) => setBuscaRap(e.target.value)} id="busca" autoFocus='true' /> <br />
          <Link to="/entradas" className="btn" style={{ color: 'white', backgroundColor: 'orange', fontSize: '16px', fontFamily: 'arial', width: '100px' }}>Entradas:</Link>
          <Link to="/compras" className="btn" style={{ color: 'white', backgroundColor: 'green', fontSize: '16px', fontFamily: 'arial', width: '100px', margin: '0 10px' }}>Saidas:</Link><br /><br />
          <br /><br />

          <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '1800px' }} id="table">
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
                    <td className="td">{item.custo}</td>
                    <td className="td">{item.preco}</td>
                    <td className="td">{item.categoria}</td>
                    <td className="td">{item.data_cadastro}</td>
                    <td className="td">{item.qtd}</td>
                    <td className="td">{item.codigo}</td>
                    <td className="td"  >
                      <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>
                      <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                      <button className="vender" onClick={() => { handleInsert(item.id) }} style={{ color: 'white', backgroundColor: 'orange', border: 'none', borderRadius: '5px' }}>Vender:</button>
                      <button className="comprar" onClick={() => { handleInsertBuy(item.id) }} style={{ color: 'white', backgroundColor: 'green', border: 'none', borderRadius: '5px' }}>Comprar:</button>
                    </td>

                  </tr>
                ))


              }
            </tbody>

          </table>
        </div>

      </div>

      <br /><br />

       <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height:'30px'}}>
        <p className="fw-bolder text-white" style={{marginTop:'-10px'}}>&copy; Multicompany Solutions</p>
      </footer>
 

    </div>

  )
}

export default ProdutosCodigo