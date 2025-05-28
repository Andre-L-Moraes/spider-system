document.getElementById("imcForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar o envio do formulário

    var nome = document.getElementById("nome").value;
    var idade = parseInt(document.getElementById("idade").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var atividade = parseFloat(document.getElementById("atividade").value);
    var genero = document.querySelector('input[name="genero"]:checked').value;
    var meta = document.getElementById("meta").value;

    if (isNaN(idade) || isNaN(altura) || isNaN(peso) || idade <= 0 || altura <= 0 || peso <= 0) {
        alert("Por favor, insira valores válidos para idade, altura e peso.");
    } else {
        // Verificar se a altura está em metros ou centímetros
        // Se altura > 3, provavelmente está em centímetros e precisa ser convertida para metros
        if (altura > 3) {
            altura = altura / 100;
        }
        
        // Cálculo do IMC
        var imc = (peso / (altura * altura)).toFixed(1);

        // Cálculo do Peso Ideal
        var pesoIdealMin = (18.5 * (altura * altura)).toFixed(1);
        var pesoIdealMax = (24.9 * (altura * altura)).toFixed(1);

        // Cálculo das necessidades calóricas diárias com base na idade, gênero e meta
        var necessidadesCaloricas = 0;
        if (genero === "masculino") {
            // Fórmula de Harris-Benedict para homens
            // TMB = 88.362 + (13.397 × peso em kg) + (4.799 × altura em cm) - (5.677 × idade em anos)
            var tmb = 88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * idade);
            
            if (meta === "emagrecer") {
                necessidadesCaloricas = (tmb * atividade * 0.8).toFixed(0);
            } else if (meta === "manter") {
                necessidadesCaloricas = (tmb * atividade).toFixed(0);
            } else if (meta === "engordar") {
                necessidadesCaloricas = (tmb * atividade * 1.2).toFixed(0);
            }
        } else if (genero === "feminino") {
            // Fórmula de Harris-Benedict para mulheres
            // TMB = 447.593 + (9.247 × peso em kg) + (3.098 × altura em cm) - (4.330 × idade em anos)
            var tmb = 447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * idade);
            
            if (meta === "emagrecer") {
                necessidadesCaloricas = (tmb * atividade * 0.9).toFixed(0);
            } else if (meta === "manter") {
                necessidadesCaloricas = (tmb * atividade).toFixed(0);
            } else if (meta === "engordar") {
                necessidadesCaloricas = (tmb * atividade * 1.1).toFixed(0);
            }
        }

        // Classificação do IMC
        var classificacaoIMC = "";
        if (imc < 18.5) {
            classificacaoIMC = " - Abaixo do peso";
        } else if (imc >= 18.5 && imc < 25) {
            classificacaoIMC = " - Peso normal";
        } else if (imc >= 25 && imc < 30) {
            classificacaoIMC = " - Sobrepeso";
        } else if (imc >= 30 && imc < 35) {
            classificacaoIMC = " - Obesidade Grau I";
        } else if (imc >= 35 && imc < 40) {
            classificacaoIMC = " - Obesidade Grau II";
        } else {
            classificacaoIMC = " - Obesidade Grau III";
        }

        // Exibir resultados
        document.getElementById("nomeResultado").textContent = nome + ", veja seu resultado";
        document.getElementById("imc").textContent = imc + classificacaoIMC;
        document.getElementById("pesoIdeal").textContent = pesoIdealMin + "kg - " + pesoIdealMax + "kg";
        document.getElementById("necessidadesCaloricas").textContent = necessidadesCaloricas + " calorias";
    }
});