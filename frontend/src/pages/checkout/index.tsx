


import { useCart } from '../../hooks/useCart'
import styles from './Checkout.module.css'

export function CheckoutPage() {
  const { cartItems, total } = useCart()

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      
      <div className={styles.cartItems}>
        {cartItems.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>Total: ${total.toFixed(2)}</h2>
        <button className={styles.checkoutButton}>
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}

export { CheckoutPage as default }


