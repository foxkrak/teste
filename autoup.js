/*##############################################
Logica inicial de Programação obtida, atraves de um tutorial
      Denominado "Os 5 primeiros dias - Modo Novato"
              Imagens Também do Mesmo
                 Autoria : senson
https://forum.tribalwars.com.br/index.php?threads/os-5-primeiros-dias-modo-novato.334845/#post-3677800
##############################################*/


//*************************** CONFIGURAÇÃO ***************************//
// Escolha Tempo de espera mínimo e máximo entre ações (em milissegundos)
const Min_Tempo_Espera= 800000;
const Max_Tempo_Espera = 900000;

// Etapa_1: Upar O bot automaticamente em Série Edificios
let Etapa = "Etapa_1";
let principal;
let secundario;
let clic = 0;
const td = document.createElement('td');
const tr1 = document.createElement('tr');
const tr2 = document.createElement('tr');
let breka;

// Escolha se você deseja que o bot enfileire os edifícios na ordem definida (= true) ou
// assim que um prédio estiver disponível para a fila de construção (= false)
let Construção_Edificios_Ordem;
let Construção_Edificios_Quest;
let botao;
let botao2;
let variavel = true;

botao = JSON.parse(localStorage.getItem('Ordem'));
botao2 = JSON.parse(localStorage.getItem('Quests'));



function verifica1(){
    botao = JSON.parse(localStorage.getItem('Ordem'));
    if(botao === 'Não'){
        let stringJSON = JSON.stringify('Sim');
        localStorage.setItem('Ordem', stringJSON);
        Construção_Edificios_Ordem = true;
        document.querySelector('.ordemBtn').innerText = 'Sim'
        document.querySelector('.ordemBtn').title = 'Construir em Ordem'
        console.log(Construção_Edificios_Ordem)
    }else{
        let stringJSON = JSON.stringify('Não');
        localStorage.setItem('Ordem', stringJSON);
        Construção_Edificios_Ordem = false;
        document.querySelector('.ordemBtn').innerText = 'Não'
        document.querySelector('.ordemBtn').title = 'Construir Qualquer Edificio Disponivel'
        console.log(Construção_Edificios_Ordem)
    }
}
function verifica2(){
    botao2 = JSON.parse(localStorage.getItem('Quests'));
    if(botao2 === 'Não'){
        let stringJSON = JSON.stringify('Sim');
        localStorage.setItem('Quests', stringJSON);
        Construção_Edificios_Quest = true;
        document.querySelector('.questBtn').innerText = 'Sim'
        document.querySelector('.questBtn').title = 'Priorizar Quest: Ligado'
        console.log(Construção_Edificios_Quest)
    }else{
        let stringJSON = JSON.stringify('Não');
        localStorage.setItem('Quests', stringJSON);
        Construção_Edificios_Quest = false;
        document.querySelector('.questBtn').innerText = 'Não'
        document.querySelector('.questBtn').title = 'Priorizar Quest: Desligado'
        console.log(Construção_Edificios_Quest)
    }
}


//*************************** /CONFIGURAÇÃO ***************************//

// Constantes (NÃO DEVE SER ALTERADAS)
const Visualização_Geral = "OVERVIEW_VIEW";
const Edificio_Principal = "HEADQUARTERS_VIEW";

function startScript() {
    'use strict';

    console.log("-- Script do Tribal Wars ativado --");

    if (Etapa == "Etapa_1"){
        executarEtapa1();
    }
    if(Construção_Edificios_Quest === false){
        console.log('Quest Desligado, Construção Normal.')
    }

}

// Etapa 1: Construção
function executarEtapa1(){
    let Evoluir_vilas = getEvoluir_vilas();
    //console.log(Evoluir_vilas);
    if (Evoluir_vilas == Edificio_Principal){
        principal = setInterval(function(){
            // construir qualquer edificio custeável, se possível
            if(Construção_Edificios_Quest){
                if(document.querySelectorAll('.current-quest').length !== 0){
                    for(let i of document.querySelectorAll('.current-quest')){
                        if(i.offsetWidth > 0 || i.offsetHeight > 0){
                            i.click();
                            console.log('Upando Quests')
                        }
                    }
                }
                if(document.querySelectorAll('.current-quest').length === 0){
                    Proxima_Construção();
                }
            }else{
                Proxima_Construção();
            }
        }, 1000);
    }
    else if (Evoluir_vilas == Visualização_Geral){
        // Visualização Geral PG
        document.getElementById("l_main").children[0].children[0].click();
    }

}
function Secundario(){
    secundario = setInterval(function(){


        var text="";
        var tr=$('[id="buildqueue"]').find('tr').eq(1);

        text=tr.find('td').eq(1).find('span').eq(0).text().split(" ").join("").split("\n").join("");
        var timeSplit=text.split(':');

        if(timeSplit[0]*60*60+timeSplit[1]*60+timeSplit[2]*1<3*60){
            console.log("Completar Grátis");
            tr.find('td').eq(2).find('a').eq(2).click();

        }
        //missao concluida
        if($('[class="btn btn-confirm-yes status-btn quest-complete-btn"]').length > 0 || document.querySelector('.quest_new') !== null){
            if(document.querySelector('.quest-popup-container') === null){
                Questlines.showDialog(0, 'main-tab')
            }
        }
        if(document.querySelector('.quest-popup-container') !== null){
            if(variavel){
                console.log('entrou')
                variavel = false;
                console.log(variavel)
                verifQuest();
            }
        }
    },500);
}
async function teste(){
    if(document.querySelector('.quest-popup-container') !== null){
        document.querySelectorAll('.tab-link')[document.querySelectorAll('.tab-link').length -1].click();
        await loading();
        while(document.querySelectorAll('.reward-system-claim-button').length !== 0){
            for(let btn of document.querySelectorAll('.reward-system-claim-button')){
                console.log('Pegando Recompenças Em ',btn)
                btn.click();
                await loading();
            }
        }
        if(document.querySelectorAll('.reward-system-claim-button').length === 0){
            document.querySelector('.popup_box_close').click();
            variavel = true;
        }
    }
}

//################################################
//Delay
function delayS(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

async function loading() {
    return new Promise(resolve => {
        let interval = setInterval(function(){
            if(document.querySelector('#loading_content').style.display === 'inline'){
                console.log('Loading..')
            }else{
            clearInterval(interval)
                resolve(2)
            }
        },100)
    });
}
//################################################

async function verifQuest(){
    //await delayS(500);
    //breka = false;
    if(document.querySelector('.quest-popup-container') !== null){
        let t = document.querySelector('.questline-list').querySelectorAll('.quest-link').length
        console.log('Total de Missoes em Progresso! ',t)
        for(let uls of document.querySelector('.questline-list').querySelectorAll('.quest-link')){
            console.log('Clicando em ',uls)
            uls.click();
            await loading();
            console.log('Verificando Itens.')
                    if(document.querySelector('.quest-complete-btn') !== null){
                        console.log('Recebendo Recompesa de Missao.')
                        document.querySelector('.quest-complete-btn').click();
                        await loading();
                        //await delayS(1000)
                        //breka = true;
                        Questlines.showDialog(0, 'main-tab')
                        await loading();
                        verifQuest();
                        return;

                    }
                    if(document.querySelector('[class="skip-btn btn"]') !== null){
                        if(document.querySelector('[class="skip-btn btn"]').offsetWidth > 0 || document.querySelector('[class="skip-btn btn"]').offsetHeight > 0){
                            console.log('Pulando Missao Desnecessaria.')
                            document.querySelector('[class="skip-btn btn"]').click();
                            await loading();
                            Questlines.showDialog(0, 'main-tab')
                            await loading();
                            //await delayS(1000)
                            //breka = true;
                            verifQuest();
                            return;
                            //break;

                        }
                    }
            t--
            if(t>0){
                console.log('Nada encontrado, Proxima Missao.')
            }
        }
        if(document.querySelectorAll('.reward-system-claim-button').length !== 0 && breka === false){
            teste();
            return;
        }else{
              document.querySelector('.popup_box_close').click();
              variavel = true;
        }
        console.log('Nenhuma Recompensa Disponivel.');
    }
}

    let delay = Math.floor(Math.random() * (Max_Tempo_Espera - Max_Tempo_Espera) + Min_Tempo_Espera);

    // Ação do processo
    let Evoluir_vilas = getEvoluir_vilas();
    console.log(Evoluir_vilas);
    setTimeout(function(){
        if (Evoluir_vilas == Edificio_Principal){

            // construir qualquer edificio custeável, se possível
            Proxima_Construção();

        }
        else if (Evoluir_vilas == Visualização_Geral){
            // Visualização Geral Pag
            document.getElementById("l_main").children[0].children[0].click();

        }
    }, delay);

function getEvoluir_vilas(){
    let currentUrl = window.location.href;
    if (currentUrl.endsWith('Visualização Geral')){
        return Visualização_Geral;
    }
    else if (currentUrl.endsWith('main') || currentUrl.endsWith('main#')){
        return Edificio_Principal;
    }
}

function Proxima_Construção(){
    let Construção_proximo_edificio = getConstrução_proximo_edificio();
    if (Construção_proximo_edificio !== undefined){
        Construção_proximo_edificio.click();
        console.log("Clicked on " + Construção_proximo_edificio);
    }
}

function getConstrução_proximo_edificio() {
    let Clicar_Upar_Edificos = document.getElementsByClassName("btn btn-build");
    let Construção_Edifcios_Serie = getConstrução_Edifcios_Serie();
    let instituir;
    while(instituir === undefined && Construção_Edifcios_Serie.length > 0){
        var proximo = Construção_Edifcios_Serie.shift();
        if (Clicar_Upar_Edificos.hasOwnProperty(proximo)){
            let próximo_edifício = document.getElementById(proximo);
            var Visivel = próximo_edifício.offsetWidth > 0 || próximo_edifício.offsetHeight > 0;
            if (Visivel){
                instituir = próximo_edifício;
            }
            if (Construção_Edificios_Ordem){
                break;
            }
        }
    }
    return instituir;
}

function getConstrução_Edifcios_Serie() {
    var Sequência_Construção = [];

    // Edificios Inicial conforme figura: https://i.imgur.com/jPuHuHN.png

//*************************** QUEST ***************************//
    // Construção Madeira 1
    Sequência_Construção.push("main_buildlink_wood_1");
    // Construção Argila 1
    Sequência_Construção.push("main_buildlink_stone_1");
    // Construção Ferro 1
    Sequência_Construção.push("main_buildlink_iron_1");
    // Construção Madeira 2
    Sequência_Construção.push("main_buildlink_wood_2");
    // Construção Argila 2
    Sequência_Construção.push("main_buildlink_stone_2");
    // Construção Edificio Principal 2
    Sequência_Construção.push("main_buildlink_main_2");
    // Construção Edificio Principal 3
    Sequência_Construção.push("main_buildlink_main_3");
    // Construção Quartel 1
    Sequência_Construção.push("main_buildlink_barracks_1");
    // Construção Madeira 3
    Sequência_Construção.push("main_buildlink_wood_3");
    // Construção Argila 3
    Sequência_Construção.push("main_buildlink_stone_3");
    // Construção Quartel 2
    Sequência_Construção.push("main_buildlink_barracks_2");

//------------- Atacar Aldeia Barbara ------------------//

    // Construção Armazém 2
    Sequência_Construção.push("main_buildlink_storage_2");
    // Construção Ferro 2
    Sequência_Construção.push("main_buildlink_iron_2");
    // Construção Armazém 3
    Sequência_Construção.push("main_buildlink_storage_3");
    // Construção Armazém 4
    Sequência_Construção.push("main_buildlink_storage_4");
    // Construção Armazém 5
    Sequência_Construção.push("main_buildlink_storage_5");
    // Construção Armazém 6
    Sequência_Construção.push("main_buildlink_storage_6");

//---------------- Recrutar Lanceiro -----------------//

    // Construção Quartel 3
    Sequência_Construção.push("main_buildlink_barracks_3");
    // Construção Estatua 1
    Sequência_Construção.push("main_buildlink_statue_1");
    // Construção Fazenda 2
    Sequência_Construção.push("main_buildlink_farm_2");
    // Construção Ferro 3
    Sequência_Construção.push("main_buildlink_iron_3");
    // Construção Edificio Principal 4
    Sequência_Construção.push("main_buildlink_main_4");
    // Construção Edificio Principal 5
    Sequência_Construção.push("main_buildlink_main_5");
    // Construção Ferreiro 1
    Sequência_Construção.push("main_buildlink_smith_1");
    // Construção Madeira 4
    Sequência_Construção.push("main_buildlink_wood_4");
    // Construção Argila 4
    Sequência_Construção.push("main_buildlink_stone_4");

    //---------------- Recrutar Paladino - Escolher Bandeira -  -----------------//

    // Construção Muralha 1
    Sequência_Construção.push("main_buildlink_wall_1");
    // Construção Esconderijo 2
    Sequência_Construção.push("main_buildlink_hide_2");
    // Construção Esconderijo 3
    Sequência_Construção.push("main_buildlink_hide_3");
     // Construção Madeira 5
    Sequência_Construção.push("main_buildlink_wood_5");
    // Construção Argila 5
    Sequência_Construção.push("main_buildlink_stone_5");
    // Construção Mercado 1
    Sequência_Construção.push("main_buildlink_market_1");
    // Construção Madeira 6
    Sequência_Construção.push("main_buildlink_wood_6");
    // Construção Argila 6
    Sequência_Construção.push("main_buildlink_stone_6");
    // Construção Madeira 7
    Sequência_Construção.push("main_buildlink_wood_7");
    // Construção Argila 7
    Sequência_Construção.push("main_buildlink_stone_7");
    // Construção Ferro 4
    Sequência_Construção.push("main_buildlink_iron_4");
    // Construção Ferro 5
    Sequência_Construção.push("main_buildlink_iron_5");
    // Construção Ferro 6
    Sequência_Construção.push("main_buildlink_iron_6");
    // Construção Madeira 8
    Sequência_Construção.push("main_buildlink_wood_8");
    // Construção Argila 8
    Sequência_Construção.push("main_buildlink_stone_8");
    // Construção Ferro 7
    Sequência_Construção.push("main_buildlink_iron_7");
     // Construção Madeira 9
    Sequência_Construção.push("main_buildlink_wood_9");
    // Construção Argila 9
    Sequência_Construção.push("main_buildlink_stone_9");
       // Construção Madeira 10
    Sequência_Construção.push("main_buildlink_wood_10");
    // Construção Argila 10
    Sequência_Construção.push("main_buildlink_stone_10");

//---------------- https://image.prntscr.com/image/oMwaEPpCR2_1XaHzlMaobg.png -  -----------------//

     // Construção Madeira 11
    Sequência_Construção.push("main_buildlink_wood_11");
    // Construção Argila 11
    Sequência_Construção.push("main_buildlink_stone_11");
     // Construção Madeira 12
    Sequência_Construção.push("main_buildlink_wood_12");
    // Construção Argila 12
    Sequência_Construção.push("main_buildlink_stone_12");
    // Construção Armazém 7
    Sequência_Construção.push("main_buildlink_storage_7");
    // Construção Ferro 8
    Sequência_Construção.push("main_buildlink_iron_8");
     // Construção Armazém 8
    Sequência_Construção.push("main_buildlink_storage_8");
    // Construção Ferro 9
    Sequência_Construção.push("main_buildlink_iron_9");
    // Construção Ferro 10
    Sequência_Construção.push("main_buildlink_iron_10");

//---------------- https://image.prntscr.com/image/n6tBlPGORAq9RmqSVccTKg.png -  -----------------//

     // Construção Madeira 13
    Sequência_Construção.push("main_buildlink_wood_13");
    // Construção Argila 13
    Sequência_Construção.push("main_buildlink_stone_13");
    // Construção Ferro 11
    Sequência_Construção.push("main_buildlink_iron_11");
    // Construção Armazém 9
    Sequência_Construção.push("main_buildlink_storage_9");
    // Construção Armazém 10
    Sequência_Construção.push("main_buildlink_storage_10");
    // Construção Fazenda 3
    Sequência_Construção.push("main_buildlink_farm_3");
    // Construção Fazenda 4
    Sequência_Construção.push("main_buildlink_farm_4");
    // Construção Fazenda 5
    Sequência_Construção.push("main_buildlink_farm_5");
    // Construção Ferro 12
    Sequência_Construção.push("main_buildlink_iron_12");

//---------------- https://image.prntscr.com/image/ERCLrS5cT32ntSv1IevLUg.png -  -----------------//

    // Construção Edificio Principal 6
    Sequência_Construção.push("main_buildlink_main_6");
    // Construção Edificio Principal 7
    Sequência_Construção.push("main_buildlink_main_7");
    // Construção Quartel 4
    Sequência_Construção.push("main_buildlink_barracks_4");
    // Construção Quartel 5
    Sequência_Construção.push("main_buildlink_barracks_5");
    // Construção Fazenda 6
    Sequência_Construção.push("main_buildlink_farm_6");
    // Construção Fazenda 7
    Sequência_Construção.push("main_buildlink_farm_7");
    // Construção Muralha 2
    Sequência_Construção.push("main_buildlink_wall_2");
    // Construção Muralha 3
    Sequência_Construção.push("main_buildlink_wall_3");
    // Construção Muralha 4
    Sequência_Construção.push("main_buildlink_wall_4");
    // Construção Muralha 5
    Sequência_Construção.push("main_buildlink_wall_5");
    // Construção Ferro 13
    Sequência_Construção.push("main_buildlink_iron_13");
    // Construção Ferro 14
    Sequência_Construção.push("main_buildlink_iron_14");

//---------------- https://image.prntscr.com/image/V15bxH7KSFa5gu3d02yYIQ.png -  -----------------//

    // Construção Fazenda 8
    Sequência_Construção.push("main_buildlink_farm_8");
    // Construção Fazenda 9
    Sequência_Construção.push("main_buildlink_farm_9");

//---------------- https://image.prntscr.com/image/3pioalUXRK6AH9wNYnRxyQ.png -  -----------------//



    // Construção Ferreiro 2
    Sequência_Construção.push("main_buildlink_smith_2");
    // Construção Ferreiro 3
    Sequência_Construção.push("main_buildlink_smith_3");
    // Construção Ferreiro 4
    Sequência_Construção.push("main_buildlink_smith_4");
    // Construção Ferreiro 5
    Sequência_Construção.push("main_buildlink_smith_5");
    // Construção Mercado 2
    Sequência_Construção.push("main_buildlink_market_2");
    // Construção Mercado 3
    Sequência_Construção.push("main_buildlink_market_3");
    // Construção Edificio Principal 8
    Sequência_Construção.push("main_buildlink_main_8");
    // Construção Edificio Principal 9
    Sequência_Construção.push("main_buildlink_main_9");
    // Construção Edificio Principal 10
    Sequência_Construção.push("main_buildlink_main_10");
    // Construção Estabulo 1
    Sequência_Construção.push("main_buildlink_stable_1");
    // Construção Estabulo 2
    Sequência_Construção.push("main_buildlink_stable_2");
    // Construção Estabulo 3
    Sequência_Construção.push("main_buildlink_stable_3");
    // Construção Armazém 11
    Sequência_Construção.push("main_buildlink_storage_11");
    // Construção Fazenda 10
    Sequência_Construção.push("main_buildlink_farm_10");
    // Construção Fazenda 11
    Sequência_Construção.push("main_buildlink_farm_11");
    // Construção Fazenda 12
    Sequência_Construção.push("main_buildlink_farm_12");
    // Construção Armazém 12
    Sequência_Construção.push("main_buildlink_storage_12");
     // Construção Madeira 14
    Sequência_Construção.push("main_buildlink_wood_14");
    // Construção Argila 14
    Sequência_Construção.push("main_buildlink_stone_14");
     // Construção Madeira 15
    Sequência_Construção.push("main_buildlink_wood_15");
    // Construção Argila 15
    Sequência_Construção.push("main_buildlink_stone_15");
    // Construção Armazém 13
    Sequência_Construção.push("main_buildlink_storage_13");
    // Construção Edificio Principal 11
    Sequência_Construção.push("main_buildlink_main_11");
    // Construção Muralha 6
    Sequência_Construção.push("main_buildlink_wall_6");
    // Construção Muralha 7
    Sequência_Construção.push("main_buildlink_wall_7");
    // Construção Muralha 8
    Sequência_Construção.push("main_buildlink_wall_8");
    // Construção Muralha 9
    Sequência_Construção.push("main_buildlink_wall_9");
    // Construção Armazém 14
    Sequência_Construção.push("main_buildlink_storage_14");
    // Construção Quartel 6
    Sequência_Construção.push("main_buildlink_barracks_6");
    // Construção Quartel 7
    Sequência_Construção.push("main_buildlink_barracks_7");
    // Construção Quartel 8
    Sequência_Construção.push("main_buildlink_barracks_8");
    // Construção Quartel 9
    Sequência_Construção.push("main_buildlink_barracks_9");
    // Construção Armazém 15
    Sequência_Construção.push("main_buildlink_storage_15");
    // Construção Ferreiro 6
    Sequência_Construção.push("main_buildlink_smith_6");
    // Construção Ferreiro 7
    Sequência_Construção.push("main_buildlink_smith_7");
    // Construção Ferreiro 8
    Sequência_Construção.push("main_buildlink_smith_8");
    // Construção Edificio Principal 12
    Sequência_Construção.push("main_buildlink_main_12");
    // Construção Armazém 16
    Sequência_Construção.push("main_buildlink_storage_16");
    // Construção Armazém 17
    Sequência_Construção.push("main_buildlink_storage_17");
    // Construção Edificio Principal 13
    Sequência_Construção.push("main_buildlink_main_13");
    // Construção Fazenda 13
    Sequência_Construção.push("main_buildlink_farm_13");
    // Construção Fazenda 14
    Sequência_Construção.push("main_buildlink_farm_14");
    // Construção Mercado 4
    Sequência_Construção.push("main_buildlink_market_4");
    // Construção Mercado 5
    Sequência_Construção.push("main_buildlink_market_5");
    // Construção Mercado 6
    Sequência_Construção.push("main_buildlink_market_6");
    // Construção Edificio Principal 14
    Sequência_Construção.push("main_buildlink_main_14");
    // Construção Madeira 16
    Sequência_Construção.push("main_buildlink_wood_16");
    // Construção Argila 16
    Sequência_Construção.push("main_buildlink_stone_16");
    // Construção Edificio Principal 15
    Sequência_Construção.push("main_buildlink_main_15");
    // Construção Madeira 17
    Sequência_Construção.push("main_buildlink_wood_17");
    // Construção Argila 17
    Sequência_Construção.push("main_buildlink_stone_17");
    // Construção Edificio Principal 16
    Sequência_Construção.push("main_buildlink_main_16");
    // Construção Quartel 10
    Sequência_Construção.push("main_buildlink_barracks_10");
    // Construção Ferreiro 9
    Sequência_Construção.push("main_buildlink_smith_9");
    // Construção Ferreiro 10
    Sequência_Construção.push("main_buildlink_smith_10");
    // Construção Oficina 1
    Sequência_Construção.push("main_buildlink_garage_1");
    // Construção Oficina 2
    Sequência_Construção.push("main_buildlink_garage_2");
    // Construção Oficina 3
    Sequência_Construção.push("main_buildlink_garage_3");
    // Construção Estabulo 4
    Sequência_Construção.push("main_buildlink_stable_4");
    // Construção Estabulo 4
    Sequência_Construção.push("main_buildlink_stable_5");
    // Construção Estabulo 4
    Sequência_Construção.push("main_buildlink_stable_6");
    // Construção Estabulo 4
    Sequência_Construção.push("main_buildlink_stable_7");
    // Construção Armazém 18
    Sequência_Construção.push("main_buildlink_storage_18");
    // Construção Armazém 19
    Sequência_Construção.push("main_buildlink_storage_19");
    // Construção Quartel 11
    Sequência_Construção.push("main_buildlink_barracks_11");
    // Construção Quartel 12
    Sequência_Construção.push("main_buildlink_barracks_12");
    // Construção Ferro 15
    Sequência_Construção.push("main_buildlink_iron_15");
    // Construção Ferro 16
    Sequência_Construção.push("main_buildlink_iron_16");
    // Construção Fazenda 15
    Sequência_Construção.push("main_buildlink_farm_15");
    // Construção Fazenda 16
    Sequência_Construção.push("main_buildlink_farm_16");
    // Construção Muralha 10
    Sequência_Construção.push("main_buildlink_wall_10");
    // Construção Fazenda 17
    Sequência_Construção.push("main_buildlink_farm_17");
    // Construção Ferreiro 11
    Sequência_Construção.push("main_buildlink_smith_11");
    // Construção Muralha 11
    Sequência_Construção.push("main_buildlink_wall_11");
    // Construção Fazenda 18
    Sequência_Construção.push("main_buildlink_farm_18");
    // Construção Muralha 12
    Sequência_Construção.push("main_buildlink_wall_12");
    // Construção Mercado 7
    Sequência_Construção.push("main_buildlink_market_7");
    // Construção Mercado 8
    Sequência_Construção.push("main_buildlink_market_8");
    // Construção Mercado 9
    Sequência_Construção.push("main_buildlink_market_9");
    // Construção Ferreiro 12
    Sequência_Construção.push("main_buildlink_smith_12");
    // Construção Mercado 10
    Sequência_Construção.push("main_buildlink_market_10");
     // Construção Madeira 18
    Sequência_Construção.push("main_buildlink_wood_18");
    // Construção Argila 18
    Sequência_Construção.push("main_buildlink_stone_18");
    // Construção Ferreiro 13
    Sequência_Construção.push("main_buildlink_smith_13");
     // Construção Madeira 19
    Sequência_Construção.push("main_buildlink_wood_19");
    // Construção Argila 19
    Sequência_Construção.push("main_buildlink_stone_19");
    // Construção Fazenda 19
    Sequência_Construção.push("main_buildlink_farm_19");
    // Construção Ferreiro 14
    Sequência_Construção.push("main_buildlink_smith_14");
    // Construção Muralha 13
    Sequência_Construção.push("main_buildlink_wall_13");
    // Construção Ferro 16
    Sequência_Construção.push("main_buildlink_iron_16");
    // Construção Ferro 17
    Sequência_Construção.push("main_buildlink_iron_17");
    // Construção Ferreiro 15
    Sequência_Construção.push("main_buildlink_smith_15");
    // Construção Edificio Principal 17
    Sequência_Construção.push("main_buildlink_main_17");
    // Construção Edificio Principal 18
    Sequência_Construção.push("main_buildlink_main_18");
    // Construção Edificio Principal 19
    Sequência_Construção.push("main_buildlink_main_19");
    // Construção Edificio Principal 20
    Sequência_Construção.push("main_buildlink_main_20");
    // Construção Armazém 20
    Sequência_Construção.push("main_buildlink_storage_20");
    // Construção Armazém 21
    Sequência_Construção.push("main_buildlink_storage_21");
    // Construção Armazém 22
    Sequência_Construção.push("main_buildlink_storage_22");
    // Construção Armazém 23
    Sequência_Construção.push("main_buildlink_storage_23");
    // Construção Madeira 20
    Sequência_Construção.push("main_buildlink_wood_20");
    // Construção Argila 20
    Sequência_Construção.push("main_buildlink_stone_20");
    // Construção Ferreiro 16
    Sequência_Construção.push("main_buildlink_smith_16");
    // Construção Ferreiro 17
    Sequência_Construção.push("main_buildlink_smith_17");
    // Construção Ferro 18
    Sequência_Construção.push("main_buildlink_iron_18");
     // Construção Madeira 20
    Sequência_Construção.push("main_buildlink_wood_21");
    // Construção Argila 20
    Sequência_Construção.push("main_buildlink_stone_21");
    // Construção Quartel 13
    Sequência_Construção.push("main_buildlink_barracks_13");
    // Construção Quartel 14
    Sequência_Construção.push("main_buildlink_barracks_14");
    // Construção Oficina 4
    Sequência_Construção.push("main_buildlink_garage_4");
    // Construção Estabulo 8
    Sequência_Construção.push("main_buildlink_stable_8");
    // Construção Oficina 5
    Sequência_Construção.push("main_buildlink_garage_5");
    // Construção Estabulo 9
    Sequência_Construção.push("main_buildlink_stable_9");
    // Construção Fazenda 20
    Sequência_Construção.push("main_buildlink_farm_20");
    // Construção Muralha 14
    Sequência_Construção.push("main_buildlink_wall_14");
    // Construção Muralha 15
    Sequência_Construção.push("main_buildlink_wall_15");
    // Construção Fazenda 21
    Sequência_Construção.push("main_buildlink_farm_21");
    // Construção Armazém 24
    Sequência_Construção.push("main_buildlink_storage_24");
    // Construção Ferro 19
    Sequência_Construção.push("main_buildlink_iron_19");
    // Construção Madeira 21
    Sequência_Construção.push("main_buildlink_wood_21");
    // Construção Argila 21
    Sequência_Construção.push("main_buildlink_stone_21");
    // Construção Madeira 22
    Sequência_Construção.push("main_buildlink_wood_22");
    // Construção Argila 22
    Sequência_Construção.push("main_buildlink_stone_22");
    // Construção Armazém 25
    Sequência_Construção.push("main_buildlink_storage_25");
    // Construção Madeira 23
    Sequência_Construção.push("main_buildlink_wood_23");
    // Construção Argila 23
    Sequência_Construção.push("main_buildlink_stone_23");
    // Construção Ferro 20
    Sequência_Construção.push("main_buildlink_iron_20");
    // Construção Ferro 21
    Sequência_Construção.push("main_buildlink_iron_21");
    // Construção Ferro 22
    Sequência_Construção.push("main_buildlink_iron_22");
    // Construção Ferreiro 18
    Sequência_Construção.push("main_buildlink_smith_18");
    // Construção Ferreiro 19
    Sequência_Construção.push("main_buildlink_smith_19");
    // Construção Ferreiro 20
    Sequência_Construção.push("main_buildlink_smith_20");
    // Construção Academia
    Sequência_Construção.push("main_buildlink_snob_1");
    // Construção Oficina 6
    Sequência_Construção.push("main_buildlink_garage_6");
    // Construção Estabulo 10
    Sequência_Construção.push("main_buildlink_stable_10");
    // Construção Estabulo 11
    Sequência_Construção.push("main_buildlink_stable_11");
    // Construção Quartel 15
    Sequência_Construção.push("main_buildlink_barracks_15");
    // Construção Quartel 16
    Sequência_Construção.push("main_buildlink_barracks_16");
    // Construção Fazenda 22
    Sequência_Construção.push("main_buildlink_farm_22");
    // Construção Madeira 24
    Sequência_Construção.push("main_buildlink_wood_24");
    // Construção Argila 24
    Sequência_Construção.push("main_buildlink_stone_24");
    // Construção Ferro 23
    Sequência_Construção.push("main_buildlink_iron_23");
    // Construção Madeira 24
    Sequência_Construção.push("main_buildlink_wood_25");
    // Construção Argila 24
    Sequência_Construção.push("main_buildlink_stone_25");
    // Construção Ferro 22
    Sequência_Construção.push("main_buildlink_iron_24");
    // Construção Muralha 16
    Sequência_Construção.push("main_buildlink_wall_16");
    // Construção Muralha 17
    Sequência_Construção.push("main_buildlink_wall_17");
    // Construção Muralha 18
    Sequência_Construção.push("main_buildlink_wall_18");
    // Construção Fazenda 23
    Sequência_Construção.push("main_buildlink_farm_23");
    // Construção Fazenda 24
    Sequência_Construção.push("main_buildlink_farm_24");
    // Construção Fazenda 25
    Sequência_Construção.push("main_buildlink_farm_25");
    // Construção Mercado 11
    Sequência_Construção.push("main_buildlink_market_11");
    // Construção Mercado 12
    Sequência_Construção.push("main_buildlink_market_12");
    // Construção Mercado 13
    Sequência_Construção.push("main_buildlink_market_13");
    // Construção Mercado 14
    Sequência_Construção.push("main_buildlink_market_14");
    // Construção Armazém 26
    Sequência_Construção.push("main_buildlink_storage_26");
    // Construção Muralha 19
    Sequência_Construção.push("main_buildlink_wall_19");
    // Construção Armazém 27
    Sequência_Construção.push("main_buildlink_storage_27");
    // Construção Armazém 28
    Sequência_Construção.push("main_buildlink_storage_28");
    // Construção Muralha 20
    Sequência_Construção.push("main_buildlink_wall_20");
    // Construção Madeira 26
    Sequência_Construção.push("main_buildlink_wood_26");
    // Construção Argila 26
    Sequência_Construção.push("main_buildlink_stone_26");
    // Construção Ferro 25
    Sequência_Construção.push("main_buildlink_iron_25");
    // Construção Armazém 29
    Sequência_Construção.push("main_buildlink_storage_29");
    // Construção Armazém 30
    Sequência_Construção.push("main_buildlink_storage_30");
    // Construção Fazenda 26
    Sequência_Construção.push("main_buildlink_farm_26");
    // Construção Fazenda 27
    Sequência_Construção.push("main_buildlink_farm_27");
    // Construção Fazenda 28
    Sequência_Construção.push("main_buildlink_farm_28");
    // Construção Fazenda 29
    Sequência_Construção.push("main_buildlink_farm_29");
    // Construção Fazenda 30
    Sequência_Construção.push("main_buildlink_farm_30");
    // Construção Oficina 7
    Sequência_Construção.push("main_buildlink_garage_7");
    // Construção Estabulo 12
    Sequência_Construção.push("main_buildlink_stable_12");
    // Construção Oficina 8
    Sequência_Construção.push("main_buildlink_garage_8");
    // Construção Estabulo 13
    Sequência_Construção.push("main_buildlink_stable_13");
    // Construção Edificio Principal 21
    Sequência_Construção.push("main_buildlink_main_21");
    // Construção Oficina 9
    Sequência_Construção.push("main_buildlink_garage_9");
    // Construção Estabulo 14
    Sequência_Construção.push("main_buildlink_stable_14");
    // Construção Edificio Principal 22
    Sequência_Construção.push("main_buildlink_main_22");
    // Construção Oficina 10
    Sequência_Construção.push("main_buildlink_garage_10");
    // Construção Estabulo 15
    Sequência_Construção.push("main_buildlink_stable_15");
    // Construção Quartel 17
    Sequência_Construção.push("main_buildlink_barracks_17");
    // Construção Quartel 18
    Sequência_Construção.push("main_buildlink_barracks_18");
    // Construção Quartel 19
    Sequência_Construção.push("main_buildlink_barracks_19");
    // Construção Quartel 20
    Sequência_Construção.push("main_buildlink_barracks_20");
    // Construção Madeira 27
    Sequência_Construção.push("main_buildlink_wood_27");
    // Construção Argila 27
    Sequência_Construção.push("main_buildlink_stone_27");
    // Construção Ferro 26
    Sequência_Construção.push("main_buildlink_iron_26");
    // Construção Madeira 28
    Sequência_Construção.push("main_buildlink_wood_28");
    // Construção Argila 28
    Sequência_Construção.push("main_buildlink_stone_28");
    // Construção Quartel 21
    Sequência_Construção.push("main_buildlink_barracks_21");
    // Construção Ferro 27
    Sequência_Construção.push("main_buildlink_iron_27");
    // Construção Madeira 29
    Sequência_Construção.push("main_buildlink_wood_29");
    // Construção Argila 29
    Sequência_Construção.push("main_buildlink_stone_29");
    // Construção Quartel 22
    Sequência_Construção.push("main_buildlink_barracks_22");
    // Construção Ferro 28
    Sequência_Construção.push("main_buildlink_iron_28");
    // Construção Madeira 30
    Sequência_Construção.push("main_buildlink_wood_30");
    // Construção Argila 30
    Sequência_Construção.push("main_buildlink_stone_30");
    // Construção Quartel 23
    Sequência_Construção.push("main_buildlink_barracks_23");
    // Construção Ferro 29
    Sequência_Construção.push("main_buildlink_iron_29");
    // Construção Ferro 30
    Sequência_Construção.push("main_buildlink_iron_30");
    // Construção Mercado 15
    Sequência_Construção.push("main_buildlink_market_15");
    // Construção Mercado 16
    Sequência_Construção.push("main_buildlink_market_16");
    // Construção Quartel 24
    Sequência_Construção.push("main_buildlink_barracks_24");
    // Construção Mercado 17
    Sequência_Construção.push("main_buildlink_market_17");
    // Construção Quartel 25
    Sequência_Construção.push("main_buildlink_barracks_25");
    // Construção Oficina 10
    Sequência_Construção.push("main_buildlink_garage_11");
    // Construção Estabulo 15
    Sequência_Construção.push("main_buildlink_stable_16");
    // Construção Oficina 10
    Sequência_Construção.push("main_buildlink_garage_12");
    // Construção Estabulo 15
    Sequência_Construção.push("main_buildlink_stable_17");
    // Construção Oficina 10
    Sequência_Construção.push("main_buildlink_garage_13");
    // Construção Estabulo 15
    Sequência_Construção.push("main_buildlink_stable_18");
    // Construção Oficina 10
    Sequência_Construção.push("main_buildlink_garage_14");
    // Construção Estabulo 15
    Sequência_Construção.push("main_buildlink_stable_19");
    // Construção Oficina 10
    Sequência_Construção.push("main_buildlink_garage_15");
    // Construção Estabulo 15
    Sequência_Construção.push("main_buildlink_stable_20");
    // Construção Edificio Principal 23
    Sequência_Construção.push("main_buildlink_main_23");
    // Construção Edificio Principal 24
    Sequência_Construção.push("main_buildlink_main_24");
    // Construção Edificio Principal 25
    Sequência_Construção.push("main_buildlink_main_25");
    // Construção Edificio Principal 26
    Sequência_Construção.push("main_buildlink_main_26");
    // Construção Edificio Principal 27
    Sequência_Construção.push("main_buildlink_main_27");
    // Construção Edificio Principal 28
    Sequência_Construção.push("main_buildlink_main_28");
    // Construção Edificio Principal 29
    Sequência_Construção.push("main_buildlink_main_29");
    // Construção Edificio Principal 30
    Sequência_Construção.push("main_buildlink_main_30");
    // Construção Mercado 18
    Sequência_Construção.push("main_buildlink_market_18");
    // Construção Mercado 19
    Sequência_Construção.push("main_buildlink_market_19");
    // Construção Mercado 20
    Sequência_Construção.push("main_buildlink_market_20");
    // Construção Mercado 21
    Sequência_Construção.push("main_buildlink_market_21");
    // Construção Mercado 22
    Sequência_Construção.push("main_buildlink_market_22");
    // Construção Esconderijo 4
    Sequência_Construção.push("main_buildlink_hide_4");
    // Construção Mercado 23
    Sequência_Construção.push("main_buildlink_market_23");
    // Construção Esconderijo 5
    Sequência_Construção.push("main_buildlink_hide_5");
    // Construção Mercado 24
    Sequência_Construção.push("main_buildlink_market_24");
    // Construção Mercado 25
    Sequência_Construção.push("main_buildlink_market_25");
    // Construção Esconderijo 3
    Sequência_Construção.push("main_buildlink_hide_6");
    // Construção Esconderijo 3
    Sequência_Construção.push("main_buildlink_hide_7");
    // Construção Esconderijo 8
    Sequência_Construção.push("main_buildlink_hide_8");
    // Construção Esconderijo 9
    Sequência_Construção.push("main_buildlink_hide_9");
    // Construção Esconderijo 10
    Sequência_Construção.push("main_buildlink_hide_10");

    return Sequência_Construção;

}

//*************************** CRIANDO OS ELEMENTOS CONFIGURANDO E DANDO FUNÇÃO ***************************//

td.classList = 'opcoestd';
document.querySelector('.shadedBG').appendChild(td);
document.querySelector('.opcoestd').appendChild(createEle('tr'))
document.querySelector('.opcoestd').children[0].appendChild(createEle('td'))
document.querySelector('.opcoestd').children[0].children[0].appendChild(createEle('label','PARADO','StatusLab'))
document.querySelector('.opcoestd').appendChild(createEle('tr'))
document.querySelector('.opcoestd').children[1].appendChild(createEle('td'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button','Iniciar','iniciarBtn','Iniciar o Script'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button','Pausar','pausarBtn','Pausar o Script'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button',botao,'ordemBtn','SIM, Construir Em Ordem. | NAO, Construir Qualquer Edificil Disponivel.'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button',botao2,'questBtn','Construir Priorizando Quest'))

//*************************** Stilizando ***************************//

document.querySelector('.StatusLab').style.cssText = 'margin: 65px;' + 'font-weight: bold;'
document.querySelector('.pausarBtn').style.cssText = 'margin: 2px;'
document.querySelector('.iniciarBtn').style.cssText = 'margin: 2px;'
document.querySelector('.ordemBtn').style.cssText = 'margin: 2px;'
document.querySelector('.questBtn').style.cssText = 'margin: 2px;'
document.querySelector('.opcoestd').children[0].children[0].colSpan = '2';
document.querySelector('.opcoestd').children[0].children[0].style.cssText = 'padding-top: 18px;' + 'padding-bottom: 10px;'
document.querySelector('.opcoestd').style.cssText = 'padding-top: 200px;'+'position: absolute;'
document.querySelector('.opcoestd').children[0].style.cssText = 'background-color: white;'
document.querySelector('.opcoestd').children[1].style.cssText = 'background-color: white;'

function createEle(ele,texto = '',clas,titulo){
    let EleCriado = document.createElement(ele);
    EleCriado.innerText = texto;
    if(clas !== undefined) EleCriado.classList = clas;
    if(titulo !== undefined) EleCriado.title = titulo
    return EleCriado;
}

document.querySelector('.iniciarBtn').addEventListener('click',function(){
    let stringJSON = JSON.stringify(1);
    localStorage.setItem('Estado', stringJSON);
    verifica();
})
document.querySelector('.pausarBtn').addEventListener('click',function(){
    let stringJSON = JSON.stringify(0);
    localStorage.setItem('Estado', stringJSON);
    clearInterval(principal);
    clearInterval(secundario);
    verifica();
})
document.querySelector('.ordemBtn').addEventListener('click',function(){
        verifica1();
})
document.querySelector('.questBtn').addEventListener('click',function(){
        verifica2();
})

function verifica(){
    if(localStorage.getItem('Estado') === '1'){
        startScript();
        Secundario();
        document.querySelector('.StatusLab').innerText = 'RODANDO';
        document.querySelector('.StatusLab').style.cssText += 'color: green;'
    }else if(localStorage.getItem('Estado') === '0'){
        document.querySelector('.StatusLab').innerText = 'PAUSADO';
        document.querySelector('.StatusLab').style.cssText += 'color: red;'
    }
}

if(botao === undefined || botao === null){
    Construção_Edificios_Ordem = true;
    let stringJSON = JSON.stringify('Sim');
    localStorage.setItem('Ordem', stringJSON);
    document.querySelector('.ordemBtn').innerText = 'Sim'
    document.querySelector('.ordemBtn').title = 'Construir em Ordem'
}else if(botao === 'Não'){
    Construção_Edificios_Ordem = false;
    document.querySelector('.ordemBtn').innerText = 'Não'
    document.querySelector('.ordemBtn').title = 'Construir Qualquer Edificio Disponivel'
}
if(botao2 === undefined || botao2 === null){
    Construção_Edificios_Quest = false;
    let stringJSON = JSON.stringify('Não');
    localStorage.setItem('Quests', stringJSON);
    document.querySelector('.questBtn').innerText = 'Não'
    document.querySelector('.questBtn').title = 'Priorizar Quest: Desligado'
}else if(botao2 === 'Sim'){
    Construção_Edificios_Quest = true;
    document.querySelector('.questBtn').innerText = 'Sim'
    document.querySelector('.questBtn').title = 'Priorizar Quest: Ligado'
}
verifica();

// Comandos Futuros a serem introduzidos
//javascript: document.getElementsByClassName('order_feature btn btn-btr btn-instant-free')[0].click();
//javascript: document.getElementsByClassName('btn btn-confirm-yes')[0].click()
