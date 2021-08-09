import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { getData } from "../../api/api";
import { useForm } from "react-hook-form";
import EditForm from "../EditForm";

const Ingredients = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [editForm, setEditForm] = useState(false);

    const { register, handleSubmit, watch } = useForm();

    const imgPath = "//localhost:4000/";

    useEffect(() => {
        const loadData = async () => {
            try {
                const json = await getData("v1", "ingredients");
                // const normalizeJson = json.reduce((acc, item) => {
                //     acc[item.slug] = item;
                //     return acc;
                // }, {});
                setData(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    if (error) {
        return <h1>ERROR: {error.message}</h1>
    }

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

    let values = watch(["editor"]);
    let btnFlag = values.join() === "" ? true : false;

    const handleEdit = () => {
        setEditForm(true);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditForm(false);
    }

    const items = data.map((item) => {
        const { id, name, slug, price, category, image, thumbnail } = item;
        return (
            <label key={id} className="ingredient">
                <input className="ingredient__input" type="radio" value={slug} {...register("editor")}/>
                <div className="ingredient__wrapper">
                    <div className="ingredient__image">
                        <img src={imgPath + thumbnail} alt="name"/>
                    </div>
                    <span className="ingredient__name">{name}</span>
                    <span className="ingredient__price">{price}&nbsp;&#8381;</span>
                </div>               
            </label>
        );
    });

    if(editForm) {
        return <EditForm handleCancel={handleCancel}/>
    }

    if(!editForm) {
        return (
            <div className="main flex-column">
                <form className="flex flex-column">
                    <div className="page grid">
                        {items}
                    </div>
                </form>
                <div className="edit-buttons">
                    <button 
                        {...({disabled: btnFlag})} 
                        onClick={handleEdit} 
                        className="btn">Edit
                    </button>
                    <button 
                        {...({disabled: btnFlag})} 
                        className="btn">Remove
                    </button>
                </div>
            </div>
        )
    }
    
}

export default Ingredients;