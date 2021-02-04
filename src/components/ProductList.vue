<template>
    <div class="mt-5">
        <v-row class="mt-5"></v-row>
        <v-row class="mr-0 ml-0 mt-5">
            <template v-if="products.length < 1 && !loading">
                <v-col  lg="4" v-for="i in 3" :key="i"  >
                    <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" class="pa-3">
                        <v-skeleton-loader
                                class="mx-auto"
                                type="card"
                        ></v-skeleton-loader>
                    </v-sheet>
                </v-col>
            </template>
            <template v-else>
                <productCard v-for="product in products" :key="product.id" :product="product"></productCard>
            </template>
            <br>
        </v-row>
        <v-row align="center"
               justify="center" >
            <v-pagination v-if="products.length >1"
                    v-model="currentPage"
                    :length="parseInt(eventsTotal/perPage)" @input="getProducts(currentPage)"
            ></v-pagination>

        </v-row>
        <v-row>
           <v-col align="center" justify="center" >
               <div v-if="isItEmptyState">There is no data to show</div>
           </v-col>
        </v-row>

    </div>
</template>

<script>
    import productCard  from '@/components/ProductCard'
    import store from '@/store/store'
    import {mapState} from 'vuex'
    export default {
        name: "ProductList",
        inject: {
            theme: {
                default: { isDark: false },
            },
        },
        components: {
            productCard
        },
        mounted(){

        },
        created(){
            this.$store.dispatch('product/fetchUsers', null).then(()=>
            {


            }).catch(()=>
            {

            });
            this.getProducts();
        },
        data(){
            return{
                perPage:24,
                loading: false
              }
        },
        computed:{
            ...mapState('product',['products','eventsTotal','stateCurrentpage']),
            ...mapState('notification',['notifications']),
            isItEmptyState() {
                return this.products.length < 1 && this.loading
            },
            currentPage: {
                get() {
                    return parseInt(this.$route.query.page||1);
                },
                set(newPage) {
                    // You could alternatively call your API here if you have serverside pagination
                    this.$router
                        .push({ query: { ...this.$route.query, page: newPage } })
                        .catch(() => {});
                }},
        },
        methods:{
            getProducts(currentPage)
            {
                this.loading = false
                store.dispatch('product/fetchProducts',{
                perPage:this.perPage,
                page:currentPage,
            }).then(()=>{
                    if(this.$route.query.page==undefined && this.stateCurrentpage!=null)
                    {
                        this.currentPage=this.stateCurrentpage>0?this.stateCurrentpage:1
                    }
                }).catch(()=>{
                    this.loading=true
                })
            },
            showmessage(){
                const Toast = this.$swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer:2000,
                    timerProgressBar: true,
                })
                Toast.fire({
                    icon: 'success',
                    title: this.notifications
                        .map(item => `${item.message}`)
                        .join(''),
                })
            }
        },
        watch: {
            notifications: function() { // watch it
                this.showmessage()

            },
            '$route': function(v1,v2){
                if(v1.query.page==undefined && v2.query.page!=undefined && v1.name=='Home' && v2.name=='Home')
                {

                    this.getProducts(1)
                    this.currentPage=1
                }
            }

        },
    }
</script>

<style>
    body.swal2-toast-shown .swal2-container.swal2-bottom-end, body.swal2-toast-shown .swal2-container.swal2-bottom-right
    {
        left:0!important;
        justify-content: center!important;
    }
</style>