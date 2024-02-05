<template>
  <section id="contratoinit">
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12" id="menu">
            <a href="/"> <img src="../assets/images/logo-white.png"/></a>
            <a href="https://wa.me/5511932887956?text=Estou%20com%20problemas%20no%20meu%20contrato" target="_blank">Ocorreu algum problema?</a>
          </div>
        </div>
      </div>
    </div>


    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div>
            <h1>{{this.firstname}} AQUI ESTA SEU CONTRATO!</h1>
            <p>Leia com atenção e então clique em prosseguir quando estiver pronto para tornar tudo em realidade</p>
            <a :href="this.projeto.linkonline" class="next-btn" id="contract-btn" target="_blank">ABRIR CONTRATO</a>
            <a :href="this.next" class="next-btn">PROSSEGUIR</a>
          </div>
        </div>

        <div class="col-md-6">
          <div class="contrato">
            
            <div class="center">CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE DESENVOLVEDOR WEB SITES/APPS</div><br/><br/>

            <span class="bold">IDENTIFICAÇÃO DAS PARTES CONTRATANTES:</span><br/><br/>

            <span class="bold">CONTRATANTE:</span> XXXXXXXXXXXXX, brasileiro(a), profissão XXXXXXX, Carteira de Identidade nº XXXXXXX, C.P.F. nº XXXXXXXXX, residente e domiciliado na Rua XXXXXXXXXXXXXX, Cep XXXXXXX, Cidade XXXXXXX/XX.<br/><br/>

            <span class="bold">CONTRATADO:</span> Felipe Martins Duarte, brasileiro(a), profissão Desenvolvimento de Projetos, Carteira de Identidade nº 3981601, C.P.F. nº 55212039827, residente e domiciliado na Rua Serra de Bragança, Cep 09855-270, Cidade São Bernardo do Campo.<br/><br/>

            <span class="bold italy">As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços de Desenvolvimento de site/APPs, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente.</span><br/><br/>

            <div class="center">DO OBJETO DO CONTRATO</div><br/>

            <span class="bold">Cláusula 1ª.</span> O presente contrato tem como OBJETO a prestação, pela <span class="bold">CONTRATADA</span> ao <span class="bold">CONTRATANTE</span>, dos serviços de desenvolvimento do site {{this.projeto.domain}}, consistindo nos serviços listados abaixo:
            <br/><span class="bold">Produto/Serviço:</span> {{this.projeto.productservice}}
            <br/><span class="bold">Funcionalidades:</span> {{this.projeto.functionalities}}
            <br/><span class="bold">Objetivos:</span> {{this.projeto.objectives}}
            <br/><span class="bold">Plataforma/Modulos:</span>{{this.projeto.plataformmodule}}<br/><br/>

            <span class="bold">Cláusula 2ª.</span> O contrato de prestação de serviço iniciará a partir da entrega dos matérias solicitados pelo CONTRATANTE, por parte do CONTRATATO, e terá o prazo de {{this.projeto.estimatedtime}} dias
            <br/><br/>
           <span class="bold"> Cláusula 3ª.</span> Trabalhos adicionais serão objeto de nova proposta comercial. O cumprimento dos prazos se dá sobre o projeto inicial, sendo que qualquer mudança de quantidade, variações e afins podem alterar os valores e prazos, e deverão ser renegociados.
            <br/><br/>
            <span class="bold">Cláusula 4ª.</span> O produto final será de propriedade do CONTRATANTE, sendo este responsável e autor da ideia principal, tendo autonomia total e exclusiva sobre o código fonte.
            <br/><br/>
            <span class="bold">Cláusula 5ª.</span> O crédito autoral sobre os trabalhos, objeto deste contrato deve ser sempre indicado conforme a lei nº 9.610/98. Reservando assim o direito do autor em usar o serviço como exposição para captação de novos clientes caso confirmação do CONTRATANTE.
            <br/><br/>
            <span class="bold">Cláusula 6ª.</span> O CONTRATANTE deverá fornecer ao CONTRATADO todas informações necessárias para se finalizar o trabalho estipulado neste contrato
            <br/><br/>

            <div class="center">DO PAGAMENTO</div>
            <br/><br/>

            <span class="bold">Cláusula 7ª.</span> Pela prestação dos serviços contratados, o CONTRATANTE pagará ao CONTRATADO a quantia total de R$:{{this.projeto.price - this.projeto.discount}}.
            <br/><br/>
            <span class="bold">Cláusula 8ª.</span> Serviços de terceiros contratados serão de responsabilidade do CONTRATANTE, bem como a responsabilidade dos pagamentos à fornecedores. 
            <br/><br/>
            DA RESCISÃO
            <br/><br/>
            <span class="bold">Cláusula 9ª.</span> Sendo estabelecido de no mínimo 3 reuniões ou troca de mensagens relacionada a conclusão de cada etapa por motivos de se estabelecer e firmar ciência do CONTRANTANTE não podendo ser reincidido por falta de conhecimento ou do que não se esperava 
            <br/><br/>
            <span class="bold">Cláusula 10ª.</span> O presente instrumento não poderá ser rescindido sem justa causa, sob pena da parte infratora promover ressarcimento judicial de perdas e danos. 
            <br/><br/>
            <span class="bold">Cláusula 11ª.</span> Este contrato também será rescindido caso haja o descumprimento de qualquer das cláusulas pelas partes. 
            <br/><br/>

            <div class="center">DO FORO</div><br/><br/>

            <span class="bold">Cláusula 12ª.</span> Fica eleito o foro da Cidade de São Bernardo do Campo para dirimir qualquer dúvida originária do presente instrumento. 
            Por estarem assim justos e contratados, firmam o presente instrumento, em duas vias de igual teor. 
            <br/><br/>
            Contratante:<br/> Nome:________________________________________________<br/>Assinatura:____________________________________________
            <br/><br/>
            Contratado:<br/>
            Nome: FELIPE MARTINS DUARTE<br/>
            Assinatura: (FELIPE MARTINS DUARTE)<br/>
            <br/>
            {{this.dd}}, de {{this.mm}} de {{this.yyyy}}
        </div>
      </div>
    </div>
    </div>
  </section>

  <section id="why">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>PORQUE?</h2>
          <ul>
            <li>SEGURANÇA</li><br/>
            <li>GARANTIA DE QUALIDADE</li><br/>
            <li>ESTIPULAR PRAZOS</li><br/>
            <li>PROFISSIONALISMO</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  
  <Footer/>

</template>

<script>
import axios from 'axios'
import '../assets/scss/layouts/contratoinit.scss';
import Footer from '../components/Footer';
import {useRoute} from "vue-router";


export default {
  name: 'ContratosInitial',
  components: {
    Footer,
  },
  data(){
    return{
      dd: "",
      mm: "",
      yyyy: "",
      cannotfind: true,
      firstname: "",
      next: "",
      projeto: [
        {
          linkonline: '',
          projname: '',
          domain: '',
          customer: '',
          discount: '',
          price:'',
          startdate: '',
          estimatedtime: '',
          functionalities: '',
          productservice: '',
          plataformmodule: '',
          objectives: '',
        }
      ],
    }
  },
  methods:{
    checkpaid: function(){
      var id = this.$route.params.id;
      axios.post("https://api.felipemduarte.com/pagamento/checkstatus",{"id":id})
      .then((res)=>{
        if(res.status === 200 || res.status === 201){
          this.$router.push("/entrar");
        }
      })
    },
    find: function(){
      //Catch Route ID For VUE 3.0
      const route = useRoute();
      const id = route.params.id;
      //Make a request to an api
      axios.get("https://api.felipemduarte.com/contratos/"+id).then(res => {
        this.projeto.linkonline = res.data.linkonline;
        this.projeto.projname = res.data.projname;
        this.projeto.domain = res.data.domain;
        this.projeto.customer = res.data.customer;
        this.projeto.discount = res.data.discount;
        this.projeto.price = res.data.price;
        this.projeto.startdate = res.data.startdate;
        this.projeto.estimatedtime = res.data.estimatedtime;
        this.projeto.functionalities = res.data.functionalities;
        this.projeto.productservice = res.data.productservice;
        this.projeto.plataformmodule = res.data.plataformmodule;
        this.projeto.objectives = res.data.objectives;
        //next page
        this.next = "/contratos/" + id + "/preenchimento"
        //Date
        var date = new Date();
        var monthName = new Intl.DateTimeFormat("pt-br", { month: "long" }).format;
        this.mm = monthName(date)
        this.dd= String(date.getDate()).padStart(2, '0');
        this.yyyy = date.getFullYear()
        //Catch the first name
        this.firstname = this.projeto.customer.split(" ")[0];
        //if error, not found the file
        this.cannotfind = false;
      }).catch(() => {
        this.cannotfind = true;
      });
    }
  },
  mounted(){
    //Call the method on page load
    this.checkpaid();
    this.find();
  }
}
</script>

<style lang="scss" scoped>
</style>