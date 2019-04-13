<template>
  <div id="accounts-create-edit-view">

    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Add Account</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'accountsList' }" class="button"> View all accounts &#8630;</router-link>
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-6">
        <!-- '.prevent' stops the page from reloading on submit -->
        <form class="form" @submit.prevent="processSave">
          <label for="name" class="label">Name</label>
          <p class="control">
                                                    <!-- v-model is vue magic -->
            <input type="text" class="input" name="name" v-model="selectedAccount.name">
          </p>
          <label for="category" class="label">Category</label>
          <p class="control">
            <span class="select">
              <select name="category" v-model="selectedAccount.category">
                <option v-for="value, key in categories" :value="key">{{ value }}</option>
              </select>
            </span>
          </p>
          <label for="balance" class="label">Balance</label>
      <!-- if block -->    
          <p class="control has-icon" v-if="!editing">
            <input type="number" class="input" name="balance"
                   step="0.01" v-model="selectedAccount.balance">
            <span class="help">Use negative values for accounts that carry a negative balance, e.g. credit cards</span>
            <span class="icon">
              <i class="fa fa-usd" aria-hidden="true"></i>
            </span>
          </p>
      <!-- end if block, beginning of correlating else -->    
          <p v-else>
            <span>To update your balance, add a balance adjusting transaction.</span>
          </p>
          <div class="control is-grouped">
            <p class="control">
              <button class="button is-success">Submit</button>
            </p>
            <p class="control">
              <router-link :to="{ name: 'accountsList' }"><button class="button is-link">Cancel</button></router-link>
            </p>
          </div>
        </form>
      </div>
    </div>


  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { CATEGORIES } from '../../../consts';

export default {
  name: 'accounts-create-edit-view',
  props: ['accountId'], // used for passing data from parent to child

  data: () => {
    return {
      categories: CATEGORIES,
      editing: false,
      selectedAccount: {}
    };
  },

  mounted () {
    if (this.accountId) {
      this.loadAccount();
    }
  },

  methods: {
    ...mapActions([
      'createAccount',
      'updateAccount',
      'loadAccounts'
    ]),

  /**
   * This method grabs our edited accounts
   * and reloads it back to the account list
   */
    resetAndGo () {
      this.selectedAccount = {};
      this.$router.push({ name: 'accountsList' });
    },

    /**
     * Saves new account and adds it to
     * the account list.
     */
    saveNewAccount () {
      this.createAccount(this.selectedAccount).then(() => {
        this.resetAndGo();
      });
    },

  /**
   * Saves updated account and adds it to
   * the account list.
   */
    saveAccount () {
      this.updateAccount(this.selectedAccount).then(() => {
        this.resetAndGo();
      });
    },

    /**
     * Saves account values upon submit
     */
    processSave () {
      this.editing ? this.saveAccount() : this.saveNewAccount();
    },

  /**
   * Load accounds, getting by account Id.
   * if an accounted is selected via the edit
   * button, set edit to true.
   */
    loadAccount () {
      let vm = this;
      this.loadAccounts().then(() => {
        let selectedAccount = vm.getAccountById(vm.accountId);
        if (selectedAccount) {
          vm.editing = true;
          vm.selectedAccount = Object.assign({}, selectedAccount);
        }
      // TODO: Error handing: what if object does not exist?
      });
    }
  },

  computed: {
    ...mapGetters([
      'getAccountById'
    ])
  },

  /**
   * listens to the component data and runs
   * whenever an identified property changes.
   */
  watch: {
    accountId (newId) {
      if (newId) {
        this.loadAccount();
      }
      this.editing = false;
      this.selectedAccount = {};
    }
  }
};
</script>

<style scoped lang='scss'>
#accounts-create-edit-view {
}
</style>
