document.addEventListener("DOMContentLoaded", function(e) { 

  /**
   * Universal Css class toggler
   */
  const toggleTriggers = document.querySelectorAll(".js-toggle-trigger");

  function toggleHandler(e) {
    let targetId = this.dataset.target;
    let activeCssClass = this.dataset.active;
    let targetElement = document.getElementById(targetId);
    targetElement.classList.toggle(activeCssClass);
    e.preventDefault();
    e.stopPropagation();
  }

  for (var i = 0; i < toggleTriggers.length; i++) {
    toggleTriggers[i].addEventListener('click', toggleHandler);
  }


  /**
   * Password input toggler
   */

  const togglePassword = document.querySelectorAll(".js-password-toggle__button");

  function togglePasswordHandler(e) {
    const password = this.previousElementSibling;

    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    // this.classList.toggle('fa-eye-slash');
  }

  for (var i = 0; i < togglePassword.length; i++) {
    togglePassword[i].addEventListener('click', togglePasswordHandler);
  }


  /**
   * stopPropagation
   */
  const stopPropagationElements = document.querySelectorAll(".js-stop-propagation");

  function stopPropagationElementsHandler(e) {
    e.stopPropagation();
  }

  for (var i = 0; i < stopPropagationElements.length; i++) {
    stopPropagationElements[i].addEventListener('click', stopPropagationElementsHandler);
  }


  /**
   * Close on ESC
   */
  const closeOnEscapeElements = document.querySelectorAll('.js-close-on-escape');


  document.addEventListener('keyup', function (e) {
    if (e.defaultPrevented) {
      return;
    }

    function closeOnEscapeHandler(e) {
      let targetId = this.dataset.target;
      let activeCssClass = this.dataset.active;
      let targetElement = document.getElementById(targetId);
      targetElement.classList.remove(activeCssClass);
      e.preventDefault();
      e.stopPropagation();
    }

    var key = e.key || e.keyCode;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      for (var i = 0; i < closeOnEscapeElements.length; i++) {
        closeOnEscapeElements[i].addEventListener('keyup', closeOnEscapeHandler);
      }
      console.log(key);
    }
  });


});
