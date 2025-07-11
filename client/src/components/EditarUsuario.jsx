import React, {useEffect, useState } from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import  bcrypt from 'bcryptjs';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EditarUsuario = () => {


    const {usuariocod} = useParams()

    //const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("https://sistemacomercialserver.onrender.com/usuarios/" + usuariocod).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            codchange(resp.cod);
            emailchange(resp.email);       
            fonechange(resp.fone);
            data_nascimentochange(resp.datanascimento);
            categoriachange(resp.categoria);
          
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);



    const [id, idchange] = useState("") //=> Nome de usuario obrigatório campo (id)
    const [cod, codchange] = useState("") //=> Representa o registro, qual é o usuario.
    const [email, emailchange] = useState("")
    const [senha, senhachange] = useState("")
    const [fone, fonechange] = useState("")
    const [data_nascimento, data_nascimentochange] = useState("")
    const [categoria, categoriachange] = useState("")
   
  
    //var data = new Date();
  
  
    const isValidate = () => {
      let isproceed = true
      let errormessage = "Campos não podem estar vazio  !"        
         

      if(id === null || id === ''){
        document.getElementById('id').style.borderColor = 'red'
        isproceed = false
        //errormessage += 'Nome:' 
      }
      if(cod === null || cod === ''){
         document.getElementById('cod').style.borderColor = 'red'
         isproceed = false
        //errormessage += 'Nome Completo:' 
      }
      if(email === null || email === ''){
         document.getElementById('email').style.borderColor = 'red'
         isproceed = false
       // errormessage += 'Email:' 
      }
      if(senha === null || senha === ''){
         document.getElementById('senha').style.borderColor = 'red'
         isproceed = false
       // errormessage += 'Senha:' 
      }

      if(data_nascimento === null || data_nascimento === ''){
         document.getElementById('data_nasc').style.borderColor = 'red'
         isproceed = false
       // errormessage += 'Data de Nascimento:' 
      }
      if(categoria === null || categoria === ''){
         document.getElementById('categoria').style.borderColor = 'red'
        isproceed = false
       // errormessage += 'Categoria:' 
      }
  
      if(!isproceed){
        toast.warning(errormessage)
    
      }else{
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
  
        }else{
            isproceed = false;
            toast.warning('Entre com um email valido !')
        }
    }
      return isproceed
     }  

//console.log(datanascimento);


   const editar = (e) => {    
         
           e.preventDefault();
            const password = senha;
            const hashedPassword = bcrypt.hashSync(password, 10)
            const user = id;

            //window.localStorage.clear('Login', JSON.stringify({user, hashedPassword})) 
             window.localStorage.setItem('Login', JSON.stringify({user, hashedPassword}))
             //console.log(hashedPassword)
             const dataInput = data_nascimento;
             const data = new Date(dataInput);
             const datanascimento = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
             
                if (fone !== '' || fone !== null)
             {              

              if(isValidate()){ 

                const edtobj = {id, cod, email, hashedPassword, fone, datanascimento, categoria }

                Swal.fire({
                  title: "Deseja salvar ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Salvar",
                  denyButtonText: `Não Salvar`
                }).then((result) => {
                 
                  if (result.isConfirmed) {
                    fetch("https://sistemacomercialserver.onrender.com/usuarios/" + usuariocod, {
                      method: "PUT",
                      headers: {'content-type':'application/json'},
                      body: JSON.stringify(edtobj)
                      }).then((res) => {        
                       toast.success('Atualizado com sucesso !')
                       idchange('');
                       codchange('');
                       emailchange('');
                       senhachange('');
                       fonechange('');
                       data_nascimentochange('');
                       categoriachange('');        
                   
           
                 }).catch((err) => {
                   toast.error('Erro ! :' +err.message)
                 })       
                    //Swal.fire("Salvo!", "", "success");
                  } else if (result.isDenied) {
                    Swal.fire("Nada salvo", "", "info");
                  }
                }); 
             
          
     }

    }else{

        
              //console.log(cadobj)
              if(isValidate()){

                const edtobj = {id, cod, email, hashedPassword, datanascimento, categoria }
                
                Swal.fire({
                  title: "Deseja Salvar ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Salvar",
                  denyButtonText: `Não Salvar`
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {

                    fetch("https://sistemacomercialserver.onrender.com/usuarios/" + usuariocod, {
                      method: "PUT",
                      headers: {'content-type':'application/json'},
                      body: JSON.stringify(edtobj)
                      }).then((res) => {        
                       toast.success('Atualizado com sucesso !')
                       idchange('');
                       codchange('');
                       emailchange('');
                       senhachange('');           
                       data_nascimentochange('');
                       categoriachange('');          
                   
           
                 }).catch((err) => {
                   toast.error('Erro ! :' +err.message)
                 })       

                   // Swal.fire("Salvo!", "", "success");
                  } else if (result.isDenied) {
                    Swal.fire("Nada Salvo!", "", "info");
                  }
                }); 

             
          
     }

    }
    
           
  } 
  
  
  function MostraNome(){
    document.getElementById('id').style.borderColor = 'GainsBoro';
  }
  function MostraCod(){
    document.getElementById('cod').style.borderColor = 'GainsBoro';
  }
  function MostraEmail(){
    document.getElementById('email').style.borderColor = 'GainsBoro';
  }
  function MostraSenha(){
    document.getElementById('senha').style.borderColor = 'GainsBoro';
  }




  const logout = () => {
    localStorage.clear()
    console.clear();
    
  }
    

  return (
    <div className="container-fluid" style={{fontFamily:'arial'}}>
       <div className="row flex-nowrap">
           <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary" style={{fontFamily:'arial', fontSize:'19px'}}>
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                 <Link
                 to=""
                 className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                 >
                  <span className='fs-5 fw-bolder d-none d-sm-inline'>
                  Opções:
                </span>
                </Link>
                <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="w-100">
                  <Link
                    to="/home"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Painel:</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/usuarios"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-people ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
                     Produtos e Serviços:
                  </span>
                </Link>
              </li>
               <li className="w-100">
                <Link
                  to="/transportes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi bi-truck-flatbed" style={{margin:'0 8px'}}></i>
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
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
                  <span className="ms-2 d-none d-sm-inline">
                    Orçamentos:
                  </span>
                </Link>
              </li>          
              
                 <li className="w-100" onClick={logout}>
                  <Link to='/'
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-power ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                  </Link>
                 </li>
              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow text-white" style={{backgroundColor:'blue', fontFamily:'arial'}}>
                <h4><strong>Sistema de Gestão Comercial</strong></h4>
            </div>
              <Outlet />
            
    <br/>       
    <div className='d-flex justify-content-center align-items-center vh-100'>       
        <div className='bg-white p-4 rounded w-42 border'>
        <h4><center><strong>Editar Usuario:</strong></center></h4><br /> 
           <form action='' onSubmit={editar}>
              <div className='mb-3'>      
               <label htmlFor='id' style={{fontSize:'20px', margin:'0 115px', fontWeight:'bold'}}>Nome:</label>
               <input onKeyUp={MostraNome} type='text' value={id} onChange={e => idchange(e.target.value)} style={{fontWeight:'bold', color:'navy', fontSize:'20px', width:150, margin:'0 115px'}} className='form-control rounded-0' name='id' id="id"/>
                 
               </div>
               <div className='mb-3'>      
                 <label htmlFor='cod' style={{fontSize:'20px', margin:'0 115px', fontWeight:'bold'}}>Cod:</label>
                 <input type='number' onKeyUp={MostraCod} value={cod} onChange={e => codchange(e.target.value)} style={{fontWeight:'bold', color:'navy', fontSize:'20px', width:85, margin:'0 115px'}} className='form-control rounded-0' name='cod' id="cod"/>
                 
               </div>
           
               <div className='mb-3'>           
                 <label htmlFor='email' style={{fontSize:'20px', margin:'0 115px', fontWeight:'bold'}}>Email:</label>
                 <input type="email" onKeyUp={MostraEmail} value={email} onChange={e => emailchange(e.target.value)} style={{fontSize:'20px', width:330, margin:'0 115px', fontWeight:'bold', color:'navy'}} placeholder='Entre com o email:' className='form-control rounded-0' name='email' id="email"/>
      
               </div>
               <div className='mb-3'>           
               <label htmlFor='senha' style={{fontSize:'20px', margin:'0 115px', fontWeight:'bold'}}>Senha:</label>
               <input type='password' onKeyUp={MostraSenha} value={senha} onChange={e => senhachange(e.target.value)} style={{width:300, margin:'0 115px', fontSize:'20px', fontWeight:'bold', color:'navy'}} placeholder='Entre com a senha:' className='form-control rounded-0' name='senha' id="senha"/> 
          
               </div>
               <div className='mb-3'>           
               <label htmlFor='fone' style={{fontSize:'20px', margin:'0 115px', fontWeight:'bold'}}>Telefone:</label>
               <input type='text' value={fone} onChange={e => fonechange(e.target.value)} style={{fontSize:'20px', width:225, margin:'0 115px', fontWeight:'bold', color:'navy'}} placeholder='Entre com o telefone:' className='form-control rounded-0' name='fone'/>
                  
               </div>
               <div className='mb-3'>           
               <label htmlFor='data' style={{fontSize:'20px', margin:'0 115px', fontWeight:'bold'}}>Data de Nascimento:</label>
               <input type='date' value={data_nascimento} onChange={e => data_nascimentochange(e.target.value)} style={{fontSize:'20px', width:225, margin:'0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='data_nascimento' id="data_nasc"/> 
              
                </div>
                <div className='mb-3'>
                  <label htmlFor='categoria' className='form-label' style={{fontSize:'20px', margin:'0 115px', fontWeight:'bold'}}>
                    Categoria: 
                  </label>
                    <select style={{fontSize:'20px', width:225, margin:'0 115px', fontWeight:'bold', color:'navy'}} name='categoria' id='categoria' className='form-select' value={categoria} onChange={e => categoriachange(e.target.value)}>
                      <option value=""></option>    
                      <option value="Administrador">Administrador</option>
                       <option value="Programador">Programador</option>
                       <option value="Desenvolvedor">Desenvolvedor</option> 
                     </select> 

                </div>   
                
         
              <div className='mb-3'>
                  <button type='submit' className='btn btn-success border rounded-0' style={{width:100, margin:'0 115px', fontSize:'16px'}} >Atualizar:</button>
                  <Link to='/usuarios'  className="btn border rounded-0" style={{color: 'white', backgroundColor:'orange', margin: '0 -90px', fontSize:'16px', width:100}}>Voltar:</Link>
              </div> 
              <ToastContainer/>    
           </form>
       </div>  
      </div>
  </div>  
                              
</div>           
</div>


  )
}

export default EditarUsuario