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
                <td><span className="nowrap">{size} см</span></td>
                <td>{dough}</td>
                <td>{sauce}</td>
                <td>{ingredients.join(", ")}</td>
                <td>{address}</td>
                <td><span className="nowrap">{card_number}</span></td>
                <td><span className="nowrap">{name}</span></td>
                <td><span className="nowrap">{price} &#8381;</span></td>
            </tr>
        )
    })

    return items;
}

export default OrderItem;