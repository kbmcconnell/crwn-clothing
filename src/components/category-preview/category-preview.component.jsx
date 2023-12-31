import { CategoryPreviewContainer, Preview, CategoryPreviewTitle } from './category-preview.styles'
import '../product-card/product-card.component'
import ProductCard from '../product-card/product-card.component'

const CategoryPreview = ({ title, products }) => {

  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryPreviewTitle to={title}>
          {title.toUpperCase()}
        </CategoryPreviewTitle>
      </h2>
      <Preview>
        {
          products
            .filter((_, idx) => idx < 4)
            .map((product) =>
            <ProductCard key={product.id} product={product} />)
        }
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview
