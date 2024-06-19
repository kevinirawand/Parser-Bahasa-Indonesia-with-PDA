class TokenRecognizer {
   constructor() {
      this.subjects = ['aku', 'kamu', 'saya', 'kita', 'mereka', 'dia'];
      this.predicates = ['tidur', 'mandi', 'makan', 'minum', 'tulis', 'baca', 'lari'];
      this.objects = ['bantal', 'kasur', 'nasi', 'air', 'buku', 'surat', 'kue'];
      this.complements = ['dicurug', 'dikost', 'dirumah', 'disekolah', 'dikantor', 'dipasar', 'dijalan'];
   }

   recognize(word) {
      if (this.subjects.includes(word)) {
         return "S"
      } else if (this.predicates.includes(word)) {
         return "P"
      } else if (this.objects.includes(word)) {
         return "O"
      } else if (this.complements.includes(word)) {
         return "K"
      } else {
         return null
      }
   }
}

class Parser {
   constructor() {
      this.recognizer = new TokenRecognizer();
      this.grammar = [
         ["S", "P", "O", "K"],
         ["S", "P", "K"],
         ["S", "P", "O"],
         ["S", "P"],
      ];
   }

   parse(sentence) {
      let tokens = [];

      const words = sentence.split(' ');
      // console.info(words)

      for (const word of words) {
         const token = this.recognizer.recognize(word);
         // console.info(token)

         if (token !== null) {
            tokens.push(token);
         } else {
            console.info("Token tidak ditemukan");
            return false
         }
      }

      return this.validate(tokens);

   }

   validate(tokens) {
      return this.grammar.some(v => v.length === tokens.length && v.every((value, index) => value === tokens[index]))
   }
}

const _Parser = new Parser();

const sentences = [
   'aku mandi dicurug',
   'dia mandi dikost',
   'kita tidur dijalan',
   'mereka mandi dipasar',
   'kamu makan bantal dicurug',
   'satria baja hitam'
];

for (const sentence of sentences) {
   if (_Parser.parse(sentence)) {
      console.info(`${sentence} is valid sentence`)
   } else {
      console.info(`${sentence} is not valid sentence`)
   }
}
