export default (number: number, type: string) => `
  ${type}: calc(${(number / 2.5).toFixed(1)}vw + ${(number / 1.6).toFixed(
  1
)}rem);

  @media (min-width: 1601px) {
    ${type}: ${number}rem;
  }
`
