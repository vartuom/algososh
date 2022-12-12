describe('reverse string page test', () => {
    it('checks whether button disabled or not when input is void', () => {
        cy.visit("http://localhost:3000/recursion")
        cy.contains('Развернуть').as('button')
        cy.get('input').should('be.empty')
        cy.get('@button').should('be.disabled')
        cy.get('input').type('ABCD')
        cy.get('@button').should('not.be.disabled')
        cy.get('input').clear()
        cy.get('@button').should('be.disabled')
    })

    it('checks animation of string reverse', () => {
        cy.visit("http://localhost:3000/recursion")
        cy.get('input').type('ABCD')
        cy.contains('Развернуть').click()
        cy.get("[class*=circle_circle]")
            //step 1 AbcD
            .each(($circle, index) => {
                if (index === 0) {
                    cy.wrap($circle).contains('A')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(210, 82, 225)" //changing
                    )
                }
                if (index === 1) {
                    cy.wrap($circle).contains('B')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(0, 50, 255)" //default
                    )
                }
                if (index === 2) {
                    cy.wrap($circle).contains('C')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(0, 50, 255)" //default
                    )
                }
                if (index === 3) {
                    cy.wrap($circle).contains('D')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(210, 82, 225)" //changing
                    );
                }
            })
        cy.wait(500);
        //step 2 dBCa
        cy.get("[class*=circle_circle]")
            .each(($circle, index) => {
                if (index === 0) {
                    cy.wrap($circle).contains('D')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(127, 224, 81)" //modified
                    )
                }
                if (index === 1) {
                    cy.wrap($circle).contains('B')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(210, 82, 225)" //changing
                    )
                }
                if (index === 2) {
                    cy.wrap($circle).contains('C')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(210, 82, 225)" //changing
                    )
                }
                if (index === 3) {
                    cy.wrap($circle).contains('A')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(127, 224, 81)" //modified
                    );
                }
            })
        cy.wait(500);
        //step 3 dcba
        cy.get("[class*=circle_circle]")
            .each(($circle, index) => {
                if (index === 0) {
                    cy.wrap($circle).contains('D')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(127, 224, 81)" //modified
                    )
                }
                if (index === 1) {
                    cy.wrap($circle).contains('C')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(127, 224, 81)" //modified
                    )
                }
                if (index === 2) {
                    cy.wrap($circle).contains('B')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(127, 224, 81)" //modified
                    )
                }
                if (index === 3) {
                    cy.wrap($circle).contains('A')
                    cy.wrap($circle).should(
                        "have.css",
                        "border",
                        "4px solid rgb(127, 224, 81)" //modified
                    );
                }
            })
    })
})