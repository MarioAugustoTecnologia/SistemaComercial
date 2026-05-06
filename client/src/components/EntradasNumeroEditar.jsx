import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EntradasNumeroEditar = () => {

  const { entradacod } = useParams()

  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/vendas/" + entradacod).then((res) => {
      return res.json();
    }).then((resp) => {  
     
       meschange(resp.mes);  
 
       parcelanchange(resp.parcelan);     

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  
  const [mes, meschange] = useState("")  
  const [parcelan, parcelanchange] = useState("")


  const atualizar = (e) => {
  
      e.preventDefault();
  
      const edtobj = {mes, parcelan }   
  
            Swal.fire({
              title: "Deseja salvar ?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Salvar",
              denyButtonText: `Não salvar`
            }).then((result) => {
      
              if (result.isConfirmed) {
      
                fetch("https://sistemacomercial-fv5g.onrender.com/vendas/" + entradacod, {
                  method: "PATCH",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(edtobj)
                }).then((res) => {
                  toast.success('Atualizado com sucesso !')
                  meschange('')
                  parcelanchange('')   
      
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
      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-950px' }}>

        <form onSubmit={atualizar}>
          <label htmlFor="mes" style={{ fontSize: '17px', fontWeight: 'bold' }}>Mes:</label>
          <label htmlFor="parcelan" style={{ fontSize: '17px', margin: '0 160px', fontWeight: 'bold' }}>Parcela nº:</label>
          <select style={{ fontSize: '17px', width: 150, fontWeight: 'bold', color: 'navy' }} name='mes' id='mes' className='form-select' value={mes} onChange={e => meschange(e.target.value)}>
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
          <select className="form-control rounded-0" value={parcelan} onChange={e => parcelanchange(e.target.value)} style={{ width: '20%', height: '42px', fontSize: '17px', margin: '0 200px', marginTop: '-42px', color: 'navy', fontWeight: 'bold' }} id="parcelan" >
            <option value=""></option>
            <option value="1ª">1ª</option>
            <option value="2ª">2ª</option>
            <option value="3ª">3ª</option>
            <option value="4ª">4ª</option>
            <option value="5ª">5ª</option>
            <option value="6ª">6ª</option>
            <option value="7ª">7ª</option>
            <option value="8ª">8ª</option>
            <option value="9ª">9ª</option>
            <option value="10ª">10ª</option>
            <option value="11ª">11ª</option>
            <option value="12ª">12ª</option>
          </select><br />
          <button type="submit" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'navy', fontSize: '15px', width: 120 }}>Atualizar</button>
          <ToastContainer />
          <Link to="/entradas/numero/" className="btn rounded-0" style={{ fontSize: '15px', width: 120, color: 'white', backgroundColor: 'orange', margin: '0 200px', marginTop: '-63px' }}>Voltar:</Link>
        </form>


      </div>
             <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', color: 'white', textAlign: 'center', zIndex: 1000 }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
            </footer>
    </div>

  )
}

export default EntradasNumeroEditar