function hitungKemunculan(input, query) {
    const count = {}; 

    query.forEach((kata) => {
      count[kata] = 0;
    });
  
    input.forEach((kataInput) => {
      if (count.hasOwnProperty(kataInput)) {
        count[kataInput]++;
      }
    });
  
    return count;
  }
  
  const input = ["saya", "suka", "makan", "sate", "sate", "ayam"];
  const query = ["saya", "sate", "ayam", "pizza"];
  const hasil = hitungKemunculan(input, query);
  console.log(hasil);
  