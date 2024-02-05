<template>
<section id="payment" :class="{'mainsect':this.mainPage,'dtlsection':!this.mainPage}">
  <div class="container">
    <div class="row">
      <div class="col-md-6" id="payment-lf" :class="{'removemain':!this.mainPage}">
          <img src="../assets/images/logo-black.png" id="logo"/>
          <h1>FINALIZAR CONTRATO</h1>
          <p>Sera enviado uma cópia para seu endereço de e-mail após a contratuação com todas informações preenchidas </p>

          <div class="contract-card" :class="{'unexpand':!expand}">
            <div>
              <span>CONTRATO-{{dd}}-{{mm}}-{{yyyy}}</span>
              <img src="../assets/images/icons/expand-arrow.png" @click="expanding" name="expand"/>
            </div>

            <img src="../assets/images/icons/download-icon.png" name="download"/><br/>
            <a :href="projeto.linkonline" target="_blank">BAIXAR</a>
          </div>

          <h4>Métodos de Pagamento</h4>
          <div class="paymentmet" @click="propagateClick('creditcard')">
            <input type="radio" name="creditopt" ref="creditcard" id="creditcard" @click="propagateClick('creditcard')"/>
            <img src="../assets/images/icons/payment/creditcard.png"/>
            <h5>Cartão de Crédito</h5>
            <a class="change" v-if="saveDet == 'creditcard'">ALTERAR</a>
          </div>
          <div class="paymentmet" @click="propagateClick('pix')">
            <input type="radio" name="creditopt" ref="pix" id="pix" @click="propagateClick('pix')">
            <img src="../assets/images/icons/payment/pix.png"/>
            <h5>PIX</h5>
            <a class="change" v-if="saveDet == 'pix'">ALTERAR</a>
          </div>
          <div id="footdiscount">
            <p>Com Desconto de {{this.projeto.discount}} e se pago pelo PIX há Desconto de R$ 100,00</p>
          </div>
          <div id="footinfo">
            <h2>TOTAL:</h2>
            <h2>12x de {{insttw.installment}}</h2>
            <p>({{projeto.price}})</p>
          </div>
      </div>
      <div class="col-md-6" id="payment-rg" :class="{'removedetails':this.mainPage}">
          <div v-if="this.selectpage === 'details'">
            <img src="../assets/images/icons/back-white.png" id="backbutton" @click="backbutton(true)" class="backbutton"/>
            <h2>DETALHES DE PAGAMENTO</h2>
            <span v-if="errorpay" id="errorp">{{errorpaymsg}}</span>
            <div class="priceitem">
              <h4>OUTROS</h4>
              <span>{{this.projeto.priceothers}}</span>
              <p>(Todos items do que está no contrato)</p>
            </div>
            <div class="priceitem">
              <h4>DESENVOLVIMENTO</h4>
              <span>{{this.projeto.pricedevel}}</span>
              <p>(Desenvolvimento do que está no contrato)</p>
            </div>
            <div class="priceitem">
              <h4>DESCONTO</h4>
              <span>- {{this.projeto.discount}}</span>
            </div>
            <div class="credinst">
              <h4>Nº DE PARCELAS</h4>
              <select name="parcelas" v-model="instnumber" @change="instfind">
                <option
                  v-for="installment in installments"
                  :key="installment"
                  :value="installment.value"
                >
                  {{installment.value}}X - {{ installment.installment }}
                </option>
              </select>
            </div>
            <hr/>
            <div class="credtotal">
              <h2>TOTAL:</h2>
              <h2>{{instvalue.value}}x de {{instvalue.installment}}</h2>
              <p>({{projeto.price}})</p>
            </div>
              <a href="#" id="contract-btn" v-if="this.saveDet !== ''" @click="submitcon">CONTRATAR</a>
              <a href="#" id="contract-btn" class="disabled" v-else>CONTRATAR</a>
          </div>
          <div class="creditcard" v-if="this.selectpage === 'creditcard'">
            <img src="../assets/images/icons/back-white.png" id="backbutton" @click="backbutton(false)" class="backbutton"/>
            <h4>Cartão de Crédito</h4>
            <span v-if="error" id="errorp">{{errormsg}}</span>
            <label for="email">E-MAIL</label><br/>
            <input class="inputtxt" type="text" @click="delerr" name="email" v-model="this.creditcard.email"/><br/>
            <label for="credname">NOME IMPRESSO NO CARTÃO</label><br/>
            <input class="inputtxt" type="text" @click="delerr" name="credname" v-model="this.creditcard.name"/><br/>
            <label for="crednumb">NÚMERO</label><br/>
            <input class="inputtxt" @click="delerr" v-mask="'#### #### #### ####'" masked="false" v-model="this.creditcard.cardnumber" type="text" name="crednumb"/><br/>
            <div class="split-txt">
              <div>
                <label for="credvad">DATA VALIDADE</label><br/>
                <input class="inputtxt" @click="delerr" v-mask="'##/####'" masked="false" placeholder="EX: 08/2030" v-model="this.creditcard.expdate" type="text" name="credvad"/><br/>
              </div>
              <div>
                <label for="credcvv">CVV</label><br/>
                <input class="inputtxt" type="text" @click="delerr" v-mask="'####'" masked="false" v-model="this.creditcard.cvv" name="credcvv"/>
              </div>
            </div>
            <a href="#" class="contract-btn" @click="savedetails" id="savedlcomp">IR PARA PAGAMENTO</a>
          </div>
          <div class="pix" v-if="this.selectpage === 'pix'">
            <img src="../assets/images/icons/back-white.png" id="backbutton" @click="backbutton(false)" class="backbutton"/>
          </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import '../assets/scss/layouts/contratopayment.scss';
import '../assets/scss/layouts/contratopaymentadj.scss';
import axios from 'axios';
import {useRoute} from "vue-router";


export default {
  name: 'ContratosPayment',
  data(){
    return{
      dd: "",
      mm: "",
      yyyy: "",
      errormsg:"",
      error:false,
      errorpay:false,
      errorpaymsg:"",
      expand: false,
      cannotfind: true,
      mainPage: true,
      selectpage: "details",
      saveDet: "",
      paymentType: "",
      creditcard:[{
        name:"",
        email:"",
        cardnumber:"",
        expdate:"",
        cvv:""
      }],
      installments:[],
      instnumber:"12",
      instvalue:"",
      insttw:"",
      customer: [
        {
          name:"",
          email:"",
          adress:"",
          cpf:"",
          rg:""
        }
      ],
      projeto: [
        {
          linkonline: '',
          totalprice: '',
          priceothers: '',
          price:'',
          pricedevel: '',
          discount: '',
          description: '',
          value: '',
          reference_id: '',
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
    cookiescheck: function(){
      let validateadr = this.$cookies.isKey("adress");
      if(!validateadr){
        let id = this.$route.params.id;
        const backpage = "/contratos/" + id + "/preenchimento/";
        this.$router.push(backpage);
      }
    },
    submitcon: function(){
      let validateadr = this.$cookies.isKey("adress");
      if(validateadr){
        if(this.paymentType == 'creditcard'){
            let expSpl = this.creditcard.expdate.substr(-4);
            let expSpld = this.creditcard.expdate.slice(0,2);
            let forms = {
              "customername":this.$cookies.get('name'),
              "customeremail":this.creditcard.email,
              "name": this.creditcard.name,
              "cnpj": this.$cookies.get('cnpj'),
              "rg": this.$cookies.get('rg'),
              "adress": this.$cookies.get('adress'),
              "cpf": this.$cookies.get('cpf'),
              "reference_id":this.projeto.reference_id,
              "description":this.projeto.description,
              "installments": this.instnumber, 
              "number": String(this.creditcard.cardnumber).replace(/\s/g,''), 
              "exp_month": expSpld, 
              "exp_year": expSpl, 
              "security_code":this.creditcard.cvv,
            }
            axios.post('https://api.felipemduarte.com/pagamento/creditcard', forms)
            .then((res)=>{
              if(res.data.mensagem === "requisição recebida"){
                this.$cookies.set("pagamento","true",{ expires: '24h'})
                let id = this.$route.params.id;
                const nextpage = "/contratos/finalizar/" + id + "/";
                this.$router.push(nextpage);
              } else {
                this.errorpay = true;
                this.errormsg = "Ocorreu um erro na efetuação do pagamento, tente novamente mais tarde"
              }
            }).catch((err)=>{
              console.log(err);
            })
        }
      } else {
        let id = this.$route.params.id;
        const backpage = "/contratos/" + id + "/preenchimento/";
        this.$router.push(backpage)
      }
    },
    delerr: function(){
      this.error = "false";
      this.errormsg = "";
      this.cookiescheck();
    },
    instdivisor: function(a){
      function formatMoney(number) {
          return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
      this.installments = [
        {installment:formatMoney(a/1),value:1},
        {installment:formatMoney(a/2),value:2},
        {installment:formatMoney(a/3),value:3},
        {installment:formatMoney(a/4),value:4},
        {installment:formatMoney(a/5),value:5},
        {installment:formatMoney(a/6),value:6},
        {installment:formatMoney(a/7),value:7},
        {installment:formatMoney(a/8),value:8},
        {installment:formatMoney(a/9),value:9},
        {installment:formatMoney(a/10),value:10},
        {installment:formatMoney(a/11),value:11},
        {installment:formatMoney(a/12),value:12},
      ]
      this.insttw = this.installments[11];
    },
    instfind: function(){
      //to display to the total value when changed
      this.instvalue = this.installments[Number(this.instnumber)-1]
    },
    find: function(){
      //Catch Route ID For VUE 3.0
      const route = useRoute();
      const id = route.params.id;
      //Make a request to an api
      axios.get("https://api.felipemduarte.com/contratos/"+id).then(res => {
        this.projeto.linkonline = res.data.linkonline;
        this.projeto.totalprice = res.data.price - res.data.discount;
        this.projeto.description = res.data.objectives;
        this.projeto.reference_id = id;
        //Date
        var date = new Date();
        var monthName = new Intl.DateTimeFormat("pt-br", { month: "long" }).format;
        this.mm = monthName(date).toUpperCase();
        this.dd= String(date.getDate()).padStart(2, '0');
        this.yyyy = date.getFullYear()
        //define constants
        const othersprice = (40 / 100) * res.data.price;
        const pricedevelopment = (60 / 100) * res.data.price;
        //Percentages
        this.projeto.priceothers = othersprice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        this.projeto.pricedevel = pricedevelopment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        //Price subtration
        let sub = res.data.price - res.data.discount;
        this.projeto.price = sub.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        //discount
        let number = Number(res.data.discount);
        this.projeto.discount = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        //if error, not found the file
        this.cannotfind = false;
        //installments
        this.instdivisor(sub);
        //Display 12x Installment when loaded
        this.instvalue = this.installments[11];
      }).catch(() => {
        this.cannotfind = true;
      });
    },
    expanding: function(){
      this.expand = !this.expand;
      this.cookiescheck();
    },
    propagateClick: function(p){
      if(p == "creditcard"){
        this.selectpage = "creditcard";
        this.$refs.creditcard.click();
        //To appears change
        this.saveDet = "";
        //To back to the page
        this.paymentType = "creditcard";
        this.delerr();
      }
      if(p == "pix"){
        this.selectpage = "pix";
        this.paymentType = "pix";
        this.saveDet = "";
        this.$refs.pix.click();
        this.delerr();
      }
      this.mainPage = false;
      this.cookiescheck();
    },
    savedetails: function(){
        var exist = !this.creditcard.name || !this.creditcard.email || !this.creditcard.cardnumber || !this.creditcard.expdate || !this.creditcard.cvv; 
        // eslint-disable-next-line
        var emailregex = new RegExp('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$');
        var creditname = String(this.creditcard.name).length < 5;
        var creditemail = String(this.creditcard.email).match(emailregex);
        var cardnumb = String(this.creditcard.cardnumber).length < 19;
        var cardexp = String(this.creditcard.expdate).length < 7;  
        var cardcvv = String(this.creditcard.cvv).length < 3;    
        if(this.paymentType === 'creditcard'){
          if(exist) {
            this.error = true;
            this.errormsg = "Por favor, preencha todos campos";
          }
          if(creditname){
            this.error = true;
            this.errormsg = "Por favor, preencha o campo nome";
          }
          if(!creditemail){
            this.error = true;
            this.errormsg = "Por favor, preencha um e-mail valído"
          }
          if(cardnumb){
            this.error = true;
            this.errormsg = "Por favor, preencha um número de cartão valído"
          }
          if(cardexp){
            this.error = true;
            this.errormsg = "Por favor, preencha uma data de expiração valída"
          }
          if(cardcvv){
            this.error = true;
            this.errormsg = "Por favor, preencha um código de segurança valído"
          }
          if(!exist && !creditname && creditemail && !cardnumb && !cardexp && !cardcvv){
            this.selectpage = "details";
            this.saveDet = this.paymentType;
          }
        }
      this.errorpay = false;
      this.errorpaymsg = "";
      this.cookiescheck();
    },
    backbutton: function(a){
      //F = Main page, T = Payment page
      if(a){
        this.mainPage = false;
        //Back to the page of payment
        this.selectpage= this.paymentType;
      } else {
        this.mainPage = true;
        this.selectpage = "details";
      }
      this.cookiescheck();
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