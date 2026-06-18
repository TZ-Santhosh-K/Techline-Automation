Feature: Parts search

Scenario: Verify complete Parts search module functionality
  Given User navigates to Parts Search
  When User select the part type as model and enteres the model name in the search field
  And User click the Search button in Parts Search
  Then Search results should be displayed in Parts Search