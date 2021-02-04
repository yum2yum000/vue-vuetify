<template>

  <div class="home">
    <v-carousel  cycle light continuous class=" arrow-parent"  height="650"
                delimiter-icon="stop"
                :prev-icon="false"
                :next-icon="true" >
      <v-carousel-item
              src="@/assets/images/bg.jpg"
              reverse-transition="fade-transition"
              transition="fade-transition">

        <v-container
                fill-height
                fluid
                pa-0 ma-0 pb-3

        >

        </v-container>
      </v-carousel-item>

      <v-carousel-item
              src="@/assets/images/bg2.jpg"
              reverse-transition="fade-transition"
              transition="fade-transition">

        <v-container
                fill-height
                fluid
                pa-0 ma-0 pb-3

        >

        </v-container>
      </v-carousel-item>
    </v-carousel>

    <v-container fluid>
      <v-row no-gutters >


        <v-col class="child-flex justify-center" cols="12" lg="12" xl="12">

          <productList></productList>

        </v-col>

      </v-row>
    </v-container>



  </div>
</template>

<script>
    // @ is an alias to /src
    import productList  from '@/components/ProductList'

    export default {
        name: 'Home',
        components: {
            productList
        },
        methods:{

        },

    }
</script>
