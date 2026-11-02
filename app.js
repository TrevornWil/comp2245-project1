const form = document.querySelector("#signup-form");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const frequencyField = document.querySelector("#frequency");
const formMessage = document.querySelector("#form-message");

const fields = [
  {
    element: nameField,
    error: document.querySelector("#name-error"),
    validate(value) {
      return value ? "" : "Enter your name.";
    },
  },
  {
    element: emailField,
    error: document.querySelector("#email-error"),
    validate(value) {
      if (!value) {
        return "Enter your email address.";
      }

      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Enter an email address like name@example.com.";
    },
  },
  {
    element: frequencyField,
    error: document.querySelector("#frequency-error"),
    validate(value) {
      return value ? "" : "Choose how often we should email you.";
    },
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.remove("success");

  const invalidFields = [];

  fields.forEach(({ element, error, validate }) => {
    const message = validate(element.value.trim());
    error.textContent = message;

    if (message) {
      element.setAttribute("aria-invalid", "true");
      invalidFields.push(element);
    } else {
      element.removeAttribute("aria-invalid");
    }
  });

  if (invalidFields.length > 0) {
    invalidFields[0].focus();
    return;
  }

  formMessage.textContent = `Thank you, ${nameField.value.trim()}! You're on the mailing list.`;
  formMessage.classList.add("success");
  form.reset();
});
