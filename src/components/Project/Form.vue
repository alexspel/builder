<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Создание проекта</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field
                label="Название проект"
                v-model="project.name"
                outlined
                clearable
                prepend-icon="mdi-alpha-t-box"
            />
            <v-combobox
                label="Статус проекта"
                :items="statuses"
                return-object
                v-model="project.status"
                item-text="name"
                outlined
                clearable
                item-key="id"
                prepend-icon="mdi-bookmark"
            />
            <v-combobox
                label="Руководитель"
                :items="users"
                item-text="name"
                return-object
                outlined
                clearable
                item-key="id"
                prepend-icon="mdi-card-account-details"
            />
            <v-combobox
                :items="companies"
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
                    v-model="dialogPartnerContact"
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
                                :disabled="partnerContactsSelected.length == 0"
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
                                :items="users"
                                Label="Контакт"
                                item-text="name"
                                return-object
                                clearable
                                item-key="id"
                                v-model="contactUser"
                            />
                            <v-textarea
                                label="По каким вопросам"
                                outlined
                                clearable
                                v-model="contactValue"
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
                :items="partnerContacts"
                class="elevation-1 mb-6"
                show-select
                v-model="partnerContactsSelected"
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
                    v-model="dialogDocument"
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
                                :disabled="documentsSelected.length == 0"
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
                                :items="documentTypes"
                                Label="Сотрудник"
                                item-text="name"
                                return-object
                                clearable
                                item-key="id"
                                v-model="documentType"
                            />
                            <v-text-field
                                label="Ссылка на документ"
                                v-model="documentUrl"
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
                :items="documents"
                class="elevation-1 mb-6"
                show-select
                item-key="id"
                v-model="documentsSelected"
            >
            </v-data-table>
            <v-text-field
                label="Адрес объекта"
                v-model="project.name"
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
                    v-model="dialogContact"
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
                                :disabled="contactsSelected.length == 0"
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
                                :items="users"
                                Label="Сотрудник"
                                item-text="name"
                                return-object
                                item-key="id"
                                v-model="contactUser"
                                clearable
                            />
                            <v-text-field
                                label="Контактный телефон"
                                v-model="contactValue"
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
                :items="contacts"
                class="elevation-1 mb-6"
                show-select
                item-key="id"
                v-model="contactsSelected"
            >
            </v-data-table>
            <v-textarea
                label="Комментарий"
                v-model="project.comment"
                outlined
                clearable
                prepend-icon="mdi-comment"
            />
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="project.id === null" color="primary"> Создать </v-btn>
            <v-btn v-if="project.id !== null" color="primary" class="mr-4">
                Сохранить
            </v-btn>
            <v-btn v-if="project.id !== null" color="error" class="mr-4"
                >Удалить</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    methods: {
        getMaxId(arr) {
            if (arr.length <= 0) return 0;
            return Math.max(...arr.map((d) => d.id));
        },
        addDocument() {
            var document = {
                id: this.getMaxId(this.documents) + 1,
                type: this.documentType,
                url: this.documentUrl,
            };
            this.documents.push(document);
            this.documentUrl = "";
            // this.dialogDocument = false;
        },
        cancelDocument() {
            this.documentType = null;
            this.documentUrl = "";
            this.dialogDocument = false;
        },
        addContact() {
            var contact = {
                id: this.getMaxId(this.contacts) + 1,
                user: this.contactUser,
                value: this.contactValue,
            };
            this.contacts.push(contact);
            this.contactUser = null;
            this.contactValue = "";
        },
        cancelContact() {
            this.contactUser = null;
            this.contactValue = "";
            this.dialogContact = false;
            this.dialogPartnerContact = false;
        },
        addPartnerContact() {
            var contact = {
                id: this.getMaxId(this.partnerContacts) + 1,
                user: this.contactUser,
                value: this.contactValue,
            };
            this.partnerContacts.push(contact);
            this.contactUser = null;
            this.contactValue = "";
            // this.dialogContact = false;
        },
        deleteSelectedDocuments() {
            this.documentsSelected.forEach((document) => {
                this.documents.splice(this.documents.indexOf(document), 1);
            });
        },
        deleteSelectedContacts() {
            this.contactsSelected.forEach((contact) => {
                this.contacts.splice(this.contacts.indexOf(contact), 1);
            });
        },
        deleteSelectedPartnerContacts() {
            this.partnerContactsSelected.forEach((contact) => {
                this.partnerContacts.splice(
                    this.partnerContacts.indexOf(contact),
                    1
                );
            });
        },
    },
    data: () => ({
        documentType: null,
        documentUrl: "",
        contactUser: null,
        contactValue: "",
        statuses: [],
        companies: [],
        documents: [],
        documentsSelected: [],
        contacts: [],
        contactsSelected: [],
        partnerContacts: [],
        partnerContactsSelected: [],
        users: [],
        project: {
            id: null,
            name: null,
            status: null,
            comment: null,
            author: {
                id: null,
                name: "",
            },
        },
        dialogDocument: false,
        dialogContact: false,
        dialogPartnerContact: false,
        documentTypes: [
            { id: 1, name: "Договор" },
            { id: 2, name: "Смета" },
            { id: 3, name: "Расчет стоимости" },
        ],
        contactHeaders: [
            { text: "Сотрудник", value: "user.name" },
            { text: "Контакт", value: "value" },
        ],
        documentHeaders: [
            { text: "Тип документа", value: "type.name" },
            { text: "Ссылка на документ", value: "url" },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/project_statuses.json"
        );
        this.statuses = await response.json();
        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/users/users.json"
        );
        this.users = await response.json();
        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/companies.json"
        );
        this.companies = await response.json();
    },
};
</script>
