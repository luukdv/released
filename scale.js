export default (number, type, strong = false) => `
  ${type}: calc(${(number / (strong ? 2.5 * 1.5 : 2.5)).toFixed(3)}vw + ${(
  number / (strong ? 1.67 * 1.5 : 1.67)
).toFixed(3)}em);

  @media (min-width: 1601px) {
    ${type}: ${number}em;
  }
`
