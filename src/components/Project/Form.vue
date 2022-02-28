<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Создание проекта</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field
                label="Название проект"
                v-model="projectName"
                outlined
                clearable
                prepend-icon="mdi-alpha-t-box"
            />
            <v-combobox
                label="Статус проекта"
                :items="getStatuses"
                return-object
                v-model="projectStatus"
                item-text="name"
                outlined
                clearable
                item-key="id"
                prepend-icon="mdi-bookmark"
            />
            <v-combobox
                label="Руководитель"
                :items="getUsers"
                return-object
                v-model="projectManager"
                item-text="name"
                outlined
                clearable
                item-key="id"
                prepend-icon="mdi-card-account-details"
            />
            <v-combobox
                :items="getCompanies"
                label="Контрагент"
                item-text="name"
                return-object
                outlined
                clearable
                item-key="id"
                prepend-icon="mdi-account-tie"
            />

            <div
                class="d-flex align-center justify-space-between mb-4 pt-4"
                style="border-top: 1px solid #ccc"
            >
                <div class="d-flex align-center">
                    <v-icon class="mr-2">mdi-contacts</v-icon>
                    <div class="text-h6">Контакты контрагента</div>
                </div>
                <v-dialog
                    v-model="projectPartnerContactDialog"
                    persistent
                    :overlay="false"
                    max-width="500px"
                    transition="dialog-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div>
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                Добавить контакт
                            </v-btn>
                            <v-btn
                                color="error"
                                class="ml-4 mb-2"
                                @click="deleteSelectedPartnerContacts"
                                :disabled="projectPartnerContacts.length == 0"
                            >
                                Удалить выбранне
                            </v-btn>
                        </div>
                    </template>
                    <v-card>
                        <v-card-title>
                            <div class="text-h4">Добавление контакта</div>
                        </v-card-title>
                        <v-card-text>
                            <v-combobox
                                :items="getUsers"
                                Label="Контакт"
                                item-text="name"
                                return-object
                                clearable
                                item-key="id"
                                v-model="projectContactUser"
                            />
                            <v-textarea
                                label="По каким вопросам"
                                outlined
                                clearable
                                v-model="projectContactPhone"
                                prepend-icon="mdi-comment"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="success outlined"
                                @click="addPartnerContact"
                            >
                                Добавить
                            </v-btn>
                            <v-btn color="error" @click="cancelContact">
                                Закрыть
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

            <v-data-table
                :headers="contactHeaders"
                dense
                :items="projectPartnerContacts"
                class="elevation-1 mb-6"
                show-select
                v-model="projectPartnerContacts"
                outlined
                item-key="id"
            >
            </v-data-table>
            <div
                class="d-flex align-center justify-space-between mb-4 pt-4"
                style="border-top: 1px solid #ccc"
            >
                <div class="d-flex align-center">
                    <v-icon class="mr-2">mdi-contacts</v-icon>
                    <div class="text-h6">Документы объекта</div>
                </div>
                <v-dialog
                    v-model="projectDocumentDialog"
                    persistent
                    :overlay="false"
                    max-width="500px"
                    transition="dialog-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div>
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                Добавить документ
                            </v-btn>
                            <v-btn
                                color="error"
                                class="ml-4 mb-2"
                                @click="deleteSelectedDocuments"
                                :disabled="projectDocumentsSelected.length == 0"
                            >
                                Удалить выбранне
                            </v-btn>
                        </div>
                    </template>
                    <v-card>
                        <v-card-title>
                            <div class="text-h4">Добавление документа</div>
                        </v-card-title>
                        <v-card-text>
                            <v-combobox
                                :items="getDocumentTypes"
                                Label="Сотрудник"
                                item-text="name"
                                return-object
                                clearable
                                item-key="id"
                                v-model="projectDocumentType"
                            />
                            <v-text-field
                                label="Ссылка на документ"
                                v-model="projectDocumentUrl"
                                clearable
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="success outlined"
                                @click="addDocument"
                            >
                                Добавить
                            </v-btn>
                            <v-btn color="error" @click="cancelDocument">
                                Закрыть
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <v-data-table
                :headers="documentHeaders"
                :items="projectDocuments"
                class="elevation-1 mb-6"
                show-select
                item-key="id"
                v-model="projectDocumentsSelected"
            >
            </v-data-table>
            <v-text-field
                label="Адрес объекта"
                v-model="projectAddress"
                clearable
                outlined
                prepend-icon="mdi-map-marker"
                class="mb-4"
            />
            <div
                class="d-flex align-center justify-space-between mb-4 pt-4"
                style="border-top: 1px solid #ccc"
            >
                <div class="d-flex align-center">
                    <v-icon class="mr-2">mdi-contacts</v-icon>
                    <div class="text-h6">Контакты на объекте</div>
                </div>
                <v-dialog
                    v-model="projectContactDialog"
                    persistent
                    :overlay="false"
                    max-width="500px"
                    transition="dialog-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div>
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                Добавить контакт
                            </v-btn>
                            <v-btn
                                color="error"
                                class="ml-4 mb-2"
                                @click="deleteSelectedContacts"
                                :disabled="projectContactsSelected.length == 0"
                            >
                                Удалить выбранне
                            </v-btn>
                        </div>
                    </template>
                    <v-card>
                        <v-card-title>
                            <div class="text-h4">Добавление контакта</div>
                        </v-card-title>
                        <v-card-text>
                            <v-combobox
                                :items="getUsers"
                                Label="Сотрудник"
                                item-text="name"
                                return-object
                                item-key="id"
                                v-model="projectContactUser"
                                clearable
                            />
                            <v-text-field
                                label="Контактный телефон"
                                v-model="projectContactPhone"
                                clearable
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="success outlined" @click="addContact">
                                Добавить
                            </v-btn>
                            <v-btn color="error" @click="cancelContact">
                                Закрыть
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <v-data-table
                :headers="contactHeaders"
                :items="projectContacts"
                class="elevation-1 mb-6"
                show-select
                item-key="id"
                v-model="projectContactsSelected"
            >
            </v-data-table>
            <v-textarea
                label="Комментарий"
                v-model="projectComment"
                outlined
                clearable
                prepend-icon="mdi-comment"
            />
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="save"> Создать </v-btn>
            <v-btn color="primary" class="mr-4"> Сохранить </v-btn>
            <v-btn color="error" class="mr-4">Удалить</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "getCompanies",
            "getDocumentTypes",
            "getStatuses",
            "getUsers",
        ]),
    },
    methods: {
        getMaxId(arr) {
            if (arr.length <= 0) return 0;
            return Math.max(...arr.map((d) => d.id));
        },
        addDocument() {
            var document = {
                id: this.getMaxId(this.projectDocuments) + 1,
                type: this.projectDocumentType,
                url: this.projectDocumentUrl,
            };
            this.projectDocuments.push(document);
            this.projectDocumentUrl = "";
        },
        cancelDocument() {
            this.projectDocumentType = this.defaultDocumentType;
            this.projectDocumentUrl = "";
            this.projectDocumentDialog = false;
        },
        addContact() {
            var contact = {
                id: this.getMaxId(this.projectContacts) + 1,
                user: this.projectContactUser,
                value: this.projectContactPhone,
            };
            this.projectContacts.push(contact);
            this.projectContactUser = this.defaultUser;
            this.contactValue = "";
        },
        cancelContact() {
            this.projectContactUser = this.defaultUser;
            this.projectContactPhone = "";
            this.projectContactDialog = false;
            this.projectPartnerContactDialog = false;
        },
        addPartnerContact() {
            var contact = {
                id: this.getMaxId(this.projectPartnerContacts) + 1,
                user: this.projectContactUser,
                value: this.projectContactPhone,
            };
            this.projectPartnerContacts.push(contact);
            this.projectContactUser = this.defaultUser;
            this.projectContactPhone = "";
        },
        deleteSelectedDocuments() {
            this.projectDocumentsSelected.forEach((document) => {
                this.projectDocuments.splice(
                    this.projectDocuments.indexOf(document),
                    1
                );
            });
        },
        deleteSelectedContacts() {
            this.projectContactsSelected.forEach((contact) => {
                this.projectContacts.splice(
                    this.projectContacts.indexOf(contact),
                    1
                );
            });
        },
        deleteSelectedPartnerContacts() {
            this.projectPartnerContactsSelected.forEach((contact) => {
                this.projectPartnerContacts.splice(
                    this.projectPartnerContacts.indexOf(contact),
                    1
                );
            });
        },
        save() {
            let project = {
                name: this.projectName,
                comment: this.projectComment,
                statusID: this.projectStatus.id,
                authorID: this.projectManager.id,
            };
            this.$store.dispatch("saveProject", project).then((path) => {
                document.location = path;
            });
        },
    },
    data: () => ({
        projectName: "",
        projectComment: null,
        projectAddress: null,
        projectStatus: { id: null, name: null },
        projectManager: { id: null, name: null },
        projectPartner: { id: null, name: null },

        projectPartnerContacts: [],
        projectPartnerContactsSelected: [],

        projectDocuments: [],
        projectDocumentsSelected: [],

        projectContacts: [],
        projectContactsSelected: [],

        projectPartnerContactDialog: false,
        projectPartnerContactUser: { id: null, name: null },
        projectPartnerContactPhone: null,

        projectContactDialog: false,
        projectContactUser: { id: null, name: null },
        projectContactPhone: null,

        projectDocumentDialog: false,
        projectDocumentType: { id: null, name: null },
        projectDocumentUrl: "",

        defaultUser: { id: null, name: null },
        defaultDocumentType: { id: null, name: null },

        contactHeaders: [
            { text: "Сотрудник", value: "user.name" },
            { text: "Контакт", value: "value" },
        ],
        documentHeaders: [
            { text: "Тип документа", value: "type.name" },
            { text: "Ссылка на документ", value: "url" },
        ],
    }),
    created() {
        this.$store.dispatch("loadStatuses");
        this.$store.dispatch("loadCompanies");
        this.$store.dispatch("loadUsers");
    },
};
</script>
