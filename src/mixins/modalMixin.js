import Modal from 'bootstrap/js/dist/modal';
import { onMounted } from 'vue';

const useBsModal = (refImpl) => {
  let bsModal = null;
  onMounted(() => {
    bsModal = new Modal(refImpl.value);
  });
  const openModal = () => {
    bsModal.show();
  };
  const closeModal = () => {
    bsModal.hide();
  };

  return {
    openModal,
    closeModal,
  };
};

export default useBsModal;
