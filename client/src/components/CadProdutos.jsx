import React, {useState, useEffect} from 'react';//5=> Criação do arquivo de Cadastro de Usuarios:
import { Link, Outlet, useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadProdutos = () => {

  const {compracod} = useParams()

  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/compras/" + compracod).then((res) => {
        return res.json();
    }).then((resp) => {
      idchange(resp.id);
      nomechange(resp.nome);
      custochange(resp.custo);     
      qtdchange(resp.qtd);
       
    }).catch((err) => {
        console.log(err.message);
    })
}, []);

  
  const [id, idchange] = useState("") 
  const [nome, nomechange] = useState("") 
  const [custo, custochange] = useState("")
  const [catprod, catprodchange] = useState([])
  const [datacad, datacadchange] = useState("")
  const [qtd, qtdchange] = useState("")
  const [codigo, codigochange] = useState("")
  const [preco, precochange] = useState("")

  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/catproduto").then((res) => {

      return res.json()
  
      }).then((resp) => {
  
        catprodchange(resp)
  
      }).catch((err) => {
        console.log(err.message)
      }) 

  }, [])  

  const [values, setValues] = useState({
    id:''            
  })

  const isValidate = () => {   

    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"

    if(qtd === null || qtd === ''){
      isproceed = false
      //errormessage += 'Nome:' 
    }
    if(nome === null || nome === ''){
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }

    if(custo === null || custo === ''){
      document.getElementById('custo').style.borderColor = 'red';
      isproceed = false
     // errormessage += 'Email:' 
    }

    if(preco === null || preco === ''){
      document.getElementById('preco').style.borderColor = 'red';
      isproceed = false
     // errormessage += 'Email:' 
    }
  
    if(datacad === null || datacad === ''){
      isproceed = false
      document.getElementById('datacad').style.borderColor = 'red';
      //errormessage += 'Telefone:' 
    }
    if(codigo === null || codigo === ''){
      document.getElementById('codigo').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }
    if(document.getElementById('categoria').value === null || document.getElementById('categoria').value === ''){
      document.getElementById('categoria').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }
    if(!isproceed){
      toast.warning(errormessage)
  
    }
    
    
    return isproceed
   }

//console.log(data_cadastro);
function MudaCorCodigo(){
  document.getElementById('codigo').style.borderColor = 'Gainsboro'
}

function MudaCorData(){
  document.getElementById('datacad').style.borderColor = 'Gainsboro'
}

function MudaCorCusto(){
  document.getElementById('custo').style.borderColor = 'Gainsboro'
}

function MudaCorPreco(){
  document.getElementById('preco').style.borderColor = 'Gainsboro'
}

function MudaCorNome(){
  document.getElementById('nome').style.borderColor = 'Gainsboro'
}

 const cadastrar = (e) => { 

    e.preventDefault(); 
   
      
      const dataInput = datacad;
      const data = new Date(dataInput);
      const data_cadastro = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'}); 
      const categoria = document.getElementById('categoria').value;
      const preco = parseFloat(document.getElementById('preco').value).toFixed(2);   
     
      const cadobj = {qtd, nome, custo, categoria, data_cadastro, codigo, preco}
    //console.log(cadobj)  

    if(isValidate()){

         Swal.fire({
                        title: "Deseja salvar ?",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Salvar",
                        denyButtonText: `Não salvar`
                      }).then((result) => {
                                
                        if (result.isConfirmed) {

                            fetch("https://sistemacomercial-fv5g.onrender.com/produtos", {
                              method: "POST",
                              headers: {'content-type':'application/json'},
                              body: JSON.stringify(cadobj)
                              }).then((res) => {        
                               toast.success('Cadastrado com Sucesso !')      
                               qtdchange('')
                               nomechange('')
                               custochange('')   
                               datacadchange('') 
                               codigochange('') 
                               precochange('')       
       
                              }).catch((err) => {
                              toast.error('Erro ! :' +err.message)
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

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-1050px' }}>


        <div className='bg-white p-4 rounded'>
          <h5 style={{ marginLeft: '-100px' }}><center><strong>Cadastrar Produto:</strong></center></h5><br />

          <form action='' onSubmit={cadastrar}>
            <div className='d-flex'>
              <label htmlFor='estoque' style={{ fontWeight: 'bold', fontSize: '17px' }}>Estoque:</label>
              <label htmlFor='id' style={{ fontSize: '17px', fontWeight: 'bold', margin: '0 40px' }}>Id:</label>
              <label htmlFor='cod' style={{ fontSize: '17px', fontWeight: 'bold', margin: '0 20px' }}>Codigo de Venda:</label>

            </div>
            <div className='d-flex'>
              <input type='number' value={qtd} onChange={e => qtdchange(e.target.value)} style={{ fontSize: '17px', width: 80, fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='estoque' />
              <input type='number' value={id} onChange={e => idchange(e.target.value)} style={{ fontSize: '17px', width: 60, fontWeight: 'bold', color: 'navy', margin: '0 20px' }} className='form-control rounded-0' name='id' />
              <input type='text' onKeyUp={MudaCorCodigo} value={codigo} onChange={e => codigochange(e.target.value)} style={{ fontSize: '17px', width: 100, fontWeight: 'bold', color: 'navy', margin: '0 5px' }} className='form-control rounded-0' name='codigo' id='codigo' />


            </div><br />
            <div className='mb-3'>
              <label htmlFor='nome' style={{ fontSize: '17px', fontWeight: 'bold' }}>Nome:</label>
              <input type='text' onKeyUp={MudaCorNome} placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ fontSize: '17px', width: 400, fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' id='nome' />
            </div><br />
            <div className='d-flex'>
              <label htmlFor='custo' style={{ fontSize: '17px', fontWeight: 'bold' }}>Custo:</label>
              <label htmlFor='preco' style={{ fontSize: '17px', fontWeight: 'bold', margin: '0 50px' }}>Preço de Venda:</label>

            </div>
            <div className='d-flex'>

              <input type="decimal" onKeyUp={MudaCorCusto} value={custo} onChange={e => custochange(e.target.value)} style={{ fontSize: '17px', width: 70, fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='custo' id='custo' />
              <input type="decimal" onKeyUp={MudaCorPreco} value={preco} onChange={e => precochange(e.target.value)} style={{ fontSize: '17px', width: 180, fontWeight: 'bold', color: 'navy', margin: '0 30px' }} placeholder='Entre com o preço:' className='form-control rounded-0' name='preco' id='preco' />

            </div><br />
            <div className='mb-3'>
              <label htmlFor='categoria' className='form-label' style={{ fontSize: '17px', fontWeight: 'bold' }}>
                Categoria:
              </label>
              <select style={{ fontSize: '17px', width: 280, fontWeight: 'bold', color: 'navy' }} name='catprod' id='categoria' className='form-select rounded-0' onChange={(e) => setValues({ ...values, id: e.target.value })}>
                <option value=""></option>
                {catprod.map(val => {
                  return <option value={val.nome}>{val.nome}</option>
                })}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='datacadastro' style={{ fontSize: '17px', fontWeight: 'bold' }}>Data de Cadastro:</label>
              <input type='date' onKeyUp={MudaCorData} onSelect={MudaCorData} value={datacad} onChange={e => datacadchange(e.target.value)} style={{ fontSize: '17px', width: 180, fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='datacad' id='datacad' />
            </div><br />
            <div className='mb-3'>
              <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, fontSize: '16px' }} >Cadastrar:</button>
              <Link to='/produtos' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'SlateBlue', fontSize: '16px', width: 100 }}>Produtos:</Link>
              <Link to='/compras' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', fontSize: '16px', width: 100 }}>Voltar:</Link>
            </div>
            <ToastContainer />
          </form>
        </div>


      </div>


      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>


    </div>

  )
}

export default CadProdutos