export const truncateString = (input: string) =>
  input.length > 5
    ? `${input.substring(0, 5)}...${input.substr(input.length - 5)}`
    : input;