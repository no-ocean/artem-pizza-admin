import './App.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
	price: yup.number().typeError("Цена должна быть числом").required(),
	name: yup.string().required("Введите имя"),
	slug: yup.string().required("Введите ID")
})

const App = () => {
	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema)
	});

	console.log(errors)

	const onSubmit = (data) => {
		console.log(data)
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="price">Цена: </label>
				<input id="price" type="tel" {...register("price")} />
				<p>{errors.price?.message}</p>
			</div>
			<div>
				<label htmlFor="name">Название: </label>
				<input id="name" type="text" {...register("name")} />
				<p>{errors.name?.message}</p>
			</div>
			<div>
				<label htmlFor="slug">ID: </label>
				<input id="slug" type="text" {...register("slug")} /> 
				<p>{errors.slug?.message}</p>
			</div>
			
			<div>
				<label htmlFor="picture">Изображение: </label>
				<input id="picture" type="file" {...register("picture")} />
			</div>
			
			<button>Отправить</button>
		</form>
	);
}

export default App;
