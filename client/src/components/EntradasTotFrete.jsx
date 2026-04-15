import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EntradasTotFrete = () => {


  const [vendadata, setVendadata] = useState([]);
  const [buscanome, setBuscaNome] = React.useState("")

  const buscarap = buscanome.toLowerCase()

  var table = vendadata.filter(item => item.nome.toLowerCase().includes(buscarap))


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/vendas").then((res) => {

      return res.json()

    }).then((resp) => {

      setVendadata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])

  const [vendan, setVendan] = React.useState("")

  const handleDelete = (id) => {

    Swal.fire({
      title: "Deseja Excluir ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: `Não Excluir`
    }).then((result) => {

      if (result.isConfirmed) {


        fetch("https://sistemacomercial-fv5g.onrender.com/vendas" + id, {

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

    if(buscanome === '' || buscanome === null){
      toast.warning('Campo busca por nome vazio ! ...')
      document.getElementById('consulta').style.borderColor = 'Red';
    } else {
      
    const tabela = document.getElementById("table")
    const linhas = tabela.getElementsByTagName("tr")

    let somaTotal = 0;

    if(vendan !== ''){

      for (let i = 0; i < linhas.length; i++) {

            const celulas1 = linhas[i].getElementsByTagName("td");

            for (let k = 1; k < celulas1.length; k++) {

              const valorVenda = celulas1[k].innerHTML;

              if (valorVenda === vendan) {

                const celulas = linhas[i].getElementsByTagName("td");

                for (let j = 12; j < celulas.length; j++) {

                      const valorCelula = celulas[j].innerHTML;
                      // Converte o valor para número, tratando erros com try/catch
                      try {
                        const numero = Number(valorCelula);

                        if (!isNaN(numero)) { // Verifica se é um número válido
                          somaTotal += numero;
                        } else {
                          console.warn(`Valor não numérico encontrado na célula: ${valorCelula}`);
                        }
                         } catch (error) {
                        console.error("Erro ao converter valor para número:", error);
                        }
                    }                  

                }
            }

        }
         document.getElementById("total").innerText = "R$" + (somaTotal).toFixed(2);

    }else{
      toast.warning(' Informe a venda ! ')
      document.getElementById('venda').style.borderColor = 'red';
    }

 }
}

function MudaCorVenda(){
  document.getElementById('venda').style.borderColor = 'GainsBoro';
}

function MudaCorBusca(){
  document.getElementById('consulta').style.borderColor = 'GainsBoro';
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

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-1000px' }}>

        <div className="px-5 mt-5">
          <div className="mb3">
            <label htmlFor="Nome" className="Nome" style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold' }}>Busca por nome:</label>
            <label htmlFor="Mes" className="mes" style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', margin: '0 250px'}}>Venda nº:</label><br />
            <input type="search" id="consulta" onKeyUp={MudaCorBusca} autoFocus='true' className="form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', color: 'navy', padding: '2px', width: '350px' }} />
            <input type="text" className='form-control rounded-0' id="venda" onKeyUp={MudaCorVenda} value={vendan} onChange={(e) => setVendan(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', color: 'navy', width: '80px', padding: '2px', margin: '0 390px', marginTop: '-30px' }} /> <br /><br />
            <Link to="/entradas" className="btn btn-success rounded-0" style={{ fontSize: '15px', width: '140px', margin: '0 20px', height:'35px' }}>Voltar:</Link>
            <Link onClick={somar} className="btn rounded-0" style={{ color: 'white', backgroundColor: 'gray', margin: '0 25px', fontSize: '15px', height:'35px' }}>Total Frete:</Link>
            <strong style={{ fontSize: '30px' }}>Total:</strong>
            <strong><span id="total" style={{ color: 'green', fontSize: '30px', margin: '0 10px' }}></span></strong><br />

          </div><br />
  
          <br />
          <div className="mt-3">
            <table className="table" id="table" style={{ margin: '0 -30px', fontFamily: 'arial', fontSize: '17px', width: 3000 }}>
              <thead>
                <tr>
                  <th className="th" scope="col">Id:</th>
                  <th className="th" scope="col">Venda nº:</th>
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
                  <th className="th" scope="col">Faturamento:</th>
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
                      <td className="td" id="vp">{item.vp}</td>
                      <td className="td">{item.parcelamento}</td>
                      <td className="td">{item.parcelan}</td>
                      <td className="td" id="mes">{item.mes}</td>
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
          <br />

        </div>



      </div>

      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>


    </div>

  )
}

export default EntradasTotFrete