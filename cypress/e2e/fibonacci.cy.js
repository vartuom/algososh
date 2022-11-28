describe('fibonacci page test', () => {
    it('checks whether button disabled if input is void', () => {
        cy.visit("http://localhost:3000/fibonacci")
        cy.contains('Рассчитать').as('button')
        cy.get('input').should('be.empty')
        cy.get('@button').should('be.disabled')
        cy.get('input').type('3')
        cy.get('@button').should('not.be.disabled')
        cy.get('input').clear()
        cy.get('@button').should('be.disabled')
    })

    it('checks animation of printing numbers', () => {
        cy.visit("http://localhost:3000/fibonacci")
        cy.get('input').type('3')
        cy.contains('Рассчитать').click()
        //step 1
        cy.get("[class*=circle_circle]").contains('1')
        cy.wait(500);
        //step 1 1
        cy.get("[class*=circle_circle]")
            .each(($circle, index) => {
                if (index === 0) {
                    cy.wrap($circle).contains('1')
                } else {
                    cy.wrap($circle).contains('1')
                }
            })
        cy.wait(500);
        //step 1 1 2
        cy.get("[class*=circle_circle]")
            .each(($circle, index) => {
                if (index === 0 || index === 1) {
                    cy.wrap($circle).contains('1')
                } else {
                    cy.wrap($circle).contains('2')
                }
            })
    })
})