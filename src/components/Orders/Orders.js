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
                const json = await getData("orders");
                setData(json);
                setIsLoading(false);
            } catch(error) {
                setError(error);
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if(error) {
        return <h1>ERROR: {error.message}</h1>
    }

    return (
        <>
            <h1>Orders list:</h1>
            { 
                isLoading ? <div className="spinner flex">
                    <Loader
                        type="Oval"
                        color="#22CBF5"
                        height={20}
                        width={20}
                        timeout={30000}
                    />
                </div> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID: </th>
                            <th>Размер: </th>
                            <th>Тесто: </th>
                            <th>Соус: </th>
                            <th>Ингредиенты: </th>
                            <th>Имя: </th>
                            <th>Номер карты: </th>
                            <th>Адрес: </th>
                            <th>Цена: </th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderItem data={data} />
                    </tbody>
                </table>
            }
            {JSON.stringify(data)}
        </>
    );
}

export default Orders;