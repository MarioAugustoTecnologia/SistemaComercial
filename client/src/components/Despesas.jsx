import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const Despesas = () => {

  const [despesas, setDespesas] = useState([])


  const navigate = useNavigate()

  const API_URL = 'https://sistemacomercial-fv5g.onrender.com/despesas';

  useEffect(() => {
     
         fetch(API_URL)
           .then(response => response.json())
           .then(data => setDespesas(data))
           .catch(error => console.error('Erro ao buscar os dados:', error));
     
  }, []) 


    const handleDelete = async (id) => {
         
             const result = await Swal.fire({
               title: "Deseja Excluir ?",
               showDenyButton: true,
               showCancelButton: true,
               confirmButtonText: "Excluir",
               denyButtonText: `Não Excluir`
             })
         
             if (result.isConfirmed) {
         
               fetch('https://sistemacomercial-fv5g.onrender.com/despesas/' + id, {
         
                 method: "DELETE"
         
               }).then((res) => {
         
                 window.location.reload();
                 //toast.success('Excluido com sucesso !')      
         
               }).catch((err) => {
                 toast.error('Erro ! :' + err.message)
               })
         
             } else if (result.isDenied) {
               Swal.fire("Nada excluido", "", "info");
             }
         
         
           }
       
  const deleteall = async () => {
        
       const result = await Swal.fire({
              title: "Deseja Excluir ?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Excluir",
              denyButtonText: `Não Excluir`
            })
        
            if (result.isConfirmed) {
        
              try {
                // Mapeia o array de vendas para um array de promessas de exclusão
                const deletePromises = despesas.map(item =>
                  fetch(`${API_URL}/${item.id}`, {
                    method: 'DELETE',
                  })
                );
        
                // Espera que todas as promessas de exclusão sejam resolvidas
                await Promise.all(deletePromises);
        
                // Limpa a lista no estado do React
                setDespesas([]);
                //console.log('Todos os dados foram excluídos com sucesso!');
                toast.success('Excluido com sucesso !')  
        
              } catch (error) {
        
                console.error('Erro ao excluir todos os dados:', error);
              }     
             
            } else if (result.isDenied) {
              Swal.fire("Nada excluido", "", "info");
            }
        
        
  };

  
    const LoadEdit = (id) => {
    navigate("/despesas/editar/" + id);
  }

  function formataData() {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }     


  function somar() {

    let valores = [];

    despesas.map(item => {
      valores.push(item.total)
    })

    let soma = valores.reduce((previous_value, current_value) => {
      return parseFloat(previous_value) + parseFloat(current_value);
    })
    
    const mes = document.getElementById('mes').innerHTML;
    const nome = 'Total das despesas em: ' + mes;
    const total = soma.toFixed(2);
    const data_cad = formataData();
    const custo = null;

    const cadobj = { nome, total, custo, data_cad, mes }

    fetch("https://sistemacomercial-fv5g.onrender.com/despesas", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cadobj)
     }).then((res) => {
     
      window.location.reload();

     }).catch((err) => {
      toast.error('Erro ! :' + err.message)
     })

    const cadobj2 = { nome, total }

    fetch("https://sistemacomercial-fv5g.onrender.com/saidas", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cadobj2)
    }).then((res) => {
     
      window.location.reload();

    }).catch((err) => {
      toast.error('Erro ! :' + err.message)
    })

  }



  const logout = () => {
    localStorage.clear()
    console.clear();
  }

  return (
   <div className="container-fluid">
      <div className="row flex-nowrap" >

        <div className="main-wrapper" >

          <nav class="sidebar bg-secondary" style={{ width: '220px', height: 950, margin: '-12px' }}>
            <br />
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"><br /><br />
              <li className="w-100" style={{ margin: '12px' }} >
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

      </div>

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-900px' }}>

        <div className="d-flex">

          <Link to="/caddespesas" className="btn btn-success rounded-0" style={{ fontSize: '14px', fontFamily: 'arial', height: '35px', width:'150px' }}>Adicionar Despesa:</Link>
          <Link onClick={somar} className="btn rounded-0" style={{ fontSize: '14px', fontFamily: 'arial', height: '35px', color: 'white', backgroundColor: 'orange', margin: '0 15px', width:'150px' }}>Total de Despesas:</Link>
          <Link className="btn rounded-0" style={{ color: 'white', backgroundColor: 'red', fontSize: '14px', fontFamily: 'arial', height: '35px', margin: '0 1px', width:'150px' }} onClick={deleteall}>Excluir Todos:</Link>

        </div><br /><br /><br /><br /><br /><br />

        <div><br /><br /><br />

            <h4 className="h4" ><strong className="strong" style={{ color: 'red', margin: '0', fontSize: '20px' }}>Despesas:</strong></h4>
             <br /><br />
          <table className="table" id="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '1000px', margin:'0 -450px' }}>
          <thead>
            <tr>
              <th className="th" scope="col">Id:</th>
              <th className="th" scope="col">Nome:</th>
              <th className="th" scope="col">Custo:</th>
              <th className="th" scope="col">Total:</th>
              <th className="th" scope="col">Data de Pagamento:</th>
              <th className="th" scope="col">Data de Cadastro:</th>
              <th className="th" scope="col">Mês:</th>
              <th className="th" scope="col">Ação:</th>
            </tr>
          </thead>
          <tbody>
            {despesas &&
              despesas.map(item => (
                <tr key={item.id}>
                  <td className="td">{item.id}</td>
                  <td className="td">{item.nome}</td>
                  <td className="td">{item.custo}</td>
                  <td className="td">{item.total}</td>
                  <td className="td">{item.data_pgto}</td>
                  <td className="td">{item.data_cad}</td>
                  <td className="td" id="mes">{item.mes}</td>
                  <td className="td" >
                    <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>
                    <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                  </td>

                </tr>
              ))
            }
          </tbody>
          <ToastContainer />
        </table>          
        </div>     

      </div>
       <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000 }}>
           <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
       </footer>

    </div>
  )

}

export default Despesas























