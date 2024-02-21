const canvas = document.getElementsByClassName('canvas')[0];

let canhaoX = 0;
let velocidade = 10;
let balaY = 500
let balaX

const widthMax = 530;
const widthMin = 0;
const canhao = new Image();

let atirar = true;

canhao.src = './assets/cannon.png';
canhao.width = '70';
canhao.height= '50';
canhao.style.position = 'absolute'
canhao.style.top = '550px'
canvas.appendChild(canhao)


function jogoInicio(){
    window.addEventListener('keydown',(e)=>{
        if(e.key == 'ArrowRight' && canhaoX < widthMax){
            moverCanhaoDireita();
        }else if(e.key == 'ArrowLeft' && canhaoX > widthMin){
            moverCanhaoEsquerda();
        }else if(e.key == ' '){
            if(atirar) atirarBala();
        };
    })
    function moverCanhaoDireita(){
        canhaoX += velocidade
        canhao.style.left = `${canhaoX}px` 
    }
    function moverCanhaoEsquerda(){
        canhaoX -= velocidade
        canhao.style.left = `${canhaoX}px`
    }
    function atirarBala(){
        const bala = new Image();
        bala.src = './assets/bullet_line.png';
        bala.style.position = 'absolute'
        bala.width = '50'
        bala.style.top = '500px'
        balaX = canhaoX+12;
        bala.style.left = `${balaX}px`;
        canvas.appendChild(bala)
        bala.setAttribute('id','bala')
        function resetBala(){
            atirar = true
            balaY = 500
            clearInterval(anima)  
            try {
                canvas.removeChild(bala)
            } catch (error) {
                
            }
            
        }

        let anima = setInterval(()=>{
            if(balaY >=0){
                bala.style.top = `${balaY}px`
                balaY-=1
                atirar = false;
            }else{
                resetBala()
            }

        },1)

    }
    function invaderCriar(invaderX,invaderY){
        let invaderImg = new Image();
        invaderImg.src = './assets/invader.png'
        invaderImg.width = '50'
        invaderImg.style.position = 'absolute';
        
        invaderImg.style.left = `${invaderX}px`;  
        canvas.appendChild(invaderImg)
        let anima = setInterval(()=>{
            if(invaderY <=550){
                invaderImg.style.top = `${invaderY}px`
                ++invaderY
                try {
                    detectarColisao(balaX,balaY,invaderX,invaderY,invaderImg);
                } catch (error) {
                }
            }else{
                invaderY = 0                
            }
            
        },10)
        
    }
    function detectarColisao(balaX,balaY,posicaoInvaderX,posicaoInvaderY,invaderImg ){
        if(posicaoInvaderY+20 > balaY && posicaoInvaderY < balaY  && balaX >=posicaoInvaderX-10 && balaX < posicaoInvaderX+20){            
            canvas.removeChild(invaderImg)
            let bala = document.getElementById('bala')
            balaY = -1
            canvas.removeChild(bala )
        }
    }
    for(let i = 0;i < 250;i+=50){
        invaderCriar(i,0)
    }

}


jogoInicio()