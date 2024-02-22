const canvas = document.getElementsByClassName('canvas')[0];
const pontos =  document.getElementsByClassName('pontos')[0];

const screen_height = 720
const screen_width = 1080


let canhaoX = 250;
let velocidade = 10;
let balaY = 500
let balaX
let border = 10

const widthMax = screen_width - border;
const widthMin = 0 + border;
const canhao = new Image();
let pontosCont = 0
let atirar = true;
pontos.textContent = `Pontos: ${pontosCont}`

canhao.src = './assets/cannon.png';
canhao.width = '70';
canhao.height= '50';
canhao.style.position = 'absolute'
canhao.style.top = (screen_height - parseInt(canhao.height) - 10)+'px'
canhao.style.left = `${canhaoX}px`
canvas.appendChild(canhao)

export function jogoInicio(){
    window.addEventListener('keydown',(e)=>{
        if((e.key == 'ArrowRight' || e.key == 'd') && canhaoX < widthMax){

            moverCanhaoDireita();
        }else if((e.key == 'ArrowLeft' || e.key == 'a') && canhaoX > widthMin){
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
            balaY = (screen_height - parseInt(canhao.height) - 10)
            clearInterval(anima)  
            try {
                canvas.removeChild(bala)
            } catch (error) {
                
            }
            
        }

        let anima = setInterval(()=>{
            if(balaY >=0){
                bala.style.top = `${balaY}px`
                balaY-=2   
                atirar = false;
            }else{
                resetBala()
            }

        },1)

    }
    function invaderCriar(invaderX,invaderY){
        let invaderImg = new Image();
        let mudar = true;
        let limit_x = invaderX
        let speed = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

        invaderImg.src = './assets/invader.png'
        invaderImg.width = '50'
        invaderImg.style.position = 'absolute';
        
        invaderImg.style.left = `${invaderX}px`;  
        canvas.appendChild(invaderImg)
        let anima = setInterval(()=>{
            if(invaderY <= 670){
                invaderImg.style.top = `${invaderY}px`
                
                try {
                    detectarColisao(balaX,balaY,invaderX,invaderY,invaderImg);
                } catch (error) {
                }
            }else{
                invaderY = 0                
            }
            invaderY+=speed;
        },100)

        

        setInterval(()=>{        
            if(mudar){
                invaderX += 1;
                if (invaderX >= limit_x + 25) {
                    mudar = false
                }
            }else{
                invaderX -= 1;
                if (invaderX <= limit_x - 25) {
                    mudar = true
                }
            }
            invaderImg.style.left = `${invaderX}px`  

        },20)



        
    }
    function detectarColisao(balaX,Ybala,posicaoInvaderX,posicaoInvaderY,invaderImg ){
        if(posicaoInvaderY+40 > Ybala && posicaoInvaderY < Ybala  && balaX >=posicaoInvaderX-20 && balaX < posicaoInvaderX+20){            
            canvas.removeChild(invaderImg)
            let bala = document.getElementById('bala')
            balaY = -1
            canvas.removeChild(bala )
            pontos.textContent = `Pontos: ${++pontosCont}`
            console.log(pontosCont)
        }
    }
    
    invaderCriar(50,100)
    invaderCriar(150,0)
    invaderCriar(250,0)

}


jogoInicio()