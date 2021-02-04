import axios from 'axios'

const apiClient = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },

})

export default {

    postProducts(product) {
        return apiClient.post('/products',product)
    },
    getProducts(perPage, page) {
        return apiClient.get('/posts?_limit='+ perPage + '&_page=' + page)
    },
    getProduct(id) {
        return apiClient.get('/posts/'+ id)
    },
    getAuthor() {
        return apiClient.get('/users/')
    },
    getAuthorByiD(id) {
        return apiClient.get('/users/'+id)
    },
    getProductByuserId(userId) {
        return apiClient.get('/posts?userId='+userId)
    },
    getComments(id)
    {
        return apiClient.get('/posts/'+ id+'/comments')
    },
    removeProduct(id) {
        console.log(id)
        return apiClient.delete('/posts/'+id)
    },
    editProduct(product) {

        return apiClient.patch('/posts/'+product.id,{body:product.body,title:product.title})
    }
}
