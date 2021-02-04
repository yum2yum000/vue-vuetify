<template>
    <div style="margin-top:100px">
        <v-container  fluid>
            <v-row>
                <v-col lg="12">
                    <v-app id="inspire" style="direction:ltr">
                        <v-row justify="center">
                            <template v-if="!loading">
                                <v-col lg="12"  >
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
                            <v-col  cols="12"
                                    sm="12">
                                <v-card class="card-show" v-if="product.id!=undefined">
                                    <v-img :src="setImage(product.id)"
                                            height="300px"
                                    ></v-img>

                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class=" font-weight-black font-weight-bold">
                                                    {{product.title}}
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <div class="pl-4 mb-4">
                                            {{product.body}}
                                        </div>
                                    </v-list>

                                    <v-card-title class=" gray p-0 pr-2 pl-2">
                                        <router-link :to="{ name: 'userShow', params: { id: product.userId } }"  class="white--text no-text-decoration pl-2 font-3" v-if="!product.username">{{username}}</router-link>
                                        <router-link :to="{ name: 'userShow', params: { id: product.userId } }" class="white--text no-text-decoration pl-2 font-3" v-else>{{product.username}}</router-link>
                                        <v-spacer></v-spacer>

                                        <v-btn dark icon>
                                            <v-icon @click="dialog=true">mdi-delete</v-icon>
                                            <DeleteModal :dialog.sync="dialog"  @apply="remove( product.id)">
                                            </DeleteModal>
                                        </v-btn>

                                        <v-btn dark icon>
                                            <router-link class="no-text-decoration " :to="{ name: 'productEdit', params: { id: product.id } }">
                                                <v-icon class="text--white" style="color:white">mdi-pencil</v-icon>
                                            </router-link>
                                        </v-btn>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                           </template>
                        </v-row>

                    </v-app>
                </v-col>
            </v-row>

            <v-row>
                <template v-if="comments.length < 1 && !commentLoading">
                    <v-col lg="12"  v-for="i in 3" :key="i">
                        <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" class="pa-3">
                            <v-skeleton-loader
                                    class="mx-auto"
                                    type="text"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                </template>

                <template v-else>
                <v-col>
                    <div class="msg-container mb-2"  v-for="(item, index) in comments" :key="index">
                        <div class="msg right">
                            <header class="header">
                                <div class="font-weight-medium font-size-12 font-italic">{{item.name}}</div>
                                <div class="clearfix"></div>
                            </header>
                            <div class="content font-italic font-size-11">
                                {{item.body}}
                            </div>
                            <span class="font-italic font-size-10 font-weight-medium">{{item.email}}</span>
                            <v-icon class="font-size-10 font-weight-medium blue--text ">mdi-email</v-icon>
                        </div>

                        <div class="clearfix"></div>
                    </div>
                    <br>
                </v-col>
                </template>
            </v-row>
            <v-row>
            <v-col align="center" justify="center" >
            <div v-if="isItEmptyState">There is no data to show</div>
            </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
    import store from '@/store/store'
    import {mapState} from 'vuex'
    import DeleteModal from '@/components/Modal/DeleteModal'
    import ProductService from '@/services/ProductService.js'
    export default {
        name: "ProductShow",
        components:{DeleteModal},
        inject: {
            theme: {
                default: { isDark: false },
            },
        },
        data(){
           return{
                id:this.$route.params.id,
               comments:[],
               username:'',
               dialog: false,
               removeProduct:false,
               loading: false,
               commentLoading: false,

            }
        },
        created()
        {
            this.loading = false
            store.dispatch('product/fetchProduct', this.id).then(
                ()=>{
                    this.loading = true
                }
            ).catch(()=>{
                this.loading = true
                this.$router.push({ name: '404' })
            })

        },
        mounted()
        {
            this.fetchComments();
            window.scrollTo(0, 0)
        },
        watch: {
            product() {
                this.fetchUser();
            },
            notifications: function() { // watch it
                this.showmessage()

            },
        },
        methods: {
            showmessage(){
                const Toast = this.$swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer:2000,
                    timerProgressBar: true,

                })
                Toast.fire({
                    icon:this.notifications
                        .map(item => `${item.type}`)
                        .join(''),
                    title: this.notifications
                        .map(item => `${item.message}`)
                        .join(''),
                })


            },
            setImage(id)
            {
                let randomId= id+200
                return `https://picsum.photos/600/${randomId}`
            },

           fetchUser()
             {
             console.log('paeer',this.product.username)
             if (this.product !== null && this.product.username==undefined && this.removeProduct==false) {
                 console.log('ff')
             ProductService.getAuthorByiD(this.product.userId).then(res=>
             {
                 this.username= res.data.username
             })}
             },
            fetchComments(){
                this.commentLoading=false
                ProductService.getComments(this.id).then(res=>
                {
                    let comments=res.data
                    this.comments=this.getRandomValues(comments,5)


                }).catch(()=>{
                    this.commentLoading=true
                })
            },
            remove(value)
            {   this.removeProduct=true;
                store.dispatch('product/removeProduct',value).then(()=>{

                    let clientsArr =  JSON.parse(localStorage.getItem('deletedProduct')) || [];
                    clientsArr.push(this.deletedProduct);
                    localStorage.setItem('deletedProduct', JSON.stringify(clientsArr));

                    const path = `/`
                    if (this.$route.path !== path) this.$router.push(path)
                }).catch(()=>{
                      console.log(this.notifications)
                })
            },
            getRandomValues(arr, count){
             var result = [];
             var _tmp = arr.slice();
             for(var i = 0; i<count; i++){
            var index = Math.ceil(Math.random() * 10) % _tmp.length;
            result.push(_tmp.splice(index, 1)[0]);
           }
            return result;
           }
        },
        computed:{
            ...mapState('product',['product']),
            ...mapState('product',['deletedProduct']),
            ...mapState('notification',['notifications']),
            isItEmptyState(){
                return(this.comments.length < 1 && this.commentLoading)
            },
        }
    }
</script>

<style scoped>

</style>