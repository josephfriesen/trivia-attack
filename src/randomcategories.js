class Category {
  constructor(id, title, clues) {
    this.id = id;
    this.title = title;
    this.clues = clues;
  }
}

export default class RandomCategories {
  constructor(n) {
    this.catNum = n;
    this.catArr = [];
  }

  getCategory(id) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://jservice.io/api/category?id=${id}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  buildCatArr() {
    return new Promise((resolve) => {
      let count = 0;
      let out = [];
      let rand = () => { return Math.floor(Math.random() * 14398) + 1; };
      for (let i = 1; i <= this.catNum; i++) {
        let promise = this.getCategory(rand());
        promise.then( (response) => {
          let catJSON = JSON.parse(response);
          let text = catJSON.title;
          text = text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
          let cat = new Category(catJSON.id, text, catJSON.clues);
          out.push(cat);
          count = count + 1;
          if (count === this.catNum) {
            console.log(i === this.catNum);
            resolve(out);
          }
        });
        console.log(i === this.catNum);
      }
    });
  }

}
