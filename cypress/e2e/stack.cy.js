describe('stack page test', () => {
    it('checks whether button disabled or not when input is void', () => {
        cy.visit("http://localhost:3000/stack")
        cy.contains('Добавить').as('button')
        cy.get('input').should('be.empty')
        cy.get('@button').should('be.disabled')
        cy.get('input').type('1')
        cy.get('@button').should('not.be.disabled')
        cy.get('input').clear()
        cy.get('@button').should('be.disabled')
    })

    it('checks animation of pushing elements in stack', () => {
        cy.visit("http://localhost:3000/stack")
        //push 1
        cy.get('input').type('1')
        cy.contains('Добавить').click()
        cy.get("[class*=circle_content]")
            .should('contain', 'top')
            .should('contain', '1')
            .should('contain', '0')
        //changing
        cy.get("[class*=circle_circle]")
            .should(
                "have.css",
                "border",
                "4px solid rgb(210, 82, 225)"
            )
        cy.wait(500);
        //done
        cy.get("[class*=circle_circle]")
            .should(
                "have.css",
                "border",
                "4px solid rgb(0, 50, 255)"
            )
        //push 2
        cy.get('input').type('2')
        cy.contains('Добавить').click()
        //changing
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            if (index === 0) {
                cy.wrap($circleWrapper)
                    .should('not.contain', 'top')
                    .should('contain', '1')
                    .should('contain', '0')
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    "4px solid rgb(0, 50, 255)"
                )
            } else {
                cy.wrap($circleWrapper)
                    .should('contain', 'top')
                    .should('contain', '2')
                    .should('contain', '1')
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    "4px solid rgb(210, 82, 225)"
                )
            }
        })
        cy.wait(500);
        //done
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            if (index === 0) {
                cy.wrap($circleWrapper)
                    .should('not.contain', 'top')
                    .should('contain', '1')
                    .should('contain', '0')
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    "4px solid rgb(0, 50, 255)"
                )
            } else {
                cy.wrap($circleWrapper)
                    .should('contain', 'top')
                    .should('contain', '2')
                    .should('contain', '1')
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    "4px solid rgb(0, 50, 255)"
                )
            }
        })
        //pop
        cy.contains('Удалить').click()
        cy.get("[class*=circle_content]")
            .should('have.length', 1)
            .should('contain', 'top')
            .should('contain', '1')
            .should('contain', '0')
    })

    it('checks clear button behavior', () => {
        cy.visit("http://localhost:3000/stack")
        cy.get('input').type('1')
        cy.contains('Добавить').click()
        cy.wait(500);
        cy.get('input').type('2')
        cy.contains('Добавить').click()
        cy.wait(500);
        cy.get("[class*=circle_content]").should('have.length', 2)
        cy.contains('Очистить').click()
        cy.get("[class*=circle_content]").should('have.length', 0)
    })
})
