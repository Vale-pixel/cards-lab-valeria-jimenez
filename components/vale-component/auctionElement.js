class AuctionCardElement extends HTMLElement {
  constructor() {
    //cuando no cargue un custom elements, es mejor llamar a super
    super();
    //shadow root
    this.name = this.getAttribute('name')
    this.img = this.getAttribute('img')
  }
  static get observedAttributes() {
    return ['name', 'img'];
  }
  //cuando el comp se agrega a lDOM pirnicpal de la pag
  //obetener datos de la API usando fetch
  render(){
    const templateAuction = document.createElement('template-auction')
    templateAuction.innerHTML = `
    <link rel="stylesheet" href="/components/vale-component/style.css">
    <div class="auction-container">
      <div class="content-section">
        <div class="a-card">
            <img src="${this.img}" alt="">
            <h2>${this.name}</h2>
            <p>Finished auction</p>
        </div>
      </div>
    </div>
    `
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateAuction.content.cloneNode(true));
  }

  connectedCallback(){
    this.render()
    console.log("en la pag");
}
}

//llamar en objeto window donde se registran los elementos para defnir un custom element
customElements.define('auction-element', AuctionCardElement);
export default AuctionCardElement;

fetch('https://nftproducts.free.beeceptor.com/nfts')
.then(response => response.json())
.then(data => {
  // Create and append web components to display data
  data.forEach(card => {
    console.log(card.name)
    const auctionCard = document.createElement('template-auction');
    auctionCard.setAttribute('name', card.products.name);
    auctionCard.setAttribute('image', card.products.url);
    document.body.appendChild(auctionCard);
  });
});

  