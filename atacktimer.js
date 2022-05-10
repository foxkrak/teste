let tempo;
let timerS = JSON.parse(localStorage.getItem('activetab'))[1];
let total;
let horaz;
let horax;
let dataIr;
if(document.querySelector('.vis').querySelectorAll('tr').length < 7){
    tempo = document.querySelector('.vis').querySelectorAll('tr')[2].querySelectorAll('td')[1].innerText.split(':');
    total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
}else{
    tempo = document.querySelector('.vis').querySelectorAll('tr')[3].querySelectorAll('td')[1].innerText.split(':');
    total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
}

(function() {
    setInterval(() =>{
        let dat = document.querySelector('#serverDate').innerText.split('/');
        let h = document.querySelector('#serverTime').innerText.split(':');
        let data = new Date(dat[2],dat[1]-1,dat[0],h[0],h[1],h[2]);
        dataIr = new Date(horaz);
        //timerS = JSON.parse(localStorage.getItem('activetab'))[1]+2900;
        if(data.getDate() === dataIr.getDate() && data.getMonth() === dataIr.getMonth() && data.getFullYear() === dataIr.getFullYear() && data.getHours() === dataIr.getHours() && data.getMinutes() === dataIr.getMinutes() && data.getSeconds() === dataIr.getSeconds()){
            document.querySelector('.avisos').innerText = 'Enviando.'
            window.onload = document.querySelector('#troop_confirm_submit').click();
        }
    },10)
})();

function html(){
    let html = `<br><td class="opcoestd content-border border-frame-gold-red" style="margin-top: 200px; position: absolute;">
      <table class="vis">
            <tbody>
            <tr>
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos1" colspan="6"><h3>[Ataque Timer]</h3></td>
            </tr>
            <tr>
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos" colspan="6"></td>
            </tr>
            <tr>
              <td style="text-align: center; width: 5px;"><span class="icon header time"></span></td>
              <td class="tempoD" style="text-align: center"><h5>Data:</h5></td>
              <td colspan="2" style="text-align: center; width: 5px;"><h5><input type="datetime-local" class="data" step="1" style="width: auto; height: 20px; font-size: 15px;"></input></h5></td>
            </tr>
            <tr>
              <td colspan="6" style="text-align: center; padding: 10px; width: 270px"><button class="send btn" style="margin-right: 10px;">Salvar</button></td>
              <span style="float: right; font-size: xx-small; font-weight: normal;">Updated by WFox: v1.6</span>
            </tr>
            </tbody>
      </table>
        </td>`
    return html;
}
document.querySelector('#content_value').appendChild(createEle('div','atackauto'))
document.querySelector('.atackauto').innerHTML = html();
document.querySelector('.data').valueAsNumber = timerS-10800000

document.querySelector('.send').addEventListener('click',function(){
    horax = document.querySelector('.data').valueAsNumber+10800000
    horaz = horax-total
    console.log(new Date(horaz))
    if(horax === ''){
        document.querySelector('.avisos').innerText = 'Precisa por um horario de Chegada';
        return;
    }
    if(timerS > horaz){
        console.log('Já passou o tempo.')
        document.querySelector('.avisos').innerText = 'Ja passou do tempo.'
    }else if(timerS < horaz){
        document.querySelector('.avisos').innerText = 'Aguardando'
        document.querySelector('.send').innerText = 'Salvo'
        $('.send').prop("disabled",true);
    }
})

function createEle(ele,clas){
    let EleCriado = document.createElement(ele);
    if(clas !== undefined) EleCriado.classList = clas;
    return EleCriado;
}
