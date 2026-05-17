import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const ComprasNome = () => {


  const [compradata, setCompradata] = useState([])
  const [buscanome, setBuscaNome] = React.useState("")
  const [mes, setMes] = React.useState("")

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

    if (buscanome === '' || buscanome === null) {
      toast.warning('Campo busca por nome vazio ! ...')
      document.getElementById('consulta').style.borderColor = 'Red';

    } else {

      let somaTotal = 0;

      const linhas = document.querySelectorAll("#table tbody tr");

      linhas.forEach(linha => {

        const verificames = linha.cells[14].textContent;
        const total = parseFloat(linha.cells[9].textContent);

        // Verifica a condição
        if (mes !== "") {

          if (mes.toLowerCase() === verificames.toLowerCase()) {
            somaTotal += total;
          } 

        }else{
        
           somaTotal += total;

        }
      });

         document.getElementById('total').innerHTML = "R$" + somaTotal.toFixed(2);

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

    function MudaCorMes() {
    document.getElementById('mes').style.borderColor = 'GainsBoro';
  }

  function MudaCorBusca() {
    document.getElementById('consulta').style.borderColor = 'GainsBoro';
  }

    const voltar = () => {

    navigate('/compras')

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


        </div>

      </div>
      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-850px' }}>


        <div className="mb3">

          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 800px' }}>Saidas:</h4><br /><br />
          <button type="button" onClick={voltar} style={{ backgroundColor: 'green', color: 'white', width: '120px', margin: '0' }}>Voltar:</button>
          <button type="button" onClick={somar} style={{ backgroundColor: 'gray', color: 'white', width: '150px', margin: '0 10px' }}>Total Saidas:</button>
          <strong style={{ fontSize: '30px' }}>Total:<span id="total" style={{ fontWeight: 'bold', color: 'green', margin: '0 10px' }}></span></strong><br /><br />
          <div className="d-flex">
            <label htmlFor="busca" style={{ fontWeight: 'bold', fontSize: '17px' }}>Busca por Nome:</label>
            <label htmlFor="mes" style={{ fontWeight: 'bold', fontSize: '17px', margin: '0 200px' }}>Mês:</label>
          </div>
          <div className="d-flex">
            <input type="search" id="consulta" onKeyUp={MudaCorBusca} autoFocus='true' className="form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', color: 'navy', padding: '2px', width: '300px' }} />
            <input type="text" className='form-control rounded-0' id="mes" onKeyUp={MudaCorMes} value={mes} onChange={(e) => setMes(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', color: 'navy', width: '150px', padding: '2px', margin: '0 33px' }} />


          </div>
          <br /><br />
          <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '2360px' }} id="table">
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
                    <td className="td">{item.gastototal}</td>
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



      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>
    </div>

  )
}

export default ComprasNome