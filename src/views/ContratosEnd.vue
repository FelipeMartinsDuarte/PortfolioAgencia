<template>

  <section id="contratoend" v-if="wrong">
    <div class="container">
      <div class="row">
        <div class="col-md-12 flex">
          <img src="../assets/images/logo-black.png" id="logo"/>
        </div>
        <div class="col-md-12 flex">
          <h1>SEU PAGAMENTO FOI RECUSADO!</h1>
        </div>
        <div class="col-md-12 flex">
          <img src="../assets/images/icons/wrong-black.svg" id="sent" alt="">
        </div>
        <div class="col-md-12 flex">
          <p class="description">Não se preocupe, você poderá tentar realizar outro pagamento. Tente entrar em contato com a agência do seu cartão de crédito para entender os motivos.</p>
        </div>
        <div class="col-md-12 flex">
          <a :href="tryagain" id="tryagain">TENTAR NOVAMENTE</a>
        </div>
      </div>
    </div>
  </section>

  <section id="contratoend" v-if="accept">
    <div class="container">
      <div class="row">
        <div class="col-md-12 flex">
          <img src="../assets/images/logo-black.png" id="logo"/>
        </div>
        <div class="col-md-12 flex">
          <h1>SEU CONTRATO<br/>FOI FINALIZADO!</h1>
        </div>
        <div class="col-md-12 flex">
          <img src="../assets/images/icons/sent-black.png" id="sent" alt="">
        </div>
        <div class="col-md-12 flex">
          <p class="description">Em breve você recebera um e-mail na sua caixa de entrada {{email}} confirmando os detalhes</p>
        </div>
        <div class="col-md-12 flex">
          <img src="../assets/images/icons/down-arrow.png" id="downarrow" alt="">
        </div>
        <div class="col-md-12 flex">
          <div id="itemlist">
            <h2>DETALHES:</h2>
            <div class="itemli">
              <h4>Nome:</h4>
              <p>{{projeto.customer}}</p>
            </div>
            <div class="itemli">
              <h4>Prazo Estipulado (Limite)</h4>
              <p>{{projeto.estimatedtime}} Dias</p>
            </div>
            <div class="itemli">
              <h4>Site:</h4>
              <p>{{projeto.domain}}</p>
            </div>
            <div class="itemli">
              <h4>Valor Total:</h4>
              <p>{{projeto.price}}</p>
            </div>
            <div class="itemli">
              <h4>Produto / Serviço:</h4>
              <ul>
                <li v-for="(productservice,index) in productservice" v-bind:key="index">{{productservice}}</li><br/>
              </ul>
            </div>
            <div class="itemli">
              <h4>Funcionalidades:</h4>
              <ul>
                <li v-for="(functionalities,index) in functionalities" v-bind:key="index">{{functionalities}}</li><br/>
              </ul>
            </div>
            <div class="itemli">
              <h4>Data contratação:</h4>
              <p>{{pagamentodata}}</p>
            </div>

            <div id="contratodiv">
              <h4>Contrato</h4>
              <div class="contract-card" :class="{'unexpand':!expand}">
                <div>
                <span>CONTRATO</span>
                <img src="../assets/images/icons/expand-arrow.png" name="expand" @click="expanding"/>
                </div>

                <img src="../assets/images/icons/download-icon.png" name="download"/><br/>
                <a href="#">BAIXAR</a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contratoend" v-if="waiting">
    <div class="container">
      <div class="row">
        <div class="col-md-12 flex">
          <img src="../assets/images/logo-black.png" id="logo"/>
        </div>
        <div class="col-md-12 flex">
          <h1>TUDO ESTA<br/>QUASE APROVADO</h1>
        </div>
        <div class="col-md-12 flex">
          <img src="../assets/images/icons/waiting-black.svg" id="sent" alt="">
        </div>
        <div class="col-md-12 flex">
          <p class="description">Seu pagamento está em analise, em breve você recebera um e-mail na sua caixa de entrada {{email}} confirmando a aprovação</p>
        </div>
        <div class="col-md-12 flex">
          <img src="../assets/images/icons/down-arrow.png" id="downarrow" alt="">
        </div>
        <div class="col-md-12 flex">
          <div id="itemlist">
            <h2>DETALHES:</h2>
            <div class="itemli">
              <h4>Nome:</h4>
              <p>{{projeto.customer}}</p>
            </div>
            <div class="itemli">
              <h4>Prazo Estipulado (Limite)</h4>
              <p>{{projeto.estimatedtime}} Dias</p>
            </div>
            <div class="itemli">
              <h4>Site:</h4>
              <p>{{projeto.domain}}</p>
            </div>
            <div class="itemli">
              <h4>Valor Total:</h4>
              <p>{{projeto.price}}</p>
            </div>
            <div class="itemli">
              <h4>Produto / Serviço:</h4>
              <ul>
                <li v-for="(productservice,index) in productservice" v-bind:key="index">{{productservice}}</li><br/>
              </ul>
            </div>
            <div class="itemli">
              <h4>Funcionalidades:</h4>
              <ul>
                <li v-for="(functionalities,index) in functionalities" v-bind:key="index">{{functionalities}}</li><br/>
              </ul>
            </div>
            <div class="itemli">
              <h4>Data contratação:</h4>
              <p>{{pagamentodata}}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer/>
  
</template>

<script>
import '../assets/scss/layouts/contratoend.scss';
import {useRoute} from "vue-router";
import axios from 'axios';
import Footer from '../components/Footer';

export default {
  name: 'ContratosEnd',
  components: {
    Footer
  },
  data(){
    return{
      tryagain:"",
      error: true,
      wrong: false,
      accept: false,
      waiting: false,
      creating: false,
      expand:false,
      verified:"",
      cannotfind: true,
      paymentid: "",
      pagamentodata: "",
      email:"",
      functionalities: [],
      productservice: [],
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
          plataformmodule: '',
          objectives: '',
        }
      ]
    }
  },
  methods:{
    checkCookie: function(){
      let iscookie = this.$cookies.isKey("pagamento");
      if(!iscookie){
        this.$router.push("/entrar");
      }
    },
    charge: function(){
      let forms = {"paymentid": this.paymentid}
      axios.post("https://api.felipemduarte.com/pagamento/creditcard/charge", forms)
      .then(()=>{
        console.log("Enviado")
      })
      .catch(()=>{
        console.log("pagamento 505");
      })
    },
    findproj: function(){
      const route = useRoute();
      const id = route.params.id;
      axios.get("https://api.felipemduarte.com/contratos/"+id).then(res => {
        this.tryagain = "/contratos/" + id;
        this.projeto.projname = res.data.projname;
        this.projeto.domain = res.data.domain;
        this.projeto.customer = res.data.customer;
        this.projeto.startdate = res.data.startdate;
        this.projeto.estimatedtime = res.data.estimatedtime;
        //Price subtration
        let sub = res.data.price - res.data.discount;
        this.projeto.price = sub.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        //Divide objects
        let funcar = [];
        let funcpr = [];
        let func = String(res.data.functionalities).split(",");
        let prod = String(res.data.productservice).split(",");
        //Transforms to array object
        funcar = [... func]
        funcpr = [... prod]
        this.functionalities = funcar;
        this.productservice = funcpr;
      }).catch(() => {
        this.cannotfind = true;
      });
    },
    check: function(){
      const route = useRoute();
      const id = route.params.id;
      axios.post("https://api.felipemduarte.com/pagamento/checkstatus",{"id":id})
      .then((res)=>{
        let datanow = new Date(res.data.pagamentodata);
        let dataformat = datanow.toLocaleDateString("pt-BR");
        this.pagamentodata = dataformat;
        //Format email
        let email = (String(res.data.email));
        var maskid = email.replace(/^(.)(.*)(.@.*)$/,
        (_, a, b, c) => a + b.replace(/./g, '*') + c)
        this.email = maskid;
        this.paymentid = res.data.pagamentoid;
        if(res.data.statuspagamento === "AUTHORIZED" || res.data.statuspagamento === "PAID"){
          this.accept = true;
          this.wrong = false;
          this.waiting = false;
        }
        if(res.data.statuspagamento === "DECLINED" || res.data.statuspagamento === "CANCELED"){
          this.accept = false;
          this.wrong = true;
          this.waiting = false;
        }
        if(res.data.statuspagamento === "IN-ANALYSIS"){
          this.accept = false;
          this.wrong = false;
          this.waiting = true;
        }
        this.error = false;
        this.charge();
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    expanding: function(){
      this.expand = !this.expand;
    }
  },
  mounted(){
    //Check if there is valid paid screen
    this.checkCookie();
    this.check();
    this.findproj();

  }
}
</script>

<style lang="scss" scoped>
  section {
    padding: 0 !important;
  }

</style>