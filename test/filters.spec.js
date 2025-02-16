import { test } from '@playwright/test';
import { FiltersPage } from '../pages/FiltersPage';

test('Filtrar productos en Tienda Movistar', async ({ page }) => {
    const filtersPage = new FiltersPage(page);

    await filtersPage.navigate();

    await filtersPage.applyMarcaFilter();
    await filtersPage.applyPrecioFilter();
    await filtersPage.applyCuotasFilter();
    await filtersPage.applyMemoriaFilter();
    await filtersPage.applyCamaraFilter();
    await filtersPage.applyPantallaFilter(); 
});
