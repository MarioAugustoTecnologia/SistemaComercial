import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';



const Entradas = () => {

  const [vendasdata, setVendasdata] = useState([])

  const API_URL = 'https://sistemacomercial-fv5g.onrender.com/vendas';

  useEffect(() => {

    fetch(API_URL)
      .then(response => response.json())
      .then(data => setVendasdata(data))
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

      fetch('https://sistemacomercial-fv5g.onrender.com/vendas' + id, {

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
              const deletePromises = vendasdata.map(item =>
                fetch(`${API_URL}/${item.id}`, {
                  method: 'DELETE',
                })
              );
      
              // Espera que todas as promessas de exclusão sejam resolvidas
              await Promise.all(deletePromises);
      
              // Limpa a lista no estado do React
              setVendasdata([]);
              //console.log('Todos os dados foram excluídos com sucesso!');
              toast.success('Excluido com sucesso !')  
      
            } catch (error) {
      
              console.error('Erro ao excluir todos os dados:', error);
            }    
            
          } else if (result.isDenied) {
            Swal.fire("Nada excluido", "", "info");
          }
      
      
 }


  return (
    <div style={{width:'120%'}}>     
      
      <div className="bg-secondary" style={{ height: 75, width:'100%' }}>
             

      </div><br /><br />
   
          <div className="">
            <div className="mb3">
              <Link to="/produtos/codigo" className="btn" style={{ fontSize: '16px', fontFamily: 'arial', color: 'white', backgroundColor: 'orange' }}>Nova Venda:</Link>
              <Link to="/entradas/nome" className="btn" style={{ color: 'white', backgroundColor: 'green', margin: '0 25px', fontSize: '17px', fontFamily: 'arial' }}>Faturamento por produto e serviço:</Link>
              <Link to="/entradas/data" className="btn" style={{ color: 'white', backgroundColor: 'yellowgreen', margin: '0 3px', fontSize: '17px', fontFamily: 'arial' }}>Faturamento por data:</Link>
              <Link to="/entradas/mes" className="btn" style={{ color: 'white', backgroundColor: 'DarkSlateBlue', margin: '0 25px', fontSize: '17px', fontFamily: 'arial' }}>Faturamento e atualização do mes:</Link>
              <Link to="/entradas/numero" className="btn" style={{ color: 'white', backgroundColor: 'DeepSkyBlue', margin: '0 2px', fontSize: '17px', fontFamily: 'arial' }}>Totalizar Venda:</Link>
              <Link to="/entradas/totfrete" className="btn" style={{ color: 'white', backgroundColor: 'DarkCyan', margin: '0 22px', fontSize: '17px', fontFamily: 'arial' }}>Totalizar Frete:</Link>
              <Link to="/entradas/ultima" className="btn" style={{ color: 'white', backgroundColor: 'Crimson', margin: '0 5px', fontSize: '17px', fontFamily: 'arial' }}>Venda Atual:</Link>
              <Link className="btn" style={{ color: 'white', backgroundColor: 'red', margin: '0 15px', fontSize: '17px', fontFamily: 'arial' }} onClick={deleteall}>Excluir Todos:</Link>

            </div><br /><br />
            <div>
              <h4 className="h4"><strong className="strong" style={{ color: 'red', fontSize: '23px', textAlign: 'center', margin: '0 980px' }}>Entradas:</strong></h4>
              <br />
              <div className="">
                <table className="table" id="table" style={{fontFamily: 'arial', fontSize: '18px', border:'true'}}>
                  <thead>
                    <tr>
                      <th className="th" scope="col">Id:</th>
                      <th className="th" scope="col">Venda nº:</th>
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
                      vendasdata.map(item => (
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
            </div><br />



          </div>
               <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

          </div>

  )
}

export default Entradas