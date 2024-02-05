<template>

<a id="backarrow-bg" href="/">
  <img src="../assets/images/login/backarrow-black.png"/>
</a>

<section id="login">
  <div id="lf-banner">
    <img id="lf-img" src="../assets/images/login/background-image.png"/>
    <a href="/">
      <img src="../assets/images/login/backarrow.png"/>
    </a>
  </div>
  <div id="rg-form">
    <h1>BEM VINDO,</h1>
    <p>Sua ideia esta a alguns passos de estar pronta</p>
    <form @submit.prevent="Login">
      <span v-if="error" id="errorp">{{errormsg}}</span>
      <label for="email">E-MAIL</label><br/>
      <input type="email" name="email" v-model="email"><br/>
      <label for="password">SENHA</label><br/>
      <input type="password" name="password" v-model="password"><br/>
      <a href="/entrar/esqueciasenha" id="forgotpassword">Esqueceu a senha?</a><br/>
      <input type="submit" value="ENTRAR" class="btn-submit"/><br/>
      <a href="/entrar/id" class="btn-submit-a">ENTRAR USANDO ID PROJETO</a><br/>
      <span>Concordo com os termos e privacidade</span>
    </form>
  </div>
</section>

</template>


<script>
import '../assets/scss/layouts/login.scss';
import axios from 'axios';

export default {
  name: 'LoginEmail',
  data(){
    return{
      error:false,
      errormsg: "",
      email: "",
      password: ""
    }
  },
  methods:{
    Check: function(){
      let token = this.$cookies.isKey("token");
      let level = this.$cookies.isKey("nivel");
      if(token && level){
        if(this.$cookies.get("nivel") === "administrador"){
          this.$router.push("/admin/cadastrar");
        }
        if(this.$cookies.get("nivel") === "usuario"){
          this.$router.push("/usuario");
        }
      }

    },
    Login: function(){
      if(!this.email){
        this.error = true;
        this.errormsg = "Preencha o campo de E-mail";
      }
      if(!this.password){
        this.error = true;
        this.errormsg = "Preencha o campo de Senha";
      } else {
          const forms = {"email":this.email,"password":this.password};
          axios.post("https://api.felipemduarte.com/login",forms)
            .then(res=>{
              if(res.status === 204 || res.status === 200){
                if(res.data.nivel === "Administrador"){
                  this.$cookies.set("token", res.data.token, { expires: '30m'});
                  this.$cookies.set("nivel", "administrador", { expires: '30m'});
                  this.$router.push('/admin/cadastrar');
                } else {
                  this.$cookies.set("token", res.data.token, { expires: '10m'});
                  this.$cookies.set("nivel", "usuario", { expires: '10m'});
                  this.$router.push('/usuario');
                }
              }
            })
            .catch(err=>{
              this.error = true;
              this.errormsg = err.response.data.resultado;
            })
      }
    }
  },
  mounted(){
    this.Check();
  }
}
</script>

<style lang="scss" scoped>
  section {
    padding: 0 !important;
  }

</style>