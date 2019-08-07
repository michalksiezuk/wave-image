const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: flex;
            justify-content: center;
        }
        
        .wave-image {
            max-width: 600px;
            overflow: hidden;
            box-shadow: 0 0 0 rgba(0,0,0,0);
            transition: box-shadow 600ms ease-out;
        }
        
        .wave-image img {
            display: block;
            width: 100%;
            transform: scale(1);
            transition: transform 600ms ease-out;
        }
        
        .with-shadow:hover {
            box-shadow: 0 5px 20px rgba(0,0,0,0.5);
        }
        
        .with-zoom:hover img {
            transform: scale(1.05);
        }
    </style>
    
    <div class="wave-image">
        <img alt="" src="" />
    </div>
`;

class WaveImage extends HTMLElement {
    constructor() {
        super();

        this.defaultAlt = "";
        this.defaultSrc = "";
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({mode: "open"});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        this.wrapper = this.shadowRoot.querySelector(".wave-image");
        this.image = this.shadowRoot.querySelector("img");

        this.image.alt = this.getAttribute("alt") || this.defaultAlt;
        this.image.src = this.getAttribute("src") || this.defaultSrc;

        const featureClasses = [
            this.withShadow && "with-shadow",
            this.withZoom && "with-zoom"
        ].filter(feature => feature !== false);

        this.wrapper.classList.add(...featureClasses);
    }

    get withShadow() {
        return this.hasAttribute("with-shadow");
    }

    get withZoom() {
        return this.hasAttribute("with-zoom");
    }
}

const register = () => customElements.define("wave-image", WaveImage);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
