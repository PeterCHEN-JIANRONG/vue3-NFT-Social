<template>
  <div ref="delModalRef" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除貼文</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ props.post?._id }}</strong>
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deletePost">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useBsModal from '@/mixins/modalMixin';

export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['delete-post'],
  setup(props, { emit }) {
    const delModalRef = ref(null); // modal template ref
    const { openModal, closeModal } = useBsModal(delModalRef); // 建立 modal 元件

    const deletePost = () => {
      emit('delete-post', props.post?._id);
    };

    return {
      delModalRef,
      openModal,
      closeModal,
      props,
      deletePost,
    };
  },
};
</script>
