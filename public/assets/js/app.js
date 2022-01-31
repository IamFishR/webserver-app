const doc = document
const search = doc.querySelector('#search')

doc.querySelector(".response-container").style.display = 'none'



    search.addEventListener('click', (e) => {
        e.preventDefault();
        const query = doc.querySelector('#address')
        const response = doc.querySelector('.response')
        response.innerHTML = ''
        response.classList.remove('text-danger')

        fetch('/weather?address=' + query.value).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    response.innerHTML = data.error
                    response.classList.add('text-danger')
                    setTimeout((e)=> {
                        response.innerHTML = ''
                    }, 4000)
                } else {
                    doc.querySelector(".form-container").style.display = 'none'
                    doc.querySelector(".response-container").style.display = 'block'

                    const obs_time = data.obs_time;

                    doc.querySelector(".location").innerHTML = data.place_name + ', '+ data.region + ', '+ data.country
                    doc.querySelector(".temp").innerHTML = data.temp
                    doc.querySelector(".time").innerHTML = new Date(data.time).toDateString()
                    doc.querySelector(".para").innerHTML = data.para
                    doc.querySelector(".precip").innerHTML = data.precip
                    doc.querySelector(".humidity").innerHTML = data.humidity
                    doc.querySelector(".wind_speed").innerHTML = data.wind_speed
                    
                    data.weather.forEach(element => {
                        let anchor = doc.createElement('a')
                        anchor.href = 'javascript:void(0)'
                        anchor.innerHTML = element;
                        anchor.title = 'weather information'
                        doc.querySelector('.tags').appendChild(anchor)
                    });
                }
            })
        })
    })