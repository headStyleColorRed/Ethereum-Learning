<template>
  <div class="home">
    <div class="contentWrapper">
      <div class="contentTop">
        <p>Current Balance: {{ balance }}</p>
        <p>Account: {{ account }}</p>
      </div>
      <div class="contentMiddle">
        <v-btn v-on:click="dialog = true" color="orange"
          >Sell new article</v-btn
        >
      </div>
      <div class="contentBottom" v-for="article in articles" :key="article.id">
        <v-card class="articleCard">
          <b>{{ article.name }}</b>
          <p>{{ article.description }}</p>
          <p>Price: {{ article.price }} eth</p>
          <p>Sold by: {{ article.seller }}</p>
          <p v-if="article.buyer != null">Bought by: {{ buyerText(article, account) }}</p>
          <div class="buyButtonWrapper">
            <v-btn class="buyButton" color="success" v-if="shouldShowBuyButton(article)" v-on:click="buyArticle(article)" text>Buy</v-btn>
          </div>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Sell your article
        </v-card-title>

        <div class="form">
          <v-text-field
            label="Article Name"
            v-model="newArticle.name"
          ></v-text-field>
          <v-text-field
            label="Price in ETH"
            v-model="newArticle.price"
          ></v-text-field>
          <v-text-field
            label="Article description"
            v-model="newArticle.description"
          ></v-text-field>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="sellNewArticle()"> Submit </v-btn>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Metamask  -->
    <v-dialog v-model="metaMaskDialog" width="300">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Activate metamask
        </v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" @click="connectToMetaMask()">
            Connect to MetaMask
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import uuidv4 from "uuid/v4";
import Web3Manager from "./../web3/web3Manager.js";
import web3Manager from "./../web3/web3Manager.js";

export default {
  data() {
    return {
      web3: null,
      contracts: [],
      dialog: false,
      metaMaskDialog: false,
      balance: 12.3,
      account: "Not connected",
      newArticle: {
        name: "Patinete",
        description: "Some long and undescriptive description",
        price: 3,
      },
      articles: new Array(),
    };
  },
  mounted() {
    this.connectToWeb3();
  },
  methods: {
    async connectToWeb3() {
      try {
        let coinbase = await Web3Manager.connectToWeb3(window.ethereum);
        this.account = coinbase;
        this.getBalance();
      } catch (err) {
        alert(err);
      }
    },
    async getBalance() {
      this.balance = await Web3Manager.getBalanceForAccount(this.account);
      await web3Manager.connectToContract();
      let articles = await web3Manager.getArticlesForSale()
      if (articles != null) {
        this.articles = articles
      }
    },
    async sellNewArticle() {
      this.dialog = false;
      try {
        await Web3Manager.publishArticle(this.newArticle.name, this.newArticle.description, this.newArticle.price, this.account);
      } catch (err) {
        alert(err);
      }
    },
    async buyArticle(article) {
      try {
        Web3Manager.buyArticle(`${article.price}`, article.id);
      } catch (err) {
        alert(err);
      }
    },
    buyerText(article, account) {
      return article.buyer.toLowerCase() == account.toLowerCase() ? "You" : article.buyer
    },
    shouldShowBuyButton(article) {
      return article.seller.toLowerCase() != this.account.toLowerCase()
    }
  },
  components: {},
  computed: {
  }
};
</script>

<style scoped>
.home {
  display: grid;
  height: 100vh;
  width: 100vw;
  background-color: #252627;
  color: white;
  padding: 3rem;
  grid-template-rows: 1fr 1fr 1fr;
}

.contentWrapper {
  display: grid;
  justify-self: center;
}

.contentTop {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.contentMiddle {
  justify-self: right;
}

.contentBottom {
  margin: 1rem;
}

.articleCard {
  padding: 2rem;
}

.articleCard p {
  padding: 0;
  margin: 0;
}

.form {
  padding: 2rem;
}

.buyButtonWrapper {
  display: grid;
  justify-content: right;
}
</style>


/*-------------- IPHONE 5 ----------------*/
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (orientation: portrait)


@media only screen and (min-device-width: 768px) and (max-device-width: 1024px)

/*-------------- HALF SCREEN ----------------*/
@media only screen and (min-device-width: 500px) and (max-width: 1000px) 


/*-------------- FULL SCREEN ----------------*/
@media only screen and (min-width: 1001px)