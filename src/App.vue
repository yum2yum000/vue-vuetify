<template>
  <v-app>

    <Navbar></Navbar>

      <router-view></router-view>



    <Footer></Footer>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar'
import Footer from './components/Footer'
    export default {
        name: 'App',
        components:{Navbar,Footer},




    };
</script>


<style >
  .flex-0{
    flex:90%;

  }
  .flex-1{
    flex:5%
  }
  .v-toolbar{
    flex:unset!important;
  }
  .mouse-pointer
  {
    cursor: pointer;
  }
  .font-15,.font-15 i
  {
    font-size: 15px!important;
  }
  .remove-focus::after {
    background-color: unset!important;
  }

  .v-application--is-ltr .v-responsive__sizer ~ .v-responsive__content {
    margin-left: unset!important;
    flex:100%!important;
  }

  .bg-none.theme--dark.v-card{
    background-color:unset!important;
  }
  .arrow-parent i{
    color: white!important;
  }
  .margin-top{
    margin-top: 1px!important;
  }
  .border-left{
    border-left: 1px solid gray!important;
  }
</style>
