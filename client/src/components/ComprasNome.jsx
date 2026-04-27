import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const ComprasNome = () => {


  const [compradata, setCompradata] = useState([])
  const [buscanome, setBuscaNome] = React.useState("")

  const buscarap = buscanome.toLowerCase()

  var table = compradata.filter(item => item.nome.toLowerCase().includes(buscarap))


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/compras").then((res) => {

      return res.json()

    }).then((resp) => {

      setCompradata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])


  const handleDelete = (id) => {

    Swal.fire({
      title: "Deseja Excluir ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: `Não Excluir`
    }).then((result) => {

      if (result.isConfirmed) {

        fetch("https://sistemacomercial-fv5g.onrender.com/compras/" + id, {

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


    function somar() {

    if (buscanome === "" || buscanome === null) {
      toast.warning("O campo busca por nome está vazio !")
    } else {   

      let valores = [];

        table.map(item => {
          valores.push(item.vp)        
          
        }
        )

        let soma = valores.reduce((previous_value, current_value) => {
              
          return parseFloat(previous_value) + parseFloat(current_value);
        })
        const total = soma.toFixed(2);
        document.getElementById('total').innerHTML = total; 

    }
  }

  const navigate = useNavigate();

  const handleCad = (id) => {
    navigate('/cadprodutos/' + id)

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

      </div><br /><br /><br /><br />

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-1050px' }}>

        <div className="px-5 mt-5">
          <div className="mb3">
            <label htmlFor="Nome" className="Nome" style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold' }}>Busca por nome:</label><br />
            <input type="search" autoFocus='true' className="consultanome form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', color: 'navy', width: '250px' }} />
            <br />
            <div className="d-flex">

              <Link to="/compras" className="btn btn-success rounded-0" style={{ fontSize: '15px', fontFamily: 'arial', width: '140px', margin: '0 20px', height:'35px' }}>Voltar:</Link>
              <Link onClick={somar} className="btn rounded-0" style={{ color: 'white', backgroundColor: 'gray', margin: '0 25px', fontSize: '15px', height: '35px', width:'150px' }}>Gasto Total:</Link>
                <strong style={{ fontSize: '30px' }}>Total:</strong>
                  <strong><span id="total" style={{ color: 'green', fontSize: '30px', margin: '0 10px' }}></span></strong>
            </div>
          
          </div><br />
      
          <br />
          <div className="mt-3" style={{ width: 100 }}>
            <table className="table" id="table" style={{ margin: '0 -30px', fontFamily: 'arial', fontSize: '17px', width: 3000 }}>
              <thead>
                <tr>
                  <th className="th" scope="col">Id:</th>
                  <th className="th" scope="col">Compra nº:</th>
                  <th className="th" scope="col">Nome:</th>
                  <th className="th" scope="col">Qtd:</th>
                  <th className="th" scope="col">Custo:</th>
                  <th className="th" scope="col">Total:</th>
                  <th className="th" scope="col">Total c/Frete:</th>
                  <th className="th" scope="col">Saidas:</th>
                  <th className="th" scope="col">Troco:</th>
                  <th className="th" scope="col">Gasto Total:</th>
                  <th className="th" scope="col">Frete:</th>
                  <th className="th" scope="col">Forma Paga:</th>
                  <th className="th" scope="col">Parcelas:</th>
                  <th className="th" scope="col">Parcela:</th>
                  <th className="th" scope="col">Mês:</th>
                  <th className="th" scope="col">Data de Cadastro:</th>
                  <th className="th" scope="col">Fornecedor:</th>
                  <th className="th" scope="col">Ação:</th>
                </tr>
              </thead>
              <tbody>
                {
                  table.map(item => (
                    <tr key={item.id}>
                      <td className="td">{item.id}</td>
                      <td className="td">{item.compran}</td>
                      <td className="td">{item.nome}</td>
                      <td className="td">{item.qtd}</td>
                      <td className="td">{item.custo}</td>
                      <td className="td">{item.total}</td>
                      <td className="td">{item.totalfrete}</td>
                      <td className="td">{item.valorpagto}</td>
                      <td className="td">{item.troco}</td>
                      <td className="td">{item.vp}</td>
                      <td className="td">{item.vf}</td>
                      <td className="td">{item.formapag}</td>
                      <td className="td">{item.parcelamento}</td>
                      <td className="td">{item.parcelan}</td>
                      <td className="td">{item.mes}</td>
                      <td className="td">{item.data_cad}</td>
                      <td className="td">{item.fornecedor}</td>
                      <td className="td">
                        <button className="cadastrar" onClick={() => { handleCad(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Cadastrar:</button>
                        <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                      </td>
                    </tr>
                  ))

                }

              </tbody>
              <ToastContainer />
            </table>
          </div>


        </div>


      </div>

      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>
    </div>

  )
}

export default ComprasNome