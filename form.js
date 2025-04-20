
function contactForm(){
  const $form = document.querySelector('.contact-form'),
    $inputs = document.querySelectorAll('.contact-form [required]') 

  //console.log($inputs);

  $inputs.forEach((input)=>{
      const $span = document.createElement('span')
      $span.id = input.name
      $span.textContent = input.title
      $span.classList.add('contact-form-error', 'none')
      input.insertAdjacentElement('afterend', $span)
  })

  document.addEventListener('keyup',(e)=>{
    if(e.target.matches('.contact-form [required]')){
        let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern

        //console.log($input, pattern);

        if(pattern && $input.value !== ""){
            //console.log('El input tiene pattern');
            let regex = new RegExp(pattern)
            return !regex.exec($input.value)
            ? document.getElementById($input.name).classList.add('is-active')
            : document.getElementById($input.name).classList.remove('is-active')
        }
        if(!pattern){
            //console.log('El input NO tiene pattern');
            return $input.value === ""
            ? document.getElementById($input.name).classList.add('is-active')
            : document.getElementById($input.name).classList.remove('is-active')
        }
    }
  })

  document.addEventListener('submit', (e)=>{
    /* desactivar para el envío // activar para simulacion*/
    e.preventDefault()
    //alert('Enviando Formulario')

    const $loader = document.querySelector('.contact-form-loader'),
    $response = document.querySelector('.contact-form-response')

    $loader.classList.remove('none')
    
    fetch("https://formsubmit.co/ajax/biode.argentina@gmail.com",{
      method:"POST",
      body:new FormData(e.target)
    })
      .then(res => res.ok?res.json():Promise.reject(res))
      .then(json =>{
        console.log(json);
        $loader.classList.add('none')
        $response.classList.remove('none')
        $response.innerHTML = `<p>${json.message}</p>`
        $form.reset()
      })
      .catch(err =>{
        console.log(err);

        let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente"
        $response.innerHTML = `<p>Error: ${err.status}: ${message}</p>`
      })
      .finally(()=>{
        setTimeout(() => {
            $response.classList.add('none')
            $response.innerHTML = ""
        }, 2000);
      })
  })
}

document.addEventListener("DOMContentLoaded", contactForm())