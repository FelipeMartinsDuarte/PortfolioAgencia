<template>

<section id="login">
  <div id="lf-banner">
    <img id="lf-img" src="../assets/images/login/background-image.png"/>
  </div>
  <div id="rg-form">
    <h1>TROQUE A SENHA</h1>
    <form @submit.prevent="Login">
      <span v-if="error" id="errorp">{{errormsg}}</span>
      <label for="password">SENHA</label><br/>
      <input type="password" name="password" v-model="password"><br/>
      <label for="passwordconf">CONFIRME SENHA</label><br/>
      <input type="password" name="passwordconf" v-model="passconf"><br/>
      <input type="submit" value="SALVAR MUDANÇAS" class="btn-submit"/><br/>
      <span>Concordo com os termos e privacidade</span>
    </form>
  </div>
</section>

</template>


<script>
import '../assets/scss/layouts/login.scss';
import axios from 'axios';

export default {
  name: 'ChangePassword',
  data(){
    return{
      error:false,
      errormsg: "",
      password: "",
      passconf: "",
    }
  },
  methods:{
    Login: function(){
      if(!this.passconf){
        this.error = true;
        this.errormsg = "Preencha a a Confirmação de senha";
      }
      if(!this.password){
        this.error = true;
        this.errormsg = "Preencha o campo de Senha";
      } 
      if(this.password !== this.passconf){
        this.error = true;
        this.errormsg = "A Senha e a Confirmação são diferentes";
      } 
      else {
          var encrip = this.$route.params.encrip;
          const forms = {
            senha:this.password,
            senhaconfirmacao: this.passconf,
            encrip: encrip
          };
          axios.post("https://api.felipemduarte.com/login/changepassword",forms)
          .then(res=>{
            if(res.status === 204 || res.status === 200){
              this.$router.push('/');
            }})
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