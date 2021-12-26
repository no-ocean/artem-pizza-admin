import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import OrderItem from "../OrderItem";
import { getData } from "../../api/api"

const Orders = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [data, setData] = useState();

	useEffect(() => {
		const loadData = async () => {
			try {
				const json = await getData("v1", "orders");
				setData(json);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};
		loadData();
	}, []);

	if (isLoading) {
		return (
			<div className="main spinner">
				<Loader
					type="Oval"
					color="#22CBF5"
					height={50}
					width={50}
					timeout={30000}
				/>
			</div>
		);
	}

	if (error) {
		return <h1>ERROR: {error.message}</h1>
	}

	return (
		<div className="scrollbar">
			<div className="content">
				<h1>Список заказов:</h1>
				<table className="table">
					<thead>
						<tr>
							<th>ID: </th>
							<th>Размер: </th>
							<th>Тесто: </th>
							<th>Соус: </th>
							<th>Ингредиенты: </th>
							<th>Адрес: </th>
							<th>Номер карты: </th>
							<th>Имя: </th>
							<th>Цена: </th>
						</tr>
					</thead>
					<tbody>
						<OrderItem data={data} />
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Orders;