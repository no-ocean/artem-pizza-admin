export const getData = (version, value) => {
    return fetch(`http://localhost:4000/${version}/${value}`).then(
        (res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong");
            }
        }
    )
}

export const postData = (data, value) => {
    return fetch(`http://localhost:4000/v1/${value}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => res.json());
}