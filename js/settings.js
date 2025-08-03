const unitGroups = document.querySelectorAll('.settings__unit-group');

unitGroups.forEach(group => {
  const options = group.querySelectorAll('.settings__option');

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => opt.classList.remove('settings__option--active'));
      option.classList.add('settings__option--active');
    });
  });
});