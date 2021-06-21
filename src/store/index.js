import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lockData: null,
        sessionData: null,
        helpData: null,
        parties: null,
        events: []
    },
    mutations: {
        setLockData(state, lockData)
        {
            state.lockData = lockData;
        },
        setSessionData(state, sessionData)
        {
            state.sessionData = sessionData;
        },
        setHelpData(state, helpData)
        {
            state.helpData = helpData;
        },
        setEvents(state, events)
        {
            state.events = events;
        },
        setParties(state, parties)
        {
            state.parties = parties;
        },
        clearData(state)
        {
            state.lockData = null;
            state.sessionData = null;
            state.events = [];
        }
    },
    actions: {
        async parseTxt(context, {file})
        {
            let text;
            try
            {
                text = await file.text();
            }
            catch(e)
            {
                throw 'Could not read text file';
            }
            
            const lines = text.split('\n').filter(line => line.length > 0);
            if(lines.length < 3)
            {
                throw 'Not enough lines in file';
            }
            
            const timestampRegex = /(\d+) (.*)/;
            const [lockdata, session, help] = lines.splice(0, 3).map(l => JSON.parse(l));
            
            let parties = [];
            
            const events = lines.filter(l => l.length > 0).map(l =>
            {
                const [,timestr, text] = timestampRegex.exec(l);
                if(text.length === 0) return null;
                
                let event = {};
                [, event.name, event.data] = JSON.parse(text);
                event.original = event.data;
                event.time = Number(timestr);
                if(event.data.data && Array.isArray(event.data.data.presences))
                {
                    event.data.data.presences = event.data.data.presences.map(presence =>
                    {
                        if(presence.private)
                        {
                            presence.private = JSON.parse(atob(presence.private));
                            
                            const existingParty = parties.find(party => party.id === presence.private.partyId);
                            const playerName = presence['game_name'] + '#' + presence['game_tag'];
                            if(existingParty)
                            {
                                if(!existingParty.players.includes(playerName))
                                {
                                    existingParty.players.push(playerName);
                                }
                            }
                            else
                            {
                                parties.push({
                                    id: presence.private.partyId,
                                    players: [playerName]
                                });
                            }
                        }
                        return presence;
                    });
                }
                return event;
            }).filter(e => e !== null);
            
            context.commit('setLockData', lockdata);
            context.commit('setSessionData', session);
            context.commit('setHelpData', help);
            context.commit('setParties', parties);
            context.commit('setEvents', events);
        }
    },
    modules: {}
});
