size = 0;

window.addEventListener('load', ajustarLayout);
window.addEventListener('resize', ajustarLayout);

function ajustarLayout() {
verBotao = document.querySelectorAll(".botao-mobile");

  
  if (window.innerWidth < 426 && verBotao.length == 0) {
    size = ++size;
    let mouseover= document.querySelector("#ver-click-info");
    mouseover.onmouseover = null;
    mouseover.onmouseout = null;
    let mouseover2= document.querySelector("#ver-auto-info")
    mouseover2.onmouseover = null;
    mouseover2.onmouseout = null;
    
    let ocultarUpgrades = document.querySelector(".container-upgrades");
    ocultarUpgrades.style.display = 'none';

    let colocarBotao = document.querySelector(".status");
    let botaoMobile = document.createElement("button");
    botaoMobile.classList.add("botao-mobile");
    botaoMobile.textContent = "Upgrades";
    
    colocarBotao.appendChild(botaoMobile);

    botaoMobile.addEventListener('click', function(){
        if(ocultarUpgrades.style.display == 'none'){
            ocultarUpgrades.style.display = 'grid';
            botaoMobile.textContent = "Ocultar";
            desClickinfo();
            desAutoInfo();
        }else{
            ocultarUpgrades.style.display = 'none';
            botaoMobile.textContent = "Upgrades";
            colocarInfo.removeChild(info);
            colocarInfoAuto.removeChild(infoAuto);
        }
    })
  }else if(window.innerWidth > 426 && verBotao.length == 1) {
    size = --size;
    let ocultarUpgrades = document.querySelector(".container-upgrades");
    ocultarUpgrades.style.display= "grid";
    botaoMobile = document.querySelector(".botao-mobile");
    botaoMobile.remove();
    let mouseover= document.querySelector("#ver-click-info");
    
    mouseover.onmouseover = function(event){
        mostrarInfoClick(event)}
    mouseover.onmouseout = function(event){
        esconderInfo();
    };
    let mouseover2= document.querySelector("#ver-auto-info")
    mouseover2.onmouseover = function(event){
        mostrarInfoAuto(event)
    };
    mouseover2.onmouseout = function(event){
        esconderInfoAuto();
    };
    if(colocarInfo == undefined || colocarInfoAuto == undefined){
        return
    }else{
    colocarInfo.removeChild(info);
    colocarInfoAuto.removeChild(infoAuto);
    }
  }
}


let diamanteElement = document.querySelector('.texto-diamante');
let DPC = document.querySelector('.dpc h1');
let DPS = document.querySelector('.dps p');
let porcentagemFome = 100;
let clickDefault = 1;
let timeoutMensagem;
let upg1AddDiamante = clickDefault;

setInterval(function () {
        porcentagemFome = Math.max(porcentagemFome - 5 , 0);
        document.querySelector('.texto-fome').innerHTML = porcentagemFome + "%";
        
    if(porcentagemFome < 50){
        colocarbf();
    }else if(porcentagemFome > 50 ){
        removerbf();
    }

    if(porcentagemFome >= 80){
        criarMensagem("Comida acima de 80%, bonus de click +1");
    }else{
        removerMensagem();
    }
    totalDPC();
    autoClick();
},1000);

function comer() {
    let fomeElement = document.querySelector('.texto-fome');
    let numeroFome = parseInt(fomeElement.innerHTML);
    let numeroDiamantes = parseInt(diamanteElement.innerHTML);

    if(numeroDiamantes < 10){
        darComida();
    }else{
        darComida();
        numeroFome = Math.min(numeroFome + addComida().addValor, 100);
        numeroDiamantes = numeroDiamantes - 10;
        diamanteElement.innerHTML =  numeroDiamantes;
        fomeElement.innerHTML = numeroFome + "%";
        porcentagemFome = numeroFome;
    totalDPC();
    dilica();
    if(porcentagemFome > 50 ){
        removerbf();
        }   
    }
}

function addComida(){
    let soma = Math.floor(porcentagemFome / 10);
    let addValor = 25 + soma;
    return {addValor, soma};
}

function hmmFome(){
        const colocarHmm = document.querySelector('.status')
        let mensagemFome = document.createElement('p');
        mensagemFome.textContent = "Hmm to com fome!";
        mensagemFome.classList.add('mensagem-fome');
        colocarHmm.appendChild(mensagemFome);
}

function balao(){
    const colocarBalao = document.querySelector('.status')
    let imagemBalao = document.createElement('img')
        imagemBalao.src="./assets/balao.png";
        imagemBalao.classList.add('balao');
        colocarBalao.appendChild(imagemBalao);
}

function colocarbf(){
    imagemBalao = document.querySelector(".balao");
    mensagemFome = document.querySelector(".mensagem-fome");
    if(imagemBalao == null && mensagemFome == null){
    balao();
    hmmFome();
    }
}


function removerbf(){
    imagemBalao = document.querySelector(".balao");
    mensagemFome = document.querySelector(".mensagem-fome");

    if(imagemBalao == null && mensagemFome == null){
    return;
    }else{
        imagemBalao.remove();
        mensagemFome.remove();
    }
}

function dilica(){
    const colocardilica = document.querySelector('.status')
    let luadlc = document.createElement('img');
    luadlc.src= "./assets/luadilica.png";
    luadlc.classList.add('dilica');
    colocardilica.appendChild(luadlc);
    setTimeout(function() {
        luadlc.remove();
    }, 900);
}

    
function clickDiamante(event) {
    let numeroDiamantes = parseInt(diamanteElement.innerHTML);
    bonusComida = Math.floor(addComida().soma / 8);
    let clickFinalDiamante = numeroDiamantes + upg1AddDiamante + bonusComida;
    let diamantePorCLick = upg1AddDiamante + bonusComida;
    diamanteElement.innerHTML = clickFinalDiamante
    animacaoClick(diamantePorCLick, event);
    totalDPC(diamantePorCLick);

}

function totalDPC (){
    texto = document.querySelector(".dpc h1");
    bonusComida = Math.floor(addComida().soma / 8);
    let diamantePorCLick = upg1AddDiamante + bonusComida;
    DPC.innerHTML = "Dpc: " + diamantePorCLick ;
    return(diamantePorCLick);
}

function darComida(){
    let numeroDiamantes = parseInt(diamanteElement.innerHTML);
        if(numeroDiamantes == 9){
            criarMensagemComida("Preciso de mais 1 diamante para comer :(");
            iniciarTimeout()
        }else if(numeroDiamantes < 10) {
            criarMensagemComida("Preciso de mais " + (10 - numeroDiamantes) + " diamantes para comer :(");
            iniciarTimeout()
        }else{
            removerMensagemComida()
        }
}

    function criarMensagemComida(texto) {
        const novaMensagem = document.querySelector('.status');
        removerMensagem();
        let mensagem = document.createElement('p');
        mensagem.textContent = texto;
        mensagem.classList.add('dar-comida', 'mensagem-user');
        novaMensagem.appendChild(mensagem);
    }
    
    function removerMensagemComida(){
             mensagemComida = document.querySelector('.dar-comida');
             if(mensagemComida){
            mensagemComida.remove();
        }
    }   

function criarMensagem(texto) {
    const novaMensagem = document.querySelector('.status');
    removerMensagem();
    let mensagem = document.createElement('p');
    mensagem.textContent = texto;
    mensagem.classList.add('mensagem-user');
    novaMensagem.appendChild(mensagem);
}


function iniciarTimeout() {
    timeoutMensagem = setTimeout(function () {
        removerMensagem();
    }, 5000);
}

function removerMensagem() {
    let removerMensagemElement = document.querySelector('.mensagem-user');
    if (removerMensagemElement) {
        removerMensagemElement.remove();
    }
}

function semDiamante(){
    const novaMensagem = document.querySelector('.status');
    removerMensagem();
    const texto = document.createElement("p");
    if(size == 1){
        texto.classList.add("mensagem-sem-diamantes-mobile");
    }
    texto.classList.add("mensagem-user");
    texto.textContent = "Sem diamantes suficientes :(";
    novaMensagem.appendChild(texto);
}

    let upg1valor = document.querySelector(".valorUpg1");
    let lvlUpgradeAtual1 = document.querySelector(".upgText1")
    let upg1 = parseInt(upg1valor.innerHTML);
    let lvlupg1 = 0;
    const valorUpg1 = [100,105,110,120,140];
    const addClickDiamante = [2,4,8,13,18];
    const addClickInfo = [1,2,4,5,6]
    

function upgrade1(){
    
    let numeroDiamantes = parseInt(diamanteElement.innerHTML);
    upg1 = valorUpg1[lvlupg1];
    
    if(numeroDiamantes < upg1){
        semDiamante()
        iniciarTimeout();
        }else{
            if(upg1 == null){
                return;
            }
            
        numeroDiamantes = Math.max(numeroDiamantes - upg1, 0); 

        upg1AddDiamante = addClickDiamante[lvlupg1];
        lvlupg1 = ++lvlupg1;   
        upg1 = valorUpg1[lvlupg1];
        diamanteElement.innerHTML = numeroDiamantes;

        if(upg1 == null){
            upg1AddDiamante = upg1AddDiamante;
            upg1valor.innerHTML = "Max.";
            lvlUpgradeAtual1.innerHTML = "Max";
            esconderInfo();
            totalDPC();
            if(size == 1){
                desClickinfo();
            }else{
            mostrarInfoClick(event);
            }
            totalDPC();
            return;
        }

        upg1valor.innerHTML = `Valor: ${upg1}`;
        lvlUpgradeAtual1.innerHTML = lvlupg1;
        esconderInfo();
        if(size == 1){
            desClickinfo();
        }else{
        mostrarInfoClick(event);
        }
        totalDPC();
        return;
    }
}

    let upg2valor = document.querySelector(".valorUpg2");
    let lvlUpgradeAtual2 = document.querySelector(".upgText2")
    let upg2 = parseInt(upg2valor.innerHTML);
    let lvlupg2 = 0;
    const valorUpg2 = [250,300,350,400,500];
    const addAutoClickDiamante = [1,3,5,7,10]
    const addAutoInfo = [1,2,2,2,3];
    let AutoDiamante = 0;

function upgrade2(){
    
    let numeroDiamantes = parseInt(diamanteElement.innerHTML);
    upg2 = valorUpg2[lvlupg2];
    
    if(numeroDiamantes < upg2){
        semDiamante()
        iniciarTimeout();
        }else{

            if(upg2 == null){
                return;
            }

        numeroDiamantes = Math.max(numeroDiamantes - upg2, 0);   

        AutoDiamante = addAutoClickDiamante[lvlupg2];
        lvlupg2 = ++lvlupg2; 
        upg2 = valorUpg2[lvlupg2];
        diamanteElement.innerHTML = numeroDiamantes;

        if(upg2 == null){
            AutoDiamante = AutoDiamante;
            upg2valor.innerHTML = "Max.";
            lvlUpgradeAtual2.innerHTML = "Max";
            esconderInfoAuto();
            if(size == 1){
                desAutoInfo();
            }else{
                mostrarInfoAuto(event);
            }
            autoClick();
            return;
        }
        
        upg2valor.innerHTML = `Valor: ${upg2}`;
        lvlUpgradeAtual2.innerHTML = lvlupg2;
        esconderInfoAuto();
        if(size == 1){
            desAutoInfo();
        }else{
            mostrarInfoAuto(event);
        } 
        autoClick();
        return;
    }
}

function autoClick(){
    let numeroDiamantes = parseInt(diamanteElement.innerHTML);
    numeroDiamantes = numeroDiamantes + AutoDiamante;
    diamanteElement.innerHTML = numeroDiamantes;
    DPS.innerHTML = "Dps: " + AutoDiamante;
}

function animacaoClick(diamantePorCLick, event){

    const colocarClick = document.createElement("p");
    const numeroClick = diamantePorCLick;
    colocarClick.classList.add("numeroClick");
    const elementosClick = [];

       
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        

        colocarClick.innerHTML = "+" + numeroClick;
       
        colocarClick.style.left = mouseX + 'px';
        colocarClick.style.top = mouseY + -50 + 'px';
        colocarClick.style.display = 'block';
        document.body.appendChild(colocarClick);
        elementosClick.push(colocarClick); 

        setTimeout(function () {
            
            elementosClick.splice(elementosClick.indexOf(colocarClick), 1);
            colocarClick.remove();
        }, 900);
   
}

function mostrarInfoClick(event){
   quadradoDiamantes = document.querySelector(".mais-diamantes-info");
   info = document.createElement("p");
   info.classList.add("info-text");
   valor = valor = "+" + addClickInfo[lvlupg1];
   valorHTML = `<span style="color: red;">${valor}</span>`;
   if(lvlupg1 <= 0){
    info.innerHTML = `Adiciona ${valorHTML} diamante ao clicar na lua (DPC ${valorHTML})`;
   }else if(lvlupg1 > 0 && addAutoClickDiamante[lvlupg1] != undefined){
    info.innerHTML = `Adicionar ${valorHTML} diamantes ao clicar na lua (DPC ${valorHTML})`;
   }else{
    info.innerHTML = "Você comprou todos os níveis desse upgrade :)";
   }

   const mouseX = event.clientX - quadradoDiamantes.offsetLeft;
   const mouseY = event.clientY - quadradoDiamantes.offsetTop;

    info.style.left = mouseX + 'px';
    info.style.top = mouseY + -50 +'px';
    info.style.position = 'absolute'; 
    document.body.appendChild(info);
}

function mostrarInfoAuto(event){
    quadradoDiamantes = document.querySelector(".auto-diamantes-info");
    infoAuto = document.createElement("p");
    infoAuto.classList.add("info-text");
    valor = "+" + addAutoInfo[lvlupg2];
    valorHTML = `<span style="color: red;">${valor}</span>`;
    if([lvlupg2] <= 0){
        infoAuto.innerHTML = `Gerar  ${valorHTML} diamante por segundo (DPS ${valorHTML})`;
    }else if(lvlupg2 > 0 && addAutoClickDiamante[lvlupg2] != undefined){
        infoAuto.innerHTML = `Gerar  ${valorHTML} diamantes por segundo (DPS ${valorHTML})`;
    }else{
        infoAuto.innerHTML = "Você comprou todos os níveis desse upgrade :)";
    }
    
    const mouseX = event.clientX - quadradoDiamantes.offsetLeft;
    const mouseY = event.clientY - quadradoDiamantes.offsetTop;
 
    infoAuto.style.left = mouseX + 'px';
    infoAuto.style.top = mouseY + -50 +'px';
    infoAuto.style.position = 'absolute'; 
     document.body.appendChild(infoAuto);
}

function esconderInfo(){
    info.remove();
}

function esconderInfoAuto(){
    infoAuto.remove();
}

function desClickinfo(){
    quadradoDiamantes = document.querySelector(".mais-diamantes-info");
    info = document.createElement("td");
    info.classList.add("desc-info-text");
    valor = valor = "+" + addClickInfo[lvlupg1];
    valorHTML = `<span style="color: red;">${valor}</span>`;
    if(lvlupg1 <= 0){
     info.innerHTML = `Adiciona ${valorHTML} diamante ao clicar na lua (DPC ${valorHTML})`;
    }else if(lvlupg1 > 0 && addAutoClickDiamante[lvlupg1] != undefined){
     info.innerHTML = `Adicionar ${valorHTML} diamantes ao clicar na lua (DPC ${valorHTML})`;
    }else{
     info.innerHTML = "Você comprou todos os níveis desse upgrade :)";
    }
    info.colSpan = 2;
   colocarInfo = document.getElementById("ver-click-info");
   colocarInfo.appendChild(info);
}

function desAutoInfo(){
    quadradoDiamantes = document.querySelector(".auto-diamantes-info");
    infoAuto = document.createElement("td");
    infoAuto.classList.add("desc-info-text");
    valor = "+" + addAutoInfo[lvlupg2];
    valorHTML = `<span style="color: red;">${valor}</span>`;
    if([lvlupg2] <= 0 ){
        infoAuto.innerHTML = `Gerar  ${valorHTML} diamante por segundo (DPS ${valorHTML})`;
    }else if(lvlupg2 > 0 && addAutoClickDiamante[lvlupg2] != undefined){
        infoAuto.innerHTML = `Gerar  ${valorHTML} diamantes por segundo (DPS ${valorHTML})`;
    }else{
        infoAuto.innerHTML = "Você comprou todos os níveis desse upgrade :)";
    }
    infoAuto.colSpan = 2;
    colocarInfoAuto = document.getElementById("ver-auto-info");
    colocarInfoAuto.appendChild(infoAuto);
}