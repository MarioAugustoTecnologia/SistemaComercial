import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadResultado = () => {

  const [mes, meschange] = useState("")
  const [entradadata, setEntradadata] = useState([]);
  const [saidadata, setSaidadata] = useState([]);
  const [buscaentrada, setBuscaEntrada] = React.useState("")
  const [buscasaida, setBuscaSaida] = React.useState("")

  const buscarap = buscaentrada.toLowerCase()
  const buscarap2 = buscasaida.toLowerCase()

  var table = entradadata.filter(item => item.nome.toLowerCase().includes(buscarap))
  var table2 = saidadata.filter(item => item.nome.toLowerCase().includes(buscarap2))

  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/entradas").then((res) => {

      return res.json()

    }).then((resp) => {

      setEntradadata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])

  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/saidas").then((res) => {

      return res.json()

    }).then((resp) => {

      setSaidadata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])


  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"
 
    if (mes === null || mes === '') {
      document.getElementById('mes').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Email:' 
    }
    if (document.getElementById('resultado').value === null || document.getElementById('resultado').value === '') {
      document.getElementById('resultado').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }

  function MostraEntradas() {
    document.getElementById('entradas').style.borderColor = 'GainsBoro'
  }
  function MostraSaidas() {
    document.getElementById('saidas').style.borderColor = 'GainsBoro'
  }


    function somar() { 
  
  
        let valores = [];
  
        table2.map(item => {
          valores.push(item.total)
        })
  
        let soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
          return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
        }) 

        document.getElementById('saidas').value = soma;
              
    }


  const cadastrar = (e) => {

    e.preventDefault();

    const data = new Date();
    const data_cad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const saidas = document.getElementById('saidas').value;
    const entradas = document.getElementById('entradas').value;

    var resultado = document.getElementById('resultado').value;

    const cadobj = { resultado, entradas, saidas, data_cad, mes }

    if (isValidate()) {

      Swal.fire({
        title: "Deseja salvar ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: `Não salvar`
      }).then((result) => {

        if (result.isConfirmed) {

          fetch("https://sistemacomercial-fv5g.onrender.com/resultados", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cadobj)
          }).then((res) => {
            toast.success('Cadastrado com Sucesso !')             

          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })

        }
        else if (result.isDenied) {
          Swal.fire("Nada salvo", "", "info");
        }
      })
    }

  }


  function calcResult() {

    const saidas = document.getElementById('saidas').value;
    const entradas = document.getElementById('entradas').value;
    const resultado = (entradas - saidas).toFixed(2);
    console.log(resultado)
    document.getElementById('resultado').value = resultado;

  }

  const DeleteEntradas = (id) => {
  
      Swal.fire({
        title: "Deseja Excluir ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        denyButtonText: `Não Excluir`
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          fetch("https://sistemacomercial-fv5g.onrender.com/entradas/" + id, {
  
            method: "DELETE"
  
          }).then((res) => {
  
            window.location.reload();    
  
          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })
        } else if (result.isDenied) {
          Swal.fire("Nada excluido", "", "info");
        }
      });
  
    }


      const DeleteSaidas = (id) => {
  
      Swal.fire({
        title: "Deseja Excluir ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        denyButtonText: `Não Excluir`
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          fetch("https://sistemacomercial-fv5g.onrender.com/saidas/" + id, {
  
            method: "DELETE"
  
          }).then((res) => {
  
            window.location.reload();               
  
          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })
        } else if (result.isDenied) {
          Swal.fire("Nada excluido", "", "info");
        }
      });
  
    }

    const DeleteAllInputs = (id) => {
    
        Swal.fire({
          title: "Deseja Excluir ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Excluir",
          denyButtonText: `Não Excluir`
        }).then((result) => {
    
          if (result.isConfirmed) {
            for (id = 0; id <= entradadata.length; id++) {
    
              fetch("https://sistemacomercial-fv5g.onrender.com/entradas/" + id, {
    
                method: "DELETE"
    
              }).then((res) => {
    
                window.location.reload();                  
    
              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
    
            }
          } else if (result.isDenied) {
            Swal.fire("Nada excluido", "", "info");
          }
        });
    
      }

      const DeleteAllOutputs = (id) => {
    
        Swal.fire({
          title: "Deseja Excluir ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Excluir",
          denyButtonText: `Não Excluir`
        }).then((result) => {
    
          if (result.isConfirmed) {
            for (id = 0; id <= saidadata.length; id++) {
    
              fetch("https://sistemacomercial-fv5g.onrender.com/saidas/" + id, {
    
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
      
      
 const handleInsert = () => {
    
    document.getElementById('entradas').value = document.getElementById('total').innerHTML;  

}
  

  const logout = () => {
    localStorage.clear()
    console.clear();

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

      <div className="container" style={{ display: 'flex', margin: '0 230px', marginTop: '-950px' }}>

        <form action='' onSubmit={cadastrar}>
          <h5><center><strong>Cadastrar novo Resultado:</strong></center></h5><br />
          <div className='mb-3'>
            <label htmlFor='entradas' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Total de Entradas:</label>
            <input type='decimal' onKeyUp={MostraEntradas} placeholder='Entre com o total:' style={{ fontSize: '17px', width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='entradas' id='entradas' />
            <br />
            <label htmlFor='saidas' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Total de Saídas:</label>
            <input type='decimal' onKeyUp={MostraSaidas} placeholder='Entre com o total:' style={{ fontSize: '17px', width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='saidas' id='saidas' />
            <br />
            <label htmlFor='mes' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Mes:</label>
            <select style={{ fontSize: '17px', width: 150, margin: '0 115px', color: 'navy', fontWeight: 'bold' }} name='mes' id='mes' className='form-select' value={mes} onChange={e => meschange(e.target.value)}>
              <option value=""></option>
              <option value="Janeiro">Janeiro</option>
              <option value="Fevereiro">Fevereiro</option>
              <option value="Março">Março</option>
              <option value="Abril">Abril</option>
              <option value="Maio">Maio</option>
              <option value="Junho">Junho</option>
              <option value="Julho">Julho</option>
              <option value="Agosto">Agosto</option>
              <option value="Setembro">Setembro</option>
              <option value="Outubro">Outubro</option>
              <option value="Novembro">Novembro</option>
              <option value="Dezembro">Dezembro</option>
            </select>
          </div><br />
          <label htmlFor='resultados' style={{ fontSize: '17px', margin: '0 115px', fontWeight: 'bold' }}>Resultado:</label>
          <input type='decimal' onKeyUp={MostraSaidas} style={{ fontSize: '17px', width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='resultado' id='resultado' />
          <br />
          <div className='d-flex'>
            <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 120px', fontSize: '15px' }}>Cadastrar:</button>
            <button className='btn btn-primary border rounded-0' onClick={calcResult} style={{ width: 100, margin: '0 -100px', fontSize: '15px' }}>Total:</button>
            <Link to='/resultado' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 120px', fontSize: '15px', width: 100 }}>Voltar:</Link><br />
          </div>
          <br /><br />
          <div className='d-flex'>
            <label htmlFor="buscaentradas" style={{ fontWeight: 'bold', fontSize: '17px', margin: '0 115px' }}>Busca Entradas:</label>
            <label htmlFor="buscasaidas" style={{ fontWeight: 'bold', fontSize: '17px', margin: '0 0px' }}>Busca Saidas:</label>
          </div>
          <div className='d-flex'>

            <input type='search' value={buscaentrada} onChange={e => setBuscaEntrada(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='saidas' id='saidas' />
            <input type='search' value={buscasaida} onChange={e => setBuscaSaida(e.target.value)} style={{ fontFamily: 'arial', fontSize: '17px', width: 200, margin: '0 -80px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='saidas' id='saidas' />

          </div><br />
          <div>
            <button className='btn order rounded-0' style={{ width: 100, fontSize: '15px', backgroundColor: 'green', color: 'white', margin: '0 115px' }} onClick={somar}>Total:</button>
          </div><br /><br />
          <div className='d-flex'>
            <h5 style={{ color: 'navy', fontWeight: 'bold', margin: '0 5px' }}>Entradas:</h5>
            <h5 style={{ color: 'navy', fontWeight: 'bold', margin: '0 330px' }}>Saidas:</h5>

          </div>

          <div className='d-flex'>

            <table className="table" id="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '35%', margin: '0 0px' }} >
              <thead>
                <tr>
                  <th className="th" scope="col">Nome:</th>
                  <th className="th" scope="col">Total:</th>
                  <th className="th" scope="col">Ação:</th>
                </tr>
              </thead>
              <tbody>
                {
                  table.map(item => (
                    <tr key={item.id}>
                      <td className="td" style={{ color: 'green', fontWeight: 'bold' }}>{item.nome}</td>
                      <td className="td" style={{ color: 'green', fontWeight: 'bold' }} id='total'>{item.total}</td>
                      <td className="td">
                        <button className="inserir" onClick={() => { handleInsert(item.total) }} style={{ color: 'white', backgroundColor: 'orange', border: 'none', borderRadius: '5px' }}>Inserir:</button>
                        <button className="excluir" onClick={() => { DeleteEntradas(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                      </td>
                    </tr>
                  ))
                }


              </tbody>

            </table>
            <table className="table" id="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '30%', margin: '0 120px' }} >
              <thead>
                <tr>
                  <th className="th" scope="col">Nome:</th>
                  <th className="th" scope="col">Total:</th>
                  <th className="th" scope="col">Ação:</th>
                </tr>
              </thead>
              <tbody>
                {
                  table2.map(item => (
                    <tr key={item.id}>
                      <td className="td" style={{ color: 'red', fontWeight: 'bold' }}>{item.nome}</td>
                      <td className="td" style={{ color: 'red', fontWeight: 'bold' }}>{item.total}</td>
                      <td className="td">
                        <button className="excluir" onClick={() => { DeleteSaidas(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                      </td>
                    </tr>
                  ))
                }


              </tbody>

            </table>

          </div><br />
          <div className='d-flex'>
            <button className='btn order rounded-0' onClick={DeleteAllInputs} style={{ width: 120, fontSize: '15px', backgroundColor: 'red', color: 'white', margin: '0 0px' }} >Excluir Tudo:</button>
            <button className='btn order rounded-0' onClick={DeleteAllOutputs} style={{ width: 120, fontSize: '15px', backgroundColor: 'red', color: 'white', margin: '0 305px' }} >Excluir Tudo:</button>

          </div>


        </form><br />





      </div><br />
      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'gray', color: 'white', textAlign: 'center', zIndex: 1000, height: '30px' }}>
        <p className="fw-bolder text-white" style={{ marginTop: '-10px' }}>&copy; Multicompany Solutions</p>
      </footer>


    </div>


  )
}

export default CadResultado