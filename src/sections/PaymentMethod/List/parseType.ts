export const parseType = (value: boolean): any => {
  switch (value) {
    case true:
      return 'Visible';
    case false:
      return 'Non-Visible';
    default:
      return 'Visible';
  }
};
