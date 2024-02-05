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
      <h1>USE SEU ID</h1>
      <form @submit.prevent="Login">
        <span v-if="error" id="errorp">{{errormsg}}</span>
        <label for="idprojeto">ID PROJETO</label><br/>
        <input type="text" name="idprojeto" v-model="projectid" v-mask="'XXXX-XXX-XXXXX'"><br/>
        <a href="#" id="forgotpassword">Não recebeu o código?</a><br/>
        <input type="submit" value="ENTRAR" class="btn-submit"/><br/>
        <a href="/entrar" class="btn-submit-a">ENTRAR USANDO E-MAIL</a><br/>
        <span>Concordo com os termos e privacidade</span>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  section {
    padding: 0 !important;
  }
</style>

<script>
import '../assets/scss/layouts/login.scss';
import axios from 'axios';

export default {
  name: 'LoginId',
  data(){
    return{
      error:false,
      errormsg: "",
      projectid: "",
    }
  },
  methods:{
    Login: function(){
      if(!this.projectid){
        this.error = true;
        this.errormsg = "Preencha o campo com seu ProjetoID";
      } else {
          const forms = {"projectid":this.projectid};
          axios.post("https://api.felipemduarte.com/login",forms)
            .then(res=>{
              if(res.status === 204 || res.status === 200){
                console.log("Pode entrar");
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
