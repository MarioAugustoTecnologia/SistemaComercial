import React, { useState } from 'react';//5=> Criação do arquivo de Cadastro de Usuarios:
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadClientes = () => {

  const [nome, nomechange] = useState("")
  const [email, emailchange] = useState("")
  const [fone, fonechange] = useState("")
  const [endereco, enderecochange] = useState("")
  const [bairro, bairrochange] = useState("")
  const [cpf, cpfchange] = useState("")


  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"
    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red'
      isproceed = false
      //errormessage += 'Nome:' 
    }

    if (email === null || email === '') {
      document.getElementById('email').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (fone === null || fone === '') {
      document.getElementById('fone').style.borderColor = 'red'
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (bairro === null || bairro === '') {
      document.getElementById('bairro').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Categoria:' 
    }
    if (endereco === null || endereco === '') {
      document.getElementById('endereco').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Salario:' 
    }
    if (cpf === null || cpf === '') {
      document.getElementById('cpf').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Salario:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)

    } else {
      if (/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

      } else {
        isproceed = false;
        toast.warning('Entre com um email valido !')
      }
    }
    return isproceed
  }


  function MostraNome() {
    document.getElementById('nome').style.borderColor = 'GainsBoro'
  }
  function MostraEmail() {
    document.getElementById('email').style.borderColor = 'GainsBoro'
  }
  function MostraFone() {
    document.getElementById('fone').style.borderColor = 'GainsBoro'
  }
  function MostraEndereco() {
    document.getElementById('endereco').style.borderColor = 'GainsBoro'
  }
  function MostraBairro() {
    document.getElementById('bairro').style.borderColor = 'GainsBoro'
  }
  function MostraCpf() {
    document.getElementById('cpf').style.borderColor = 'GainsBoro'
  }

  const data = new Date();
  const data_cad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  //console.log(datanascimento);

  const cadastrar = (e) => {

    e.preventDefault();

    const cadobj = { nome, email, fone, data_cad, bairro, endereco, cpf }

    if (isValidate()) {

      Swal.fire({
        title: "Deseja salvar ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: `Não salvar`
      }).then((result) => {

        if (result.isConfirmed) {

          fetch("https://sistemacomercial-fv5g.onrender.com/clientes", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cadobj)
          }).then((res) => {
            toast.success('Cadastrado com sucesso !')
            nomechange('')
            emailchange('')
            fonechange('')
            bairrochange('')
            enderecochange('')
            cpfchange('')

          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })
        }
        else if (result.isDenied) {
          Swal.fire("Nada salvo", "", "info");
        }
      })
    }
  }

  const logout = () => {
    localStorage.clear()
    console.clear()

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

          <h5><center><strong>Cadastrar Cliente:</strong></center></h5><br />
          <div className='mb-3'>
            <label htmlFor='id' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Nome:</label>
            <input type='text' onKeyUp={MostraNome} placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ fontSize: '17px', width: 400, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' id='nome' />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Email:</label>
            <input type="email" onKeyUp={MostraEmail} id='email' value={email} onChange={e => emailchange(e.target.value)} style={{ fontSize: '17px', width: 330, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} placeholder='Entre com o email:' className='form-control rounded-0' name='email' />
          </div>
          <div className='mb-3'>
            <label htmlFor='fone' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Telefone:</label>
            <input type='text' onKeyUp={MostraFone} id='fone' value={fone} onChange={e => fonechange(e.target.value)} style={{ fontSize: '17px', width: 225, margin: '0 115px', color: 'navy', fontWeight: 'bold' }} placeholder='Entre com o telefone:' className='form-control rounded-0' name='fone' />
          </div>
          <div className='mb-3'>
            <label htmlFor='endereco' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Endereço:</label>
            <input type='text' onKeyUp={MostraEndereco} id='endereco' placeholder='Entre com o endereço:' value={endereco} onChange={e => enderecochange(e.target.value)} style={{ fontSize: '17px', width: 400, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='endereco' />
          </div>
          <div className='mb-3'>
            <label htmlFor='bairro' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Bairro:</label>
            <input type='text' onKeyUp={MostraBairro} placeholder='Entre com o bairro:' id='bairro' value={bairro} onChange={e => bairrochange(e.target.value)} style={{ fontSize: '17px', width: 225, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='bairro' />
          </div>
          <div className='mb-3'>
            <label htmlFor='cpf' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Cpf:</label>
            <input type='text' onKeyUp={MostraCpf} placeholder='Entre com o cpf ' id='cpf' value={cpf} onChange={e => cpfchange(e.target.value)} style={{ fontSize: '17px', width: 225, margin: '0 115px', color: 'navy', fontWeight: 'bold' }} className='form-control rounded-0' name='cpf' />
          </div>
          <div className='mb-3'>
            <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 115px', fontSize: '15px' }} >Cadastrar:</button>
            <Link to='/clientes' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 -90px', fontSize: '15px', width: 100 }}>Voltar:</Link>
          </div>
          <ToastContainer />
        </form>
      </div>
      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
        <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
      </footer>
    </div>

  )
}

export default CadClientes