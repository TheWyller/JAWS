function zoomCanvas(gd, range, tipo)
{// funcao zoom, pensada e implementada por Adriano Machado!           
    if(tipo == "out")
    {
        range[0][0] *= 0.8;
        range[0][1] *= 0.8;
        range[1][0] *= 0.8;
        range[1][1] *= 0.8;
        
    }else if(tipo == "in"){

        range[0][0] *= 1.2;
        range[0][1] *= 1.2;
        range[1][0] *= 1.2;
        range[1][1] *= 1.2;

    }

    let update = {
     //title: 'some new title', // updates the title
    'xaxis.range': range[0],   // updates the xaxis range
    'yaxis.range': range[1]     // updates the end of the yaxis range
     };

      Plotly.relayout(gd, update)
}

function limparCanvas(gd, objetosCanvas, layout, defaultPlotlyConfiguration)
{///Usar essa função sempre que algo for inserido o canvas, remove todos os objetos deixando preparado para desenhar novamente
    pontos.splice(0, pontos.length);
    linhas.splice(0, linhas.length);
    shapes.splice(0, shapes.length);
    objetosCanvas.splice(0, objetosCanvas.length);
    Plotly.react(gd, objetosCanvas, layout, defaultPlotlyConfiguration);
}

function atualizarCanvas(pontos, linhas, shapes, objetosCanvas, layout )
{///Após removidos todos os objetos, desenhar tudo novamente já incluindo os objetos novos que foram inserido
    let atualizar = true;
    let i = 0;
    let j = 0;
    
    while(atualizar)
    {
        for(j=0; j<pontos.length; j++)
        {
            objetosCanvas[i] = pontos[j];
            i++;
        }
        for(j=0; j<linhas.length; j++)
        {
            objetosCanvas[i] = linhas[j];
            i++;
        }
        atualizar = false;
    }

    for(i=0; i<shapes.length; i++)
    {
        layout.shapes[i] = shapes[i];
    }
    
 }

function desenharNo2D(pontos, posX, posY, id)
{//pontos é o objeto primitivo que a plotly usar para desenhar os objetos no canvas, posX e posY são as posições inserida pelo usuário para esses pontos
    
    let ponto = {
        x: [posX],
        y: [posY],
        name: 'node',
        hoverinfo: "x+y",
        hoverlabel:{
            bgcolor:'rgb(211,205,202)', 
                          
            font:{
                size: 10, 
                family: 'Arial Black',
                color: 'rgba(46,40,40,0.8)'
            },
            textposition: 'center'
        },
        mode: 'markers+text',
        text: id,
        textfont : {
            size: 8,
            color: 'rgb(255,0,0)',
        },
        textposition: 'bottom right',
        marker: {
            color: 'rgb(120,120,120)',
            size: 5,
        }
    }
    pontos.push(ponto);

 }

 function desenharBarra(linhas, pontoInicial, pontoFinal, tipo, id)
 {// linhas é o objeto primitivo que a plotly utiliza, precisamos informar em que nó ela começa e termina
    let red = 0;
    let green= 0;
    let blue = 0;
    let expessura =2;

    if(tipo == 1)
    {//axialmente rígida
        red = 188;
        green = 159;
        blue = 140;
        expessura = 4;
    }else if(tipo == 2){//infinitamente rígida
        red = 135;
        green = 126;
        blue = 167;
        expessura = 4;
    }
    
    let cor = 'rgb(' + red +',' + green +',' + blue + ','+')';
    
    let linha = {
        width: 5,
        x: [pontoInicial.x[0], pontoFinal.x[0]],
        y: [pontoInicial.y[0], pontoFinal.y[0]],
        mode: 'lines',
        name: 'vetor',
   
        line: {
            
            color: cor,
            width: expessura
        }
    }
    linhas.push(linha);

    let deltaX = ( (pontoFinal.x[0]) - (pontoInicial.x[0]));
    let deltaY = ( (pontoFinal.y[0]) - (pontoInicial.y[0]));
    let simbolo = null;
    let posicao = 'bottom';

    
    
    if((deltaX == 0) )
    {
       
        if(deltaY > 0)
       {
          simbolo = "triangle-up";
          posicao = 'center left'
       }else{
            simbolo = "triangle-down";
            posicao = 'center right'
       }
      

    }else if(deltaY == 0)
    {   
        if(deltaX > 0)
        {
           simbolo = "triangle-right";
    
        }else{
             simbolo = "triangle-left";
        }
    
    }else if( (deltaX > 0) && (deltaY < 0) ){

        simbolo = "triangle-se";
     
    }else if((deltaX > 0) && ( deltaY > 0 )) {

        simbolo = "triangle-ne";
        
    }else if( (deltaX < 0) && (deltaY > 0) ) {

        simbolo = "triangle-nw";

    }else if( (deltaX < 0) && (deltaY < 0) ) {

        simbolo = "triangle-sw";
    }

    let pontoMedioX =  (pontoFinal.x[0] - pontoInicial.x[0]) /2
    let pontoMedioY =  (pontoFinal.y[0] - pontoInicial.y[0]) /2

    pontoMedioX += pontoInicial.x[0];
    pontoMedioY += pontoInicial.y[0];          

    let label = {
        x: [pontoMedioX],
        y: [pontoMedioY],
        hoverinfo: "text",
        mode: 'markers+text',
        text: id,
        textfont : {
            size: 8,
            color: 'rgb(0,0,255)' 
        },
        type: 'scatter',
         textposition: posicao,
        marker: {
        symbol: [simbolo],
        color: cor,
        size: 7,
       }
    }
    linhas.push(label);
 }

 function desenharCirculo(xc1, yc1, xc2, yc2, contorno)
 {
    let circle = {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        fillcolor: 'rgba(255, 255, 255, 1)',
        x0: xc1,
        y0: yc1,
        x1: xc2,
        y1: yc2,
        line: {
          color:  'rgb(0, 0, 0, 0)',
          width: contorno
        }
    }
    shapes.push(circle);
 }

 function desenharRotulas(shapes, inputBarras, vinculos, inputNos)
 {
    let i = 0;
    let deltaX = null;
    let deltaY = null;
    let xp = null;
    let yp = null;
    let nos = [];

    for(i=0; i<inputNos.length; i++)
    {
      nos[i] = [];

      for(let j=0; j<inputNos.length; j++)
      {///// a partir do conceito de grafos, cria uma matriz de adjacência tendo com base as incidências das barras nos nós da estrutura 
        nos[i][j] = [];
        nos[i][j] = null;
        if( i == j)
        {
            continue;
        }else{

            for(let k=0; k<inputBarras.length; k++)
            {
                if( (inputBarras[k].noInicial == i) && (inputBarras[k].noFinal == j))
                {
                    nos[i][j] = k;
                }
                if( (inputBarras[k].noInicial == j) && (inputBarras[k].noFinal == i))
                {
                    nos[i][j] = k;
                }
            }
        }
      }    
    }
  
    let tipo = null;
    let nroBarras = 0;
    for(i=0; i<nos.length; i++)
    {/// aqui percorremos cada linha da matriz de adjacência e resolvemos tudo que precisamos para renderizar as vinculações na linha que representa o nó - cada valor de i  = linha = um nó da estrutura
        nroBarras = 0;
        tipo = 0; // a variável tipo será usada pra controlar os tipos de vinculações chegando em cada nó
        
        for(j=0; j< nos[i].length; j++)
        {// percorrendo a matriz de adjacência e verificando o número de incidência e como ela estão configurada em relação a restrição
            if(nos[i][j] != null)
            {    
                nroBarras++;
            
                if( (inputBarras[nos[i][j] ].noInicial == i ))
                { 
                    if(vinculos[nos[i][j]].ri == true)
                    {
                        tipo  ++;
                    }                    
                }
                if( (inputBarras[nos[i][j] ].noFinal == i ))
                {  
                    if(vinculos[nos[i][j]].rf == true)
                    {
                        tipo ++;
                    }   
                }
            }
        }

        if(nroBarras==0)
        {/// se não temos barras, podemos parar por aqui, esse é o caso em que o usuário inseriu apenas os nós e apertou plot
            return;
        }

        if(tipo == nroBarras)
        {// se temos todas as barras vinculadas como rótulas, podemos criar uma rótula global para todas as barras
            xc1 = inputNos[i].x-0.09;
            yc1 = inputNos[i].y-0.09;
            xc2 = inputNos[i].x+0.09;
            yc2 = inputNos[i].y+0.09;
            desenharCirculo(xc1,yc1 ,xc2 ,yc2, 3);

        }else{// para os outros casos, temos que renderizar as rótulas das barras de maneira individual

            for(j=0; j< nos[i].length; j++)
            {
                if(nos[i][j] != null)
                {    
                    
                    if( (inputBarras[nos[i][j] ].noInicial == i ))
                    {
                        
                        if(vinculos[nos[i][j]].ri == true)
                        {
                            deltaX = ( inputNos[inputBarras[nos[i][j]].noFinal].x - inputNos[inputBarras[nos[i][j]].noInicial].x );
                            deltaY = ( inputNos[inputBarras[nos[i][j]].noFinal].y - inputNos[inputBarras[nos[i][j]].noInicial].y );
                            angulo = Math.atan( deltaY / deltaX );
                            
                            if( ( (deltaX >= 0)&&(deltaY >=0) ) || ( (deltaX >= 0)&&(deltaY <0) ) )
                            {
                                xp =  (0.06) * Math.cos(angulo) - (0) * Math.sin(angulo) ;
                                yp =  (0.06) * Math.sin(angulo) + (0) * Math.cos(angulo)
                                
                            }else if ( ((deltaX < 0)&&(deltaY >=0))|| ((deltaX < 0)&&(deltaY <0)) ){
                                xp =  (-0.06) * Math.cos(angulo) - (0) * Math.sin(angulo) ;
                                yp =  (-0.06) * Math.sin(angulo) + (0) * Math.cos(angulo) ;
                            }

                            xp += inputNos[inputBarras[nos[i][j]].noInicial].x;
                            yp += inputNos[inputBarras[nos[i][j]].noInicial].y;
                            
                            xc1 = xp-0.075;
                            yc1 = yp-0.075;
                            xc2 = xp+0.075;
                            yc2 = yp+0.075;
                            desenharCirculo(xc1,yc1 ,xc2 ,yc2,2); 
                        }   
                    }

                    if( (inputBarras[nos[i][j] ].noFinal == i ))
                    {  
                        if(vinculos[nos[i][j]].rf == true)
                        {
                            deltaX = (  inputNos[inputBarras[nos[i][j]].noInicial].x - inputNos[inputBarras[nos[i][j]].noFinal].x  );
                            deltaY = (  inputNos[inputBarras[nos[i][j]].noInicial].y - inputNos[inputBarras[nos[i][j]].noFinal].y );
                            angulo = Math.atan( deltaY / deltaX );
                            
                            
                            if( ( (deltaX >= 0)&&(deltaY >=0) ) || ( (deltaX >= 0)&&(deltaY <0) ) ){
                                xp =  (0.06) * Math.cos(angulo) - (0) * Math.sin(angulo) ;
                                yp =  (0.06) * Math.sin(angulo) + (0) * Math.cos(angulo) ;
                            }else if ( ((deltaX < 0)&&(deltaY >=0))|| ((deltaX < 0)&&(deltaY <0)) ){
                                xp =  (-0.06) * Math.cos(angulo) - (0) * Math.sin(angulo) ;
                                yp =  (-0.06) * Math.sin(angulo) + (0) * Math.cos(angulo) ;
                            }
                            xp += inputNos[inputBarras[nos[i][j]].noFinal].x;
                            yp += inputNos[inputBarras[nos[i][j]].noFinal].y;
                            
                            xc1 = xp-0.075;
                            yc1 = yp-0.075;
                            xc2 = xp+0.075;
                            yc2 = yp+0.075;
                            desenharCirculo(xc1,yc1 ,xc2 ,yc2, 2);
                        }     
                    }
                }
            }
        }
    }
}

function desenharMomentoNeg(shapes, ponto, pontos, valor)
{     
   let l1 = ponto.x-0.5;
   let l2 = ponto.y-0.05;
   let l3 = ponto.x-0.05;
   let l4 = ponto.y+0.5; // ponto pra baixo
   let l5 = ponto.x+0.4;
   let l6 = ponto.y+0.2; // ponto pra cima
   let svgPath1 = 'M '+ l1+','+ l2+' '+ 'Q '+l3+',' +l4+ ' ' +l5+','+ l6;
   let shape1 = {
        type: 'path',
        path: svgPath1,
        line: {
            width:2,
        color: 'rgb(192,31,55)'
        }
    }

   l1 = ponto.x+0.5;
   l2 = ponto.y+0.05;
   l3 = ponto.x+0.2;
   l4 = ponto.y+0.185; // ponto pra baixo
   l5 = ponto.x+0.395;
   l6 = ponto.y+0.35; // ponto pra cima
   let svgPath2 = 'M '+ l1+' '+ l2+' '+ 'L '+l3+' ' +l4+ ' L ' +l5+' '+ l6+' Z';

   let shape2 = {
        type: 'path',
        path: svgPath2,
        fillcolor: 'rgba(192,31,55, 1)',
        line: {
          color: 'rgb(192,31,55)'    
        }
    }

   
    shapes.push(shape1);
    shapes.push(shape2);
    let text = valor.toString()+"kN·m";
    var label = {
      x: [ponto.x-0.8],
      y: [ponto.y+0.3],
      mode: 'text',
      name: 'label Vetor',
      text: text,
      textfont : {
          family: 'Arial, sans serif, monospace',
          size: 10,
          color: 'rgb(192,31,55)', 
          
      },
      textposition: 'top center',
     
     
    };
    pontos.push(label);
}

function desenharMomentoPos(shapes, ponto, pontos, valor)
{     
   let l1 = ponto.x-0.4;
   let l2 = ponto.y+0.2;
   let l3 = ponto.x-0.05;
   let l4 = ponto.y+0.5; // ponto pra baixo
   let l5 = ponto.x+0.5;
   let l6 = ponto.y-0.05; // ponto pra cima
   let svgPath1 = 'M '+ l1+','+ l2+' '+ 'Q '+l3+',' +l4+ ' ' +l5+','+ l6;
   let shape1 = {
        type: 'path',
        path: svgPath1,
        line: {
            width:2,
        color: 'rgb(97,136,55)'
        }       
    }

    ///pontos do triangulos da ponta    
   l1 = ponto.x-0.5;
   l2 = ponto.y+0.05;
   l3 = ponto.x-0.185;
   l4 = ponto.y+0.2; // ponto pra baixo
   l5 = ponto.x-0.395;
   l6 = ponto.y+0.35; // ponto pra cima
   let svgPath2 = 'M '+ l1+' '+ l2+' '+ 'L '+l3+' ' +l4+ ' L ' +l5+' '+ l6+' Z';

   let shape2 = {
        type: 'path',
        path: svgPath2,
        fillcolor:'rgba(97,136,55, 1)',
     
        line: {
          color:  'rgb(97,136,55)'    
        
        }
    }

   
    shapes.push(shape1);
    shapes.push(shape2);

    let text = valor.toString()+"kN·m";
    var label = {
      x: [ponto.x+0.5],
      y: [ponto.y+0.4],
      mode: 'text',
      name: 'label Vetor',
      text: text,
      textfont : {
          family: 'Arial, sans serif, monospace',
          size: 10,
          color:  'rgb(97,136,55)' 
      },
      textposition: 'top center',
    };
    pontos.push(label);
}
/*
function desenharMomentoNeg(shapes, linhas, ponto)
{       
   let shape1 = {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: ponto.x-0.3,
        y0: ponto.y-0.3,
        x1: ponto.x+0.3,
        y1: ponto.y+0.3,
        line: {
          color: 'rgba(153,0,0, 1)',
          width: 2
        }       
   }

   let l1 = ponto.x - 0.1;
   let l2 = ponto.y + 0.283;
   let l3 = ponto.x + 0.01;
   let l4 = ponto.y  + 0.365;
   let l5 = ponto.x + 0.015;
   let l6 = ponto.y+ 0.23;
   let svgPath = 'M '+ l1+' '+ l2+' '+ 'L '+l3+' ' +l4+ ' L ' +l5+' '+ l6+' Z';

   let shape2 = {
        type: 'path',
        path: svgPath,
        fillcolor: 'rgba(153,0,0, 1)',
        line: {
          color: 'rgb(153,0,0)',
          width: 3   
        }
    }

    l1 = ponto.x + 0.1;
    l2 = ponto.y - 0.283;
    l3 = ponto.x - 0.02;
    l4 = ponto.y  - 0.23;
    l5 = ponto.x - 0.015;
    l6 = ponto.y- 0.362;
    svgPath = 'M '+ l1+' '+ l2+' '+ 'L '+l3+' ' +l4+ ' L ' +l5+' '+ l6+' Z';
    
    let shape3 = {
        type: 'path',
        path: svgPath,
        fillcolor: 'rgba(153,0,0, 1)',
        line: {
          color: 'rgb(153,0,0)',
          width: 3  
        }
    }
    
    shapes.push(shape1);
    shapes.push(shape2);
    shapes.push(shape3); 
}
*/
function desenharVetor2dAngulo(shapes, linhas, angulo,  modulo, transl, tipoUso, pontos, valor)
{
    let x = 0; // coordenadas para criar os objetos na origem
    let y = 0; // coordenadas para criar os objetos na origem

    let red = 70;
    let green= 56;
    let blue = 233;
    let a = 1;
    let expessura = 1;

    if(tipoUso == 1)
    {
        red = 237;
        green= 41;
        blue = 57;
        a = 0.9
    }else if(tipoUso == 3){
        red = 255;
        green= 0;
        blue = 0;
        a = 0.9

    }else if(tipoUso == 4)
    {
        red = 0;
         green= 0;
        blue = 255;
        a = 1;
        expessura = 3;
        
    }else if(tipoUso ==5){
        red = 255;
        green= 0;
        blue = 0;
        a = 1;
        expessura = 3;
    }
  
    let translacao= {};

    translacao.x = transl.x;
    translacao.y = transl.y;
    
    let inicio = {};
    let fim = {};

    inicio.x = (x) * Math.cos(angulo) - (y+modulo) * Math.sin(angulo);
    inicio.y = (x) * Math.sin(angulo) + (y+modulo) * Math.cos(angulo);
    fim.x = x;
    fim.y = y;

    inicio.x += translacao.x;
    inicio.y += translacao.y;
    fim.x += translacao.x;
    fim.y += translacao.y;

    let linha = {
            x: [inicio.x, fim.x],
            y: [inicio.y, fim.y],
            mode: 'lines',
            name: 'vetor',
            hoverinfo: "none",
            line: {
           
              color: 'rgba(' + red +',' + green +',' + blue + ','+ a +')',
               width: expessura
           }
      }
   
      linhas.push(linha);
      ///////////////////////////// 1º criar o objeto na origem rotacionado no ângulo desejado//////////
      let x1 = (x+0.05) * Math.cos(angulo) - (y+0.1) * Math.sin(angulo) ;
      let y1 = (x+0.05) * Math.sin(angulo) + (y+0.1) * Math.cos(angulo) ;
   
      let x2 = (x-0.05) * Math.cos(angulo) - (y+0.1) * Math.sin(angulo) ;
      let y2 = (x-0.05) * Math.sin(angulo) + (y+0.1) * Math.cos(angulo) ;
      ////////////////////// 2º translada o objeto para o seu devido lugar //////////////
     
      x += translacao.x;
      y += translacao.y;
   
      x1 +=  translacao.x;
      y1 += translacao.y;
   
      x2 += translacao.x;
      y2 += translacao.y;

      ///////////////////////////////////////////////////////////
      svgPath = 'M' + ' ' + x + ' ' + y +' '+ 'L' + ' ' + x1 + ' ' +  y1 + ' ' + 'L' + ' ' + x2 + ' ' +  y2 + ' ' + 'Z',
      shape = {
   
           type: 'path',
           path: svgPath,
           hoverinfo: "none",
           fillcolor: 'rgba(' + red +',' + green +',' + blue + ','+'1'+')',
           line: {
               color: 'rgba(' + red +',' + green +',' + blue + ','+'0.6'+')',
           }
      }
      if(valor){
        let text = valor.toString()+"kN";
        let posy = inicio.y;
        if(posy < 0)
        {
            posy -= 0.3;
        }
        var label = {
          x: [inicio.x],
          y: [posy],
          mode: 'text',
          name: 'label Vetor',
          text: text,
          textfont : {
            family: 'Arial, sans serif, monospace',
              size: 10,
              color: 'rgba(' + red +',' + green +',' + blue + ','+ 1 +')'
          },
          textposition: 'top left',
         
        };
        pontos.push(label);
      }
      shapes.push(shape); 
}

function desenharCargaDistribuida(shapes, linhas, noInicial, noFinal, qi, qf, pontos)
{
     //calcular o angulo do vetor em relação a base ortonormal//
     let deltaX = ( noFinal.x - noInicial.x );
     let deltaY = ( noFinal.y - noInicial.y );
     let angulo = Math.atan( deltaY / deltaX );
     let comprimento = Math.sqrt( Math.pow((noFinal.x-noInicial.x), 2) + Math.pow((noFinal.y-noInicial.y), 2) ); // calculo do módulo do vetor
     let translacao = {};
     let vi = 0;
     let vf = 0;
     let deltaQ = 0;
     let qtdVetores = 0;
     let tipo = 2;
     ////////////////////////////////////////////////////////
     if( (deltaX < 0) &&  (deltaY >= 0) )
     {
        qi *= -1;
        qf *= -1;
     }    

     if( (qi == 0) && (qf ==0) ){
         return;
     }
    
    
     translacao.x = noInicial.x;
     translacao.y = noInicial.y;
     

     if(qi > 0){
         tipo = 1;
     }

     if(deltaX == 0 && qi > 0)
     {//corrigindo o problema da falta de coerência nos sentidos das cargas nos eixos x e y, tomar vergonha na cara e resolver o problema de forma definitiva um dia!
         tipo = 2;
     }else if(deltaX ==0 && qi < 0){
         tipo = 1;
     }

     if(deltaX != 0){
        qtdVetores = (comprimento * Math.cos(angulo) / 0.5);
     }else{
        qtdVetores = comprimento / 0.5;
     }
     
     if( (qf < 0) || (qi< 0) ){
        angulo += Math.PI
        if( (deltaY < 0) && (deltaX == 0) ){
            angulo -=  Math.PI;
        }
     }

     if( (qf > 0) || (qi> 0) ){
        if( (deltaY < 0) && (deltaX == 0) ){
            angulo +=  Math.PI;
        }
     }


     if( qi != 0)
     {
         if(qi > qf){
            vi = 1.3;
         }else if( (qf > 0) && (qi < qf) ){
            vi = 0.3;
         }else{
             vi = 0.8;
         }
         
     }

     if(qf != 0){
         if(qf > qi){
             vf = 1.3;
         }else if(qf == qi){
            vf = 0.8;
         }else{
             vf = 0.3;
         }
     }
     deltaQ = vf - vi;
     let gradiente = deltaQ/(qtdVetores);


     if(vf > 0){
        desenharVetor2dAngulo(shapes, linhas, angulo, vf, noFinal,tipo);
     }
    
     let moduloGrad = vi;

     for(let i=0; i< qtdVetores; i++)
     {  
        if( moduloGrad == 0 )
        {
            moduloGrad +=gradiente;
            translacao.x += 0.5;
            translacao.y += translacao.x*Math.tan(angulo);
            continue;
        }
    
        desenharVetor2dAngulo(shapes, linhas, angulo, moduloGrad, translacao,tipo);
           
        if( deltaX != 0){
            if( (deltaX > 0))
            {
                translacao.x += 0.5;
                translacao.y += 0.5* Math.tan(angulo);
            }else{
                translacao.x -= 0.5;
                translacao.y -= 0.5* Math.tan(angulo);
            }

        }else{
            if( (deltaX == 0) && deltaY > 0)
            {
                translacao.y += 0.5; 
            }else{
                translacao.y -= 0.5;
            }
        }
        moduloGrad += gradiente;
        if(moduloGrad < 0.1)
        {
           break;
        } 
     }
     let inicio = {};
     let fim = {};
    
   
     inicio.x = ( (0) * Math.cos(angulo) ) - ( (vi) * Math.sin(angulo) );
     inicio.y = ( (0) * Math.sin(angulo) ) + ( (vi) * Math.cos(angulo) );
     inicio.x += noInicial.x;
     inicio.y += noInicial.y;
     
     fim.x = ( (0) * Math.cos(angulo) ) - ( (vf) * Math.sin(angulo) );
     fim.y = ( (0) * Math.sin(angulo) ) + ( (vf) * Math.cos(angulo) );
     fim.x += noFinal.x;
     fim.y += noFinal.y;
    
     let cor = 'rgba(70,56,233,0.6)';
     

     if(tipo == 1){
        cor = 'rgba(237,41,57,0.6)';
     }
     let linha = {
        x: [ inicio.x,  fim.x ],
        y: [ inicio.y, fim.y ],
        mode: 'lines',
       
        name: 'vetor',
        line: {
       
          color: cor,
           width: 2
       }
  }

  let texti = qi.toString()+"kN/m";
  let textf = qf.toString()+"kN/m";
  if(qi == qf)
  {
    var label1 = {// PARA MOSTRAR OS VALORES EM POSIÇÕES CONTROLADAS
        x: [(inicio.x+0.5)],
        y: [ inicio.y],
        mode: 'text',
        name: 'label Vetor',
        text: texti,
        textfont : {
            family:'Arial Black',
            size: 11
        },
        textposition: 'top right',
       
       
      };
      pontos.push(label1);
      
  }else{
    var label1 = {// PARA MOSTRAR OS VALORES EM POSIÇÕES CONTROLADAS
        x: [inicio.x],
        y: [ inicio.y+0.09],
        mode: 'text',
        name: 'label Vetor',
        text: texti,
        textfont : {
            family:'Arial Black',
            size: 11
        },
        textposition: 'top right',
       
       
      };
      var label2 = {// PARA MOSTRAR OS VALORES EM POSIÇÕES CONTROLADAS
        x: [fim.x-0.05],
        y: [fim.y],
        mode: 'text',
        name: 'label Vetor',
        text: textf,
        textfont : {
            family:'Arial Black',
            size: 11
        },
        textposition: 'top left',
      };
      pontos.push(label1);
      pontos.push(label2);

  }
  linhas.push(linha);
}

function desenharCargaDistribuidaAxial(shapes, linhas, noInicial, noFinal, qi, qf)
{
    //calcular o angulo do vetor em relação a base ortonormal//
    let sinal = 1;
    if(qi < 0)
    {   
        sinal = 2;
    }
    let deltaX = ( noFinal.x - noInicial.x );
    let deltaY = ( noFinal.y - noInicial.y );
    let angulo = Math.atan( deltaY / deltaX )+Math.PI/2;
    ////////////////////////////////////////////////////////
   
       
    let comprimento = Math.sqrt( Math.pow((noFinal.x-noInicial.x), 2) + Math.pow((noFinal.y-noInicial.y), 2) ); // calculo do módulo do vetor
  
    let translacao = {};
    translacao.x = noInicial.x;
    translacao.y = noInicial.y;
    let vi = 0;
    let vf = 0;
    let deltaQ = 0;
    let qtdVetores = 0;
    
    let tipo = 3;

    if(qi < 0)
    {
        tipo = 2;
    }
    if(deltaX != 0){
       qtdVetores = (comprimento * Math.cos(angulo-Math.PI/2) / 0.5);
    }else{
       qtdVetores = comprimento / 0.5;
    }
    
    if( (qf < 0) || (qi< 0) ){
       angulo += Math.PI
       if( (deltaY < 0) && (deltaX == 0) ){
           angulo -=  Math.PI;
       }
    }

    if( (qf > 0) || (qi> 0) ){
       if( (deltaY < 0) && (deltaX == 0) ){
           angulo +=  Math.PI;
       }
    }


    if( qi != 0)
    {
        if(qi > qf){
           vi = 1.5;
        }else if( (qf > 0) && (qi < qf) ){
           vi = 0.5;
        }else{
            vi = 1;
        }
        
    }

    if(qf != 0){
        if(qf > qi){
            vf = 1.5;
        }else if(qf == qi){
           vf = 1;
        }else{
            vf = 0.5;
        }
    }
    deltaQ = vf - vi;
    let gradiente = deltaQ/(qtdVetores);


    if(vf > 0)
    {
       desenharVetor2dAngulo(shapes, linhas, angulo, vf, noFinal, tipo);   
    }
       
    let moduloGrad = vi;
    
    for(let i=0; i< qtdVetores; i++)
    {  
       if(moduloGrad ==  0)
       {
           moduloGrad +=gradiente;
           continue;
       }
      
       desenharVetor2dAngulo(shapes, linhas, angulo, moduloGrad, translacao,tipo);
       if( deltaX != 0){
           if( (deltaX > 0)){
               translacao.x += 0.5;
               translacao.y += 0.5 * Math.tan(angulo-Math.PI/2);
           }else{
               translacao.x -= 0.5;
               translacao.y -= 0.5 * Math.tan(angulo-Math.PI/2);;
           }

       }else{
           if( (deltaX == 0) && deltaY > 0){
               translacao.y += 0.5; 
           }else{
               translacao.y -= 0.5;
           }
       }
       moduloGrad +=gradiente;
      if(moduloGrad < 0.1){
          break;
       }
      
       
    }

}


function desenharApoio1(shapes, linhas, angulo,  modulo, transl)
{
    let x = 0; // coordenadas para criar os objetos na origem
    let y = 0; // coordenadas para criar os objetos na origem

    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;

    ///////////////////////////// 1º criar o objeto na origem rotacionado no ângulo desejado//////////
    x1 = (x+0.17) * Math.cos(angulo) - (y+0.2) * Math.sin(angulo) ;
    y1 = (x+0.17) * Math.sin(angulo) + (y+0.2) * Math.cos(angulo) ;
 
    x2 = (x-0.17) * Math.cos(angulo) - (y+0.2) * Math.sin(angulo) ;
    y2 = (x-0.17) * Math.sin(angulo) + (y+0.2) * Math.cos(angulo) ;
    ////////////////////// 2º translada o objeto para o seu devido lugar //////////////
   
    x += transl.x;
    y += transl.y;
 
    x1 +=  transl.x;
    y1 += transl.y;
 
    x2 += transl.x;
    y2 += transl.y;
    ///////////////////////////////////////////////////////////
    svgPath = 'M' + ' ' + x + ' ' + y +' '+ 'L' + ' ' + x1 + ' ' +  y1 + ' ' + 'L' + ' ' + x2 + ' ' +  y2 + ' ' + 'Z',
    shape = {
 
         type: 'path',
         path: svgPath,
         fillcolor: 'rgba(117, 117, 117, 1)',
         line: {
             color: 'rgb(58, 58,58, 1)',
             width: 2
         }
    }
    shapes.push(shape); 
   /*
    xc1 = (x) * Math.cos(angulo) - (y) * Math.sin(angulo) ;
    yc1 = (x) * Math.sin(angulo) + (y) * Math.cos(angulo) ;
 
    xc2 = (x+0.09) * Math.cos(angulo) - (y+0.09) * Math.sin(angulo) ;
    yc2 = (x+0.09) * Math.sin(angulo) + (y+0.09  ) * Math.cos(angulo) ;

 
        let circle1 = {
            type: 'circle',
            xref: 'x',
            yref: 'y',
            fillcolor: 'rgba(219, 219, 219, 1)',
            x0: xc1,
            y0: yc1,
            x1: xc2,
            y1: yc2,
            line: {
              color:  'rgb(0, 0,0, 0)',
              width: 1
            }
           
        }

        circle1.x0 += x2;
        circle1.y0 += y2;
        circle1.x1 += x2;
        circle1.y1 += y2;

       
        shapes.push(circle1);

        xc1 = (x) * Math.cos(angulo) - (y) * Math.sin(angulo) ;
        yc1 = (x) * Math.sin(angulo) + (y) * Math.cos(angulo) ;
     
        xc2 = (x-0.09) * Math.cos(angulo) - (y+0.09) * Math.sin(angulo) ;
        yc2 = (x-0.09) * Math.sin(angulo) + (y+0.09  ) * Math.cos(angulo) ;

        let circle2 = {
            type: 'circle',
            xref: 'x',
            yref: 'y',
            fillcolor: 'rgba(219, 219, 219, 1)',
            x0: xc1,
            y0: yc1,
            x1: xc2,
            y1: yc2,
            line: {
              color:  'rgb(0, 0,0, 0)',
              width: 1
            }
           
        }

        circle2.x0 += x1;
        circle2.y0 += y1;
        circle2.x1 += x1;
        circle2.y1 += y1;

       
        shapes.push(circle2);

        xc1 = (x-0.245) * Math.cos(angulo) - (y) * Math.sin(angulo) ;
        yc1 = (x-0.245) * Math.sin(angulo) + (y) * Math.cos(angulo) ;
     
        xc2 = (x-0.155) * Math.cos(angulo) - (y+0.09) * Math.sin(angulo) ;
        yc2 = (x-0.155) * Math.sin(angulo) + (y+0.09  ) * Math.cos(angulo) ;

        let circle3 = {
            type: 'circle',
            xref: 'x',
            yref: 'y',
            fillcolor: 'rgba(219, 219, 219, 1)',
            x0: xc1,
            y0: yc1,
            x1: xc2,
            y1: yc2,
            line: {
              color:  'rgb(0, 0,0, 0)',
              width: 1
            }
           
        }

        circle3.x0 += x1;
        circle3.y0 += y1;
        circle3.x1 += x1;
        circle3.y1 += y1;

       
        shapes.push(circle3);
        */
}

function desenharApoio2(shapes, linhas, angulo,  modulo, transl)
{
    let x = 0; // coordenadas para criar os objetos na origem
    let y = 0; // coordenadas para criar os objetos na origem

    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;

    ///////////////////////////// 1º criar o objeto na origem rotacionado no ângulo desejado//////////
    x1 = (x+0.2) * Math.cos(angulo) - (y+0.21) * Math.sin(angulo) ;
    y1 = (x+0.2) * Math.sin(angulo) + (y+0.21) * Math.cos(angulo) ;
 
    x2 = (x-0.2) * Math.cos(angulo) - (y+0.2) * Math.sin(angulo) ;
    y2 = (x-0.2) * Math.sin(angulo) + (y+0.2) * Math.cos(angulo) ;
    ////////////////////// 2º translada o objeto para o seu devido lugar //////////////
   
    x += transl.x;
    y += transl.y;
 
    x1 +=  transl.x;
    y1 += transl.y;
 
    x2 += transl.x;
    y2 += transl.y;
    ///////////////////////////////////////////////////////////
    svgPath = 'M' + ' ' + x + ' ' + y +' '+ 'L' + ' ' + x1 + ' ' +  y1 + ' ' + 'L' + ' ' + x2 + ' ' +  y2 + ' ' + 'Z',
    shape = {
 
         type: 'path',
         path: svgPath,
         fillcolor: 'rgba(117, 117, 117, 1)',
         line: {
             color: 'rgb(58, 58,58, 1)',
             width: 2
         }
    }
    shapes.push(shape); 
    let xl1 = 0;
    let xl2 = 0.15;
    let yl1 = 0;
    let yl2 = 0.07;

      for(let i=0; i< 4; i++){
     
         linha = {
            x: [ xl1,  xl2 ],
            y: [ yl1, yl2],
            mode: 'lines',
            name: 'vetor',
            line: {
           
              color: 'rgb(58,58,58)',
               width: 2
           }
        }

        linha.x[0] = (xl1) * Math.cos(angulo) - (yl1) * Math.sin(angulo) ;
        linha.y[0] = (xl1) * Math.sin(angulo) + (yl1) * Math.cos(angulo) ;

        linha.x[1] = (xl2) * Math.cos(angulo) - (yl2) * Math.sin(angulo) ;
        linha.y[1] = (xl2 )* Math.sin(angulo) + (yl2) * Math.cos(angulo) ;
       
        linha.x[0] += x2;
    linha.y[0] +=  y2;

    linha.x[1] += x2;
    linha.y[1] +=  y2;

        linhas.push(linha);
        xl1 += 0.122;
        xl2 += 0.122;

    }

}


function desenharApoio3(shapes, linhas, angulo,  modulo, transl)
{
    let x = 0; // coordenadas para criar os objetos na origem
    let y = 0; // coordenadas para criar os objetos na origem

    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    
    ///////////////////////////// 1º criar o objeto na origem rotacionado no ângulo desejado//////////
    x1 = (x-0.18) * Math.cos(angulo) - (y+0.1) * Math.sin(angulo) ;
    y1 = (x-0.18) * Math.sin(angulo) + (y+0.1) * Math.cos(angulo) ;
 
    x2 = (x+0.18) * Math.cos(angulo) - (y-0.05) * Math.sin(angulo) ;
    y2 = (x+0.18) * Math.sin(angulo) + (y-0.05) * Math.cos(angulo) ;
    ////////////////////// 2º translada o objeto para o seu devido lugar //////////////
   
    x += transl.x;
    y += transl.y;
 
    x1 +=  transl.x;
    y1 += transl.y;
 
    x2 += transl.x;
    y2 += transl.y;
    ///////////////////////////////////////////////////////////
    svgPath = 'M' + ' ' + x + ' ' + y +' '+ 'L' + ' ' + x1 + ' ' +  y1 + ' ' + 'L' + ' ' + x2 + ' ' +  y2 + ' ' + 'Z',
    shape = {
 
        type: 'rect',
      x0: x1,
      y0: y1,
      x1: x2,
      y1: y2,
      fillcolor: 'rgba(117, 117, 117, 1)',
      line: {
        color: 'rgba(58, 58,58, 1)',
        width: 2
      },
      
    
    }
    shapes.push(shape); 
    
    let xl1 = 0.0;
    let xl2 = 0.08;
    let yl1 = 0;
    let yl2 = 0.08;

      for(let i=0; i< 3; i++){
     
         linha = {
            x: [ xl1,  xl2 ],
            y: [ yl1, yl2],
            mode: 'lines',
            name: 'vetor',
            line: {
           
              color: 'rgb(58,58,58)',
               width: 2
           }
        }

        linha.x[0] = (xl1) * Math.cos(angulo) - (yl1) * Math.sin(angulo) ;
        linha.y[0] = (xl1) * Math.sin(angulo) + (yl1) * Math.cos(angulo) ;

        linha.x[1] = (xl2) * Math.cos(angulo) - (yl2) * Math.sin(angulo) ;
        linha.y[1] = (xl2 )* Math.sin(angulo) + (yl2) * Math.cos(angulo) ;
       
        linha.x[0] += x1;
        linha.y[0] +=  y1;

         linha.x[1] += x1;
        linha.y[1] +=  y1   ;

        linhas.push(linha);
        xl1 += 0.15;
        xl2 += 0.15;
        
    
    }
   
   
}


function desenharDiagramaAxial(pontos, linhas, barra, desenhar, id)
{   
    if(barra.equacaoAxial == "")
    {
        return;
    }

    let deltaX = ( (barra.noFinal.x) - barra.noInicial.x );
    let deltaY = ( barra.noFinal.y- barra.noInicial.y );
    let angulo = Math.atan( deltaY / deltaX );
    let intervalo = Math.sqrt(Math.pow(deltaY,2)+Math.pow(deltaX,2));
    let pontosX = []
    let pontosY = []
    let pontosX2 = []
    let pontosY2 = [];
    let legendas = [];

    if( (deltaX < 0) &&  (deltaY >= 0) )
    {
        angulo += Math.PI;
    } 
   
    if(angulo == -0)
    {
         angulo = 0;
    }
    
    if( (deltaX < 0) &&  (deltaY < 0) )
    {
        angulo += Math.PI;
    } 
    
    let i = 0;
    
    //let escala = 2/desenhar.escalaDiagramas;

    let escala = 1.5/desenhar.escalaAxial;

   
 
      
    
    
    for(i=0; i<barra.axialMax.length; i++)
    {
        if(  ( (barra.axialMax[i].x != null) ) && (!isNaN(barra.axialMax[i].valor)) && ( !isNaN((barra.axialMax[i].x))  ))
        {
       
            pontosX.push(barra.axialMax[i].x);
            pontosX2.push(barra.axialMax[i].x);
            pontosY.push(barra.axialMax[i].valor*escala);
            pontosY2.push(0);
            legendas.push( ("N(x) Bar: " +(id+1).toString() +" x: " + (barra.axialMax[i].x.toPrecision(2)).toString() +"m  valor: " + ((barra.axialMax[i].valor.toPrecision(4)).toString()) +"kN"));

        }
    }
 
    

        cor1 = "rgba(137,131,109,1)";
        cor2 = "rgba(215,205,172, 0.6)";
 
    try {
      // compile the expression once
   
      const expression = barra.equacaoAxial;
      const expr = math.compile(expression)
    
      // evaluate the expression repeatedly for different values of x
      let xValues = math.range(0, intervalo, 0.001).toArray()
      let yValues = xValues.map(function (x) {
        return expr.eval({x: x})
      })
     
     
      for(i=0; i<yValues.length; i++)
      {
        yValues[i] *= escala;
        let x0 = xValues[i];
        let y0 = yValues[i];
          xValues[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          yValues[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          xValues[i] += barra.noInicial.x;
          yValues[i] += barra.noInicial.y;
          
      }
   
      // render the plot using plotly
      const trace1 = {//diagrama de a ser desenhado
        x:  xValues,
        y:  yValues,
        type: 'scatter',
        hoverinfo: "none",
        line: {
            color: cor1,
            width: 1
          }       
      }

      let origem = [barra.noInicial.x, barra.noFinal.x ];
      let fim = [barra.noInicial.y, barra.noFinal.y];
    
      var trace2 = {// linha para pintar o diagrama
        x: origem,
        y: fim,
        fill: 'tonexty',
        fillcolor: cor2,
        type: 'scatter',
        mode: 'none'
      };


      for(i=0; i<pontosX.length; i++)
      {
          let x0 = pontosX[i];
          let y0 = pontosY[i];
          pontosX[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          pontosY[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          pontosX[i] += barra.noInicial.x;
          pontosY[i] += barra.noInicial.y;          
      }

      for(i=0; i<pontosX2.length; i++)
      {
          let x0 = pontosX2[i];
          let y0 = pontosY2[i];
          pontosX2[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          pontosY2[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          pontosX2[i] += barra.noInicial.x;
          pontosY2[i] += barra.noInicial.y;
       
     
      }
      

      let text = null;

      for(i=0; i<pontosX.length; i++)
      {
        text = legendas[i];
        let linha = {
            x: [pontosX[i], pontosX2[i]],
            y: [pontosY[i], pontosY2[i]],
            hoverinfo: "none",
            mode: 'lines+markers',
            type: 'scatter',
            line: {
              color: 'rgba(217,217,217)',
               width: 1
           },
           marker: {
               color: 'rgb(129,123,103)',
               size: 3,
           }
        }
        linhas.push(linha);

        let label = {
            x: [pontosX[i]],
            y: [pontosY[i]],
            hoverinfo: "text",
            text: text,
            mode: 'markers',
            type: 'scatter',
            hoverlabel:{
                bgcolor:'rgb(211,205,202)',
                                    
                font:{
                    size: 9, 
                    family: 'Arial Black, sans serif, monospace',
                    color: 'rgb(64,61,51)'
                }
            },
            marker: {
                color: 'rgb(129,123,103)',
                size: 5,
            }
        }
        linhas.push(label);
      }

     
      pontos.push(trace1);
      pontos.push(trace2);
   
      
     
    }

    catch (err) {
      console.error(err)
      alert(err)
    }
  }



function desenharDiagramaCortante(pontos, linhas, barra, desenhar, id)
{   
    if(barra.equacaoCortante == "")
    {
        return;
    }

    let deltaX = ( (barra.noFinal.x) - barra.noInicial.x );
    let deltaY = ( barra.noFinal.y- barra.noInicial.y );
    let angulo = Math.atan( deltaY / deltaX );
    let intervalo = Math.sqrt(Math.pow(deltaY,2)+Math.pow(deltaX,2));
    let pontosX = []
    let pontosY = []
    let pontosX2 = []
    let pontosY2 = [];
    let legendas = [];

    if( (deltaX < 0) &&  (deltaY >= 0) )
    {
        angulo += Math.PI;
    } 
   
    if(angulo == -0)
    {
         angulo = 0;
    }
    
    if( (deltaX < 0) &&  (deltaY < 0) )
    {
        angulo += Math.PI;
    } 
    
    let i = 0;
    
    //let escala = 2/desenhar.escalaDiagramas;

    let escala = 2.5/desenhar.escalaCortante;

      
    for(i=0; i<barra.cortanteMax.length; i++)
    {
        if(  ( (barra.cortanteMax[i].x != null) ) && (!isNaN(barra.cortanteMax[i].valor)) && ( !isNaN((barra.cortanteMax[i].x))  ))
        {
            pontosX.push(barra.cortanteMax[i].x);
            pontosX2.push(barra.cortanteMax[i].x);
            pontosY.push(barra.cortanteMax[i].valor*escala);
            pontosY2.push(0);
            legendas.push( ("V(x) Bar:" +(id+1).toString() + " x: " + (barra.cortanteMax[i].x.toPrecision(2)).toString() +"m  valor: " + ((barra.cortanteMax[i].valor.toPrecision(4)).toString()) +"kN"));


        }
    }
 
        cor1 = "rgba(64,100,132,1)";
        cor2 = "rgba(115,179,238, 0.6)";
 
    try {
      // compile the expression once
   
      const expression = barra.equacaoCortante;
      const expr = math.compile(expression)
    
      // evaluate the expression repeatedly for different values of x
      let xValues = math.range(0, intervalo, 0.001).toArray()
      let yValues = xValues.map(function (x) {
        return expr.eval({x: x})
      })
     
     
      for(i=0; i<yValues.length; i++)
      {
        yValues[i] *= escala;
        let x0 = xValues[i];
        let y0 = yValues[i];
          xValues[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          yValues[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          xValues[i] += barra.noInicial.x;
          yValues[i] += barra.noInicial.y;
          
      }
   
      // render the plot using plotly
      const trace1 = {//diagrama de a ser desenhado
        x:  xValues,
        y:  yValues,
        type: 'scatter',
        hoverinfo: "none",
        line: {
            color: cor1,
            width: 1
          }       
      }

      let origem = [barra.noInicial.x, barra.noFinal.x ];
      let fim = [barra.noInicial.y, barra.noFinal.y];
    
      var trace2 = {// linha para pintar o diagrama
        x: origem,
        y: fim,
        fill: 'tonexty',
        fillcolor: cor2,
        type: 'scatter',
        mode: 'none'
      };


      for(i=0; i<pontosX.length; i++)
      {
          let x0 = pontosX[i];
          let y0 = pontosY[i];
          pontosX[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          pontosY[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          pontosX[i] += barra.noInicial.x;
          pontosY[i] += barra.noInicial.y;          
      }

      for(i=0; i<pontosX2.length; i++)
      {
          let x0 = pontosX2[i];
          let y0 = pontosY2[i];
          pontosX2[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          pontosY2[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          pontosX2[i] += barra.noInicial.x;
          pontosY2[i] += barra.noInicial.y;
       
     
      }
      
   
      let text = null;

      for(i=0; i<pontosX.length; i++)
      {
        text = legendas[i];
        let linha = {
            x: [pontosX[i], pontosX2[i]],
            y: [pontosY[i], pontosY2[i]],
            hoverinfo: "none",
            mode: 'lines+markers',
            type: 'scatter',
            line: {
              color: 'rgb(64,100,132)',
               width: 1
           },
           marker: {
               color: 'rgb(64,100,132)',
               size: 3,
           }
        }
        linhas.push(linha);

        let label = {
            x: [pontosX[i]],
            y: [pontosY[i]],
            hoverinfo: "text",
            text: text,
            mode: 'markers',
            type: 'scatter',
            hoverlabel:{
                bgcolor:'rgba(217,217,217,0.9)',
                                    
                font:{
                    size: 9, 
                    family: 'Arial Black, sans serif, monospace',
                    color: 'rgb(69,107,142)'
                }
            },
            marker: {
                color: 'rgb(64,100,132)',
                size: 5,
            }
        }
        linhas.push(label);
      }

     
      pontos.push(trace1);
      pontos.push(trace2);
   
      
     
    }

    catch (err) {
      console.error(err)
      alert(err)
    }
  }



function desenharDiagramaMomentos(pontos, linhas, barra, desenhar,id)
{   
    if(barra.equacaoMomentoFletor == "")
    {
        return;
    }

    let deltaX = ( (barra.noFinal.x) - barra.noInicial.x );
    let deltaY = ( barra.noFinal.y- barra.noInicial.y );
    let angulo = Math.atan( deltaY / deltaX );
    let intervalo = Math.sqrt(Math.pow(deltaY,2)+Math.pow(deltaX,2));
    let pontosX = []
    let pontosY = []
    let pontosX2 = []
    let pontosY2 = [];
    let legendas = [];
    let i = 0;
    let escala = 3/desenhar.escalaFletor;

    if( (deltaX < 0) &&  (deltaY >= 0) )
    {
        angulo += Math.PI;
    } 
   
    if(angulo == -0)
    {
         angulo = 0;
    }
    
    if( (deltaX < 0) &&  (deltaY < 0) )
    {
        angulo += Math.PI;
    } 
    
    for(i=0; i<barra.momentoMax.length; i++)
    {
        if(  ( (barra.momentoMax[i].x != null) ) && (!isNaN(barra.momentoMax[i].valor)) && ( !isNaN((barra.momentoMax[i].x))  ))
        {
          
            pontosX.push(barra.momentoMax[i].x);
            pontosX2.push(barra.momentoMax[i].x);
            pontosY.push(barra.momentoMax[i].valor*-escala);
            pontosY2.push(0);
            legendas.push( ("M(x) Bar:" +(id+1).toString() + " x: " + (barra.momentoMax[i].x.toPrecision(2)).toString() +"m  valor: " + ((barra.momentoMax[i].valor.toPrecision(4)).toString()) +"kN·m"));

        }
    }
 
        escala *= -1;
        let cor1 = "rgba(132,76,128,1)";
        let cor2 =  "rgba(192,143,188, 0.6)";
 
    try {
      // compile the expression once
   
      const expression = barra.equacaoMomentoFletor;
      const expr = math.compile(expression)
    
      // evaluate the expression repeatedly for different values of x
      let xValues = math.range(0, intervalo, 0.001).toArray()
      let yValues = xValues.map(function (x) {
        return expr.eval({x: x})
      })
     
     
      for(i=0; i<yValues.length; i++)
      {
        yValues[i] *= escala;
        let x0 = xValues[i];
        let y0 = yValues[i];
          xValues[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          yValues[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          xValues[i] += barra.noInicial.x;
          yValues[i] += barra.noInicial.y;
          
      }
   
      // render the plot using plotly
      const trace1 = {//diagrama de a ser desenhado
        x:  xValues,
        y: yValues,
        type: 'scatter',
        hoverinfo: "none",
        line: {
            color: cor1,
            width: 1
          }       
      }
      let origem = [barra.noInicial.x, barra.noFinal.x ];
      let fim = [barra.noInicial.y, barra.noFinal.y];
    
      var trace2 = {// linha para pintar o diagrama
        x: origem,
        y: fim,
        fill: 'tonexty',
        fillcolor: cor2,
        type: 'scatter',
        mode: 'none'
      };

   
      for(i=0; i<pontosX.length; i++)
      {
          let x0 = pontosX[i];
          let y0 = pontosY[i];
          pontosX[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          pontosY[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          pontosX[i] += barra.noInicial.x;
          pontosY[i] += barra.noInicial.y;          
      }

      for(i=0; i<pontosX2.length; i++)
      {//ponto sobre a abscissa local da barra
          let x0 = pontosX2[i];
          let y0 = pontosY2[i];
          pontosX2[i] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
          pontosY2[i] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
          pontosX2[i] += barra.noInicial.x;
          pontosY2[i] += barra.noInicial.y;
       
     
      }
      
      let text = null;

      for(i=0; i<pontosX.length; i++)
      { 
          text = legendas[i];
        let linha = {
            x: [pontosX[i], pontosX2[i]],
            y: [pontosY[i], pontosY2[i]],
            hoverinfo: "none",
            mode: 'lines+markers',
            type: 'scatter',
            line: {
              color: 'rgb(132,76,128)',
               width: 1
           },
           marker: {
               color: 'rgb(96,71,94)',
               size: 3,
           }
        }
        linhas.push(linha);

        let label = {
            x: [pontosX[i]],
            y: [pontosY[i]],
            hoverinfo: "text",
            text: text,
            mode: 'markers',
            type: 'scatter',
            hoverlabel:{
                bgcolor:'rgba(217,217,217,0.9)',
                                    
                font:{
                    size: 9, 
                    family: 'Arial Black, sans serif, monospace',
                    color: 'rgb(96,71,94)'
                }
            },
            marker: {
                color: 'rgb(96,71,94)',
                size: 5,
            }
        }
        linhas.push(label);
        
      }

    
      pontos.push(trace1);
      pontos.push(trace2);
   
      
     
    }

    catch (err) {
      console.error(err)
      alert(err)
    }
  }







function desenharDeslocamentos(pontos, barra, escala, id)
{   
    let deltaX = ( (barra.noFinal.x) - (barra.noInicial.x));
    let deltaY = ( (barra.noFinal.y) - (barra.noInicial.y));
    let angulo = Math.atan( deltaY / deltaX );
    let intervalo = Math.sqrt(Math.pow(deltaY,2)+Math.pow(deltaX,2));
    let posX = [];
    let posY = [];
    let pontosX = [];
    let pontosY = [];
    let legendas = [];

    
    
    if( (deltaX < 0) &&  (deltaY >= 0) )
    {
        angulo += Math.PI;
    } 
    
    if(angulo == -0)
    {
         angulo = 0;
    }
    
    if( (deltaX < 0) &&  (deltaY < 0) )
    {
        angulo += Math.PI;
    } 

    
    try {
      // compile the expression once
      const xGlobal = barra.escalarEquacoes(8,escala);
      const yGlobal = barra.escalarEquacoes(9,escala);

      
      const expression = xGlobal;
      const expression2 = yGlobal;

     
      const expr = math.compile(expression);
      const expr2 = math.compile(expression2);
      let i =0;
 
      let xLocal = math.range(0, intervalo, 0.1).toArray()
   
      let dx = xLocal.map(function (x) { /// obtendo deslocamentos em x
        return expr.eval({x: x})
      })

      

      let dy = xLocal.map(function (x) { // obtendo deslocamentos em y
        return expr2.eval({x: x})
      })

     
      let DX = [];
      let DY = [];
      let xG = [];
      let yG =[];

      for(i=0; i<xLocal.length; i++)
      {
        let x0 = xLocal[i];
        let y0 = 0;
        xG =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
        yG =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
        xG += barra.noInicial.x;
        yG += barra.noInicial.y;

        if(xGlobal){
            DX[i] = xG + dx[i];
        }else{
            DX[i] = xG 
        }
        
        if(xGlobal){
            DX[i] = xG + dx[i];
        }else{
            DX[i] = xG 
        }

        if(yGlobal){
            DY[i] = yG + dy[i];
        }else{
            DY[i] = yG 
        }
         
      }

      //primeiro colocamos o no;
        posX.push((barra.noInicial.x+(barra.noInicial.deslocamentoNodal[0]*escala)));
        posY.push((barra.noInicial.y+(barra.noInicial.deslocamentoNodal[1]*escala)));
      
     
      for(i=1; i<(DX.length-1); i++)
      {
        posX.push(DX[i]);
        posY.push(DY[i]);
      }
      
      posX.push((barra.noFinal.x+(barra.noFinal.deslocamentoNodal[0]*escala)));
      posY.push((barra.noFinal.y+(barra.noFinal.deslocamentoNodal[1]*escala)));
      
      
  
      desenharNo2D(pontos, (barra.noInicial.x+(barra.noInicial.deslocamentoNodal[0]*escala)), (barra.noInicial.y+(barra.noInicial.deslocamentoNodal[1]*escala)),"" ) ;
      // render the plot using plotly
      const trace1 = {
        x:  posX,
        y:  posY,
        type: 'scatter',
        hoverinfo:"none",
        line: {
            color:  'rgb(229,81,81)',
            width: 2
          }       
      }
      pontos.push(trace1);
      
      if( (barra.flexaMax[0]) )
      {
        if((!isNaN(barra.flexaMax[0].valor)) && ( !isNaN((barra.flexaMax[0].x))  ))
        {
           
            pontosX.push(barra.flexaMax[0].x);
            pontosY.push(barra.flexaMax[0].valor*escala);
            legendas.push( ("δ Bar:" +(id+1).toString() + " x: " + (barra.flexaMax[0].x.toPrecision(4)).toString() +"m  valor: " + ((barra.flexaMax[0].valor.toPrecision(4)).toString()) +"m"));

         
                let x0 = pontosX[0];
                let y0 = pontosY[0];
                pontosX[0] =  x0 * Math.cos(angulo) - y0 * Math.sin(angulo) ;
                pontosY[0] =  x0 * Math.sin(angulo) + y0 * Math.cos(angulo) ;
                pontosX[0] += barra.noInicial.x;
                pontosY[0] += barra.noInicial.y;          
            
    
            let text = null;
             text = legendas[0];
            let label = {
                x: [pontosX[0]],
                y: [pontosY[0]],
                hoverinfo: "text",
                text: text,
                mode: 'markers',
                type: 'scatter',
                hoverlabel:{
                    bgcolor:'rgba(239,150,150,0.9)',
                                        
                    font:{
                        size: 9, 
                        family: 'Arial Black, sans serif, monospace',
                        color: 'rgb(23,15,15)'
                    }
                },
                marker: {
                    color: 'rgb(160,56,56)',
                    size: 4,
                }
            }
            linhas.push(label);
        }
      }
    }
     catch (err) {
     console.error(err)
     alert(err)
    }
}

