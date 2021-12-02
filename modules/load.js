async function loadFile(filename) {
  const file = await fetch(filename);
  const data = await file.text();
  return data;
}

async function loadNumbers(filename) {
  const data = await loadFile(filename);
  return data.split("\n").map((v) => parseFloat(v));
}

export { loadFile, loadNumbers };
