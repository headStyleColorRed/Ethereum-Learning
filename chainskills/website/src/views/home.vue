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
          <p>Price: {{ article.price }}</p>
          <p>Owner: {{ article.seller }}</p>
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
      articles: [
        {
          id: "jifj298hf183cf",
          name: "iphone 8",
          description: "A new iphone to show your firends",
          price: 3,
          seller: "0x0831934182udjh01ihwnxi0h8cdicwn",
        },
        {
          id: "82389328",
          name: "iphone 8",
          description: "A new iphone to show your firends",
          price: 3,
          seller: "0x0831934182udjh01ihwnxi0h8cdicwn",
        },
      ],
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
      web3Manager.connectToContract();
    },
    async sellNewArticle() {
      this.dialog = false;
      try {
        let rawArticle = await Web3Manager.publishArticle(this.newArticle.name, this.newArticle.description, this.newArticle.price, this.account);
        this.articles.push({
          name: rawArticle.name,
          description: rawArticle.description,
          price: rawArticle.price,
          seller: rawArticle.seller,
        });
      } catch (err) {
        alert(err);
      }
    },
  },
  components: {},
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
</style>


/*-------------- IPHONE 5 ----------------*/
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (orientation: portrait)


@media only screen and (min-device-width: 768px) and (max-device-width: 1024px)

/*-------------- HALF SCREEN ----------------*/
@media only screen and (min-device-width: 500px) and (max-width: 1000px) 


/*-------------- FULL SCREEN ----------------*/
@media only screen and (min-width: 1001px)