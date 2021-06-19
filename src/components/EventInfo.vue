<template>
    <div class="ma-5">
        <h1>{{event.name}}</h1>
        <h3 v-if="eventHelp">{{eventHelp}}</h3>
        <v-card>
            <v-card-title>JSON Data</v-card-title>
            <v-card-text>
                <pre>{{dataFormatted}}</pre>
            </v-card-text>
        </v-card>
        <v-card v-if="privateData" class="mt-5">
            <v-card-title>Private Data</v-card-title>
            <v-card-text>
                <pre>{{JSON.stringify(privateData, null, 4)}}</pre>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'EventInfo',
    props: {
        event: Object
    },
    computed: {
        dataFormatted()
        {
            return JSON.stringify(this.event.data, null, 4);
        },
        eventHelp()
        {
            return this.$store.state.helpData[this.event.name];
        },
        privateData()
        {
            // Stuff broke with optional chaining and I didn't feel like figuring it out
            if(this.event.data &&
                this.event.data.data &&
                this.event.data.data.presences &&
                this.event.data.data.presences[0].private)
            {
                return JSON.parse(atob(this.event.data.data.presences[0].private));
            }
            else
            {
                return null;
            }
        }
    }
};
</script>

<style scoped>

</style>
