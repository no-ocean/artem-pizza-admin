const OrderItem = ({data}) => {

    const items = data.map((item) => {
        const { 
            id, 
            size, 
            dough, 
            sauce, 
            ingredients, 
            address, 
            card_number, 
            name, 
            price 
        } = item;

        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{size} см</td>
                <td>{dough}</td>
                <td>{sauce}</td>
                <td>{ingredients.join(", ")}</td>
                <td>{address}</td>
                <td>{card_number}</td>
                <td>{name}</td>
                <td>{price} &#8381;</td>
            </tr>
        )
    })

    return items;
}

export default OrderItem;