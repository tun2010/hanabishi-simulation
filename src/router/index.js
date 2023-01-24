import { createRouter, createWebHistory } from 'vue-router'
import CustomerView from '../views/CustomerView.vue'
import OrderView from '../views/OrderView.vue'

// const CustomerCreateView = () => import(/* webpackChunkName: "customer-create" */ '../views/CustomerCreateView.vue')
// const ItemsView = () => import(/* webpackChunkName: "items" */ '../views/ItemsView.vue')
// const SimulatorView = () => import(/* webpackChunkName: "simulator" */ '../views/SimulatorView.vue')
// const CartView = () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue')
// const CartItemsView = () => import(/* webpackChunkName: "cart-items" */ '../views/CartItemsView.vue')
// const CartSizesView = () => import(/* webpackChunkName: "cart-sizes" */ '../views/CartSizesView.vue')
// const CartSuccessView = () => import(/* webpackChunkName: "cart-success" */ '../views/CartSuccessView.vue')
// const ProductsView = () => import(/* webpackChunkName: "products" */ '../views/ProductsView.vue')

import CustomerCreateView from '../views/CustomerCreateView.vue'
import GuestCreateView from '../views/GuestCreateView.vue'
import ItemsView from '../views/ItemsView.vue'
import SimulatorView from '../views/SimulatorView.vue'
import SimulatorViewNew from '../views/SimulatorViewNew.vue'
import SuitSimulatorView from '../views/SuitSimulatorView'
import ShirtSimulatorView from '../views/ShirtSimulatorView.vue'
import CartView from '../views/CartView.vue'
import CartItemsView from '../views/CartItemsView.vue'
import CartSizesView from '../views/CartSizesView.vue'
import CartSuccessView from '../views/CartSuccessView.vue'
import ProductsView from '../views/ProductsView.vue'
import OrderHistoryView from '../views/OrderHistoryView.vue'
import OrderHistoryDetailView from '../views/OrderHistoryDetailView.vue'
import FabricsView from '../views/FabricsView.vue'

const routes = [
  {
    path: '/',
    name: 'customer',
    component: CustomerView,
  },
  {
    path: '/customer/create',
    name: 'customer-create',
    component: CustomerCreateView,
  },
  {
    path: '/customer/guest',
    name: 'guest-create',
    component: GuestCreateView,
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
  },
  {
    path: '/items',
    name: 'items',
    component: ItemsView,
  },
  {
    path: '/simulator',
    name: 'simulator',
    component: SimulatorView,
  },
  {
    path: '/simulator/suit',
    name: 'simulator-suit',
    component: SuitSimulatorView,
  },
  {
    path: '/simulator/shirt',
    name: 'simulator-shirt',
    component: ShirtSimulatorView,
  },
  {
    path: '/simulator-new',
    name: 'simulator-new',
    component: SimulatorViewNew,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    children: [
      {
        path: '',
        name: 'cart-items',
        component: CartItemsView,
      },
      {
        path: 'sizes',
        name: 'cart-sizes',
        component: CartSizesView,
      },
      {
        path: 'success',
        name: 'cart-success',
        component: CartSuccessView,
      }
    ]
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderHistoryView,
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: OrderHistoryDetailView,
  },
  {
    path: '/fabrics',
    name: 'fabrics',
    component: FabricsView,
  },
]

const router = createRouter({
  history: createWebHistory('/myshop/'),
  routes,
})

export default router
