import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EntradasNumero = () => {


    const [vendanumero, setVendaNumero] = useState([]);
    const [buscanumero, setBuscaNumero] = React.useState("")

    var table = vendanumero.filter(item => item.vendan.includes(buscanumero))


    useEffect(() => {

        fetch("https://sistemacomercial-fv5g.onrender.com/vendas").then((res) => {

            return res.json()

        }).then((resp) => {

            setVendaNumero(resp)

        }).catch((err) => {
            console.log(err.message)
        })

    }, [])

    const [formapag, formapagchange] = useState("")
    const [mes, meschange] = useState("")
    const [frete, fretechange] = useState("")
    const [parcelamento, parcelamentochange] = useState("")
    const [parcelan, parcelanchange] = useState("")


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
            document.getElementById('vendan').style.borderColor = 'red';

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
            const nome = 'Total da venda nº:' + document.getElementById('vendan').value;
            document.getElementById('total').value = total;
            document.getElementById('nome').value = nome;
            document.getElementById('totalvenda').innerHTML = "R$" + total;
            document.getElementById('total').style.borderColor = 'gainsboro'
            document.getElementById('nome').style.borderColor = 'gainsboro'
            document.getElementById('vp').value = total;

        }
    }


    const isValidate2 = () => {

        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"

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

    function desconto() {

        if (isValidate2()) {

            var total = document.getElementById('total').value;
            var desc = document.getElementById('desconto').value;

            const desconto = parseFloat(desc * total).toFixed(2);
            console.log(desconto)
            const novototal = total - desconto;
            document.getElementById('td').value = (novototal).toFixed(2);
            document.getElementById('vd').value = desconto;
            document.getElementById('desconto').value = (desc * 100).toFixed(2) + '%';
            document.getElementById('totald').innerHTML = "R$" + novototal.toFixed(2)
            document.getElementById('vp').value = (novototal).toFixed(2);

        }
    }

    function Troco() {


        if (document.getElementById('vp').value === "" || document.getElementById('vp').value === null) {
            toast.warning('Campo Valor Pago vazio !')
            document.getElementById('vp').style.borderColor = 'Red'

        } else {
            if (document.getElementById('td').value !== "") {

                const troco = parseFloat(document.getElementById('vp').value) - parseFloat(document.getElementById('td').value)
                document.getElementById('troco').value = troco.toFixed(2)
            } else {

                const troco = parseFloat(document.getElementById('vp').value) - parseFloat(document.getElementById('total').value)
                document.getElementById('troco').value = troco.toFixed(2)

            }


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

        if (document.getElementById('vp').value === null || document.getElementById('vp').value === '') {
            document.getElementById('vp').style.borderColor = 'red';
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


            if (parcelamento === "" || parcelamento === null && parcelan === "" || parcelan === null) {

                if (document.getElementById('desconto').value !== "" && document.getElementById('td').value !== '' && document.getElementById('vd').value !== '') {

                    const total = parseFloat(document.getElementById('total').value).toFixed(2);
                    const nome = document.getElementById('nome').value;
                    const totaldesc = parseFloat(document.getElementById('td').value).toFixed(2);
                    const vendan = document.getElementById('vendan').value;
                    const valorpagto = parseFloat(document.getElementById('vp').value).toFixed(2);
                    const desconto = document.getElementById('desconto').value;
                    const valordesc = parseFloat(document.getElementById('vd').value).toFixed(2);
                    const data_cad = formataData();
                    const vp = 0;

                    if (valorpagto > totaldesc) {

                        const troco = document.getElementById('troco').value;

                        const cadobj = { vendan, total, nome, totaldesc, valorpagto, desconto, valordesc, mes, formapag, troco, data_cad, vp, frete }

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

                                    window.location.reload();

                                }).catch((err) => {
                                    toast.error('Erro ! :' + err.message)
                                })

                            } else if (result.isDenied) {
                                Swal.fire("Nada salvo", "", "info");
                            }

                        });

                    } else
                        if (valorpagto === totaldesc) {

                            const cadobj = { vendan, total, nome, totaldesc, valorpagto, desconto, valordesc, mes, formapag, data_cad, vp, frete }

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

                    const total = parseFloat(document.getElementById('total').value).toFixed(2);
                    const nome = document.getElementById('nome').value;
                    const vendan = document.getElementById('vendan').value;
                    const valorpagto = parseFloat(document.getElementById('vp').value).toFixed(2);
                    const data_cad = formataData();
                    const vp = 0;

                    if (valorpagto > total) {

                        const troco = document.getElementById('troco').value;

                        const cadobj = { vendan, total, nome, valorpagto, mes, formapag, troco, data_cad, vp, frete }

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
                                    window.location.reload();

                                }).catch((err) => {
                                    toast.error('Erro ! :' + err.message)
                                })

                            } else if (result.isDenied) {
                                Swal.fire("Nada salvo", "", "info");
                            }

                        });

                    } else
                        if (valorpagto === total) {


                            const cadobj = { vendan, total, nome, valorpagto, mes, formapag, data_cad, vp, frete }

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

            } else {

                const vendan = document.getElementById('vendan').value
                const nome = document.getElementById('nome').value;
                const total = parseFloat(document.getElementById('total').value).toFixed(2);
                const parcelas = document.getElementById("parcelas").value;
                const formapag = document.getElementById('formapag').value
                const valorpagto = (total / parcelas).toFixed(2);
                const data_cad = formataData()
                const vp = 0;

                const cadobj = { vendan, nome, total, parcelamento, parcelan, formapag, valorpagto, mes, data_cad, vp, frete }

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


    function MudaCorCampo() {
        document.getElementById('vendan').style.borderColor = 'Gainsboro'

    }

    function MudaCorDesc() {
        document.getElementById('desconto').style.borderColor = 'Gainsboro'

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

    function MudaCorParcelamento() {
        document.getElementById('parcelamento').style.borderColor = 'Gainsboro'

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
                        <label htmlFor="Numero" className="Numero" style={{ fontFamily: 'arial', fontWeight: 'bold' }}>Buscar Venda nº:</label><br />
                        <input type="search" autoFocus='true' onKeyUp={MudaCorCampo} className="form-control rounded-0" value={buscanumero} onChange={(e) => setBuscaNumero(e.target.value)} style={{ fontFamily: 'arial', width: '100px', fontWeight: 'bold', color: 'navy', padding: '2px', fontSize: '19px' }} id="vendan" />
                        <Link to="/entradas" className="btn btn-success rounded-0" style={{ width: '140px', height: '37px', margin: '0 150px', marginTop: '-98px' }}>Voltar:</Link>
                        <Link to="/entradas/ultima" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'blue', margin: '0 -120px', marginTop: '-98px', height: '36px' }}>Próxima Venda:</Link>

                        <div className="d-flex" style={{marginTop:'-23px'}}>

                            <strong style={{ margin: '0 0px', fontSize: '30px' }}>Total:</strong>
                            <strong><span id="totalvenda" style={{ color: 'LimeGreen', margin: '0 10px', fontSize: '30px' }}></span></strong>
                            <strong style={{ margin: '0 70px', fontSize: '30px' }}>Total c/ Desconto:</strong>
                            <strong><span id="totald" style={{ color: 'Crimson', margin: '0 -60px', fontSize: '30px' }}></span></strong>

                        </div>

                    </div><br /><br />
                    <div className="bg-white p-4 rounded border-none" style={{ margin: '0 100px', marginTop:'-60px' }}>

                        <label htmlFor="total" style={{ fontFamily: 'arial', fontWeight: 'bold' }} >Total:</label>
                        <label htmlFor='nome' style={{ margin: '0 110px', marginTop: '-50px', fontWeight: 'bold' }}>Nome:</label>
                        <label htmlFor='td' style={{ margin: '0 50px', marginTop: '-50px', fontWeight: 'bold' }}>Total c/Desconto:</label>
                        <label htmlFor='desconto' style={{ margin: '0 -0px', marginTop: '-50px', fontWeight: 'bold' }}>Desconto:</label>
                        <label htmlFor='vd' style={{ margin: '0 50px', marginTop: '-20px', fontWeight: 'bold' }}>Valor Desconto:</label><br />
                        <input type="decimal" className='form-control rounded-0' style={{ width: '9%', height: '42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="total" />
                        <input type="text" className='form-control rounded-0' style={{ width: '14%', height: '42px', margin: '0 150px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '15px' }} id="nome" />
                        <input type="decimal" className='form-control rounded-0' style={{ width: '10%', height: '42px', margin: '0 365px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="td" />
                        <input type="decimal" className="form-control rounded-0" style={{ width: '8%', height: '42px', margin: '0 545px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="desconto" onKeyDown={MudaCorDesc} />
                        <input type="decimal" className="form-control rounded-0" style={{ width: '10%', height: '42px', margin: '0 670px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="vd" /> <br />

                        <label htmlFor="valorpag" style={{ fontFamily: 'arial', fontWeight: 'bold' }} >Valor Pago:</label>
                        <label htmlFor="formapag" style={{ fontFamily: 'arial', margin: '0 90px', fontWeight: 'bold' }} >Forma Paga:</label>
                        <label htmlFor="troco" style={{ fontFamily: 'arial', margin: '0 -25px', fontWeight: 'bold' }} >Troco:</label>


                        <input type="decimal" onKeyDown={MudaCorVp} className="form-control rounded-0" style={{ width: '10%', height: '42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="vp" />
                        <select className="form-control rounded-0" onClick={MudaCorForma} value={formapag} onChange={e => formapagchange(e.target.value)} style={{ width: '10%', height: '42px', margin: '0 170px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} name='formapag' id='formapag' >
                            <option value=""></option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Pix">Pix</option>
                            <option value="Débito">Débito</option>
                            <option value="Crédito">Crédito</option>
                            <option value="Boleto">Boleto</option>
                        </select>
                        <input type="decimal" className="form-control rounded-0" style={{ width: '6%', height: '42px', margin: '0 340px', marginTop: '-42px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="troco" />
                        <br />
                        <div className="d-flex">
                            <label htmlFor="" style={{ fontFamily: 'arial', margin: '', fontWeight: 'bold' }} >Parcelamento:</label>
                            <label htmlFor="" style={{ fontFamily: 'arial', margin: '', fontWeight: 'bold', margin: '0 70px' }} >Parcela:</label>
                            <label htmlFor="" style={{ fontFamily: 'arial', margin: '', fontWeight: 'bold', margin: '0 27px' }} >Parcelas:</label>
                        </div>
                        <div className="d-flex">
                            <select className="form-control rounded-0" value={parcelamento} onChange={e => parcelamentochange(e.target.value)} style={{ width: '10%', height: '42px', fontSize: '17px', fontWeight: 'bold', color: 'navy' }} onSelect={MudaCorParcelamento} id="parcelamento" >
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
                            <select className="form-control rounded-0" value={parcelan} onChange={e => parcelanchange(e.target.value)} style={{ width: '10%', height: '42px', fontSize: '20px', fontWeight: 'bold', color: 'navy', margin: '0 40px' }} onSelect={MudaCorParcelan} id="parcelan" >
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
                            <input type="number" className="form-control rounded-0" style={{ fontSize: '20px', width: 100, margin: '0 -12px', fontWeight: 'bold', color: 'navy' }} id="parcelas" />
                        </div><br />

                        <label htmlFor="mes" style={{ fontFamily: 'arial', fontWeight: 'bold' }} >Mes:</label>

                        <label htmlFor="frete" style={{ fontFamily: 'arial', margin: '0 170px', fontWeight: 'bold' }} >Frete:</label>
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
                        <input type="decimal" className="form-control rounded-0" value={frete} onChange={e => fretechange(e.target.value)} style={{ width: 80, margin: '0 200px', marginTop: '-40px', fontWeight: 'bold', color: 'navy', fontSize: '19px' }} id="frete" /><br />

                        <button type="submit" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'green', width: 120, height: '37px', marginTop:'-8px' }}>Concluir</button>
                        <ToastContainer />

                    </div>
                </form>
                <div className="mt-3" style={{ margin: '0 105px' }}>
                    <table className="table" id="table" style={{ margin: '0 -1600px', fontFamily: 'arial', width: 3000, marginTop: '-450px' }}>
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
            <div className="d-flex" style={{ margin: '0 300px', width: '1000px' }}>
                <button type="button" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'blue', margin: '', height: '37px' }} onClick={desconto}>Total c/Desconto:</button>
                <button type="button" className="btn rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '', width: 120, height: '37px' }} onClick={Troco}>Troco:</button>
                <button type="button" onClick={somar} className="btn rounded-0" style={{ color: 'white', backgroundColor: 'gray', margin: '0', height: '37px' }}>Total Venda:</button>
                <Link to="/entradas/qrcode" className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'DarkRed', margin: '0 px', width: 112, height: '37px' }}>QrCode:</Link>

            </div><br />
            <br /><br /><br /><br />

            <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', color: 'white', textAlign: 'center', zIndex: 1000 }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
            </footer>



        </div>

    )
}

export default EntradasNumero