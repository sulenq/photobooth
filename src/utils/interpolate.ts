const interpolate = (
  text: string,
  variables: Record<string, string | number>
) => {
  let result = text;

  Object.keys(variables).forEach((variable) => {
    const placeholder = `\${${variable}}`;
    result = result.replace(placeholder, variables[variable].toString());
  });

  return result;
};

export default interpolate;
