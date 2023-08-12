import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.styles'

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category
  return (
    <DirectoryItemContainer>
      <BackgroundImage style={{
        backgroundImage: `url(${imageUrl})`
      }}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem
