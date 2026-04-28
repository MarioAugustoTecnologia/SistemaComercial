import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const Fornecedores = () => {

  const [fornecedores, setFornecedores] = useState([])

  const navigate = useNavigate()


  const API_URL = 'https://sistemacomercial-fv5g.onrender.com/fornecedor';
   
     useEffect(() => {
   
       fetch(API_URL)
         .then(response => response.json())
         .then(data => setFornecedores(data))
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
  
        fetch('https://sistemacomercial-fv5g.onrender.com/fornecedor/' + id, {
  
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
         const deletePromises = fornecedores.map(item =>
           fetch(`${API_URL}/${item.id}`, {
             method: 'DELETE',
           })
         );
 
         // Espera que todas as promessas de exclusão sejam resolvidas
         await Promise.all(deletePromises);
 
         // Limpa a lista no estado do React
         setFornecedores([]);
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
    navigate("/fornecedor/editar/" + id);
  }

  

  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  return (
      <div className="container-fluid">
      <div className="row flex-nowrap" >

        <div className="main-wrapper">

          <nav class="sidebar bg-secondary" style={{ width: '210px', height: 1000, margin: '-12px' }}>
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
                  to="/cadfornecedor"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-file-earmark-plus"></i>
                  <span className="ms-2 d-sm-inline">
                    Novo Fornecedor:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/cadcatforn"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-bookmark-check"></i>
                  <span className="ms-2 d-sm-inline">
                    Nova Categoria:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/fornecedores/categoria/lista"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-bookmark"></i>
                  <span className="ms-2 d-sm-inline">
                    Categorias:

                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 6px' }}>
                <Link
                  to=""
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-database"></i>
                  <span className="ms-2 d-sm-inline">
                    Consultas:

                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 12px' }}>
                <Link
                  to="/fornecedores/nome"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-truck"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Nome:

                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 12px' }}>
                <Link
                  to="/fornecedores/categoria"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-bookmark-star"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Categoria:
                  </span><br />

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

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-950px' }}>

        <div className="mb-3">

          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 1000px' }}>Fornecedores:</h4><br /><br />

          <table className="table" id="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '2500px' }}>
            <thead>
              <tr>
                <th className="th" scope="col">Id:</th>
                <th className="th" scope="col">Nome:</th>
                <th className="th" scope="col">Endereço:</th>
                <th className="th" scope="col">Numero:</th>
                <th className="th" scope="col">Complemento:</th>
                <th className="th" scope="col">Cep:</th>
                <th className="th" scope="col">Cidade:</th>
                <th className="th" scope="col">Email:</th>
                <th className="th" scope="col">Telefone:</th>
                <th className="th" scope="col">Categoria:</th>
                <th className="th" scope="col">Data de Cadastro:</th>
                <th className="th" scope="col">Ação:</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores &&
                fornecedores.map(item => (
                  <tr key={item.id}>
                    <td className="td">{item.id}</td>
                    <td className="td" >{item.nome}</td>
                    <td className="td">{item.endereco}</td>
                    <td className="td">{item.numero}</td>
                    <td className="td">{item.comp}</td>
                    <td className="td">{item.cep}</td>
                    <td className="td" >{item.cidade}</td>
                    <td className="td">{item.email}</td>
                    <td className="td">{item.fone}</td>
                    <td className="td">{item.catforn}</td>
                    <td className="td">{item.datacad}</td>
                    <td className="td">
                      <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px', fontSize: '17px' }}>Editar:</button>
                      <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px', fontSize: '17px' }}>Excluir:</button>
                    </td>

                  </tr>
                ))

              }

            </tbody>
            <ToastContainer />

          </table>

        </div>

      </div>

      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
        <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
      </footer>
    </div>


  )
}

export default Fornecedores