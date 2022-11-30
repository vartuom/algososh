describe('queue page test', () => {
    it('checks whether button disabled or not when input is void', () => {
        cy.visit("http://localhost:3000/list")
        cy.get('input[name="value"]').should('be.empty')
        cy.get('input[name="index"]').should('be.empty')
        cy.contains("Добавить в head").should("be.disabled");
        cy.contains("Добавить в tail").should("be.disabled");
        cy.contains("Добавить по индексу").should("be.disabled");
        cy.contains("Удалить по индексу").should("be.disabled");
        cy.get('input[name="value"]').type("42");
        cy.contains("Добавить в head").should("not.be.disabled");
        cy.contains("Добавить в tail").should("not.be.disabled");
        cy.get('input[name="index"]').type("0");
        cy.contains("Добавить по индексу").should("not.be.disabled");
        cy.contains("Удалить по индексу").should("not.be.disabled");
    })

    it('checks rendering of initial list on load', () => {
        cy.visit("http://localhost:3000/list")
        cy.get("[class*=circle_content]").each(($circleWrapper, index) => {
            switch (index) {
                case 0:
                    cy.wrap($circleWrapper)
                        .should('contain', 'head')
                        .should('contain', index)
                    cy.wrap($circleWrapper).children("[class*=circle_circle]").should(
                        "have.css",
                        "border",
                        //default
                        "4px solid rgb(0, 50, 255)"
                    )
                    break;
                case 3:
                    cy.wrap($circleWrapper)
                        .should('not.contain', 'head')
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

    it('checks prepending to the head of the list', () => {
        cy.visit("http://localhost:3000/list")
        cy.get('input[name="value"]').type("TEST");
        cy.contains("Добавить в head").click();
        //push test - small circle step
        cy.get("[class*=circleWrapper]")
            .first()
            .get("[class*=circle_small]")
            .should('contain', 'TEST')
            .should(
                "have.css",
                "border",
                //changing
                "4px solid rgb(210, 82, 225)"
            )
        cy.wait(500);
        //push test - modified step
        cy.get("[class*=circle_content]")
            .first()
            .should('contain', 'head')
            .should('contain', 'TEST')
            .should('contain', '0') //first index
            .find('[class*=circle_circle]')
            .should(
                "have.css",
                "border",
                //modified
                "4px solid rgb(127, 224, 81)"
            )
        cy.wait(500);
        //push test - done
        cy.get("[class*=circle_circle]")
            .first()
            .should(
                "have.css",
                "border",
                //default
                "4px solid rgb(0, 50, 255)"
            )
    });
})
