import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadFornecedor = () => {

  const [nome, nomechange] = useState("")
  const [endereco, enderecochange] = useState("")
  const [numero, numerochange] = useState("")
  const [comp, compchange] = useState("")
  const [cep, cepchange] = useState("")
  const [cidade, cidadechange] = useState("")
  const [email, emailchange] = useState("")
  const [fone, fonechange] = useState("")
  const [catforn, catfornchange] = useState([])



  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/catfornecedor").then((res) => {

      return res.json()

    }).then((resp) => {

      catfornchange(resp)

    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  const [values, setValues] = useState({
    id: ''
  })



  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"



    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome:' 
    }
    if (endereco === null || endereco === '') {
      document.getElementById('endereco').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (cep === null || cep === '') {
      document.getElementById('cep').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }
    if (cidade === null || cidade === '') {
      document.getElementById('cidade').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Senha:' 
    }

    if (document.getElementById('catforn').value === null || document.getElementById('catforn').value === '') {
      document.getElementById('catforn').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Senha:' 
    }


    if (!isproceed) {
      toast.warning(errormessage)

    } else {
      if (/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

      } else {
        isproceed = false;
        toast.warning('Entre com um email valido !')
        document.getElementById('email').style.borderColor = 'red';

      }
    }
    if (isproceed) {

      if (/^[a-zA-Z\u00C0-\u00FF]+/i.test(nome)) {

      } else {
        isproceed = false;
        toast.warning('Entre com um nome valido !')
        document.getElementById('nome').style.borderColor = 'red';

      }

    }
    if (isproceed) {

      if (/^[a-zA-Z-/0-9\u00C0-\u00FF ]+/i.test(endereco)) {

      } else {
        isproceed = false;
        toast.warning('Entre com um endereço valido !')
        document.getElementById('endereco').style.borderColor = 'red';

      }

    }
    if (isproceed) {

      if (/^[0-9-]+$/.test(cep)) {

      } else {
        isproceed = false;
        toast.warning('Entre com um cep valido !')
        document.getElementById('cep').style.borderColor = 'red';

      }

    }
    if (isproceed) {

      if (/^[a-zA-Z\u00C0-\u00FF ]+/i.test(cidade)) {

      } else {
        isproceed = false;
        toast.warning('Entre com uma cidade valida !')
        document.getElementById('cidade').style.borderColor = 'red';

      }

    }
    if (isproceed) {

      if (/^[0-9-() ]+$/.test(fone)) {

      } else {
        isproceed = false;
        toast.warning('Entre com um telefone valido !')
        document.getElementById('fone').style.borderColor = 'red';

      }

    }
    if (isproceed) {

      if (numero !== '') {

        if (/^[0-9]+$/.test(numero)) {

        } else {
          isproceed = false;
          toast.warning('Entre com um numero valido !')
          document.getElementById('numero').style.borderColor = 'red';

        }

      }


    }
    if (isproceed) {

      if (comp !== '') {

        if (/^[0-9- a-zA-Z]+$/.test(comp)) {

        } else {
          isproceed = false;
          toast.warning('Entre com um complemento valido !')
          document.getElementById('comp').style.borderColor = 'red';

        }


      }



    }
    return isproceed


  }


  function mudacor() {
    //Ação de muda cor
    document.getElementById('nome').style.borderColor = 'Gainsboro';

  }
  function mudacorEnd() {

    document.getElementById('endereco').style.borderColor = 'Gainsboro';

  }
  function mudacorCep() {

    document.getElementById('cep').style.borderColor = 'Gainsboro';

  }
  function mudacorCidade() {

    document.getElementById('cidade').style.borderColor = 'Gainsboro';

  }

  function mudacorEmail() {

    document.getElementById('email').style.borderColor = 'Gainsboro';

  }

  function mudacorFone() {

    document.getElementById('fone').style.borderColor = 'Gainsboro';

  }
  function mudacorNumero() {

    document.getElementById('numero').style.borderColor = 'Gainsboro';
    document.getElementById('comp').style.borderColor = 'Gainsboro';
  }
  function mudacorComp() {

    document.getElementById('comp').style.borderColor = 'Gainsboro';
    document.getElementById('numero').style.borderColor = 'Gainsboro';

  }

  function mudacorCat() {

    document.getElementById('catforn').style.borderColor = 'Gainsboro';


  }

  const cadastrar = (e) => {

    e.preventDefault();

    if (isValidate()) {

      if (numero === '' && comp === '') {
        toast.warning('Campos numero e complemento vazio !')
        document.getElementById('numero').style.borderColor = 'red'
        document.getElementById('comp').style.borderColor = 'red'

      } else if (numero === '' || numero === null) {

        Swal.fire({
          title: "Deseja salvar ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          denyButtonText: `Não salvar`
        }).then((result) => {

          if (result.isConfirmed) {

            const catforn = document.getElementById('catforn').value;
            const data = new Date();
            const datacad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            const cadobj = { nome, endereco, comp, cep, cidade, email, fone, datacad, catforn }

            fetch("https://sistemacomercial-fv5g.onrender.com/fornecedor", {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(cadobj)
            }).then((res) => {
              toast.success('Cadastrado com sucesso !')
              nomechange('');
              enderecochange('');
              compchange('');
              cepchange('');
              cidadechange('');
              emailchange('');
              fonechange('');
              //window.location.reload();
              document.getElementById('nome').style.borderColor = 'Gainsboro';
              document.getElementById('endereco').style.borderColor = 'Gainsboro';
              document.getElementById('cep').style.borderColor = 'Gainsboro';
              document.getElementById('cidade').style.borderColor = 'Gainsboro';
              document.getElementById('email').style.borderColor = 'Gainsboro';
              document.getElementById('fone').style.borderColor = 'Gainsboro';
              document.getElementById('comp').style.borderColor = 'Gainsboro';

            }).catch((err) => {
              toast.error('Erro ! :' + err.message)
            })


          } else if (result.isDenied) {
            Swal.fire("Nada salvo", "", "info");
          }
        });

      } else {

        Swal.fire({
          title: "Deseja salvar ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          denyButtonText: `Não salvar`
        }).then((result) => {

          if (result.isConfirmed) {

            const catforn = document.getElementById('catforn').value;
            const data = new Date();
            const datacad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            const cadobj = { nome, endereco, numero, cep, cidade, email, fone, datacad, catforn }

            fetch("https://sistemacomercial-fv5g.onrender.com/fornecedor", {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(cadobj)
            }).then((res) => {
              toast.success('Cadastrado com sucesso !')
              nomechange('');
              enderecochange('');
              numerochange('');
              cepchange('');
              cidadechange('');
              emailchange('');
              fonechange('');

              document.getElementById('nome').style.borderColor = 'Gainsboro';
              document.getElementById('endereco').style.borderColor = 'Gainsboro';
              document.getElementById('cep').style.borderColor = 'Gainsboro';
              document.getElementById('cidade').style.borderColor = 'Gainsboro';
              document.getElementById('email').style.borderColor = 'Gainsboro';
              document.getElementById('fone').style.borderColor = 'Gainsboro';
              document.getElementById('numero').style.borderColor = 'Gainsboro';

            }).catch((err) => {
              toast.error('Erro ! :' + err.message)
            })

          } else if (result.isDenied) {
            Swal.fire("Nada salvo", "", "info");
          }
        })

      }

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

          <h5><center><strong>Cadastrar Fornecedor:</strong></center></h5><br />

          <div className='mb-3'>
            <label htmlFor='nome' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Nome:</label>
            <input type='text' placeholder='Entre com o nome' value={nome} onChange={e => nomechange(e.target.value)} onKeyUp={mudacor} style={{ fontSize: '17px', width: 400, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' id='nome' />

          </div>

          <div className='mb-3'>
            <label htmlFor='endereco' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Endereço:</label>
            <input type="text" value={endereco} onChange={e => enderecochange(e.target.value)} style={{ fontSize: '17px', width: 440, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} onKeyUp={mudacorEnd} placeholder='Entre com o endereço:' className='form-control rounded-0' name='endereco' id='endereco' />

          </div>
          <div className='mb-3'>
            <label htmlFor='numero' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Numero:</label>
            <label htmlFor='categoria' style={{ fontSize: '17px', margin: '0 -52px', fontWeight: 'bold' }}>Categoria:</label>
            <input type='number' value={numero} onChange={e => numerochange(e.target.value)} style={{ width: 100, margin: '0 115px', fontSize: '17px', fontWeight: 'bold', color: 'navy' }} onKeyUp={mudacorNumero} className='form-control rounded-0' name='numero' id='numero' />
            <select onClick={mudacorCat} style={{ width: 200, margin: '0 250px', marginTop: '-42px', fontSize: '17px', fontWeight: 'bold', color: 'navy' }} className='form-select' name='catforn' id='catforn' onChange={(e) => setValues({ ...values, id: e.target.value })} >
              <option value=""></option>
              {catforn.map(val => {
                return <option value={val.nome}>{val.nome}</option>
              })}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='comp' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Complemento:</label>
            <input type='text' value={comp} onChange={e => compchange(e.target.value)} style={{ fontSize: '17px', width: 120, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} onKeyUp={mudacorComp} className='form-control rounded-0' name='comp' id='comp' />

          </div>
          <div className='mb-3'>
            <label htmlFor='cep' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Cep:</label>
            <input type='text' placeholder='Entre com o cep:' value={cep} onChange={e => cepchange(e.target.value)} onKeyUp={mudacorCep} style={{ fontSize: '17px', width: 225, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='cep' id='cep' />

          </div>
          <div className='mb-3'>
            <label htmlFor='cidade' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Cidade:</label>
            <input type='text' placeholder='Entre com a cidade:' value={cidade} onChange={e => cidadechange(e.target.value)} onKeyUp={mudacorCidade} style={{ fontSize: '17px', width: 350, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='cidade' id='cidade' />

          </div>
          <div className='mb-3'>
            <label htmlFor='email' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Email:</label>
            <input type='email' placeholder='Entre com o email:' value={email} onChange={e => emailchange(e.target.value)} style={{ fontSize: '17px', width: 350, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} onKeyUp={mudacorEmail} className='form-control rounded-0' name='email' id='email' />

          </div>
          <div className='mb-3'>
            <label htmlFor='fone' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Telefone:</label>
            <input type='text' placeholder='Entre com o telefone:' value={fone} onChange={e => fonechange(e.target.value)} onKeyUp={mudacorFone} style={{ fontSize: '17px', width: 225, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='fone' id='fone' />

          </div><br />
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

export default CadFornecedor
