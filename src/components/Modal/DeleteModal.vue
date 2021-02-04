<template>
  <div style="direction:ltr">
      <v-layout row justify-center >
          <v-dialog v-model="dialog" persistent max-width="390" >
              <v-card>
                  <v-card-title class="headline">Are u sure to delete this item?</v-card-title>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click.native="close">Close</v-btn>
                      <v-btn color="green darken-1" text @click.native="apply">yes</v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
      </v-layout>
  </div>
</template>

<script>
    export default {
        name: "DeleteModal",
        props: {
            dialog: {
                default: false
            }
        },
        methods: {
            close() {
                this.$emit('update:dialog', false)
            },
            apply()
            {
                this.$emit('apply')
            }
        }
    }
</script>

<style scoped>

</style>