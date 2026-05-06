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

    fetch("https://sistemacomercial-fv5g.onrender.com/orcvenda").then((res) => {

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
  
    const nome = 'Total Geral:';
    const total = soma.toFixed(2);    

    const cadobj = { nome, total }

    fetch("https://sistemacomercial-fv5g.onrender.com/orcvenda", {
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

    
      let valores2 = [];

      orcvendas.map(item => {
      valores2.push(item.totaldesc)
    })
    //console.log(valores)

    let soma2 = valores2.reduce((previous_value, current_value) => {     
      return parseFloat(previous_value) + parseFloat(current_value);    
    })

    let valores3 = [];

      orcvendas.map(item => {
      valores3.push(item.valordesc)
    })
    //console.log(valores)

    let soma3 = valores3.reduce((previous_value, current_value) => {     
      return parseFloat(previous_value) + parseFloat(current_value);    
    })
  
    const nome = 'Total Geral:';
    const total = soma.toFixed(2); 

    const totaldesc = soma2.toFixed(2);
    const valordesc = soma3.toFixed(2);

    //const desc = (desconto * 100) + '%';
    const descap = (valordesc/total); 
    const desconto = (valordesc/total * 100).toFixed(2) + "%";      

    const cadobj = { nome, total, totaldesc, descap, valordesc, desconto }

    fetch("https://sistemacomercial-fv5g.onrender.com/orcvenda", {
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
      

  const navigate = useNavigate()

  const Return = () => {
    navigate('/produto/codorc')

  }

    const DeleteAllOrcs = () => {
    navigate('/orcvendas/excluirtodos')

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
    
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    console.log(dataFormatada); // Exibe a data atual no formato dd/mm/aaaa
    document.getElementById('data').innerHTML = 'Orçamento de:  ' +  dataFormatada;
    document.getElementById('obs').innerHTML = obs;
  }

   function calcdesc() {

      const tabela = document.getElementById("table")
      const linhas = tabela.getElementsByTagName("tr")
        
         for (let i = 0; i < linhas.length; i++) {

          const celulas = linhas[i].getElementsByTagName("td");

           for (let j = 8; j < celulas.length; j++) {

            const valor = celulas[j].innerHTML;

            if (valor !== '0') {

                for (let j = 5; j < celulas.length; j++) {
                     celulas[j].style.color = 'green';
                     celulas[j].style.fontWeight = 'bold';
        
                 }
            
            }       
        
        }    


  }}

   function Format() {

      const tabela = document.getElementById("table")
      const linhas = tabela.getElementsByTagName("tr")
        
         for (let i = 0; i < linhas.length; i++) {

          const celulas = linhas[i].getElementsByTagName("td");

           for (let j = 1; j < celulas.length; j++) {

            const nome = celulas[j].innerHTML;

            if (nome === 'Total Geral:') {

                 celulas[j].style.fontWeight = 'bold';

                for (let j = 4; j < celulas.length; j++) {
                     
                     celulas[j].style.fontWeight = 'bold';
                     celulas[5].style.fontWeight = 'normal';
                     celulas[6].style.fontWeight = 'normal';
                     celulas[7].style.fontWeight = 'normal';
                     celulas[8].style.fontWeight = 'normal';
        
                }
                
                for (let j = 5; j < celulas.length; j++) {

                   const valor = celulas[j].innerHTML;
                   
                   if (valor !== ""){
                     
                         celulas[j].style.fontWeight = 'bold';
                         celulas[6].style.fontWeight = 'bold';
                         celulas[7].style.fontWeight = 'bold';
                         celulas[8].style.fontWeight = 'bold';

                   }            
        
                 }
            
            }       
        
        }    


  }}


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


        </div><br /><br />

      </div>
      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-950px' }}>


        <div className="col p-0 m-0">
          <div id="conteudo">
            <div className="justify-content-center shadow text-white" style={{ backgroundColor: 'blue', fontFamily: 'arial', margin: '0 -53px', height: '92px', fontSize: '17px', marginTop: '-30px', padding: '14px', width: '1800px' }}>
              <h5><strong><center>Multicompany Solutions</center></strong></h5>
              <h7><strong><center>Rua Antonio Alves de Souza nº:500 Vila Lageado - Botucatu SP </center></strong></h7>
            </div><br /><br /><br /><br /><br />
            <div className='p2 justify-content-center' style={{ fontFamily: 'arial', color: 'navy', margin: '0 220px', fontSize: '24px' }}>
              <h5><strong><center>Orçamento de Venda:</center></strong></h5>
            </div><br /><br /><br /><br />
            <div className="px-5 mt-5" style={{ fontFamily: 'arial' }}>
              <div className='mt-3'>
                <table className="table" id="table" style={{ margin: '0 57px', fontFamily: 'arial', fontSize: '17px', width: '95%', marginTop: '-70px' }}>
                  <thead>
                    <tr>
                      <th className="th" scope="col">Orçamento nº:</th>
                      <th className="th" scope="col">Produto/ Serviço:</th>
                      <th className="th" scope="col">Qtd:</th>
                      <th className="th" scope="col">Preço:</th>
                      <th className="th" scope="col">Total:</th>
                      <th className="th" scope="col">Total c/s Desconto e Frete:</th>
                      <th className="th" scope="col">Desc/ Calc:</th>
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
                          <td className="td">{item.totaldesc}</td>
                          <td className="td">{item.descap}</td>
                          <td className="td">{item.desconto}</td>
                          <td className="td">{item.valordesc}</td>

                        </tr>
                      ))
                    }
                  </tbody>

                </table>
              </div><br /><br /><br />
              <span style={{ fontSize: '17px', fontWeight: 'bold', margin: '0 100px' }} id="data"></span>
              <span style={{ fontSize: '17px', fontWeight: 'bold', margin: '0 30px' }} id="obs"></span>
            </div>

          </div>
          <br /><br /><br />
          <div className="d-flex">

            <button type="button" className="btn border rounded-0" onClick={calcdesc} style={{ width: 105, fontSize: '15px', fontFamily: 'arial', backgroundColor: 'DarkGreen', color: 'white' }}>Desconto:</button>
            <button type="button" className="btn border rounded-0" onClick={Format} style={{ width: 105, fontSize: '15px', fontFamily: 'arial', backgroundColor: 'navy', color: 'white' }}>Destacar:</button>
            <button type="button" className="btn btn-success border rounded-0" onClick={somar} style={{ width: 100, fontSize: '15px', fontFamily: 'arial' }}>Somar:</button>
            <label htmlFor="desconto" style={{ fontSize: '20px' }}>Desconto:</label>
            <input type="decimal" value={desconto} onChange={e => setDesconto(e.target.value)} style={{ width: 100, fontSize: '15px', color: 'green', fontWeight: 'bold' }} />
            <button type="button" className="btn border rounded-0" onClick={DeleteAllOrcs} style={{ width: 100, fontSize: '15px', fontFamily: 'arial', backgroundColor: 'red', color: 'white' }}>Excluir</button>
            <button type="button" className="btn border rounded-0" onClick={Return} style={{ width: 100, fontSize: '15px', fontFamily: 'arial', backgroundColor: 'orange', color: 'white' }}>Voltar</button>
            <button type="button" className="btn border" onClick={() => generatePDF(GerarPdf, personalizacao)} style={{ width: 120, fontSize: '15px', fontFamily: 'arial', backgroundColor: 'Crimson', color: 'white' }}>Gerar Pdf:</button><br /><br /><br />
            <input type="text" value={obs} onChange={e => setObs(e.target.value)} style={{ width: 400, fontSize: '15px', color: 'navy', fontWeight: 'bold' }} />
            <button type="button" onClick={Obs} className="btn btn-primary rounded-0" style={{ width: 100, fontSize: '15px', fontFamily: 'arial' }}>Obs:</button>
            <ToastContainer />

          </div>


        </div>
       </div>


         <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', color: 'white', textAlign: 'center', zIndex: 1000 }}>
           <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
        </footer>


    </div>

  )
}

export default OrcVendas