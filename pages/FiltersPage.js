import { expect } from '@playwright/test';

export class FiltersPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://tiendaonline.movistar.com.ar';

        this.filterMarca = 'div.filter-item:nth-of-type(1) > div:nth-of-type(1)';
        this.filterPrecio = 'div.filter-item:nth-of-type(2) > div:nth-of-type(1)';
        this.filterCuotas = 'div.filter-item:nth-of-type(3) > div:nth-of-type(1)';
        this.filterMemoria = 'div.filter-item:nth-of-type(5) > div:nth-of-type(1)';
        this.filterCamara = 'div.filter-item:nth-of-type(6) > div:nth-of-type(1)';
        this.filterPantalla = 'div.filter-item:nth-of-type(7) > div:nth-of-type(1)';
    }

    async navigate() {
        await this.page.goto(this.url);
        await expect(this.page).toHaveTitle(/Movistar/i);
    }

async openFilter(filterSelector) {
    const filterElement = this.page.locator(filterSelector);
    await filterElement.waitFor({ state: 'visible', timeout: 7000 });
    await filterElement.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);

    // Intentar hacer clic sin forzar, si falla, usar force:true
    await filterElement.click().catch(async () => {
        await filterElement.click({ force: true });
    });

    await this.page.waitForTimeout(1000);
}

async verifyFilterOptions(selectorArray) {
    for (const selector of selectorArray) {
        const option = this.page.locator(selector);
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.scrollIntoViewIfNeeded();
        await expect(option).toBeVisible();
    }
}

    async applyMarcaFilter() {
        console.log('⌛ Abriendo filtro de Marca...');
        await this.openFilter(this.filterMarca);
        const marcasCSS = [
            'div.filter-item:nth-of-type(1) > div:nth-of-type(2) > ol > li:nth-of-type(1) > a', // Samsung
            'div.filter-item:nth-of-type(1) > div:nth-of-type(2) > ol > li:nth-of-type(2) > a', // Motorola
            'div.filter-item:nth-of-type(1) > div:nth-of-type(2) > ol > li:nth-of-type(3) > a', // TCL
            'div.filter-item:nth-of-type(1) > div:nth-of-type(2) > ol > li:nth-of-type(4) > a', // Xiaomi
            'div.filter-item:nth-of-type(1) > div:nth-of-type(2) > ol > li:nth-of-type(5) > a'  // ZTE
        ];
        await this.verifyFilterOptions(marcasCSS);
    }

    async applyPrecioFilter() {
        console.log('⌛ Abriendo filtro de Precio...');
        await this.openFilter(this.filterPrecio);
        const preciosCSS = [
            'div.filter-item:nth-of-type(2) > div:nth-of-type(2) > ol > li:nth-of-type(1) > a', // $ 0 - $ 300.000
            'div.filter-item:nth-of-type(2) > div:nth-of-type(2) > ol > li:nth-of-type(2) > a'  // $ 300.000 - $ 600.000
        ];
        await this.verifyFilterOptions(preciosCSS);
    }

    async applyCuotasFilter() {
        console.log('⌛ Abriendo filtro de Cuotas...');
        await this.openFilter(this.filterCuotas);
        const cuotasCSS = [
            'div.filter-item:nth-of-type(3) > div:nth-of-type(2) > ol > li:nth-of-type(1) > a', // 3 cuotas
            'div.filter-item:nth-of-type(3) > div:nth-of-type(2) > ol > li:nth-of-type(2) > a', // 6 cuotas
            'div.filter-item:nth-of-type(3) > div:nth-of-type(2) > ol > li:nth-of-type(3) > a', // 9 cuotas
            'div.filter-item:nth-of-type(3) > div:nth-of-type(2) > ol > li:nth-of-type(4) > a'  // 12 cuotas
        ];
        await this.verifyFilterOptions(cuotasCSS);
    }

    async applyMemoriaFilter() {
        console.log('⌛ Abriendo filtro de Memoria Interna...');
        await this.openFilter(this.filterMemoria);
        const memoriaCSS = [
            'div.filter-item:nth-of-type(5) > div:nth-of-type(2) > ol > li:nth-of-type(1) > a', // 32GB
            'div.filter-item:nth-of-type(5) > div:nth-of-type(2) > ol > li:nth-of-type(2) > a'  // 64GB
        ];
        await this.verifyFilterOptions(memoriaCSS);
    }

    async applyCamaraFilter() {
        console.log('⌛ Abriendo filtro de Cámara...');
        await this.openFilter(this.filterCamara);
        const camaraCSS = [
            'div.filter-item:nth-of-type(6) > div:nth-of-type(2) > ol > li:nth-of-type(1) > a', // Primera opción
            'div.filter-item:nth-of-type(6) > div:nth-of-type(2) > ol > li:nth-of-type(3) > a'  // Tercera opción
        ];
        await this.verifyFilterOptions(camaraCSS);
    }

    async applyPantallaFilter() {
        console.log('⌛ Abriendo filtro de Tamaño de Pantalla...');
        await this.openFilter(this.filterPantalla);
        const pantallaCSS = [
            'div.filter-item:nth-of-type(7) > div:nth-of-type(2) > ol > li:nth-of-type(1) > a',  // 6 pulgadas
            'div.filter-item:nth-of-type(7) > div:nth-of-type(2) > ol > li:nth-of-type(8) > a'   // 6.55 pulgadas
        ];
        await this.verifyFilterOptions(pantallaCSS);
    }
}
