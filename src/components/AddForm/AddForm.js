import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
	id: yup.string().required("Введите ID"),
	name: yup.string().required("Введите название"),
	slug: yup.string().required("Введите slug"),
	category: yup.string().required("Введите категорию"),
	price: yup.number().typeError("Цена должна быть числом").required()
});

const AddForm = () => {
	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema)
	});

	console.log(errors)

	const onSubmit = (data) => {
		console.log(data)
	};

	return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="mb-10">
                <label htmlFor="price">
                    ID &nbsp;
                    <span className="subtext">(unique set of letters and numbers): </span> 
                </label>
                <div>
                    <input id="id" type="tel" {...register("id")} />
                </div>
                <span className="subtext subtext_error">{errors.id?.message}</span>
            </div>
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
                    <span className="subtext">(название категории по английски маленькими буквами): </span>
                </label>
                <div>
                    <input id="category" type="text" {...register("category")} />
                </div>
                <span className="subtext subtext_error">{errors.name?.message}</span>
            </div>
            <div className="mb-10">
                <label htmlFor="thumbnail">
                    Превью: &nbsp;
                    <span className="subtext">(превью изображения ингредиента):</span>
                </label>
                <div>
                    <input id="thumbnail" type="file" {...register("thumbnail")} />
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
            </div>
            <button>Отправить</button>
        </form>
	);
}

export default AddForm;