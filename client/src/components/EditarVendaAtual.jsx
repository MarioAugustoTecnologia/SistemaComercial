import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';

const EditarVendaAtual = () => {

  const { pvatual } = useParams()

  //const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/atual/" + pvatual).then((res) => {
      return res.json();
    }).then((resp) => {
      idchange(resp.id);
      numerochange(resp.numero);    

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);


  const [id, idchange] = useState("")
  const [number, numerochange] = useState("") //=> Representa o registro, qual é o usuario.
 

  const editar = (e) => {

    e.preventDefault();
      
      var soma = parseInt(number) + 1;
      const numero = soma;

      const edtobj = { id, numero }
      //console.log(cadobj)    

        Swal.fire({
          title: "Deseja salvar ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          denyButtonText: `Não Salvar`
        }).then((result) => {

          if (result.isConfirmed) {

            fetch("https://sistemacomercial-fv5g.onrender.com/atual/" + pvatual, {
              method: "PUT",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(edtobj)
            }).then((res) => {
              toast.success('Atualizado com sucesso !')
              idchange('')
              numerochange('')

            }).catch((err) => {
              toast.error('Erro ! :' + err.message)
            })

          } else if (result.isDenied) {
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

        </div>


      </div>

      <div className="container" style={{ display: 'flex', margin: '0 130px' }}>
     
           
            <form action='' onSubmit={editar} style={{ marginTop: '-900px' }}>
              <div>
                <label htmlFor='' style={{ margin: '0 115px', fontWeight: 'bold', fontFamily: 'arial', color: 'blue', fontSize:'20px' }}>Atualizar Venda:</label><br /><br />
                <label htmlFor='id' style={{margin: '0 115px', fontWeight: 'bold' }}>Id:</label>
                <label htmlFor='estoque' style={{margin: '0 -12px', fontWeight: 'bold' }}>Numero:</label>
            

              </div>
              <div>
                <input type='text' value={id} onChange={e => idchange(e.target.value)} style={{ width: 70, margin: '0 115px', fontWeight: 'bold', color: 'navy', fontSize:'20px' }} name='id' className="form-control rounded-0" />
                <input type='text' value={number} onChange={e => numerochange(e.target.value)} style={{  width: 100, margin: '0 233px', fontWeight: 'bold', color: 'navy', marginTop:'-42px', fontSize:'20px' }} name='numero' className="form-control rounded-0" />
                
              </div><br />
              
              <div className="mb-3">
                <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 115px' }} >Atualizar:</button>
                <Link to='/entradas/ultima' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 -75px', width: 100 }}>Voltar:</Link>
              </div>
              <ToastContainer />
            </form>
          </div>
             <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
                   <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
              </footer>
        </div>

   )
}

export default EditarVendaAtual