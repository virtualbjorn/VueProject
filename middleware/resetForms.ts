export default function ({ store, redirect }) {
  // If the user is not authenticated
  let formElement: HTMLElement = document.querySelector('#questionForm') as HTMLElement;
  let thankYouWrapper: HTMLElement = document.querySelector('#footerThankYou') as HTMLElement;
  thankYouWrapper.classList.add('hidden');
  formElement.classList.remove('hidden');
}