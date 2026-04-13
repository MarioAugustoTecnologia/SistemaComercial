import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import "bootstrap-icons/font/bootstrap-icons.css";


const EntradasMes = () => {


  const [vendasmes, setVendasmes] = useState([]);
  const [buscames, setBuscaMes] = React.useState("")
  const [mes, setMes] = useState("");

  const buscarap = buscames.toLowerCase()

  var table = vendasmes.filter(item => item.mes.toLowerCase().includes(buscarap))


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/vendas").then((res) => {

      return res.json()

    }).then((resp) => {

      setVendasmes(resp)

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


        fetch("https://sistemacomercial-fv5g.onrender.com/vendas/" + id, {

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

  function formataData() {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function somar() {

    if (buscames === "" || buscames === null) {
      toast.warning('Campo busca por mês vazio !')

    } else {
      let somaTotal = 0;
      // Seleciona todas as linhas do corpo da tabela
      const linhas = document.querySelectorAll("#table tbody tr");

      linhas.forEach(linha => {

        const forma = linha.cells[9].textContent;
        const total = parseFloat(linha.cells[10].textContent);

        // Verifica a condição
        if (forma !== "Crédito") {
          somaTotal += total;
        }
      });
      const nome = 'Total das entradas no mes de  ' + buscames;
      const total = somaTotal.toFixed(2);
      const data_cad = formataData();
      const preco = 0;
      const vendan = "0";
      const mes = buscames;
      const troco = 0;
      const valorpagto = 0;


      const cadobj = { nome, total, preco, mes, vendan, troco, valorpagto, data_cad }


      fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cadobj)
      }).then((res) => {
        //toast.success('Cadastrado com Sucesso !') 
        window.location.reload();

      }).catch((err) => {
        toast.error('Erro ! :' + err.message)
      })





    }
  }

  const cadastrar = (e) => {

    e.preventDefault();

    const cadobj = { mes }

    Swal.fire({
      title: "Deseja salvar ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      denyButtonText: `Não salvar`
    }).then((result) => {

      if (result.isConfirmed) {

        fetch("https://sistemacomercial-fv5g.onrender.com/mesatual", {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(cadobj)
        }).then((res) => {
          toast.success('Cadastrado com sucesso !')

        }).catch((err) => {
          toast.error('Erro ! :' + err.message)
        })
      }
      else if (result.isDenied) {
        Swal.fire("Nada salvo", "", "info");
      }
    })

  }

  const logout = () => {
    localStorage.clear()
    console.clear();

  }


  function CorBuscaMes() {

    document.getElementById('buscames').style.bordercolor = 'GainsBoro'

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
      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-850px' }}>

        <div className="mb3">
          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 800px' }}>Entradas:</h4><br /><br />
          <div className="d-flex">
            <label htmlFor="busca" style={{ fontWeight: 'bold', fontSize: '17px' }}>Busca por Mês:</label>
            <label htmlFor="mes" style={{ fontWeight: 'bold', fontSize: '17px', margin: '0 332px' }}>Mês Atual:</label>

          </div>
          <div className="d-flex">
            <input type="search" id="buscames" onKeyUp={CorBuscaMes} autoFocus='true' className="form-control rounded-0" value={buscames} onChange={(e) => setBuscaMes(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', color: 'navy', padding: '2px', width: '150px', height: '30px' }} />
            <Link to="/entradas" className="btn btn-success rounded-0" style={{ width: '100px', margin: '0 25px' }} >Voltar:</Link>
            <Link onClick={somar} className="btn rounded-0" style={{ color: 'white', backgroundColor: 'gray', margin: '0 -22px', width: '150px' }}>Total Entradas:</Link>
            <select value={mes} onChange={e => setMes(e.target.value)} style={{ height: '30px', fontSize: '17px', width: 160, margin: '0 49px', fontWeight: 'bold', color: 'navy' }} name='mes' id='mes' className='form-select rounded-0'>
              <option value=""></option>
              <option value="Janeiro">Janeiro</option>
              <option value="Fevereiro">Fevereiro</option>
              <option value="Março">Março</option>
              <option value="Abril">Abril</option>
              <option value="Maio">Maio</option>
              <option value="Junho">Junho</option>
              <option value="Julho">Julho</option>
              <option value="Agosto">Agosto</option>
              <option value="Setembro">Setembro</option>
              <option value="Outubro">Outubro</option>
              <option value="Novembro">Novembro</option>
              <option value="Dezembro">Dezembro</option>
            </select>
          </div><br /><br /><br /><br />

          <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '2100px' }} id="table">
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
                table.map(item => (
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

      <br />
      <br /><br /><br /><br />

      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>


    </div>
  )
}

export default EntradasMes