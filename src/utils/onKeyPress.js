export const onKeyPress = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.getElementById(e.target.id).blur();
  }
};
