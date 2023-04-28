class AuctionCard extends HTMLElement {
  constructor(){
    super();
    this.nfts = [];
  }
  connectedCallback(){
    this.filterButtons = document.querySelectorAll('.filter-button');
this.getData()
  }
  async getData(){
try {
      const response = await fetch('https://magic-eden-nfts-default-rtdb.firebaseio.com/products.json');
      const data = await response.json();
      console.log(response);
      this.nfts = Object.values(data);
      this.renderCards(this.nfts);
    } catch (error) {
      console.error(error);
    }

    this.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.filterButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');
        const selectedCategory = button.getAttribute('data-category');
        this.filterProducts(selectedCategory);
      });
    });
  }
  

 renderCards(products) {


  const cardContainer = document.createElement('div');
  cardContainer.classList.add('auction-container');

  this.appendChild(cardContainer);
 
  products.forEach(nft => {
    console.log( 'hola')
    
    const card = document.createElement('div');
    card.classList.add('card');

    const nftImage = document.createElement('img');
    nftImage.classList.add('card__nftImage');
    nftImage.src = nft.url;

    const nftName = document.createElement('h1');
    nftName.classList.add('card__nftName');
    nftName.textContent = nft.name;

    const collectionName = document.createElement('h2');
    collectionName.classList.add('card__collectionName');
    collectionName.textContent = nft.collection;

    const priceElement = document.createElement('p');
    priceElement.classList.add('card__price');
    priceElement.textContent = `${nft.price} ${nft.cryptocurrency === "SOL"}`;

    card.appendChild(nftImage);
    card.appendChild(nftName);
    card.appendChild(collectionName);
    card.appendChild(priceElement);
    cardContainer.appendChild(card);
  });
}


filterProducts(category) {
  if (category === 'All') {
    this.nfts = Object.values(this.nfts);
  } else if (category === 'SOL' || category === 'ETH' || category === 'BTC') {
    this.nfts = Object.values(this.nfts).filter(product => product.cryptocurrency === 'SOL');
  } else if (category === 'price') {
    this.nfts = Object.values(this.nfts).filter(product => product.price <= 1);
  } else {
    this.nfts = Object.values(this.nfts).filter(product => product.collection.toLowerCase() === category.toLowerCase());
  }
  this.renderCards(this.nfts);
}

}

customElements.define('auction-card', AuctionCard);
