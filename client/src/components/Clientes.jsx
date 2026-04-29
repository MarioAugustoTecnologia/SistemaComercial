import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const Clientes = () => {

  const [clientes, setClientes] = useState([])


  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/clientes").then((res) => {

      return res.json()

    }).then((resp) => {

      setClientes(resp)

    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  const navigate = useNavigate()

  const LoadEdit = (id) => {
    navigate("/cliente/editar/" + id);
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

        fetch("https://sistemacomercial-fv5g.onrender.com/clientes/" + id, {

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
    )
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
    

        <div className="mb-3"><br /><br />

          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 700px' }}>Clientes:</h4><br /><br />

          <table className="table" id="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '1500px' }}>
            <thead>
              <tr>
                <th className="th" scope="col">Id:</th>
                <th className="th" scope="col" >Nome:</th>
                <th className="th" scope="col">Email:</th>
                <th className="th" scope="col" >Telefone:</th>
                <th className="th" scope="col">Endereço:</th>
                <th className="th" scope="col">Bairro:</th>
                <th className="th" scope="col" hidden='true'>Cpf:</th>
                <th className="th" scope="col" hidden='true'>Cnpj:</th>
                <th className="th" scope="col">Data de Cadastro:</th>
                <th className="th" scope="col">Ação:</th>
              </tr>
            </thead>
            <tbody>
              {clientes &&
                clientes.map(item => (
                  <tr key={item.id}>
                    <td className="td">{item.id}</td>
                    <td className="td">{item.nome}</td>
                    <td className="td">{item.email}</td>
                    <td className="td">{item.fone}</td>
                    <td className="td">{item.endereco}</td>
                    <td className="td">{item.bairro}</td>
                    <td className="td" hidden='true'>{item.cpf}</td>
                    <td className="td" hidden='true'>{item.cnpj}</td>
                    <td className="td">{item.data_cad}</td>
                    <td>
                      <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>
                      <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>

                    </td>

                  </tr>
                ))

              }

            </tbody>

            <ToastContainer />

          </table>
          <br />
            <Link to="/cadclientes" className="btn btn-success rounded-0" style={{ fontSize: '15px', fontFamily: 'arial' }}>Adicionar Cliente:</Link>
            <Link to="/clientes/cpf" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'Orange', fontSize: '15px', fontFamily: 'arial', margin: '0 20px' }}>Consulta por cpf:</Link>

        </div>
        <br />
            
      </div>

      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
        <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
      </footer>
    </div>


  )
}

export default Clientes