<template>
    <div>
        <v-navigation-drawer app right temporary v-model="sideNav" class="p-3">
        <v-list v-for='(item,index) in items' :key="index">
            <v-list-group  :append-icon=" item.isSubMenu ? 'fa fa-angle-down': ''" >
                <template v-slot:activator>
                    <v-list-item-title>
                        <router-link class="no-text-decoration" :to="item.route"> {{item.menuTitle}}</router-link></v-list-item-title>
                </template>
                <v-list-group sub-group v-for="(it,index3) in item.item" :key="index3" v-model="it.title" append-icon="fa fa-angle-down" prepend-icon="fa fa-angle-down">
                    <template v-slot:activator >
                        <v-list-item-content style="order:-1" >
                            <v-list-item-title >{{it.headTitle}}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item class="pl-2" v-for="(subItem) in it.subtitle" :key="subItem">
                        <v-list-item-content >
                            <v-list-item-title  >{{ subItem }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
        </v-list>
        </v-navigation-drawer>

        <v-app-bar fixed>
            <v-icon :class="{'flex-0 text-right d-block remove-focus': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}"
                    @click.stop="sideNav = !sideNav"
                    class="hidden-sm-and-up ">fas fa-bars</v-icon>
            <v-toolbar-title :class="{'flex-1 text-right': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}">
                <router-link  to="/" tag="span" style="cursor: pointer" class="flex-1">
                    <v-icon>fas fa-user</v-icon>
                </router-link>
            </v-toolbar-title>

            <v-toolbar-items class="hidden-xs-only hidden-sm-only justify-center flex-grow-1 ">
                <v-menu  left v-for='(item,index) in items' :close-on-content-click="false"  bottom offset-y :key="index">
                    <template v-slot:activator="{ on }" >
                        <v-toolbar-title  class="mr-5 mt-4 mouse-pointer" color="primary" dark v-on="on">
                            <v-icon class="font-15" v-if="item.isSubMenu" >fa fa-angle-down</v-icon>
                            <router-link class="no-text-decoration" :to="item.route"> {{item.menuTitle}}</router-link>
                        </v-toolbar-title>
                    </template>

                    <v-list v-if="item.isSubMenu" >
                        <v-list-group class="font-15" v-for="(it,index) in item.item" :key="index" v-model="it.title">
                            <template  v-slot:activator>
                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title  style="direction:ltr!important" >{{ it.headTitle }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>

                            <v-list-item v-for="(subItem,index) in it.subtitle" :key="index">
                                <v-list-item-content>
                                    <v-list-item-title  class="pr-4">{{ subItem }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-menu>
            </v-toolbar-items>

            <v-toolbar-title :class="{'flex-1 text-left': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}">
                <router-link  to="/" tag="span" style="cursor: pointer">
                    <v-menu open-on-hover :open-on-click="false"  v-model="menuOpen"  offset-y :close-on-content-click='false'   >
                        <template c v-slot:activator="{ on, attrs }">
                            <v-toolbar-title v-bind="attrs" v-on="on">
                                <title id="cart">
                                    Shopping Cart
                                </title>
                                <div class="shopping-quantity d-flex">
                                    <v-icon>fas fa-shopping-basket</v-icon>
                                    <div class="count" >
                                        <span class="type" >0</span>
                                    </div>
                                </div>
                            </v-toolbar-title >
                        </template>
                        <v-list class="w-100 pr-2">
                            <v-list-item class="d-flex flex-column align-stretch height-cart">
                                <v-list-item-title  class="pt-2">
                                    Your basket is empty
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </router-link>
            </v-toolbar-title>
        </v-app-bar></div>
</template>

<script>
    import EventBus  from '@/event-bus.js';
    export default {
        name: "Navbar",
        data () {
            return {
                sideNav: false,
                items: [
                    {
                        menuTitle: 'home',
                        isSubMenu:false,
                        route:'/'
                    },
                    {
                        menuTitle: 'contact',
                        isSubMenu:false,
                        route:'/contact'
                    },
                    {
                        menuTitle: 'articles',
                        isSubMenu:true,
                        route:'',
                        item: [
                            {
                                headTitle:'nothing',
                                subtitle:['nothing','nothing']
                            },

                        ]

                    },
                    {
                        menuTitle: 'about',
                        isSubMenu:false,
                        route:'/about'
                    }
                ],
                shown:false,
                menuOpen:false

            }
        },
        computed:{

        },
        methods:{
            showMenu(value){
                this.menuOpen=value;
                setTimeout(() => this.menuOpen = false, 2000);
            }
        },
        mounted () {
            EventBus.$on('shown', (payload) => {
                this.showMenu(payload)
            })
        },
        watch:{

        }

    }
</script>

<style scoped>
    .shopping{
        position: relative;
    }
    .shopping-quantity{
        position: relative;
        color: white;
    }
    .shopping-quantity .count
    {
        background-color: red;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: relative;
        left: 20%;
        top: 0px;
        font-size:12px;
    }
    .type{

        top:53%;
        left:50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
    .w-100{
        width:200px!important;
    }
    .w-50{
        width:120px;
    }
    .flex-47{
        flex:0 47%;
    }
    .flex-60{
        flex:0 60%;
    }
    .flex-40{
        flex:0 40%;
    }
    .flex-3{
        flex:0 3%;
    }
    .cursur{
        cursor: pointer;
    }
    .p-0{
        padding: 0!important;
    }
    .p-5{
        padding: 7px;
    }
    .pt-0{
        padding-top: 0;
    }
    .line{
        border-bottom: 1px solid #f2eee8;
    }
    .v-application a {
        color: black;
    }

    .height-cart{
        min-height: 20px!important;
    }
    .font-10{
        font-size:14px!important;
    }
    .total{
        position: relative;
        top: 4px;
    }
    .text-white{
        color:white!important;
    }
    .flex-1{
        flex:15%!Important;
    }

</style>