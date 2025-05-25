const capsFirstLetterEachWord = (str: string): string => {
  if (!str) return "";

  const words = str.split(" ");

  const capitalizedWords = words.map((word) => {
    if (word.length === 0) return word;
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(" ");
};

export default capsFirstLetterEachWord;
