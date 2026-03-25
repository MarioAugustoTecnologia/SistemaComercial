import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import bcrypt from 'bcryptjs';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EditarUsuario = () => {


    const { usuariocod } = useParams()

    //const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("https://sistemacomercial-fv5g.onrender.com/usuarios/" + usuariocod).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            codchange(resp.cod);
            categoriachange(resp.categoria);

        }).catch((err) => {
            console.log(err.message);
        })
    }, []);



    const [id, idchange] = useState("") //=> Nome de usuario obrigatório campo (id)
    const [cod, codchange] = useState("") //=> Representa o registro, qual é o usuario.    
    const [categoria, categoriachange] = useState("")
    const [senha, senhachange] = useState("")
    const [erro, setErro] = useState('');



    const isValidate = () => {
        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"


        if (id === null || id === '') {
            document.getElementById('id').style.borderColor = 'red'
            isproceed = false
            //errormessage += 'Nome:' 
        }
        if (cod === null || cod === '') {
            document.getElementById('cod').style.borderColor = 'red'
            isproceed = false
            //errormessage += 'Nome Completo:' 
        }

        if (categoria === null || categoria === '') {
            document.getElementById('categoria').style.borderColor = 'red'
            isproceed = false
            // errormessage += 'Categoria:' 
        }
        if (senha === null || senha === '') {
            document.getElementById('senha').style.borderColor = 'red'
            isproceed = false
            // errormessage += 'Categoria:' 
        }

        if (!isproceed) {
            toast.warning(errormessage)

        } else {

            return isproceed

        }

    }

    //console.log(datanascimento);


    const editar = (e) => {

        e.preventDefault();

        if (isValidate()) {

            const errosenha = validarsenha(senha);

            if (errosenha) {
                setErro(errosenha);
                console.log('Erro de validação:', errosenha);
            } else {
                const password = senha;
                const hashedPassword = bcrypt.hashSync(password, 10)
                const user = id;

                //window.localStorage.clear('Login', JSON.stringify({user, hashedPassword})) 
                window.localStorage.setItem('Login', JSON.stringify({ user, hashedPassword, categoria }))
                //console.log(hashedPassword)
                const edtobj = { id, cod, hashedPassword, categoria }

                Swal.fire({
                    title: "Deseja salvar ?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Salvar",
                    denyButtonText: `Não Salvar`
                }).then((result) => {

                    if (result.isConfirmed) {
                        fetch("https://sistemacomercial-fv5g.onrender.com/usuarios/" + usuariocod, {
                            method: "PUT",
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(edtobj)
                        }).then((res) => {
                            toast.success('Atualizado com sucesso !')
                            idchange('');
                            codchange('');
                            senhachange('');
                            categoriachange('');


                        }).catch((err) => {
                            toast.error('Erro ! :' + err.message)
                        })
                        //Swal.fire("Salvo!", "", "success");
                    } else if (result.isDenied) {
                        Swal.fire("Nada salvo", "", "info");
                    }
                });

            }
        }

    }


    function MostraNome() {
        document.getElementById('id').style.borderColor = 'GainsBoro';
    }
    function MostraCod() {
        document.getElementById('cod').style.borderColor = 'GainsBoro';
    }

    function MostraSenha() {
        document.getElementById('senha').style.borderColor = 'GainsBoro';
        setErro('')
    }

    function MostraCategoria() {
        document.getElementById('categoria').style.borderColor = 'GainsBoro';
    }




    const logout = () => {
        localStorage.clear()
        console.clear();

    }

    function MostraTexto() {

        var inputPass = document.getElementById('senha');
        var btnshowPass = document.getElementById('mostrasenha')

        if (inputPass.type === 'password') {
            inputPass.setAttribute('type', 'text')
            btnshowPass.classList.replace('bi-eye-fill', 'bi-eye-slash')

        }
        else {
            inputPass.setAttribute('type', 'password')
            btnshowPass.classList.replace('bi-eye-slash', 'bi-eye-fill')

        }
    }

    const validarsenha = (valor) => {

        const senhavalida = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,10}$/


        if (!senhavalida.test(valor)) {
            // Verifica se a string tem pelo menos um espaço no meio
            return 'Senha deve conter: letras maiuscula e minuscula, numeros, caracter especial e de 8 a 10 digitos !';
        }

    }

    const handleKeyPress = (e) => {
        // 48-57 são os códigos ASCII para 0-9
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }

    };


    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">

                <div className="main-wrapper">

                    <nav class="sidebar bg-secondary" style={{ width: '200px', height: 1000 }}>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">

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


                <form action='' onSubmit={editar} style={{marginTop: '-900px'}} >
                    <div className='mb-3'>
                        <label htmlFor='id' style={{ margin: '0 115px', fontWeight: 'bold', fontFamily:'arial', fontSize:'20px', color:'blue' }}>Editar Usuario:</label><br /><br />
                        <label htmlFor='id' style={{ margin: '0 115px', fontWeight: 'bold' }}>Nome:</label>
                        <input onKeyUp={MostraNome} type='text' value={id} onChange={e => idchange(e.target.value)} style={{ fontWeight: 'bold', color: 'navy', width: 150, margin: '0 115px' }} className='form-control rounded-0' name='id' id="id" />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor='cod' style={{ margin: '0 115px', fontWeight: 'bold' }}>Cod:</label>
                        <input type='decimal' onKeyPress={handleKeyPress} onSelect={MostraCod} value={cod} onChange={e => codchange(e.target.value)} style={{ fontWeight: 'bold', color: 'navy', width: 85, margin: '0 115px' }} className='form-control rounded-0' name='cod' id="cod" />

                    </div>

                    <div className='mb-3'>
                        <label htmlFor='senha' style={{ margin: '0 115px', fontWeight: 'bold' }}>Senha:</label>
                        <div className="d-flex">
                            <input type='password' onKeyUp={MostraSenha} value={senha} onChange={e => senhachange(e.target.value)} style={{ width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} placeholder='Entre com a senha:' className='form-control rounded-0' name='senha' id="senha" />
                            <i class="bi bi-eye-fill" id='mostrasenha' style={{ fontSize: 20, margin: '0 -90px' }} onClick={MostraTexto}></i>
                        </div>
                        <center>{erro && <p style={{ color: 'red' }}>{erro}</p>}</center>

                    </div>

                    <div className='mb-3'>
                        <label htmlFor='categoria' className='form-label' style={{ margin: '0 115px', fontWeight: 'bold' }}>
                            Categoria:
                        </label>
                        <select style={{ width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} name='categoria' id='categoria' className='form-select' value={categoria} onChange={e => categoriachange(e.target.value)} onClick={MostraCategoria}>
                            <option value=""></option>
                            <option value="Administrador">Administrador</option>
                            <option value="Vendedor">Vendedor</option>

                        </select>

                    </div>

                    <div className='mb-3'>
                        <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 115px' }} >Atualizar:</button>
                        <Link to='/usuarios' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 -90px', width: 100 }}>Voltar:</Link>
                    </div>
                    <ToastContainer />
                </form>

            </div>


        </div>





    )
}

export default EditarUsuario