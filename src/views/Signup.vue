<template>


<a id="backarrow-bg" href="/">
  <img src="../assets/images/login/backarrow-black.png"/>
</a>

<section id="signup">
  <div id="lf-banner">
    <img id="lf-img" src="../assets/images/login/background-image.png"/>
    <img id="lf-img" src="../assets/images/login/background-image.png"/>
    <img id="lf-img" src="../assets/images/login/background-image.png"/>
    <a href="/">
      <img src="../assets/images/login/backarrow.png"/>
    </a>
  </div>
  <div id="rg-form">
    <h1>CADASTRAR</h1>
    <select v-model="this.selecionado">
      <option value="Cliente">Cliente</option>
      <option value="Projeto">Projeto</option>
      <option value="Pagamento">Pagamento</option>
    </select>
    <hr/>
    <form v-if="this.selecionado ==='Cliente'" @submit.prevent="onPostCliente">
      <input type="text" required placeholder="NOME" v-model="this.cliente.nome"/><br/>
      <input type="text" required placeholder="E-MAIL" v-model="this.cliente.email"/><br/>
      <input type="text" required placeholder="CELULAR" v-model="this.cliente.celular"/><br/>
      <input type="text" required placeholder="REFERENCIADO POR" v-model="this.cliente.referenciadopor"/><br/>
      <label for="venda">ENCONTRADO POR</label><br/>
      <select name="venda" v-model="this.cliente.encontradopor">
        <option value="">SELECIONE</option>
        <option value="venda-direta">VENDA DIRETA</option>
        <option value="venda-por-indicacao">VENDA POR INDICAÇÃO</option>
        <option value="venda-por-canal-organico">VENDA POR CANAL ORGANICO</option>
        <option value="venda-por-trafego-pago">VENDA POR TRAFEGO PAGO</option>
      </select><br/>
      <label for="instagram" >INSTAGRAM</label><br/>
      <input type="text" required  v-model="this.cliente.instagram" id="instagram" name="instagram"/><br/>  
      <input type="checkbox" name="admin" @change="admin" >
      <label for="admin" >CLIENTE ADMINISTRADOR</label><br/>
      <input type="submit" value="CADASTRAR" class="btn-submit"/><br/>
    </form>

    <form v-if="this.selecionado ==='Projeto'" @submit.prevent="onPostProject" enctype="multipart/form-data">
      <input type="text" required placeholder="NOME DO PROJETO" v-model="this.projeto.projname"/><br/>
      <input type="text" required placeholder="DOMINIO" v-model="this.projeto.domain"/><br/>
      <input type="text" required placeholder="CLIENTE(E-MAIL)" v-model="this.projeto.customer"/><br/>
      <label for="file">CONTRATO</label><br/>
      <div id="contrato">
        <img src="../assets/images/fileupload.png">
        <input type="text" required placeholder="Link(URL)" id="linkcontract" v-model="this.projeto.linkonline"/>
      </div>
      <label for="discount">DESCONTO</label><br/>
      <input type="text" class="deal" name="discount" v-model.lazy="this.projeto.discount" v-money="money"/><br/>
      <label for="price">PREÇO</label><br/>
      <input type="text" class="deal" name="price" v-model.lazy="this.projeto.price" v-money="money"/><br/>
      <label for="startdate">INICIO</label><br/>
      <input typhe="date" class="deal" name="startdate" v-model="this.projeto.startdate"/><br/>
      <label for="estimatedtime">PRAZO</label><br/>
      <input type="number" class="deal" name="estimatedtime" v-model="this.projeto.estimatedtime"/><br/>
      <label for="functions">FUNCIONALIDADES (Separar por virgulas)</label><br/>
      <textarea name="functions" class="text" cols="30" rows="5" v-model="this.projeto.functionalities"></textarea><br/>
      <label for="productservice">PRODUTO/SERVIÇO (Separar por virgulas)</label><br/>
      <textarea name="productservice" class="text" cols="30" rows="5" v-model="this.projeto.productservice"></textarea><br/>
      <label for="plataformmodule">PLATAFORMA/MODULO (Separar por virgulas)</label><br/>
      <textarea name="plataformmodule" class="text" cols="30" rows="5" v-model="this.projeto.plataformmodule"></textarea><br/>
      <label for="objectives">OBJETIVOS  (Separar por virgulas)</label><br/>
      <textarea name="objectives" class="text" cols="30" rows="5" v-model="this.projeto.objectives"></textarea><br/>
      <input type="submit" value="CADASTRAR" class="btn-submit"/><br/>
    </form>

    <form v-if="this.selecionado ==='Pagamento'" @submit.prevent="onPostPayment">
      <input type="text" required placeholder="OBJECTID DO PROJETO" v-model="this.payment.id"/><br/><br/>
      <select name="venda" v-model="this.payment.status">
        <option value="">SELECIONE</option>
        <option value="PAID">PAID</option>
        <option value="REJECTED">REJECTED</option>
      </select>
      <input type="submit" value="ALTERAR STATUS" class="btn-submit"/><br/>
    </form>
  </div>
</section>

</template>


<script>
import axios from 'axios';
import '../assets/scss/layouts/signup.scss';
import {VMoney} from 'v-money'

export default {
  name: 'SignUp',
  data(){
    return{
      selecionado: "Cliente",
      fileupload: false,
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
      payment: [
        {
          id:"",
          status:"",
        }

      ],
      cliente: [
        {
          nome: '',
          email: '',
          celular: '',
          referenciadopor: '',
          encontradopor: '',
          instagram: '',
          admin: false,
          sent: false,
        }
      ],
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
        }
    }
  },
  directives: {money: VMoney},
  methods: {
    checkuser: function(){
      let iscookie = this.$cookies.isKey("nivel");
      if(!iscookie){
        this.$router.push("/");
      }
      if(this.$cookies.get('nivel') !== "administrador"){
        this.$router.push("/");
      }
    },
    admin: function(){
        this.cliente.admin = !this.cliente.admin;
    },
    onPostPayment: function(){
      var form = {"id":this.payment.id, "status":this.payment.status};
      axios.post("https://api.felipemduarte.com/admin/changestatus", form, {
        headers:{
          'Authorization': this.$cookies.get('token')
        }
      })
      .then(res => {
        if(res.status === 204 || res.status === 200){
          this.payment.id = "";
          this.payment.status = "";
        } else {
          console.log("Não enviado");
        }
      })

    },
    onPostCliente: function () {
      let formData = {"nome":this.cliente.nome, "email":this.cliente.email,"celular":this.cliente.celular, "encontradopor":this.cliente.encontradopor, "instagram":this.cliente.instagram, "referenciadopor":this.cliente.referenciadopor, "admin":this.cliente.admin}
      console.log(formData);
      axios.post("https://api.felipemduarte.com/admin/cadastrar/cliente", formData,{
        headers:{
          'Authorization': this.$cookies.get('token')
        }
      }).then(res => {
        if(res.status === 200){
          this.cliente.nome = "";
          this.cliente.email = "";
          this.cliente.celular = "";
          this.cliente.referenciadopor = "";
          this.cliente.encontradopor = "";
          this.cliente.instagram = "";
          this.cliente.sent = true;
          this.cliente.admin = false;
          console.log("Enviado")
        }
        else {
          console.log("Não Enviado")
        }
      })
    },
    onPostProject: function(){
      var form = {"file":this.projeto.file,"linkonline":this.projeto.linkonline,"projname":this.projeto.projname,"domain": this.projeto.domain,"customer": this.projeto.customer,"discount": this.projeto.discount,"price": this.projeto.price,"startdate": this.projeto.startdate,"estimatedtime": this.projeto.estimatedtime,"functionalities": this.projeto.functionalities,"productservice": this.projeto.productservice,"plataformmodule": this.projeto.plataformmodule,"objectives": this.projeto.objectives};
      axios.post("https://api.felipemduarte.com/admin/cadastrar/projeto", form, {
        headers:{
          'Authorization': this.$cookies.get('token')
        }
      })
      .then(res => {
        if(res.status === 204 || res.status === 200){
          this.projeto.file = "";
          this.projeto.filenm = "";
          this.projeto.price = "";
          this.projeto.projname = "";
          this.projeto.domain = "";
          this.projeto.linkonline = "";
          this.projeto.customer = "";
          this.projeto.discount = "";
          this.projeto.startdate = "";
          this.projeto.estimatedtime = "";
          this.projeto.functionalities = "";
          this.projeto.productservice = "";
          this.projeto.plataformmodule = "";
          this.projeto.objectives = "";
        } else {
          console.log("Não enviado");
        }
      })
    }
  },
  mounted(){
    //Call the method on page load
    this.checkuser();
  }
}
</script>

<style lang="scss" scoped>
  section {
    padding: 0 !important;
  }

</style>