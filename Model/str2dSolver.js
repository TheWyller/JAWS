function raizPrimeiroGrau(a,b)
{
    let x = (-b/a);///Lembrando polinômio na posição 5 = termo independente // posição 4 = X^1
    return x;
}   

function raizesSegundoGrau(a,b,c)
{
   let raizes = [];
   raizes[0] = (-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a);
   raizes[1] = (-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a);
   return raizes;
}

function raizesTerceiroGrau(a, b, c, d)
{
    let f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
    let raizes = [];

    f = parseFloat( ((3*parseFloat(c)/parseFloat(a)) - (Math.pow(parseFloat(b),2) / Math.pow(parseFloat(a),2)))/3);

    g = parseFloat( ( (2*Math.pow(parseFloat(b),3)/Math.pow(parseFloat(a),3)) - (9*parseFloat(b)*parseFloat(c)/Math.pow(parseFloat(a),2)) + (27*parseFloat(d)/parseFloat(a)) )/ 27 );
    
    h = parseFloat( (Math.pow(parseFloat(g),2)/4) + (Math.pow(parseFloat(f),3)/27) );

    if( (f==0) && (g==0) && (h==0) )
    {
        let x1 = Math.cbrt(d/a)*-1;
        let x2 = x1;
        let x3 = x2;
        raizes.push(x1,x2,x3);
        return raizes;

    }else if(h <= 0){ /// nesse caso, 3 raizes reais
      
        i = math.sqrt( (Math.pow(parseFloat(g) ,2)/4) - parseFloat(h));
       
        j = math.cbrt(parseFloat(i));           
      
        k = math.acos(-(parseFloat(g)/(2*parseFloat(i))));
        l = parseFloat(j) * -1;
        m = math.cos(parseFloat(k)/3);
        n = math.sqrt(3)*Math.sin(parseFloat(k)/3);
        p = (parseFloat(b)/(3*parseFloat(a)))*-1;
        let x1 = 2*parseFloat(j)*Math.cos(parseFloat(k)/3) - (parseFloat(b)/(3*parseFloat(a)));
        let x2 = parseFloat(l) * parseFloat(m+n) + parseFloat(p);
        let x3 = parseFloat(l)*parseFloat(m-n)+parseFloat(p);
        raizes.push(x1,x2,x3);   
        return raizes;

    }else if (h > 0){

        r = -(parseFloat(g)/2) + parseFloat(Math.sqrt(parseFloat(h))); // pertence cjo reais
        s = math.cbrt(parseFloat(r));
        t = -((parseFloat(g)/2)) - parseFloat(Math.sqrt(parseFloat(h)));
        u = math.cbrt(parseFloat(t));
        x1 = (parseFloat(s)+parseFloat(u)) - (parseFloat(b)/(3*parseFloat(a)));
      
        x2r =  (-(parseFloat(s) + parseFloat(u))/2 - (parseFloat(b)/(3*parseFloat(a))));
        x2i = parseFloat((parseFloat(s)-parseFloat(u))*Math.sqrt(3)/2);
        x3r =  (-(parseFloat(s) + parseFloat(u))/2 - (parseFloat(b)/(3*parseFloat(a))));
        x3i = -parseFloat((parseFloat(s)-parseFloat(u))*Math.sqrt(3)/2);
        let x2 = math.complex(x2r, x2i);
        let x3 = math.complex(x3r, x3i); 
        raizes.push(x1,x2,x3);
        return raizes;
    }
}


function raizesQuartoGrau(a, b, c, d, e)
{//Diário  de Bordo: 27-10-2018 : São 4:28 da manhã de sábado, estou indo dormir com um puta orgulho de ter desenvolvido algoritmos que encontram as raízes de polinômios de 3º e 4º graus! 
 //Quem disse que Eng. Civil não manja de números complexos!
    let f, g, h,i;
    let raizes4grau = [];
    
    
    b = parseFloat(b/a); // somente cjo dos reais
    c = parseFloat(c/a); // somente cjo dos reais
    d = parseFloat(d/a); // somente cjo dos reais
    e = parseFloat(e/a); // somente cjo dos reais
    a = parseFloat(a/a); // somente cjo dos reais
    
    f = parseFloat( c - (3*Math.pow(b,2)/8) ); // somente cjo dos reais

    g = parseFloat( d + (Math.pow(b,3) / 8) - (b*c/2) ) // // somente cjo dos reais

    h = parseFloat( e - ((3*Math.pow(b,4))/256) + (Math.pow(b, 2)*c/16) - ( b*d/4) ); // // somente cjo dos reais
    
    let a1, b1, c1, d1; // coeficientes para resolução da equação cubica

    a1 = 1; // somente cjo dos reais
    b1 = parseFloat(f/2);// somente cjo dos reais
    c1 = parseFloat(((Math.pow(f,2) -4*h)/16));// somente cjo dos reais
    d1 = parseFloat(-Math.pow(g,2)/64);// somente cjo dos reais
    


    let raizes = raizesTerceiroGrau(a1, b1, c1, d1);    
 
    if( (!isNaN(raizes[0])) && (!isNaN(raizes[1])) && (!isNaN(raizes[2])) )
    {// em caso de três raizes reais na equação cúbica...
        let raizesNaoNulas = [];

        for(let i=0; i<raizes.length; i++)
        {///para obter somente as raizes positiva..
            if(Math.abs(raizes[i]) > 1e-10)
            {
                raizesNaoNulas.push(raizes[i]);
            }
        }

            if( isNaN(math.sqrt(raizesNaoNulas[0])) )
            {// nesse caso temos um número complexo
                p = math.sqrt(raizesNaoNulas[0]);
            }else{
                //já nesse temos que criá-lo
                p = math.complex(Math.sqrt(raizesNaoNulas[0]), 0);
            }
           

            if(isNaN(math.sqrt(parseFloat(raizesNaoNulas[1]))))
            {   //nesse caso temos um número complexo
                q = math.sqrt(parseFloat(raizesNaoNulas[1]));
            }else{
                //já nesse temos que criá-lo
                q = math.complex(Math.sqrt(parseFloat(raizesNaoNulas[1]), 0))
            }


            let pq = math.multiply(p,q);
            let gc = math.complex(g, 0);
          
            r = math.multiply(math.multiply(gc,-1), math.multiply(8, pq).inverse());
            s = math.complex(b/(4*a),0);
            
        
            x1 = math.add(p,q,r,math.multiply(s,-1));
            x2 = math.add(p, math.multiply(q,-1), math.multiply(r,-1), math.multiply(s,-1)) ;
            x3 = math.add(q, math.multiply(p,-1), math.multiply(r,-1), math.multiply(s,-1)) ;
            x4 = math.add(math.multiply(q,-1), math.multiply(p,-1), r, math.multiply(s,-1)) ;
            raizes4grau.push(x1,x2,x3,x4);
            return raizes4grau;

    }else{
        let raizesComplexas = [];

        for(i=0; i<raizes.length; i++)
        {   
           
            if(isNaN(raizes[i]) )
            {  // certeza de estar somente com raizes complexas
                raizesComplexas.push(raizes[i])
            }

        }

        
            p = math.sqrt(raizesComplexas[0]); //

            q = math.sqrt(raizesComplexas[1]);

            let pq = math.multiply(p,q);

            let gc = math.complex(g, 0);

            s = math.complex(b/(4*a),0);

            r =  math.multiply(math.multiply(gc,-1), math.multiply(8, pq).inverse());

            x1 = math.add(p,q,r,math.multiply(s,-1));
            x2 = math.add(p, math.multiply(q,-1), math.multiply(r,-1), math.multiply(s,-1)) ;
            x3 = math.add(q, math.multiply(p,-1), math.multiply(r,-1), math.multiply(s,-1)) ;
            x4 = math.add(math.multiply(q,-1), math.multiply(p,-1), r, math.multiply(s,-1)) ;
            raizes4grau.push(x1,x2,x3,x4);
            return raizes4grau;
    }
}

function clone(obj)
{
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) 
    {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array)
    {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) 
    {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function equacaoEmTexto(polinomio)
{//Função que recebe os coeficientes de um polinômio modelados em um array e cria a string da equação
  let grau = 5;
  let equacao = '';
  let first = true;
  
  for(let i=0; i< polinomio.length;i++)
  {
    if(polinomio[i]  != 0)
    {//Se for zero, esse termo do polinômio não existe
      if(polinomio[i] > 0)
      {//precisamos concatenar o sinal de + para os números positivos
        if(first)
        {//se for o primeiro termo do polinômio e o número for positivo, não precisamos escrever o sinal de positivo
          if(grau > 1)
          {//se o grau for 1 ou zero, temos um tratamento diferente
              equacao += ((polinomio[i].toPrecision(4)).toString()+'x^'+grau);
              first = false;
          }else{
            if(grau != 0)
            {//se é diferente de zero, o expoente é 1, só escrever o X
              
              equacao += ((polinomio[i].toPrecision(4)).toString()+'x');
              first = false;

            }else{// x^0 = 1, não escrever nada

              equacao += (polinomio[i].toPrecision(4)).toString();
              first = false;
            }
          }
        }else{
          if(grau > 1)
          {
            equacao += ('+'+(polinomio[i].toPrecision(4)).toString()+'x^'+grau);
          }else{
            if(grau != 0)
            {
              equacao += ('+'+(polinomio[i].toPrecision(4)).toString()+'x');
              first = false;

            }else{

              equacao += ('+'+(polinomio[i].toPrecision(4)).toString());
              first = false;
            }
          }
        }    
      }else{
        if(grau > 1)
        {
          equacao += ((polinomio[i].toPrecision(4)).toString()+'x^'+grau);
          first = false;

        }else{
          if(grau != 0)
          {
              equacao += ((polinomio[i].toPrecision(4)).toString()+'x');
              first = false;

          }else{
              
                equacao += ((polinomio[i].toPrecision(4)).toString());
                first = false;  
          }
        } 
      }
    }
    grau--;
  }
  return equacao;
}

function integrarPolinomio(polinomio, constanteMultiplicadora,  constanteIntegracao)
{//Função que recebe os coeficientes que representam um polinômio e as condições de contorno necessária para realizar a integração
    let i = 0;
    let graus = [5,4,3,2,1,0]
    let grau = 0;
    while(polinomio[grau] == 0)
    {
        grau++;
    }
    if(grau != 6)
    {
        polinomio[grau-1] = polinomio[grau]/graus[grau-1]
        for(i=0; i< 6-grau; i++)
        {
            polinomio[grau+i] = polinomio[grau+i+1]/graus[grau+i];
        }
        polinomio = math.multiply(polinomio, constanteMultiplicadora);
    }
    polinomio[5] = constanteIntegracao;
    for(i=0; i<polinomio.length; i++)
    {// rotina que transforma os valores na ordem de grandeza 1e-10 em zeros
        if(Math.abs(polinomio[i]) < 1e-10)
        {
        polinomio[i] = 0;
        }  
    }
    return polinomio;
}

class No
{//Definição da classe Nó//
  constructor(inputNo, inputDesloc, inputCargaNodal)
  {
    this.id = null; 
    this.x = inputNo.x;
    this.y = inputNo.y;

    this.liberdadeX = inputNo.liberdadeX;
    this.liberdadeY = inputNo.liberdadeY;
    this.liberdadeZ = inputNo.liberdadeZ;
  
    this.indiceX = inputNo.indiceX;
    this.indiceY = inputNo.indiceY;
    this.indiceZ = inputNo.indiceZ;

    this.cargaNodal = [inputCargaNodal.fx, inputCargaNodal.fy, inputCargaNodal.mz ];
    this.deslocamentoNodal = [];
  
    if( (this.liberdadeX == true) && (this.liberdadeY == true) && (this.liberdadeZ == true) )
    {
      this.deslocamentoNodal = [null, null, null];

    }else if( ( (this.liberdadeX == false) && (this.liberdadeY == false) && (this.liberdadeZ == false) ) )
    {
      this.deslocamentoNodal = [inputDesloc.x, inputDesloc.y, inputDesloc.z];

    }else if( ( (this.liberdadeX == true) && (this.liberdadeY == true) && (this.liberdadeZ == false) ) )
    {
        this.deslocamentoNodal = [null, null, inputDesloc.z];
     
    }else if( ( (this.liberdadeX == true) && (this.liberdadeY == false) && (this.liberdadeZ == true) ) )
    {
      this.deslocamentoNodal = [null, inputDesloc.y, null];

    }else if( ( (this.liberdadeX == false) && (this.liberdadeY == true) && (this.liberdadeZ == true) ) )
    {
      this.deslocamentoNodal = [inputDesloc.x, null, null];

    }else if( ( (this.liberdadeX == true) && (this.liberdadeY == false) && (this.liberdadeZ == false) ) )
    {
      this.deslocamentoNodal = [null, inputDesloc.y, inputDesloc.z];

    }else if( ( (this.liberdadeX == false) && (this.liberdadeY == true) && (this.liberdadeZ == false) ) )
    {
      this.deslocamentoNodal = [inputDesloc.x, null, inputDesloc.z];

    }else if( ( (this.liberdadeX == false) && (this.liberdadeY == false) && (this.liberdadeZ == true) ) )
    {
      this.deslocamentoNodal = [inputDesloc.x, inputDesloc.y, null];
    } 
  }  
}

class Barra
{ //Definição da classe barra//
  constructor(noInicial, noFinal, secao, qi, qf, vinculos, id)
  { 
    let i = 0;
    let j = 0;
    this.esforcosInternos = null;
    this.id = id;
    this.vinculacoes = vinculos;
    this.noInicial = noInicial;
    this.noFinal = noFinal;

    
    this.EI = secao.E*secao.I;  
    this.EA = secao.E*secao.A;

    if(vinculos.ir)
    {/// para criar uma barra infinitamente rígida
        this.EI *= 1e10; 
        this.EA *= 1e10; 
    }else if(vinculos.ar){
        this.EA *= 1e10; 
    }

    this.L = Math.sqrt( Math.pow( (noFinal.x - noInicial.x), 2 ) + Math.pow( (noFinal.y - noInicial.y), 2 ) );
    this.lambdaX = (noFinal.x - noInicial.x)/this.L;
    this.lambdaY = (noFinal.y - noInicial.y)/this.L;
    this.polinomios = []; //pos[2] = equacao cortante
    this.equacoesCarregamentos = [];
    this.equacaoAxial = [];
    this.equacaoCortante = [];
    this.equacaoMomentoFletor = [];
    this.equacoesDeslocamentos = [];
    this.momentoMax = [];
    this.cortanteMax = [];
    this.axialMax = [];
    this.flexaMax = [];

    this.rotacao2D =[
                      [ this.lambdaX ,-this.lambdaY, 0 ],
                      [ this.lambdaY , this.lambdaX , 0 ],
                      [ 0, 0 , 1 ],
                    ]          
    if(qi[2])
    { // true = eixo global
      qi[2] = 1;
      qi = math.multiply(qi, this.rotacao2D);
      qf[2] = 1;
      qf = math.multiply(qf, this.rotacao2D);
    } 

    this.vxq = qf[0] - qi[0]; 
    this.vyq = qf[1] - qi[1];
  

    this.hi = ((this.L * this.vxq/6)+(this.L*qi[0]/2));
    this.vi = ((3*this.vyq*this.L/20)+(qi[1]*this.L/2));
    this.mi = (this.vyq*Math.pow(this.L,2)/30)+(qi[1]*Math.pow(this.L, 2)/12);
    this.hf = ((this.L * this.vxq/3)+(this.L*qi[0]/2));
    this.vf = ((7*this.vyq*this.L/20)+(qi[1]*this.L/2));
    this.mf = -( (this.vyq*Math.pow(this.L,2)/20)+(qi[1]*Math.pow(this.L, 2)/12))
    this.forcaLocal = [this.hi, this.vi, this.mi, this.hf, this.vf, this.mf];
  
    let a = -( (qf[0] - qi[0]) / this.L );
    let b = -qi[0];
    let polinomio = [0,0,0,0,a,b];

    this.polinomios.push (polinomio);//posicao [0] funcao carregamentos em X

    a = -( (qf[1] - qi[1]) / this.L );
    b = -qi[1]; 
    polinomio = [0,0,0,0,a,b];
    this.polinomios.push (polinomio);//posiccao[1] funcao carregamentos em y

    this.liberar = [];

    this.indice = [noInicial.indiceX, noInicial.indiceY,noInicial.indiceZ, noFinal.indiceX, noFinal.indiceY,noFinal.indiceZ];
    this.rigidezLocal = [
                              [ this.EA/this.L ,              0            ,            0             , -this.EA/this.L ,              0            ,          0               ],
                              [       0        , 12*this.EI/Math.pow(this.L,3)  ,  6*this.EI/Math.pow(this.L,2) ,        0        , -12*this.EI/Math.pow(this.L,3) ,  6*this.EI/Math.pow(this.L,2) ],
                              [       0        , 6*this.EI/Math.pow(this.L,2)   ,  4*this.EI/this.L        ,        0        , -6*this.EI/Math.pow(this.L,2)  ,  2*this.EI/this.L        ],
                              [-this.EA/this.L ,              0            ,            0             ,  this.EA/this.L ,               0           ,          0               ],
                              [       0        , -12*this.EI/Math.pow(this.L,3) , -6*this.EI/Math.pow(this.L,2) ,        0        ,  12*this.EI/Math.pow(this.L,3) , -6*this.EI/Math.pow(this.L,2) ],
                              [       0        , 6*this.EI/Math.pow(this.L,2)   ,  2*this.EI/this.L        ,        0        , -6*this.EI/Math.pow(this.L,2)  ,  4*this.EI/this.L        ]
                            ]
  
    this.matrizRotacao = [
                            [ this.lambdaX , this.lambdaY , 0 ,      0        ,       0      , 0 ],
                            [-this.lambdaY , this.lambdaX , 0 ,      0        ,       0      , 0 ],
                            [        0     ,       0      , 1 ,      0        ,       0      , 0 ],
                            [        0     ,       0      , 0 ,  this.lambdaX , this.lambdaY , 0 ],
                            [        0     ,       0      , 0 , -this.lambdaY , this.lambdaX , 0 ],
                            [        0     ,       0      , 0 ,      0        ,       0      , 1 ]
                         ]
    //COMEÇO DO ALGORITMO DE GUYA/SORIANO
    if((vinculos.ri == true && vinculos.rf == true))
    { 
      this.liberar = [2,5];

    }else if((vinculos.ri == false && vinculos.rf == false)) {

      this.liberar = [0,0];

    }else{
  
      if(vinculos.ri == true && vinculos.rf == false)
      {
        this.liberar = [2,0]; //rótula x engaste
      }else{
        this.liberar = [0,5]; //engaste x rótula
      }
    }
    
    if(this.liberar[0] ==2)
    {
      for(j=0; j<6; j++)
      {
        if(j != this.liberar[0])
        {
          let m = this.rigidezLocal[j][this.liberar[0]] / this.rigidezLocal[this.liberar[0]][this.liberar[0]] ;
          for(i=0; i<6; i++)
          {        
            this.rigidezLocal[j][i] = this.rigidezLocal[j][i] -m*this.rigidezLocal[this.liberar[0]][i]; 
          }
          this.forcaLocal[j] = this.forcaLocal[j] - m*this.forcaLocal[this.liberar[0]]; 
        }
      }
      
      for(i=0; i<6; i++)
      {
         this.rigidezLocal[this.liberar[0]][i] = 0;
      }
      this.rigidezLocal[this.liberar[0]][this.liberar[0]] =  1;
      this.forcaLocal[this.liberar[0]] = 0;
    }
  
    if(this.liberar[1] == 5)
    {
      for(j=0; j<6; j++)
      {
        if(j != this.liberar[1])
        {   
          let m = this.rigidezLocal[j][this.liberar[1]] / this.rigidezLocal[this.liberar[1]][this.liberar[1]] ;
          for(i=0; i<6; i++)
          {            
            this.rigidezLocal[j][i] = this.rigidezLocal[j][i] -m*this.rigidezLocal[this.liberar[1]][i]; 
          }
         this.forcaLocal[j] = this.forcaLocal[j] - m*this.forcaLocal[this.liberar[1]];
        }
      }
      
      for(i=0; i<6; i++)
      {
        this.rigidezLocal[this.liberar[1]][i] = 0;
      }
      this.rigidezLocal[this.liberar[1]][this.liberar[1]] = 1;
      this.forcaLocal[this.liberar[1]] = 0;
    }

    
   this.rigidezLocal = ( math.multiply( math.multiply(math.transpose(this.matrizRotacao), this.rigidezLocal), this.matrizRotacao)  );
   this.forcaLocal = math.multiply(this.forcaLocal, this.matrizRotacao);
  }   

  calcularEsforcoBarra(noInicial, noFinal, forcaLocal, rigidezLocal, matrizRotacao)      
  { 
    let forcaLocalResistente = math.multiply(forcaLocal, -1);
    let deslocamentosNodais = [noInicial.deslocamentoNodal[0],noInicial.deslocamentoNodal[1],noInicial.deslocamentoNodal[2],noFinal.deslocamentoNodal[0],noFinal.deslocamentoNodal[1],noFinal.deslocamentoNodal[2],];
    this.esforcosInternos = math.add(math.multiply(math.multiply(matrizRotacao, rigidezLocal), deslocamentosNodais ), math.multiply(matrizRotacao, forcaLocalResistente));
  }

  escalarEquacoes(equacao, escala)
  {// Função que cria um cópia da equação, aplica o fator de escala e retorna essa cópia escalada para plotagem dos diagramas// 8 = horizontal global  // 9 = vertical global 
    let polinomio = this.polinomios[equacao].slice(0);
    polinomio = math.multiply(polinomio, escala);
    return equacaoEmTexto(polinomio);

  }

  esforcosMaximos()
  {
    let funcaoCortante = math.parse(this.equacaoCortante);
    let funcaoMomento = math.parse(this.equacaoMomentoFletor);
    let funcaoAxial = math.parse(this.equacaoAxial);
    let derivadaPrimeira = null;
    let pontoDerivadaNula = null;
    let a, b, c;
   
    let candidato1 = {};
    let candidato2 = {};
    let candidato3 = {};
    let cortanteMax1 = {}
    let cortanteMax2 = {}
    let axialMax1 = {};
    let axialMax2 = {};
    let valor = 0;

    candidato1.x = null;
    candidato1.valor = null;
    candidato2.x = null;
    candidato2.valor = null;
    candidato3.x = null;
    candidato3.valor = null;

    axialMax1.x = 0;
    
    valor = funcaoAxial.eval({x:axialMax1.x})
    axialMax1.valor = isNaN(valor)? 0 : valor;
    axialMax2.x = this.L;
    valor = funcaoAxial.eval({x:axialMax2.x})
    axialMax2.valor = isNaN(valor)? 0 : valor

    if(axialMax1.valor > axialMax2.valor)
    {
        this.axialMax.push(axialMax1);

    }else if(axialMax1.valor == axialMax2.valor){

        this.axialMax.push(axialMax1);
        this.axialMax.push(axialMax2);

    }else{
        
        this.axialMax.push(axialMax2);
    }

    derivadaPrimeira = math.derivative(this.equacaoCortante, 'x').toString();
    let d2c =  math.derivative(derivadaPrimeira,'x');
           
    if(d2c.eval()) // Testamos a 2º derivada para saber o grau do polinômio que temos
    {   
        a = this.polinomios[2][3];
        b = this.polinomios[2][4];
        c = this.polinomios[2][5];
        let raizes = raizesSegundoGrau(a, b, c);
        ///derivada nula para momentos
       
        if( !isNaN(raizes[0]) && (!isNaN(raizes[1])) )
        {
            if( (parseFloat(raizes[0].toPrecision(5)) >= 0) && (parseFloat(raizes[0].toPrecision(5)) <= this.L) )
            {
                pontoDerivadaNula = raizes[0];

            }else  if( (parseFloat(raizes[1].toPrecision(5)) >= 0) && (parseFloat(raizes[1].toPrecision(5)) <= this.L) ) {
                 
                pontoDerivadaNula = raizes[1];

            }else{

                pontoDerivadaNula = null;
            }
        }else{
            if(!isNaN(raizes[0]) )
            {
                if( (parseFloat(raizes[0].toPrecision(5)) >= 0) && (parseFloat(raizes[0].toPrecision(5)) <= this.L) )
                {
                    pontoDerivadaNula = raizes[0];
                }else{
                    pontoDerivadaNula = null;
                }
              
            }else if(!isNaN(raizes[1]))
            {
                if( (parseFloat(raizes[1].toPrecision(5)) >= 0) && (parseFloat(raizes[1].toPrecision(5)) <= this.L) )
                {
                    pontoDerivadaNula = raizes[1];
                }else{
                    pontoDerivadaNula = null;
                }
            }
        }

      

    }else{

        a = this.polinomios[2][4];
        b = this.polinomios[2][5];
        let raiz = null
        raiz = raizPrimeiroGrau(a, b);

        if( (parseFloat(raiz.toPrecision(5)) >= 0) && (parseFloat(raiz.toPrecision(5)) <= this.L) ){
            pontoDerivadaNula = raiz;
        }else{
            pontoDerivadaNula = null;
        }
       
    }


            
    if( ( pontoDerivadaNula > this.L ) || ( pontoDerivadaNula < 0 ) )
    {
        pontoDerivadaNula = this.L;
    }
   
    cortanteMax1.x = 0;
    valor = funcaoCortante.eval({x:cortanteMax1.x});
    cortanteMax1.valor = isNaN(valor)? 0 : valor;

    cortanteMax2.x = this.L;
    valor = funcaoCortante.eval({x:cortanteMax2.x});
    cortanteMax2.valor = isNaN(valor)? 0 : valor;

    if( parseFloat(Math.abs(cortanteMax1.valor).toPrecision(5)) > parseFloat(Math.abs(cortanteMax2.valor).toPrecision(5)))
    {
        this.cortanteMax.push(cortanteMax1);
        
    }else if( parseFloat(Math.abs(cortanteMax1.valor).toPrecision(5)) == parseFloat(Math.abs(cortanteMax2.valor).toPrecision(5))){
        this.cortanteMax.push(cortanteMax1);
        this.cortanteMax.push(cortanteMax2);
    }else{
        this.cortanteMax.push(cortanteMax2);
    }
         
    if(  (this.vinculacoes.ri == false) &&  (this.vinculacoes.rf == false ) )
    {
        candidato1.x = pontoDerivadaNula;
        candidato2.x = 0;
        candidato3.x = this.L;
        //aqui temos que testar os 3 pontos em busca do máximo;

    }else if(  (this.vinculacoes.ri == false)  &&  (this.vinculacoes.rf == true  ) ) {
        candidato1.x = pontoDerivadaNula;
        candidato2.x = 0;
        candidato3.x = null;
    }else if(  (this.vinculacoes.ri == true)  &&  (this.vinculacoes.rf == false  ) ) {   
        candidato1.x = pontoDerivadaNula;
        candidato2.x = this.L;
        candidato3.x = null;

    }else if( (this.vinculacoes.ri == true ) && (this.vinculacoes.rf == true ) ){
        candidato1.x =  pontoDerivadaNula;
        candidato2.x = null;
        candidato3.x = null;
    }
    
    if(candidato1.x != null)
    {
        valor = funcaoMomento.eval({x:candidato1.x});
        candidato1.valor = isNaN(valor)? 0 : valor;
        
    }else{

        candidato1.valor = 0;
    }

    if(candidato2.x != null)
    {
        valor = funcaoMomento.eval({x:candidato2.x})
        candidato2.valor = isNaN(valor)? 0 : valor;

    }else{

        candidato2.valor = 0;
    }
    
    
    if(candidato3.x != null)
    {
        valor = funcaoMomento.eval({x:candidato3.x});
        candidato3.valor = isNaN(valor)? 0 : valor;

    }else{

        candidato3.valor = 0;
    }

   
    if( parseFloat(Math.abs(candidato1.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato2.valor).toPrecision(5)))
    {// candidato 1 não foi desclassificado de primeira...
        if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) == parseFloat(Math.abs(candidato2.valor).toPrecision(5)))
        {// temos um empate entre 1 e 2, mas eles são maiores do que 3?
            if( parseFloat(Math.abs(candidato1.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato3.valor).toPrecision(5)))
            {
                if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) == parseFloat(Math.abs(candidato3.valor).toPrecision(5)))
                {//triplo empate
                    this.momentoMax.push(candidato1);//MAX
                    this.momentoMax.push(candidato2);//MAX
                    this.momentoMax.push(candidato3);//MAX

                }else{
                    this.momentoMax.push(candidato1);//MAX
                    this.momentoMax.push(candidato2);//MAX
                    
                    if(  (parseFloat(Math.abs(candidato3.valor).toPrecision(5)) != 0 ) && (!isNaN(candidato3.x)) )
                    {
                        this.momentoMax.push(candidato3); // adicionado o ponto só para poder mapear todos pontos singulares
                    }
                    
                    
                }
              
            }else{
                //candidato 3 levou em cima dos 1 e 2
                this.momentoMax.push(candidato3);//MAX
                
                if( (parseFloat(Math.abs(candidato1.valor).toPrecision(5)) != 0  ) && (!isNaN(candidato1.x)) )
                {
                    this.momentoMax.push(candidato1); // adicionado o ponto só para poder mapear todos pontos singulares
                }
                if((parseFloat(Math.abs(candidato2.valor).toPrecision(5)) != 0 ) && (!isNaN(candidato2.x)) )
                {
                    this.momentoMax.push(candidato2); // adicionado o ponto só para poder mapear todos pontos singulares
                }
                
            }
        }else if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato3.valor).toPrecision(5))){//candidato 1 classificou sozinho pra final!

            if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) == parseFloat(Math.abs(candidato3.valor).toPrecision(5)))
            {//empate em 1 e 3
                this.momentoMax.push(candidato1); // max
                this.momentoMax.push(candidato3); // max
                
                if((parseFloat(Math.abs(candidato2.valor).toPrecision(5)) != 0 ) && (!isNaN(candidato2.x)) )
                {
                    this.momentoMax.push(candidato2); // adicionado o ponto só para poder mapear todos pontos singulares
                }
                

            }else{
                //candidato1 wins
                    this.momentoMax.push(candidato1);//max
                    
                    if((parseFloat(Math.abs(candidato2.valor).toPrecision(5)) != 0 ) && (!isNaN(candidato2.x)) )
                    {
                        this.momentoMax.push(candidato2); // adicionado o ponto só para poder mapear todos pontos singulares
                    }
                    if( (parseFloat(Math.abs(candidato3.valor).toPrecision(5)) != 0)   && (!isNaN(candidato3.x)) )
                    {
                        this.momentoMax.push(candidato3); // adicionado o ponto só para poder mapear todos pontos singulares
                    }
                    
            }
        }else{
                //candidato 3 levou em cima dos 1
            this.momentoMax.push(candidato3);//max
            
            if( (parseFloat(Math.abs(candidato1.valor).toPrecision(5)) != 0  ) && (!isNaN(candidato1.x)) )
            {
                this.momentoMax.push(candidato1); // adicionado o ponto só para poder mapear todos pontos singulares
            }
            if((parseFloat(Math.abs(candidato2.valor).toPrecision(5)) != 0 ) && (!isNaN(candidato2.x)) )
            {
                this.momentoMax.push(candidato2); // adicionado o ponto só para poder mapear todos pontos singulares
            }
            
        }
        
    }else if(parseFloat(Math.abs(candidato2.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato3.valor).toPrecision(5))){//candidato1 fora do jogo, seguimos verificações
        //candidato 2 wins
        if(parseFloat(Math.abs(candidato2.valor).toPrecision(5)) == parseFloat(Math.abs(candidato3.valor).toPrecision(5))){
            // empate entre 2 e 3
            this.momentoMax.push(candidato2);//max
            this.momentoMax.push(candidato3);//max
           
            if( (parseFloat(Math.abs(candidato1.valor).toPrecision(5)) != 0  ) && (!isNaN(candidato1.x)) )
            {
                
                this.momentoMax.push(candidato1); // adicionado o ponto só para poder mapear todos pontos singulares
            }
            
        }else{
            //candidato 2 leva sozinho
            this.momentoMax.push(candidato2); //max
            
            if( (parseFloat(Math.abs(candidato1.valor).toPrecision(5)) != 0  ) && (!isNaN(candidato1.x)) )
            {
                this.momentoMax.push(candidato1); // adicionado o ponto só para poder mapear todos pontos singulares
            }
            if( (parseFloat(Math.abs(candidato3.valor).toPrecision(5)) != 0)   && (!isNaN(candidato3.x)) )
            {
                this.momentoMax.push(candidato3); // adicionado o ponto só para poder mapear todos pontos singulares
            }
            
        }
    }else{
        //candidato 3 ganha!
        this.momentoMax.push(candidato3);//max
        
        if( (parseFloat(Math.abs(candidato1.valor).toPrecision(5)) != 0  ) && (!isNaN(candidato1.x)) )
        {
            this.momentoMax.push(candidato1); // adicionado o ponto só para poder mapear todos pontos singulares
        }
        if((parseFloat(Math.abs(candidato2.valor).toPrecision(5)) != 0 ) && (!isNaN(candidato2.x)) )
        {
            this.momentoMax.push(candidato2); // adicionado o ponto só para poder mapear todos pontos singulares
        }
        
    }     

    
  }

  flechaMaxima()
  {
    // pol[4] = rotação --- pol[5] = verticais
    if(parseFloat(Math.abs(this.axialMax[0].valor)) > 1e-4)
    {// se tem esforço axial, não é viga, é barra de pórtico!
        this.flexaMax.push(null);
        return;
    }

    if(parseFloat(Math.abs(this.momentoMax[0].valor)) == 0)
    {//barra com momento com um "zero bem redondo" é uma barra de treliça   
        this.flexaMax.push(null);
        return;
    }
  
    let funcaoFlexa = math.parse(this.equacoesDeslocamentos[1]);
    if(isNaN(funcaoFlexa.eval({x:0})) )
    { // barra sem deformação em y
        this.flexaMax.push(null);
        return
    }

    let raizes = [];
    let a, b, c, d,e;
    let valor = 0;
    let candidato1 = {x:null, valor:null}; /// candidato1 será o par x  - valor do ponto de derivada nula.
    let candidato2 = {x:null, valor:null};
    let candidato3 = {x:null, valor:null};

   

    if(this.polinomios[1][4] != 0) // Testando para verificar o grau do carregamento
    {//Se verdadeiro, aqui temos um caregamento do 1 grau e teremos possíveis 3 candidatos para verificar posteriormente   
        let raizesReais = [];
        
        a = this.polinomios[4][1];
        b = this.polinomios[4][2];
        c = this.polinomios[4][3];
        d = this.polinomios[4][4];
        e = this.polinomios[4][5];

        raizes = raizesQuartoGrau(a,b,c,d,e); // atenção que aqui temos retorno no formato de números imaginários
        
        for(i=0; i<raizes.length; i++)
        {
          if(Math.abs(raizes[i].im) < 1e-7 )
          {//descartando os números dos pais das maravilhas (Imagiários)
            if(Math.abs(raizes[i].re) > 1e-7 )
            {// Descartando os zeros
                
                if( (parseFloat((raizes[i].re.toPrecision(5))) >= 0) && (parseFloat((raizes[i].re.toPrecision(5))) <= this.L) ) 
                {//pegando raizes dentro do intervalo da barra
                    raizesReais.push(raizes[i].re);
                }
            }
          }
        }
      
        valor = 0
        candidato1.valor = 0;
        for(i=0; i<raizesReais.length; i++)
        {   
            if(!isNaN(raizesReais[i]))
            {
                valor = funcaoFlexa.eval({x:raizesReais[i]});
                if(!isNaN(valor))
                {
                    if( Math.abs(parseFloat(valor.toPrecision(5))) > Math.abs(parseFloat(candidato1.valor.toPrecision(5)) ) )
                    {   
                        candidato1.x  = raizesReais[i];    
                        candidato1.valor = valor;
                    }
                }
            }
        }     
            // aqui teremos que verificar qual das raizes gera a maior flexa
    }else if(this.polinomios[1][5] != 0){ // carregamento carregamento Q constante
       
        a = this.polinomios[4][2];
        b = this.polinomios[4][3]
        c = this.polinomios[4][4]
        d = this.polinomios[4][5]
        raizes = raizesTerceiroGrau(a,b,c,d); // aqui temos de retorno as raizes reais e as imaginários no mesmo vetor
        

        valor = 0
        candidato1.valor = 0;
        for(i=0; i<raizes.length; i++)
        {
            if(!isNaN(raizes[i]))
            {/// eleminado as raizes imaginários
               
                if(Math.abs(raizes[i]) > 1e-7 )
                {// Descartando os zeros

                 
                    if( (parseFloat(raizes[i].toPrecision(5)) >= 0) && ( parseFloat(raizes[i].toPrecision(5)) <= this.L ) )
                    {//verificando se está dentro do intervalo
                    
                        valor = funcaoFlexa.eval({x:raizes[i]});
                     
                        if(!isNaN(valor))
                        {
                            if( Math.abs(parseFloat(valor.toPrecision(5))) > Math.abs(parseFloat(candidato1.valor.toPrecision(5))) )
                            {   
                                candidato1.x  = raizes[i];    
                                candidato1.valor = valor;
                            }
                        } 
                    }
                }
            }
        }

        
       
    }else if(this.polinomios[2][5] != 0){
      
        a = this.polinomios[4][3];
        b = this.polinomios[4][4]
        c = this.polinomios[4][5]
        raizes = raizesSegundoGrau(a,b,c)
        
      

        valor = 0
        candidato1.valor = 0;
        if(!isNaN(raizes[0])&&(!isNaN(raizes[1])))
        {//eliminado a possibilidade de ambas raizes imagináris
            for(i=0; i<raizes.length; i++)
            {
                if(!isNaN(raizes[i]))
                {   
                    if( (parseFloat(raizes[i].toPrecision(5)) >= 0) && ( parseFloat(raizes[i].toPrecision(5)) <= this.L ) )
                    {//verificando se está dentro do intervalo
                        valor = funcaoFlexa.eval({x:raizes[i]});
                        if(!isNaN(valor))
                        {   
                            if( Math.abs(parseFloat(valor.toPrecision(5))) > Math.abs(parseFloat(candidato1.valor.toPrecision(5))) )
                            {   
                                candidato1.x  = raizes[i];    
                                candidato1.valor = valor;
                            }
                        } 
                    }
                }
            }
        }
   
    }else if(this.polinomios[3][5] != 0){
        a = this.polinomios[4][4];
        b = this.polinomios[4][5];
        let raiz = raizPrimeiroGrau(a,b);
       
        if( (parseFloat(raiz.toPrecision(5)) >= 0) && (parseFloat(raiz.toPrecision(5)) <= this.L) )
        {//verificando se está dentro do intervalo
            candidato1.x  = raiz;  
            candidato1.valor = funcaoFlexa.eval({x:raiz});
        }

           
    }

    

    candidato2.x = 0;
    valor = funcaoFlexa.eval({x:candidato2.x})
    candidato2.valor = isNaN(valor)? null : valor;
    
    candidato3.x = this.L;
    valor = funcaoFlexa.eval({x:candidato3.x})
    candidato3.valor = isNaN(valor)? null : valor;
 
    if( parseFloat(Math.abs(candidato1.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato2.valor).toPrecision(5)))
    {// candidato 1 não foi desclassificado de primeira...
        if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) == parseFloat(Math.abs(candidato2.valor).toPrecision(5)))
        {// temos um empate entre 1 e 2, mas eles são maiores do que 3?
            if( parseFloat(Math.abs(candidato1.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato3.valor).toPrecision(5)))
            {
                if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) == parseFloat(Math.abs(candidato3.valor).toPrecision(5)))
                {//triplo empate
                    this.flexaMax.push(candidato1);//MAX
                    this.flexaMax.push(candidato2);//MAX
                    this.flexaMax.push(candidato3);//MAX

                }else{
                    this.flexaMax.push(candidato1);//MAX
                    this.flexaMax.push(candidato2);//MAX
    
                }
              
            }else{
                //candidato 3 levou em cima dos 1 e 2
                this.flexaMax.push(candidato3);//MAX  
            }
        }else if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato3.valor).toPrecision(5))){//candidato 1 classificou sozinho pra final!

            if(parseFloat(Math.abs(candidato1.valor).toPrecision(5)) == parseFloat(Math.abs(candidato3.valor).toPrecision(5)))
            {//empate em 1 e 3
                this.flexaMax.push(candidato1); // max
                this.flexaMax.push(candidato3); // max
                
            }else{
                //candidato1 wins
                    this.flexaMax.push(candidato1);//max
            }
        }else{
                //candidato 3 levou em cima dos 1
            this.flexaMax.push(candidato3);//max
        }
        
    }else if(parseFloat(Math.abs(candidato2.valor).toPrecision(5)) >= parseFloat(Math.abs(candidato3.valor).toPrecision(5))){//candidato1 fora do jogo, seguimos verificações
        //candidato 2 wins
        if(parseFloat(Math.abs(candidato2.valor).toPrecision(5)) == parseFloat(Math.abs(candidato3.valor).toPrecision(5))){
            // empate entre 2 e 3
            this.flexaMax.push(candidato2);//max
            this.flexaMax.push(candidato3);//max
        }else{
            //candidato 2 leva sozinho
            this.flexaMax.push(candidato2); //max  
        }
    }else{
        //candidato 3 ganha!
        this.flexaMax.push(candidato3);//max

    }
        
    
    
   
   
  }

}

class Estrutura2D
{ //Definição da classe principal Estrutura 2D que possui Nós e Barras definidas anteriormente
    constructor(inputBarras, secao, qi, qf, vinculos )
    {
        this.nos = [];
        this.barras = [];
        this.rigidezGlobal = [];
        this.totalDeslocamentos = null;
        this.vetorDeslocamentos = null;
        this.vetorCargas = null;
        this.matrizK11 = null;
        this.matrizK12 = null;
        this.matrizK21 = null;
        this.matrizK22 = null;
        this.vetorFk = null;
        this.vetorFu = null;
        this.vetorDk = null;
        this.vetorDu = null;
        this.esforcosMaximosGlobais = [];
    }

    obterNos(entradaNos,inputDesloc, inputCargas)
    { //Recebe os nós vindos da interface, identifica os graus de liberdade e cria instancias dos objetos Nó//
        let i = 0;
        this.indiceGL = 0;
        for(i=0; i<entradaNos.length; i++)
        {///Rotina de ordenação dos graus de liberdade///
        if( entradaNos[i].liberdadeX == true )
        {
            entradaNos[i].indiceX = this.indiceGL++;
        }

        if( entradaNos[i].liberdadeY == true ) 
        {   
            entradaNos[i].indiceY = this.indiceGL++;
        }

        if( entradaNos[i].liberdadeZ == true)
        {
            entradaNos[i].indiceZ = this.indiceGL++;
        }
        }
        for(i=0; i<entradaNos.length; i++)
        {
        if( entradaNos[i].liberdadeX == false )
        {
            entradaNos[i].indiceX = this.indiceGL++;
        }

        if( entradaNos[i].liberdadeY == false ) 
        {   
            entradaNos[i].indiceY = this.indiceGL++;
        }
        if( entradaNos[i].liberdadeZ == false)
        {
            entradaNos[i].indiceZ = this.indiceGL++;
        }
        }
        for(i=0; i<entradaNos.length; i++)
        {
           this.nos[i] = new No(entradaNos[i], inputDesloc[i], inputCargas[i]);
           this.nos[i].id = i;
        }
    }
 
    obterBarras(inputBarras, secao, qi, qf, vinculos)
    {//São geradas a partir dos objetos nós instanciados anteriormente e das incidências das inseridas na interface gráfica//
        for(let i=0; i<inputBarras.length; i++)
        {  
           this.barras[i] = new Barra(this.nos[inputBarras[i].noInicial], this.nos[inputBarras[i].noFinal], secao[i], qi[i], qf[i], vinculos[i], i);
        }
    }

    gerarMatrizGlobal()
    {//método que cria a matriz de rigidez global a partir do espalhamento das matrizes locais//
        let i = 0
        let j = 0;
        let k = 0;
        for(i=0; i<(this.nos.length*3); i++)
        {//rotina para criar uma matriz com zeros
            this.rigidezGlobal[i] = [];
            for(j=0; j<(this.nos.length*3); j++)
            {
                this.rigidezGlobal[i][j] = 0;
            }
        }
        for(k=0; k<this.barras.length; k++)
        {//percorre todas as matrizes de rigidez local que foram criados nas instãncias dos objetos barras//
            for(let linha=0; linha<(this.nos.length*3); linha++)
            {
                for(let coluna=0; coluna<(this.nos.length*3); coluna++)
                {
                    for(i=0; i<6; i++)
                    {
                        if(this.barras[k].indice[i] == linha)
                        {
                            for(j=0; j<6; j++)
                            {
                                if(this.barras[k].indice[j] == coluna)
                                {
                                this.rigidezGlobal[linha][coluna] +=  this.barras[k].rigidezLocal[i][j];
                                }
                            }   
                        }
                    }
                }
            }
        }  
     }

    totalDeslocamentosLivres(nos)
    {//Método que percorre todos as instâncias dos objetos nós e calcula o número total de deslocamentos livres possíveis na estrutura//
        let totalDeslocamentos = 0;
        for(let i=0; i<nos.length; i++)
        {
            if((nos[i].liberdadeX == true) && (nos[i].liberdadeY == true)&&(nos[i].liberdadeZ == true))
            {
                totalDeslocamentos +=3;
            }else if( (nos[i].liberdadeX == true)  && (nos[i].liberdadeY == true)  && (nos[i].liberdadeZ == false) || 
                      (nos[i].liberdadeX == true)  && (nos[i].liberdadeY == false) && (nos[i].liberdadeZ == true)  ||
                      (nos[i].liberdadeX == false) && (nos[i].liberdadeY == true)  && (nos[i].liberdadeZ == true)   ){

                totalDeslocamentos +=2;

            }else if( (nos[i].liberdadeX == true)  && (nos[i].liberdadeY == false) && (nos[i].liberdadeZ == false) ||
                      (nos[i].liberdadeX == false) && (nos[i].liberdadeY == true)  && (nos[i].liberdadeZ == false) ||
                      (nos[i].liberdadeX == false) && (nos[i].liberdadeY == false) && (nos[i].liberdadeZ == true)     ){

                totalDeslocamentos ++;
            }
        }
        return totalDeslocamentos;
    }

    gerarVetorDeslocamentos(nos, totalDeslocamentos,)
    {//Gera o vetor global de deslocamentos da estrutura a partir das informações obtidas em cada objeto nó//
        let deslocamentos = [];
        let pos = 0;
        while( pos < (nos.length*3))
        {
            for(let i=0; i<nos.length; i++)
            {
                if( nos[i].indiceX == pos)
                { 
                    deslocamentos[pos] = nos[i].deslocamentoNodal[0]; 
                    pos++;
                }
                if(nos[i].indiceY == pos)
                {
                    deslocamentos[pos] = nos[i].deslocamentoNodal[1];
                    pos++;
                }
                if(nos[i].indiceZ == pos)
                {
                    deslocamentos[pos] = nos[i].deslocamentoNodal[2];
                    pos++;
                }
            }
        }   
     return deslocamentos;
    }

    vetorCarregamentos(nos, barras)
    {//Gera o vetor global de cargas da estrutura a partir das informações obtidas em cada objeto nó//
        let carregamentos = [];
        let pos = 0;
        while( pos < (nos.length*3))
        {
            for(let i=0; i<nos.length; i++)
            {
                if( nos[i].indiceX == pos)
                { 
                    carregamentos[pos] = nos[i].cargaNodal[0]; 
                    pos++;
                }
                if(nos[i].indiceY == pos)
                {
                    carregamentos[pos] = nos[i].cargaNodal[1];
                    pos++;
                }
                if(nos[i].indiceZ == pos)
                {
                    carregamentos[pos] = nos[i].cargaNodal[2];
                    pos++;
                }
            }  
        }
        pos = 0;

        for(let k=0; k<this.barras.length; k++)
        {//percorre todas as matrizes de rigidez local que foram criados nas instãncias dos objetos barras//
            for(pos = 0; pos<(this.nos.length*3); pos++)
            {
                for(let i=0; i<6; i++)
                {
                    if(this.barras[k].indice[i] == pos)
                    {
                       carregamentos[pos] += barras[k].forcaLocal[i]; //FAZER A PORRA DO ESPALHAMENTO DE FORCA GLOBAL
                    }
                } 
            }
        }
        return carregamentos;
    }

    distribuirDeslocamentos(nos, vetorDeslocamentos)
    {//Método que atribui em cada nós os valores de deslocamento calculado a partir da matriz global da estrutura//
        for(let pos=0; pos<vetorDeslocamentos.length; pos++)
        {
            for(let i=0; i<nos.length; i++)
            {
                if(nos[i].indiceX == pos)
                {
                    nos[i].deslocamentoNodal[0]= vetorDeslocamentos[pos];
                }
                if(nos[i].indiceY == pos)
                {
                    nos[i].deslocamentoNodal[1]= vetorDeslocamentos[pos];
                }
                if(nos[i].indiceZ == pos)
                {
                    nos[i].deslocamentoNodal[2]= vetorDeslocamentos[pos];
                }
            }
        }
    }

    resolverEstrutura()
    {   
        
        let i = 0
        this.totalDeslocamentos = this.totalDeslocamentosLivres(this.nos);
        this.vetorDeslocamentos = this.gerarVetorDeslocamentos(this.nos, this.totalDeslocamentos);
    
        this.vetorCargas = this.vetorCarregamentos(this.nos, this.barras);

        if(this.totalDeslocamentos)
        {
            this.matrizK11 = math.resize(this.rigidezGlobal, [this.totalDeslocamentos, this.totalDeslocamentos]);
            this.matrizK12 = math.subset(this.rigidezGlobal, math.index(math.range(0, this.totalDeslocamentos), math.range(this.totalDeslocamentos, this.rigidezGlobal.length)));
            this.matrizK21 = math.subset(this.rigidezGlobal, math.index(math.range(this.totalDeslocamentos, this.rigidezGlobal.length), math.range(0, this.totalDeslocamentos)));
            this.matrizK22 = math.subset(this.rigidezGlobal, math.index(math.range(this.totalDeslocamentos, this.rigidezGlobal.length), math.range(this.totalDeslocamentos, this.rigidezGlobal.length)));
            this.vetorFk = math.resize(this.vetorCargas, [this.totalDeslocamentos]);
            this.vetorFu = math.subset(this.vetorCargas, math.index(math.range(this.totalDeslocamentos, this.vetorDeslocamentos.length)));
            this.vetorDk = math.subset(this.vetorDeslocamentos, math.index(math.range(this.totalDeslocamentos, this.vetorDeslocamentos.length)));
            this.vetorDu = math.multiply( math.add(this.vetorFk,  math.multiply(math.multiply(this.matrizK12, this.vetorDk),-1)), math.inv(this.matrizK11) );
           
            for(i=0; i<this.totalDeslocamentos; i++)
            {
            this.vetorDeslocamentos[i] = this.vetorDu[i];
            }

            let calculoReacoes = math.add(math.multiply(this.matrizK21,this.vetorDu ), math.multiply(this.matrizK22,this.vetorDk));
            for(i=0; i<this.vetorFu.length; i++){
            this.vetorFu[i]  = calculoReacoes[i] - this.vetorFu[i]; 
            }

        }else{
            this.matrizK22 = this.rigidezGlobal;
            this.vetorFu = this.vetorCargas;
            this.vetorDk =this.vetorDeslocamentos;
            let calculoReacoes = math.multiply(this.matrizK22, this.vetorDk);
            for(i=0; i<this.vetorFu.length; i++)
            {
                this.vetorFu[i]  = calculoReacoes[i] - this.vetorFu[i]; 
            }
        }
        this.distribuirDeslocamentos(this.nos, this.vetorDeslocamentos );
        for(i=0; i< this.barras.length; i++)
        {
          this.barras[i].calcularEsforcoBarra(this.barras[i].noInicial, this.barras[i].noFinal, this.barras[i].forcaLocal, this.barras[i].rigidezLocal, this.barras[i].matrizRotacao);
       
        }   
    
        this.gerarEquacoes();
         
        
        for(i=0; i< this.barras.length; i++)
        {//ainda em testes
            this.barras[i].esforcosMaximos();
        }
        
        
        
        for(i=0; i< this.barras.length; i++)
        {//ainda em testes
            this.barras[i].flechaMaxima();
        }
        

        this.obterEsforcosMaximosGlobais();
         
    }
    gerarEquacoes()
    {
        for(let i=0; i<this.barras.length; i++)
        { 
            let contorno = 0;
            let deslocamentoLocalBarra = math.multiply(  [this.barras[i].noInicial.deslocamentoNodal[0], this.barras[i].noInicial.deslocamentoNodal[1], 1], this.barras[i].rotacao2D);
            let deslocamentoLocalBarraFinal = math.multiply( [this.barras[i].noFinal.deslocamentoNodal[0], this.barras[i].noFinal.deslocamentoNodal[1], 1], this.barras[i].rotacao2D );
            
            this.barras[i].equacoesCarregamentos[0] = equacaoEmTexto(this.barras[i].polinomios[0]);  //Função do Carregamento no x local da barra
            this.barras[i].equacoesCarregamentos[1] = equacaoEmTexto(this.barras[i].polinomios[1]); //Função carregamento no y local da barra
            
            ///////////////////////EQUAÇÃO DOS ESFORÇOS CORTANTE//////////////////////////////////////
            let integrar = this.barras[i].polinomios[1].slice(0);
            this.barras[i].polinomios[2] =  integrarPolinomio(integrar, -1, this.barras[i].esforcosInternos[1]);
            this.barras[i].equacaoCortante = equacaoEmTexto(this.barras[i].polinomios[2]);
            /////////////////////////////////////////////////////////////////////////////////////

            ////////////////////////EQUAÇÃO DE MOMENTOS FLETORES/////////////////////////
            integrar = this.barras[i].polinomios[2].slice(0);
            contorno =  -this.barras[i].esforcosInternos[2];
            if( this.barras[i].vinculacoes.ri == true) 
            {
                contorno = 0;
            }
            this.barras[i].polinomios[3] =  integrarPolinomio(integrar, 1,  contorno ); 
            this.barras[i].equacaoMomentoFletor = equacaoEmTexto(this.barras[i].polinomios[3]);
            ///////////////////////////////////////////////////////////////////////

            integrar = this.barras[i].polinomios[3].slice(0);

            if( (this.barras[i].noInicial.liberdadeZ == false) && (this.barras[i].vinculacoes.ri == false) ) 
            {
                this.barras[i].polinomios[4] =  integrarPolinomio(integrar, 1/this.barras[i].EI, this.barras[i].noInicial.deslocamentoNodal[2]) ;   
                this.barras[i].equacoesDeslocamentos[0] = equacaoEmTexto(this.barras[i].polinomios[4]) ;

            }else if( (this.barras[i].noInicial.liberdadeZ == true) ||(this.barras[i].vinculacoes.ri == true) ){
                integrar = this.barras[i].polinomios[3].slice(0); 
                
                
                let integracao = integrarPolinomio(integrar,  1/this.barras[i].EI, 0);
            
                integracao = integrarPolinomio(integracao, 1, 0);
                

                let c =(1/this.barras[i].L*((deslocamentoLocalBarraFinal[1] - deslocamentoLocalBarra[1])-(integracao[0]*math.pow(this.barras[i].L, 5)+integracao[1]*math.pow(this.barras[i].L,4)+integracao[2]*math.pow(this.barras[i].L,3)+integracao[3]*math.pow(this.barras[i].L,2)+integracao[4]*math.pow(this.barras[i].L,1)+integracao[5]*math.pow(this.barras[i].L,0))));
                
                this.barras[i].noInicial.deslocamentoNodal[2] = c;

                integrar = this.barras[i].polinomios[3].slice(0); 
                this.barras[i].polinomios[4] =  integrarPolinomio(integrar, 1/this.barras[i].EI, this.barras[i].noInicial.deslocamentoNodal[2]) ;
                this.barras[i].equacoesDeslocamentos[0] = equacaoEmTexto(this.barras[i].polinomios[4]) ;//rotações
            
            }
          
            integrar =  this.barras[i].polinomios[4].slice(0);
            this.barras[i].polinomios[5] = integrarPolinomio(integrar,  1, deslocamentoLocalBarra[1]); // equaçãodeslocamentos verticais
            this.barras[i].equacoesDeslocamentos[1] = equacaoEmTexto(this.barras[i].polinomios[5]);

            ///////////////////////////////////////EQUAÇÃO AXIAL/////////////////////
            integrar = this.barras[i].polinomios[0].slice(0);
            this.barras[i].polinomios[6] =  integrarPolinomio(integrar, 1, -this.barras[i].esforcosInternos[0]);  //polinomio 6 = axial
            this.barras[i].equacaoAxial = equacaoEmTexto(this.barras[i].polinomios[6]);

            /////////////////////EQUAÇÃO DESLOCAMENTOS HORIZONTAIS//////////
            integrar = this.barras[i].polinomios[6].slice(0);
            this.barras[i].polinomios[7] =  integrarPolinomio(integrar, 1/this.barras[i].EA, deslocamentoLocalBarra[0]); // polinomio 6  = horizontal local
            this.barras[i].equacoesDeslocamentos[2] = equacaoEmTexto(this.barras[i].polinomios[7]);

            let aux = this.barras[i].polinomios[7].slice(0);
            let DX = math.multiply(aux, this.barras[i].lambdaX);
            aux =  this.barras[i].polinomios[5].slice(0);
            let DY = math.multiply(aux, this.barras[i].lambdaY);
            let polSoma1 = [];
            let polSoma2 = [];
            let k =0;
            for(k=0; k<6; k++){
                polSoma1[k] = DX[k]-DY[k];
            }
            this.barras[i].polinomios[8] = polSoma1;
            this.barras[i].equacoesDeslocamentos[3] = equacaoEmTexto(polSoma1); // horizontal global

            aux = this.barras[i].polinomios[7].slice(0);
            DX = math.multiply(aux, this.barras[i].lambdaY);
            aux =  this.barras[i].polinomios[5].slice(0);
            DY = math.multiply(aux, this.barras[i].lambdaX);
            for(k=0; k<6; k++){
                polSoma2[k] = DX[k]+DY[k];
            }
            this.barras[i].polinomios[9] = polSoma2;
            this.barras[i].equacoesDeslocamentos[4] = equacaoEmTexto(polSoma2); // vertical global;
        }
        
    }

        obterEsforcosMaximosGlobais()
        {
            let i = 0;
            let maximoCortante = [];
            let maximoMomento = [];
            let maximoAxial = [];
            let maximaFlexa = [];

            maximoCortante = this.barras[0].cortanteMax[0];
            maximoCortante.id =  this.barras[0].id;
            maximoMomento = this.barras[0].momentoMax[0];
            maximoMomento.id = this.barras[0].id;
            maximoAxial = this.barras[0].axialMax[0];
            maximoAxial.id = this.barras[0].id;
            
            if(this.barras[0].flexaMax[0]){
                maximaFlexa = this.barras[0].flexaMax[0];
                maximaFlexa.id = this.barras[0].id;
            }
          

            for(i=1; i<this.barras.length; i++)
            {   
                if( Math.abs(this.barras[i].cortanteMax[0].valor) >  Math.abs(maximoCortante.valor) )
                {
                    maximoCortante = this.barras[i].cortanteMax[0]
                    maximoCortante.id =  this.barras[i].id;
                   
                }

                if( Math.abs(this.barras[i].momentoMax[0].valor) >  Math.abs(maximoMomento.valor))
                {
                    maximoMomento = this.barras[i].momentoMax[0]
                    maximoMomento.id = this.barras[i].id;
                }
                
                if(this.barras[i].flexaMax[0])
                {
                    if( Math.abs(this.barras[i].flexaMax[0].valor) >  Math.abs(maximaFlexa.valor))
                    {
                        maximaFlexa = this.barras[i].flexaMax[0];
                        maximaFlexa.id = this.barras[i].id;
                    }
                }
             
                if( Math.abs(this.barras[i].axialMax[0].valor) >  Math.abs(maximoAxial.valor) )
                {   
                    maximoAxial = this.barras[i].axialMax[0];
                    maximoAxial.id = this.barras[i].id;
                }   
            }
            this.esforcosMaximosGlobais.push(maximoCortante);
            this.esforcosMaximosGlobais.push(maximoMomento);
            this.esforcosMaximosGlobais.push(maximoAxial);
            if(this.barras[0].flexaMax[0])
            {
                this.esforcosMaximosGlobais.push(maximaFlexa);
            }
           
        }
}


