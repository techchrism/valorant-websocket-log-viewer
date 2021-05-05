<template>
    <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
            <v-btn icon v-bind="attrs" v-on="on" @click="toggleMode">
                <v-icon>{{oppositeIcon}}</v-icon>
            </v-btn>
        </template>
        <span>Use {{oppositeModeName}} Mode</span>
    </v-tooltip>
</template>

<script>
import localforage from 'localforage';
export default {
    name: 'DarkButton',
    computed: {
        oppositeIcon()
        {
            return 'mdi-' + (!this.$vuetify.theme.dark ? 'weather-night' : 'white-balance-sunny');
        },
        oppositeModeName()
        {
            return (!this.$vuetify.theme.dark ? 'Dark' : 'Light');
        }
    },
    methods: {
        toggleMode()
        {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
    },
    watch: {
        '$vuetify.theme.dark': function(dark)
        {
            localforage.setItem('theme', dark ? 'dark' : 'light');
        }
    },
    mounted()
    {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e =>
        {
            this.$vuetify.theme.dark = e.matches;
        });
    }
};
</script>

<style scoped>

</style>
