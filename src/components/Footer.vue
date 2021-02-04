<template>
    <v-footer dark padless class="mt-5">
        <v-card class="flex " flat tile>
            <v-card-text class="py-2 white--text text-center ">
                {{ new Date().getFullYear() }} — <strong>Mehrnoosh</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        data()
        {
            return{
                icons: [
                    'mdi-facebook',
                    'mdi-twitter',
                    'mdi-linkedin',
                    'mdi-instagram',
                ],
            }
        }
    }
</script>

<style scoped>

</style>