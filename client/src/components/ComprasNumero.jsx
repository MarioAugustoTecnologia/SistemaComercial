import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const ComprasNumero = () => {


    const [compranumero, setCompraNumero] = useState([]);
    const [buscanumero, setBuscaNumero] = React.useState("")

    var table = compranumero.filter(item => item.compran.includes(buscanumero))


    useEffect(() => {

        fetch("https://sistemacomercialserver.onrender.com/compras").then((res) => {

            return res.json()

        }).then((resp) => {

            setCompraNumero(resp)

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

                fetch("https://sistemacomercialserver.onrender.com/compras/" + id, {

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
            document.getElementById('numero').style.borderColor = 'red';

        }
        else {
            let valores = [];


            table.map(item => {
                valores.push(item.total)
            })

            let soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
                return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
            })


            //console.log(soma.toFixed(2));    // deixa com apenas 2 casas decimais 
            const nome = 'Total da compra nº:' + document.getElementById('numero').value;
            const total = parseFloat(soma.toFixed(2));
            const data_cad = formataData();
            const custo = 0;
            const compran = document.getElementById('numero').value;
            const troco = 0;
            const valorpag = 0;
            const vf = 0;


            const cadobj = { nome, total, data_cad, custo, compran, troco, valorpag, vf }

            fetch("https://sistemacomercialserver.onrender.com/compras", {
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

    function GerarUltima() {

        if (buscanumero === "" || buscanumero === null) {
            toast.warning('Campo busca por número vazio !')
            document.getElementById('numero').style.borderColor = 'red';

        }
        else {
            const numero = buscanumero;
            const register = { numero }

            fetch("https://sistemacomercialserver.onrender.com/compraatual", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(register)
            }).then((res) => {
                //window.location.reload();
                toast.success('Cadastrado com Sucesso !')

            }).catch((err) => {
                toast.error('Erro ! :' + err.message)
            })




        }

    }

    function MudaCorCampo() {
        document.getElementById('numero').style.borderColor = 'Gainsboro'

    }

    const logout = () => {
        localStorage.clear()
        console.clear();

    }


    return (
        <div className="container-fluid" style={{ fontFamily: 'arial' }}>
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary" style={{ fontFamily: 'arial', fontSize: '19px' }}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to=""
                            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >
                            <span className='fs-5 fw-bolder d-none d-sm-inline'>
                                Opções:
                            </span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/home"
                                    className="nav-link text-white px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Painel:</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/usuarios"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
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
                                    <span className="ms-2 d-none d-sm-inline">
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
                                    <span className="ms-2 d-none d-sm-inline">
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
                                    <span className="ms-2 d-none d-sm-inline">
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
                                    <span className="ms-2 d-none d-sm-inline">
                                        Produtos:
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/fornecedores"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi bi-truck ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
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
                                    <span className="ms-2 d-none d-sm-inline">
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
                                    <span className="ms-2 d-none d-sm-inline">
                                        Resultados:
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100" style={{ margin: "0 7px" }}>
                                <Link
                                    to=""
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i class="bi bi-file-earmark-pdf" style={{ fontSize: '26px' }}></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Orçamentos:
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100" onClick={logout}>
                                <Link to="/"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow text-white" style={{ backgroundColor: 'blue', width: '143%' }}>
                        <h4><strong>Sistema de Gestão Comercial</strong></h4>
                    </div>
                    <Outlet />
                    <div className="px-5 mt-5">
                        <div className="mb3">
                            <label htmlFor="Numero" className="Numero" style={{ fontFamily: 'arial', fontSize: '22px' }}>Busca por numero:</label><br />
                            <input type="search" autoFocus='true' onKeyUp={MudaCorCampo} className="consultanumero" value={buscanumero} onChange={(e) => setBuscaNumero(e.target.value)} style={{ fontFamily: 'arial', fontSize: '22px', width: '100px' }} id="numero" />
                            <Link to="/compras" className="btn btn-success" style={{ fontSize: '18px', width: '140px', margin: '0 50px' }}>Voltar:</Link>
                            <Link onClick={somar} className="btn" style={{ color: 'white', backgroundColor: 'gray', margin: '0 -15px', fontSize: '18px' }}>Total Compra:</Link>
                            <Link onClick={GerarUltima} className="btn" style={{ color: 'white', backgroundColor: 'blue', margin: '0 45px', fontSize: '18px' }}>Próxima Compra:</Link>
                        </div><br />
                        <h4 style={{ textAlign: 'center', color: 'Red', fontSize: '25px', marginRight: '-225px' }}><strong>Compras:</strong></h4>
                        <br />
                        <div className="mt-3">
                            <table className="table" id="table" style={{ margin: '0 -30px', fontFamily: 'arial', fontSize: '20px', width: 2700 }}>
                                <thead>
                                    <tr>
                                        <th className="th" scope="col">Id:</th>
                                        <th className="th" scope="col">Compra nº:</th>
                                        <th className="th" scope="col">Nome:</th>
                                        <th className="th" scope="col">Qtd:</th>
                                        <th className="th" scope="col">Custo:</th>
                                        <th className="th" scope="col">Total Geral:</th>
                                        <th className="th" scope="col">Saidas:</th>
                                        <th className="th" scope="col">Troco:</th>
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
                                                <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.custo)}</td>
                                                <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.total)}</td>
                                                <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.valorpag)}</td>
                                                <td className="td">{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.troco)}</td>
                                                <td className="td">{item.formapag}</td>
                                                <td className="td">{item.parcelamento}</td>
                                                <td className="td">{item.parcelan}</td>
                                                <td className="td">{item.mes}</td>
                                                <td className="td">{item.data_cad}</td>
                                                <td className="td">{item.fornecedor}</td>
                                                <td className="td">
                                                    <button className="editar" onClick={() => { handleEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Concluir:</button>
                                                    <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                                                </td>
                                            </tr>


                                        ))

                                    }

                                </tbody>

                            </table>
                        </div>
                        <br />


                    </div>

                </div>

            </div>
        </div>
    )
}

export default ComprasNumero