class auctionCard extends HTMLElement {
    connectedCallback(){
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
    /*
    <div class="s-finished-auctions">
    <div class="nft-img s"></div>
        <img src="https://images.unsplash.com/photo-1645731504636-72725e46b26b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG5mdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60" alt="finished-auction-img" class="f-auction">
        <h1 class="nft-name">UNHCR hand</h1>
        <p class="description">Okay beards</p>
        <div class="ended">3.00 SOL ENDED</div>
</div>*/
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
        image.classList.add('card__nftImage')
        image.src = result.url;
  
        //creo el título del producto por el nombre del nft
        const name = document.createElement('h1');
        name.classList.add('card__nftName')
        name.textContent = result.name;
  
        const collection = document.createElement('h2');
        collection.classList.add('card__collectionName')
        collection.textContent = result.collection;
        //creo elemento para la firma de la colección
        const price = document.createElement('p');
        price.classList.add('card__price')
        price.textContent = `Ended: ${result.price}${" "}${result.cryptocurrency}`;
  
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(collection);
        card.appendChild(price);
        cardContainer.appendChild(card);
      });
      this.appendChild(cardContainer);
    }
  }
  
  customElements.define('auction-card', auctionCard);
  