import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const ComprasNumero = () => {


    const [compranumero, setCompraNumero] = useState([]);
    const [buscanumero, setBuscaNumero] = React.useState("")

    var table = compranumero.filter(item => item.compran.includes(buscanumero))


    useEffect(() => {

        fetch("https://sistemacomercial-fv5g.onrender.com/compras").then((res) => {

            return res.json()

        }).then((resp) => {

            setCompraNumero(resp)

        }).catch((err) => {
            console.log(err.message)
        })

    }, [])


    const [forname, fornamechange] = useState([])

    useEffect(() => {
        fetch("https://sistemacomercial-fv5g.onrender.com/fornecedor").then((res) => {

            return res.json()

        }).then((resp) => {

            fornamechange(resp)

        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const [values, setValues] = useState({
        id: ''
    })

    const [formapag, formapagchange] = useState("")
    const [parcelamento, parcelamentochange] = useState("")
    const [parcelan, parcelanchange] = useState("")
    const [mes, meschange] = useState("")


    const handleDelete = (id) => {

        Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
        }).then((result) => {

            if (result.isConfirmed) {

                fetch("https://sistemacomercial-fv5g.onrender.com/compras/" + id, {

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

    const navigate = useNavigate();

    const handleEdit = (id) => {

        navigate("/compras/numero/editar/" + id);

    }

    function formataData() {
        let data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'),
            ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function somar() {

        if (buscanumero === "" || buscanumero === null) {
            toast.warning('Campo busca por número vazio !')
            document.getElementById('compran').style.borderColor = 'red';

        }
        else {
            let valores = [];

            table.map(item => {
                valores.push(item.total)
            })
            const soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
                return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
            })

            const total = parseFloat(soma).toFixed(2);
            const nome = 'Total da compra nº:' + document.getElementById('compran').value;
            document.getElementById('total').value = total;
            document.getElementById('nome').value = nome;
            document.getElementById('totalcompra').innerHTML = "R$" + total;
            document.getElementById('total').style.borderColor = 'gainsboro'
            document.getElementById('nome').style.borderColor = 'gainsboro'


        }
    }


    function TotalFrete() {

        if (document.getElementById('frete').value == "") {
            toast.warning('Campo frete vazio ! ')
            document.getElementById('frete').style.borderColor = 'Red'

        } else {

            const tf = parseFloat(document.getElementById('total').value) + parseFloat(document.getElementById('frete').value)
            document.getElementById('tf').value = tf.toFixed(2)
            document.getElementById('totalf').innerHTML = "R$" + tf.toFixed(2)
            document.getElementById('tf').style.borderColor = 'gainsboro'
            document.getElementById('vp').value = tf.toFixed(2)

        }

    }


    function Troco() {

        if (document.getElementById('vp').value === "" || document.getElementById('vp').value === null) {
            toast.warning('Campo Valor Pago vazio !')
            document.getElementById('vp').style.borderColor = 'Red'
        } else {

            const troco = parseFloat(document.getElementById('vp').value) - parseFloat(document.getElementById('tf').value)
            document.getElementById('troco').value = troco.toFixed(2)


        }

    }

    const isValidate = () => {
        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"


        if (document.getElementById('total').value === null || document.getElementById('total').value === '') {
            document.getElementById('total').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (document.getElementById('nome').value === null || document.getElementById('nome').value === '') {
            document.getElementById('nome').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }
        if (document.getElementById('tf').value === null || document.getElementById('tf').value === '') {
            document.getElementById('tf').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (document.getElementById('forname').value === null || document.getElementById('forname').value === '') {
            document.getElementById('forname').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }
        if (document.getElementById('frete').value === null || document.getElementById('frete').value === '') {
            document.getElementById('frete').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (mes === null || mes === '') {
            document.getElementById('mes').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }
        if (formapag === null || formapag === '') {
            document.getElementById('formapag').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (!isproceed) {
            toast.warning(errormessage)
        }

        return isproceed
    }



    const concluir = (e) => {

        e.preventDefault();

        if (isValidate()) {

            const parcelas = document.getElementById('parcelas').value;

            if (parcelamento === "" || parcelamento === null && parcelan === "" || parcelan === null && parcelas === "" || parcelas === null) {

                const data_cad = formataData();
                const total = document.getElementById('total').value;
                const nome = document.getElementById('nome').value;
                const totalfrete = document.getElementById('tf').value;
                const vf = parseFloat(document.getElementById('frete').value).toFixed(2);
                const fornecedor = document.getElementById('forname').value;
                const compran = document.getElementById('compran').value;
                const valorpagto = parseFloat(document.getElementById('vp').value).toFixed(2);
                const vp = 0;

                if (valorpagto > totalfrete) {

                    const troco = document.getElementById('troco').value;


                    const cadobj = { compran, nome, total, data_cad, formapag, mes, fornecedor, troco, valorpagto, totalfrete, vf, vp }

                    Swal.fire({
                        title: "Deseja salvar ?",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Salvar",
                        denyButtonText: `Não salvar`
                    }).then((result) => {

                        if (result.isConfirmed) {

                            fetch("https://sistemacomercial-fv5g.onrender.com/compras", {
                                method: "POST",
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify(cadobj)
                            }).then((res) => {
                                window.location.reload();

                            }).catch((err) => {
                                toast.error('Erro ! :' + err.message)
                            })

                        } else if (result.isDenied) {
                            Swal.fire("Nada salvo", "", "info");
                        }


                    });

                } else
                    if (valorpagto === totalfrete) {


                        const cadobj = { compran, nome, total, data_cad, formapag, mes, fornecedor, valorpagto, totalfrete, vf, vp }

                        Swal.fire({
                            title: "Deseja salvar ?",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Salvar",
                            denyButtonText: `Não salvar`
                        }).then((result) => {

                            if (result.isConfirmed) {

                                fetch("https://sistemacomercial-fv5g.onrender.com/compras", {
                                    method: "POST",
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify(cadobj)
                                }).then((res) => {
                                    window.location.reload();

                                }).catch((err) => {
                                    toast.error('Erro ! :' + err.message)
                                })

                            } else if (result.isDenied) {
                                Swal.fire("Nada salvo", "", "info");
                            }

                        });

                    }

            } else {

                const compran = document.getElementById('compran').value
                const nome = document.getElementById('nome').value;
                const data_cad = formataData()
                const fornecedor = document.getElementById('forname').value;
                const total = document.getElementById('total').value;
                const totalfrete = document.getElementById('tf').value;
                const vf = parseFloat(document.getElementById('frete').value).toFixed(2);
                const parcelas = document.getElementById("parcelas").value;
                const formapag = document.getElementById('formapag').value
                const valorpagto = (totalfrete / parcelas).toFixed(2);
                const vp = 0;

                const cadobj = { compran, nome, total, data_cad, valorpagto, formapag, parcelamento, parcelan, mes, totalfrete, vf, vp, fornecedor }

                Swal.fire({
                    title: "Deseja salvar ?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Salvar",
                    denyButtonText: `Não salvar`
                }).then((result) => {

                    if (result.isConfirmed) {

                        fetch("https://sistemacomercial-fv5g.onrender.com/compras", {
                            method: "POST",
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(cadobj)
                        }).then((res) => {
                            window.location.reload();

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


    function GerarUltima() {

        if (buscanumero === "" || buscanumero === null) {
            toast.warning('Campo busca por número vazio !')
            document.getElementById('numero').style.borderColor = 'red';

        }
        else {
            const numero = buscanumero;
            const register = { numero }

            fetch("https://sistemacomercial-fv5g.onrender.com/compraatual/", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(register)
            }).then((res) => {
                //window.location.reload();
                toast.success('Atualizado com Sucesso !')

            }).catch((err) => {
                toast.error('Erro ! :' + err.message)
            })
        }
    }

    function MudaCorCampo() {
        document.getElementById('compran').style.borderColor = 'Gainsboro'

    }

    function MudaCorFrete() {
        document.getElementById('frete').style.borderColor = 'Gainsboro'

    }

    function MudaCorForma() {
        document.getElementById('formapag').style.borderColor = 'Gainsboro'

    }

    function MudaCorVp() {
        document.getElementById('vp').style.borderColor = 'Gainsboro'

    }
    function MudaCorMes() {
        document.getElementById('mes').style.borderColor = 'Gainsboro'

    }
    function MudaCorFornecedor() {
        document.getElementById('forname').style.borderColor = 'Gainsboro'

    }
    function MudaCorParcelamento() {
        document.getElementById('parcelamento').style.borderColor = 'Gainsboro'

    }
    function MudaCorParcelas() {
        document.getElementById('parcelas').style.borderColor = 'Gainsboro'

    }
    function MudaCorParcelan() {
        document.getElementById('parcelan').style.borderColor = 'Gainsboro'

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

                <form action='' style={{ marginTop: '-950px' }} onSubmit={concluir}>
                    <div className="mb3" style={{ margin: '0 100px' }}>
                        <label htmlFor="Numero" className="Numero" style={{ fontFamily: 'arial', fontWeight: 'bold' }}>Buscar Compra nº:</label><br />
                        <input type="search" autoFocus='true' onKeyUp={MudaCorCampo} className="form-control rounded-0" value={buscanumero} onChange={(e) => setBuscaNumero(e.target.value)} style={{ fontFamily: 'arial', width: '100px', fontWeight: 'bold', color: 'navy', padding: '2px', fontSize: '19px' }} id="vendan" />
                        <Link to="/compras" className="btn btn-success rounded-0" style={{ width: '140px', height: '37px', margin: '0 150px', marginTop: '-98px' }}>Voltar:</Link>
                        <Link to="/compras/ultima" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'blue', margin: '0 -120px', marginTop: '-98px', height: '36px' }}>Próxima Compra:</Link>

                        <div className="d-flex">

                            <strong style={{ margin: '0 0px', fontSize: '30px' }}>Total:</strong>
                            <strong><span id="totalvenda" style={{ color: 'LimeGreen', margin: '0 10px', fontSize: '30px' }}></span></strong>
                            <strong style={{ margin: '0 70px', fontSize: '30px' }}>Total c/ Frete:</strong>
                            <strong><span id="totalf" style={{ color: 'Crimson', margin: '0 -60px', fontSize: '30px' }}></span></strong>

                        </div>

                    </div><br />
                    <div className="bg-white p-4 rounded border-none" style={{ margin: '0 100px' }}>

                        <label htmlFor="total" style={{ fontFamily: 'arial', fontWeight: 'bold' }} >Total:</label>
                        <label htmlFor='nome' style={{ margin: '0 90px', marginTop: '-50px', fontWeight: 'bold' }}>Nome:</label>
                        <label htmlFor='tf' style={{ margin: '0 80px', marginTop: '-50px', fontWeight: 'bold' }}>Total c/Frete:</label>
                        <label htmlFor='frete' style={{ margin: '0 -25px', marginTop: '-50px', fontWeight: 'bold' }}>Frete:</label>
                        <input type="decimal" className='form-control rounded-0' style={{ width: '9%', height: '42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="total" />
                        <input type="text" className='form-control rounded-0' style={{ width: '18%', height: '42px', margin: '0 130px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '15px' }} id="nome" />
                        <input type="decimal" className='form-control rounded-0' style={{ width: '10%', height: '42px', margin: '0 358px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="tf" />
                        <input type="decimal" className="form-control rounded-0" style={{ width: '8%', height: '42px', margin: '0 505px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="frete" />
                        <br />

                        <label htmlFor="valorpag" style={{ fontFamily: 'arial', fontWeight: 'bold' }} >Valor Pago:</label>
                        <label htmlFor="formapag" style={{ fontFamily: 'arial', margin: '0 46px', fontWeight: 'bold' }} >Forma Paga:</label>
                        <label htmlFor="troco" style={{ fontFamily: 'arial', margin: '0 0px', fontWeight: 'bold' }} >Troco:</label>
                        <label htmlFor="troco" style={{ fontFamily: 'arial', margin: '0 100px', fontWeight: 'bold' }} >Parcelamento:</label>
                        <label htmlFor="troco" style={{ fontFamily: 'arial', margin: '0 -52px', fontWeight: 'bold' }} >Parcela:</label>

                        <input type="decimal" onKeyDown={MudaCorVp} className="form-control rounded-0" style={{ width: '10%', height: '42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="vp" />
                        <select className="form-control rounded-0" onClick={MudaCorForma} value={formapag} onChange={e => formapagchange(e.target.value)} style={{ width: '10%', height: '42px', margin: '0 133px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} name='formapag' id='formapag' >
                            <option value=""></option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Pix">Pix</option>
                            <option value="Débito">Débito</option>
                            <option value="Crédito">Crédito</option>
                            <option value="Boleto">Boleto</option>
                        </select>
                        <input type="decimal" className="form-control rounded-0" style={{ width: '10%', height: '42px', margin: '0 280px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="troco" />
                        <select className="form-control rounded-0" value={parcelamento} onChange={e => parcelamentochange(e.target.value)} style={{ width: '10%', height: '42px', fontSize: '17px', margin: '0 428px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} onSelect={MudaCorParcelamento} id="parcelamento" >
                            <option value=""></option>
                            <option value="2x">2x</option>
                            <option value="3x">3x</option>
                            <option value="4x">4x</option>
                            <option value="5x">5x</option>
                            <option value="6x">6x</option>
                            <option value="7x">7x</option>
                            <option value="8x">8x</option>
                            <option value="9x">9x</option>
                            <option value="10x">10x</option>
                            <option value="11x">11x</option>
                            <option value="12x">12x</option>
                        </select>
                        <select className="form-control rounded-0" value={parcelan} onChange={e => parcelanchange(e.target.value)} style={{ width: '10%', height: '42px', fontSize: '20px', margin: '0 580px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} onSelect={MudaCorParcelan} id="parcelan" >
                            <option value=""></option>
                            <option value="1ª">1ª</option>
                            <option value="2ª">2ª</option>
                            <option value="3ª">3ª</option>
                            <option value="4ª">4ª</option>
                            <option value="5ª">5ª</option>
                            <option value="6ª">6ª</option>
                            <option value="7ª">7ª</option>
                            <option value="8ª">8ª</option>
                            <option value="9ª">9ª</option>
                            <option value="10ª">10ª</option>
                            <option value="11ª">11ª</option>
                            <option value="12ª">12ª</option>
                        </select>
                        <br />

                        <label htmlFor="mes" style={{ fontFamily: 'arial', fontWeight: 'bold' }} >Mes:</label>

                        <label htmlFor="frete" style={{ fontFamily: 'arial', margin: '0 140px', fontWeight: 'bold' }} >Fornecedor:</label>
                        <label htmlFor="parcelas" style={{ fontFamily: 'arial', margin: '0 -70px', fontWeight: 'bold' }} >Parcelas:</label>
                        <select onClick={MudaCorMes} style={{ width: 150, fontWeight: 'bold', color: 'navy', fontSize: '19px' }} name='mes' id='mes' className='form-select rounded-0' value={mes} onChange={e => meschange(e.target.value)}>
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
                        <select style={{ fontSize: '17px', width: 150, margin: '0 170px', marginTop: '-40px', fontWeight: 'bold', color: 'navy' }} id='forname' className='form-select rounded-0' onChange={(e) => setValues({ ...values, id: e.target.value })} onSelect={MudaCorFornecedor} >
                            <option></option>
                            {
                                forname.map(val => {
                                    return <option value={val.nome}>{val.nome}</option>
                                })
                            }
                        </select>
                        <input type="number" className="form-control rounded-0" style={{ fontSize: '17px', width: 100, margin: '0 340px', marginTop: '-40px', fontWeight: 'bold', color: 'navy' }} onSelect={MudaCorParcelas} id="parcelas" /><br />
                        <div className="d-flex">
                            <button type="submit" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'green', width: 120, height: '37px', marginTop:'-9px' }}>Concluir</button>
                            <button type="button" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'blue', margin: '', height: '37px', marginTop:'-9px' }}>Total c/Frete:</button>
                            <button type="button" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '', width: 120, height: '37px', marginTop:'-9px' }} onClick={Troco}>Troco:</button>
                            <button type="button" onClick={somar} className="btn rounded-0" style={{ color: 'white', backgroundColor: 'gray', margin: '0', height: '37px', marginTop:'-9px' }}>Total Compra:</button>

                        </div>
                        <ToastContainer />

                    </div>
                </form>

                <div className="mt-3" style={{ margin: '0 105px' }}>
                    <table className="table" id="table" style={{ margin: '0 -1440px', fontFamily: 'arial', width: 3000, marginTop: '-450px' }}>
                        <thead>
                            <tr>
                                <th className="th" scope="col">Id:</th>
                                <th className="th" scope="col">Compra nº:</th>
                                <th className="th" scope="col">Nome:</th>
                                <th className="th" scope="col">Qtd:</th>
                                <th className="th" scope="col">Custo:</th>
                                <th className="th" scope="col">Total:</th>
                                <th className="th" scope="col">Total c/Frete:</th>
                                <th className="th" scope="col">Saidas:</th>
                                <th className="th" scope="col">Troco:</th>
                                <th className="th" scope="col">Frete:</th>
                                <th className="th" scope="col">Forma Paga:</th>
                                <th className="th" scope="col">Parcelas:</th>
                                <th className="th" scope="col">Parcela:</th>
                                <th className="th" scope="col">Mês:</th>
                                <th className="th" scope="col">Data de Cadastro:</th>
                                <th className="th" scope="col">Fornecedor:</th>
                                <th className="th" scope="col">Ação:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                table.map(item => (
                                    <tr key={item.id}>
                                        <td className="td">{item.id}</td>
                                        <td className="td">{item.compran}</td>
                                        <td className="td">{item.nome}</td>
                                        <td className="td">{item.qtd}</td>
                                        <td className="td">{item.custo}</td>
                                        <td className="td">{item.total}</td>
                                        <td className="td">{item.totalfrete}</td>
                                        <td className="td">{item.valorpagto}</td>
                                        <td className="td">{item.troco}</td>
                                        <td className="td">{item.vf}</td>
                                        <td className="td">{item.formapag}</td>
                                        <td className="td">{item.parcelamento}</td>
                                        <td className="td">{item.parcelan}</td>
                                        <td className="td">{item.mes}</td>
                                        <td className="td">{item.data_cad}</td>
                                        <td className="td">{item.fornecedor}</td>
                                        <td className="td">
                                            <button className="editar" onClick={() => { handleEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Atualizar:</button>
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


            <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', color: 'white', textAlign: 'center', zIndex: 1000 }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
            </footer>



        </div>
    )
}

export default ComprasNumero