const canvas = document.getElementsByClassName('canvas')[0];
const pontos =  document.getElementsByClassName('pontos')[0];

let canhaoX = 250;
let velocidade = 10;
let balaY = 500
let balaX
const widthMax = 530;
const widthMin = 0;
const canhao = new Image();
let pontosCont =0
let atirar = true;
pontos.textContent = `Pontos: ${pontosCont}`

canhao.src = './assets/cannon.png';
canhao.width = '70';
canhao.height= '50';
canhao.style.position = 'absolute'
canhao.style.top = '550px'
canhao.style.left = `${canhaoX}px`
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
                balaY-=2   
                atirar = false;
            }else{
                resetBala()
            }

        },1)

    }
    function invaderCriar(invaderX,invaderY){
        let invaderImg = new Image();
        let mudar =true;

        invaderImg.src = './assets/invader.png'
        invaderImg.width = '50'
        invaderImg.style.position = 'absolute';
        invaderImg.setAttribute('class','invader-img')
        
        invaderImg.style.left = `${invaderX}px`;  
        canvas.appendChild(invaderImg)
        let anima = setInterval(()=>{
            if(invaderY <=550){
                invaderImg.style.top = `${invaderY}px`
                
                try {
                    detectarColisao(balaX,balaY,invaderX,invaderY,invaderImg);
                } catch (error) {
                }
            }else{
                clearInterval(anima)
                canvas.removeChild(invaderImg)
                
                              
            }
            invaderY+=1;
        },100)
        setInterval(()=>{
                    
            if(mudar){
                invaderX += 50;
                mudar = false
            }else{
                invaderX-=50
                mudar = true
            }
            invaderImg.style.left = `${invaderX}px`

        },1000)



        
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
    


    // invaderCriar(500,0)

    setInterval(()=>{
        let invader = document.getElementsByClassName('invader-img')[0];
        let existeInvader = document.body.contains(invader);
        if (!existeInvader) {            
            quantidade = 10
            for(let i =0;i<=500;i+=50){
                let y = Math.floor(Math.random() * (200 - 20 + 20)) + 20;
                invaderCriar(i,y)
            }
        }
    },10)



}


jogoInicio()