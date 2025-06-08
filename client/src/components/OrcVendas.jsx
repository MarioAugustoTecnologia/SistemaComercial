import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import generatePDF, { Margin } from 'react-to-pdf';


const OrcVendas = () => {

  const [orcvendas, setOrcVendas] = useState([])
  const [desconto, setDesconto] = useState("");
  const [obs, setObs] = useState("")

  useEffect(() => {

    fetch("https://sistemacomercialserver.onrender.com/orcvenda").then((res) => {

      return res.json()

    }).then((resp) => {

      setOrcVendas(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, []) 


  function somar() {  

    if(desconto === ''){

      let valores = [];

      orcvendas.map(item => {
      valores.push(item.total)
    })
    //console.log(valores)

    let soma = valores.reduce((previous_value, current_value) => {      
      return parseFloat(previous_value) + parseFloat(current_value);    
    })
  
    const nome = 'Total da venda:';
    const total = soma.toFixed(2);    

    const cadobj = { nome, total }

    fetch("https://sistemacomercialserver.onrender.com/orcvenda", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cadobj)
    }).then((res) => {

      window.location.reload();                    

    }).catch((err) => {
      toast.error('Erro ! :' + err.message)
    })    

    }else{

      let valores = [];

      orcvendas.map(item => {
      valores.push(item.total)
    })
    //console.log(valores)

    let soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
      return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
    })
  
    const nome = 'Total da venda:';
    const total = soma.toFixed(2);
    const valordesc = parseFloat((desconto * total).toFixed(2)); 
    const td = total - valordesc;
    const totaldesc = td.toFixed(2); 
    const desc = (desconto * 100) + '%';       

    const cadobj = { nome, total, valordesc, totaldesc, desc }

    fetch("https://sistemacomercialserver.onrender.com/orcvenda", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cadobj)
    }).then((res) => {
      window.location.reload();
      //toast.success('Cadastrado com Sucesso !')                       

    }).catch((err) => {
      toast.error('Erro ! :' + err.message)
    })
      
    }    
  }

    const deleteall = (id) => {

      Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
          }).then((result) => {
      
            if (result.isConfirmed) {
      
              for (id = 0; id <= orcvendas.length; id++) {
      
                fetch("https://sistemacomercialserver.onrender.com/orcvenda/" + id, {
          
                  method: "DELETE"
          
                }).then((res) => {
          
                  window.location.reload();
                  //toast.success('Excluido com sucesso !')    
          
                }).catch((err) => {
                  toast.error('Erro ! :' + err.message)
                })
          
              }
      
            } else if (result.isDenied) {
              Swal.fire("Nada excluido", "", "info");
            }
          });      
    
    }    

  const navigate = useNavigate()

  const Return = () => {
    navigate('/produto/codorc')

  }

  const GerarPdf = () => document.getElementById('conteudo');

   
    const personalizacao = {
       method: 'open',
       page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: 'A4',
      // default is 'portrait'
      orientation: 'portrait',
      
   },
   
   
  }

  function Obs(){
    document.getElementById('obs').innerHTML = obs;
  }


  return (
    <div className="col p-0 m-0">
      <div id="conteudo"> 
      <div className="p-2 justify-content-center shadow text-white" style={{ backgroundColor: 'blue', fontFamily: 'arial', width: '86%', margin: '0 150px', height: '82px', fontSize:'20px'}}>
        <h4><strong><center>Multicompany Solutions</center></strong></h4>
        <h7><strong><center>Rua Antonio Alves de Souza nº:500 Vila Lageado - Botucatu SP </center></strong></h7>
      </div><br /><br /><br /><br /><br />
      <div className='p2 justify-content-center' style={{ fontFamily: 'arial', color: 'red', margin: '0 220px', fontSize:'24px'}}>
        <h4><strong><center>Orçamento de Venda:</center></strong></h4>
      </div><br /><br /><br /><br />
      <div className="px-5 mt-5" style={{fontFamily:'arial'}}>       
          <div className='mt-3'>
            <table className="table" id="table" style={{ margin: '0 90px', fontFamily: 'arial', fontSize: '24px', width: '92%' }}>
              <thead>
                <tr>        
                  <th className="th" scope="col">Orçamento nº:</th>
                  <th className="th" scope="col">Nome:</th>
                  <th className="th" scope="col">Qtd:</th>
                  <th className="th" scope="col">Preço:</th>
                  <th className="th" scope="col">Total:</th>
                  <th className="th" scope="col">Total c/Desconto:</th>
                  <th className="th" scope="col">Desconto:</th>
                  <th className="th" scope="col">Valor Desconto:</th>                                   
                </tr>
              </thead>
              <tbody>
                {
                  orcvendas.map(item => (
                    <tr key={item.id}>               
                      <td className="td">{item.orcn}</td>
                      <td className="td">{item.nome}</td>
                      <td className="td">{item.quant}</td>
                      <td className="td">{item.preco}</td>
                      <td className="td">{item.total}</td>
                      <td className="td" style={{fontWeight:'bold', color:'green'}}>{item.totaldesc}</td>
                      <td className="td">{item.desc}</td>
                      <td className="td">{item.valordesc}</td>                  
                                         
                    </tr>
                  ))

                }
              </tbody>         

            </table>
            </div><br /><br /><br />
            <span style={{fontSize:'20px', fontWeight:'bold', margin:'0 200px'}} id="obs"></span>
          </div>        
                 
         </div>
          <br /><br /><br />
          <button type="button" className="btn btn-success border" onClick={somar} style={{ width: 100, margin: '0 260px', fontSize: '20px', fontFamily: 'arial' }}>Somar:</button>
          <label htmlFor="desconto" style={{margin:'0 -150px', fontSize:'20px'}}>Desconto:</label>
          <input type="decimal" value={desconto} onChange={e => setDesconto(e.target.value)} style={{margin:'0 154px', width:100, fontSize:'22px', color:'green', fontWeight:'bold'}} />
          <button type="button" className="btn border" onClick={deleteall} style={{ width: 100, margin: '0 -100px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'red', color:'white'}}>Excluir</button>
          <button type="button" className="btn border" onClick={Return} style={{ width: 100, margin: '0 130px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'orange', color:'white'}}>Voltar</button>
          <button type="button" className="btn border" onClick={() => generatePDF(GerarPdf, personalizacao)} style={{ width: 120, margin: '0 -50px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'Crimson', color:'white'}}>Gerar Pdf:</button>
          <input type="text" value={obs} onChange={e => setObs(e.target.value)} style={{margin:'0 154px', width:400, fontSize:'22px', color:'navy', fontWeight:'bold'}} />
          <button type="button" onClick={Obs} className="btn btn-primary" style={{ width: 100, margin: '0 -130px', fontSize: '20px', fontFamily: 'arial'}}>Obs:</button>
         <ToastContainer />  
     
    </div>
  )
}

export default OrcVendas