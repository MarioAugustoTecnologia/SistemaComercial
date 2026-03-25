import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';

const Usuarios = () => {


    const [usuariodata, setUsuariodata] = useState([])


    useEffect(() => {
        fetch("https://sistemacomercial-fv5g.onrender.com/usuarios").then((res) => {

            return res.json()

        }).then((resp) => {

            setUsuariodata(resp)

        }).catch((err) => {
            console.log(err.message)
        })
    }, [])


    const navigate = useNavigate()



    const LoadEdit = (id) => {
        navigate("/usuarios/editar/" + id);
    }

    const handleDelete = (id) => {

        Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
        }).then((result) => {

            if (result.isConfirmed) {

                fetch("https://sistemacomercial-fv5g.onrender.com/usuarios/" + id, {

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


    const logout = () => {
        localStorage.clear()
        console.clear();

    }


    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">

                <div className="main-wrapper">

                    <nav class="sidebar bg-secondary" style={{ width: '200px', height: 1000 }}>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">
                            <li className="w-100">
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
                 

                </div><br /><br />
                   
            </div>           
              
                <div className="container" style={{ display: 'flex', margin: '0 230px',  marginTop:'-850px' }}>


                    <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', marginTop: '-1600px', width: '400px' }} id="table">

                        <thead>
                            <tr>
                                <th className="th" scope="col">Id:</th>
                                <th className="th" scope="col" >Nome:</th>
                                <th className="th" scope="col" >Categoria:</th>
                                <th className="th" scope="col">Ação:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariodata &&
                                usuariodata.map(item => (
                                    <tr key={item.id}>
                                        <td className="td">{item.cod}</td>
                                        <td className="td">{item.id}</td>
                                        <td className="td">{item.categoria}</td>
                                        <td>
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
                 
            </div>

    )
}

export default Usuarios