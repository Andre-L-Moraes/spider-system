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
        'identificador_matriz_filial: ' + jsonResponse.identificador_matriz_filial + '</br>' +
        'descricao_matriz_filial: ' + jsonResponse.descricao_matriz_filial + '</br>' +
        'razao_social: ' + jsonResponse.razao_social + '</br>' +
        'nome_fantasia: ' + jsonResponse.nome_fantasia + '</br>' +
        'situacao_cadastral: ' + jsonResponse.situacao_cadastral + '</br>' +
        'descricao_situacao_cadastral: ' + jsonResponse.descricao_situacao_cadastral + '</br>' +
        'data_situacao_cadastral: ' + jsonResponse.data_situacao_cadastral + '</br>' +
        'motivo_situacao_cadastral: ' + jsonResponse.motivo_situacao_cadastral + '</br>' +
        'nome_cidade_exterior: ' + jsonResponse.nome_cidade_exterior + '</br>' +
        'codigo_natureza_juridica: ' + jsonResponse.codigo_natureza_juridica + '</br>' +
        'data_inicio_atividade: ' + jsonResponse.data_inicio_atividade + '</br>' +
        'cnae_fiscal: ' + jsonResponse.cnae_fiscal+ '</br>' +
        'cnae_fiscal_descricao: ' + jsonResponse.cnae_fiscal_descricao + '</br>' +
        'descricao_tipo_logradouro: ' + jsonResponse.descricao_tipo_logradouro+ '</br>' +
        'logradouro : ' + jsonResponse.logradouro + '</br>' +
        'numero: ' + jsonResponse.numero + '</br>' +
        'complemento: ' + jsonResponse.complemento + '</br>' +
        'bairro: ' + jsonResponse.bairro + '</br>' +
        'cep: ' + jsonResponse.cep + '</br>' +
        'uf: ' + jsonResponse.uf + '</br>' +
        'codigo_municipio: ' + jsonResponse.codigo_municipio + '</br>' +
        'municipio: ' + jsonResponse.municipio + '</br>' +
        'ddd_telefone_1: ' + jsonResponse.ddd_telefone_1 + '</br>' +
        'ddd_telefone_2: ' + jsonResponse.ddd_telefone_2 + '</br>' +
        'ddd_fax: ' + jsonResponse.ddd_fax + '</br>' +
        'qualificacao_do_responsavel: ' + jsonResponse.qualificacao_do_responsavel + '</br>' +
        'capital_social: ' + jsonResponse.capital_social+ '</br>' +
        'porte: ' + jsonResponse.porte + '</br>' +
        'descricao_porte: ' + jsonResponse.descricao_porte + '</br>' +
        'opcao_pelo_simples: ' + jsonResponse.opcao_pelo_simples + '</br>' +
        'data_opcao_pelo_simples: ' + jsonResponse.data_opcao_pelo_simples + '</br>' +
        'data_exclusao_do_simples: ' + jsonResponse.data_exclusao_do_simples + '</br>' +
        'opcao_pelo_mei: ' + jsonResponse.opcao_pelo_mei + '</br>' +
        'situacao_especial: ' + jsonResponse.situacao_especial + '</br>' +
        'data_situacao_especial: ' + jsonResponse.data_situacao_especial
        ;
        console.log(jsonResponse);
        }
    };
    xmlHttpRequest.send(); // Inicie a solicitação
}