import ProductService from '@/services/ProductService.js'

export const namespaced = true

export const state = {
    products:[],
    product:'',
    eventsTotal:'',
    users:'',
    userProduct:[],
    deletedProduct:'',
    editedProduct:'',
    stateCurrentpage:null
}
export const mutations = {
    SET_USER(state,users){
        state.users=users
    },
    SET_PRODUCTS(state, payload){
        let productsByUsers=[]
        let users=state.users
        payload.products.map(function(item) {
            let getProducts= users.find(i=>i.id==item.userId)
            productsByUsers.push({...item,username:getProducts.username})
        })
       state.products=productsByUsers

        if(payload.currentpage!=undefined)
        {
            state.stateCurrentpage=payload.currentpage
        }
    },
    SET_EVENTS_TOTAL(state,eventsTotal){
        state.eventsTotal=eventsTotal
    },
    SET_PRODUCT(state,product){
        state.product=product
    },
    SET_PRODUCTBYUSERID(state,payload)
    {
        let productsByUsers=[]
        payload.products.map(function(item) {
            productsByUsers.push({...item,username:payload.username})
        })
        state.userProduct=productsByUsers
    },
    REMOVE_PRODUCT(state,id)
    {
        if(state.products.length>0)
     {
        let index = state.products.findIndex(c => c.id == id);
        state.deletedProduct=state.products[index]

        state.products.splice(index, 1);

        state.product=[]
     }
        else
     {

         state.deletedProduct=state.product
     }

    },
    EDIT_PRODUCT(state,product){
        state.editedProduct=product
        state.products=[...state.products.map(item=>item.id !== product.id ?  item:{...product})]
    },

}

export const actions = {
    fetchProducts({commit,getters},{perPage,page}){
        let currentProducts = getters.getProducts
        if( (currentProducts.length>0) && (page==undefined))
        {
            let payload={currentpage:page,products:currentProducts}
            setTimeout(() => {commit('SET_PRODUCTS',payload)}, 500)
        }
        else
        {
            return new Promise((resolve, reject) => {
                ProductService.getProducts(perPage,page)
                    .then((res) => {
                        resolve(res)
                        let currentProducts=  res.data
                        let payload={currentpage:page,products:currentProducts}
                        commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']))
                        setTimeout(() => {commit('SET_PRODUCTS',payload)},500)
                    })
                    .catch((error) => {
                        reject(error.response.data.errors)
                    })
            })
        }
    },
    fetchProduct({ commit, getters }, id) {
        let product = getters.getProductById(id)
        if (product) {
            commit('SET_PRODUCT', product)
            return product
        }
        else {
            return ProductService.getProduct(id)
                .then(response => {
                    commit('SET_PRODUCT', response.data)
                    return response.data
                })

        }
    },
    fetchProductByUserId({ commit}, payload) {
        let username=payload.username
        let userId=payload.userId
        return ProductService.getProductByuserId(userId)
                .then(response => {
                   let payload = {'username': username, 'products': response.data}
                    commit('SET_PRODUCTBYUSERID', payload)
                    return response.data
                })
    },
    fetchUsers({commit}){
        ProductService.getAuthor().then(res=>
            {
                commit('SET_USER', res.data)
            }
        )
    },
    removeProduct({ commit,dispatch },id) {
        return new Promise((resolve, reject) => {
            ProductService.removeProduct(id)
                .then((res) => {
                    resolve(res)
                    commit('REMOVE_PRODUCT', id)
                    const notification = {
                        type: 'success',
                        message: 'product was deleted sucessfully '
                    }
                    dispatch('notification/add', notification, { root: true })
                })
                .catch((error) => {
                    reject(error.response.data.errors)
                    const notification = {
                        type: 'error',
                        message: 'sry somthing was wrong '
                    }
                    dispatch('notification/add', notification, { root: true })
                })
        })
    },
    editProduct({ commit,dispatch},product ) {
        return ProductService.editProduct(product)
            .then(() => {
                commit('EDIT_PRODUCT',product)
                const notification = {
                    type: 'success',
                    message: 'product was edited sucessfully '
                }
                dispatch('notification/add', notification, { root: true })
            })
            .catch( ()=> {
                const notification = {
                    type: 'error',
                    message: 'sry somthing was wrong'
                }
                dispatch('notification/add', notification, { root: true })
            })
    },
}
export const getters = {
    getProducts:state=> {
      return state.products
    },
    getProductById:state=>id=>{
        return state.products.find(product=>product.id===parseInt(id))
    },
    getProductByUserId:state=>userId=>{
        return state.products.filter(product=>product.userId===userId)
    },
    getUserProducts:state=> {
        return  state.userProduct
    },



}