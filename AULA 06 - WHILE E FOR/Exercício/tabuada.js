
const botao = document.getElementById("calcular");

const lista = document.getElementById("lista");

botao.addEventListener("click", function() {

    const numero = document.getElementById("numero").value;

    lista.innerHTML = "";

    for (let i = 1; i <= 10; i++) {

        const item = document.createElement("li");

        item.textContent = `${numero} x ${i} = ${numero * i}`;

        lista.appendChild(item);

    }

});
