describe('tax categories', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('button.btn').click({force: true});
  });
  // Remove .only and implement others test cases!
  it('create a new tax category', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');
    // Click on create button
    cy.get('.btn-list > .btn').click({force: true});
    // Type category code
    cy.get('#sylius_admin_tax_category_code').type('44');
    // Type category name
    cy.get('#sylius_admin_tax_category_name').type('44');
    // Type category description
    cy.get('#sylius_admin_tax_category_description').type('4444');

    // Click on create button
    cy.get('.btn-primary').scrollIntoView().click({force:true});
    // Assert that tax category has been created.
    cy.get('body').should('contain', 'Tax category has been successfully created.');
  });

  it('create a tax category with same name and error occurs', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');
    // Click on create button
    cy.get('.btn-list > .btn').click({force: true});
    // Type category code
    cy.get('#sylius_admin_tax_category_code').type('44');
    // Type category name
    cy.get('#sylius_admin_tax_category_name').type('44');
    // Type category description
    cy.get('#sylius_admin_tax_category_description').type('4444');
    cy.get('.btn-primary').scrollIntoView().click({force:true});

    cy.contains('This form contains errors.')
  });

  it('create a new tax category with a blank code error occurs', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');
    // Click on create button
    cy.get('.btn-list > .btn').click({force: true});
    // Type category name
    cy.get('#sylius_admin_tax_category_name').type('44');
    // Type category description
    cy.get('#sylius_admin_tax_category_description').type('4444');
    cy.get('.btn-primary').scrollIntoView().click({force:true});

    cy.get('.invalid-feedback').should('exist').contains('Please enter tax category code.');
  });

  it('create a new tax category with a blank name and error occurs', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');
    // Click on create button
    cy.get('.btn-list > .btn').click({force: true});
    // Type category code
    cy.get('#sylius_admin_tax_category_code').type('45');
    // Type category description
    cy.get('#sylius_admin_tax_category_description').type('4444');
    cy.get('.btn-primary').scrollIntoView().click({force:true});

    cy.get('.invalid-feedback').should('exist').contains('Please enter tax category name.');
  });

  it('create a new tax category with a blank description', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');
    // Click on create button
    cy.get('.btn-list > .btn').click({force: true});
    // Type category code
    cy.get('#sylius_admin_tax_category_code').type('45');
    // Type category name
    cy.get('#sylius_admin_tax_category_name').type('44');  
    cy.get('.btn-primary').scrollIntoView().click({force:true});

    cy.get('.invalid-feedback').should('exist').contains('Please enter tax category name.');
  });

  it('edit tax category', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');

    cy.get('.accordion-button').should('exist');
    cy.get('[data-test-resource-id="3"] > [data-test-actions=""] > .d-flex > a.btn').click();
    cy.get('#sylius_admin_tax_category_description').type('4444');
    cy.get('.btn-primary').click();
    cy.contains('Tax category has been successfully updated.')
  });

  it('delete tax category', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');

    cy.get('.accordion-button').should('exist');
    cy.get('[data-test-modal="delete"]').eq(0).click();
    cy.get('#delete-modal-5 > .modal-dialog > .modal-content > .modal-footer > form > .btn-danger').click();
    cy.contains('Tax category has been successfully deleted.');
  });

  it('check text count view tax category', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');

    cy.get('.accordion-button').should('exist');
    cy.get('.card-footer > .text-muted').contains('Showing 1 to 2 of 2 entries').wait(30000);
  });

  it.only('check pagination tax category', () => {
    // Click in tax categories in side menu
    cy.clickInFirst('a[href="/admin/tax-categories/"]');

    cy.get('.accordion-button').should('exist');
    cy.get('.pagination > :nth-child(1)').contains('Previous');
    cy.get('.pagination > :nth-child(3)').contains('Next');
  });
});
