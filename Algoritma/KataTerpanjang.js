function cariKataTerpanjang(kalimat) {
    const kata = kalimat.split(" ");
    let kataTerpanjang = "";
    let panjangTerpanjang = 0;
  
    for (let i = 0; i < kata.length; i++) {
      if (kata[i].length > panjangTerpanjang) {
        kataTerpanjang = kata[i];
        panjangTerpanjang = kata[i].length;
      }
    }
  
    return { kata: kataTerpanjang, panjang: panjangTerpanjang };
  }
  
  const kalimat = "Ini adalah contoh kalimat dengan beberapa kata yang panjangnya berbeda";
  const hasil = cariKataTerpanjang(kalimat);
  console.log("Kata terpanjang dalam kalimat tersebut adalah:", hasil.kata, "(", hasil.panjang, " karakter)");