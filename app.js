const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector(".login");
const usernameError = document.querySelector(".username-error");
const passwordError = document.querySelector(".password-error");
const emailError = document.querySelector(".email-error");
const modalScreen = document.querySelector(".modal-screen");
const modelText = document.querySelector(".model-text");
const modalBtn = document.querySelector(".modal-button");
const successAnimation = document.querySelector(".success-animation");

let baseUrl = "https://courses-project-ac143-default-rtdb.firebaseio.com";

let isUsernameCorrect = false;
let isEmailCorrect = false;
let isPasswordCorrect = false;

const successAnim = lottie.loadAnimation({
  container: successAnimation,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./Success Check.json",
});

const checkUsername = () => {
  let usernameValue = usernameInput.value;

  if (usernameValue.length > 6) {
    usernameError.classList.add("hidden");
    isUsernameCorrect = true;
  } else {
    usernameError.classList.remove("hidden");
    usernameError.classList.add("uncorrect");
    usernameError.innerHTML =
      "تعداد کارکتر نام کاربری باید بیشتر از 6 کارکتر باشد";
    isUsernameCorrect = false;
  }
};
const checkEmail = () => {
  let emailValue = emailInput.value;

  if (emailValue.includes("@gmail.com")) {
    emailError.classList.add("hidden");
    isEmailCorrect = true;
  } else {
    emailError.classList.remove("hidden");
    emailError.classList.add("uncorrect");
    emailError.innerHTML = "ایمیل معتبر وارد کنید";
    isEmailCorrect = false;
  }
};
const checkPassword = () => {
  let passwordValue = passwordInput.value;

  if (passwordValue.length > 6) {
    passwordError.classList.add("hidden");
    isPasswordCorrect = true;
  } else {
    passwordError.classList.remove("hidden");
    passwordError.classList.add("uncorrect");
    passwordError.innerHTML =
      "تعداد کارکتر رمز عبور باید بیشتر از 8 کارکتر باشد";
    isPasswordCorrect = false;
  }
};

const sendNewUserToServer = (e) => {
  e.preventDefault();

  if (isUsernameCorrect && isEmailCorrect && isPasswordCorrect) {
    let newUserInfo = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    fetch(`${baseUrl}/users.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    }).then((response) => {
      if (response.status === 200) {
        modalScreen.classList.remove("hidden");
        successAnim.play();

        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
      }
    });
  }
};

const closeModal = () => {
  modalScreen.classList.add("hidden");
};

usernameInput.addEventListener("keyup", checkUsername);
emailInput.addEventListener("keyup", checkEmail);
passwordInput.addEventListener("keyup", checkPassword);
loginBtn.addEventListener("click", sendNewUserToServer);
modalBtn.addEventListener("click", closeModal);
