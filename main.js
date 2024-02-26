const TOKEN = '885352ec0032d44ea2988ba64c5d589b8c875f406bf42fe8e90e8d4610f55ded'
const form = document.getElementById('form')
const errorBox = document.querySelector('.errors')

/**/
const postUser = async (data) => {
    let errors = []

    if (!data.email.trim()) errors.push({name: 'email', message: 'fill in E-mail'})
    else if (!data.email.includes('@') || !data.email.includes('.')) errors.push({
        name: 'email',
        message: 'E-mail address is not correct'
    })
    if (!data.name.trim()) errors.push({name: 'name', message: 'fill in name'})
    if (!data.gender) errors.push({name: 'gender', message: 'choice gender'})
    if (!data.status) errors.push({name: 'status', message: 'choice status'})

    if (!errors.length) {
        const response = await fetch(`https://gorest.co.in/public/v2/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())

        if (response.id) {
            return response
        }

        if (response[0]?.field) {
            let err = new TypeError()

            err.errors = response.map(res => ({
                    name: res.field,
                    message: res.field + ': ' + res.message
                })
            )
            throw err
        }

    } else {
        let err = new TypeError()

        err.errors = errors

        throw err
    }
    throw new Error('UNEXPECTED ERROR!')
}

form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const data = {}
        const inputs = {}
        errorBox.textContent = ''

        for (let i = 0; i < form.length - 1; i++) {
            if (!form[i].name) continue

            data[form[i].name] = form[i].value.trim()

            inputs[form[i].name] = form[i]

            form[i].classList.remove('is-invalid')
        }
        try {
            await postUser(data)

        } catch (err) {
            if (err.name !== "TypeError") throw err
            if (err.errors) {
                err.errors.map(errElement => {

                    inputs[errElement.name].classList.add('is-invalid')

                    errorBox.textContent = err.errors.map(errElement => errElement.message).join('!  ')
                })
            }
        }
    }
)

