import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';



const Produtos = () => {

  const [produtodata, setProdutodata] = useState([])


  const navigate = useNavigate()

 const API_URL = 'https://sistemacomercial-fv5g.onrender.com/produtos';
 
   useEffect(() => {
 
     fetch(API_URL)
       .then(response => response.json())
       .then(data => setProdutodata(data))
       .catch(error => console.error('Erro ao buscar os dados:', error));
 
   }, []) 
   
const LoadEdit = (id) => {
    navigate("/produtos/editar/" + id);
  }


  //const element = array[index];
   const handleDelete = async (id) => {
  
      const result = await Swal.fire({
        title: "Deseja Excluir ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        denyButtonText: `Não Excluir`
      })
  
      if (result.isConfirmed) {
  
        fetch('https://sistemacomercial-fv5g.onrender.com/produtos/' + id, {
  
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
         const deletePromises = produtodata.map(item =>
           fetch(`${API_URL}/${item.id}`, {
             method: 'DELETE',
           })
         );
 
         // Espera que todas as promessas de exclusão sejam resolvidas
         await Promise.all(deletePromises);
 
         // Limpa a lista no estado do React
         setProdutodata([]);
         //console.log('Todos os dados foram excluídos com sucesso!');
         toast.success('Excluido com sucesso !')  
 
       } catch (error) {
 
         console.error('Erro ao excluir todos os dados:', error);
       }
 
 
 
     } else if (result.isDenied) {
       Swal.fire("Nada excluido", "", "info");
     }
 
 
   };

  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  function nivelestoque() {
  
    const tabela = document.getElementById("table")
    const linhas = tabela.getElementsByTagName("tr")
        
         for (let i = 0; i < linhas.length; i++) {           

          const celulas = linhas[i].getElementsByTagName("td");

           for (let j = 6; j < celulas.length; j++) {

            const qtd = parseInt(celulas[j].innerHTML);

            if (qtd <= 20) {
               celulas[j].style.fontWeight = 'bold';
               celulas[j].style.backgroundColor = 'salmon'; 
               celulas[j].style.color = 'red';                 
                                       
            
            }                   
        
        } 
        
        for (let j = 7; j < celulas.length; j++) {
           celulas[j].style.backgroundColor = 'white';
           celulas[j].style.fontWeight = 'normal';
           celulas[j].style.color = 'black';   
        
        }       

     }
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
                  to="/produto/cadcat"
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
                  to="/produtos/categoria/lista"
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
                  to="/produtos/nome"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-box"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Nome:

                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 12px' }}>
                <Link
                  to="/produtos/cat"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-bookmark-star"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Categoria:
                  </span><br />

                </Link>
              </li>
              <li className="w-100" style={{ margin: '0 12px' }}>
                <Link
                  to="/produtos/codigo"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-upc-scan"></i>
                  <span className="ms-2 d-sm-inline">
                    - Por Codigo:
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
      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-900px' }}>


        <div className="mt-3">

          <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 800px' }}>Produtos e Serviços:</h4><br /><br />
          <button type="button" onClick={deleteall} style={{ backgroundColor: 'red', color: 'white', width: '120px', margin: '0px' }}>Excluir Tudo:</button>
          <br /><br />
          <table className="table" id="table" style={{ margin: '0 -30px', fontFamily: 'arial', fontSize: '17px', width: 2100 }}>
            <thead>
              <tr>
                <th className="th" scope="col">Id:</th>
                <th className="th" scope="col">Nome:</th>
                <th className="th" scope="col">Custo:</th>
                <th className="th" scope="col">Preço:</th>
                <th className="th" scope="col">Categoria:</th>
                <th className="th" scope="col">Data de Cadastro:</th>
                <th className="th" scope="col">Quantidade:</th>
                <th className="th" scope="col">Codigo de Venda:</th>
                <th className="th" scope="col">Ação:</th>
              </tr>
            </thead>
            <tbody>
              {produtodata &&
                produtodata.map(item => (
                  <tr key={item.id} classname="product-row" id="line">
                    <td className="td">{item.id}</td>
                    <td className="td">{item.nome}</td>
                    <td className="td">{item.custo}</td>
                    <td className="td">{item.preco}</td>
                    <td className="td">{item.categoria}</td>
                    <td className="td">{item.data_cadastro}</td>
                    <td className="td" id="estoque" classname="stock" style={{ color: getColor(item.qtd) }}>{item.qtd}</td>
                    <td className="td">{item.codigo}</td>
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


      </div><br /><br />

      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
        <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
      </footer>



    </div>

  )
}

export default Produtos