Feature: Parts Module End-to-End Validation

  Background:
    Given User is logged into Techline application

  Scenario: Verify complete Parts module functionality
    Given User navigates to Library for Parts
    
    And User clicks on Parts link
    Then Parts listing page should be displayed
    When User click the Parts Create button
    Then Add Parts page should be displayed
    When User enters part details
    And User click the Publish button
    Then Part should be saved successfully