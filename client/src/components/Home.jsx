
import { Link, Outlet } from "react-router-dom";


//10 => Continuação...

const Home = () => {


  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  return (     

      <div className="main-wrapper">

        <nav class="sidebar bg-secondary" style={{ width: '200px', height: 1000 }}>
          <br />
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu">
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

            <footer class="footer-mobile py-4 bg-secondary d-flex justify-content-center" style={{position:'fixed', left:0, bottom:0, width:'100%', color:'white', textAlign:'center', zIndex:1000}}>
                   <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>
            </footer>
      


      </div>

  )
}


export default Home