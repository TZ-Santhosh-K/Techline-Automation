Feature: Parts catalogue search

Scenario: Verify complete Parts catalogue search module functionality
  Given User navigates to Parts
  
  When  User click the framenumber text box and enters framenumber
  And User click the Search button
  Then Search results should be displayed