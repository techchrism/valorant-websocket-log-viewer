<template>
    <v-list-item :key="index" :value="index" class="event-item">
        <v-list-item-content>
            <v-list-item-title>
                {{event.name.replace('OnJsonApiEvent_', '')}}
            </v-list-item-title>
            <v-list-item-subtitle v-if="presenceData">
                {{presenceData.playerName}}
                <span v-if="presenceData.party.players.length > 1"> + {{presenceData.party.players.length - 1}}</span>
                <span v-if="presenceData.status"> {{presenceData.status}}</span>
                <span v-if="presenceData.map">, {{presenceData.map}}</span>
                <span v-if="presenceData.mode">, {{presenceData.mode}}</span>
                <span v-if="presenceData.map">, {{presenceData.allyScore}} - {{presenceData.enemyScore}}</span>
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <span class="text--secondary">{{hoursmins}}</span>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    name: 'EventListElement',
    props: {
        index: Number,
        event: Object
    },
    computed: {
        hoursmins()
        {
            const dt = new Date(this.event.time);
            return (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ':' +
                (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
        },
        presenceData()
        {
            if(this.event.data.data && Array.isArray(this.event.data.data.presences) &&
                this.event.data.data.presences.length === 1 && this.event.data.data.presences[0].private)
            {
                const presence = this.event.data.data.presences[0];

                const partyId = presence.private.partyId;
                const playerName = presence['game_name'];
                const party = this.$store.state.parties.find(party => party.id === partyId);

                const status = {
                    'INGAME': 'in game',
                    'MENUS': 'in menus',
                    'PREGAME': 'pre-game'
                }[presence.private['sessionLoopState']];
                const map = {
                    '/Game/Maps/Ascent/Ascent': 'Ascent',
                    '/Game/Maps/Bonsai/Bonsai': 'Split',
                    '/Game/Maps/Duality/Duality': 'Bind',
                    '/Game/Maps/Foxtrot/Foxtrot': 'Breeze',
                    '/Game/Maps/Port/Port': 'Icebox',
                    '/Game/Maps/Poveglia/Range': 'The Range',
                    '/Game/Maps/Triad/Triad': 'Haven'
                }[presence.private['matchMap']];

                return {
                    playerName,
                    party,
                    status,
                    map,
                    mode: presence.private['queueId'],
                    allyScore: presence.private['partyOwnerMatchScoreAllyTeam'],
                    enemyScore: presence.private['partyOwnerMatchScoreEnemyTeam']
                }
            }
            return null;
        }
    }
};
</script>

<style scoped>
.event-item
{
    height: 62px;
}
</style>
