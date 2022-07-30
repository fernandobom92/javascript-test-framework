const assert = require('assert');

it('possui um texto no input', async () => {
    const  dom = await render('index.html');    
    const input = dom.window.document.querySelector('input');
    assert(input); //exibe um erro se input não existir no documento 
});

it('mostra uma mensagem de sucesso com email valido', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    input.value = 'teste@teste.com';
    
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));

    const h1 = dom.window.document.querySelector('h1');

    assert.strictEqual(h1.innerHTML, 'parece valido');
});

it('mostra uma mensagem de erro com email invalido', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    input.value = 'testeteste.com';
    
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));

    const h1 = dom.window.document.querySelector('h1');

    assert.strictEqual(h1.innerHTML, 'parece invalido');
});