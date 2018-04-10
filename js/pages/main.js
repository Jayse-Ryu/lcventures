console.log("Main_Js");

const arr = [1, 2, 3, 0];
const sumArr = arr.reduce((p, c) => p+c);
console.log(sumArr); // 6

const app = new Vue ({
    el: '#app',
    data: {
        product: "change",
        products: []
    },
    computed: {
        totalProducts () {
            return this.products.reduce((sum, product) => {
                return sum + product.quantity
            }, 0)
        }
    },
    created () {
        fetch('https://api.myjson.com/bins/74l63')
            .then(response => response.json())
    .then(json => this.products = json.products)
    }
})