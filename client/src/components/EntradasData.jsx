import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EntradasData = () => {


  const [entradadata, setEntradadata] = useState([]);
  const [buscadata, setBuscaData] = useState("")

  //const buscarap = buscanome.toLowerCase() 
  const navigate = useNavigate()

  var table = entradadata.filter(item => item.data_cad.includes(buscadata))


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/vendas").then((res) => {

      return res.json()

    }).then((resp) => {

      setEntradadata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])


  const handleDelete = (id) => {

    Swal.fire({
      title: "Deseja Excluir ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: `Não Excluir`
    }).then((result) => {

      if (result.isConfirmed) {


        fetch("https://sistemacomercial-fv5g.onrender.com/vendas/" + id, {

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
    });



  }

  function somar() {

    if (buscadata === "" || buscadata === null) {
      toast.warning("O campo busca por data está vazio !")

    } else {

      let valores = [];

      table.map(item => {
        valores.push(item.valorpagto)
      })
      
      let soma = valores.reduce((previous_value, current_value) => {
        return parseFloat(previous_value) + parseFloat(current_value);
      })

      const total = soma.toFixed(2);
      document.getElementById('total').innerHTML = "R$" + total;

    }



  }

  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  const voltar = () => {

  navigate('/entradas')

}

  return (
   <div className="container-fluid">
         <div className="row flex-nowrap">
           <div className="main-wrapper">
   
             <nav class="sidebar bg-secondary" style={{ width: '220px', height: 1000, margin: '-12px' }}>
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
          <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-850px'}}>
                     
         
                 <div className="mb3">
         
                   <h4 style={{ fontWeight: 'bold', color: 'blue', margin: '0 800px' }}>Entradas:</h4><br /><br />
                   <button type="button" onClick={voltar} style={{ backgroundColor: 'green', color: 'white', width: '120px', margin: '0' }}>Voltar:</button>
                   <button type="button" onClick={somar} style={{ backgroundColor: 'gray', color: 'white', width: '160px', margin: '0 10px' }}>Total Entradas:</button>
                   <strong style={{fontSize:'30px'}}>Total:<span id="total" style={{fontWeight:'bold', color:'green', margin:'0 10px'}}></span></strong><br /><br />
                   <div className="d-flex">
                     <label htmlFor="busca" style={{fontWeight:'bold', fontSize:'17px'}}>Busca por Data:</label>
                     
                   </div>
                   <div className="d-flex">
                       <input type="search" autoFocus='true' className="form-control rounded-0" value={buscadata} onChange={(e) => setBuscaData(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', fontWeight:'bold', color:'navy', width:'140px', padding:'2px'}} />
   
                   </div>
                           <br /><br />
                   <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '2100px' }} id="table">
                     <thead>
                       <tr>
                         <th className="th" scope="col">Id:</th>
                         <th className="th" scope="col" >Venda nº:</th>
                         <th className="th" scope="col">Nome:</th>
                         <th className="th" scope="col">Qtd:</th>
                         <th className="th" scope="col">Preço:</th>
                         <th className="th" scope="col">Total:</th>
                         <th className="th" scope="col">Desconto:</th>
                         <th className="th" scope="col">Valor Desconto:</th>
                         <th className="th" scope="col">Total c/Desconto:</th>
                         <th className="th" scope="col">Forma Paga:</th>
                         <th className="th" scope="col">Entradas:</th>
                         <th className="th" scope="col">Troco:</th>
                         <th className="th" scope="col">Parcelamento:</th>
                         <th className="th" scope="col">Parcela:</th>
                         <th className="th" scope="col">Mês:</th>
                         <th className="th" scope="col">Frete:</th>
                         <th className="th" scope="col">Data de Cadastro:</th>
                         <th className="th" scope="col">Ação:</th>
                       </tr>
                     </thead>
                     <tbody>
                       {
                         table.map(item => (
                           <tr key={item.id}>
                             <td className="td">{item.id}</td>
                             <td className="td">{item.vendan}</td>
                             <td className="td">{item.nome}</td>
                             <td className="td">{item.quant}</td>
                             <td className="td">{item.preco}</td>
                             <td className="td">{item.total}</td>
                             <td className="td">{item.desconto}</td>
                             <td className="td">{item.valordesc}</td>
                             <td className="td">{item.totaldesc}</td>
                             <td className="td">{item.formapag}</td>
                             <td className="td">{item.valorpagto}</td>
                             <td className="td">{item.troco}</td>
                             <td className="td">{item.parcelamento}</td>
                             <td className="td">{item.parcelan}</td>
                             <td className="td">{item.mes}</td>
                             <td className="td">{item.frete}</td>
                             <td className="td">{item.data_cad}</td>
                             <td className="td" >
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
               
               <br /><br />
                <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height:'30px'}}>
                 <p className="fw-bolder text-white" style={{marginTop:'-10px'}}>&copy; Multicompany Solutions</p>
               </footer>
         
             </div>
         
   
  )
}

export default EntradasData