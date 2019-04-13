<template>
  <div id="navigation-view">
    <ul>
      <li>
    <!-- User navigation within the app. 
        (<a href="">) for component navigation. -->    
        <router-link :to="{ name: 'accountsList' }">Accounts</router-link>
        <ul>
          <li v-for="account in accounts">
            <router-link :to="{ name: 'updateAccount', 
                          params: { accountId: account.id } }">

              {{ account.name }} <span>${{ account.balance }}</span>
            </router-link>
          </li>
        </ul>
      </li>
      <li><router-link :to="{ name: 'budgetsList' }">Budgets</router-link></li>
      <li><router-link :to="{ name: 'transactionsList' }">Transactions</router-link></li>
    </ul>
  </div>
</template>

<script>
// track actions and changes to state within application
import { mapActions, mapState } from 'vuex';

export default {
  name: 'navigation',

  /*
    gives access to reactive components.
    lifecycle hook for fetching data for
    a component.
  */
  mounted () {
    this.loadAccounts();
  },

  /*
  functions that are bound to the vue instance.
  will only be evaluated when explicitly called.
  */
  methods: {
    ...mapActions(['loadAccounts'])
  },

  /*
  derived values that are automatically updated whenever
  changes are made. Computed properties are referenced
   the same as a data property.
  */
  computed: {
    ...mapState({
      accounts: state => state.accounts.accounts
    })
  }
};
</script>

<style scoped lang='scss'>
  ul {
    margin-top: 50px;

    li {
      border-bottom: 2px solid rgb(31, 78, 93);
      font-size: 1.8em;
      padding-left: 20px;
      margin: 18px 20px;

      a {
        color: #ffffff;
      }

      ul {
        margin-top: 20px;

        li {
          font-size: 0.6em;
          border: none;

          span {
            float: right;
          }
        }
      }
    }
  }
</style>
