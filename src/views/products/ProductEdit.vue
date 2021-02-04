<template>
    <v-container   style="margin-top:200px;margin-bottom:100px;direction:ltr">
            <v-row align="center"
                   justify="center">
                <v-col lg="8" class="shadow-form">
                    <form>
                        <v-text-field
                                v-model="product.title"
                                :error-messages="titleErrors"
                                :counter="70"
                                label="title"
                                required
                                @input="$v.product.title.$touch()"
                                @blur="$v.product.title.$touch()"
                        ></v-text-field>
                        <br><br>
                        <v-textarea
                                v-model="product.body"
                                :error-messages="bodyErrors"
                                label="body"
                                required
                                @input="$v.product.body.$touch()"
                                @blur="$v.product.body.$touch()"
                        ></v-textarea>

                        <br>
                        <v-btn class="orange mr-4 white--text" @click="submit">
                            submit
                        </v-btn>
                        <v-btn class="blue mr-4 white--text" @click="clear">
                            clear
                        </v-btn>
                    </form>
                </v-col>
            </v-row>
        </v-container>

</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength } from 'vuelidate/lib/validators'
    import store from '@/store/store'
    import {mapState} from 'vuex'
    export default {
        name: "ProductEdit",
        mixins: [validationMixin],

        validations: {
            product:{
                title: { required, maxLength: maxLength(70) },
                body: { required },
            }
            
        },

        data(){
            return{
                id:this.$route.params.id,
                
            }
        },
        methods:{
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
            submit () {
                this.$v.$touch()
                if(!this.$v.$invalid){
                    this.isLoading=true;
                    store.dispatch('product/editProduct',this.product).then(()=>{
                        let clientsArr =  JSON.parse(localStorage.getItem('editedProduct')) || [];
                        clientsArr.push(this.editedProduct);
                        localStorage.setItem('editedProduct', JSON.stringify(clientsArr));

                        const path = `/`
                        if (this.$route.path !== path) this.$router.push(path)

                    })}
            },
            clear () {
                this.$v.$reset()
                this.product.title = null,
                this.product.body = null
                
            },
        },
        created()
        {
            store.dispatch('product/fetchProduct', this.id).then(
                ()=>{

                }
            ).catch(()=>{
                // this.$router.push({name:'404'})
            })

        },
        watch:
        {
            notifications: function() { // watch it
                this.showmessage()

            },
        },
        computed:{
            ...mapState('product',['product','editedProduct']),
            ...mapState('notification',['notifications']),
           titleErrors () {
                const errors = []
               console.log( !this.$v.product.title.maxLength)
                if (!this.$v.product.title.$dirty) return errors
                !this.$v.product.title.maxLength && errors.push('Name must be at most 10 characters long')
                !this.$v.product.title.required && errors.push('Name is required.')
                return errors
            },
            bodyErrors () {
                const errors = []
                if (!this.$v.product.body.$dirty) return errors
                !this.$v.product.body && errors.push('Must be valid body')
                !this.$v.product.body.required && errors.push('Body is required')
                return errors
            },
        }
    }
</script>

<style scoped>
    .v-footer{
        bottom: 0!important;
        width: 100%!important;
        position: fixed!important;
    }
</style>