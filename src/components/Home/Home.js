import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { getData } from "../../api/api";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                const json = await getData("v1", "ingredients");
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
            <h1>HOME PAGE</h1>
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
                JSON.stringify(data)
            }
        </>
    );
}

export default Home;