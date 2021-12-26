import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { getData } from "../../api/api";
import { useForm } from "react-hook-form";
import EditForm from "../EditForm";
import AddForm from "../AddForm";

const Ingredients = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [editForm, setEditForm] = useState(false);
    const [addForm, setAddForm] = useState(false);

    const { register, watch } = useForm();

    const imgPath = "//localhost:4000/";

    useEffect(() => {
        const loadData = async () => {
            try {
                const json = await getData("v1", "ingredients");
                const normalizeJson = json.reduce((acc, item) => {
                    acc[item.slug] = item;
                    return acc;
                }, {});
                setData(normalizeJson);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        loadData();
    }, [editForm, addForm]);

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

    const handleAdd = () => {
        setAddForm(true);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditForm(false);
        setAddForm(false);
    }

    const handleSuccess = () => {
        setEditForm(false);
        setAddForm(false);
    }

    const normalizeToData = (data) => {
        return Object.values(data);
    }

    const items = normalizeToData(data).map((item) => {
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
        return <EditForm 
                    handleCancel={handleCancel}
                    handleSuccess={handleSuccess}
                    editData={data[values]}
                />
    }

    if(addForm) {
        return <AddForm 
                    handleCancel={handleCancel}
                    handleSuccess={handleSuccess}
                />
    }

    if(!editForm && !addForm) {
        return (
            <div className="scrollbar">
                <div className="content">
                    <h1 className="page-title page-title__padded">Ингредиенты:</h1>
                    <div className="flex-column">
                        <form className="flex flex-column">
                            <div className="grid">
                                {items}
                            </div>
                        </form>
                        <div className="buttons-row ml-a mt-30">
                            <button 
                                {...({disabled: btnFlag})} 
                                onClick={handleEdit} 
                                className="btn">Редактировать
                            </button>
                            <button 
                                onClick={handleAdd}
                                className="btn btn_primary">Создать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Ingredients;