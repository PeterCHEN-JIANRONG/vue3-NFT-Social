<template>
  <div ref="editModalRef" class="modal fade" tabindex="-1" role="dialog">
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <span>編輯貼文</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="cancelEdit"
          ></button>
        </div>
        <div class="modal-body">
          <form ref="form" class="p-5">
            <div class="mb-3">
              <label for="content" class="form-label">貼文內容</label>
              <textarea
                class="form-control border border-2 border-dark"
                id="content"
                rows="4"
                v-model="tempPost.content"
              ></textarea>
            </div>
            <div class="mb-5">
              <label for="formFiles" class="form-label"
                >上傳圖片
                <span
                  v-show="uploading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></span>
              </label>
              <input
                type="file"
                id="formFiles"
                class="form-control mb-2"
                ref="formFiles"
                @change="uploadImages"
                multiple
              />
              <div
                v-if="tempPost.image?.length > 0"
                class="row g-2 mb-2"
                :class="{ 'row-cols-2': tempPost.image?.length > 1 }"
              >
                <div
                  class="col"
                  v-for="(item, index) in tempPost.image"
                  :key="item"
                >
                  <div class="image__card position-relative">
                    <img :src="item" class="w-100 h-15s img-cover" />
                    <span
                      class="image__delete position-absolute top-0 end-0 m-2 fs-6 badge bg-light text-dark cursor-pointer"
                      @click="tempPost.image.splice(index, 1)"
                      >刪除</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <span class="fs-6 text-danger me-3" v-if="tempPost.image?.length > 8"
            >上傳圖片超過 8 張，請刪除圖片</span
          >
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click="cancelEdit"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="editPost"
            :disabled="tempPost.image?.length > 8 || uploading"
          >
            確認編輯
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, toRaw } from 'vue';
import useBsModal from '@/mixins/modalMixin';
import { errorAlertConstruct } from '@/utils/alertConstructHandle';

export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['edit-post'],
  setup(props, { emit }) {
    const axios = inject('axios');
    const Swal = inject('$swal');
    const editModalRef = ref(null); // modal template ref
    const { openModal, closeModal } = useBsModal(editModalRef); // 建立 modal 元件

    const tempPost = ref(JSON.parse(JSON.stringify(props.post))); // 深拷貝 內部 Post 變數

    // emit 修改貼文
    const editPost = () => {
      if (tempPost.value.image.length > 8) {
        Swal.fire(errorAlertConstruct('失敗', '上傳圖片超過 8 張，請刪除圖片'));
        return;
      }
      emit('edit-post', toRaw(tempPost.value));
    };

    const formFiles = ref(null);
    const uploading = ref(false);

    // 上傳圖片
    const uploadImages = () => {
      // 未選擇圖片
      if (formFiles.value.files.length === 0) {
        return;
      }
      // 前端阻擋
      if (formFiles.value.files.length > 8) {
        Swal.fire(errorAlertConstruct('失敗', '上傳圖片超過 8 張，請重新上傳'));
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < formFiles.value.files.length; i += 1) {
        const file = formFiles.value.files[i];
        formData.append('photos', file);
      }

      const url = `${process.env.VUE_APP_API}/upload/photos`;
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      uploading.value = true;
      axios
        .post(url, formData, { headers })
        .then((res) => {
          uploading.value = false;
          tempPost.value.image.push(...res.data.data);
        })
        .catch((err) => {
          uploading.value = false;
          Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
        });
    };

    // 取消修改, 恢復修改資料
    const cancelEdit = () => {
      tempPost.value = JSON.parse(JSON.stringify(props.post));
    };

    return {
      editModalRef,
      openModal,
      closeModal,
      editPost,
      tempPost,
      formFiles,
      uploading,
      uploadImages,
      cancelEdit,
    };
  },
};
</script>

<style lang="scss" scoped>
.image {
  &__card:hover {
    img {
      transition: all 0.5s;
      filter: brightness(80%);
    }
  }
  &__delete {
    border-radius: 8px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
