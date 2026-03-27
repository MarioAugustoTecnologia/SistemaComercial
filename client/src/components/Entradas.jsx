import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';



const Entradas = () => {

  const [vendasdata, setVendasdata] = useState([])

  const API_URL = 'https://sistemacomercial-fv5g.onrender.com/vendas';

  useEffect(() => {

    fetch(API_URL)
      .then(response => response.json())
      .then(data => setVendasdata(data))
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

      fetch('https://sistemacomercial-fv5g.onrender.com/vendas/' + id, {

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
        const deletePromises = vendasdata.map(item =>
          fetch(`${API_URL}/${item.id}`, {
            method: 'DELETE',
          })
        );

        // Espera que todas as promessas de exclusão sejam resolvidas
        await Promise.all(deletePromises);

        // Limpa a lista no estado do React
        setVendasdata([]);
        //console.log('Todos os dados foram excluídos com sucesso!');
        toast.success('Excluido com sucesso !')

      } catch (error) {

        console.error('Erro ao excluir todos os dados:', error);
      }



    } else if (result.isDenied) {
      Swal.fire("Nada excluido", "", "info");
    }


  }

  const logout = () => {
    localStorage.clear()
    console.clear();

  }


  return (

    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="main-wrapper">

          <nav class="sidebar bg-secondary" style={{ width: '210px', height: 1000, margin: '-12px' }}>
            <br />
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
              <li className="w-100" style={{margin:'12px'}}>
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
                  to="/produtos/codigo"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-cash-coin"></i>

                  <span className="ms-2 d-sm-inline">
                    Nova Venda:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to=""
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-graph-up"></i>
                  <span className="ms-2 d-sm-inline">
                    Faturamentos:

                  </span><br />

                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/entradas/nome"
                  className="nav-link px-0 align-middle text-white"
                >

                  <span className="ms-2 d-sm-inline">
                    - Por Produtos e Serviços:

                  </span><br />

                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/entradas/data"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-2 d-sm-inline">
                    - Por Data:
                  </span><br />

                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/entradas/mes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <span className="ms-2 d-sm-inline">
                    - Por Mês:
                  </span><br />

                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/entradas/numero"
                  className="nav-link px-0 align-middle text-white"
                > <i class="fs-4 bi bi-plus-circle"></i>
                  <span className="ms-2 d-sm-inline">
                    Totalizar Venda:
                  </span><br />

                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/entradas/totfrete"
                  className="nav-link px-0 align-middle text-white"
                ><i class="fs-4 bi bi-plus-circle-fill"></i>
                  <span className="ms-2 d-sm-inline">
                    Totalizar Frete:
                  </span><br />

                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/entradas/ultima"
                  className="nav-link px-0 align-middle text-white"
                ><i class="fs-4 bi bi-receipt"></i>
                  <span className="ms-2 d-sm-inline">
                    Venda Atual:
                  </span><br />

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
            

        <div className="mb3">

          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 800px' }}>Entradas:</h4><br /><br />
          <button type="button" onClick={deleteall} style={{ backgroundColor: 'red', color: 'white', width: '120px', margin: '0' }}>Excluir Tudo:</button>
           <br /><br />
          <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '2000px' }} id="table">
            <thead>
              <tr>
                <th className="th" scope="col">Id:</th>
                <th className="th" scope="col" >Venda nº:</th>
                <th className="th" scope="col">Nome:</th>
                <th className="th" scope="col">Qtd:</th>
                <th className="th" scope="col">Preço:</th>
                <th className="th" scope="col">Total:</th>
                <th className="th" scope="col">Desconto:</th>
                <th className="th" scope="col">Valor Desconto:</th>
                <th className="th" scope="col">Total c/Desconto:</th>
                <th className="th" scope="col">Forma Paga:</th>
                <th className="th" scope="col">Entradas:</th>
                <th className="th" scope="col">Troco:</th>
                <th className="th" scope="col">Parcelamento:</th>
                <th className="th" scope="col">Parcela:</th>
                <th className="th" scope="col">Mês:</th>
                <th className="th" scope="col">Frete:</th>
                <th className="th" scope="col">Data de Cadastro:</th>
                <th className="th" scope="col">Ação:</th>
              </tr>
            </thead>
            <tbody>
              {
                vendasdata.map(item => (
                  <tr key={item.id}>
                    <td className="td">{item.id}</td>
                    <td className="td">{item.vendan}</td>
                    <td className="td">{item.nome}</td>
                    <td className="td">{item.quant}</td>
                    <td className="td">{item.preco}</td>
                    <td className="td">{item.total}</td>
                    <td className="td">{item.desconto}</td>
                    <td className="td">{item.valordesc}</td>
                    <td className="td">{item.totaldesc}</td>
                    <td className="td">{item.formapag}</td>
                    <td className="td">{item.valorpagto}</td>
                    <td className="td">{item.troco}</td>
                    <td className="td">{item.parcelamento}</td>
                    <td className="td">{item.parcelan}</td>
                    <td className="td">{item.mes}</td>
                    <td className="td">{item.frete}</td>
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



        </div>


      </div>
      
      <br /><br />
      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>

    </div>





  )
}

export default Entradas