<template>
  <section id="contratoforms" @click="clickout">
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12" id="menu">
            <a href="/"> <img src="../assets/images/logo-black.png"/></a>
            <a :href="this.back" id="backagain">CONFERIR NOVAMENTE</a>
          </div>
        </div>
      </div>
    </div>


    <div class="container" @click="clickout">
      <div class="row">
        <div class="col-md-12">
          <div>
            <h1>Precisamos de alguns dados para completar</h1>
            <form @submit.prevent="transfer">
              <span v-if="error" id="errorp">{{errormsg}}</span>
              <label for="nomecompleto">NOME COMPLETO:</label><br/>
              <input type="text" v-model="formdet.name" placeholder="Ex: João silva"  @click="disp" name="nomecompleto" /><br/>
              <label for="endereco" >ENDEREÇO:</label><br/>
              <div id="adress">
                <input type="text" placeholder="ex: AVENIDAS FARIAS, 27" @click="disp" @keyup="searchadress" v-model="formdet.adress" name="endereco"/><br/>
                <ul :class="{'empty':this.adress.length === 0}">
                  <li v-for="(adress,index) in adress" v-bind:key="adress.properties.formatted" @click="setadress(index)">
                    {{adress.properties.formatted}}
                  </li>
                </ul>
              </div>
              <div id="fifth" v-if="selected == 'fisica'">
                <div>
                  <label for="rg">RG:</label><br/>
                  <input type="text" name="rg" @click="disp" v-mask="'##.###.###-#'" masked="false" v-model="formdet.rg"/><br/>
                </div>
                <div>
                  <label for="cpf">CPF:</label><br/>
                  <input type="text" name="cpf" @click="disp" v-mask="'###.###.###-##'" masked="false" v-model="formdet.cpf"/><br/>
                </div>
              </div>
              <label for="cnpj" v-if="selected == 'juridica'" :class="{'disabledinp':selected == 'fisica'}">CNPJ:</label><br/>
              <input type="text" v-if="selected == 'juridica'" :class="{'disabledinp':selected == 'fisica'}" @click="disp" v-model="formdet.cnpj" v-mask="'##.###.###/####-##'" masked="false" name="cnpj"/>
              <div id="inputend">
                <input type="radio" name="people" @change="changepeop(true)" id="PessoaFisica" ref="fisica" checked="true">Pessoa Física
                <input type="radio" name="people" @change="changepeop(false)" id="PessoaJuridica" ref="juridica">Pessoa Júridica
              </div>
              <div id="checkbox">
                <input type="checkbox" name="agree" id="checkb" ref="checkb" @click="checkop"/>
                <label for="agree">Concordo que meus dados sejam apenas utilizados para preencher o contrato</label>
              </div>
              <input type="submit" v-if="checked" class="next-btn" value="PROSSEGUIR">
              <input type="submit" v-if="!checked" class="next-btn" id="disabled-btn" value="PROSSEGUIR" disabled>
              <a :href="next" id="nextpage" ref="nextpage" class="disabledinp"></a>
            </form>
          </div>
        </div>
      </div>
    </div>

  </section>
  
  <Footer/>

</template>

<script>
import axios from 'axios'
import '../assets/scss/layouts/contratoforms.scss';
import Footer from '../components/Footer';
import {useRoute} from "vue-router";


export default {
  name: 'ContratosForms',
  components: {
    Footer,
  },
  data(){
    return{
      adress:[],
      checked: false,
      back: "",
      disb: false,
      next:"",
      error:false,
      errormsg:"",
      selected: "fisica",
      cannotfind: true,
      formdet: [
        {
          name:"",
          adress:"",
          cpf:"",
          rg:"",
          cnpj:""
        }
      ],
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
        this.next = "/contratos/" + id + "/preenchimento/pagamento"
        //back button 
        this.back = "/contratos/" + id;
        //if error, not found the file
        this.cannotfind = false;
      }).catch(() => {
        this.cannotfind = true;
      });
    },
    cookiesset: function(a){
        //Remove every cookie
        this.$cookies.remove("cpf");
        this.$cookies.remove("rg");
        this.$cookies.remove("adress");
        this.$cookies.remove("name");
        this.$cookies.remove("cnpj");
        if(a === "fisica"){
          this.$cookies.set("cpf", this.formdet.cpf,{ expires: '1h'});
          this.$cookies.set("name", this.formdet.name,{ expires: '1h'});
          this.$cookies.set("rg", this.formdet.rg),{ expires: '1h'};
          this.$cookies.set("adress", this.formdet.adress,{ expires: '1h'});
        }
        if(a === "juridica"){
          this.$cookies.set("name", this.formdet.name,{ expires: '1h'});
          this.$cookies.set("cnpj", this.formdet.cnpj,{ expires: '1h'});
          this.$cookies.set("adress", this.formdet.adress,{ expires: '1h'});
        }
        this.error = false;
        this.errormsg = "";
        this.$refs.checkb.click();
        this.checked = false;
        this.$refs.nextpage.click();
    },
    transfer: function(){
      var namelen = String(this.formdet.name).length < 10;
      
      if(namelen){
        this.error = true;
        this.errormsg = "Por favor, preencha corretamente o nome!"
      }
      if(this.selected === 'fisica'){
        var filledall = !this.formdet.name || !this.formdet.adress || !this.formdet.cpf || !this.formdet.rg;
        if(filledall){
          this.error = true;
          this.errormsg = "Por favor, preencha todos campos!"
        }
        var cpfver = String(this.formdet.cpf).length < 14;
        var rgver = String(this.formdet.rg).length < 12;
        if(cpfver){
          this.error = true;
          this.errormsg = "Por favor, preencha corretamente o CPF!"
        }
        if(rgver){
          this.error = true;
          this.errormsg = "Por favor, preencha corretamente o RG!"
        } 
        if(!filledall && !namelen && !cpfver && !rgver){
            //Check if there is a cookie
            let validatecpf = this.$cookies.isKey("cpf");
            let validaterg = this.$cookies.isKey("rg");
            let validateadr = this.$cookies.isKey("adress");
            let validatenm = this.$cookies.isKey("name");
            let validatcnpj = this.$cookies.isKey("cnpj");
            if(validatecpf || validaterg || validateadr || validatenm || validatcnpj){
              this.cookiesset("fisica");
            } else {
              this.cookiesset("fisica");
            }
        }
      }
      if(this.selected === 'juridica'){
        var filledallcnpj = !this.formdet.name || !this.formdet.adress || !this.formdet.cnpj
        if(filledallcnpj){
          this.error = true;
          this.errormsg = "Por favor, preencha todos campos!"
        }
        var cnpjver = String(this.formdet.cnpj).length < 18;
        if(cnpjver){
          this.error = true;
          this.errormsg = "Por favor, preencha corretamente o CNPJ!"
        } 
        if(!filledall && !namelen && !cnpjver){
            //Check if there is a cookie
            let validatecpf = this.$cookies.isKey("cpf");
            let validaterg = this.$cookies.isKey("rg");
            let validateadr = this.$cookies.isKey("adress");
            let validatenm = this.$cookies.isKey("name");
            let validatcnpj = this.$cookies.isKey("cnpj");
            if(validatecpf || validaterg || validateadr || validatenm || validatcnpj){
              this.cookiesset("juridica");
            } else {
              this.cookiesset("juridica");
            }
        }
      }

    },
    disp: function(){
      this.error = false;
      this.errormsg = "";
    },
    changepeop: function(a){
      if(a){
        this.$refs.fisica.click();
        this.selected = "fisica";
      } else {
        this.$refs.juridica.click();
        this.selected = "juridica";
      }
    },
    checkop: function(){
      this.checked = !this.checked;
    },
    searchadress: function(){
      if(String(this.formdet.adress).length > 3){
        const forms = {"adress":this.formdet.adress};
        axios.post("https://api.felipemduarte.com/encontrar/endereco", forms)
        .then(res=>{
            this.adress = res.data.resultado.features;
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },
    setadress: function(index){
      this.formdet.adress = this.adress[index].properties.formatted;
      this.adress = [];
    },
    clickout: function(){
      this.adress = [];
    },
    findcookies: function(){
      let validatecpf = this.$cookies.get("cpf");
      let validatcnpj = this.$cookies.get("cnpj");
      if(validatecpf){
          this.formdet.name = this.$cookies.get("name");
          this.formdet.adress = this.$cookies.get("adress");
          this.formdet.cpf = this.$cookies.get("cpf");
          this.formdet.rg = this.$cookies.get("rg");
      }
      if(validatcnpj){
          this.formdet.name = this.$cookies.get("name");
          this.formdet.adress = this.$cookies.get("adress");
          this.changepeop(false);
          this.formdet.cnpj = this.$cookies.get("cnpj");
      }
    }
  },
  mounted(){
    //Call the method on page load
    this.checkpaid();
    this.find();
    this.findcookies();
  }
}
</script>

<style lang="scss" scoped>
</style>