const xhr = new XMLHttpRequest();

//when response loads

//we firs setup what to do when we get a response, then we send the request
xhr.addEventListener('load', () => {
    console.log(xhr.response)
});

//send the request after we setup what to do with it, as the response takes time to arrive
xhr.open('GET', 'https://supersimplebackend.dev/products')
xhr.send();

