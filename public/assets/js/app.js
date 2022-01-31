const search = document.querySelector('#search');

    search.addEventListener('click', (e) => {
        e.preventDefault();
        const query = document.querySelector('#address')
        const response = document.querySelector('.response')
        response.innerHTML = ''
        response.classList.remove('text-danger')

        fetch('/weather?address=' + query.value).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    response.innerHTML = data.error
                    response.classList.add('text-danger')
                } else {
                    const h = "It is currently " + data.temp + " " + data.unit + " in " + data.place_name + ". It feels like " + data.rain_prob + " " + data.unit + " out"

                    response.innerHTML = h
                    console.log(data.resp)
                }
            })
        })
    })