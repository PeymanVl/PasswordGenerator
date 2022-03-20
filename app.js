
const passwordInput = document.getElementById('password');
const inputs = [...document.querySelectorAll('input:not([type="text"])')]
const lengthInput = document.getElementById('lengthInput');
const copyButton = document.querySelector('.copy');
const generatorButton = document.getElementById('generator');
// const lengthText= document.getElementById('lengthText'); we dont need this
const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ['@', '#', '$', '%'];
const similarLowercaseLetters = ['i', 'l', 'o'];
const similarUppercaseLetters = ['L', 'O'];
const similarNumbers = [0, 1];

const characterSkipCodes = [8, 11, 14];
const characterCodes = Array.from(Array(26)).map((_, i) => i + 97);
const lowercaseLetters = characterCodes.map(code => String.fromCharCode(code));
const uppercaseLetters = lowercaseLetters.map(letter => letter.toUpperCase());

generatorButton.addEventListener('click', () => {
    updatePassword();
});
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyButton.innerText = "Copied";
    copyButton.classList.add('copied');
    setTimeout(() => {
        copyButton.innerText = "Copy";
        copyButton.classList.remove('copied');
    }, 3000);
})



const updatePassword = () => {
    const length = lengthInput.value;
    const checkboxValues = inputs.slice(1).map(input => input.checked);
    const password = generatePassword(length, ...checkboxValues);
    passwordInput.value = password;
    // lengthText.innerHtml=`${length}&nbsp;`;
}

inputs.forEach(element => {
    element.addEventListener('change', updatePassword);
});
const generatePassword = (length, hasSymbols, hasNumbers, hasLowercase, hasUppercase, hasSimilars) => {
    let availableCharacter = [
        ...(hasSymbols ? symbols : []),
        ...(hasNumbers ? numbers : []),
        ...(hasLowercase ? lowercaseLetters : []),
        ...(hasUppercase ? uppercaseLetters : []),
    ];
    if (hasSimilars) {
        if (hasLowercase) {
            availableCharacter = [...availableCharacter, ...similarLowercaseLetters];
        }
        if (hasUppercase) {
            availableCharacter = [...availableCharacter, ...similarUppercaseLetters];
        }

        if (hasNumbers) {
            availableCharacter = [...availableCharacter, ...similarNumbers];
        }
    }
    let password = "";
    if (availableCharacter.length === 0) return "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableCharacter.length);
        password += availableCharacter[randomIndex]
    }
    return password;
}
updatePassword();