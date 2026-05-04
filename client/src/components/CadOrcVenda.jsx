import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadOrcVenda = () => {


     const { pcod } = useParams();
     const navigate = useNavigate();


  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod).then((res) => {
      return res.json();
    }).then((resp) => {
      Idchange(resp.id);
      nomechange(resp.nome);
      precochange(resp.preco);  
      
    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [id, Idchange] = useState("")  
  const [nome, nomechange] = useState("")
  const [preco, precochange] = useState("") 
  const [quant, quantchange] = useState("")
  const [orcn, orcnchange] = useState("")
  const [desc, descchange] = useState("") 
 

  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"


    if (nome === null || nome === '') {
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (preco === null || preco === '') {
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (quant === null || quant === '') {
      document.getElementById('quant').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (document.getElementById('total').value === null || document.getElementById('total').value === '') {

      document.getElementById('total').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }


    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }


  function calcular() {

    const total = (quant * preco).toFixed(2);
    console.log(total)
    document.getElementById('total').value = total;
    document.getElementById('total').style.borderColor = 'GainsBoro';


  }

  function desconto() {

    var total = document.getElementById('total').value;

    const desconto = (desc * total).toFixed(2);
    console.log(desconto)
    document.getElementById('valordesc').value = desconto;

    const novototal = total - desconto;
    document.getElementById('totaldesc').value = (novototal).toFixed(2);

  }


  const cadastrar = (e) => {

    e.preventDefault();

    var total = document.getElementById('total').value;

    if (orcn !== null || orcn !== "") {

      if (desc === null || desc === "") {

        const valordesc = 0;
        const totaldesc = total;

        if (isValidate()) {

          const cadobj = { orcn, nome, quant, preco, total, valordesc, totaldesc }

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercial-fv5g.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                orcnchange('');
                navigate('/produto/codorc');
              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }

      } else {

        if (isValidate()) {

          const valordesc = document.getElementById('valordesc').value;
          const desconto = (desc * 100) + '%';
          const totaldesc = document.getElementById('totaldesc').value;
          const cadobj = { orcn, nome, quant, preco, total, desconto, valordesc, totaldesc }

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercial-fv5g.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                navigate('/produto/codorc');

              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }
      }
    } else {

      if (desc === null || desc === "") {

         const valordesc = 0;
         const totaldesc = total;

        if (isValidate()) {

          const cadobj = { orcn, nome, quant, preco, total, totaldesc, valordesc }

           Swal.fire({
             title: "Deseja salvar ?",
             showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: "Salvar",
             denyButtonText: `Não salvar`
           }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercial-fv5g.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                orcnchange('');
                navigate('/produto/codorc');
              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }

      } else {

        if (isValidate()) {

          const valordesc = document.getElementById('valordesc').value;
          const desconto = (desc * 100) + '%';
          const totaldesc = document.getElementById('totaldesc').value;
          const cadobj = { orcn, nome, quant, preco, total, desconto, valordesc, totaldesc }

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercial-fv5g.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                navigate('/produto/codorc');

              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }
      }
     
    };
  }     
   
  function mudacorquant() {

    document.getElementById('quant').style.borderColor = 'Gainsboro';

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

        <form action='' on onSubmit={cadastrar} style={{ marginTop: '-1000px' }}>

          <div className='mb-3'>

            <label htmlFor='id' style={{ fontWeight: 'bold', margin: '120px' }}>Orçamento nº:</label>
            <input type='number' value={orcn} onChange={e => orcnchange(e.target.value)} style={{ fontSize: '17px', width: 85, margin: '0 120px', fontWeight: 'bold', color: 'navy', marginTop:'-115px' }} className='form-control rounded-0' name='ordem' id='ordem' />

          </div><br />

          <div className='d-flex'>
            <label htmlFor='nome' style={{ margin: '0 120px', fontWeight: 'bold' }}>Nome:</label>

          </div>
          <div className='d-flex'>
            <input type='text' placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ width: 300, margin: '0 120px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' />

          </div><br />
          <div className='d-flex'>
            <label htmlFor='qtd' style={{ margin: '0 120px', fontWeight: 'bold' }}>Quantidade:</label>
            <label htmlFor='preco' style={{ margin: '0 -90px', fontWeight: 'bold' }}>Total:</label>
            <label htmlFor='total' style={{ margin: '0 220px', fontWeight: 'bold' }}>Desconto:</label>

          </div>
          
          <div className='d-flex'>
            <input type='number' autoFocus={true} onSelect={mudacorquant} value={quant} onChange={e => quantchange(e.target.value)} style={{ fontSize: '17px', width: 85, margin: '0 120px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='qtd' id='quant' />
            <input type='decimal' style={{ fontSize: '17px', width: 150, margin: '0 -80px', color: 'navy', fontWeight: 'bold' }} className='form-control rounded-0' name='total' id='total' />
            <input type='decimal' style={{ fontSize: '17px', width: 150, margin: '0 100px', color: 'navy', fontWeight: 'bold' }} className='form-control rounded-0' name='desconto' id='desconto' value={desc} onChange={e => descchange(e.target.value)} />

          </div><br />
          <div className='d-flex'>

            <label htmlFor='preco' style={{ margin: '0 120px', fontWeight: 'bold' }}>Preço:</label>
            <label htmlFor='valordesc' style={{ margin: '0 0px', fontWeight: 'bold', margin:'0 -34px' }}>Valor Desconto:</label>


          </div><br />
          <div className='d-flex'>
            <input type="decimal" value={preco} onChange={e => precochange(e.target.value)} style={{ fontSize: '17px', width: 100, margin: '0 120px', fontWeight: 'bold', color: 'navy', marginTop:'-20px', height:'40px'}} placeholder='Entre com o custo:' className='form-control rounded-0' name='custo' />
            <input type="decimal" style={{ fontSize: '17px', width: 150, fontWeight: 'bold', color: 'navy', margin:'0 -85px', marginTop:'-20px' }} className='form-control rounded-0' name='valordesc' id='valordesc' />



          </div><br />

          <div className='mb-3'>
            <label htmlFor='totaldesc' style={{ fontSize: '17px', margin: '0 120px', fontWeight: 'bold' }}>Total c/Desconto:</label>
            <input type='decimal' style={{ fontSize: '17px', width: 150, margin: '0 120px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='totaldesc' id='totaldesc' />

          </div><br />

          <div className='d-flex' style={{ margin: '0 120px' }}>
            <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 0px', fontSize: '15px' }}>Cadastrar:</button>
            <button type='button' className='btn btn-primary border rounded-0' onClick={calcular} style={{ width: 100, margin: '0 0px', fontSize: '15px'}}>Total:</button>
            <Link onClick={desconto} className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'Indigo', margin: '0 0px', fontSize: '15px', width: 100}}>Desconto:</Link>
            <Link to='/produto/codorc' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 2px', fontSize: '15px', width: 100 }}>Voltar:</Link>


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

export default CadOrcVenda