import { expect } from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://tiendaonline.movistar.com.ar';

        this.firstProductCard = 'div.products:nth-child(1) > ol:nth-child(1) > li:nth-child(1)';
    }

    async navigate() {
        console.log('⌛ Navegando a la tienda Movistar...');
        await this.page.goto(this.url);
        await expect(this.page).toHaveTitle(/Movistar/i);
    }

    async selectFirstProduct() {
        console.log('⌛ Seleccionando el primer celular de la lista...');
        const product = this.page.locator(this.firstProductCard);
        
        await product.waitFor({ state: 'visible', timeout: 5000 });
        await product.scrollIntoViewIfNeeded();
        await product.click();
    }
}
