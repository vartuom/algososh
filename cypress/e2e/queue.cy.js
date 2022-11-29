describe('queue page test', () => {
    it('checks whether button disabled or not when input is void', () => {
        cy.visit("http://localhost:3000/queue")
        cy.contains('Добавить').as('button')
        cy.get('input').should('be.empty')
        cy.get('@button').should('be.disabled')
        cy.get('input').type('1')
        cy.get('@button').should('not.be.disabled')
        cy.get('input').clear()
        cy.get('@button').should('be.disabled')
    })

    it('checks animation of adding/removing elements from queue', () => {
        cy.visit("http://localhost:3000/queue")
        //push 1
        cy.get('input').type('A')
        cy.contains('Добавить').click()
        //changing push 1
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            if (index === 0) {
                cy.wrap($circleWrapper)
                    .should('contain', 'head')
                    .should('contain', 'A')
                    .should('contain', index)
                    .should('contain', 'tail')
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    //changing
                    "4px solid rgb(210, 82, 225)"
                )
            } else {
                cy.wrap($circleWrapper)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('contain', index)
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    //default
                    "4px solid rgb(0, 50, 255)"
                )
            }
        })
        cy.wait(500);
        //done push 1
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                "have.css",
                "border",
                //default
                "4px solid rgb(0, 50, 255)"
            )
        })
        //push 2
        cy.get('input').type('B')
        cy.contains('Добавить').click()
        //changing push 2
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            switch (index) {
                case 0:
                    cy.wrap($circleWrapper)
                        .should('contain', 'head')
                        .should('contain', 'A')
                        .should('contain', index)
                        .should('not.contain', 'tail')
                    cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                        "have.css",
                        "border",
                        //default
                        "4px solid rgb(0, 50, 255)"
                    )
                    break;
                case 1:
                    cy.wrap($circleWrapper)
                        .should('not.contain', 'head')
                        .should('contain', 'B')
                        .should('contain', index)
                        .should('contain', 'tail')
                    cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                        "have.css",
                        "border",
                        //changing
                        "4px solid rgb(210, 82, 225)"
                    )
                    break;
                default:
                    cy.wrap($circleWrapper)
                        .should('not.contain', 'head')
                        .should('not.contain', 'tail')
                        .should('contain', index)
                    cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                        "have.css",
                        "border",
                        //default
                        "4px solid rgb(0, 50, 255)"
                    )
            }
        })
        cy.wait(500);
        //done push 2
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                "have.css",
                "border",
                //default
                "4px solid rgb(0, 50, 255)"
            )
        })
        //pop
        cy.contains('Удалить').click()
        //changing pop
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            if (index === 0) {
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    //changing
                    "4px solid rgb(210, 82, 225)"
                )
            } else {
                cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                    "have.css",
                    "border",
                    //default
                    "4px solid rgb(0, 50, 255)"
                )
            }
        })
        cy.wait(500);
        //pop done
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            switch (index) {
                case 0:
                    cy.wrap($circleWrapper)
                        .should('not.contain', 'head')
                        .should('not.contain', 'A')
                        .should('contain', index)
                        .should('not.contain', 'tail')
                    cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                        "have.css",
                        "border",
                        //default
                        "4px solid rgb(0, 50, 255)"
                    )
                    break;
                case 1:
                    cy.wrap($circleWrapper)
                        .should('contain', 'head')
                        .should('contain', 'B')
                        .should('contain', index)
                        .should('contain', 'tail')
                    cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                        "have.css",
                        "border",
                        //default
                        "4px solid rgb(0, 50, 255)"
                    )
                    break;
                default:
                    cy.wrap($circleWrapper)
                        .should('not.contain', 'head')
                        .should('not.contain', 'tail')
                        .should('contain', index)
                    cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                        "have.css",
                        "border",
                        //default
                        "4px solid rgb(0, 50, 255)"
                    )
            }
        })
    })

    it('checks clear button behavior', () => {
        cy.visit("http://localhost:3000/queue")
        cy.get('input').type('A')
        cy.contains('Добавить').click()
        cy.wait(500);
        cy.get('input').type('B')
        cy.contains('Добавить').click()
        cy.wait(500);

        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            switch (index) {
                case 0:
                    cy.wrap($circleWrapper).should('contain', 'A')
                    break;
                case 1:
                    cy.wrap($circleWrapper).should('contain', 'B')
                    break;
            }
        })
        cy.contains('Очистить').click()
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            cy.wrap($circleWrapper)
                .should('not.contain', 'A')
                .should('not.contain', 'B')
                .should('not.contain', 'head')
                .should('contain', index)
                .should('not.contain', 'tail')
        })
    })
})
