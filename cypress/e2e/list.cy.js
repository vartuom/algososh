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

    it('checks appending to the tail of the list', () => {
        cy.visit("http://localhost:3000/list")
        cy.get('input[name="value"]').type("TEST");
        cy.contains("Добавить в tail").click();
        //push test - small circle step
        cy.get("[class*=circleWrapper]")
            .eq(3)
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
            .eq(4)
            .should('contain', 'tail')
            .should('contain', 'TEST')
            .should('contain', '4') //new last index
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
            .eq(4)
            .should(
                "have.css",
                "border",
                //default
                "4px solid rgb(0, 50, 255)"
            )
    });

    it('checks inserting element by index', () => {
        cy.visit("http://localhost:3000/list")
        cy.get('input[name="value"]').type("TEST");
        cy.get('input[name="index"]').type('2')
        cy.contains("Добавить по индексу").click();
        //insert 'test' by index - small circle step
        for (let step = 0; step <= 2; step++) {
            cy.get("[class*=circleWrapper]")
                //select all elements at an index less than what is supplied
                .filter(":lt(3)")
                .each(($circleWrapper, index) => {
                    if (index === step) {
                        cy.wrap($circleWrapper)
                            .within(() => {
                                cy.get("[class*=circle_small]")
                                    .should(
                                        "have.css",
                                        "border",
                                        //changing
                                        "4px solid rgb(210, 82, 225)")
                                    .should("have.text", "TEST");
                            })
                    }
                })
            cy.wait(500)
        }
        //insert 'test' by index - modified step
        cy.get("[class*=circle_content]")
            .eq(2)
            .should('contain', 'TEST')
            .should('contain', '2') //target index
            .get('[class*=circle_circle]')
            .eq(2)
            .should(
                "have.css",
                "border",
                //modified
                "4px solid rgb(127, 224, 81)"
            )
        //insert 'test' by index - done
        cy.wait(500);
        cy.get("[class*=circle_circle]").each(($circle, index) => {
            cy.wrap($circle)
                .should(
                    "have.css",
                    "border",
                    //default
                    "4px solid rgb(0, 50, 255)")
        });
    });

    it('checks removing of the element from the head', () => {
        cy.visit("http://localhost:3000/list")
        cy.contains("Удалить из head").click();
        //remove item from head - small circle step
        cy.get("[class*=circleWrapper]")
            .first()
            .get("[class*=circle_small]")
            .should(
                "have.css",
                "border",
                //changing
                "4px solid rgb(210, 82, 225)"
            )
            .get("[class*=text_type_circle]")
            //check text dropping
            .invoke('text')
            .then((text1) => {
                cy.get("[class*=circle_circle]")
                    .first()
                    .should('not.have.text', text1)
            })
        cy.wait(500);
        //removing - done
        cy.get("[class*=circle_circle]")
            .first()
            .should(
                "have.css",
                "border",
                //default
                "4px solid rgb(0, 50, 255)"
            )
    });

    it('checks removing of the element from the tail', () => {
        cy.visit("http://localhost:3000/list")
        cy.contains("Удалить из tail").click();
        //remove item from head - small circle step
        cy.get("[class*=circleWrapper]")
            .last()
            .get("[class*=circle_small]")
            .should(
                "have.css",
                "border",
                //changing
                "4px solid rgb(210, 82, 225)"
            )
            .get("[class*=text_type_circle]")
            //check text dropping
            .invoke('text')
            .then((text1) => {
                cy.get("[class*=circle_circle]")
                    .last()
                    .should('not.have.text', text1)
            })
        cy.wait(500);
        //removing - done
        cy.get("[class*=circle_circle]")
            .last()
            .should(
                "have.css",
                "border",
                //default
                "4px solid rgb(0, 50, 255)"
            )
    });

    it('checks removing element by index', () => {
        cy.visit("http://localhost:3000/list")
        cy.get('input[name="index"]').type('2')
        cy.contains("Удалить по индексу").click();
        //delete by index - small circle step
        for (let step = 0; step <= 2; step++) {
            cy.get("[class*=circleWrapper]")
                //select all elements at an index less than what is supplied
                .filter(":lt(3)")
                .each(($circleWrapper, index) => {
                    if (index === 2 && step === 2) {
                        cy.wrap($circleWrapper)
                            .within(() => {
                                cy.get("[class*=circle_small]")
                                    .should(
                                        "have.css",
                                        "border",
                                        //changing
                                        "4px solid rgb(210, 82, 225)"
                                    )
                                    .within(() => {
                                        cy.get("[class*=text_type_circle]")
                                            //check text dropping
                                            .invoke('text')
                                            .then((text1) => {
                                                cy.wrap($circleWrapper)
                                                    .within(() => {
                                                        cy.get("[class*=circle_circle]")
                                                            .should('not.have.text', text1)
                                                    })

                                            })
                                    })

                            })
                    } else {
                        cy.wrap($circleWrapper).within(() => {
                            cy.get("[class*=circle_circle]")
                                .should(
                                    "have.css",
                                    "border",
                                    //changing
                                    "4px solid rgb(210, 82, 225)");
                        })
                    }
                });
            cy.wait(300);
        }
        cy.get("[class*=circle_circle]").each(($circle, index) => {
            cy.wrap($circle)
                .should(
                    "have.css",
                    "border",
                    //default
                    "4px solid rgb(0, 50, 255)")
        });
    });
})
