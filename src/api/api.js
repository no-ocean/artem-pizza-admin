export const getData = (value) => {
    return fetch(`http://localhost:8080/v2/${value}`).then(
        (res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong");
            }
        }
    )
}