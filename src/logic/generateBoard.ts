const ALPHABET = [...new Array(26)].map((_, i) => i + 65);

export function generateBoard(areaSize = 10) {
  return [...Array(areaSize * areaSize)].map((_, i) => {
    return (
      String.fromCharCode(ALPHABET[i % areaSize]) + Math.floor(i / areaSize + 1)
    );
  });
}
