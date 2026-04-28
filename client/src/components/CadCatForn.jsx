import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadCatForn = () => {


  const [nome, nomechange] = useState("")

  const isValidate = () => {

    let isproceed = true
    let errormessage = "Campo não pode estar vazio  !"

    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)

    }

    return isproceed
  }

  function Nome() {
    document.getElementById('nome').style.borderColor = 'Gainsboro';
  }

  //console.log(data_cadastro);

  const cadastrar = (e) => {

    e.preventDefault();

    const cadobj = { nome }
    //console.log(cadobj)  

    if (isValidate()) {

      Swal.fire({
        title: "Deseja salvar ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: `Não salvar`
      }).then((result) => {

        if (result.isConfirmed) {

          fetch("https://sistemacomercial-fv5g.onrender.com/catfornecedor", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cadobj)
          }).then((res) => {
            toast.success('Cadastrado com Sucesso !')
            nomechange('')

          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })


        } else if (result.isDenied) {
          Swal.fire("Nada salvo", "", "info");
        }
      });



    }
  }

  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  return (
    <div className="main-wrapper">

      <nav class="sidebar bg-secondary" style={{ width: '220px', height: 1000 }}>
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

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-950px' }}>


        <form action='' onSubmit={cadastrar}>
          <h5><center><strong>Cadastrar Categoria:</strong></center></h5><br />
          <div className='mb-3'>
            <label htmlFor='nome' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Nome:</label>
            <input type='text' onKeyUp={Nome} placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ fontSize: '17px', width: 250, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' id='nome' />
          </div>
          <div className='mb-3'>
            <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 115px', fontSize: '15px' }} >Cadastrar:</button>
            <Link to='/fornecedores' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 -90px', fontSize: '15px', width: 100 }}>Voltar:</Link>
          </div>
          <ToastContainer />
        </form>

      </div>


      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>
    </div>




  )
}

export default CadCatForn