<script>
import { fetchClientApi } from '../../services/api';
import TableComp from '../TableComponent.vue'
import Modal from '../ModalComponent.vue'
// const count = ref(0)
export default {
  data() {
    return {
      id: '',
      clients: [],
    }
  },
  components: {
    TableComp, Modal
  },
  async mounted() {
    await this.getClient()
  },
  methods: {
    async getClient() {
      const { data, error } = await fetchClientApi();

      if (!error) {
        this.clients = data.map(res => {
          const { name, email, phone, _id } = res;
          const provider = res.provider.map(p => p.name).join(", ");
          return { name, email, phone, provider, _id }
        })
      }
    },
    async showModal(id) {
      if (!id) await this.getClient();
      this.id = id
    }
  }
}
</script>

<template>
  {{ id }}
  <TableComp :clients="clients" :isEditable="true" :isDeletable="true" @callModal="showModal" />
  <Modal :id="id" @callModal="showModal" />
</template>

<!-- 

  App
  client mounted axios -- background
  tablecomp mounted thisdata = []
  background task finished server data
  
 -->
