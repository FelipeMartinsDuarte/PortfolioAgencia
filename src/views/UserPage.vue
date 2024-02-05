<template>

  <section id="contratoend">
    <div class="container">
      <div class="row">
        <div class="col-md-12 flex">
          <img src="../assets/images/logo-black.png" id="logo"/>
        </div>
        <div class="col-md-12 flex">
          <h1>PARABENS, TUDO ESTA<br/>SENDO FEITO!</h1>
        </div>
        <div class="col-md-12 flex">
          <img src="../assets/images/icons/mountain-black.svg" id="sent" alt="">
        </div>
        <div class="col-md-12 flex">
          <p class="description">Tudo certo, está sendo desenvolvido seu grande sonho. fique de olho no e-mail {{email}} e em outros canais de comunicação.</p>
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

  <Footer/>
  
</template>

<script>
import '../assets/scss/layouts/contratoend.scss';
import axios from 'axios';
import Footer from '../components/Footer';

export default {
  name: 'UserPage',
  components: {
      Footer
  },
  data(){
    return{
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
    find: function(){
      let iscookie = this.$cookies.isKey("token");
      if(!iscookie){
        this.$router.push("/");
      }
      if(iscookie){
        axios.get("https://api.felipemduarte.com/conta/painel-usuario",{
          headers:{
            'Authorization': this.$cookies.get('token')
          }
        }).then(res=>{
          this.projeto.projname = res.data.projeto.projname;
          this.projeto.domain = res.data.projeto.domain;
          this.projeto.customer = res.data.projeto.customer;
          this.projeto.startdate = res.data.projeto.startdate;
          this.projeto.estimatedtime = res.data.projeto.estimatedtime;
          //Price subtration
          let sub = res.data.projeto.price - res.data.projeto.discount;
          this.projeto.price = sub.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          //Divide objects
          let funcar = [];
          let funcpr = [];
          let func = String(res.data.projeto.functionalities).split(",");
          let prod = String(res.data.projeto.productservice).split(",");
          //Transforms to array object
          funcar = [... func]
          funcpr = [... prod]
          this.functionalities = funcar;
          this.productservice = funcpr;
          //Data
          let data = new Date(res.data.pagamento.criadoEm);
          this.pagamentodata = data.toLocaleDateString("pt-BR");

        })
      }
    },
    expanding: function(){
      this.expand = !this.expand;
    }
  },
  mounted(){
    //Check if there is valid paid screen
    this.find();

  }
}
</script>

<style lang="scss" scoped>
  section {
    padding: 0 !important;
  }

</style>