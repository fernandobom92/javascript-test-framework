document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); //impede o navegador de enviar o formulario
    const {value} = document.querySelector('input');

    const header = document.querySelector('h1');

    if (value.includes('@')) {
        header.innerHTML = 'parece valido';
    } else {
        header.innerHTML = 'parece invalido';
    }
});
