const errorAlertConstruct = (title, text = '') => ({
  position: 'center',
  icon: 'error',
  title,
  text,
  showConfirmButton: false,
  timer: 1500,
});

const successAlertConstruct = (title, text = '') => ({
  position: 'center',
  icon: 'success',
  title,
  text,
  showConfirmButton: false,
  timer: 1500,
});

module.exports = {
  errorAlertConstruct,
  successAlertConstruct,
};
