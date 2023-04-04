class auctionCard extends HTMLElement {
    connectedCallback() {
      this.getData();
    }
  
    async getData() {
      try {
        const response = await fetch('https://nftproducts.free.beeceptor.com/nfts');
        const data = await response.json();
        this.renderCards(data.products);
      } catch (error) {
        console.error(error);
      }
    }
  
    renderCards(results) {
      //creo el elemento auction-container en html
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('auction-container');
  
  
      results.forEach(result => {
        //creo el elemnto card en html
        const card = document.createElement('div');
        card.classList.add('card');
  
        //constante para imagen
        const image = document.createElement('img');
        image.src = result.url;
  
        //creo el título del producto por el nombre del nft
        const name = document.createElement('h2');
        name.textContent = result.name;
  
        //creo elemento para la firma de la colección
        const collection = document.createElement('p');
        collection.textContent = `Auction ended: ${result.collection}`;
  
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(collection);
        cardContainer.appendChild(card);
      });
      this.appendChild(cardContainer);
    }
  }
  
  customElements.define('auction-card', auctionCard);
  