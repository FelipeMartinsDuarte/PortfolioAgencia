<template>

  <div class="container">
    <div class="row">
      <div class="col-md-1">
        <a href="/">
        <img src="../assets/images/icons/BACK.png" class="backbutton"/>
        </a>
      </div>
    </div>
  </div>

  <section id="contato">
    <div class="container">
      <div class="row">
        <div class="col-md-7">
        <h1>COMO POSSO <br/>
          AJUDAR?</h1>
        <div class="centered-sent">
          <img src="../assets/images/icons/sent-black.png" alt="" v-if="forms.sent">
        </div>
        <form @submit.prevent="onPost" v-if="!forms.sent">
          <p class="wholelincontact">Olá, meu nome é</p><input type="text" v-model="forms.nome" required placeholder="Escreva aqui"/>
          <p class="wholelincontact">E Sou</p>
          <select v-model="forms.profissao" required>
            <option value="" disabled>Selecione</option>
            <option value="Interessada">Interessado(a)</option>
            <option value="Investidor">Investidor(a)</option>
            <option value="Empreendedor">Empreendedor(a)</option>
            <option value="Gerente">Gerente</option>
            <option value="Funcionário">Funcionário(a)</option>
          </select>
            <p>e estou querendo ou</p><br/><p class="searchingcontact">procurando</p>
            <select v-model="forms.procura" class="select2" required>
              <option disabled value="">Selecione</option>
              <option value="Conversar">Conversar sobre meu projeto</option>
              <optgroup label="Especificos">
                <option value="Marketing">Marketing</option>
                <option value="Branding">Branding</option>
                <option value="Design">Design</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Pesquisa">Pesquisa Geral</option>
              </optgroup>
              <optgroup label="Pesquisas">
                <option value="PesquisaMercado">Pesquisa de Mercado</option>
                <option value="PesquisaProduto">Pesquisa de Produto</option>
                <option value="PesquisaDesenvolvimento">Pesquisa de Desenvolvimento</option>
              </optgroup>
            </select>
          <p class="contactmecontact">, Entre em</p><br /><p>contato comigo</p>
          <input type="text" required v-model="forms.cellphone" placeholder="Número de Celular"/><br/>

          <div class="accept">
            <input type="checkbox" name="indicado" @change="refeered"/>
            <label for="indicado" v-if="refereechecked">Foi referenciado? Por quem?</label><input v-if="refereechecked" type="text" id="referee" v-model="forms.referee" placeholder="Ex: Frazão"/><br v-if="refereechecked"/>
            <label for="indicado" v-if="!refereechecked">Foi referenciado?</label><br v-if="!refereechecked"/>
 
            <input type="checkbox" name="concordo" @change="agreed"/>
            <label for="concordo">Eu concordo com os termos e privacidade</label><br/>
          </div>

            <input class="btn-style-contact" type="submit" value="Enviar" :class="{'disabledcontact':!agreeddata}" :disabled="!agreeddata"/>
        </form>
        </div>
      </div>
    </div>
    <img id="contact-image" src="../assets/images/contato/background-image-tablet.png"/>
  </section>


  <Footer/>

</template>

<script>
  import '../assets/scss/layouts/contact.scss';
  import Footer from '../components/Footer';
  import axios from 'axios';


  export default {
    name: 'PaginaContato',
    components: {
      Footer,
    },
    data (){
      return {
        refereechecked: false,
        agreeddata: false,
        forms: [{
          nome: '',
          profissao: '',
          procura: '',
          cellphone: '',
          referee: '',
          sent: false,
        }],
      }
    },
    methods: {
      refeered: function(){
        this.refereechecked = !this.refereechecked;
      },
      agreed: function(){
        this.agreeddata = !this.agreeddata;
      },
      onPost: function () {
      var form = {"nome":this.forms.nome,"profissao":this.forms.profissao,"procura":this.forms.procura,"referee":this.forms.referee,"cellphone":this.forms.cellphone}
      axios.post("https://api.felipemduarte.com/contact", form).then(res => {
        if(res.status === 200){
          this.forms.nome = "";
          this.forms.profissao = "";
          this.forms.procura = "";
          this.forms.cellphone = "";
          this.forms.referee = "";
          this.forms.sent = true;
          console.log("Enviado")
        }
        else {
          console.log("Não Enviado")
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>

</style>