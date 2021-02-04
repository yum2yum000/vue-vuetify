<template>
    <div  style="margin-top:60px">

        <v-card class="mx-auto"  tile>
            <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>

        </v-card>


        <v-container fluid>
            <v-row class="margin-users">
                <template v-if="user.length < 1 && !userloading">
                    <v-col col="6" class="mt-5">
                        <br><br><br>
                        <v-sheet
                                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                                class="pa-3">
                            <v-skeleton-loader
                                    class="mx-auto"
                                    max-height="20px"
                                    type=" list-item-avatar-two-line"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                </template>

                <template v-else>
                    <v-col  sm="6" class="text-right" xl="3">
                        <v-list-item-avatar size="100">
                            <img :src="'https://ui-avatars.com/api/?name='+user.name" alt="">
                        </v-list-item-avatar>
                    </v-col>

                <v-col style="direction:ltr" class="order-mobile" xl="5"  lg="10" sm="12" v-if="typeof this.user==='object'">
                    <v-list-item-content>
                        <v-list-item-title class="title white--text hidden-mobile" style="margin-top:20px;">company</v-list-item-title>
                        <v-list-item-subtitle  v-if="typeof user.address==='object'">
                            <v-icon class="font-5  black--text">mdi-home</v-icon>
                            <span class="margin-5 black--text">{{user.address['sutie']}}</span>
                            <span class="margin-5 black--text">{{user.address['street']}}</span> |
                            <span class="margin-5 black--text">{{user.address['city']}}</span> |
                            <span class="margin-5 black--text">{{user.address['zipcode']}}</span>
                        </v-list-item-subtitle>

                        <v-list-item-subtitle  v-if="typeof user.company==='object'">
                            <v-icon class="font-5  black--text">mdi-city</v-icon>
                            <span class="margin-5 black--text">{{user.company['bs']}}</span> |
                            <span class="margin-5 black--text">{{user.company['name']}}</span>
                            <br>
                            <v-icon class="font-5  black--text">mdi-bulletin-board</v-icon>
                            <span class="margin-5 black--text">{{user.company['catchPhrase']}}</span>
                            <br>
                            <v-icon class="font-5  black--text">mdi-account</v-icon>
                            <span class="margin-5 black--text">{{user.username}}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-col>

                <v-col lg="4" xl="4" v-if="typeof this.user==='object'">
                    <v-list-item-content>
                        <v-list-item-title class="title black--text" style="margin-top:23px;">{{user.name}}</v-list-item-title>
                        <v-list-item-subtitle >
                            <span class="margin-5  black--text">{{user.email}}</span>
                            <v-icon v-if="user.email" class="font-5 black--text">mdi-email</v-icon>
                            <br>
                            <span class="margin-5  black--text">{{user.phone}}</span>
                            <v-icon v-if="user.phone" class="font-5  black--text">mdi-phone</v-icon>
                            <br>
                            <span class="margin-5  black--text">{{user.website}}</span>
                            <v-icon v-if="user.website" class="font-5  black--text">mdi-web</v-icon>
                        </v-list-item-subtitle>

                        <v-list-item-subtitle  v-if="typeof user.address==='object'">
                            <span class="margin-5  black--text">{{user.address['city']}}</span> |
                            <span class="margin-5 black--text">{{user.address['street']}}</span>
                            <v-icon class="font-5  black--text">mdi-city</v-icon>

                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-col>
                </template>

            </v-row>

            <v-row class="mb-3">
                <v-col class="mb-5" align="center" justify="center" >
                    <div v-if="isItEmptyUser">There is no data to show</div>
                </v-col>
            </v-row>

            <hr class="style13"  />
        <v-row class="mr-0 ml-0 mt-30">

            <template v-if="getUserProducts.length < 1 && !loading">
              <v-col col="4"  v-for="i in 3" :key="i">
                  <v-sheet
                          :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                          class="pa-3">

                      <v-skeleton-loader
                                          class="mx-auto"

                                          type="card"
                      ></v-skeleton-loader>
                  </v-sheet>
              </v-col>
            </template>

            <template v-else>
                <productCard v-for="product in getUserProducts" :key="product.id" :product="product">
                </productCard>
            </template>
        </v-row>

            <v-row class="mb-3">
                <v-col class="mb-5" align="center" justify="center" >
                    <div class="mb-5" v-if="isItEmptyState">There is no data to show</div>
                    <br><br><br>
                </v-col>
            </v-row>

        </v-container>



    </div>
</template>

<script>
    import ProductService from '@/services/ProductService.js'
    import productCard  from '@/components/ProductCard'
    import store from '@/store/store'

    // Import stylesheet



    export default {
        inject: {
            theme: {
                default: { isDark: false },
            },
        },

        components:{
            productCard
        },
        mounted() {
            window.scrollTo(0, 0)
            this.fetchUser()
        },
        data() {
            return {
                user:[],
                loading: false,
                userloading: false,
                fullPage: true,
                id:this.$route.params.id
            }
        },
        async created()
        {
            this.loading=false
            await store.dispatch('product/fetchProductByUserId',
                {
                    'userId':this.id,

                }

            ).then(
                ()=>{

                }
            ).catch(()=>{
                this.loading = true
            });
        },

        methods: {
            fetchUser(){
                this.userloading=false
                ProductService.getAuthorByiD(this.id).then(res=>
                {
                    this.user=res.data
                    console.log(this.user)
                }).catch(()=>{
                    console.log('usereeror')
                    this.userloading = true
                });
            },



        },
        computed:{
            isItEmptyState() {
                return this.getUserProducts.length < 1 && this.loading
            },
            isItEmptyUser() {
                return this.user.length < 1 && this.userloading
            },
            getUserProducts()
            {
                return store.getters['product/getUserProducts']
            }
        },



    }
</script>

<style scoped>

</style>