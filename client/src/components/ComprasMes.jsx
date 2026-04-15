import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const ComprasMes = () => {


  const [comprasmes, setComprasmes] = useState([]);
  const [buscames, setBuscaMes] = React.useState("")
  const [mes, setMes] = useState("")

  const buscarap = buscames.toLowerCase()

  var table = comprasmes.filter(item => item.mes.toLowerCase().includes(buscarap))


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/compras").then((res) => {

      return res.json()

    }).then((resp) => {

      setComprasmes(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])

  const navigate = useNavigate()

  const handleEdit = (id) => {

     navigate('/compras/numero/editar/' + id)

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

      let valores = [];

      table.map(item => {
        valores.push(item.valorpagto)
      })

      let soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
        return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
      })

      const nome = 'Total das compras no mes de ' + buscames;
      const total = soma.toFixed(2);
      const data_cad = formataData();     
      const valorpagto = 0;     
      const mes = buscames;
      const compran = '0';
      
      const cadobj = { nome, total, data_cad, mes, valorpagto, compran }

      fetch("https://sistemacomercial-fv5g.onrender.com/compras", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cadobj)
      }).then((res) => {
        //toast.success('Cadastrado com Sucesso !') 
        window.location.reload();

      }).catch((err) => {
        toast.error('Erro ! :' + err.message)
      })

       const cadobj2 = { nome, total }

      fetch("https://sistemacomercial-fv5g.onrender.com/saidas", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cadobj2)
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
    
              fetch("https://sistemacomercial-fv5g.onrender.com/mescompraatual", {
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

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-1100px' }}>

        <div className="px-5 mt-5">
          <form action="" onSubmit={cadastrar} >
            <div className="mb3">

              <div className="d-flex">
                 <label htmlFor="Mes" className="Mes" style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold' }}>Busca por mes:</label>
                 <label htmlFor="Mes" className="Mes" style={{ fontFamily: 'arial', fontSize: '17px', margin: '0 150px', fontWeight: 'bold' }}>Mes atual:</label>
              </div>
              
              <input type="search" autoFocus='true' className="consultames form-control rounded-0" value={buscames} onChange={(e) => setBuscaMes(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight: 'bold', color: 'navy', width:'250px' }} /> <br />
            
              <Link to="/compras" className="btn btn-success rounded-0" style={{ fontSize: '15px', width: '140px', margin: '0 5px' }}>Voltar:</Link>
              <Link onClick={somar} className="btn rounded-0" style={{ color: 'white', backgroundColor: 'gray', margin: '0 -2px', fontSize: '15px' }}>Total Compras:</Link>
              <select value={mes} onChange={e => setMes(e.target.value)} style={{ fontSize: '17px', width: 160, margin: '0 280px', marginTop: '-100px', color: 'navy', fontWeight: 'bold' }} name='mes' id='mes' className='form-select rounded-0'>
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
              <button type="submit" className="btn btn-success rounded-0" style={{ margin: '0 470px', fontSize: '15px', marginTop: '-69px' }}>Cadastrar:</button>
              <Link to="/mescompraatual" className="btn btn-primary rounded-0" style={{ fontSize: '15px', width: '140px', margin: '-460px', marginTop: '-530px' }}>Mes atual:</Link>

            </div>
          </form>
          <br />

          <br /><br /><br />
          <div className="mt-3">
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
                      <td className="td">{item.vf}</td>
                      <td className="td">{item.formapag}</td>
                      <td className="td">{item.parcelamento}</td>
                      <td className="td">{item.parcelan}</td>
                      <td className="td">{item.mes}</td>
                      <td className="td">{item.data_cad}</td>
                      <td className="td">{item.fornecedor}</td>
                      <td className="td">
                        <button className="editar" onClick={() => { handleEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>
                        <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                      </td>
                    </tr>
                  ))
                }

              </tbody>

            </table>
          </div>
          <br />
        </div>

      </div>

      <br /><br /><br /><br />

      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>

    </div>
 
  )
}

export default ComprasMes