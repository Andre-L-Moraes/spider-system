function consultarCNPJ() {
    var cnpj = document.getElementById("cnpj").value;
    var xmlHttpRequest = new XMLHttpRequest();
    var url = "https://brasilapi.com.br/api/cnpj/v1/" + cnpj;

    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.setRequestHeader("Accept", "application/json");

    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4) {
            if (xmlHttpRequest.status == 200) {
                var jsonResponse = JSON.parse(xmlHttpRequest.responseText);

                if (jsonResponse && jsonResponse.cnpj) {
                    document.getElementById("resultado").innerHTML =
                        'CNPJ: ' + jsonResponse.cnpj + '<br>' +
                        'Razão Social: ' + jsonResponse.razao_social + '<br>' +
                        // ... outras atualizações de elementos

                        'Nome Fantasia: ' + jsonResponse.nome_fantasia + '<br>' +
                        'Situação Cadastral: ' + jsonResponse.descricao_situacao_cadastral + '<br>' +
                        'Data Situação Cadastral: ' + jsonResponse.data_situacao_cadastral + '<br>' +
                        'Motivo Situação Cadastral: ' + jsonResponse.descricao_motivo_situacao_cadastral + '<br>' +
                        'Codigo Natureza Jurídica: ' + jsonResponse.codigo_natureza_juridica + '<br>' +
                        'Natureza Jurídica: ' + jsonResponse.natureza_juridica + '<br>' +
                        'Logradouro: ' + jsonResponse.logradouro + '<br>' +
                        'Número: ' + jsonResponse.numero + '<br>' +
                        'Complemento: ' + jsonResponse.complemento + '<br>' +
                        'Bairro: ' + jsonResponse.bairro + '<br>' +
                        'CEP: ' + jsonResponse.cep + '<br>' +
                        'UF: ' + jsonResponse.uf + '<br>' +
                        'Município: ' + jsonResponse.municipio + '<br>' +
                        'DDD Telefone 1: ' + jsonResponse.ddd_telefone_1 + '<br>' +
                        'DDD Telefone 2: ' + jsonResponse.ddd_telefone_2 + '<br>' +
                        'DDD Fax: ' + jsonResponse.ddd_fax + '<br>' +
                        'Opção Pelo MEI: ' + (jsonResponse.opcao_pelo_mei ? 'Sim' : 'Não') + '<br>' +
                        'Opção Pelo Simples: ' + (jsonResponse.opcao_pelo_simples ? 'Sim' : 'Não') + '<br>' +
                        'Data Opção Pelo Simples: ' + jsonResponse.data_opcao_pelo_simples + '<br>' +
                        'Data Exclusão do Simples: ' + jsonResponse.data_exclusao_do_simples + '<br>' +
                        'Data Exclusão do MEI: ' + jsonResponse.data_exclusao_do_mei + '<br>' +
                        'CNAE Fiscal: ' + jsonResponse.cnae_fiscal + '<br>' +
                        'CNAE Fiscal Descrição: ' + jsonResponse.cnae_fiscal_descricao + '<br>' +
                        'Codigo País: ' + jsonResponse.codigo_pais + '<br>' +
                        'País: ' + jsonResponse.pais + '<br>' +
                        'Codigo Município: ' + jsonResponse.codigo_municipio + '<br>' +
                        'Data inicio da Atividade: ' + jsonResponse.data_inicio_atividade        + '<br>' + 
                        'Data Situação Especial: ' + jsonResponse.data_situacao_especial        + '<br>' + 
                        'Identificador Matriz Filial: ' + jsonResponse.descricao_identificador_matriz_filial        + '<br>' + 
                        'Descrição Porte: ' + jsonResponse.descricao_porte + '<br>' + 
                        'Tipo de Logradouro: ' + jsonResponse.descricao_tipo_de_logradouro        + '<br>' + 
                        'Email: ' + jsonResponse.email + '<br>' + 
                        'Identificador Matriz Filial: ' + jsonResponse.identificador_matriz_filial + '<br>' + 
                        'Motivo Situação Cadastral: ' + jsonResponse.motivo_situacao_cadastral        + '<br>' + 
                        'Nome Cidade no Exterior: ' + jsonResponse.nome_cidade_no_exterior        + '<br>' + 
                        'Qualificação do Responsavel: ' + jsonResponse.qualificacao_do_responsavel        + '<br>' + 
                        'Situação Cadastral: ' + jsonResponse.situacao_cadastral        + '<br>' + 
                        'Situação Especial: ' + jsonResponse.situacao_especial + '<br>' + 
                        'Ente Federativo Responsável: ' + jsonResponse.ente_federativo_responsavel + '<br>' +
                        'Código Município IBGE: ' + jsonResponse.codigo_municipio_ibge + '<br>' +
                        'Código Porte: ' + jsonResponse.codigo_porte + '<br>' +
                        'Porte: ' + jsonResponse.porte + '<br>'+ '<br>';

                        var cnaesSecundarios = jsonResponse.cnaes_secundarios;
                        if (cnaesSecundarios.length > 0) {
                          document.getElementById("resultado").innerHTML += 'CNAEs Secundários: <br>';
                          for (var j = 0; j < cnaesSecundarios.length; j++) {
                            document.getElementById("resultado").innerHTML +=
                              'CNAE Secundário ' + (j + 1) + ': ' + cnaesSecundarios[j].codigo + ' - ' + cnaesSecundarios[j].descricao + '<br>'+ '<br>';
                          }
                        }

                        var qsa = jsonResponse.qsa;
                        if (qsa.length > 0) {
                          document.getElementById("resultado").innerHTML += 'Sócios: <br>' ;
                          for (var i = 0; i < qsa.length; i++) {
                            var socio = qsa[i];
                            document.getElementById("resultado").innerHTML +=
                              'Identificador de Sócio: ' + socio.identificador_de_socio + '<br>' +
                              'Nome do Sócio: ' + socio.nome_socio + '<br>' +
                              'CNPJ/CPF do Sócio: ' + socio.cnpj_cpf_do_socio + '<br>' +
                              'Qualificação do Sócio: ' + socio.qualificacao_socio + '<br>' +
                              'Percentual do Capital Social: ' + socio.percentual_capital_social + '<br>' +
                  
                              'Codigo da Faixa Etária: ' + socio.codigo_faixa_etaria + '<br>' +
                              'Identificador do Socio: ' + socio.identificador_de_socio + '<br>' +
                              'Qualificação Representante legal: ' + socio.qualificacao_representante_legal + '<br>' +
                              'Percentual do Capital Social: ' + socio.percentual_capital_social + '<br>' +
                  
                              'Data de Entrada na Sociedade: ' + socio.data_entrada_sociedade + '<br>';
                        
                            if (socio.faixa_etaria) {
                              document.getElementById("resultado").innerHTML +=
                                'Faixa Etária: ' + socio.faixa_etaria + '<br>'  + '<br>';
                            }
                          }
                        }

                        console.log(jsonResponse);

                        // Retorno com blocos
                        document.getElementById("cnpj2").textContent = jsonResponse.cnpj;
                        document.getElementById("Razao_Social").textContent = jsonResponse.razao_social;
                        document.getElementById("Nome_Fantasia").textContent = jsonResponse.nome_fantasia;
                        document.getElementById("Situacao_Cadastral").textContent = jsonResponse.descricao_situacao_cadastral;
                        document.getElementById("Data_Cadastral").textContent = jsonResponse.data_situacao_cadastral;
                        document.getElementById("numeroCNAE").textContent = jsonResponse.cnae_fiscal;
                        document.getElementById("Descricao").textContent = jsonResponse.cnae_fiscal_descricao;
                        document.getElementById("Logradouro").textContent = jsonResponse.logradouro;
                        document.getElementById("Numero").textContent = jsonResponse.numero ;
                        document.getElementById("Bairro").textContent = jsonResponse.bairro;
                        document.getElementById("CEP").textContent = jsonResponse.cep;
                        document.getElementById("UF").textContent = jsonResponse.uf;
                        document.getElementById("Municipio").textContent = jsonResponse.municipio;
                        document.getElementById("Telefone").textContent = jsonResponse.ddd_telefone_1;
                        document.getElementById("Porte").textContent = jsonResponse.porte;

                        var qsa = jsonResponse.qsa;

                        var socio1 = {}; // Variável para o primeiro sócio
                        var socio2 = {}; // Variável para o segundo sócio
                        
                        if (qsa.length > 0) {
                            for (var i = 0; i < qsa.length; i++) {
                                var socio = qsa[i];
                                var idSocio = "Socio" + (i + 1);
                                var idQualificacao = "Qualificacao" + (i + 1);
                                var idFaixaEtaria = "Faixa_Etaria" + (i + 1);
                        
                                // Armazena as informações dos sócios nas variáveis correspondentes
                                if (i === 0) {
                                    socio1.nome = socio.nome_socio;
                                    socio1.qualificacao = socio.qualificacao_socio;
                                    socio1.faixa_etaria = socio.faixa_etaria;
                                } else if (i === 1) {
                                    socio2.nome = socio.nome_socio;
                                    socio2.qualificacao = socio.qualificacao_socio;
                                    socio2.faixa_etaria = socio.faixa_etaria;
                                }
                        
                                document.getElementById("Socio1").textContent = socio1.nome
                                document.getElementById("Qualificacao1").textContent = socio1.qualificacao
                                document.getElementById("FaixaEtaria1").textContent = socio1.faixa_etaria

                                document.getElementById("Socio2").textContent = socio2.nome
                                document.getElementById("Qualificacao2").textContent = socio2.qualificacao
                                document.getElementById("FaixaEtaria2").textContent = socio2.faixa_etaria
                            }
                        }

                } else {
                    document.getElementById("resultado").innerHTML = 'CNPJ não encontrado.';
                }
            } else {
                // Tratar erro HTTP, por exemplo, mostrar uma mensagem de erro adequada.
                console.log('Erro na solicitação: ' + xmlHttpRequest.status);
            }
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
