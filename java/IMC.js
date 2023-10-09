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
        // Cálculo do IMC
        var imc = (peso / (altura * altura)).toFixed(1);

        // Cálculo do Peso Ideal
        var pesoIdealMin = (18.5 * (altura * altura)).toFixed(1);
        var pesoIdealMax = (24.9 * (altura * altura)).toFixed(1);

        // Cálculo das necessidades calóricas diárias com base na idade, gênero e meta
        var necessidadesCaloricas = 0;
        if (genero === "masculino") {
            if (meta === "emagrecer") {
                necessidadesCaloricas = ((88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * idade)) * atividade * 0.8).toFixed(0);
            } else if (meta === "manter") {
                necessidadesCaloricas = ((88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * idade)) * atividade).toFixed(0);
            } else if (meta === "engordar") {
                necessidadesCaloricas = ((88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * idade)) * atividade * 1.2).toFixed(0);
            }
        } else if (genero === "feminino") {
            if (meta === "emagrecer") {
                necessidadesCaloricas = ((447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * idade)) * atividade * 0.9).toFixed(0);
            } else if (meta === "manter") {
                necessidadesCaloricas = ((447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * idade)) * atividade).toFixed(0);
            } else if (meta === "engordar") {
                necessidadesCaloricas = ((447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * idade)) * atividade * 1.1).toFixed(0);
            }
        }

        document.getElementById("nomeResultado").textContent = nome + ", veja seu resultado";
        document.getElementById("imc").textContent = imc;
        document.getElementById("pesoIdeal").textContent = pesoIdealMin + "kg - " + pesoIdealMax + "kg";
        document.getElementById("necessidadesCaloricas").textContent = necessidadesCaloricas + " calorias";
    }
})