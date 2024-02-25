const canvas = document.getElementsByClassName('canvas')[0];
const pontos =  document.getElementsByClassName('pontos')[0];
const vida =  document.getElementsByClassName('vida')[0];
const menuInicio = document.getElementsByClassName('menu')[0]
const menuPerdeu = document.getElementsByClassName('menu')[1]


let vidaCont = 5;
let canhaoX = 250;
let velocidade = 10;
let balaY = 500
let balaX
let run = false
let speedInvader = 1
const widthMax = 530;
const widthMin = 0;
const canhao = new Image();
let pontosCont =0
let atirar = false;
canhao.src = './assets/cannon.png';
canhao.width = '70';
canhao.height= '50';
canhao.style.position = 'absolute'
canhao.style.top = '550px'
canhao.style.left = `${canhaoX}px`
canvas.appendChild(canhao)
let quantidade = 50;


function menuIniciar(){
    menuInicio.classList.add('none')
    canvas.classList.remove('none')
    run = true
    vidaCont = 5
    quantidade = 50
    pontosCont = 0
    vida.textContent = `vida: 5/${vidaCont}`
    pontos.textContent = `pontos: ${pontosCont}`


}
function reniciarJogo(){
    canvas.classList.remove('none')
    menuPerdeu.classList.add('none')
    vidaCont = 5
    run = true;
    quantidade = 50
    pontosCont = 0
    vida.textContent = `vida: 5/${vidaCont}`
    pontos.textContent = `pontos: ${pontosCont}`


}

function menuPerda(){
    canvas.classList.add('none')
    menuPerdeu.classList.remove('none')
}
function voltarMenu(){
    menuInicio.classList.remove('none')
    menuPerdeu.classList.add('none')

}
function moverCanhaoDireita(){
    canhaoX += velocidade
    canhao.style.left = `${canhaoX}px` 
}


function moverCanhaoEsquerda(){
    canhaoX -= velocidade
    canhao.style.left = `${canhaoX}px`
}


const bala = new Image();

function atirarBala(){
    bala.src = './assets/bullet_line.png';
    bala.style.position = 'absolute'
    bala.width = '50'
    bala.style.top = '500px'
    
    bala.style.left = `${balaX}px`;
    canvas.appendChild(bala)
    bala.setAttribute('id','bala')
    function resetBala(){
        balaY = 500
        try {
            canvas.removeChild(bala)
        } catch (error) {
            
        }
    }
    if(balaY >=0){
        bala.style.top = `${balaY}px`
        balaY-=5 
    }else{
        resetBala()
        balaX = ''
        atirar = false
    }
}

function invaderCriar(invaderX,invaderY){
    let invaderImg = new Image();
    let mudar =true;

    invaderImg.src = './assets/space__0000_A1.png'
    invaderImg.width = '25'
    invaderImg.style.position = 'absolute';
    invaderImg.setAttribute('class','invader-img')
    
    invaderImg.style.left = `${invaderX}px`;  
    canvas.appendChild(invaderImg)
    let anima = setInterval(()=>{
        if(invaderY < 580){
            invaderImg.style.top = `${invaderY}px`
            invaderY+= speedInvader;
            try {
                detectarColisao(balaX,balaY,invaderX,invaderY,invaderImg);
            } catch (error) {
            }
        }else{
            let existeInvader = document.body.contains(invaderImg);
            if (existeInvader){
                canvas.removeChild(invaderImg)            
                --vidaCont;
            }

            vida.textContent = `vida:5/${vidaCont}`
            clearInterval(anima)

        }
        
    },50)
    setInterval(()=>{ 
        if(mudar){
            invaderX += 50;
            mudar = false
            invaderImg.src = './assets/space__0001_A2.png'
        }else{
            invaderX-=50
            mudar = true
            invaderImg.src = './assets/space__0000_A1.png'
        }
        invaderImg.style.left = `${invaderX}px`
    },1000)
}

function detectarColisao(balaX,Ybala,posicaoInvaderX,posicaoInvaderY,invaderImg ){
    if(posicaoInvaderY+20 > Ybala && posicaoInvaderY-40 < Ybala  && balaX >=posicaoInvaderX-25 && balaX < posicaoInvaderX){            
        canvas.removeChild(invaderImg)
        let bala = document.getElementById('bala')
        balaY = -1
        canvas.removeChild(bala )
        pontos.textContent = `pontos: ${++pontosCont}`
    }
}

function jogoInicio(){

    window.addEventListener('keydown',(e)=>{
        if(e.key == 'ArrowRight' && canhaoX < widthMax){
            moverCanhaoDireita();
        }else if(e.key == 'ArrowLeft' && canhaoX > widthMin){
            moverCanhaoEsquerda();
        }else if(e.key == ' ' && !atirar){
            atirar = true
            balaX = canhaoX+12;
        };  
    })
  
    setInterval(()=>{
        if(run){
            let invader = document.getElementsByClassName('invader-img');
            let existeInvader = document.body.contains(invader[0]);
            if (!existeInvader) {            
                for(let i =50;i<=quantidade;i+=50){
                    let y = Math.floor(Math.random() * (200 - 1 + 1)) + 1;
                    invaderCriar(i,y)
                }
                if(quantidade < 500){
                    quantidade += 50;
                } 
                speedInvader = Math.floor(Math.random() * (3- 1 + 1)) + 1
            }


            if(atirar) atirarBala();
            if(vidaCont == 0){
               let arrayInvaders = Array.from(invader)
                for(let i = 0; i < arrayInvaders.length;++i ){
                    try {
                        canvas.removeChild(arrayInvaders[i])
                    } catch (error) {   
                    }
                }
                                        
                menuPerda(); 
                run = false;
            }            
        }

    },10)

}


jogoInicio()