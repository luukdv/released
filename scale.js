export default (number, type, strong = false) => `
  ${type}: calc(${(number / (strong ? 2.25 * 1.5 : 2.25)).toFixed(1)}vw + ${(
  number / (strong ? 1.5 * 1.5 : 1.5)
).toFixed(1)}em);

  @media (min-width: 1601px) {
    ${type}: ${number}em;
  }
`
