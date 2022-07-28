class observer
{
    constructor()
    {
        let controlador = new controller();

        //////////////////////////////////////////////////****** EVENTOS DAS BARRAS DE NAVEGAÇÃO ******///////////////////////////////////////////////////////////
        let btnInput = document.getElementById("abrir");
        let abreFecha = true;
        btnInput.addEventListener('click', function()
        {//evento que controla o botão input na barra de navegação superior
            if(abreFecha)
            {   
                openNav();
                abreFecha = false;
            }else{
                closeNav();
                abreFecha = true;
            }  
        });

        let btnPlotar = document.getElementById("plotar");
        btnPlotar.addEventListener('click', function()
        {//evento fo botão plotar no menu superior que chama no controller a rotina de pegar dados na interface e plotar os dados inseridos    
            document.getElementById('mostrarCarregamentos').checked = true;
            document.getElementById('mostrarApoios').checked = true;
            document.getElementById('mostrarBarras').checked = true;      
            document.getElementById('diagramaDeformacoes').checked = false;      
            desenhar = controlePlotagem();
            controlador.atualizarRenderer()
            
        });

        let btnViewPlot = document.getElementById("view");
        btnViewPlot.addEventListener('click', function()
        {// view/plot segue a mesma rotina do bitão plotar, mas ao fim fecha a aba de navegação para visualizar os dados plotados, visando o uso no celular
            if(abreFecha)
            {   
                openNav();
                abreFecha = false;
            }else{
                closeNav();
                abreFecha = true;
            }   
        });

        let btnSolve = document.getElementById("solve");
        btnSolve.addEventListener('click', function()
        {// botão solve na barra de navegação superior chama as rotinas que atualizar o renderer e resolve a estrutura
            document.getElementById('mostrarCarregamentos').checked = false;
            document.getElementById('mostrarApoios').checked = false;
            document.getElementById('mostrarBarras').checked = false;   
            document.getElementById('mostrarSolucao').checked = true;
            document.getElementById('diagramaDeformacoes').checked = true;
            desenhar = controlePlotagem();
            controlador.gerarEstrutura();
            controlador.atualizarRenderer();
            controlador.gerarRelatorio();
 
        });

        //////////eventos da barra de navegação inferior//////////
        document.getElementById("zoomOut").addEventListener('click', function()
        {
            zoomCanvas(gd, range, "out");
        })

        document.getElementById("zoomIn").addEventListener('click', function()
        {    
            zoomCanvas(gd,range, "in");    
        })

        document.getElementById("print").addEventListener('click', function()
        {
            Plotly.downloadImage(gd, {format: 'png', width: 640, height: 480, filename: 'JAWS STR SOLVER'});
        })
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////****** EVENTOS DA ABA PROPRIEDADES ******///////////////////////////////////////////////////////////
        //////// EVENTO QUE MONITORA AS CHAMAR NO BOTÃO APLICAR SEÇÃO
        let btnAplicarSecao = document.querySelectorAll("#aplicarSecao");
        for(let i = 0; i<btnAplicarSecao.length;i++)
        {
            btnAplicarSecao[i].addEventListener('click', function()
            {
                let id= document.querySelectorAll("#idSec")[i].value;
                if(btnAplicarSecao[i].value == 1)
                {
                    propriedadesRetangular(id);

                }else if(btnAplicarSecao[i].value == 2){

                    propriedadesPerfilT(id);

                }else if(btnAplicarSecao[i].value == 3){

                    propriedadesSecaoH(id);
                }else if(btnAplicarSecao[i].value == 4){


                    propriedadesSecaoRetVazada(btnAplicarSecao[id].value);
                }
            })
            controlador.obterSecoes();
        }


        //////////////// eventos dos botões que repetem os padrões inseridos nos nós ///////////////////////////    
        let btnRepX = document.getElementById('repeticoesX')
        let btnRepY = document.getElementById('repeticoesY')
        let padraoGerado = false;
        let padrao = 0;
        let repeticoesX = 1;

        btnRepX.addEventListener('click', function(){
        
            repeticoesX++
            
            let k = 0;
            let nosPosX = document.querySelectorAll("#posX");
            let nosPosY = document.querySelectorAll("#posY");

            while(nosPosX[k].value && nosPosY[k].value)
            {//pegar quantidade de posições inseridas
                    k++;
            }
        
            
            if(!padraoGerado)
            {/// pegar quantos pontos o padrão possui
                padrao = k;
                padraoGerado = true;
            }
        
            let dx = [];
            let dy = [];

            for(let i=0; i<padrao; i++)
            {//pegando os incrementos que representam o padrão
                dx.push( parseFloat( parseFloat(nosPosX[i].value) - parseFloat(nosPosX[0].value ) ));
                dy.push( parseFloat( parseFloat(nosPosY[i].value) - parseFloat(nosPosY[0].value ) ));   
            }
            
            let posicaoLivre = k;
            let posx = [];
            let posy = [];
            
            for(i=0; i<dx.length; i++ )
            {
                posx.push(parseFloat(repeticoesX * parseFloat(dx[i])) );
                posy.push( parseFloat(dy[i]) ); 
            }
            
            for(i=0; i<k; i++ )
            {
                if(posx[i] != 0)
                {
                    nosPosX[posicaoLivre].value = posx[i];
                    nosPosY[posicaoLivre].value = posy[i];
                    posicaoLivre++;    
                    if(isNaN(posx[i+1])){
                        break;
                    }
                }
            }
        })

        let repeticoesY = 1;

        btnRepY.addEventListener('click', function(){
        
            repeticoesY++
            
            let k = 0;
            let nosPosX = document.querySelectorAll("#posX");
            let nosPosY = document.querySelectorAll("#posY");

            while(nosPosX[k].value && nosPosY[k].value)
            {//pegar quantidade de posições inseridas
                    k++;
            }
        
            
            if(!padraoGerado)
            {/// pegar quantos pontos o padrão possui
                padrao = k;
                padraoGerado = true;
            }
        
            let dx = [];
            let dy = [];

            for(let i=0; i<padrao; i++)
            {//pegando os incrementos que representam o padrão
                dx.push( parseFloat( parseFloat(nosPosX[i].value) - parseFloat(nosPosX[0].value ) ));
                dy.push( parseFloat( parseFloat(nosPosY[i].value) - parseFloat(nosPosY[0].value ) ));   
            }
            
            let posicaoLivre = k;
            let posx = [];
            let posy = [];
            
            for(i=0; i<dx.length; i++ )
            {
                posy.push(parseFloat(repeticoesY * parseFloat(dy[i])) );
                posx.push( parseFloat(dx[i]) ); 
            }
            
            for(i=0; i<k; i++ )
            {
                if(isNaN(posy[i]))
                {
                    break;
                }
                if(posy[i] != 0)
                {
                    nosPosX[posicaoLivre].value = posx[i];
                    nosPosY[posicaoLivre].value = posy[i];
                    posicaoLivre++;    
                
                }
            }
        })
        

        /////////////////////////////////////////////****** EVENTOS DA ABA BARRAS ******///////////////////////////////////////////////////
         
        ////////////////////SCRIPT PARA DAR AUTOCOMPLETE NA SEÇÃO QUANDO UMA BARRA É INSERIDA////
        let insercaoBarras = document.querySelectorAll('#noInicial');
        let insercaoSecao = document.querySelectorAll('#sec');
        for(let i=0;i<insercaoBarras.length;i++)
        {
            insercaoBarras[i].addEventListener("input", function(){
                insercaoSecao[i].value = 1;
            });
        } 
        /////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////SCRIPT QUE DÁ "CHECKED" EM TODAS OPÇÕES RI E RF PARA LANÇAR TRELIÇAS////////
        let btnTrel =  document.getElementById('trel');
        btnTrel.addEventListener('click', function()
        {   
            let ri = document.querySelectorAll("#ri");
            let rf = document.querySelectorAll("#rf");

            if(btnTrel.checked == true)
            {
               
                for(let i=0; i< ri.length; i++)
                {
                    ri[i].checked = true;
                    rf[i].checked = true;
                }
            }else{
                for(let i=0; i< ri.length; i++)
                {
                    ri[i].checked = false;
                    rf[i].checked = false;
                }
            }

        })

        let botaoAutocomplete = document.getElementById('autocompletar'); /// botão quick plot da aba das barras

        botaoAutocomplete.addEventListener('click', function()
        { 

            let nosX = document.querySelectorAll("#posX");
            let nosY = document.querySelectorAll("#posY");
            let nroNos = 0;
            let inicial = document.querySelectorAll("#noInicial");
            let final = document.querySelectorAll("#noFinal");
            let secao = document.querySelectorAll("#sec");


            while(nosX[nroNos].value && nosY[nroNos].value)
            {///só considera nos com ambas posições x e y inseridas
                nroNos++;
            }

            if( botaoAutocomplete.checked == true)
            {
            

                for(i=0; i<nroNos-1; i++)
                {
                    inicial[i].value = i+1;
                    final[i].value = i+2;
                    secao[i].value = 1;

                }
                controlador.atualizarRenderer();
            }
         });
         ////////////////////////////////////////////////////
        document.getElementById('aplicarDistBarras').addEventListener('click', function()
        {

            let entradasBarrasy =  document.getElementById('qyBarras').value;
            let idBarrasy = [];

            for(let i=0; i<entradasBarrasy.length; i++)
            {   
               
                let id = null;
                if(!isNaN(parseInt(entradasBarrasy[i])) && isNaN(parseInt(entradasBarrasy[i+1])) )
                {
                    id = parseInt(entradasBarrasy[i])
                   
                }else  if(!isNaN(parseInt(entradasBarrasy[i])) && !isNaN(parseInt(entradasBarrasy[i+1]))){
                    id = parseInt( entradasBarrasy[i]+entradasBarrasy[i+1] );
                  
                    i++;
                }
                idBarrasy.push(id);
            }

            let entradasBarrasx=  document.getElementById('qxBarras').value;
            let idBarrasx = [];

            for(let i=0; i<entradasBarrasx.length; i++)
            {
                let id = null;
                if(!isNaN(parseInt(entradasBarrasx[i])) && (entradasBarrasx[i+1] ==','))
                {
                    id = parseInt(entradasBarrasx[i])
                  
                }else  if(!isNaN(parseInt(entradasBarrasx[i])) && !isNaN(parseInt(entradasBarrasx[i+1]))){
                    id = parseInt(entradasBarrasx[i]+entradasBarrasx[i+1])
                  
                    i++;
                }
                idBarrasx.push(id);
            }
            
        
            let qyiM = document.getElementById("QyiM").value;
            let qyfM = document.getElementById("QyfM").value;
            let qxiM = document.getElementById("QxiM").value;
            let qxfM = document.getElementById("QxfM").value;
            let gby = document.getElementById("gby").checked;

        


            let qyi = document.querySelectorAll("#qyi");
            let qyf = document.querySelectorAll("#qyf");
            let qxi = document.querySelectorAll("#qxi");
            let qxf = document.querySelectorAll("#qxf");
            let gb = document.querySelectorAll("#gb");
            
            for(let i=0; i<qyi.length; i++)
            {//percorrendo todos os campos de entrada
                for(let j=0; j<idBarrasy.length; j++)
                {//procurando se o indice esta dentro do vetor de entradas   
                    if(idBarrasy[j] == (i+1))
                    {
                        qyi[i].value = qyiM; 
                        qyf[i].value = qyfM;
                        gb[i].checked = gby;

                    }
                }

                for(let j=0; j<idBarrasx.length; j++)
                {//procurando se o indice esta dentro do vetor de entradas   
                    if(idBarrasx[j] == (i+1))
                    {
                        qxi[i].value = qxiM; 
                        qxf[i].value = qxfM;
                        gb[i].checked = gby;

                    }
                }
            }
    })


         /////////////////////////////////////////////////////////
         /////////////////////////////
        let botaoRx = document.getElementsByName('restdx');

    
        for(let i=0; i< botaoRx.length; i++)
        {//Looping que controla os botões referentes as restrições em x
            botaoRx[i].addEventListener('click', function(){   
            let campo = "dx"+(i+1);
            if(botaoRx[i].checked)
            {
                document.getElementsByName(campo)[0].disabled = false;
                
            }else{
    
                document.getElementsByName(campo)[0].disabled = true;
            }
          })
        }
    
        let botaoRy = document.getElementsByName('restdy');
        for(let i=0; i< botaoRy.length; i++)
        {//Looping que controla os botões referentes as restrições em y
            botaoRy[i].addEventListener('click', function(){
            let campo = "dy"+(i+1);
            if(botaoRy[i].checked)
            {  
                document.getElementsByName(campo)[0].disabled = false;
                
            }else{
                
                document.getElementsByName(campo)[0].disabled = true;
            }
         })
        }
    
        let botaoRz = document.getElementsByName('restmz');
        for(let i=0; i< botaoRz.length; i++)
        {//Looping que controla os botões referentes as restrições em z
            botaoRz[i].addEventListener('click', function(){
            let campo = "rz"+(i+1);
            if(botaoRz[i].checked)
            {
                document.getElementsByName(campo)[0].disabled = false;
                
            }else{
    
                document.getElementsByName(campo)[0].disabled = true;
            }
         })
        }
        ////////////////////////////////////////
        document.getElementById('aplicarCargasNodais').addEventListener('click', function()
        {
    
            let entradasForcasNos =  document.getElementById('forcasNos').value;
          
            let idNos = [];
    
            for(let i=0; i<entradasForcasNos.length; i++)
            {
                let id = null;
                if(!isNaN(parseInt(entradasForcasNos[i])) && isNaN(parseInt(entradasForcasNos[i+1])) )
                {
                    id = parseInt(entradasForcasNos[i])
               
                }else  if(!isNaN(parseInt(entradasForcasNos[i])) && !isNaN(parseInt(entradasForcasNos[i+1]))){
                    id = parseInt( entradasForcasNos[i]+entradasForcasNos[i+1] );
                  
                    i++;
                }

                idNos.push(id);
            }
           
        
            
            let fxm = document.getElementById("fxm").value;
            let fym = document.getElementById("fym").value;
            let mzm = document.getElementById("mzm").value;
    
        
    
            let fx = document.querySelectorAll("#fx");
            let fy = document.querySelectorAll("#fy");
            let mz = document.querySelectorAll("#mz");
        
            for(let i=0; i<fy.length; i++)
            {//percorrendo todos os campos de entrada
                for(let j=0; j<idNos.length; j++)
                {//procurando se o indice esta dentro do vetor de entradas   
                    if(idNos[j] == (i+1))
                    {   
                        fx[i].value = fxm;
                        fy[i].value = fym; 
                        mz[i].value= mzm;
    
                    }
                }
    
            }
        })


        

    
    let btnRange1 = document.getElementById("escalaFlexa");
    btnRange1.addEventListener('change', function(){ 
        desenhar.escalaFlexa = btnRange1.value;
        controlador.atualizarRenderer();
        
    })


    let botoesPlotagem = document.getElementsByName('plotagem');
  
    for(let i=0; i<botoesPlotagem.length; i++)
    {//Looping que controla os botões referentes as restrições em x
        botoesPlotagem[i].addEventListener('click', function(){

         

            if(botoesPlotagem[0].checked)
            {//posicao 0 = flexa
                desenhar.flexa = true;
              
            }else{
                desenhar.flexa = false;
                
            } 
            
            if(botoesPlotagem[1].checked)
            {//posicao 1 = cortante
                desenhar.cortante = true;
                
            }else{
                desenhar.cortante = false;
               
            }
            
            if(botoesPlotagem[2].checked)
            {// posicao 2 = momento
                desenhar.momentoFletor = true;
               
            }else{
                desenhar.momentoFletor = false;
              
            }

             if(botoesPlotagem[3].checked)
             {//posicao 3 axial
                desenhar.axial = true;
            }else{
                desenhar.axial = false;
                
            }

             if(botoesPlotagem[4].checked)
             {//posicao 4 = solucao
                
                desenhar.solucao = true;
              
            }else{
                desenhar.solucao = false;
              
            }
             if(botoesPlotagem[5].checked)
             {//posicao 5 = barras
                
                desenhar.barras = true;
              
            }else{
                desenhar.barras = false;
              
            }

              if(botoesPlotagem[6].checked)
             {//posicao 6 carregamentos
                
                desenhar.carregamento = true;
            }else{
              
                desenhar.carregamento = false;
            }

            if(botoesPlotagem[7].checked)
            {//posicao 7 = apoios
             
                desenhar.apoios = true;
             
            }else{
            
                desenhar.apoios = false;
             
            }
            controlador.atualizarRenderer();
               
        })
          
    }

    ////////////////////////////////////////
    
    let btnIncrementoBaseRet1 =   document.getElementById("incrementoBaseRet1");
   
    let baseRet1 = document.getElementsByName("retBase1");
    let baseInicial = document.getElementById("retBase").value;
    baseRet1[1].value = baseInicial;

   


    btnIncrementoBaseRet1.addEventListener('change', function(){
        
        for(i=0; i< baseRet1.length; i++)
        {
            baseRet1[i].value = (parseFloat(baseInicial) + (parseFloat(btnIncrementoBaseRet1.value))).toPrecision(3);  
        }

        propriedadesRetangular(id);
        document.getElementById('mostrarCarregamentos').checked = false;
        document.getElementById('mostrarApoios').checked = false;
        document.getElementById('mostrarBarras').checked = false;   
        document.getElementById('mostrarSolucao').checked = true;
        document.getElementById('diagramaDeformacoes').checked = true;
            
        desenhar = controlePlotagem();
        

         controlador.gerarEstrutura();
         controlador.atualizarRenderer();
         controlador.gerarRelatorio();
        
    })




    let btnIncrementoAlturaRet1 =   document.getElementById("incrementoAlturaRet1");
    
    let alturaRet1 = document.getElementsByName("retAltura1");
    let alturaInicial = document.getElementById("retAltura").value;
    alturaRet1[1].value = alturaInicial;

    

    btnIncrementoAlturaRet1.addEventListener('change', function(){

        
        
        for(i=0; i< alturaRet1.length; i++)
        {
            alturaRet1[i].value = (parseFloat(alturaInicial) + (parseFloat(btnIncrementoAlturaRet1.value))).toPrecision(3);
        
        }
        let id = document.getElementById("idSecIterator1").value;
        propriedadesRetangular(id)
        document.getElementById('mostrarCarregamentos').checked = false;
        document.getElementById('mostrarApoios').checked = false;
        document.getElementById('mostrarBarras').checked = false;   
        document.getElementById('mostrarSolucao').checked = true;
        document.getElementById('diagramaDeformacoes').checked = true;
            
        desenhar = controlePlotagem();
        

         controlador.gerarEstrutura();
         controlador.atualizarRenderer();
         controlador.gerarRelatorio();
      
        
    })


    /////////////////////////////////////// ****** ABA RELATORIO ****** ///////////////////////////////
    let btnPdf = document.getElementById("gerarPdf");

    btnPdf.addEventListener('click', function(){
        
        controlador.relatorioPDF();
    });


    }

}