function hitungPenguranganDiagonal(matriks) {
    const n = matriks.length;
    let diagonalUtama = 0;
    let diagonalSekunder = 0;
  
    for (let i = 0; i < n; i++) {
      diagonalUtama += matriks[i][i];
  
      diagonalSekunder += matriks[i][n - i - 1];
    }
  
    const hasil = diagonalUtama - diagonalSekunder;
    return hasil;
  }
  
  const matriks = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
  const hasil = hitungPenguranganDiagonal(matriks);
  console.log("Hasil pengurangan dari jumlah diagonal adalah:", hasil);  