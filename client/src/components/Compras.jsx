import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const Compras = () => {

  const [compras, setCompras] = useState([])
  const navigate = useNavigate()

  const API_URL = 'https://sistemacomercial-fv5g.onrender.com/compras';

  useEffect(() => {

    fetch(API_URL)
      .then(response => response.json())
      .then(data => setCompras(data))
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

      fetch('https://sistemacomercial-fv5g.onrender.com/compras/' + id, {

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
        const deletePromises = compras.map(item =>
          fetch(`${API_URL}/${item.id}`, {
            method: 'DELETE',
          })
        );

        // Espera que todas as promessas de exclusão sejam resolvidas
        await Promise.all(deletePromises);

        // Limpa a lista no estado do React
        setCompras([]);
        //console.log('Todos os dados foram excluídos com sucesso!');
        toast.success('Excluido com sucesso !')

      } catch (error) {

        console.error('Erro ao excluir todos os dados:', error);
      }

    } else if (result.isDenied) {
      Swal.fire("Nada excluido", "", "info");
    }


  };


  const handleCad = (id) => {
    navigate('/cadprodutos/' + id)
  }

  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  return (
   <div className="container-fluid">
      <div className="row flex-nowrap" >

        <div className="main-wrapper">

          <nav class="sidebar bg-secondary" style={{ width: '270px', height: 1000, margin: '-12px' }}>
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
                  to=""
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-cash ms-2"></i>

                  <span className="ms-2 d-sm-inline">
                    Nova Compra:
                  </span>
                </Link>
              </li>
                <li className="w-100" style={{ margin: '0 6px' }}>
                <Link
                  to="/cadnovascompras"
                  className="nav-link px-0 align-middle text-white"
                >
                   <i class="fs-4 bi bi-box-seam-fill ms-2"></i>

                  <span className="ms-2 d-sm-inline">
                    - Produto não Cadastrado:
                  </span>
                </Link>
              </li>
                <li className="w-100" style={{ margin: '0 6px' }}>
                <Link
                  to="/produtos/codigo"
                  className="nav-link px-0 align-middle text-white"
                >
                 <i class="fs-4 bi bi-box-seam ms-2"></i>

                  <span className="ms-2 d-sm-inline">
                    - Produto Cadastrado:
                  </span>
                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 6px' }}>
                <Link
                  to=""
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-database"></i>
                  <span className="ms-2 d-sm-inline">
                    Consultas:

                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 6px' }}>
                <Link
                  to="/compras/nome"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-box-fill ms-2"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Produtos:

                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 12px' }}>
                <Link
                  to="/compras/data"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-calendar2-date"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Data:
                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 12px' }}>
                <Link
                  to="/compras/mes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-calendar-month"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Mês:
                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 6px' }}>
                <Link
                  to="/compras/numero"
                  className="nav-link px-0 align-middle text-white"
                > <i class="fs-4 bi bi-plus-circle"></i>
                  <span className="ms-2 d-sm-inline">
                    Totalizar Compra:
                  </span><br />

                </Link>
              </li>

              <li className="w-100" style={{ margin: '0 6px' }}>
                <Link
                  to="/compras/ultima"
                  className="nav-link px-0 align-middle text-white"
                ><i class="fs-4 bi bi-receipt"></i>
                  <span className="ms-2 d-sm-inline">
                    Compra Atual:
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

          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 800px' }}>Compras:</h4><br /><br />
          <button type="button" onClick={deleteall} style={{ backgroundColor: 'red', color: 'white', width: '120px', margin: '40px' }}>Excluir Tudo:</button>
          <br /><br />
          <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '3000px', margin:'0 40px' }} id="table">
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
                compras.map(item => (
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
                    <td className="td">{item.vf}</td>
                    <td className="td">{item.formapag}</td>
                    <td className="td">{item.parcelamento}</td>
                    <td className="td">{item.parcelan}</td>
                    <td className="td">{item.mes}</td>
                    <td className="td">{item.data_cad}</td>
                    <td className="td">{item.fornecedor}</td>
                    <td className="td">
                      <button className="editar" onClick={() => { handleCad(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Cadastrar:</button>
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
      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
        <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
      </footer>

    </div>

  )
}

export default Compras














