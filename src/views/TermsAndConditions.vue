<template>
  <div class="card mb-3">
    <div class="card-header">
      <div class="row flex-between-end">
        <div class="col-auto align-self-center">
          <h5 class="mb-0" data-anchor="data-anchor">Términos y condiciones</h5>
        </div>
      </div>
    </div>
    <div class="card-body bg-light">
      <div id="app">
        <ckeditor
          disable
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        ></ckeditor>
      </div>
      <div>
        <button v-if="id" class="btn btn-success my-2" @click="update()">
          Actualizar
        </button>
        <button v-else class="btn btn-primary my-2" @click="store()">
          Guadar
        </button>
      </div>
    </div>
  </div>
  <!-- <div v-html="editorData"></div> -->
  <notifications />
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
export default {
  name: "TermsAndConditions",
  data() {
    return {
      editor: ClassicEditor,
      editorData: null,
      editorConfig: {
        toolbar: {
          items: [
            "Heading",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "insertTable",
            "undo",
            "redo",
          ],
        },
      },
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
      id: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await axios.get(this.urlApi + "term-and-condition", {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (res.data.data.content) {
        this.editorData = res.data.data.content;
        this.id = res.data.data.id;
      }
    },

    async store() {
      let content = new Object();
      content.content = this.editorData;
      try {
        const res = await axios.post(
          this.urlApi + "term-and-condition/add",
          content,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.$notify({
          title: "exito",
          text: res.data.message,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          title: "Error",
          text: error.response.message,
          type: "error",
        });
      }
      this.getData();
    },

    async update() {
      let content = new Object();
      content.content = this.editorData;
      try {
        const res = await axios.put(
          this.urlApi + "term-and-condition/update/" + this.id,
          content,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.$notify({
          title: "exito",
          text: res.data.message,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          title: "Error",
          text: error.response.message,
          type: "error",
        });
      }
      this.getData();
    },
  },
};
</script>