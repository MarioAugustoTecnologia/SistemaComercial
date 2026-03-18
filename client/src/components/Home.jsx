
import { Link, Outlet } from "react-router-dom";


//10 => Continuação...

const Home = () => {


  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  return (     

      <div className="container-fluid" >

      <div className="row flex-nowrap">
        <div className="col-auto col-xl-2 px-sm-2 px-0 bg-secondary" style={{ fontFamily: 'arial', fontSize: '18px', width:'px'}} >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >

              <li className="">
                <Link to="/usuarios"

                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Usuarios:
                  </span>
                </Link>
              </li>
              <li className="">
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
              <li className="">
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
              <li className="">
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
              <li className="">
                <Link
                  to="/produtos"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-box-fill ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Produtos e Serviços:
                  </span>
                </Link>
              </li>
              <li className="">
                <Link
                  to="/transportes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi bi-truck-flatbed" style={{ margin: '0 8px' }}></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Transportes:
                  </span>
                </Link>
              </li>
              <li className="">
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
              <li className="">
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
              <li className="">
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
              <li className="" style={{ margin: "0 7px" }}>
                <Link
                  to="/produto/codorc"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi bi-file-earmark-pdf" style={{ fontSize: '26px' }}></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Orçamentos:
                  </span>
                </Link>
              </li>
              <li className="" onClick={logout}>
                <Link
                  to="/"
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
          <div className="p-2 d-flex justify-content-center shadow text-white" style={{ backgroundColor: 'blue', fontFamily: 'arial' }}>
            <h4><strong style={{ fontFamily: 'arial' }}>Sistema de Gestão Comercial</strong></h4>
          </div>
          <Outlet /><br />
          <div className="text-center pb-1" style={{ fontFamily: 'arial' }}>
            <h3>Bem vindo ao Sistema </h3>
          </div>

        </div>

      </div>

    </div>

  )
}


export default Home