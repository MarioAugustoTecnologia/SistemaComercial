import React, { useState } from 'react';//5=> Criação do arquivo de Cadastro de Usuarios:
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadUsuarios = () => {


  const [nome, nomechange] = useState("") //=> Nome de usuario obrigatório campo (id) 
  const [senha, senhachange] = useState("");
  const [categoria, categoriachange] = useState("")

  //var data = new Date();

  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"
    if(nome === null || nome === ''){
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome:' 
    }
   
    
    if(senha === null || senha === ''){
      document.getElementById('senha').style.borderColor = 'red';
      isproceed = false
     // errormessage += 'Senha:' 
    }
 
   
    if(categoria === null || categoria === ''){
      document.getElementById('categoria').style.borderColor = 'red';
      isproceed = false
     // errormessage += 'Categoria:' 
    }

    if(!isproceed){
      toast.warning(errormessage)
  
    }else{
      if(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

      }else{
          isproceed = false;
          toast.warning('Entre com um email valido !')
      }
  }
    return isproceed
   }


   function MostraTexto() {

        var inputPass = document.getElementById('senha');
        var btnshowPass = document.getElementById('mostrasenha')

        if (inputPass.type === 'password') {
            inputPass.setAttribute('type', 'text')
            btnshowPass.classList.replace('bi-eye-fill', 'bi-eye-slash')

        }
        else {
            inputPass.setAttribute('type', 'password')
            btnshowPass.classList.replace('bi-eye-slash', 'bi-eye-fill')

        }
    }

  

   function MostraNome(){
    document.getElementById('id').style.borderColor = 'GainsBoro'
   }

   

   function MostraSenha(){
    document.getElementById('senha').style.borderColor = 'GainsBoro'
   }   
  
  
 const cadastrar = (e) => { 

    e.preventDefault();    
    
    const password = senha;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = nome;
    window.localStorage.setItem('Login', JSON.stringify({user, hashedPassword})) 
   
  
    const cadobj = {nome, hashedPassword, categoria }
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
          
          fetch("https://sistemacomercial-fv5g.onrender.com/usuarios", {
            method: "POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(cadobj)
          }).then((res) => {        
             toast.success('Cadastrado com sucesso !')
             nomechange('');             
             senhachange('');      
             
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
} 


     
  return (  

<div className="">

            <div className="bg-secondary" style={{ height: 75 }}>
                <Link to="/" className="navbar-brand fs-5 fw-bolder text-white" >Login:</Link>

            </div><br /><br />


            <form className="mobile-form" style={{ margin: '0 100px' }} onSubmit={cadastrar}>
                <h5>Cadastrar Usuario:</h5>

                <div className="form-group">
                    <label htmlFor="nome">Nome:</label><br />

                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className='form-control rounded-0'
                        value={nome}
                        onChange={e => nomechange(e.target.value)}                         
                        onSelect={MostraNome}
                        style={{ width: "150px" }}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoria:</label><br />

                    <select                    
                        id="categoria"
                        name="categoria"
                        className='form-select'
                        value={categoria}
                        onChange={e => categoriachange(e.target.value)}                        
                     
                        style={{ width: "150px" }}

                    >
                    <option value=""></option>    
                    <option value="Administrador">Administrador:</option>
                    <option value="Programador">Vendedor:</option>
     
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha:</label><br />

                    <div className='d-flex'>

                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            className='form-control rounded-0'
                            value={senha}
                            onChange={e => senhachange(e.target.value)}
                            onKeyUp={MostraSenha}
                            style={{ width: '150px' }}

                        /><i class="bi bi-eye-fill" id='mostrasenha' onClick={MostraTexto} style={{ fontSize: 20, margin: '0 20px' }}></i>

                    </div>
                </div><br /><br />             
                <div className='d-flex'>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', width: '90px' }}>Cadastrar:</button>
                    <a href="/"><button type='button' style={{ backgroundColor: 'orange', color: 'white', margin: '0 15px', width: '90px' }}>Login:</button></a>

                </div>
                <ToastContainer />
            </form>


            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>





  )
}

export default CadUsuarios