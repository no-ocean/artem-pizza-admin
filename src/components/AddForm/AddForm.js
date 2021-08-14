import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postData } from "../../api/api";
import Loader from "react-loader-spinner";
import Modal from "../Modal";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const imageValidation = (supported_formats, fileSizeLimit) => {
    return yup
            .mixed()
            .test("image", "Добавьте файл", (value) => {
                return value && value.length !== 0;
            })
            .test("fileSize", "Файл слишком большой", (value) => {
                return (value.length !== 0) && value[0].size <= fileSizeLimit;
            })
            .test("type", "Поддерживаемые форматы: png, jpg, jpeg", (value) => {
                return supported_formats.find((format) => {
                    return (value.length !== 0) && value[0].type === format;
                });
            })
}

const schema = yup.object().shape({
	name: yup.string().required("Введите название"),
	slug: yup.string().required("Введите slug"),
	price: yup.number().typeError("Цена должна быть числом").required(),
    image: imageValidation(SUPPORTED_FORMATS, 2000000),
    thumbnail: imageValidation(SUPPORTED_FORMATS, 2000000)
});

const AddForm = ({handleCancel, handleSuccess}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [modal, setModal] = useState(false);

	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await postData(data).then((res) => {
                if(res) {
                    setIsLoading(false);
                    setModal(true);
                }
            });
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
	};

    const confirmSuccess = () => {
        setModal(false);
        handleSuccess();
    }

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

	return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="mb-10">
                    <label htmlFor="name">
                        Название &nbsp;
                        <span className="subtext">(название ингредиента как на странице): </span>
                    </label>
                    <div>
                        <input id="name" type="text" {...register("name")} />
                    </div>
                    <span className="subtext subtext_error">{errors.name?.message}</span>
                </div>
                <div className="mb-10">
                    <label htmlFor="slug">
                        Slug &nbsp;
                        <span className="subtext">(название ингредиента по английски маленькими буквами): </span>
                    </label>
                    <div>
                        <input id="slug" type="text" {...register("slug")} />
                    </div>
                    <span className="subtext subtext_error">{errors.slug?.message}</span>
                </div>
                <div className="mb-10">
                    <label htmlFor="price">
                        Цена &nbsp;
                        <span className="subtext">(цена в цифрах):</span> 
                    </label>
                    <div>
                        <input id="price" type="tel" {...register("price")} />
                    </div>
                    <span className="subtext subtext_error">{errors.price?.message}</span>
                </div>
                <div className="mb-10">
                    <label htmlFor="category">
                        Категория &nbsp;
                        <span className="subtext">(выберите категорию): </span>
                    </label>
                    <div>
                        <select id="category" {...register("category")}>
                            <option value="meat">Мясо</option>
                            <option value="vegetables">Овощи</option>
                            <option value="cheese">Сыры</option>
                        </select>
                    </div>
                </div>
                <div className="mb-10">
                    <label htmlFor="image">
                        Изображение: &nbsp;
                        <span className="subtext">(изображение ингредиента):</span>
                    </label>
                    <div>
                        <input id="image" type="file" {...register("image")} />
                    </div>
                    <span className="subtext subtext_error">{errors.image?.message}</span>
                </div>
                <div className="mb-10">
                    <label htmlFor="thumbnail">
                        Превью: &nbsp;
                        <span className="subtext">(превью изображения ингредиента):</span>
                    </label>
                    <div>
                        <input id="thumbnail" type="file" {...register("thumbnail")} />
                    </div>
                    <span className="subtext subtext_error">{errors.thumbnail?.message}</span>
                </div>
                <div className="buttons-row mt-30">
                    <button className="btn">Добавить</button>
                    <button onClick={handleCancel} className="btn">Отмена</button>
                </div>
            </form>
            {
                modal ? <Modal 
                            message={"Данные успешно сохранены!"} 
                            confirmHandler={confirmSuccess}
                        /> : null
            }
        </>
	);
}

export default AddForm;