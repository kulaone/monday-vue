<template>
    <div>
        <h1>Monday SDK capabilities check</h1>
        <div class="sectionDiv">
            Monday.get:
            <button v-for="(rType, index) in requestTypes" :key="index" @click="getRequest(rType.value)">{{
                    rType.text
            }}</button>
        </div>
        <div class="sectionDiv">
            Monday.api: <input id="query" type="text" class="apiInput" v-model="queryText" />
            <button @click="apiTest">API Test</button>
        </div>
        <div class="sectionDiv">
            Monday.execute:
            <div>
                - Notice <input id="notice" type="text" class="noticeInput" v-model="noticeText" />
                Type: <select v-model="noticeSelected">
                    <option v-for="option in noticeOptions" :key="option.value" v-bind:value="option.value">
                        {{ option.text }}
                    </option>
                </select>
                <button @click="sendMessage">Send notice</button>
            </div>
            <div>
                - Confirm <button @click="sendDialog">Send confirm</button>
            </div>
        </div>
        <div class="sectionDiv">
            Monday.storage:
            Key <input type="text" v-model="storageKey" />
            Value <input type="text" v-model="storageValue" />
            <button @click="storeGet">Get</button>
            <button @click="storeSet">Set</button>
        </div>
        <div>{{ resultsError }}</div>
        <json-viewer :value="resultsJson" :expand-depth=5 copyable boxed sort></json-viewer>

    </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
    inject: ["monday"],
    components: {
        JsonViewer
    },
    data() {
        return {
            resultsText: null,
            resultsError: null,
            resultsJson: null,
            queryText: 'query { me { is_guest created_at name id } }',
            noticeText: 'A message to dispaly for uesr',
            noticeSelected: 'success',
            noticeOptions: [
                { text: 'Success', value: 'success' },
                { text: 'Error', value: 'error' },
                { text: 'Info', value: 'info' }
            ],
            requestTypes: [
                { text: 'Context', value: 'context' },
                { text: 'Settings', value: 'settings' },
                { text: 'Item Ids', value: 'itemIds' },
                { text: 'Session Token', value: 'sessionToken' },
                { text: 'Filter', value: 'filter' },
            ],
            storageKey: 'theKey',
            storageValue: '42',
        };
    },
    methods: {
        async apiTest() {
            try {
                const res = await this.monday.api(this.queryText);
                this.updateResults(res);
            } catch (e) {
                this.resultsError = `Error. Make sure you app has permissions for API. ${e}`
            }

        },
        updateResults(res) {
            this.resultsText = '';
            this.resultsError = '';
            if (res) {
                this.resultsJson = res;
                this.resultsText = JSON.stringify(res)
            } else {
                this.resultsJson = null
                this.resultsError = `Error. Make sure you app has permissions for API.`
            }
            console.log(this.resultsText)
        },
        getRequest(requestType) {
            this.monday.get(requestType).then(res => { this.updateResults(res) });
        },
        sendMessage() {
            this.monday.execute("notice", {
                message: this.noticeText,
                type: this.noticeSelected,
                timeout: 10000,
            });
        },
        sendDialog() {
            this.monday.execute("confirm", {
                message: "Are you sure?",
                confirmButton: "Let's go!",
                cancelButton: "No way",
                excludeCancelButton: false
            }).then((res) => {
                this.updateResults(res)
            });
        },
        storeGet() {
            this.monday.storage.instance.getItem(this.storageKey).then(res => {
                this.updateResults(res)
            });
        },
        storeSet() {
            this.monday.storage.instance.setItem(this.storageKey, this.storageValue).then(res => {
                this.updateResults(res)
            });
        },
    },
}
</script>

<style scoped>
</style>

<style>
.apiInput {
    width: 90%;
}

.noticeInput {
    width: 500px;
}

.context {
    width: 500px;
    overflow-wrap: anywhere;
}

.sectionDiv {
    border: 1px solid #333;
    margin: 5px;
    padding: 5px;
}

button {
    margin: 10px 5px;
}

.listItems {
    list-style: circle;
}
</style>
