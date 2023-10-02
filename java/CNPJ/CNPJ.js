function consultarCNPJ() {
    var cnpj = document.getElementById("cnpj").value;
    var xmlHttpRequest = new XMLHttpRequest();
    var url = "https://brasilapi.com.br/api/cnpj/v1/" + cnpj;

    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.setRequestHeader("Accept", "application/json");

    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 3) {
        console.log('Carregando o conteúdo');
        }
        if (xmlHttpRequest.readyState == 4) {
        console.log('CNPJ: ' + xmlHttpRequest.responseText);

        var jsonResponse = JSON.parse(xmlHttpRequest.responseText);
    
        document.getElementById("resultado").innerHTML = 
        'CNPJ: ' + jsonResponse.cnpj + '</br>' +
        'Identificador Matriz Filial: ' + jsonResponse.identificador_matriz_filial + '</br>' +
        'Descricao Matriz Filial: ' + jsonResponse.descricao_matriz_filial + '</br>' +
        'Razao Social: ' + jsonResponse.razao_social + '</br>' +
        'Nome Fantasia: ' + jsonResponse.nome_fantasia + '</br>' +
        'Situacao Cadastral: ' + jsonResponse.situacao_cadastral + '</br>' +
        'Descricao Situacao Cadastral: ' + jsonResponse.descricao_situacao_cadastral + '</br>' +
        'Data Situacao Cadastral: ' + jsonResponse.data_situacao_cadastral + '</br>' +
        'Motivo Situacao Cadastral: ' + jsonResponse.motivo_situacao_cadastral + '</br>' +
        'Nome Cidade Exterior: ' + jsonResponse.nome_cidade_exterior + '</br>' +
        'Codigo Natureza Juridica: ' + jsonResponse.codigo_natureza_juridica + '</br>' +
        'Data Inicio Atividade: ' + jsonResponse.data_inicio_atividade + '</br>' +
        'CNAE Fiscal: ' + jsonResponse.cnae_fiscal+ '</br>' +
        'CENA Fiscal Descricao: ' + jsonResponse.cnae_fiscal_descricao + '</br>' +
        'Descricao Tipo Logradouro: ' + jsonResponse.descricao_tipo_logradouro+ '</br>' +
        'Logradouro : ' + jsonResponse.logradouro + '</br>' +
        'Numero: ' + jsonResponse.numero + '</br>' +
        'Nomplemento: ' + jsonResponse.complemento + '</br>' +
        'Bairro: ' + jsonResponse.bairro + '</br>' +
        'CEP: ' + jsonResponse.cep + '</br>' +
        'UF: ' + jsonResponse.uf + '</br>' +
        'Codigo Municipio: ' + jsonResponse.codigo_municipio + '</br>' +
        'Municipio: ' + jsonResponse.municipio + '</br>' +
        'DDD Telefone 1: ' + jsonResponse.ddd_telefone_1 + '</br>' +
        'DDD Telefone 2: ' + jsonResponse.ddd_telefone_2 + '</br>' +
        'DDD Fax: ' + jsonResponse.ddd_fax + '</br>' +
        'Qualificacao do Responsavel: ' + jsonResponse.qualificacao_do_responsavel + '</br>' +
        'Capital Social: ' + jsonResponse.capital_social+ '</br>' +
        'Porte: ' + jsonResponse.porte + '</br>' +
        'Descricao Porte: ' + jsonResponse.descricao_porte + '</br>' +
        'Opcao Pelo simples: ' + jsonResponse.opcao_pelo_simples + '</br>' +
        'Data Opcao Pelo Simples: ' + jsonResponse.data_opcao_pelo_simples + '</br>' +
        'Data Exclusao Do Simples: ' + jsonResponse.data_exclusao_do_simples + '</br>' +
        'Opcao Pelo Mei: ' + jsonResponse.opcao_pelo_mei + '</br>' +
        'Situacao Especial: ' + jsonResponse.situacao_especial + '</br>' +
        'Data Situacao Especial: ' + jsonResponse.data_situacao_especial
        ;
        console.log(jsonResponse);
        }
    };
    xmlHttpRequest.send(); // Inicie a solicitação
}
//consulta usando a tecla enter
document.getElementById("cnpj").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        consultarCNPJ();
    }
});