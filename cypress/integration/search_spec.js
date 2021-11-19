describe('Home Page', () => {
    it('Open home page', () => {
        cy.visit('/');
    });

    it('Check updating url', () => {
        cy.url().should('include', '/search');
    });

    it('Type request in the search input', () => {
        cy.get('#search')
            .type('Jumanji')
            .should('have.value', 'Jumanji');
    });

    it('Click on the search button', () => {
        cy.contains('Search').click();
    });

    it('Check request string in url', () => {
        cy.url().should('include', '/search/Jumanji');
    });

    it('Check correct amount of found movies', () => {
        cy.get('#counter')
            .find('span')
            .should('contain', '2');
    });

    it('Click on the first movie from list', () => {
        cy.get('#movie')
            .click({force: true});
    });

    it('Check updating url', () => {
        cy.url().should('include', '/movie/');
    });

    it('Check appeared movie in header section', () => {
        cy.get('#movie-details')
            .find('h3')
            .should('contain', 'Jumanji');

        cy.get('#movie-details')
            .find('img')
            .should('have.attr', 'src');
    });
})