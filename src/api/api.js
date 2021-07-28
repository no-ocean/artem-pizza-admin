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

export const postData = (data) => {
    const formData = new FormData();

    for(let key in data) {
        if( key === "image") {
            formData.append(key, data[key][0], data[key][0].name)
        } else if (key === "thumbnail") {
            formData.append(key, data[key][0], data[key][0].name)
        }
        else {
            formData.append(key, data[key])
        }  
    }

    return fetch("//localhost:4000/v1/ingredients", {
        method: "POST",
        body: formData,
    }).then(res => res.json());
}