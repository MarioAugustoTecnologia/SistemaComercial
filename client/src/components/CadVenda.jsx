import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadVenda = () => {

  const { pcod } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod).then((res) => {
      return res.json();
    }).then((resp) => {
      Idchange(resp.id);
      nomechange(resp.nome);
      precochange(resp.preco);
      qtdchange(resp.qtd);

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [id, Idchange] = useState("")
  const [nome, nomechange] = useState("")
  const [preco, precochange] = useState("")
  const [formapag, formapagchange] = useState("")
  const [estoque, qtdchange] = useState("")
  const [quant, quantchange] = useState("")
  const [parcelamento, parcelamentochange] = useState("")
  const [parcela, parcelachange] = useState("")
  const [parcelan, parcelanchange] = useState("")
  const [entradadata, setEntradadata] = useState([])
  const [mesatual, setMesAtual] = useState([])
  const [categoria, setCategoria] = useState('')

  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/atual").then((res) => {

      return res.json()

    }).then((resp) => {

      setEntradadata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])


  useEffect(() => {

    fetch("https://sistemacomercial-fv5g.onrender.com/mesatual").then((res) => {

      return res.json()

    }).then((resp) => {

      setMesAtual(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])

  const isValidate2 = () => {

    let isproceed = true
    let errormessage = "Campo(s) não pode(m) estar vazio  !"

    if (document.getElementById('desconto').value === null || document.getElementById('desconto').value === '') {
      document.getElementById('desconto').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (document.getElementById('total').value === null || document.getElementById('total').value === '') {
      document.getElementById('total').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }

  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"

    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (preco === null || preco === '') {
      document.getElementById('preco').style.borderColor = 'red';
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

  const isValidate3 = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"

    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (preco === null || preco === '') {
      document.getElementById('preco').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (quant === null || quant === '') {
      document.getElementById('quant').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }


  function calcular() {

    if (isValidate3()) {

      const total = (quant * preco).toFixed(2);
      console.log(total)
      document.getElementById('total').value = total;

    }

  }

  function desconto() {

    if (isValidate2()) {

      var total = document.getElementById('total').value;
      var desc = document.getElementById('desconto').value;

      const desconto = parseFloat(desc * total).toFixed(2);
      console.log(desconto)
      const novototal = total - desconto;
      document.getElementById('totaldesc').value = novototal;
      document.getElementById('valordesc').value = desconto;
      document.getElementById('desconto').value = (desc * 100) + '%';
      document.getElementById('valorpago').value = 0;

    }

  }

  function formataData() {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function MudaCorDesc() {
    document.getElementById('desconto').style.borderColor = 'GainsBoro'
  }


  const cadastrar = (e) => {

    e.preventDefault();


    if (isValidate()) {

      if (parcelamento === "" || parcelamento === null && parcela === "" || parcela === null && parcelan === "" || parcelan === null) {

        if (document.getElementById('desconto').value !== "" && document.getElementById('totaldesc').value !== '' && document.getElementById('valorpago').value !== '' && document.getElementById('valordesc').value !== '') {

          const data_cad = formataData();
          var total = parseFloat(document.getElementById('total').value).toFixed(2);
          var totaldesc = parseFloat(document.getElementById('totaldesc').value).toFixed(2)
          var vendan = document.getElementById('vendan').innerHTML;
          var mes = document.getElementById('mesatual').innerHTML;
          var valorpagto = parseFloat(document.getElementById('valorpago').value).toFixed(2);
          var desconto = document.getElementById('desconto').value;
          var valordesc = parseFloat(document.getElementById('valordesc').value).toFixed(2);
          var vp = valorpagto;

          if (valorpagto > totaldesc) {

            const t = parseFloat((valorpagto - totaldesc).toFixed(2));
            const troco = (t).toFixed(2)
            valorpagto = parseFloat(valorpagto).toFixed(2);

            const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, troco, valorpagto, totaldesc, desconto, valordesc, vp }

            Swal.fire({
              title: "Deseja salvar ?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Salvar",
              denyButtonText: `Não salvar`
            }).then((result) => {

              if (result.isConfirmed) {

                fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
                  method: "POST",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(cadobj)
                }).then((res) => {
                  toast.success('Cadastrado com Sucesso !')

                  function Subtract() {
                    return estoque - quant;
                  }
                  const qtd = Subtract();
                  const edtobj = { id, qtd }

                  fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod, {
                    method: "PATCH",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(edtobj)
                  }).then((res) => {
                    console.log(qtd);

                  }).catch((err) => {
                    toast.error('Erro ! :' + err.message)
                  })

                }).catch((err) => {
                  toast.error('Erro ! :' + err.message)
                })

              } else if (result.isDenied) {
                Swal.fire("Nada salvo", "", "info");
              }
            });

          } else
            if (valorpagto == 0) {

              vp = totaldesc;

              const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, valorpagto, totaldesc, desconto, valordesc, vp }

              if (isValidate()) {

                Swal.fire({
                  title: "Deseja salvar ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Salvar",
                  denyButtonText: `Não salvar`
                }).then((result) => {

                  if (result.isConfirmed) {

                    fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
                      method: "POST",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(cadobj)
                    }).then((res) => {
                      toast.success('Cadastrado com Sucesso !')

                      function Subtract() {
                        return estoque - quant;
                      }
                      const qtd = Subtract();
                      const edtobj = { id, qtd }

                      fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod, {
                        method: "PATCH",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(edtobj)
                      }).then((res) => {
                        console.log(qtd);

                      }).catch((err) => {
                        toast.error('Erro ! :' + err.message)
                      })
                      navigate('/produtos/codigo')
                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })

                  } else if (result.isDenied) {
                    Swal.fire("Nada salvo", "", "info");
                  }
                });

              }

            } else if (valorpagto === totaldesc) {

              vp = totaldesc;

              const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, valorpagto, totaldesc, desconto, valordesc, vp }

              if (isValidate()) {

                Swal.fire({
                  title: "Deseja salvar ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Salvar",
                  denyButtonText: `Não salvar`
                }).then((result) => {

                  if (result.isConfirmed) {

                    fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
                      method: "POST",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(cadobj)
                    }).then((res) => {
                      toast.success('Cadastrado com Sucesso !')

                      function Subtract() {
                        return estoque - quant;
                      }
                      const qtd = Subtract();
                      const edtobj = { id, qtd }

                      fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod, {
                        method: "PATCH",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(edtobj)
                      }).then((res) => {
                        console.log(qtd);

                      }).catch((err) => {
                        toast.error('Erro ! :' + err.message)
                      })

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })

                  } else if (result.isDenied) {
                    Swal.fire("Nada salvo", "", "info");
                  }
                });

              }
            }

        } else
          if (document.getElementById('desconto').value === "" && document.getElementById('totaldesc').value === '' && document.getElementById('valorpago').value !== '' && document.getElementById('valordesc').value === '') {


            const data_cad = formataData();
            var total = parseFloat(document.getElementById('total').value).toFixed(2);
            var vendan = document.getElementById('vendan').innerHTML;
            var mes = document.getElementById('mesatual').innerHTML;
            var valorpagto = parseFloat(document.getElementById('valorpago').value).toFixed(2);
            vp = valorpagto;

            if (valorpagto > total) {

              const t = parseFloat((valorpagto - total).toFixed(2));
              const troco = (t).toFixed(2)
              valorpagto = parseFloat(valorpagto).toFixed(2);

              const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, troco, valorpagto, vp }

              Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`
              }).then((result) => {

                if (result.isConfirmed) {

                  fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cadobj)
                  }).then((res) => {
                    toast.success('Cadastrado com Sucesso !')

                    function Subtract() {
                      return estoque - quant;
                    }
                    const qtd = Subtract();
                    const edtobj = { id, qtd }

                    fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod, {
                      method: "PATCH",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(edtobj)
                    }).then((res) => {
                      console.log(qtd);

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })

                  }).catch((err) => {
                    toast.error('Erro ! :' + err.message)
                  })

                } else if (result.isDenied) {
                  Swal.fire("Nada salvo", "", "info");
                }
              });

            } else
              if (valorpagto === total) {

                const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, valorpagto, vp }

                if (isValidate()) {

                  Swal.fire({
                    title: "Deseja salvar ?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Salvar",
                    denyButtonText: `Não salvar`
                  }).then((result) => {

                    if (result.isConfirmed) {

                      fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
                        method: "POST",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(cadobj)
                      }).then((res) => {
                        toast.success('Cadastrado com Sucesso !')

                        function Subtract() {
                          return estoque - quant;
                        }
                        const qtd = Subtract();
                        const edtobj = { id, qtd }

                        fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod, {
                          method: "PATCH",
                          headers: { 'content-type': 'application/json' },
                          body: JSON.stringify(edtobj)
                        }).then((res) => {
                          console.log(qtd);

                        }).catch((err) => {
                          toast.error('Erro ! :' + err.message)
                        })
                      }).catch((err) => {
                        toast.error('Erro ! :' + err.message)
                      })

                    } else if (result.isDenied) {
                      Swal.fire("Nada salvo", "", "info");
                    }
                  });
                }
              }

          } else if (document.getElementById('desconto').value === "" && document.getElementById('totaldesc').value === '' && document.getElementById('valorpago').value === '' && document.getElementById('valordesc').value === '') {


            var total = parseFloat(document.getElementById('total').value).toFixed(2);
            var vendan = document.getElementById('vendan').innerHTML;
            var mes = document.getElementById('mesatual').innerHTML;
            const data_cad = formataData();
            const valorpagto = 0;
            vp = total;

            const cadobj = { vendan, nome, quant, preco, total, data_cad, mes, valorpagto, vp }

            if (isValidate()) {

              Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`
              }).then((result) => {

                if (result.isConfirmed) {

                  fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cadobj)
                  }).then((res) => {

                    if (categoria === "" || categoria === null) {

                      function Subtract() {
                        return estoque - quant;
                      }
                      const qtd = Subtract();
                      const edtobj = { id, qtd }

                      fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod, {
                        method: "PATCH",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(edtobj)
                      }).then((res) => {
                        console.log(qtd);

                      }).catch((err) => {
                        toast.error('Erro ! :' + err.message)
                      })
                      navigate('/produtos/codigo')

                    } else {
                      navigate('/produtos/codigo')
                    }

                  }).catch((err) => {
                    toast.error('Erro ! :' + err.message)
                  })

                } else if (result.isDenied) {
                  Swal.fire("Nada salvo", "", "info");
                }
              });
            }
          }

      } else {

        var vendan = document.getElementById('vendan').innerHTML;
        var data_cad = formataData()
        var total = parseFloat(document.getElementById('total').value).toFixed(2);
        var parcelas = parcela;
        var valorpagto = (total / parcelas).toFixed(2);
        vp = valorpagto;
        var mes = document.getElementById('mesatual').innerHTML;

        const cadobj = { vendan, nome, quant, preco, total, valorpagto, parcelamento, parcelan, formapag, mes, data_cad, vp }

        if (isValidate()) {

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercial-fv5g.onrender.com/vendas", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')

                function Subtract() {
                  return estoque - quant;
                }
                const qtd = Subtract();
                const edtobj = { id, qtd }

                fetch("https://sistemacomercial-fv5g.onrender.com/produtos/" + pcod, {
                  method: "PATCH",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(edtobj)
                }).then((res) => {
                  console.log(qtd);

                }).catch((err) => {
                  toast.error('Erro ! :' + err.message)
                })

              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })

            } else if (result.isDenied) {
              Swal.fire("Nada salvo", "", "info");
            }
          });

        }
      }

    }

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
      <div className="container" style={{ display: 'flex', margin: '0 130px' }}>

        <form action='' style={{ marginTop: '-1000px' }}>

          <div className='mb-3'>

            <label htmlFor='id' style={{ fontWeight: 'bold', margin: '120px' }}>Venda nº:</label>
            <table className="table" style={{ fontFamily: 'arial', width: '5%', margin: '0 120px', marginTop: '-120px' }}>
              <thead hidden='true'>
                <tr>
                  <th className="th" scope="col" >Id:</th>
                  <th className="th" scope="col">Venda nº:</th>
                </tr>
              </thead>
              <tbody>
                {
                  entradadata.map(item => (
                    <tr key={item.id}>
                      <td className="td" hidden='true'>{item.id}</td>
                      <td className="td" style={{ fontWeight: 'bold', color: 'navy' }} id='vendan'>{item.numero}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div><br />

          <div className='d-flex'>
            <label htmlFor='nome' style={{ margin: '0 120px', fontWeight: 'bold' }}>Nome:</label>
            <label htmlFor='categoria' style={{ margin: '0 170px', fontWeight: 'bold' }}>Categoria:</label>
          </div>
          <div className='d-flex'>
            <input type='text' placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ width: 300, margin: '0 120px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' />
            <select style={{ width: 166, fontWeight: 'bold', color: 'navy', margin: '0 -80px' }} className='form-select rounded-0' value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value=""></option>
              <option value="Transporte">Transporte</option>

            </select>
          </div><br />
          <div className='d-flex'>
            <label htmlFor='qtd' style={{ margin: '0 120px', fontWeight: 'bold' }}>Quantidade:</label>
            <label htmlFor='preco' style={{ margin: '0 -80px', fontWeight: 'bold' }}>Preço:</label>
            <label htmlFor='total' style={{ margin: '0 240px', fontWeight: 'bold' }}>Total:</label>

          </div>
          <div className='d-flex'>
            <input type='number' autoFocus={true} onSelect={mudacorquant} value={quant} onChange={e => quantchange(e.target.value)} style={{ width: 85, margin: '0 120px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='qtd' id='quant' />
            <input type="decimal" value={preco} onChange={e => precochange(e.target.value)} style={{ width: 120, margin: '0 -73px', fontWeight: 'bold', color: 'navy' }} placeholder='Entre com o preço:' className='form-control rounded-0' name='preco' />
            <input type='decimal' style={{ width: 150, margin: '0 160px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='total' id='total' />

          </div><br />
          <div className='d-flex'>
            <label htmlFor='totaldesc' style={{ margin: '0 120px', fontWeight: 'bold' }}>Total c/Desconto:</label>
            <label htmlFor='desconto' style={{ margin: '0 -60px', fontWeight: 'bold' }}>Desconto:</label>

          </div>
          <div className='d-flex'>
            <input type='decimal' style={{ width: 150, margin: '0 120px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='totaldesc' id='totaldesc' />
            <input type='text' onKeyDown={MudaCorDesc} style={{ width: 80, margin: '0 -80px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='desconto' id='desconto' />

          </div><br />
          <div className='d-flex'>
            <label htmlFor='valorpag' style={{ margin: '0 120px', fontWeight: 'bold' }}>Valor Pago:</label>
            <label htmlFor='valordesc' style={{ margin: '0 -60px', fontWeight: 'bold' }}>Valor Desconto:</label>
            <label htmlFor='formapag' style={{ margin: '0 100px', fontWeight: 'bold' }}>Forma de Pagamento:</label>


          </div>
          <div className='d-flex'>
            <input type="decimal" style={{ width: 120, margin: '0 120px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='valorpago' id='valorpago' />
            <input type="decimal" style={{ width: 120, margin: '0 -93px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='valordesc' id='valordesc' />
            <select style={{ width: 130, margin: '0 130px', fontWeight: 'bold', color: 'navy' }} name='formapag' id='formapag' className='form-select rounded-0' value={formapag} onChange={e => formapagchange(e.target.value)}>
              <option value=""></option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
              <option value="Boleto">Boleto</option>
            </select>
          </div><br />
          <div className='mb-3'>
            <label htmlFor='mes' style={{ margin: '0 120px', fontWeight: 'bold' }}>Mes:</label>
            <table className="table" style={{ fontFamily: 'arial', width: '5%', margin: '0 120px', fontWeight: 'bold', color: 'navy' }}>
              <thead hidden='true'>
                <tr>
                  <th className="th" scope="col" >Id:</th>
                  <th className="th" scope="col">Venda nº:</th>
                </tr>
              </thead>
              <tbody>
                {
                  mesatual.map(item => (
                    <tr key={item.id}>
                      <td className="td" hidden='true'>{item.id}</td>
                      <td className="td" style={{ fontWeight: 'bold', color: 'navy', fontSize: '16px' }} id='mesatual'>{item.mes}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div><br />
          <div className='d-flex' style={{ margin: '0 120px' }}>
            <button type='submit' onClick={cadastrar} className='btn btn-success border rounded-0' style={{ width: 100 }}>Cadastrar:</button>
            <button type='button' className='btn btn-primary border rounded-0' onClick={calcular} style={{ width: 100 }}>Total:</button>
            <Link onClick={desconto} className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'Indigo', width: 100 }}>Desconto:</Link>
            <Link to="" className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'DarkRed', width: 100 }}>QrCode:</Link>
            <Link to='/produtos/codigo' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', width: 100 }}>Voltar:</Link>
          </div>
          <ToastContainer />
        </form>
      </div>
      <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', color: 'white', textAlign: 'center', zIndex: 1000 }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
      </footer>
    </div>

  )
}

export default CadVenda