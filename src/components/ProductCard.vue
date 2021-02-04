<template>
    <v-col class=" child-flex " cols="12" sm="6" md="4" lg="4">
        <router-link :to="{ name: 'productShow', params: { id: product.id } }" class="text-decoration-none">
       <v-card class="mx-auto pb-1 custom-card-1">
           <v-img
                   class="white--text align-end"
                   height="200px"
                   :src="setImage(product.id)"
           ></v-img>
           <v-card-subtitle class="pb-0 text-center">
               <span class="black--text">...{{product.title.substr(0, 30)}}</span>
               <br>
               <router-link class="no-text-decoration author-hover" :to="{ name: 'userShow', params: { id: product.userId } }">
                   <div class="orange--text">
                       <span v-if="product.username" class="range--text authur-font author">By {{product.username}}</span>
                   </div></router-link>
           </v-card-subtitle>
       </v-card>
   </router-link>
      </v-col>
</template>

<script>
    export default {
        name: "ProductCard",
        props:{
            product:Object
        },
        data: () => ({
            selection: 1,
            selectedImage: null,
        }),
        computed:{

        },
        created() {

        },
        methods: {
            setImage(id)
            {
               let randomId= id+200
                return `https://picsum.photos/600/${randomId}`
            },
        },
    }
</script>

<style scoped>
.tag{
    padding-top: 0px;
    background-color: #30b030;
    top: 0;
    display: inline-flex;
    position: absolute;
    font-size: 16px;
    padding-bottom: 0px;
    border-radius: 3px;
}
    .text-white{
        color:white;
    }

    .height-card
    {

    }
    .mt-20{
            margin-top:5px!Important;
    }
</style>