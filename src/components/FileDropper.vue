<template>
    <div>
        <form enctype="multipart/form-data" novalidate>
            <div :class="boxClass"
                 @dragenter="dragenter"
                 @dragleave="dragleave"
            >
                <input type="file" class="file-input" ref="fileInput" @change="filesChanged" accept=".txt">

                <div class="text-center padding no-click upload-msg">
                    <template v-if="!loading">
                        <h3>Drag or Click to Upload WebSocket Log</h3>
                    </template>

                    <template v-if="loading">
                        <v-progress-circular indeterminate/><br>
                        <h3>Loading...</h3>
                    </template>
                </div>
            </div>
        </form>

        <v-alert v-if="error" type="error" class="file-error">
            {{error}}
        </v-alert>
    </div>
</template>

<script>
export default {
    name: 'FileDropper',
    computed: {
        boxClass()
        {
            return {
                'upload-box': true,
                'upload-hovering': this.isHovering
            };
        }
    },
    methods: {
        dragenter()
        {
            this.isHovering = true;
        },
        dragleave()
        {
            this.isHovering = false;
        },
        async filesChanged(event)
        {
            this.isHovering = false;
            this.loading = true;
            this.error = '';
            const file = event.target.files[0];
            try
            {
                await this.$store.dispatch('parseTxt', {file});
            }
            catch(e)
            {
                this.error = e.toString();
            }
            this.loading = false;
        }
    },
    data()
    {
        return {
            isHovering: false,
            loading: false,
            error: ''
        }
    }
};
</script>

<style scoped>
.padding
{
    padding: 30px;
}
.no-click
{
    pointer-events: none;
}
.file-error
{
    width: fit-content;
    margin: 20px auto 0;
}
.file-input
{
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0;
    cursor: pointer;
}
.upload-box
{
    margin: 50px auto 0;
    border-color: #007bff;
    transition: border-color 0.5s ease-in-out, padding 0.5s ease-in-out, margin 0.5s ease-in-out;
    border-style: dashed;
    border-radius: 5px;
    position: relative;
    width: fit-content;
}
.upload-msg
{
    cursor: pointer;
}
.upload-hovering
{
    padding: 20px;
    margin-top: 40px;
    border-color: #28a745;
}
</style>
