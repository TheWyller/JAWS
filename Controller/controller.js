function controlePlotagem()
{
    desenhar.barras  = document.getElementById("mostrarBarras").checked;
    desenhar.apoios = document.getElementById("mostrarApoios").checked;
    desenhar.carregamento = document.getElementById("mostrarCarregamentos").checked;
    desenhar.cortante = document.getElementById("diagramaCortante").checked;
    desenhar.momentoFletor = document.getElementById("diagramaMomento").checked;
    desenhar.axial = document.getElementById("diagramaAxial").checked;
    desenhar.flexa = document.getElementById("diagramaDeformacoes").checked;
    desenhar.solucao = document.getElementById("mostrarSolucao").checked;
    desenhar.escalaAxial = null;
    desenhar.escalaFletor = null;
    desenhar.escalaCortante = null;
    desenhar.escalaFlexa = document.getElementById("escalaFlexa").value;
    return desenhar;
}



function propriedadesRetangular(id)
{
    let base = parseFloat(document.getElementById("retBase").value);
    let altura = parseFloat(document.getElementById("retAltura").value);
    document.getElementsByName("A"+id)[0].value = (base * altura).toPrecision(5);
    document.getElementsByName("I"+id)[0].value = ( (base * Math.pow(altura, 3))/12).toFixed(2);
    document.getElementsByName("E"+id)[0].value = document.getElementById("matType1").value;
}


function propriedadesPerfilT(id)
{
     // Perfil T
     let hw = parseFloat(document.getElementById("hw").value);
     let tw = parseFloat(document.getElementById("tw").value);
     let bf = parseFloat(document.getElementById("bf").value);
     let tf = parseFloat(document.getElementById("tf").value);
     let area = (bf*tf)+(hw*tw);   
     let ycg =  (hw * tw * (hw / 2) + bf * tf * (hw + tf / 2))/area;
  
     let Ix =  ( (tw * Math.pow(hw,3)) / 12) + (hw * tw * Math.pow( (hw/2) - ycg, 2)) + ( (bf * Math.pow(tf,3)) / 12) + (tf * bf * Math.pow((tf/ 2) + hw - ycg, 2));
     
     document.getElementsByName("A"+id)[0].value = (area).toPrecision(5);
     document.getElementsByName("I"+id)[0].value = (Ix).toFixed(2);;
     document.getElementsByName("E"+id)[0].value = document.getElementById("matType2").value;
}

function propriedadesSecaoH(id)
{
    let hw = parseFloat(document.getElementById("hw1").value);
    let tw = parseFloat(document.getElementById("tw1").value);
    let bf = parseFloat(document.getElementById("bf1").value);
    let tf = parseFloat(document.getElementById("tf1").value);
    let area = (2*bf*tf)+(hw*tw);   
    let Ix =  ((tw*Math.pow(hw,3))/12) + 2*(  ((bf*Math.pow(tf,3))/12) + (bf*tf)*Math.pow(((hw+tf)/2),2) );
    document.getElementsByName("A"+id)[0].value = (area).toPrecision(5);
    document.getElementsByName("I"+id)[0].value = (Ix).toFixed(2);;
    document.getElementsByName("E"+id)[0].value = document.getElementById("matType3").value;

}

function propriedadesSecaoRetVazada(id)
{
    let b1 = document.getElementById("b1").value;
    let b2 = document.getElementById("b2").value;
    let t = document.getElementById("t").value;
    let area2 = (b1*b2) -(b1-2*t)*(b2-2*t);
    let Ix = (b1*Math.pow(b2,3)/12) - ( ((b1-2*t)*Math.pow((b2-2*t),3))/12 )
    
    document.getElementsByName("A"+id)[0].value = (area2).toPrecision(5);
    document.getElementsByName("I"+id)[0].value = (Ix).toFixed(2);;
    document.getElementsByName("E"+id)[0].value = document.getElementById("matType4").value;
}

function cadastrarSecoes()
{   let i=0;
   
    for(i=0; i<4; i++)
    {
       
        if(i==0){
            propriedadesRetangular(i+1)
        }else if(i==1){
            propriedadesPerfilT(i+1)
        }else if(i==2){
            propriedadesSecaoH(i+1)
        }else if(i==3){
            propriedadesSecaoRetVazada(i+1)
        }
           
    }
 
}


class controller
{
    constructor()
    {   
        this.inputNos = [];
        this.inputDesloc = [];
        this.inputBarras = [];
        this.vinculos = [];
        this.secao = [];
        this.inputCargas = [];
        this.qi = [];
        this.qf = [];
        this.str2d = null;
        this.secoesCadastradas = [];
        this.obterSecoes();
        
    }

    obterSecoes()
    {   
        let k = 0;
        let area = document.querySelectorAll("#area");
        let elasticidade = document.querySelectorAll("#elasticidade");
        let inercia = document.querySelectorAll("#inercia");
      
        while(area[k].value && elasticidade[k].value && inercia[k].value)
        {
            this.secoesCadastradas[k] = {};
            this.secoesCadastradas[k].A =  Number(area[k].value/10e4);
            this.secoesCadastradas[k].E =  Number(elasticidade[k].value*10e3);      
            this.secoesCadastradas[k].I = Number(inercia[k].value/10e8);     
            k++;
        }
    }

    obterNos()
    {
        let k = 0;
        let nosPosX = document.querySelectorAll("#posX");
        let nosPosY = document.querySelectorAll("#posY");
        let max = 0;

        while(nosPosX[k].value && nosPosY[k].value)
        {///só considera nos com ambas posições x e y inseridas
            this.inputNos[k] = {};

            this.inputNos[k].x =  Number(nosPosX[k].value);
            max = parseFloat(range[0][1])
            if(this.inputNos[k].x > max)
            {
                max = parseFloat(this.inputNos[k].x);    
                range[0][1] = parseFloat(max)+2;
            }

            
            max =0
            this.inputNos[k].y =  Number(nosPosY[k].value);    
            max = parseFloat(range[1][1])  
            if(this.inputNos[k].y > max)
            {
                max = parseFloat(this.inputNos[k].y);
                range[1][1] = parseFloat(max)+2;
            }

            k++;
        }

        let liberdadeX = document.getElementsByName('restdx');
        let liberdadeY = document.getElementsByName('restdy');
        let liberdadeZ = document.getElementsByName('restmz');

        for(k=0; k<this.inputNos.length; k++)
        {
            this.inputNos[k].liberdadeX = !liberdadeX[k].checked;
            this.inputNos[k].liberdadeY = !liberdadeY[k].checked;
            this.inputNos[k].liberdadeZ = !liberdadeZ[k].checked;               
        }

        let dx = document.querySelectorAll("#dx");
        let dy = document.querySelectorAll("#dy");
        let rz = document.querySelectorAll("#rz");

        for(k=0; k<this.inputNos.length; k++)
        {
            this.inputDesloc[k] = {};
            this.inputDesloc[k].x = Number(dx[k].value);
            this.inputDesloc[k].y = Number(dy[k].value);
            this.inputDesloc[k].z = Number(rz[k].value);
        }

    }

    plotarNos()
    {
        let i = 0;
        for(i=0; i< this.inputNos.length; i++)
        {// atualiza a view com os nós que foram inseridos/modificados
            desenharNo2D(pontos,  this.inputNos[i].x, this.inputNos[i].y, i+1);
        }
    }

    obterBarras()
    {   
        let k = 0;
        let noInicial = document.querySelectorAll("#noInicial");
        let noFinal = document.querySelectorAll("#noFinal");
        let sec = document.querySelectorAll("#sec");
      
        while(noInicial[k].value && noFinal[k].value && sec[k].value)
        {//pegando na interface somente as barras que possuem as informações completas para serem processadas
            this.inputBarras[k] = {};
            this.secao[k] = this.secoesCadastradas[Number(sec[k].value-1)];   
            this.inputBarras[k].noInicial = Number(noInicial[k].value-1);
            this.inputBarras[k].noFinal = Number(noFinal[k].value-1);               
            k++; 
        }
    
        let ri = document.querySelectorAll("#ri");
        let rf = document.querySelectorAll("#rf");
        let ir = document.querySelectorAll("#ir");
        let ar = document.querySelectorAll("#ar");

        for(k=0; k<this.inputBarras.length; k++)
        { //sabendo que no vetor inputBarras temos a qtd de barras com dados completos  
            this.vinculos[k] = {};
            this.vinculos[k].ri = ri[k].checked;
            this.vinculos[k].rf = rf[k].checked;
            this.vinculos[k].ir = ir[k].checked;
            this.vinculos[k].ar = ar[k].checked;
        }
    }

    plotarBarras()
    {
        desenharRotulas(shapes, this.inputBarras, this.vinculos, this.inputNos);
        for(i=0; i<this.inputBarras.length; i++)
        {//Atualiza a visualização com as barras inseridas/modificadas
            
           let tipo = 0;
            if( this.vinculos[i].ir ){
                tipo = 2;
            }else if(this.vinculos[i].ar){
                tipo = 1;
            }
            desenharBarra(linhas, pontos[this.inputBarras[i].noInicial], pontos[this.inputBarras[i].noFinal], tipo, i+1);
        }
    }

    plotarApoios()
    {
        let i = 0;
        let chao = 0;
        let teto = 0;
        let limEsquerdo = 0;
        let limDireito = 0;

        for(i=0; i<this.inputNos.length; i++)
        {
            if(this.inputNos[i].y<= chao)
            {
                chao = this.inputNos[i].y;
            }

            if(this.inputNos[i].x <=limEsquerdo)
            {
                limEsquerdo = this.inputNos[i].x;
            }

            if(this.inputNos[i].y >= teto)
            {
                teto = this.inputNos[i].y;
            }

            if(this.inputNos[i].x >= limDireito)
            {
                limDireito = this.inputNos[i].x;
            }  
        }

            let posApoio = 0;
            for(i=0; i<this.inputNos.length; i++)
            {//desenha/atualiza os apoios na visualização
                if( (this.inputNos[i]. x == limEsquerdo) &&(this.inputNos[i].y == chao) )
                {
                    posApoio = Math.PI;
                }else if((this.inputNos[i]. x == limEsquerdo) &&(this.inputNos[i].y == teto)){
                posApoio = Math.PI/2;
                }else if((this.inputNos[i]. x == limDireito) &&(this.inputNos[i].y == chao)){
                    posApoio = Math.PI;
                }else if( (this.inputNos[i].y == teto) &&((chao != teto) ) ){
                    posApoio = 0;
                }else if (this.inputNos[i].x == limDireito){
                    posApoio = 0;
                }

                if( !this.inputNos[i].liberdadeX && !this.inputNos[i].liberdadeY && !this.inputNos[i].liberdadeZ)
                {   
                    if(teto == chao){
                    
                        if(this.inputNos[i].x == limEsquerdo){
                            posApoio -= Math.PI/2;
                        }else if(this.inputNos[i].x == limDireito){

                        posApoio += Math.PI/2;
                        }
                    }
               
                    desenharApoio3(shapes, linhas, posApoio,  1, this.inputNos[i]);
                    
                
                }else if( !this.inputNos[i].liberdadeX && !this.inputNos[i].liberdadeY && this.inputNos[i].liberdadeZ){
                  
                    desenharApoio2(shapes, linhas, posApoio,  1, this.inputNos[i]);
                    
                                    
                }else if( !this.inputNos[i].liberdadeX && this.inputNos[i].liberdadeY && this.inputNos[i].liberdadeZ){
                
                    if(teto == chao){
                    
                        if(this.inputNos[i].x == limEsquerdo){
                            posApoio = Math.PI/2;
                        }else if(this.inputNos[i].x == limDireito){

                        posApoio = -Math.PI/2;
                        }
                    }else{
                        if( (this.inputNos[i].y == teto) && (this.inputNos[i].x == limDireito) )
                        {
                            posApoio -= Math.PI/2;
                        }else  if( (this.inputNos[i].y == chao) && (this.inputNos[i].x == limDireito) )
                        {
                            posApoio += Math.PI/2;
                        }else  if( (this.inputNos[i].y == chao) && (this.inputNos[i].x == limEsquerdo) )
                        {
                            posApoio -= Math.PI/2;
                        }
                    }
                 
                    desenharApoio1(shapes, linhas, posApoio,  1, this.inputNos[i]);
                    
                    

                }else if( this.inputNos[i].liberdadeX && !this.inputNos[i].liberdadeY && this.inputNos[i].liberdadeZ){
                
                    if(teto == chao)
                    {   
                        posApoio = Math.PI;

                    }else{

                        if( (this.inputNos[i].y == teto) && (this.inputNos[i].x == limDireito) )
                        {
                            posApoio = 0;
                        }else if((this.inputNos[i].y == teto) && (this.inputNos[i].x == limEsquerdo)){
                            posApoio -= Math.PI/2;
                        }
                    }
                   
                    desenharApoio1(shapes, linhas, posApoio,  1, this.inputNos[i]);
                    
                    
                }
            }
            
    }

    obterCarregamentos()
    {   
        let i=0;
        let fx = document.querySelectorAll("#fx");
        let fy = document.querySelectorAll("#fy");
        let mz = document.querySelectorAll("#mz");
        for(i=0; i<this.inputNos.length; i++)
        {
            this.inputCargas[i] = {};
            this.inputCargas[i].fx = Number(fx[i].value);
            this.inputCargas[i].fy = Number(fy[i].value);
            this.inputCargas[i].mz = Number(mz[i].value);
        }

        let qxi = document.querySelectorAll("#qxi");
        let qxf = document.querySelectorAll("#qxf");
        let qyi = document.querySelectorAll("#qyi");
        let qyf = document.querySelectorAll("#qyf");
        let gb = document.querySelectorAll("#gb");

        for(i=0; i<this.inputBarras.length; i++)
        {
            this.qi[i] = [];
            this.qi[i][0] = Number(qxi[i].value);
            this.qi[i][1] = Number(qyi[i].value);
            this.qi[i][2] = gb[i].checked;
            this.qf[i] = [];
            this.qf[i][0] = Number(qxf[i].value);
            this.qf[i][1] = Number(qyf[i].value);
            this.qf[i][2] = gb[i].checked;  
        }
    }

        plotarCarregamentos()
        {
            let i = 0;
            for(i=0; i<this.inputNos.length; i++)
            {//Atualiza a visualização com as cargas inseridas/modificadas

            if(this.inputCargas[i].fx > 0)
            {   
              
                desenharVetor2dAngulo(shapes, linhas, Math.PI/2,  1.7, this.inputNos[i], 4, pontos, this.inputCargas[i].fx.toPrecision(4));
                
            }else if(this.inputCargas[i].fx < 0){
             
                desenharVetor2dAngulo(shapes, linhas, -Math.PI/2,  1.7, this.inputNos[i], 5, pontos, this.inputCargas[i].fx.toPrecision(4));
                
            }

            if(this.inputCargas[i].fy > 0)
            {
               
                desenharVetor2dAngulo(shapes, linhas, Math.PI,  1.7, this.inputNos[i], 4, pontos, this.inputCargas[i].fy.toPrecision(4));
                

            }else if(this.inputCargas[i].fy < 0){

                
                desenharVetor2dAngulo(shapes, linhas, 0,  1.7, this.inputNos[i], 5, pontos, this.inputCargas[i].fy.toPrecision(4));
                
            }

            if(this.inputCargas[i].mz > 0)
            {//sim, estranho! parece estar invertido. Atenção na convenção de GREEN  está diferente da convenção visual adotada na interface
               
                desenharMomentoPos(shapes, this.inputNos[i], pontos, this.inputCargas[i].mz.toPrecision(4));// inversão de valor devido a green
                

            }else if(this.inputCargas[i].mz < 0){
               
                desenharMomentoNeg(shapes, this.inputNos[i], pontos, this.inputCargas[i].mz.toPrecision(4));// inversão de valor devido a green     
                
            }
         }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////

            ///////6° ROTINA QUE OBTÉM AS CARGAS DISTRIBUIDAS NAS BARRAS E ATUALIZA A INTERFACE/////////////////////

        for(i=0; i< this.inputBarras.length; i++)
        {   
            /* ROTINA PARA PLOTAR SISTEMA ORTOGONAL// NÃO USAR POR ENQUANTO
            if(qi[i][2])
            {
                if( (qi[i][0] != 0) || (qf[i][0] != 0) )
                {
                //desenharCargaDistribuida(shapes, linhas,  inputNos[inputBarras[i].inicio], inputNos[inputBarras[i].fim], qi[i][1], qf[i][1]);
                
                let noInicial = {};
                noInicial.x =  inputNos[inputBarras[i].noInicial].x;
                noInicial.y =  inputNos[inputBarras[i].noInicial].y;
                let noFinal = {};
                noFinal.x =  inputNos[inputBarras[i].noInicial].x;
                noFinal.y =  inputNos[inputBarras[i].noFinal].y;

                desenharCargaDistribuida(shapes, linhas, noInicial, noFinal, qi[i][0], qf[i][0]);
                
                }


                if( (qi[i][1] != 0) || (qf[i][1] != 0) )
                {
                //desenharCargaDistribuida(shapes, linhas,  inputNos[inputBarras[i].inicio], inputNos[inputBarras[i].fim], qi[i][1], qf[i][1]);
                
                let noInicial = {};
                noInicial.x =  inputNos[inputBarras[i].noInicial].x;
                noInicial.y =  inputNos[inputBarras[i].noFinal].y;
                let noFinal = {};
                noFinal.x =  inputNos[inputBarras[i].noFinal].x
                noFinal.y =  inputNos[inputBarras[i].noFinal].y;
                desenharCargaDistribuida(shapes, linhas, noInicial, noFinal, -qi[i][1], -qf[i][1]);
                }
            }else{} 
                */
                if( (this.qi[i][0] != 0) || (this.qf[i][0] != 0) )
                {
                    let noInicial = {};
                    noInicial.x =  this.inputNos[this.inputBarras[i].noInicial].x;
                    noInicial.y =  this.inputNos[this.inputBarras[i].noInicial].y;

                    let noFinal = {};
                    noFinal.x = this.inputNos[this.inputBarras[i].noFinal].x;
                    noFinal.y = this.inputNos[this.inputBarras[i].noFinal].y;
                    if(desenhar.carregamento)
                    {
                        desenharCargaDistribuidaAxial(shapes, linhas, noInicial, noFinal, this.qi[i][0], this.qf[i][0]);
                    }
                }
                if( (this.qi[i][1] != 0) || (this.qf[i][1] != 0) )
                {   
                    if(desenhar.carregamento)
                    {
                        desenharCargaDistribuida(shapes, linhas,  this.inputNos[this.inputBarras[i].noInicial], this.inputNos[this.inputBarras[i].noFinal], -this.qi[i][1], -this.qf[i][1], pontos);    
                    }
                }
        }
    
     }

    
    
    capturarDadosInterface()
    {
        ///////////USANDO MÉTODO SPLICE PARA LIMPAR COMPLETAMENTE AS VARIÁVEIS DE ENTRADA DE DADOS///
        this.inputNos.splice(0, this.inputNos.length);
        this.inputDesloc.splice(0, this.inputDesloc.length);
        this.inputBarras.splice(0, this.inputBarras.length);
        this.vinculos.splice(0, this.vinculos.length);
        this.secao.splice(0, this.secao.length);
        this.inputCargas.splice(0, this.inputCargas.length);
        this.qi.splice(0, this.qi.length);
        this.qf.splice(0, this.qf.length);
        this.obterNos();
        this.obterBarras();
        this.obterCarregamentos();
    }

     atualizarRenderer()
     {
        
        layout.shapes.splice(0, layout.shapes.length);
        limparCanvas(gd, objetosCanvas, layout, defaultPlotlyConfiguration);//LIMPANDO TODOS OS OBJETOS JÁ INSERIDOS NO CANVAS
        this.capturarDadosInterface()
        this.plotarNos();
        if(desenhar.apoios)
        {
            this.plotarApoios();
        }
      
        if(desenhar.barras)
        {   
            this.plotarBarras();
        }
        if(desenhar.carregamento)
        {
            this.plotarCarregamentos();
        }
        if(desenhar.cortante)
        {   
            this.plotarDiagramaCortante()
        }
        if(desenhar.momentoFletor)
        {
            this.plotarDiagramaMomentos();
        }
      
        if(desenhar.axial)
        {
            this.plotarDiagramaAxial();
        }

      
        if(desenhar.flexa)
        {
           
            this.plotarFlexa();
        }

        if(desenhar.solucao)
        {
            this.desenharSolucao();
        }
      
        atualizarCanvas(pontos, linhas, shapes, objetosCanvas, layout);
        Plotly.react(gd, objetosCanvas, layout, defaultPlotlyConfiguration);   

     }
     gerarEstrutura()
     {  
        this.obterSecoes();
        this.capturarDadosInterface()
        this.str2d = new Estrutura2D ();
        this.str2d.obterNos(this.inputNos, this.inputDesloc, this.inputCargas);
        this.str2d.obterBarras(this.inputBarras, this.secao, this.qi, this.qf, this.vinculos);
        this.str2d.gerarMatrizGlobal();
        this.str2d.resolverEstrutura();
        console.clear();
        console.log("JAWS STR SOLVER")
        console.log("By ADRIANO MACHADO and WYLLER FERNANDES")
        console.log("Mentoring by JULIANO SCREMIN")
        console.log("Str2D Object:", this.str2d);     
     }

     plotarDiagramaCortante()
     {
        desenhar.escalaCortante = Math.abs( this.str2d.esforcosMaximosGlobais[0].valor );
          
        for(i=0; i<this.str2d.barras.length; i++)
        {   
            if(desenhar.cortante)
            {    
                desenharDiagramaCortante(pontos, linhas, this.str2d.barras[i], desenhar,i);   
            }
        }
     }
     plotarDiagramaMomentos()
     {
        desenhar.escalaFletor = Math.abs( this.str2d.esforcosMaximosGlobais[1].valor );
             
        for(i=0; i<this.str2d.barras.length; i++)
        {           
            if(desenhar.momentoFletor)
            {    
                desenharDiagramaMomentos(pontos, linhas, this.str2d.barras[i], desenhar,i);   
            }
        }
     }

     plotarDiagramaAxial()
     {
        desenhar.escalaAxial = Math.abs( this.str2d.esforcosMaximosGlobais[2].valor );
                   
        for(i=0; i<this.str2d.barras.length; i++)
        {       
           desenharDiagramaAxial(pontos, linhas, this.str2d.barras[i], desenhar, i);        
             
        }
     }
     plotarFlexa()
     {
      
        let fatorEscala = 0;
        let sdx = 0;
        let sdy = 0;
   
        for(i=0; i<this.str2d.nos.length; i++)
        {//Para encontrar o fator de escala de flexas, achamos o maior deslocamentos em módulo na estrutura e usamos esse valor como parâmetro de referência
            sdx = this.str2d.nos[i].deslocamentoNodal[0];
            sdy = this.str2d.nos[i].deslocamentoNodal[1];
            let result = Math.sqrt( Math.pow(sdx,2)+Math.pow(sdy,2) );
            if(result > fatorEscala)
            {
                fatorEscala = result;
            }
        }
    
    
        desenhar.fatorEscalaFlexa =  fatorEscala;
        fatorEscala = 0;
        /*no vetor de esforços máximos
        0- cortante
        1-momento
        2-axial
        */

        for(i=0; i<this.str2d.barras.length; i++)
        {      
            
            desenharDeslocamentos(pontos, this.str2d.barras[i],  desenhar.escalaFlexa, i);
        
        }
     }
     desenharSolucao()
     {
    
        let pos = 0;
        let i= 0;
    
        for(i=0; i<this.str2d.nos.length; i++)////////////////////////////////////////////////////////////////////////////////////AQUI
        {
        
          if(!this.str2d.nos[i].liberdadeX)
          {
             if(this.str2d.vetorFu[pos] > 0)
               {         
                    desenharVetor2dAngulo(shapes, linhas, Math.PI/2,  1.3, this.str2d.nos[i], 4, pontos, this.str2d.vetorFu[pos].toPrecision(4));
                
              }else if(this.str2d.vetorFu[pos]< 0){

                    desenharVetor2dAngulo(shapes, linhas, -Math.PI/2,  1.3, this.str2d.nos[i], 5, pontos, this.str2d.vetorFu[pos].toPrecision(4));                
               }
               pos++;
           
          } 

          if(!this.str2d.nos[i].liberdadeY)
          {   
           
             if(this.str2d.vetorFu[pos]> 0)
             {   
                     desenharVetor2dAngulo(shapes, linhas, Math.PI,  1.3, this.str2d.nos[i], 4, pontos, this.str2d.vetorFu[pos].toPrecision(4));
                
             }else if(this.str2d.vetorFu[pos] < 0){
                
                    desenharVetor2dAngulo(shapes, linhas, 0,  1.3, this.str2d.nos[i], 5, pontos, this.str2d.vetorFu[pos].toPrecision(4));
                
             }
             pos++;
          } 
        
          if(!this.str2d.nos[i].liberdadeZ)
          {//NOVAMENTE PARECE ESTAR INVERTIDO, MAS ATENÇÃO A CONVENÇÃO DE GREEN!   
            if(this.str2d.vetorFu[pos]> 0)
            {
                desenharMomentoPos(shapes,  this.str2d.nos[i], pontos, this.str2d.vetorFu[pos].toPrecision(4));
            }else if(this.str2d.vetorFu[pos] < 0){
               
                desenharMomentoNeg(shapes, this.str2d.nos[i], pontos, this.str2d.vetorFu[pos].toPrecision(4));    
                  
            }
            pos++ 
          } 
      }
 
    }


     gerarRelatorio()
     {
        ///////////////////////////

        let i = 0;
        let j = 0;
        let  relDiv = document.getElementById("construcao");
        relDiv.innerHTML = "<table><tbody id='resDeslocamentos'><tr><th colspan='4'>Nodal Displacements</th></tr><tr><th>Node </th><th>Dx [mm]</th><th>Dy [mm]</th><th>Rz [rad]</th></tr></tbody></table><table><tbody id='idgl'><tr><th colspan='4'>IDGL</th></tr><tr><th>Node</th><th>X</th><th>Y</th><th>Z</th></tr></tbody></table><table><tbody id='reacoesApoio'><tr><th colspan='2'>Restrictions</th></tr><tr><th>IDGL</th><th>Kn/Kn*m</th></tr></tbody></table><table><tbody id='esforcoBarras'><tr><th colspan='4'>Internal Forces</th></tr> <tr><th>Bar</th><th>N [kn]</th><th>V [kn]</th> <th>M [kn*m]</th></tr></tbody></table>";
        let  divRelatorio = document.getElementById("construcao");
        
        ///////////////////////////////////////////////////////////
            
        let body = divRelatorio;
        let tabela = document.createElement("table");
        let nroNos = this.str2d.nos.length; 
        ///////////////////////////////////////////INSERE OS DESLOCAMENTOS NODAIS////
        let deslNos = [];

        for(i=0; i<nroNos; i++)
        {
            deslNos[i] = [];
            deslNos[i][0] = i+1;
            deslNos[i][1] = this.str2d.nos[i].deslocamentoNodal[0];
            deslNos[i][2] = this.str2d.nos[i].deslocamentoNodal[1];
            deslNos[i][3] = this.str2d.nos[i].deslocamentoNodal[2];    
        }
        
        let matrix =  deslNos;
        
        let tblBody = document.getElementById('resDeslocamentos');
            
            //Criando as células
        for (i = 0; i < nroNos; i++) 
        {
        // Cria as linhas
        let row = document.createElement("tr");
            
        for (j = 0; j < 4; j++) 
        {
                // Cria um elemento <td>
            var input = document.createElement("td");
            //Cria um campo input e insere no td
            var cellText = document.createElement("input");
            input.appendChild(cellText);
            row.appendChild(input);     
            //Faz atribuições ao elementos criado no DOM 
            cellText.setAttribute("class", "input");
            if(j ==0)
            {
                cellText.setAttribute("value", matrix[i][j]);
            }else{
                if(j == 3 ){
                    
                    cellText.setAttribute("value", matrix[i][j].toPrecision(5)); //rotações
                }else{
                    cellText.setAttribute("value", (matrix[i][j]).toPrecision(5));//deslocamento em milimetros
                }
                }
        }   
        // Adiciona a linha criada no corpo da tabela
        tblBody.appendChild(row);
        }
        // Incorpora o corpo da tabela a tabela em si
        tabela.appendChild(tblBody);
        // Adiciona a tabela criada ao Body do DOM
        body.appendChild(tabela);
        //Configura atributos da tabela
        tabela.setAttribute("border", "1");
        
        ///////////////////////////////////////////////////////
        
        let idNos = [];
        for(i=0; i<nroNos; i++)
        {
            idNos[i] = [];
            idNos[i][0] = i+1;
            idNos[i][1] = this.str2d.nos[i].indiceX;
            idNos[i][2] = this.str2d.nos[i].indiceY;
            idNos[i][3] = this.str2d.nos[i].indiceZ;
            
        }
        
        matrix = idNos;
        
        tblBody = document.getElementById('idgl');
        
        //Criando as células
        for (i = 0; i < nroNos; i++) {
        // Cria as linhas
        var row = document.createElement("tr");
        
        for (j = 0; j < 4; j++) {
            // Cria um elemento <td>
            var input = document.createElement("td");
            //Cria um campo input e insere no td
            var cellText = document.createElement("input");
            input.appendChild(cellText);
            row.appendChild(input);     
            //Faz atribuições ao elementos criado no DOM 
            cellText.setAttribute("class", "input");
            if(typeof matrix != 'undefined'){
            cellText.setAttribute("value", matrix[i][j]);
            }
        }   
        // Adiciona a linha criada no corpo da tabela
        tblBody.appendChild(row);
        }
        // Incorpora o corpo da tabela a tabela em si
        tabela.appendChild(tblBody);
        // Adiciona a tabela criada ao Body do DOM
        body.appendChild(tabela);
        //Configura atributos da tabela
        tabela.setAttribute("border", "1");
        
        ///////////////////////////////////////////////
        
        let linhas = this.str2d.vetorFu.length;
        //let total = str2d.nos.length; proxima vez que ver, pode deletar isso - comentou e nada aconteceu!
        let desl = this.str2d.totalDeslocamentos;
        let vetorReacoes = [];
        for(i=0; i<linhas; i++)
        {
            vetorReacoes[i] = [];
            vetorReacoes[i][0] = desl+i;;
            vetorReacoes[i][1] = this.str2d.vetorFu[i];
            
        }
        
        matrix = vetorReacoes;
        tblBody = document.getElementById('reacoesApoio');
        
        //Criando as células
        for (i = 0; i < linhas; i++) {
        // Cria as linhas
        var row = document.createElement("tr");
        
        for (j = 0; j < 2; j++) {
            // Cria um elemento <td>
            var input = document.createElement("td");
            //Cria um campo input e insere no td
            var cellText = document.createElement("input");
            input.appendChild(cellText);
            row.appendChild(input);     
            //Faz atribuições ao elementos criado no DOM 
            cellText.setAttribute("class", "input");
        
            if(j ==0)
            {
                cellText.setAttribute("value", matrix[i][j]);
            }else{
                cellText.setAttribute("value", matrix[i][j].toPrecision(5));
            }
        
            
        }   
        // Adiciona a linha criada no corpo da tabela
        tblBody.appendChild(row);
        }
        // Incorpora o corpo da tabela a tabela em si
        tabela.appendChild(tblBody);
        // Adiciona a tabela criada ao Body do DOM
        body.appendChild(tabela);
        //Configura atributos da tabela
        tabela.setAttribute("border", "1");
        //////////////////////////////////////////
        
        /////////////////////////////////////////////esforços barras///
        let nroBarras = this.str2d.barras.length;
        let esforcosBarras = [];
        let barra = 0;  
        for(i=0; i<nroBarras*2; i++)
        {  
            esforcosBarras[i] = [];
            esforcosBarras[i][0] = (barra+1)+"-inicio";
            esforcosBarras[i][1] = this.str2d.barras[barra].esforcosInternos[0];
            esforcosBarras[i][2] = this.str2d.barras[barra].esforcosInternos[1];
            esforcosBarras[i][3] = this.str2d.barras[barra].esforcosInternos[2];
            i++
            esforcosBarras[i] = [];
            esforcosBarras[i][0] = (barra+1)+"-fim    ";
            esforcosBarras[i][1] = this.str2d.barras[barra].esforcosInternos[3];
            esforcosBarras[i][2] = this.str2d.barras[barra].esforcosInternos[4];
            esforcosBarras[i][3] = this.str2d.barras[barra].esforcosInternos[5];
            barra++;       
        }
        
        matrix = esforcosBarras;
        
        tblBody = document.getElementById('esforcoBarras');
        
        //Criando as células
        for (i = 0; i < nroBarras*2; i++)
        {
            // Cria as linhas
            var row = document.createElement("tr");
            
            for (j = 0; j < 4; j++) {
                // Cria um elemento <td>
                var input = document.createElement("td");
                //Cria um campo input e insere no td
                var cellText = document.createElement("input");
                input.appendChild(cellText);
                row.appendChild(input);     
                //Faz atribuições ao elementos criado no DOM 
                cellText.setAttribute("class", "input");
            
                if(j ==0)
                {
                    cellText.setAttribute("value", matrix[i][j]);
                }else{
                    cellText.setAttribute("value", matrix[i][j].toPrecision(5));
                }
                
            }   
            // Adiciona a linha criada no corpo da tabela
            tblBody.appendChild(row);
        }
        // Incorpora o corpo da tabela a tabela em si
        tabela.appendChild(tblBody);
        // Adiciona a tabela criada ao Body do DOM
        body.appendChild(tabela);
        //Configura atributos da tabela
        tabela.setAttribute("border", "1");
        
        let paragrafo = null;
        let titulo = null;

        //SOBRE ESFORCOS MAXIMOS
        titulo = document.createElement("h3");
        titulo.setAttribute("style", "font-size: 13px; font-weight: 800; text-align:center");
        titulo.innerHTML += "Model Maximum Values";
        relDiv.appendChild(titulo);

        for(i=0; i<this.str2d.esforcosMaximosGlobais.length; i++)
        {   
            if(i==0)
            {   
                if( (!isNaN(+this.str2d.esforcosMaximosGlobais[i].x)) && (this.str2d.esforcosMaximosGlobais[i].valor ) )
                {
                    titulo = document.createElement("h5");
                    titulo.innerHTML += "Shear Force V(x)";
                    titulo.setAttribute("style", "font-size: 13px; font-weight: 600; text-align:center");
                    relDiv.appendChild(titulo);
                    paragrafo = document.createElement("p");
                    paragrafo.setAttribute("style", "color:DarkBlue ; text-align:center");//MOMENTO MÁXIMO
                    paragrafo.innerHTML += "Bar id:"+"$"+(this.str2d.esforcosMaximosGlobais[i].id+1)+"$, V("+"$"+this.str2d.esforcosMaximosGlobais[i].x.toPrecision(4)+")$ = "+"$"+this.str2d.esforcosMaximosGlobais[i].valor.toPrecision(4)+"kN$";
                    relDiv.appendChild(paragrafo);  
                }
               

            }else if(i == 1){
                if( (!isNaN(+this.str2d.esforcosMaximosGlobais[i].x)) && (this.str2d.esforcosMaximosGlobais[i].valor ) )
                {
                    titulo = document.createElement("h5");
                    titulo.setAttribute("style", "font-size: 13px; font-weight: 600; text-align:center");
                    titulo.innerHTML += "Bending Moment M(x)";
                    relDiv.appendChild(titulo);
                    paragrafo = document.createElement("p");
                    paragrafo.setAttribute("style", "color:DarkBlue ; text-align:center");//MOMENTO MÁXIMO
                    paragrafo.innerHTML += "Bar id:"+"$"+(this.str2d.esforcosMaximosGlobais[i].id+1)+"$, M("+"$"+this.str2d.esforcosMaximosGlobais[i].x.toPrecision(4)+")$ = "+"$"+this.str2d.esforcosMaximosGlobais[i].valor.toPrecision(4)+"kN·m$";
                    relDiv.appendChild(paragrafo);  
                }
            }else if(i==2){
                if( (!isNaN(+this.str2d.esforcosMaximosGlobais[i].x)) && (this.str2d.esforcosMaximosGlobais[i].valor ) )
                {
                    titulo = document.createElement("h5");
                    titulo.setAttribute("style", "font-size: 13px; font-weight: 600; text-align:center");
                    titulo.innerHTML += "Axial Force N(x)";
                    relDiv.appendChild(titulo);
                    paragrafo = document.createElement("p");
                    paragrafo.setAttribute("style", "color:DarkBlue ; text-align:center");//MOMENTO MÁXIMO
                    paragrafo.innerHTML += "Bar id:"+"$"+(this.str2d.esforcosMaximosGlobais[i].id+1)+"$, N("+"$"+this.str2d.esforcosMaximosGlobais[i].x.toPrecision(4)+")$ = "+"$"+this.str2d.esforcosMaximosGlobais[i].valor.toPrecision(4)+"kN$";
                    relDiv.appendChild(paragrafo);  
                }
            }else if(i==3){
                if( (!isNaN(+this.str2d.esforcosMaximosGlobais[i].x)) && (this.str2d.esforcosMaximosGlobais[i].valor ) )
                {
                    titulo = document.createElement("h5");
                    titulo.setAttribute("style", "font-size: 13px; font-weight: 600; text-align:center");
                    titulo.innerHTML += "Vertical Displament &#948;(x)";
                    relDiv.appendChild(titulo);
                    paragrafo = document.createElement("p");
                    paragrafo.setAttribute("style", "color:DarkBlue ; text-align:center");//MOMENTO MÁXIMO
                    paragrafo.innerHTML += "Bar id:"+"$"+(this.str2d.esforcosMaximosGlobais[i].id+1)+"$, &#948;("+"$"+this.str2d.esforcosMaximosGlobais[i].x.toPrecision(4)+")$ = "+"$"+this.str2d.esforcosMaximosGlobais[i].valor.toPrecision(4)+"m$";
                    relDiv.appendChild(paragrafo);  
                }
            }
           
        }
        paragrafo = document.createElement("p");
        paragrafo.setAttribute("style", "font-size: 13px; font-weight: 700; text-align:center");
        paragrafo.innerHTML += "/////////////////////////////////////////////////////////////////////";
        relDiv.appendChild(paragrafo); 

        
        
        let rigidezBarra = [];
        
   
           
        
          
                
       
        
        let tabelas = [ ];
        
        for(i=0; i<this.str2d.barras.length; i++)
        {  

            tabelas[i] = document.createElement("table");
            titulo = document.createElement("h3");
            titulo.setAttribute("style", "font-size: 13px; font-weight: 800; text-align:center");
            titulo.innerHTML += "Properties of Bar "+(i+1);
            relDiv.appendChild(titulo);

           //para mostrar matriz rigidez
            titulo = document.createElement("h5");
            titulo.setAttribute("style", "font-size: 12px; font-weight: 600; text-align:center");
            titulo.innerHTML += "Stiffness Matrix";
            relDiv.appendChild(titulo);

            
           
            rigidezBarra[0] = this.str2d.barras[i].rigidezLocal[0];
            rigidezBarra[1] = this.str2d.barras[i].rigidezLocal[1];
            rigidezBarra[2] = this.str2d.barras[i].rigidezLocal[2];
            rigidezBarra[3] = this.str2d.barras[i].rigidezLocal[3];
            rigidezBarra[4] = this.str2d.barras[i].rigidezLocal[4];
            rigidezBarra[5] = this.str2d.barras[i].rigidezLocal[5];


            matrix = rigidezBarra;
            let tBody = document.createElement("tbody");
        
        
        //Criando as células
        for (let m = 0; m < 6; m++)
        {
            // Cria as linhas
            var row = document.createElement("tr");
            
            for (let n = 0; n < 6; n++) 
            {
                // Cria um elemento <td>
                var input = document.createElement("td");
                //Cria um campo input e insere no td
                var cellText = document.createElement("input");
                input.appendChild(cellText);
                row.appendChild(input);     
                //Faz atribuições ao elementos criado no DOM 
                cellText.setAttribute("class", "inputRigidez");
            
        
                    cellText.setAttribute("value", matrix[m][n].toFixed(0));
                                
            }   
            // Adiciona a linha criada no corpo da tabela
            tBody.appendChild(row);
        }
        // Incorpora o corpo da tabela a tabela em si
        tabelas[i].appendChild(tBody);
        // Adiciona a tabela criada ao Body do DOM
        relDiv.appendChild(tabelas[i]);
        //Configura atributos da tabela
        tabelas[i].setAttribute("border", "1");



            titulo = document.createElement("h5");
            titulo.setAttribute("style", "font-size: 12px; font-weight: 600; text-align:center");
            titulo.innerHTML += "Equations";
            relDiv.appendChild(titulo);
            
            if(this.str2d.barras[i].equacoesCarregamentos[0])
            {
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Horizontal Load Function\n";
                relDiv.appendChild(titulo); 
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ; font-size: 11px; text-align:center");
                paragrafo.innerHTML += "$"+this.str2d.barras[i].equacoesCarregamentos[0]+"$";
                relDiv.appendChild(paragrafo);    
            }
            
            if(this.str2d.barras[i].equacoesCarregamentos[1])
            {
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Vertical Load Function\n";
                relDiv.appendChild(titulo); 
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ;  font-size: 11px; text-align:center");
                paragrafo.innerHTML += "$"+this.str2d.barras[i].equacoesCarregamentos[1]+"$";
                relDiv.appendChild(paragrafo);   
            }
            
            if(this.str2d.barras[i].equacaoAxial)
            {   
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Axial force";
                relDiv.appendChild(titulo); 
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ;  font-size: 11px;text-align:center");
                paragrafo.innerHTML += "$"+this.str2d.barras[i].equacaoAxial+"$";
                relDiv.appendChild(paragrafo);    
            }
        
            if(this.str2d.barras[i].equacaoCortante)
            {
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Shear Force";
                relDiv.appendChild(titulo);
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ;  font-size: 11px;text-align:center");
                paragrafo.innerHTML += "$"+this.str2d.barras[i].equacaoCortante+"$";
                relDiv.appendChild(paragrafo);  
                
                // SOBRE ESFORCOS MAXIMOS
                paragrafo = document.createElement("p"); // CORTANTE MAX
                paragrafo.setAttribute("style", "color:DarkBlue ; text-align:center");
                paragrafo.innerHTML += "Max: x: "+"$"+this.str2d.barras[i].cortanteMax[0].x.toPrecision(4)+"$, value: "+"$"+this.str2d.barras[i].cortanteMax[0].valor.toPrecision(4)+"$";
                relDiv.appendChild(paragrafo); 
                
                
            }
            
            if(this.str2d.barras[i].equacaoMomentoFletor)
            {
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Bending Moments\n";
                relDiv.appendChild(titulo);
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ;  font-size: 11px; text-align:center");
                paragrafo.innerHTML += "$"+this.str2d.barras[i].equacaoMomentoFletor+"$";
                relDiv.appendChild(paragrafo); 
                
                //SOBRE ESFORCOS MAXIMOS
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ; text-align:center");//MOMENTO MÁXIMO
                paragrafo.innerHTML += "Max: x: "+"$"+this.str2d.barras[i].momentoMax[0].x.toPrecision(4)+"$, value: "+"$"+this.str2d.barras[i].momentoMax[0].valor.toPrecision(4)+"$";
                relDiv.appendChild(paragrafo);  
                
            }
        
            if(this.str2d.barras[i].equacoesDeslocamentos[0])
            {
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Rotations";
                relDiv.appendChild(titulo);
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ;  font-size: 10px; text-align:center");
                paragrafo.innerHTML += "$"+this.str2d.barras[i].equacoesDeslocamentos[0]+"$";
                relDiv.appendChild(paragrafo);      
            }
            
            if(this.str2d.barras[i].equacoesDeslocamentos[1])
            {
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Vertical dispacements";
                relDiv.appendChild(titulo);
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ;  font-size: 8px; font-weight: 200; text-align:center");
                paragrafo.innerHTML += "$"+this.str2d.barras[i].equacoesDeslocamentos[1]+"$";
                relDiv.appendChild(paragrafo);   
            }
        
            /* deslocamento horizontal pra que?
            if(str2d.barras[i].equacoesDeslocamentos[2])
            {   
                titulo = document.createElement("h3");
                titulo.setAttribute("style", "font-size: 12px; font-weight: 700; text-align:center");
                titulo.innerHTML += "Equação Deslocamentos Horizontais";
                relDiv.appendChild(titulo)
                paragrafo = document.createElement("p");
                paragrafo.setAttribute("style", "color:DarkBlue ; text-align:center");
                paragrafo.innerHTML += "$"+str2d.barras[i].equacoesDeslocamentos[2] +"$";
                relDiv.appendChild(paragrafo); 

            }
            */
            
            
            paragrafo = document.createElement("p");
            paragrafo.setAttribute("style", "font-size: 13px; font-weight: 700; text-align:center");
            paragrafo.innerHTML += "/////////////////////////////////////////////////////////////////////";
            relDiv.appendChild(paragrafo); 
        }
        
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, relDiv]);
        return this.str2d;
    
      }
      
     relatorioPDF()
     {
        
        let construcao = document.getElementById("construcao");
        var titulo = document.createElement("h2");
        titulo.innerHTML = "FUNCIONALIDADE EM CONSTRUÇÃO";
        construcao.appendChild(titulo);
        var element = document.getElementById('rel');
        html2pdf(element);   
    }


}

