import { useContext } from 'react'
import { ProductCardContainer } from './product-card.styles'
import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product
  const { addItemToCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(product)

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>add to cart</Button>
  </ProductCardContainer>
  )
}

export default ProductCard
