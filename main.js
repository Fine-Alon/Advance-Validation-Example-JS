const TOKEN = '885352ec0032d44ea2988ba64c5d589b8c875f406bf42fe8e90e8d4610f55ded'
const form = document.getElementById('form')

/**/
const postUser = async (data) => {
    const response = fetch(`https://gorest.co.in/public/v2/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data)
    }).then(res => res.json())


}

form.addEventListener('submit', postUser({}))
