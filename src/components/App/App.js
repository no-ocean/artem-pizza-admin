import { Route, NavLink, Switch } from "react-router-dom";
import Ingredients from "../Ingredients";
import AddForm from "../AddForm";
import Orders from "../Orders";
import Home from "../Home";

const App = () => {
	return (
		<div className="flex flex-column wide">
			<div className="topbar bg-top">
				<h3 className="logo">Artem Pizza Admin Pannel</h3>
				<div className="flex">
					<span className="mdi mdi-18px mdi-bell"></span>
					<span className="topbar__button">Выход</span>
				</div>
				
			</div>
			<div className="wide-full bg-main flex">
				<nav className="nav bg-dark">
					<NavLink exact activeClassName="nav__link_active" className="nav__link" to="/">Главная</NavLink>
					<NavLink activeClassName="nav__link_active" className="nav__link" to="/ingredients">Ингридиенты</NavLink>
					<NavLink activeClassName="nav__link_active" className="nav__link" to="/orders">Заказы</NavLink>
					<NavLink activeClassName="nav__link_active" className="nav__link" to="/addform">Добавить</NavLink>
				</nav>
				<div className="content">
					<Switch>
						<Route path="/ingredients">
							<Ingredients />
						</Route>
						<Route path="/addform">
							<AddForm />
						</Route>
						<Route path="/orders">
							<Orders />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default App;
