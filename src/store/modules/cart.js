export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0
    };
  },
  mutations: {
    addProductToCart(state, payload) {
      // receives product data as the payload
      const productData = payload;
      // finds the particular item
      const productInCartIndex = state.items.findIndex(
        cartItem => cartItem.productId === productData.id
      );

      // if the product is already in the cart
      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        // for new product item in the cart
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += productData.price;
    },

    removeProductFromCart(state, payload) {
      const prodId = payload.productId;
      const productInCartIndex = state.items.findIndex(
        cartItem => cartItem.productId === prodId
      );
      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      state.qty -= prodData.qty;
      state.total -= prodData.price * prodData.qty;
    }
  },
  actions: {
    addToCart(context, payload) {
      const prodId = payload.id;
      const products = context.rootGetters['prods/products'];
      const product = products.find(prod => prod.id === prodId);
      context.commit('addProductToCart', product);
    },

    removeFromCart(context, payload) {
      context.commit('removeProductFromCart', payload);
    }
  },
  getters: {
    products(state) {
      return state.items;
    },

    totalSum(state) {
      return state.total;
    },

    quantity(state) {
      return state.qty;
    }
  }
};
