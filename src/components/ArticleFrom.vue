<template>
  <header class="d-flex align-items-center justify-content-between mb-3">
    <h3 class="title">{{ text }}</h3>
  </header>
  <form class="row">
    <div action="" class="col-12 col-md-9">
      <div class="form-group text-left mb-4">
        <label for="title" style="color: #373a3c" class="mb-1">Title:</label>
        <input
          type="text"
          id="title"
          class="form-control"
          style="height: 40px"
          required
        />
      </div>
      <div class="form-group text-left my-4">
        <label for="description" style="color: #373a3c" class="mb-1"
          >Description:</label
        >
        <input
          type="text"
          id="description"
          style="height: 40px"
          class="form-control"
          required
        />
      </div>
      <div class="form-group text-left my-4">
        <label for="body" style="color: #373a3c" class="mb-1">Body:</label>
        <textarea
          type="text"
          id="body"
          class="form-control no-resize"
          required
          style="height: 225px; resize: none"
        />
      </div>
      <!-- show modal -->
      <div
        class="w-100 form-control d-lg-none pointer my-3"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        style="cursor: pointer;"
      >
        Tags
      </div>
      <Modal>
        <Tags/>
      </Modal>
      <!-- end modal -->
      <button type="submit" class="customBtn py-2 text-white">Submit</button>
    </div>
    <div class="col-6 col-md-3 pt-1 d-none d-lg-block">
      <Tags />
    </div>
  </form>
</template>
<script>
import Tags from "./Tags.vue";
import Modal from "./Modal.vue";
export default {
  components: { Tags, Modal },
  props: ["text"],
};
</script>
<style>
.title {
  font-size: 2.5rem;
  color: #000;
}

.customBtn {
  width: 99px;
  border-radius: 4px;
  border: solid 1px #1c7cd5;
  background-color: #1c7cd5;
}
</style>
