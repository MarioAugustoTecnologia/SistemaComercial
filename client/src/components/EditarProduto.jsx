import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';

const EditarProduto = () => {

  const { produtocod } = useParams()

  //const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + produtocod).then((res) => {
      return res.json();
    }).then((resp) => {
      idchange(resp.id);
      nomechange(resp.nome);
      precochange(resp.preco);
      custochange(resp.custo)
      qtdchange(resp.qtd);
      codchange(resp.codigo);

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);


  const [id, idchange] = useState("")
  const [nome, nomechange] = useState("") //=> Representa o registro, qual é o usuario.
  const [preco, precochange] = useState("")
  const [categoria, categoriachange] = useState([])
  const [datacad, datacadchange] = useState("")
  const [qtdcur, qtdchange] = useState("")
  const [entrada, entradachange] = useState("")
  const [codigo, codchange] = useState("")
  const [custo, custochange] = useState("")

  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/catproduto").then((res) => {

      return res.json()

    }).then((resp) => {

      categoriachange(resp)

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
    if (id === null || id === '') {
      isproceed = false
      //errormessage += 'Nome:' 
    }
    if (qtdcur === null || qtdcur === '') {
      isproceed = false
      //errormessage += 'Nome:' 
    }
    if (nome === null || nome === '') {
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (preco === null || preco === '') {
      document.getElementById('preco').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (custo === null || custo === '') {
      document.getElementById('custo').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (datacad === null || datacad === '') {
      document.getElementById('datacad').style.borderColor = 'red';
      isproceed = false

      // errormessage += 'Salario:' 
    }
    if (document.getElementById('categoria').value === null || document.getElementById('categoria').value === '') {
      document.getElementById('categoria').style.borderColor = 'red';
      isproceed = false

      // errormessage += 'Salario:' 
    }
    if (codigo === null || codigo === '') {
      isproceed = false
      // errormessage += 'Salario:' 
    }
    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }

  function MudacorPreco() {
    document.getElementById('preco').style.borderColor = 'gainsboro';
  }

  function MudacorCusto() {
    document.getElementById('custo').style.borderColor = 'gainsboro';
  }

  function MudacorDataCad() {
    document.getElementById('datacad').style.borderColor = 'gainsboro';
  }

  function MudacorCat() {
    document.getElementById('categoria').style.borderColor = 'gainsboro';
  }


  const editar = (e) => {

    e.preventDefault();

    if (entrada === '' || entrada === null) {

      const dataInput = datacad;
      const data = new Date(dataInput);
      const data_cadastro = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
      const qtd = qtdcur;
      const categoria = document.getElementById('categoria').value;
      const edtobj = { id, qtd, nome, preco, custo, categoria, data_cadastro, codigo}
      //console.log(cadobj)  

      if (isValidate()) {

        Swal.fire({
          title: "Deseja salvar ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          denyButtonText: `Não Salvar`
        }).then((result) => {

          if (result.isConfirmed) {

            fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + produtocod, {
              method: "PUT",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(edtobj)
            }).then((res) => {
              toast.success('Atualizado com sucesso !')
              idchange('');
              qtdchange('');
              nomechange('');
              precochange('');
              datacadchange('');
              codchange('');
              custochange('');

            }).catch((err) => {
              toast.error('Erro ! :' + err.message)
            })

          } else if (result.isDenied) {
            Swal.fire("Nada salvo", "", "info");
          }
        })
      }

    } else {

      const dataInput = datacad;
      const data = new Date(dataInput);
      const data_cadastro = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
      let total = parseInt(qtdcur) + parseInt(entrada);
      const qtd = total;
      console.log(qtd);
      const catproduto = document.getElementById('categoria').value;
      const edtobj = { id, qtd, nome, preco, custo, catproduto, data_cadastro, codigo }
      //console.log(cadobj)  

      if (isValidate()) {

        Swal.fire({
          title: "Deseja salvar ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          denyButtonText: `Não Salvar`
        }).then((result) => {

          if (result.isConfirmed) {

            fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + produtocod, {
              method: "PUT",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(edtobj)
            }).then((res) => {
              toast.success('Atualizado com Sucesso !')
              idchange('');
              qtdchange('')
              nomechange('')
              precochange('')
              custochange('')
              datacadchange('')
              entradachange('')
              codchange('')
    
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
                <label htmlFor='' style={{ margin: '0 115px', fontWeight: 'bold', fontFamily: 'arial', color: 'blue', fontSize:'20px' }}>Editar Produto:</label><br /><br />
                <label htmlFor='id' style={{margin: '0 115px', fontWeight: 'bold' }}>Id:</label>
                <label htmlFor='estoque' style={{margin: '0 -12px', fontWeight: 'bold' }}>Estoque:</label>
            

              </div>
              <div>
                <input type='number' value={id} onChange={e => idchange(e.target.value)} style={{ width: 70, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} name='id' />
                <input type='number' value={qtdcur} onChange={e => qtdchange(e.target.value)} style={{  width: 100, margin: '0 -60px', fontWeight: 'bold', color: 'navy' }} name='estoque' />
                
              </div><br />
              <div className="mb3">
                 <label htmlFor='entrada' style={{ margin: '0 115px', fontWeight: 'bold' }}>Entrada:</label>
                 <input type='number' value={entrada} onChange={e => entradachange(e.target.value)} style={{  width: 80, margin: '0 115px', fontWeight: 'bold', color: 'navy'}} name='entrada' className="form-control rounded-0" />
              </div><br />
              <div className="mb-3">
                <label htmlFor='cod' style={{  margin: '0 115px', fontWeight: 'bold' }}>Codigo de Venda:</label>
                <input type='text' placeholder='Entre com o codigo:' value={codigo} onChange={e => codchange(e.target.value)} style={{ width: 80, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='codigo' />
              </div>
              <div className='mb-3'>
                <label htmlFor='nome' style={{ margin: '0 115px', fontWeight: 'bold' }}>Nome:</label>
                <input type='text' placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ width: 300, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' />
              </div>
              <div className='mb-3'>
                <label htmlFor='preco' style={{ margin: '0 115px', fontWeight: 'bold' }}>Preço:</label>
                <input type="decimal" onKeyUp={MudacorPreco} value={preco} onChange={e => precochange(e.target.value)} style={{ width: 150, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} placeholder='Entre com o preço:' className='form-control rounded-0' name='preco' id="preco" />

              </div>
              <div className='mb-3'>
                <label htmlFor='custo' style={{  margin: '0 115px', fontWeight: 'bold' }}>Custo:</label>
                <input type="decimal" onKeyUp={MudacorCusto} value={custo} onChange={e => custochange(e.target.value)} style={{ width: 150, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} placeholder='Entre com o custo:' className='form-control rounded-0' name='custo' id="custo" />
              </div>

              <div className='mb-3'>
                <label htmlFor='categoria' className='form-label' style={{ margin: '0 115px', fontWeight: 'bold' }}>
                  Categoria:
                </label>
                <select onClick={MudacorCat} style={{  width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} name='categoria' id='categoria' className='form-select' onChange={(e) => setValues({ ...values, id: e.target.value })}>
                  <option value=""></option>
                  {categoria.map(val => {
                    return <option value={val.nome}>{val.nome}</option>
                  })}

                </select>
              </div>

              <div className='mb-3'>
                <label htmlFor='datacadastro' style={{  margin: '0 115px', fontWeight: 'bold' }}>Data de Cadastro:</label>
                <input type='date' onSelect={MudacorDataCad} value={datacad} onChange={e => datacadchange(e.target.value)} style={{ width: 170, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='datacad' id="datacad" />

              </div><br />
              <div className="mb-3">
                <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 115px' }} >Atualizar:</button>
                <Link to='/produtos' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 -75px', width: 100 }}>Voltar:</Link>
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

export default EditarProduto