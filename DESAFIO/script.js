let saldo = 1000;

let historico = ["Abertura da conta: R$ 1.000,00"];

const operacao = document.getElementById("operacao");

const campoValor = document.getElementById("valor");

const botao = document.getElementById("executar");

const resultado = document.getElementById("resultado");

const saldoTela = document.getElementById("saldo");

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

botao.addEventListener("click", function () {
    const texto = campoValor.value;
    const valor = Number(texto);
    let mensagem = "";

    switch (operacao.value) {
        case "consultar":
            mensagem = "Saldo disponível: " + dinheiro(saldo);
            break;

        case "depositar":
            if (texto.trim() === "" || !Number.isInteger(valor) || valor <= 0) {
                mensagem = "Erro: informe um número inteiro maior que zero.";
            } else {
                saldo += valor;
                historico.push("Depósito: +" + dinheiro(valor));
                mensagem = "Depósito de " + dinheiro(valor) + " realizado com sucesso!\nNovo saldo: " + dinheiro(saldo);
            }
            break;

        case "sacar":
            if (texto.trim() === "" || !Number.isInteger(valor) || valor <= 0) {
                mensagem = "Erro: informe um número inteiro maior que zero.";
            } else if (valor % 10 !== 0) {
                mensagem = "Erro: o valor do saque deve ser múltiplo de 10.";
            } else if (valor > saldo) {
                mensagem = "Erro: saldo insuficiente.";
            } else {
                let restante = valor;
                let notas100 = 0;
                let notas50 = 0;
                let notas20 = 0;
                let notas10 = 0;

                while (restante >= 100) {
                    restante -= 100;
                    notas100++;
                }
                while (restante >= 50) {
                    restante -= 50;
                    notas50++;
                }
                while (restante >= 20) {
                    restante -= 20;
                    notas20++;
                }
                while (restante >= 10) {
                    restante -= 10;
                    notas10++;
                }

                saldo -= valor;
                historico.push("Saque: -" + dinheiro(valor));
                const totalNotas = notas100 + notas50 + notas20 + notas10;
                mensagem = "Saque de " + dinheiro(valor) + " realizado com sucesso!\nNotas entregues:";
                if (notas100 > 0) mensagem += "\n" + notas100 + " nota(s) de R$ 100";
                if (notas50 > 0) mensagem += "\n" + notas50 + " nota(s) de R$ 50";
                if (notas20 > 0) mensagem += "\n" + notas20 + " nota(s) de R$ 20";
                if (notas10 > 0) mensagem += "\n" + notas10 + " nota(s) de R$ 10";
                mensagem += "\nTotal de notas: " + totalNotas;
                mensagem += "\nSaldo restante: " + dinheiro(saldo);
            }
            break;

        case "extrato":
            mensagem = "EXTRATO\n";
            for (let i = 0; i < historico.length; i++) {
                mensagem += (i + 1) + ". " + historico[i] + "\n";
            }
            mensagem += "\nSaldo atual: " + dinheiro(saldo);
            break;
    }

    resultado.textContent = mensagem;
    resultado.style.whiteSpace = "pre-line";
    saldoTela.textContent = dinheiro(saldo);
});
