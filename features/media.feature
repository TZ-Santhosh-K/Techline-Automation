Feature: Media Manager Module End-to-End Validation

  Background:
    Given User is logged into Techline application

  Scenario: Verify complete Media Manager module functionality
    Given User navigates to Library for Media

    And User clicks on Media link
    Then Media listing page should be displayed
    When User click the Media Create button
    Then Add Media page should be displayed
    When User enters media details
    And User click the Save button
    Then Media should be saved successfully