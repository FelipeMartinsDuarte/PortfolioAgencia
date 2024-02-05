<template>

<a id="backarrow-bg" href="/entrar">
  <img src="../assets/images/login/backarrow-black.png"/>
</a>

<section id="login">
  <div id="lf-banner">
    <img id="lf-img" src="../assets/images/login/background-image.png"/>
    <a href="/entrar">
      <img src="../assets/images/login/backarrow.png"/>
    </a>
  </div>
  <div id="rg-form">
    <h1>CONFIRME SEU E-MAIL</h1>
    <form @submit.prevent="Login">
      <span v-if="error" id="errorp">{{errormsg}}</span>
      <span v-if="sent" id="sucessfull">Enviado com sucesso!</span>
      <label for="email">E-MAIL</label><br/>
      <input type="email" name="email" v-model="email"><br/>
      <input type="submit" value="ENVIAR CÓDIGO DE VERIFICAÇÃO" class="btn-submit"/><br/>
      <span>Concordo com os termos e privacidade</span>
    </form>
  </div>
</section>

</template>


<script>
import '../assets/scss/layouts/login.scss';
import axios from 'axios';

export default {
  name: 'ForgetPassword',
  data(){
    return{
      error:false,
      errormsg: "",
      email: "",
      sent: false,
    }
  },
  methods:{
    Login: function(){
      if(!this.email){
        this.error = true;
        this.errormsg = "Preencha o campo de E-mail";
      }else {
          const forms = {"email":this.email};
          axios.post("https://api.felipemduarte.com/login/changepassword/sendmail",forms)
            .then(res=>{
              if(res.status === 204 || res.status === 200){
                this.sent = true;
                this.email = "";
              }
            })
            .catch(err=>{
              this.error = true;
              this.errormsg = err.response.data.resultado;
            })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    padding: 0 !important;
  }

</style>